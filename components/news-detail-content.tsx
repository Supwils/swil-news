"use client";

import Link from "next/link";
import { ArrowLeft, Clock3, Command, FileText, Layers3 } from "lucide-react";
import type { ReactNode } from "react";

import { InlineMarkdown, NewsMarkdown } from "@/components/news-markdown";
import { NewspaperFooter } from "@/components/newspaper/footer";
import { NewspaperMasthead } from "@/components/newspaper/masthead";
import { QuickTopicLinks } from "@/components/quick-topic-links";
import { useLocale } from "@/components/locale-context";
import { getCopy } from "@/data/copy";
import { formatDisplayDate } from "@/lib/news-client";
import type { NewsEntry } from "@/lib/news";
import { getTopicMeta, TOPICS, type TopicKey } from "@/lib/news-meta";

type NewsDetailViewEntry = Omit<NewsEntry, "filePath">;

type NewsDetailContentProps = {
  topic: TopicKey;
  date: string;
  entry: NewsDetailViewEntry;
  availableTopics: TopicKey[];
};

export function NewsDetailContent({
  topic,
  date,
  entry,
  availableTopics,
}: NewsDetailContentProps) {
  const locale = useLocale();
  const copy = getCopy(locale);
  const meta = getTopicMeta(topic, locale);
  const topicLabels = TOPICS.map((t) => ({ key: t.key, label: getTopicMeta(t.key, locale)!.label }));

  if (!meta) {
    return null;
  }

  return (
    <div className="np-root">
      <NewspaperMasthead date={date} archiveMonth={date.slice(0, 7)} />
      <main className="mx-auto w-full" style={{ maxWidth: 1280, padding: 40 }}>
        <QuickTopicLinks
          date={date}
          currentTopic={topic}
          availableTopics={availableTopics}
          topicLabels={topicLabels}
          copy={{
            quickLinkHeading: copy.ui.detailPage.quickLinkHeading,
            quickLinkCurrent: copy.ui.detailPage.quickLinkCurrent,
            noNewsHint: copy.ui.detailPage.noNewsHint,
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
            margin: "24px 0",
          }}
        >
          <Link href={`/news/${topic}`} className="np-btn-secondary">
            <ArrowLeft size={14} />
            {copy.ui.topicPage.backToTopic(meta.label)}
          </Link>
          <Link href="/" className="np-btn-secondary">
            {copy.ui.topicPage.backHome}
          </Link>
        </div>

        <div
          className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
          style={{ marginTop: 8 }}
        >
          <article
            style={{
              border: "1px solid var(--color-border)",
              padding: 32,
              background: "var(--color-surface)",
            }}
          >
            <NewsMarkdown content={entry.content} />
          </article>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
            <section
              style={{
                border: "1px solid var(--color-border)",
                padding: 24,
                background: "var(--color-surface)",
              }}
            >
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
                {copy.ui.detailPage.issueDetails}
              </p>
              <h2
                className="np-serif"
                style={{
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                  margin: "10px 0 10px",
                  color: "var(--color-text-primary)",
                }}
              >
                {formatDisplayDate(entry.date, locale)}
              </h2>
              <p
                className="np-sans"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                {meta.description}
              </p>

              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                <InfoRow icon={<Clock3 size={14} />} label={copy.ui.detailPage.minRead(entry.readingMinutes)} />
                <InfoRow icon={<Layers3 size={14} />} label={`${entry.sectionCount} ${copy.ui.newsCard.sections}`} />
                <InfoRow icon={<FileText size={14} />} label={`${entry.articleCount} ${copy.ui.newsCard.stories}`} />
                <InfoRow icon={<Command size={14} />} label={meta.commandPath} mono />
              </div>
            </section>

            {entry.highlights.length > 0 ? (
              <section
                style={{
                  border: "1px solid var(--color-border)",
                  padding: 24,
                  background: "var(--color-surface)",
                }}
              >
                <p
                  className="np-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {copy.ui.detailPage.keyHighlights}
                </p>
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                  {entry.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="np-sans"
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "var(--color-text-secondary)",
                        paddingLeft: 14,
                        borderLeft: "2px solid var(--color-border-soft)",
                      }}
                    >
                      <InlineMarkdown content={highlight} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {entry.takeaway ? (
              <section
                style={{
                  border: "1px solid var(--color-border)",
                  padding: 24,
                  background: "var(--color-surface-muted)",
                  borderLeft: "3px solid var(--color-text-primary)",
                }}
              >
                <p
                  className="np-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {copy.ui.detailPage.dailyFraming}
                </p>
                <div
                  className="np-serif"
                  style={{
                    marginTop: 10,
                    fontStyle: "italic",
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--color-text-primary)",
                  }}
                >
                  <InlineMarkdown content={entry.takeaway} />
                </div>
              </section>
            ) : null}
          </aside>
        </div>

        <div style={{ marginTop: 32 }}>
          <QuickTopicLinks
            date={date}
            currentTopic={topic}
            availableTopics={availableTopics}
            topicLabels={topicLabels}
            copy={{
              quickLinkHeading: copy.ui.detailPage.quickLinkHeading,
              quickLinkCurrent: copy.ui.detailPage.quickLinkCurrent,
              noNewsHint: copy.ui.detailPage.noNewsHint,
            }}
          />
        </div>

        <NewspaperFooter />
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  mono = false,
}: {
  icon: ReactNode;
  label: string;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize: 13,
        color: "var(--color-text-secondary)",
      }}
    >
      <span style={{ marginTop: 2, color: "var(--color-text-primary)" }}>{icon}</span>
      <span
        className={mono ? "np-mono" : "np-sans"}
        style={mono ? { fontSize: 12, wordBreak: "break-all" } : { lineHeight: 1.5 }}
      >
        {label}
      </span>
    </div>
  );
}
