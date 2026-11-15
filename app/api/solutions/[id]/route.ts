import { requireApiAuth } from "@/lib/security/api-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getImageKit } from "@/lib/imageKit";
import { validateImageFile } from "@/lib/security/upload-validation";

export async function PATCH(req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const existing = await db.solutions.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Capability not found." }, { status: 404 });

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as { isArchived?: boolean; title?: string; description?: string };
      const data: { isArchived?: boolean; title?: string; description?: string } = {};
      if (typeof body.isArchived === "boolean") data.isArchived = body.isArchived;
      if (typeof body.title === "string" && body.title.trim()) data.title = body.title.trim();
      if (typeof body.description === "string" && body.description.trim()) data.description = body.description.trim();
      const updated = await db.solutions.update({ where: { id: params.id }, data });
      return NextResponse.json(updated);
    }

    const formData = await req.formData();
    const title = String(formData.get("title") || existing.title).trim();
    const description = String(formData.get("description") || existing.description).trim();
    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    let finalImages = existing.image || [];
    const rawImage = formData.get("image");

    if (rawImage instanceof File && rawImage.size > 0) {
      const validation = validateImageFile(rawImage);
      if (!validation.ok) return NextResponse.json({ error: "error" in validation ? validation.error : "Invalid image." }, { status: 400 });

      const uploaded = await getImageKit().upload({
        file: Buffer.from(await rawImage.arrayBuffer()),
        fileName: rawImage.name,
        folder: "/images/site/solutions",
      });
      const previous = finalImages;
      finalImages = [{ url: uploaded.url, fileId: uploaded.fileId }];

      for (const image of previous) {
        if (!image?.fileId) continue;
        try { await getImageKit().deleteFile(image.fileId); } catch (error) { console.warn("Unable to delete previous capability image", error); }
      }
    } else if (typeof rawImage === "string" && rawImage) {
      try {
        const parsed = JSON.parse(rawImage);
        finalImages = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return NextResponse.json({ error: "Invalid image metadata." }, { status: 400 });
      }
    }

    const updated = await db.solutions.update({
      where: { id: params.id },
      data: { title, description, image: finalImages },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Capability update error:", error);
    return NextResponse.json({ error: "Unable to update capability." }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const existing = await db.solutions.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Capability not found." }, { status: 404 });

    await db.solutions.delete({ where: { id: params.id } });
    for (const image of existing.image || []) {
      if (!image?.fileId) continue;
      try { await getImageKit().deleteFile(image.fileId); } catch (error) { console.warn("Unable to delete capability image", error); }
    }
    return NextResponse.json({ message: "Capability deleted successfully." });
  } catch (error) {
    console.error("Capability delete error:", error);
    return NextResponse.json({ error: "Unable to delete capability." }, { status: 500 });
  }
}
