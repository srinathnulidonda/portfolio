// app/sitemap.ts
import type { MetadataRoute } from "next";
import profile from "@/assets/images/profile.webp";
import { SITE } from "@/data/constant";

const LAST_MODIFIED = new Date("2026-11-10");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.url}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      images: [new URL(profile.src, SITE.url).href],
    },
  ];
}