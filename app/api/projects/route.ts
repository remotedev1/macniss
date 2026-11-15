import { requireApiAuth } from "@/lib/security/api-auth";
import { db } from "@/lib/db";
import { getImageKit } from "@/lib/imageKit";
import { NextResponse } from "next/server";
import { parseProjectFormData } from "@/lib/projects/project-form-data";
import { validateImageFile } from "@/lib/security/upload-validation";

export async function GET() {
  const projects = await db.projects.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(projects);
}

export async function POST(req) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const formData = await req.formData();
    const parsed = parseProjectFormData(formData);
    if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const uploadedImages = [];
    for (const file of formData.getAll("imageGallery")) {
      if (!(file instanceof File) || file.size === 0) continue;
      const validation = validateImageFile(file);
      if (!validation.ok) return NextResponse.json({ error: "error" in validation ? validation.error : "Invalid image." }, { status: 400 });

      const uploaded = await getImageKit().upload({
        file: Buffer.from(await file.arrayBuffer()),
        fileName: file.name,
        folder: "/images/site/projects",
      });
      uploadedImages.push({ url: uploaded.url, fileId: uploaded.fileId });
    }

    const project = await db.projects.create({
      data: { ...parsed.data, imageGallery: uploadedImages },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Unable to create project." }, { status: 500 });
  }
}
