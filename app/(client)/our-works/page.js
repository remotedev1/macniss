"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Container from "@/components/common/GlobalContainer";

// Tabs configuration
const tabOptions = [
  { key: "COMPLETED", label: "Completed" },
  { key: "NEAR_COMPLETION", label: "Near Completion" },
  { key: "ACTIVE", label: "Active" },
  { key: "GALLERY", label: "Gallery" },
];

export default function ProjectsPage() {
  const [selectedTab, setSelectedTab] = useState("COMPLETED");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className=" mx-auto py-6 md:py-12 px-4 bg-white">
      <Container>
        <div className="max-w-7xl mx-auto py-12 px-4 ">
          <div className=" items-center justify-between mb-12">
            <h2 className="text-4xl font-bold mb-2 text-black">
              Our Construction <span className="text-yellow-400">Projects</span>
            </h2>

            <p className="text-gray-500 mb-6">
              Explore how our work has changed the life of our customers.
            </p>
          </div>
          <div>
            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="mb-8"
            >
              <TabsList className="bg-transparent rounded-full flex">
                {tabOptions.map((tab) => (
                  <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className={
                      selectedTab === tab.key
                        ? "bg-yellow-400 text-black font-bold"
                        : "font-bold text-black hover:bg-yellow-400 hover:text-black"
                    }
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabOptions.map((tab) => (
                <TabsContent key={tab.key} value={tab.key}>
                  {tab.key === "GALLERY" ? (
                    // 🔹 Different UI for Gallery
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {projects.map((project) =>
                        project.imageGallery.map((img, i) => (
                          <div
                            key={`${project.id}-${i}`}
                            className="relative overflow-hidden rounded-lg shadow-md group"
                          >
                            <Image
                              src={img.url}
                              alt={project.projectName}
                              width={400}
                              height={300}
                              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-semibold">
                              {project.projectName}
                              <br />
                              {project.location}
                              <br />
                              {project.projectType}
                            </div>
                          </div>
                        ))
                      )}
                      {!projects.length && (
                        <div className="col-span-4 text-center text-gray-400 py-12">
                          No gallery images found.
                        </div>
                      )}
                    </div>
                  ) : (
                    // 🔹 Default UI for normal tabs
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                      {projects
                        .filter((project) => project.status === tab.key)
                        .map((project) => (
                          <Card
                            key={project.id}
                            className="overflow-hidden rounded-2xl border-none shadow-lg bg-white/70 transition duration-300 ease-in-out transform hover:scale-105 m-2"
                          >
                            <Image
                              src={project.imageGallery[0]?.url}
                              alt={project.title}
                              width={500}
                              height={300}
                              className="w-full h-56 object-cover"
                            />
                            <CardContent className="p-6">
                              <div className="text-yellow-400 font-bold text-lg mb-1">
                                {project.projectName}, {project.location}
                              </div>
                              <div className="text-gray-500 mb-1">
                                {project.projectType && (
                                  <span className="text-gray-400">
                                    ({project.projectType})
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-3">
                                {/* <a
                                href={project.siteTourUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 flex items-center gap-2"
                                >
                                  Site Tour
                                </Button>
                              </a> */}

                                <Button
                                  onClick={() => setSelectedProject(project)}
                                  variant="outline"
                                >
                                  Project Detail
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      {!projects.filter((p) => p.status === tab.key).length && (
                        <div className="col-span-3 text-center text-gray-400 py-12">
                          No projects found.
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        {/* Modal for project details */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProject?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Image
                src={selectedProject?.imageGallery[0]?.url}
                alt={selectedProject?.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <p>
                <strong>Name:</strong> {selectedProject?.projectName}
              </p>
              <p>
                <strong>Location:</strong> {selectedProject?.location}
              </p>
              <p>
                <strong>Type:</strong> {selectedProject?.projectType}
              </p>
              <p>
                <strong>Status:</strong> {selectedProject?.status}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
