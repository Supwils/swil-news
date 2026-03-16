"use client";

import { ArrowUpRight, Clock3, FileText, Layers3 } from "lucide-react";

import { SelectableLink } from "@/components/SelectableLink";

import { useLocale } from "@/components/locale-context";
import { InlineMarkdown } from "@/components/news-markdown";
import { TopicIcon } from "@/components/topic-icon";
import { getCopy } from "@/data/copy";
import { formatDisplayDate } from "@/lib/news-client";
import { getTopicMeta } from "@/lib/news-meta";
import type { NewsPreview } from "@/lib/news";

type NewsCardProps = {
  entry: NewsPreview;
  compact?: boolean;
  className?: string;
};

export function NewsCard({ entry, compact = false, className }: NewsCardProps) {
  const locale = useLocale();
  const copy = getCopy(locale);
  const topic = getTopicMeta(entry.topic, locale);

  if (!topic) {
    return null;
  }

  const newsHref = `/news/${entry.topic}/${entry.date}`;

  return (
    <SelectableLink
      href={newsHref}
      className="block cursor-pointer"
      aria-label={copy.ui.newsCard.viewEntry(entry.title)}
    >
      <article
        className={[
          "group relative overflow-hidden rounded-[28px] border border-(--color-border) bg-(--color-surface)/92 p-5 shadow-(--shadow-card) transition duration-300 hover:-translate-y-[3px] hover:border-(--color-border-strong) hover:shadow-(--shadow-card-hover) sm:p-6",
          className ?? "",
        ].join(" ")}
      >
      <div className="select-text">
      <div
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 translate-x-[-140%] bg-[linear-gradient(90deg,transparent,var(--color-card-sheen),transparent)] opacity-0 transition duration-500 group-hover:translate-x-[430%] group-hover:opacity-100"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px opacity-80"
        style={{
          background: `linear-gradient(90deg, transparent, ${topic.accent}, transparent)`,
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{
              color: topic.accent,
              borderColor: topic.accent,
              background: "color-mix(in srgb, var(--color-surface) 78%, transparent)",
            }}
          >
            <TopicIcon
              topic={entry.topic}
              size={18}
              variant="badge"
              className="group-hover:translate-x-0.5"
            />
            {topic.shortLabel}
          </span>

          <div className="space-y-2">
            <h3 className="max-w-3xl text-lg leading-tight font-semibold text-(--color-text-primary) sm:text-[1.35rem]">
              {entry.title}
            </h3>
            <InlineMarkdown
              content={entry.description}
              className="max-w-3xl text-sm leading-7 text-(--color-text-secondary) sm:text-[0.98rem]"
            />
          </div>
        </div>

        <span
          className="hidden rounded-full border border-(--color-border) bg-(--color-surface-muted) p-3 text-(--color-text-primary) transition duration-200 group-hover:border-(--color-border-strong) group-hover:bg-(--color-surface) group-hover:translate-x-0.5 sm:inline-flex"
          aria-hidden
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-(--color-text-muted)">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1.5">
          <Clock3 size={13} />
          {entry.readingMinutes} {copy.ui.newsCard.min}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1.5">
          <Layers3 size={13} />
          {entry.sectionCount} {copy.ui.newsCard.sections}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1.5">
          <FileText size={13} />
          {entry.articleCount} {copy.ui.newsCard.stories}
        </span>
        <span className="rounded-full border border-(--color-border) px-3 py-1.5">
          {formatDisplayDate(entry.date, locale)}
        </span>
      </div>

      {!compact && entry.highlights.length > 0 ? (
        <div className="mt-5 space-y-2">
          {entry.highlights.slice(0, 3).map((highlight) => (
            <div
              key={highlight}
              className="rounded-2xl border border-(--color-border-soft) bg-(--color-surface-muted)/80 px-4 py-3 text-sm leading-6 text-(--color-text-secondary)"
            >
              <InlineMarkdown content={highlight} />
            </div>
          ))}
        </div>
      ) : null}

      {entry.takeaway ? (
        <div className="mt-5 border-l border-(--color-border-strong) pl-4 text-sm leading-7 text-(--color-text-primary)">
          <InlineMarkdown content={entry.takeaway} />
        </div>
      ) : null}

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-(--color-text-primary) transition group-hover:gap-3 sm:hidden">
        {copy.ui.newsCard.readFull}
        <ArrowUpRight size={15} />
      </span>
      </div>
    </article>
    </SelectableLink>
  );
}
