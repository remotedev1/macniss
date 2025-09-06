import { db } from "@/lib/db";
import { imageKit } from "@/lib/imageKit";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function GET() {
  const interiorGallery = await db.interiorGallery.findFirst();
  return NextResponse.json(interiorGallery);
}

export async function PATCH(req) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("imageGallery");
    const uploadedImages = [];

    for (const file of files) {
      if (file && file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);

        // Compress image using sharp
        let compressedBuffer = await sharp(buffer)
          .resize({ width: 1920, withoutEnlargement: true }) // optional max width
          .jpeg({ quality: 80 }) // adjust quality (0-100)
          .toBuffer();

        // Ensure compressed image <= 2MB
        while (compressedBuffer.byteLength > 2 * 1024 * 1024) {
          compressedBuffer = await sharp(compressedBuffer)
            .jpeg({ quality: 70 })
            .toBuffer();
        }

        const uploaded = await imageKit.upload({
          file: compressedBuffer.toString("base64"),
          fileName: file.name,
          folder: "images/site/interior", // remove leading slash
        });

        uploadedImages.push({ url: uploaded.url, fileId: uploaded.fileId });
      }
    }

    // Fetch the single interiorGallery document
    let interior = await db.interiorGallery.findFirst();

    if (!interior) {
      // Create new document
      interior = await db.interiorGallery.create({
        data: { images: uploadedImages },
      });
      return NextResponse.json(interior);
    }

    // Merge uploaded images with existing ones
    const updatedImages = [...interior.images, ...uploadedImages];

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
