import { type Locale } from "@/data/copy";
import { getAllNewsPreviews, getEntryPreviewsByTopic, type NewsPreview } from "@/lib/news";
import { getTopicMeta, isTopicKey, type TopicKey } from "@/lib/news-meta";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getEntryDate(entry: NewsPreview) {
  return new Date(`${entry.date}T08:00:00.000Z`).toUTCString();
}

function buildItemDescription(entry: NewsPreview) {
  const highlights = entry.highlights.length > 0 ? ` | 要点：${entry.highlights.join(" / ")}` : "";
  return `${entry.description}${highlights}`;
}

function buildFeedXml({
  title,
  description,
  feedPath,
  entries,
}: {
  title: string;
  description: string;
  feedPath: string;
  entries: NewsPreview[];
}) {
  const siteUrl = absoluteUrl("/");
  const feedUrl = absoluteUrl(feedPath);

  const items = entries
    .slice(0, 50)
    .map((entry) => {
      const url = absoluteUrl(`/news/${entry.topic}/${entry.date}`);
      return [
        "<item>",
        `<title>${escapeXml(entry.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<pubDate>${escapeXml(getEntryDate(entry))}</pubDate>`,
        `<description>${escapeXml(buildItemDescription(entry))}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(title)}</title>`,
    `<link>${escapeXml(siteUrl)}</link>`,
    `<description>${escapeXml(description)}</description>`,
    "<language>zh-CN</language>",
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    items,
    "</channel>",
    "</rss>",
  ].join("");
}

export async function buildGlobalFeed(locale: Locale = "zh") {
  const entries = await getAllNewsPreviews(locale);
  return buildFeedXml({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    feedPath: "/feed.xml",
    entries,
  });
}

export async function buildTopicFeed(topicValue: string, locale: Locale = "zh") {
  if (!isTopicKey(topicValue)) {
    return null;
  }

  const topic = topicValue as TopicKey;
  const meta = getTopicMeta(topic, locale);
  if (!meta) {
    return null;
  }

  const entries = await getEntryPreviewsByTopic(topic, locale);
  return buildFeedXml({
    title: `${SITE_NAME} · ${meta.label}`,
    description: meta.description,
    feedPath: `/news/${topic}/feed.xml`,
    entries,
  });
}
