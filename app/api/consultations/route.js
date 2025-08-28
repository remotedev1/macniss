import { db } from "@/lib/db";
import { ConsultationSchema } from "@/schemas";
import { NextResponse } from "next/server";
// CREATE Consultation
export async function POST(req) {
  try {
    const body = await req.json();
    const data = ConsultationSchema.parse(body);

    const created = await db.consultations.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        state: data.state ?? "",
        details: data.details ?? "",
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// GET All Consultations with optional filter
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // Optional filter

    const where = status ? { status } : {};

    const consultations = await db.consultations.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { success: true, data: consultations },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
