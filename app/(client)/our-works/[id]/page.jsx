import React from "react";
import { db } from "@/lib/db"; // your prisma client or db connection
import Image from "next/image";
import Container from "@/components/common/GlobalContainer";

async function getProject(id) {
  try {
    const project = await db.projects.findUnique({
      where: { id },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);

    return null;
  }
}

export default async function ProjectPage({ params }) {
  const { id } = params;
  const project = await getProject(id);

  if (!project) {
    return <div className="p-6 text-center">Project not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <Container>
        <h1 className="text-3xl font-bold mb-4">{project.projectName}</h1>
        <p className="text-lg text-gray-700 mb-6">
          {project.projectType} in {project.location}
        </p>

        {/* Gallery */}
        {project.imageGallery?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {project.imageGallery.map((img, index) => (
              <div
                key={index}
                className="relative w-full h-64 rounded-lg overflow-hidden border"
              >
                <Image
                  src={img.url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Overview */}
        {project.overview && (
          <div className="bg-white p-4 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-600">{project.overview}</p>
          </div>
        )}
      </Container>
    </div>
  );
}
