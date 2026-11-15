import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { getSafeRedirectPath } from "@/lib/security/safe-redirect";

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body?.values);
    if (!parsed.success) return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
    try {
      const result = await signIn("credentials", { ...parsed.data, redirect: false });
      if (!result || result.error) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
      return NextResponse.json({
        success: "Login successful!",
        redirectTo: getSafeRedirectPath(body?.callbackUrl),
      });
    } catch (error) {
      if (error instanceof AuthError) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
      throw error;
    }
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 });
  }
}
