import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { imageKit } from "@/lib/imageKit"; // assuming same setup

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
