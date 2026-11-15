import { requireApiAuth } from "@/lib/security/api-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const ALLOWED_STATUSES = new Set(["PENDING", "CONTACTED"]);

export async function PATCH(req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const body = await req.json();
    if (!ALLOWED_STATUSES.has(body?.status)) {
      return NextResponse.json({ success: false, error: "Invalid consultation status." }, { status: 400 });
    }

    const existing = await db.consultations.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ success: false, error: "Consultation not found." }, { status: 404 });

    const updated = await db.consultations.update({
      where: { id: params.id },
      data: { status: body.status },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Consultation update error:", error);
    return NextResponse.json({ success: false, error: "Unable to update enquiry." }, { status: 500 });
  }
}
