import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth-secure/password";
import { passwordSchema } from "@/lib/auth-secure/password-policy";
import { requireTrustedMutationOrigin } from "@/lib/security/mutation-origin";
import { writeAudit } from "@/lib/auth-secure/audit";

const SetupSchema = z.object({
  firstName: z.string().trim().min(2).max(40),
  lastName: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email(),
  phoneNumber: z.string().trim().regex(/^[6-9]\d{9}$/).optional().or(z.literal("")),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export async function GET() {
  const users = await db.users.count();
  return NextResponse.json({ setupRequired: users === 0 });
}

export async function POST(request) {
  try {
    await requireTrustedMutationOrigin();

    // First-run setup is permanently unavailable after the first account exists.
    if (await db.users.count()) {
      return NextResponse.json({ error: "Setup has already been completed." }, { status: 409 });
    }

    const parsed = SetupSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid setup details." },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, phoneNumber, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const user = await db.users.create({
      data: {
        firstName,
        lastName: lastName || null,
        email: normalizedEmail,
        phoneNumber: phoneNumber || null,
        password: await hashPassword(password),
        emailVerified: new Date(),
        status: "ACTIVE",
        isDeleted: false,
        mustChangePassword: false,
      },
    });

    await writeAudit({
      userId: user.id,
      action: "REGISTER",
      entity: "Users",
      entityId: user.id,
      description: "Initial CMS account created by first-run setup",
    });

    return NextResponse.json(
      { success: true, message: "Setup complete. Sign in with your new account." },
      { status: 201 },
    );
  } catch (error) {
    console.error("First-run setup failed", error);
    return NextResponse.json({ error: "Unable to complete setup." }, { status: 500 });
  }
}
