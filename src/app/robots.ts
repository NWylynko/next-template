import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://example.com",
    sitemap: "https://example.com/sitemap.xml",
  };
}
