import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/metod-432", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tsinnosti", priority: 0.8, changeFrequency: "monthly" },
    { path: "/retreat-carpathians", priority: 0.6, changeFrequency: "monthly" },
    { path: "/oferta", priority: 0.2, changeFrequency: "yearly" },
    { path: "/oferta-retreat", priority: 0.1, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
