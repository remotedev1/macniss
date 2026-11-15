import { requireApiAuth } from "@/lib/security/api-auth";
import { db } from "@/lib/db";
import { getImageKit } from "@/lib/imageKit";
import { NextResponse } from "next/server";
import { parseProjectFormData } from "@/lib/projects/project-form-data";
import { validateImageFile } from "@/lib/security/upload-validation";

export async function PUT(req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const existing = await db.projects.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    const formData = await req.formData();
    const parsed = parseProjectFormData(formData);
    if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

    let deletedFileIds = [];
    try {
      deletedFileIds = JSON.parse(String(formData.get("deletedFileIds") || "[]"));
      if (!Array.isArray(deletedFileIds)) deletedFileIds = [];
    } catch {
      return NextResponse.json({ error: "Invalid deleted image list." }, { status: 400 });
    }

    const deletedSet = new Set(deletedFileIds);
    const keptExisting = (existing.imageGallery || []).filter((image) => !deletedSet.has(image.fileId));

    const newUploads = [];
    for (const file of formData.getAll("imageGallery")) {
      if (!(file instanceof File) || file.size === 0) continue;
      const validation = validateImageFile(file);
      if (!validation.ok) return NextResponse.json({ error: "error" in validation ? validation.error : "Invalid image." }, { status: 400 });

      const uploaded = await getImageKit().upload({
        file: Buffer.from(await file.arrayBuffer()),
        fileName: file.name,
        folder: "/images/site/projects",
      });
      newUploads.push({ url: uploaded.url, fileId: uploaded.fileId });
    }

    const updated = await db.projects.update({
      where: { id: params.id },
      data: { ...parsed.data, imageGallery: [...keptExisting, ...newUploads] },
    });

    // Delete old remote files only after the database update succeeds.
    for (const fileId of deletedSet) {
      try { await getImageKit().deleteFile(fileId); } catch (error) { console.warn("Unable to delete project image", fileId, error); }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Unable to update project." }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const project = await db.projects.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    await db.projects.delete({ where: { id: params.id } });

    for (const image of project.imageGallery || []) {
      if (!image.fileId) continue;
      try { await getImageKit().deleteFile(image.fileId); } catch (error) { console.warn("Unable to delete project image", image.fileId, error); }
    }

    return NextResponse.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Project delete error:", error);
    return NextResponse.json({ error: "Unable to delete project." }, { status: 500 });
  }
}
