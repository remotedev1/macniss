import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // adjust path if needed
import { imageKit } from "@/lib/imageKit";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract non-file fields
    const solutionData = {
      title: formData.get("title"),
      description: formData.get("description"),
      isArchived: formData.get("isArchived") === "true" ? true : false,
    };

    // Handle file upload (only one image field in Solutions model)
    const file = formData.get("image");
    let uploadedUrl = {};
    if (file && file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResponse = await imageKit.upload({
        file: buffer,
        fileName: file.name,
        folder: "/images/site/solutions", // save in solutions folder
      });
      uploadedUrl = { url: uploadResponse.url, fileId: uploadResponse.fileId };
    }

    solutionData["image"] = uploadedUrl;
    // Save solution in DB
    const solution = await db.solutions.create({
      data: solutionData,
    });

    return NextResponse.json(solution, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// Get All Solutions
export async function GET() {
  try {
    const solutions = await db.solutions.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(solutions);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
