import { requireApiAuth } from "@/lib/security/api-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getImageKit } from "@/lib/imageKit";
import { validateImageFile } from "@/lib/security/upload-validation";

export async function POST(req) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const formData = await req.formData();
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const image = [];
    const file = formData.get("image");
    if (file instanceof File && file.size > 0) {
      const validation = validateImageFile(file);
      if (!validation.ok) return NextResponse.json({ error: "error" in validation ? validation.error : "Invalid image." }, { status: 400 });

      const uploaded = await getImageKit().upload({
        file: Buffer.from(await file.arrayBuffer()),
        fileName: file.name,
        folder: "/images/site/solutions",
      });
      image.push({ url: uploaded.url, fileId: uploaded.fileId });
    }

    const solution = await db.solutions.create({
      data: {
        title,
        description,
        isArchived: formData.get("isArchived") === "true",
        image,
      },
    });

    return NextResponse.json(solution, { status: 201 });
  } catch (error) {
    console.error("Solution create error:", error);
    return NextResponse.json({ error: "Unable to create capability." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const solutions = await db.solutions.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(solutions);
  } catch (error) {
    console.error("Error fetching capabilities:", error);
    return NextResponse.json({ error: "Unable to fetch capabilities." }, { status: 500 });
  }
}
