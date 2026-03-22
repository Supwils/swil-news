import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/news/", "/feed.xml"],
        disallow: ["/api/", "/runtime"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
