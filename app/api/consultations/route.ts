import { requireApiAuth } from "@/lib/security/api-auth";
import { db } from "@/lib/db";
import { ConsultationSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const parsed = ConsultationSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Invalid enquiry details." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const created = await db.consultations.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone,
        state: data.state,
        details: data.details?.trim() || "",
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Consultation create error:", error);
    return NextResponse.json({ success: false, error: "Unable to submit enquiry." }, { status: 500 });
  }
}

export async function GET(req) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const consultations = await db.consultations.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: consultations });
  } catch (error) {
    console.error("Consultation fetch error:", error);
    return NextResponse.json({ success: false, error: "Unable to fetch enquiries." }, { status: 500 });
  }
}
