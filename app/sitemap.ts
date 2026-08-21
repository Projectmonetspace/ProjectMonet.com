import type { MetadataRoute } from "next";

const origin = "https://www.projectmonet.com";
const routes = ["", "/privacy", "/cookies", "/terms", "/audit-terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${origin}${route}`,
    lastModified: new Date("2026-08-21T00:00:00.000Z"),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.4,
  }));
}
