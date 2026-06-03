import type { MetadataRoute } from "next";
import { guidePages } from "@/lib/guides";
import { siteConfig } from "@/lib/site";
import { getWikiHref, wikiCategories, wikiEntities } from "@/lib/wiki-data";

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
    {
      url: `${siteConfig.domain}/wiki`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "daily" as const,
      priority: 0.98
    },
    ...wikiCategories.map((category) => ({
      url: `${siteConfig.domain}${category.href}`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "daily" as const,
      priority: 0.94
    })),
    ...wikiEntities.map((entity) => ({
      url: `${siteConfig.domain}${getWikiHref(entity)}`,
      lastModified: new Date(entity.lastChecked),
      changeFrequency: "weekly" as const,
      priority: entity.evidenceStatus === "Official" ? 0.9 : 0.82
    })),
    { url: `${siteConfig.domain}/database/weapons`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteConfig.domain}/tools/build-planner`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteConfig.domain}/tools/progress-tracker`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
  ];
}
