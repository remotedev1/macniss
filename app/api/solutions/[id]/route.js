import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imageKit } from "@/lib/imageKit"; // assuming same setup

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();

    // Parse base fields
    const solutionData = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    // Get existing solution
    const existingSolution = await db.solutions.findUnique({ where: { id } });
    if (!existingSolution) {
      return NextResponse.json(
        { error: "Solution not found" },
        { status: 404 }
      );
    }

    // Handle image
    const currentImage = existingSolution.image;
    let finalImage = currentImage;

    const rawImage = formData.get("image");

    if (rawImage) {
      if (rawImage instanceof File) {
        // Delete old image if exists
        if (currentImage?.fileId) {
          try {
            await imageKit.deleteFile(currentImage.fileId);
          } catch (e) {
            console.warn("Failed to delete old image:", currentImage.fileId, e);
          }
        }

        // Upload new image
        const buffer = Buffer.from(await rawImage.arrayBuffer());
        const uploaded = await imageKit.upload({
          file: buffer,
          fileName: rawImage.name,
          folder: "/images/site/solutions",
        });

        finalImage = { url: uploaded.url, fileId: uploaded.fileId };
      } else {
        // rawImage is JSON string of kept existing object
        try {
          finalImage = JSON.parse(rawImage);
        } catch {
          console.warn("Invalid image object received");
        }
      }
    }

    // Save final image
    solutionData.image = finalImage;
    console.log(solutionData);

    // Update DB
    const updated = await db.solutions.update({
      where: { id },
      data: solutionData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating solution:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// Delete Solution
export async function DELETE(req, { params }) {
  try {
    await db.solutions.delete({
      where: { id: params.id },
      data: { isArchived: true },
    });

    return NextResponse.json({ message: "Solution deleted successfully" });
  } catch (error) {
    console.error("Error deleting solution:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
