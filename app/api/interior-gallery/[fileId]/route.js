import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imageKit } from "@/lib/imageKit";

// DELETE /api/interior-gallery/:fileId
export async function DELETE(req, { params }) {
  try {
    const { fileId } = params;

    if (!fileId) {
      return NextResponse.json(
        { error: "fileId is required" },
        { status: 400 }
      );
    }

    // 1. Delete from ImageKit
    await imageKit.deleteFile(fileId);

    // 2. Remove from DB
    const interior = await db.interiorGallery.findFirst();
    if (!interior) {
      return NextResponse.json(
        { error: "Interior gallery not found" },
        { status: 404 }
      );
    }

    const updatedImages = interior.images.filter(
      (img) => img.fileId !== fileId
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
