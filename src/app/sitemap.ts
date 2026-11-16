import type { MetadataRoute } from "next";
import { getModels } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  if (!allowIndexing) {
    // Return empty sitemap while indexing is disabled (Amendment 15)
    return [];
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://shakumbhariauto.in";

  const models = getModels();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/models`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/service`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/test-ride`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/exchange`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/emi`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${siteUrl}/running-cost`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const modelRoutes: MetadataRoute.Sitemap = models.map((m) => ({
    url: `${siteUrl}/models/${m.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...modelRoutes];
}
