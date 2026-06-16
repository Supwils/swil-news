import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { NewsHome } from "@/components/news-home";
import { localizePath } from "@/lib/locale-routing";
import { getHomePreviews } from "@/lib/news";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

const homePath = localizePath("/", "en");
const feedPath = localizePath("/feed.xml", "en");

export const metadata: Metadata = {
  title: `${SITE_NAME} English Demo`,
  description: `${SITE_DESCRIPTION} English-accessible demo routes for public sharing.`,
  alternates: {
    canonical: homePath,
    languages: {
      "zh-CN": "/",
      "en-US": homePath,
    },
    types: {
      "application/rss+xml": absoluteUrl(feedPath),
    },
  },
};

export default async function EnglishHomePage() {
  const { entries, topicCounts, totalCount } = await getHomePreviews("en");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl(`${homePath}#website`),
        url: absoluteUrl(homePath),
        name: `${SITE_NAME} English Demo`,
        description: `${SITE_DESCRIPTION} English-accessible demo routes for public sharing.`,
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl(homePath)}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl(`${homePath}#collection`),
        url: absoluteUrl(homePath),
        name: `${SITE_NAME} English Demo`,
        description: "English-accessible digest archive demo.",
        inLanguage: "en-US",
        isPartOf: {
          "@id": absoluteUrl(`${homePath}#website`),
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <NewsHome entries={entries} topicCounts={topicCounts} totalCount={totalCount} />
    </>
  );
}
