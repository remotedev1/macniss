import crypto from "node:crypto";
import type { UserStatus } from "@prisma/client";

import { db } from "@/lib/db";
import { writeAudit } from "./audit";
import { assertLoginRateLimit, clearLoginRateLimit } from "./login-rate-limit";
import { verifyPassword } from "./password";

const MAX_FAILURES = 5;
const LOCK_MINUTES = 15;
const SESSION_DAYS = 7;
const DUMMY_HASH = "$2b$12$DqYNJ9vYh6Y5xnGZQ0uFG.LXGrUcPxYMb37RGHoHuLHn38Yr/BmxK";

type LoginContext = {
  userAgent?: string | null;
  ipAddress?: string | null;
};

export type CredentialUser = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  mustChangePassword: boolean;
  sessionId: string;
  firstName: string;
  lastName: string;
};

export async function validateCredentials(
  email: string,
  password: string,
  context: LoginContext = {},
): Promise<CredentialUser | null> {
  const normalized = email.trim().toLowerCase();
  if (!(await assertLoginRateLimit(normalized, context.ipAddress))) return null;

  const user = await db.users.findUnique({ where: { email: normalized } });
  if (!user || user.isDeleted) {
    await verifyPassword(password, DUMMY_HASH);
    return null;
  }
  if (user.lockedUntil && user.lockedUntil > new Date()) return null;

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    const failures = user.failedLoginAttempts + 1;
    await db.users.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: failures,
        lockedUntil:
          failures >= MAX_FAILURES
            ? new Date(Date.now() + LOCK_MINUTES * 60_000)
            : null,
      },
    });
    await writeAudit({
      userId: user.id,
      action: "FAILED_LOGIN",
      entity: "Users",
      entityId: user.id,
      description: "Failed credential login",
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    });
    return null;
  }

  if (user.status !== "ACTIVE") return null;

  const dbSession = await db.session.create({
    data: {
      userId: user.id,
      token: crypto.randomUUID(),
      userAgent: context.userAgent || null,
      ipAddress: context.ipAddress || null,
      expiresAt: new Date(Date.now() + SESSION_DAYS * 86_400_000),
      revokedAt: null,
    },
  });

  await db.users.update({
    where: { id: user.id },
    data: { failedLoginAttempts: 0, lockedUntil: null, lastLogin: new Date() },
  });
  await clearLoginRateLimit(normalized, context.ipAddress);
  await writeAudit({
    userId: user.id,
    action: "LOGIN",
    entity: "Session",
    entityId: dbSession.id,
    description: "Successful credential login",
    ipAddress: context.ipAddress,
    userAgent: context.userAgent,
  });

  return {
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" "),
    email: user.email,
    status: user.status,
    mustChangePassword: user.mustChangePassword,
    sessionId: dbSession.id,
    firstName: user.firstName,
    lastName: user.lastName ?? "",
  };
}
