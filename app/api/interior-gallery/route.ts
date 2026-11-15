import { requireApiAuth } from "@/lib/security/api-auth";
import { db } from "@/lib/db";
import { getImageKit } from "@/lib/imageKit";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { validateImageFile } from "@/lib/security/upload-validation";

const TARGET_BYTES = 2 * 1024 * 1024;

async function compressInteriorImage(file) {
  const validation = validateImageFile(file, { maxBytes: 15 * 1024 * 1024 });
  if (!validation.ok) throw new Error("error" in validation ? validation.error : "Invalid image.");

  const source = Buffer.from(await file.arrayBuffer());
  const qualities = [82, 72, 62, 52];
  let result;

  for (const quality of qualities) {
    result = await sharp(source)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (result.byteLength <= TARGET_BYTES) return result;
  }

  if (result?.byteLength > TARGET_BYTES) {
    throw new Error("Image could not be compressed below 2MB. Please upload a smaller image.");
  }
  return result;
}

export async function GET() {
  try {
    const interiorGallery = await db.interiorGallery.findFirst();
    return NextResponse.json(interiorGallery);
  } catch (error) {
    console.error("Interior gallery fetch error:", error);
    return NextResponse.json({ error: "Unable to fetch interior gallery." }, { status: 500 });
  }
}

export async function PATCH(req) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  try {
    const formData = await req.formData();
    const files = formData.getAll("imageGallery").filter((file) => file instanceof File && file.size > 0);
    if (!files.length) return NextResponse.json({ error: "At least one image is required." }, { status: 400 });
    if (files.length > 12) return NextResponse.json({ error: "Upload a maximum of 12 images at a time." }, { status: 400 });

    const uploadedImages = [];
    for (const file of files) {
      const compressed = await compressInteriorImage(file);
      const uploaded = await getImageKit().upload({
        file: compressed.toString("base64"),
        fileName: file.name.replace(/\.[^.]+$/, "") + ".jpg",
        folder: "/images/site/interior",
      });
      uploadedImages.push({ url: uploaded.url, fileId: uploaded.fileId });
    }

    const interior = await db.interiorGallery.findFirst();
    if (!interior) {
      const created = await db.interiorGallery.create({ data: { images: uploadedImages } });
      return NextResponse.json(created, { status: 201 });
    }

    const existingImages = Array.isArray(interior.images) ? interior.images : [];
    const updated = await db.interiorGallery.update({
      where: { id: interior.id },
      data: { images: [...existingImages, ...uploadedImages] },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Interior gallery update error:", error);
    const message = error?.message || "Unable to update interior gallery.";
    const isClientError = /image|upload|supported|smaller|required|maximum/i.test(message);
    return NextResponse.json({ error: message }, { status: isClientError ? 400 : 500 });
  }
}
