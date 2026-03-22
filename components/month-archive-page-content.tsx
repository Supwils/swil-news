"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { NewsCard } from "@/components/news-card";
import { useLocale } from "@/components/locale-context";
import { getCopy } from "@/data/copy";
import { formatArchiveMonth, formatDisplayDate, groupPreviewsByDate } from "@/lib/news-client";
import type { NewsPreview } from "@/lib/news";

type MonthArchivePageContentProps = {
  month: string;
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
  const copy = getCopy(locale);
  const groups = groupPreviewsByDate(entries);

  return (
    <main className="min-h-screen bg-(--color-bg-primary) px-4 py-6 text-(--color-text-primary) sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm text-(--color-text-secondary) transition hover:border-(--color-border-strong) hover:text-(--color-text-primary)"
          >
            <ArrowLeft size={16} />
            {copy.ui.topicPage.backHome}
          </Link>

          <div className="flex flex-wrap gap-2">
            {nextMonth ? (
              <Link
                href={`/archive/${nextMonth}`}
                className="rounded-full border border-(--color-border) px-3 py-1.5 text-sm text-(--color-text-secondary) transition hover:border-(--color-border-strong) hover:text-(--color-text-primary)"
              >
                {locale === "en" ? "Newer month" : "较新的月份"}
              </Link>
            ) : null}
            {previousMonth ? (
              <Link
                href={`/archive/${previousMonth}`}
                className="rounded-full border border-(--color-border) px-3 py-1.5 text-sm text-(--color-text-secondary) transition hover:border-(--color-border-strong) hover:text-(--color-text-primary)"
              >
                {locale === "en" ? "Older month" : "较早的月份"}
              </Link>
            ) : null}
          </div>
        </div>

        <section className="rounded-[32px] border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-(--color-text-muted)">
            {locale === "en" ? "Monthly archive" : "月度归档"}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-none tracking-[-0.04em] sm:text-5xl">
            {formatArchiveMonth(month, locale)}
          </h1>
          <p className="mt-4 text-base leading-8 text-(--color-text-secondary)">
            {locale === "en"
              ? `${entries.length} digests archived in this month.`
              : `本月共归档 ${entries.length} 份日报。`}
          </p>
        </section>

        <section className="space-y-8">
          {groups.map((group) => (
            <div key={group.date} className="space-y-4">
              <div>
                <h2 className="font-display text-3xl leading-none tracking-[-0.03em] text-(--color-text-primary)">
                  {formatDisplayDate(group.date, locale)}
                </h2>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {group.entries.map((entry) => (
                  <NewsCard key={`${entry.topic}-${entry.date}`} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
