import type { MetadataRoute } from "next";

import { getAllNewsPreviews, getArchiveMonths } from "@/lib/news";
import { TOPICS } from "@/lib/news-meta";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllNewsPreviews();
  const archiveMonths = await getArchiveMonths();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/feed.xml"),
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.4,
    },
  ];

  const topicPages: MetadataRoute.Sitemap = TOPICS.flatMap((topic) => [
    {
      url: absoluteUrl(`/news/${topic.key}`),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl(`/news/${topic.key}/feed.xml`),
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.3,
    },
  ]);

  const archivePages: MetadataRoute.Sitemap = archiveMonths.map((month) => ({
    url: absoluteUrl(`/archive/${month}`),
    lastModified: new Date(`${month}-01T08:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const entryPages: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: absoluteUrl(`/news/${entry.topic}/${entry.date}`),
    lastModified: new Date(`${entry.date}T08:00:00.000Z`),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticPages, ...topicPages, ...archivePages, ...entryPages];
}
