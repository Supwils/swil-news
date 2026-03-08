"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, Newspaper, Search } from "lucide-react";

import { NewsCard } from "@/components/news-card";
import { formatDisplayDate, groupPreviewsByDate, searchEntries } from "@/lib/news-client";
import type { NewsPreview } from "@/lib/news";
import { TOPICS, type TopicKey } from "@/lib/news-meta";

type NewsHomeProps = {
  entries: NewsPreview[];
};

export function NewsHome({ entries }: NewsHomeProps) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<TopicKey | "all">("all");

  const filtered = useMemo(
    () => searchEntries(entries, query, activeTopic),
    [activeTopic, entries, query],
  );

  const groups = useMemo(() => groupPreviewsByDate(filtered), [filtered]);
  const latestDate = entries[0]?.date;
  const latestEntries = latestDate ? entries.filter((entry) => entry.date === latestDate) : [];
  const archiveCount = groups.length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(193,166,111,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(96,161,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.14),_transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.04),_transparent_18%),linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:auto,24px_24px,24px_24px] opacity-40" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 mb-6 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-primary)_75%,transparent)] px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl tracking-[0.18em] uppercase text-[var(--color-text-primary)]">
                S-News
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                Daily news desk, minus the folder chaos
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <Link
                href="/about"
                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              >
                About
              </Link>
              <Link
                href="/runtime"
                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              >
                Runtime
              </Link>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1.5">本地优先</span>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1.5">按日期归档</span>
            </nav>
          </div>
        </header>

        <main className="space-y-8 pb-12">
          <section className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-hero)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,137,45,0.85),rgba(47,126,232,0.8),transparent)] opacity-80" />

            <div className="max-w-4xl space-y-5">
              <div className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] text-[var(--color-accent-gold)]">
                News desk
              </div>
              <h1 className="font-display text-4xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl lg:text-7xl">
                别让日报在文件夹里打地铺。
                <br />
                今天的重要事，已经在这里排好队。
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
                这里先看今天，再翻旧账。想知道这套产品怎么运作、为什么这么排版，去 About；想直接开跑生成，去 Runtime。
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={latestEntries.length > 0 ? "#latest-drop" : "#date-archive"}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-text-primary)] px-5 py-3 text-sm font-medium !text-[var(--color-bg-primary)] transition hover:opacity-90"
              >
                先看今天的新闻
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)]"
              >
                看看 About
              </Link>
              <Link
                href="/runtime"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)]"
              >
                去 Runtime 生成
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="已归档日报" value={`${entries.length}`} hint="都在这儿，不用翻文件夹" />
              <MetricCard
                label="今天有几份"
                value={`${latestEntries.length}`}
                hint={latestDate ? formatDisplayDate(latestDate) : "今天还没上报"}
              />
              <MetricCard label="主题数量" value={`${TOPICS.length}`} hint={TOPICS.map((topic) => topic.shortLabel).join(" / ")} />
              <MetricCard label="归档天数" value={`${archiveCount}`} hint="按日期排队，回看很省心" />
            </div>
          </section>

          {latestEntries.length > 0 ? (
            <section
              id="latest-drop"
              className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-[var(--shadow-card)] sm:p-6 lg:p-8"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-text-muted)]">Today&apos;s stack</p>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
                    {formatDisplayDate(latestDate!)} 的头版
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                    先看最新这一批。它们已经替你把今天的重点排好了，不用自己从零开荒。
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)]">
                  <CalendarDays size={15} />
                  今日已整理 {latestEntries.length} 份日报
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-3">
                {latestEntries.map((entry) => (
                  <NewsCard key={`${entry.topic}-${entry.date}`} entry={entry} compact />
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-[var(--shadow-card)] sm:p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] text-[var(--color-accent-gold)]">
                  <Search size={12} />
                  Signal filter
                </div>
                <h2 className="font-display text-3xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
                  想精读，就筛。
                  <br />
                  想摸鱼，也能快速装得很懂。
                </h2>
                <p className="text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
                  搜索标题、摘要、简评或主题。先把范围缩小，再点进具体日报，眼睛和耐心都会感谢你。
                </p>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <OverviewCard title="按主题看" description="只看金融、只看 AI，或者全都来一遍。" />
                  <OverviewCard title="按关键词找" description="一个词就能把相关日报从归档里揪出来。" />
                  <OverviewCard title="即时反馈" description={`现在命中 ${filtered.length} 份日报，没有神秘加载。`} />
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-muted)]/70 p-5 sm:p-6">
                <label className="block">
                  <span className="sr-only">搜索日报</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                    <Search size={16} className="text-[var(--color-text-muted)]" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="搜标题、摘要、简评或主题…"
                      className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    />
                  </div>
                </label>

                <div className="mt-4 flex flex-wrap gap-2">
                  <FilterButton
                    active={activeTopic === "all"}
                    onClick={() => setActiveTopic("all")}
                    label="全部主题"
                  />
                  {TOPICS.map((topic) => (
                    <FilterButton
                      key={topic.key}
                      active={activeTopic === topic.key}
                      onClick={() => setActiveTopic(topic.key)}
                      label={topic.label}
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">
                  当前命中 <span className="font-semibold text-[var(--color-text-primary)]">{filtered.length}</span> 份日报，
                  按日期倒序展示。
                </p>
              </div>
            </div>
          </section>

          <section id="date-archive" className="space-y-8">
            {groups.map((group) => (
              <div key={group.date} className="space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-text-muted)]">Date archive</p>
                    <h2 className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)]">
                      {formatDisplayDate(group.date)}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]">
                    <Newspaper size={14} />
                    {group.entries.length} issue{group.entries.length > 1 ? "s" : ""}
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  {group.entries.map((entry) => (
                    <NewsCard key={`${entry.topic}-${entry.date}`} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
          </section>

          {groups.length === 0 ? (
            <section className="rounded-[32px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-text-muted)]">No results</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-text-primary)]">
                没有找到匹配内容
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
                换个关键词，或者切回全部主题。日报没有消失，只是暂时没被你逮到。
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-surface-muted)]"
              >
                回到全部视图
              </Link>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">{label}</p>
      <p className="font-display mt-3 text-3xl leading-none tracking-[-0.04em] text-[var(--color-text-primary)]">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{hint}</p>
    </div>
  );
}

function OverviewCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-muted)]/75 p-4 sm:p-5">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-2 text-xs font-medium transition sm:text-sm",
        active
          ? "border-[var(--color-border-strong)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
          : "border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
