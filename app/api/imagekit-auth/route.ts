import { requireApiAuth } from "@/lib/security/api-auth";
import { getImageKit } from "@/lib/imageKit";
import { NextResponse } from "next/server";

export async function GET() {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;
  try {
    const authenticationParameters = getImageKit().getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      {
        status: 500,
      }
    );
  }
}
