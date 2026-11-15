import type { UserStatus } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import authConfig from "@/auth.config";
import { validateCredentials } from "@/lib/auth-secure/credentials";
import { db } from "@/lib/db";

const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

type CredentialUser = NonNullable<
  Awaited<ReturnType<typeof validateCredentials>>
>;

type InternalJwt = {
  sub?: string;
  id?: string;
  status?: UserStatus;
  mustChangePassword?: boolean;
  sessionId?: string;
  invalidated?: boolean;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const forwarded = request?.headers?.get?.("x-forwarded-for");
        return validateCredentials(parsed.data.email, parsed.data.password, {
          userAgent: request?.headers?.get?.("user-agent") ?? null,
          ipAddress:
            forwarded?.split(",")[0]?.trim() ??
            request?.headers?.get?.("x-real-ip") ??
            null,
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const current = token as InternalJwt;
      if (user) {
        const authenticated = user as CredentialUser;
        current.id = authenticated.id;
        current.status = authenticated.status;
        current.mustChangePassword = authenticated.mustChangePassword;
        current.sessionId = authenticated.sessionId;
        current.firstName = authenticated.firstName;
        current.lastName = authenticated.lastName;
        current.invalidated = false;
        return token;
      }

      if (!current.id || current.invalidated || !current.sessionId) {
        current.invalidated = true;
        return token;
      }

      const dbSession = await db.session.findFirst({
        where: {
          id: current.sessionId,
          userId: current.id,
          expiresAt: { gt: new Date() },
          OR: [{ revokedAt: null }, { revokedAt: { isSet: false } }],
        },
        select: {
          id: true,
          user: {
            select: {
              status: true,
              isDeleted: true,
              mustChangePassword: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      const account = dbSession?.user;
      if (!account || account.isDeleted || account.status !== "ACTIVE") {
        current.invalidated = true;
      } else {
        current.status = account.status;
        current.mustChangePassword = account.mustChangePassword;
        current.firstName = account.firstName;
        current.lastName = account.lastName ?? "";
      }
      return token;
    },

    async session({ session, token }) {
      const current = token as InternalJwt;
      session.user.id = current.id ?? current.sub ?? "";
      session.user.status = current.status ?? "INACTIVE";
      session.user.mustChangePassword = current.mustChangePassword ?? false;
      session.user.sessionId = current.sessionId ?? null;
      session.user.invalidated = current.invalidated ?? false;
      session.user.firstName =
        current.firstName ?? session.user.name?.split(" ")?.[0] ?? "";
      session.user.lastName = current.lastName ?? "";

      // Compatibility fields retained for existing CMS navigation components.
      session.id = session.user.id;
      session.name = session.user.name;
      session.email = session.user.email;
      session.firstName = session.user.firstName;
      session.lastName = session.user.lastName;
      session.invalidated = session.user.invalidated;
      return session;
    },
  },
});
