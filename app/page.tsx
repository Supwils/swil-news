import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { NewsHome } from "@/components/news-home";
import { getAllNewsPreviews } from "@/lib/news";
import type { TopicKey } from "@/lib/news-meta";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
};

export default async function HomePage() {
  const entries = await getAllNewsPreviews();

  const todayDate = entries[0]?.date ?? null;
  const todayEntries = todayDate ? entries.filter((entry) => entry.date === todayDate) : [];
  const previousDate = todayDate
    ? entries.find((entry) => entry.date !== todayDate)?.date ?? null
    : null;
  const previousEntries = previousDate
    ? entries.filter((entry) => entry.date === previousDate)
    : [];

  const topicCounts = entries.reduce<Partial<Record<TopicKey, number>>>((acc, entry) => {
    acc[entry.topic] = (acc[entry.topic] ?? 0) + 1;
    return acc;
  }, {});

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "zh-CN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl("/")}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/#collection"),
        url: absoluteUrl("/"),
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <NewsHome
        entries={entries}
        todayDate={todayDate}
        todayEntries={todayEntries}
        previousDate={previousDate}
        previousEntries={previousEntries}
        topicCounts={topicCounts}
      />
    </>
  );
}
