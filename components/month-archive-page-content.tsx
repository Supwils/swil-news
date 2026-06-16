"use client";

import Link from "next/link";
import { useState } from "react";

import { NewsCard } from "@/components/news-card";
import { useLocale } from "@/components/locale-context";
import { NewspaperFooter } from "@/components/newspaper/footer";
import { NewspaperMasthead } from "@/components/newspaper/masthead";
import { localizePath } from "@/lib/locale-routing";
import { formatArchiveMonth, formatDisplayDate, groupPreviewsByDate } from "@/lib/news-client";
import type { NewsPreview } from "@/lib/news";

// Only the first few day-groups are rendered into the static HTML; the rest are
// revealed client-side on demand so a busy month doesn't bloat the payload.
const INITIAL_GROUPS = 8;
const GROUPS_STEP = 8;

type MonthArchivePageContentProps = {
  month: string;
  /** Already resolved for the current route's locale by the server page. */
  entries: NewsPreview[];
  previousMonth: string | null;
  nextMonth: string | null;
};

export function MonthArchivePageContent({
  month,
  entries,
  previousMonth,
  nextMonth,
}: MonthArchivePageContentProps) {
  const locale = useLocale();
  const groups = groupPreviewsByDate(entries);
  const [visibleGroups, setVisibleGroups] = useState(INITIAL_GROUPS);
  const shownGroups = groups.slice(0, visibleGroups);
  const remainingGroups = groups.length - shownGroups.length;

  return (
    <div className="np-root">
      <NewspaperMasthead active="archive" archiveMonth={month} />
      <main className="mx-auto w-full" style={{ maxWidth: 1280, padding: 40 }}>
        <section
          style={{
            paddingBottom: 28,
            borderBottom: "1px solid var(--color-border)",
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
            {locale === "en" ? "Monthly archive" : "月度归档"}
          </p>
          <h1
            className="np-serif"
            style={{
              fontSize: 48,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              margin: "12px 0 10px",
              color: "var(--color-text-primary)",
            }}
          >
            {formatArchiveMonth(month, locale)}
          </h1>
          <p className="np-sans" style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: 0 }}>
            {locale === "en"
              ? `${entries.length} digests archived this month.`
              : `本月共归档 ${entries.length} 份日报。`}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            {nextMonth ? (
              <Link href={localizePath(`/archive/${nextMonth}`, locale)} className="np-btn-secondary">
                {locale === "en" ? "← Newer month" : "← 较新的月份"}
              </Link>
            ) : null}
            {previousMonth ? (
              <Link href={localizePath(`/archive/${previousMonth}`, locale)} className="np-btn-secondary">
                {locale === "en" ? "Older month →" : "较早的月份 →"}
              </Link>
            ) : null}
          </div>
        </section>

        {groups.length === 0 ? (
          <section style={{ marginTop: 40 }}>
            <p className="np-sans" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: 0 }}>
              {locale === "en"
                ? "No English digests have been archived for this month yet."
                : "该月份下暂时还没有可展示的日报。"}
            </p>
          </section>
        ) : (
          <section style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 40 }}>
            {shownGroups.map((group) => (
              <div key={group.date}>
                <h2
                  className="np-serif"
                  style={{
                    fontSize: 30,
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
                    margin: "0 0 16px",
                    color: "var(--color-text-primary)",
                    paddingBottom: 10,
                    borderBottom: "1px solid var(--color-border-soft)",
                  }}
                >
                  {formatDisplayDate(group.date, locale)}
                </h2>

                <div className="grid gap-4 xl:grid-cols-2">
                  {group.entries.map((entry) => (
                    <NewsCard key={`${entry.topic}-${entry.date}`} entry={entry} />
                  ))}
                </div>
              </div>
            ))}

            {remainingGroups > 0 ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  className="np-btn-secondary"
                  onClick={() => setVisibleGroups((count) => count + GROUPS_STEP)}
                >
                  {locale === "en"
                    ? `Load more (${remainingGroups} more day${remainingGroups === 1 ? "" : "s"})`
                    : `加载更多（剩余 ${remainingGroups} 天）`}
                </button>
              </div>
            ) : null}
          </section>
        )}

        <NewspaperFooter />
      </main>
    </div>
  );
}
