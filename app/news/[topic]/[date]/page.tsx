import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsDetailContent } from "@/components/news-detail-content";
import { StructuredData } from "@/components/structured-data";
import { getAllNewsParams, getNewsEntry, getTopicsWithNewsForDate } from "@/lib/news";
import { getTopicMeta, isTopicKey } from "@/lib/news-meta";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type NewsDetailPageProps = {
  params: Promise<{ topic: string; date: string }>;
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { topic, date } = await params;

  if (!isTopicKey(topic)) {
    return {};
  }

  const entry = await getNewsEntry(topic, date, "zh");
  const meta = getTopicMeta(topic, "zh");

  if (!entry) {
    return {};
  }

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: `/news/${topic}/${date}`,
    },
    openGraph: {
      type: "article",
      url: `/news/${topic}/${date}`,
      siteName: SITE_NAME,
      title: entry.title,
      description: entry.description,
      locale: "zh_CN",
      publishedTime: `${date}T08:00:00.000Z`,
      modifiedTime: `${date}T08:00:00.000Z`,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${entry.title} open graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [absoluteUrl("/twitter-image")],
    },
    keywords: [entry.title, meta?.label ?? topic, "daily digest", "news archive"],
  };
}

export async function generateStaticParams() {
  return getAllNewsParams();
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { topic, date } = await params;

  if (!isTopicKey(topic)) {
    notFound();
  }

  const [entryZh, entryEn, availableTopicsZh, availableTopicsEn] = await Promise.all([
    getNewsEntry(topic, date, "zh"),
    getNewsEntry(topic, date, "en"),
    getTopicsWithNewsForDate(date, "zh"),
    getTopicsWithNewsForDate(date, "en"),
  ]);

  const meta = getTopicMeta(topic, "zh");

  if (!entryZh || !meta) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: entryZh.title,
    description: entryZh.description,
    url: absoluteUrl(`/news/${topic}/${date}`),
    datePublished: `${date}T08:00:00.000Z`,
    dateModified: `${date}T08:00:00.000Z`,
    articleSection: meta.label,
    inLanguage: "zh-CN",
    isAccessibleForFree: true,
    wordCount: entryZh.content.split(/\s+/).filter(Boolean).length,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/snew-logo1.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/news/${topic}/${date}`),
    },
  };

  const { filePath: _filePath, ...clientEntry } = entryZh;
  const clientEntryEn = entryEn ? (() => { const { filePath: _fp, ...e } = entryEn; return e; })() : null;

  return (
    <>
      <StructuredData data={structuredData} />
      <NewsDetailContent
        topic={topic}
        date={date}
        entry={clientEntry}
        entryEn={clientEntryEn}
        availableTopicsZh={availableTopicsZh}
        availableTopicsEn={availableTopicsEn}
      />
    </>
  );
}
