import { requireApiAuth } from "@/lib/security/api-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getImageKit } from "@/lib/imageKit";

// DELETE /api/interior-gallery/:fileId
export async function DELETE(req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;
  try {
    const { fileId } = params;

    if (!fileId) {
      return NextResponse.json(
        { error: "fileId is required" },
        { status: 400 }
      );
    }

    // Seeded gallery entries use local placeholder IDs, not ImageKit file IDs.
    if (!fileId.startsWith("seed-")) {
      await getImageKit().deleteFile(fileId);
    }

    // 2. Remove from DB
    const interior = await db.interiorGallery.findFirst();
    if (!interior) {
      return NextResponse.json(
        { error: "Interior gallery not found" },
        { status: 404 }
      );
    }

    const images = Array.isArray(interior.images) ? interior.images : [];
    const updatedImages = images.filter(
      (image) => !image || typeof image !== "object" || !("fileId" in image) || image.fileId !== fileId,
    );

    const updatedInterior = await db.interiorGallery.update({
      where: { id: interior.id },
      data: { images: updatedImages },
    });

    return NextResponse.json({
      message: "Interior gallery image deleted successfully",
      updatedInterior,
    });
  } catch (error) {
    console.error("Error deleting interior gallery image:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
