import type { MetadataRoute } from "next";
import { flagships } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    ...flagships.map((p) => ({ url: `${siteUrl}/work/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
