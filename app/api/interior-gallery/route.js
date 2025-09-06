import { db } from "@/lib/db";
import { imageKit } from "@/lib/imageKit";
import { NextResponse } from "next/server";

export async function GET() {
  const interiorGallery = await db.interiorGallery.findMany();
  return NextResponse.json(interiorGallery);
}

export async function PATCH(req) {
  try {
    const formData = await req.formData();

    // Handle new uploads first
    const files = formData.getAll("imageGallery");
    const uploadedImages = [];

    for (const file of files) {
      if (file && file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploaded = await imageKit.upload({
          file: buffer,
          fileName: file.name,
          folder: "/images/site/interior",
        });
        uploadedImages.push({ url: uploaded.url, fileId: uploaded.fileId });
      }
    }

    // Fetch the single interiorGallery document
    let interior = await db.interiorGallery.findFirst();

    if (!interior) {
      // Create a new document with uploaded images
      interior = await db.interiorGallery.create({
        data: { images: uploadedImages },
      });
    }

    // Merge uploaded images with existing ones
    const updatedImages = [...interior.images, ...uploadedImages];

    // Update the document
    interior = await db.interiorGallery.update({
      where: { id: interior.id },
      data: { images: updatedImages },
    });

    return NextResponse.json(interior);
  } catch (err) {
    console.error("InteriorGallery PATCH error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
