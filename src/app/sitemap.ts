import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-10-13T00:00:00-03:00"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
