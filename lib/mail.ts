"use server";

import { Resend } from "resend";

type SecurityEmail = { email: string; token: string };

function client(): Resend | null {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
}

export async function sendPasswordResetEmail({ email, token }: SecurityEmail): Promise<boolean> {
  const url = `${baseUrl()}/auth/reset-password?token=${encodeURIComponent(token)}`;
  const resend = client();
  if (!resend) {
    if (process.env.NODE_ENV !== "production") console.info(`[DEV] Password reset for ${email}: ${url}`);
    return true;
  }
  const result = await resend.emails.send({
    from: process.env.AUTH_EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Use this secure link to reset your password: <a href="${url}">Reset password</a></p>`,
  });
  return Boolean(result?.data?.id);
}

export async function sendVerificationEmail({ email, token }: SecurityEmail): Promise<boolean> {
  const url = `${baseUrl()}/auth/email-verification?token=${encodeURIComponent(token)}`;
  const resend = client();
  if (!resend) {
    if (process.env.NODE_ENV !== "production") console.info(`[DEV] Email verification for ${email}: ${url}`);
    return true;
  }
  const result = await resend.emails.send({
    from: process.env.AUTH_EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Confirm your email: <a href="${url}">Verify email</a></p>`,
  });
  return Boolean(result?.data?.id);
}
