"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useLocale } from "@/components/locale-context";
import { localizePath } from "@/lib/locale-routing";
import { formatDisplayDate } from "@/lib/news-client";
import type { NewsPreview } from "@/lib/news";
import { getTopicMeta } from "@/lib/news-meta";

type SearchModalProps = {
  entries: NewsPreview[];
  onClose: () => void;
};

const MAX_RESULTS = 20;

function buildHref(entry: NewsPreview, locale: "zh" | "en") {
  return localizePath(`/news/${entry.topic}/${entry.date}`, locale);
}

export function SearchModal({ entries, onClose }: SearchModalProps) {
  const locale = useLocale();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return entries.slice(0, MAX_RESULTS);
    return entries
      .filter((entry) => {
        const topicLabel = (getTopicMeta(entry.topic, locale)?.label ?? "").toLowerCase();
        return (
          entry.searchText.includes(normalized) ||
          topicLabel.includes(normalized) ||
          entry.date.includes(normalized)
        );
      })
      .slice(0, MAX_RESULTS);
  }, [entries, locale, query]);


  const handleNavigate = (entry: NewsPreview) => {
    onClose();
    router.push(buildHref(entry, locale));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((idx) => Math.min(idx + 1, results.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((idx) => Math.max(idx - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      const target = results[activeIndex];
      if (target) {
        event.preventDefault();
        handleNavigate(target);
      }
    }
  };

  return (
    <div
      className="np-search-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={locale === "zh" ? "搜索日报" : "Search digests"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="np-search-panel" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="text"
          className="np-search-input"
          placeholder={
            locale === "zh"
              ? "搜索标题、摘要、主题或日期 (YYYY-MM-DD)…"
              : "Search titles, summaries, topics, or dates (YYYY-MM-DD)…"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
        />

        <div className="np-search-list">
          {results.length === 0 ? (
            <div className="np-search-empty">
              {locale === "zh" ? "没有匹配的日报。" : "No matching digests."}
            </div>
          ) : (
            results.map((entry, idx) => {
              const meta = getTopicMeta(entry.topic, locale);
              return (
                <Link
                  key={`${entry.topic}:${entry.date}`}
                  href={buildHref(entry, locale)}
                  className="np-search-row"
                  data-active={idx === activeIndex || undefined}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => onClose()}
                >
                  <div className="np-search-row-meta">
                    {`${meta?.shortLabel ?? entry.topic} · ${formatDisplayDate(entry.date, locale)}`}
                  </div>
                  <div className="np-search-row-title">{entry.title}</div>
                </Link>
              );
            })
          )}
        </div>

        <div className="np-search-hint">
          <span>↑↓ {locale === "zh" ? "选择" : "navigate"}</span>
          <span>↵ {locale === "zh" ? "打开" : "open"}</span>
          <span>esc {locale === "zh" ? "关闭" : "close"}</span>
        </div>
      </div>
    </div>
  );
}
