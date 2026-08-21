import type { MetadataRoute } from "next";

const origin = "https://www.projectmonet.com";
const routes = ["", "/audit", "/viral-mandate", "/about", "/contact", "/privacy", "/cookies", "/terms", "/audit-terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${origin}${route}`,
    lastModified: new Date("2026-08-21T00:00:00.000Z"),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/audit" ? 0.9 : 0.7,
  }));
}
