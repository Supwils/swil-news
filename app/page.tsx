import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { NewsHome } from "@/components/news-home";
import { getAllNewsPreviews } from "@/lib/news";
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
  const [entries, entriesEn] = await Promise.all([
    getAllNewsPreviews("zh"),
    getAllNewsPreviews("en"),
  ]);

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
        entriesEn={entriesEn}
      />
    </>
  );
}
