import type { MetadataRoute } from "next";

const base = new URL("https://example.com");

function page(path: string): string {
  return new URL(path, base).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: page("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
