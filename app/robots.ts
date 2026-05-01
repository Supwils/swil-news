import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/news/", "/feed.xml", "/en/", "/en/about", "/en/news/", "/en/feed.xml"],
        disallow: ["/api/", "/runtime"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
