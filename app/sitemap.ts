import type { MetadataRoute } from "next";
import { guidePages } from "@/lib/guides";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.domain,
      lastModified: new Date("2026-05-28"),
      changeFrequency: "daily",
      priority: 1
    },
    ...guidePages.map((page) => ({
      url: `${siteConfig.domain}/${page.slug}`,
      lastModified: new Date(page.lastUpdated),
      changeFrequency: "daily" as const,
      priority: page.featured ? 0.9 : 0.75
    })),
    { url: `${siteConfig.domain}/database/weapons`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${siteConfig.domain}/tools/build-planner`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${siteConfig.domain}/tools/progress-tracker`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
  ];
}
