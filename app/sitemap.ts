import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap() {
  const baseUrl = SITE_URL;
  const staticPages = [
    ["", 1, "weekly"],
    ["/about-us", 0.8, "monthly"],
    ["/services", 0.9, "monthly"],
    ["/our-works", 0.9, "weekly"],
    ["/interior-gallery", 0.7, "monthly"],
    ["/contact", 0.8, "monthly"],
  ].map(([path, priority, changeFrequency]) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));

  try {
    const projects = await db.projects.findMany({
      where: { isArchived: false },
      select: { id: true, updatedAt: true },
    });

    return [
      ...staticPages,
      ...projects.map((project) => ({
        url: `${baseUrl}/our-works/${project.id}`,
        lastModified: project.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      })),
    ];
  } catch {
    return staticPages;
  }
}
