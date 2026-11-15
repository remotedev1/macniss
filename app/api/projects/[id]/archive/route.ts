import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireApiAuth } from "@/lib/security/api-auth";

export async function PATCH(req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const existing = await db.projects.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    let requested;
    try {
      const body = await req.json();
      if (typeof body?.isArchived === "boolean") requested = body.isArchived;
    } catch {}

    const updated = await db.projects.update({
      where: { id: params.id },
      data: { isArchived: typeof requested === "boolean" ? requested : !existing.isArchived },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Project archive error:", error);
    return NextResponse.json({ error: "Unable to update project archive state." }, { status: 500 });
  }
}
