"use client";

import { NewsCard } from "@/components/news-card";
import { useLocale } from "@/components/locale-context";
import { NewspaperFooter } from "@/components/newspaper/footer";
import { NewspaperMasthead } from "@/components/newspaper/masthead";
import { getCopy } from "@/data/copy";
import type { NewsPreview } from "@/lib/news";
import { getTopicMeta, type TopicKey } from "@/lib/news-meta";

type TopicPageContentProps = {
  topic: TopicKey;
  entries: NewsPreview[];
  entriesEn: NewsPreview[];
};

export function TopicPageContent({ topic, entries: entriesZh, entriesEn }: TopicPageContentProps) {
  const locale = useLocale();
  const entries = locale === "en" ? entriesEn : entriesZh;
  const copy = getCopy(locale);
  const meta = getTopicMeta(topic, locale);

  if (!meta) {
    return null;
  }

  return (
    <div className="np-root">
      <NewspaperMasthead active="topics" />
      <main className="mx-auto w-full" style={{ maxWidth: 1280, padding: 40 }}>
        <section style={{ paddingBottom: 28, borderBottom: "1px solid var(--color-border)" }}>
          <p
            className="np-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                background: meta.accent,
                borderRadius: 999,
                marginRight: 8,
                verticalAlign: "1px",
              }}
            />
            {copy.ui.topicPage.badge}
          </p>
          <h1
            className="np-serif"
            style={{
              fontSize: 56,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              fontWeight: 600,
              margin: "12px 0 12px",
              color: "var(--color-text-primary)",
            }}
          >
            {meta.label}
          </h1>
          <p
            className="np-serif"
            style={{
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.55,
              maxWidth: 640,
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            {meta.description}
          </p>
          <p
            className="np-mono"
            style={{
              marginTop: 18,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            {entries.length} {locale === "en" ? "ISSUES ARCHIVED" : "份归档"}
          </p>
        </section>

        {entries.length === 0 ? (
          <section style={{ marginTop: 32 }}>
            <p className="np-sans" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: 0 }}>
              {locale === "en"
                ? "No English digests have been archived for this topic yet."
                : "该主题下暂时还没有可展示的日报。"}
            </p>
          </section>
        ) : (
          <section className="grid gap-4 xl:grid-cols-2" style={{ marginTop: 32 }}>
            {entries.map((entry) => (
              <NewsCard key={`${entry.topic}-${entry.date}`} entry={entry} />
            ))}
          </section>
        )}

        <NewspaperFooter />
      </main>
    </div>
  );
}
