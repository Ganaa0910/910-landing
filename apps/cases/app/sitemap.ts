import { MetadataRoute } from "next";
import { PROJECTS } from "@910studio/ui";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cases.910.studio";

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${baseUrl}/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
