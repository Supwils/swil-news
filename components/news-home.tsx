"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Bookmark, Check, ExternalLink, RotateCcw, Search } from "lucide-react";

import { useLocale } from "@/components/locale-context";
import { InlineMarkdown } from "@/components/news-markdown";
import { NewspaperFooter } from "@/components/newspaper/footer";
import { NewspaperMasthead } from "@/components/newspaper/masthead";
import { formatDisplayDate } from "@/lib/news-client";
import type { NewsPreview } from "@/lib/news";
import { TOPICS, getTopicMeta, isTopicKey, type TopicKey } from "@/lib/news-meta";

type NewsHomeProps = {
  entries: NewsPreview[];
  todayDate: string | null;
  todayEntries: NewsPreview[];
  previousDate: string | null;
  previousEntries: NewsPreview[];
  topicCounts: Partial<Record<TopicKey, number>>;
};

type ReadingSession = {
  articleId: string;
  articleTitle: string;
  topic: TopicKey;
  progress: number;
  lastReadAt: number;
};

type TopicFilter = TopicKey | "all";

const READ_THRESHOLD = 0.9;
const READING_SESSION_KEY = "s-news-reading-session";
const READ_SET_KEY = "s-news-read-articles";
const CONTINUE_DISMISSED_KEY = "s-news-continue-dismissed";

const MONTHS_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const TOPIC_COLOR_VAR: Record<TopicKey, string> = {
  general: "var(--np-t-general)",
  finance: "var(--np-t-finance)",
  "ai-tech": "var(--np-t-ai-tech)",
  science: "var(--np-t-science)",
  crypto: "var(--np-t-crypto)",
  "energy-climate": "var(--np-t-energy-climate)",
  "auto-mobility": "var(--np-t-auto-mobility)",
  gaming: "var(--np-t-gaming)",
  "supply-chain": "var(--np-t-supply-chain)",
  "sports-health-nutrition": "var(--np-t-sports-health-nutrition)",
};

function articleHref(entry: NewsPreview) {
  return `/news/${entry.topic}/${entry.date}`;
}

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*([\s\S]+?)\*\*/g, "$1")
    .replace(/\*([^*\n]+?)\*/g, "$1")
    .replace(/`([^`\n]+?)`/g, "$1")
    .replace(/\[([^\]]+?)\]\([^)]+?\)/g, "$1");
}

function articleId(entry: Pick<NewsPreview, "topic" | "date">) {
  return `${entry.topic}:${entry.date}`;
}

export function NewsHome(props: NewsHomeProps) {
  const { entries, todayDate, todayEntries, previousDate, previousEntries, topicCounts } = props;
  const locale = useLocale();
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");
  const activeTopic: TopicFilter = topicParam && isTopicKey(topicParam) ? topicParam : "all";

  const topicsWithLocale = useMemo(
    () => TOPICS.map((t) => getTopicMeta(t.key, locale)!),
    [locale],
  );

  const totalCount = entries.length;

  // Derive the sections for the current filter.
  const {
    leadEntry,
    briefEntries,
    briefMoreCount,
    tabloidBig,
    tabloidSmall,
    tabloidDate,
  } = useMemo(() => {
    if (activeTopic === "all") {
      const lead =
        todayEntries.find((e) => e.topic === "general") ?? todayEntries[0] ?? null;
      const briefPool = todayEntries.filter((e) => !lead || articleId(e) !== articleId(lead));
      const briefs = briefPool.slice(0, 5);
      const more = Math.max(0, todayEntries.length - 1 - briefs.length);

      const tabBig =
        previousEntries.find((e) => e.topic === "general") ?? previousEntries[0] ?? null;
      const tabSmallPool = previousEntries.filter(
        (e) => !tabBig || articleId(e) !== articleId(tabBig),
      );
      return {
        leadEntry: lead,
        briefEntries: briefs,
        briefMoreCount: more,
        tabloidBig: tabBig,
        tabloidSmall: tabSmallPool.slice(0, 4),
        tabloidDate: previousDate,
      };
    }

    const topicEntries = entries.filter((e) => e.topic === activeTopic);
    const lead = topicEntries[0] ?? null;
    const briefs = topicEntries.slice(1, 6);
    const tabBig = topicEntries[6] ?? null;
    const tabSmall = topicEntries.slice(7, 11);
    return {
      leadEntry: lead,
      briefEntries: briefs,
      briefMoreCount: Math.max(0, topicEntries.length - 1 - briefs.length),
      tabloidBig: tabBig,
      tabloidSmall: tabSmall,
      tabloidDate: tabBig?.date ?? null,
    };
  }, [activeTopic, entries, previousDate, previousEntries, todayEntries]);

  // localStorage-backed client state. Kept in a single object so we can hydrate
  // in one setState call.
  const [clientState, setClientState] = useState<{
    readSet: Set<string>;
    session: ReadingSession | null;
    continueDismissed: boolean;
  }>({ readSet: new Set(), session: null, continueDismissed: false });
  const { readSet, session, continueDismissed } = clientState;

  useEffect(() => {
    try {
      let readSetNext = new Set<string>();
      let sessionNext: ReadingSession | null = null;
      const readRaw = localStorage.getItem(READ_SET_KEY);
      if (readRaw) {
        readSetNext = new Set(JSON.parse(readRaw) as string[]);
      }
      const sessRaw = localStorage.getItem(READING_SESSION_KEY);
      if (sessRaw) {
        const parsed = JSON.parse(sessRaw) as ReadingSession;
        if (parsed.progress < READ_THRESHOLD) sessionNext = parsed;
      }
      const dismissed = sessionStorage.getItem(CONTINUE_DISMISSED_KEY) === "1";
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration from browser storage
      setClientState({ readSet: readSetNext, session: sessionNext, continueDismissed: dismissed });
    } catch {
      // ignore
    }
  }, []);

  const handleDismissContinue = () => {
    sessionStorage.setItem(CONTINUE_DISMISSED_KEY, "1");
    setClientState((s) => ({ ...s, continueDismissed: true }));
  };

  const currentMonth = todayDate?.slice(0, 7) ?? null;

  return (
    <div className="np-root">
      <NewspaperMasthead active="today" date={todayDate ?? undefined} archiveMonth={currentMonth ?? undefined} />
      <TopicRail
        activeTopic={activeTopic}
        totalCount={totalCount}
        topicCounts={topicCounts}
        topics={topicsWithLocale}
        locale={locale}
      />

      <main className="mx-auto w-full" style={{ maxWidth: 1280, padding: 40 }}>
        <HeroGrid
          lead={leadEntry}
          briefs={briefEntries}
          moreCount={briefMoreCount}
          locale={locale}
          activeTopic={activeTopic}
          currentMonth={currentMonth}
          todayDate={todayDate}
        />

        {session && !continueDismissed ? (
          <ContinueStrip session={session} onDismiss={handleDismissContinue} locale={locale} />
        ) : null}

        {tabloidBig ? (
          <YesterdayTabloid
            big={tabloidBig}
            small={tabloidSmall}
            date={tabloidDate}
            locale={locale}
            readSet={readSet}
            activeTopic={activeTopic}
          />
        ) : null}

        <NewspaperFooter />
      </main>
    </div>
  );
}

// --- Sub-components --------------------------------------------------------

function TopicRail({
  activeTopic,
  totalCount,
  topicCounts,
  topics,
  locale,
}: {
  activeTopic: TopicFilter;
  totalCount: number;
  topicCounts: Partial<Record<TopicKey, number>>;
  topics: Array<{ key: TopicKey; shortLabel: string }>;
  locale: "zh" | "en";
}) {
  return (
    <div
      id="topics"
      style={{
        background: "var(--np-paper-warm)",
        borderBottom: "1px solid var(--np-rule)",
        padding: "8px 40px",
      }}
    >
      <div
        className="mx-auto flex w-full flex-wrap items-center"
        style={{ maxWidth: 1280, gap: 6 }}
      >
        <Link
          href="/"
          className="np-chip"
          data-active={activeTopic === "all" || undefined}
          style={{ ["--_dot" as string]: "var(--np-ink)" } as CSSProperties}
        >
          <span className="np-chip-dot" />
          <span>{locale === "zh" ? "全部" : "All"}</span>
          <span className="np-chip-count">{totalCount}</span>
        </Link>

        {topics.map((t) => (
          <Link
            key={t.key}
            href={`/?topic=${t.key}`}
            className="np-chip"
            data-active={activeTopic === t.key || undefined}
            style={{ ["--_dot" as string]: TOPIC_COLOR_VAR[t.key] } as CSSProperties}
          >
            <span className="np-chip-dot" />
            <span>{t.shortLabel}</span>
            <span className="np-chip-count">{topicCounts[t.key] ?? 0}</span>
          </Link>
        ))}

        <span className="ml-auto np-mono" style={{ fontSize: 11, color: "var(--np-ink3)", letterSpacing: "0.14em" }}>
          <Search size={12} style={{ display: "inline", verticalAlign: "-1px", marginRight: 6 }} />
          {locale === "zh" ? "搜索归档" : "Search digests"}
        </span>
      </div>
    </div>
  );
}

function HeroGrid({
  lead,
  briefs,
  moreCount,
  locale,
  activeTopic,
  currentMonth,
  todayDate,
}: {
  lead: NewsPreview | null;
  briefs: NewsPreview[];
  moreCount: number;
  locale: "zh" | "en";
  activeTopic: TopicFilter;
  currentMonth: string | null;
  todayDate: string | null;
}) {
  if (!lead) {
    return (
      <section style={{ paddingBottom: 40, borderBottom: "1px solid var(--np-rule)" }}>
        <p className="np-serif" style={{ fontSize: 28, color: "var(--np-ink2)", margin: 0 }}>
          {locale === "zh" ? "今日暂无新日报。" : "No issue published yet today."}
        </p>
      </section>
    );
  }

  const leadMeta = getTopicMeta(lead.topic, locale)!;
  const kickerLabel =
    locale === "zh" ? (activeTopic === "all" ? "今日头条" : leadMeta.label) : leadMeta.label.toUpperCase();
  const kickerTime = activeTopic === "all"
    ? (locale === "zh" ? "今日" : "TODAY")
    : (locale === "zh" ? formatDisplayDate(lead.date, locale) : lead.date);

  return (
    <section
      className="np-hero-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr",
        gap: 48,
        paddingBottom: 40,
        borderBottom: "1px solid var(--np-rule)",
      }}
    >
      <LeadStory lead={lead} kickerLabel={kickerLabel} kickerTime={kickerTime} locale={locale} />

      <aside>
        <RuleLabel
          left={
            locale === "zh"
              ? activeTopic === "all"
                ? `今日简报 · 共 ${briefs.length + (lead ? 1 : 0)} 条`
                : `${leadMeta.label} · 最近 ${briefs.length + 1} 条`
              : activeTopic === "all"
                ? `TODAY'S BRIEFS · ${briefs.length + (lead ? 1 : 0)} STACKED`
                : `${leadMeta.label.toUpperCase()} · RECENT ${briefs.length + 1}`
          }
        />

        {briefs.length === 0 ? (
          <p className="np-sans" style={{ color: "var(--np-ink3)", fontSize: 14, padding: "20px 0" }}>
            {locale === "zh" ? "今日没有更多简报。" : "No more briefs for today."}
          </p>
        ) : (
          briefs.map((entry) => <StoryRow key={articleId(entry)} entry={entry} locale={locale} />)
        )}

        {moreCount > 0 ? (
          <Link
            href={
              activeTopic === "all" && todayDate && currentMonth
                ? `/archive/${currentMonth}`
                : activeTopic !== "all"
                  ? `/news/${activeTopic}/${lead.date}`
                  : "#"
            }
            className="np-btn-ghost"
            style={{ marginTop: 18 }}
          >
            {locale === "zh"
              ? `查看${activeTopic === "all" ? "今日" : leadMeta.label}全部 ${briefs.length + moreCount + 1} 条 →`
              : `SEE ALL ${briefs.length + moreCount + 1} ${activeTopic === "all" ? "TODAY" : leadMeta.label.toUpperCase()} →`}
          </Link>
        ) : null}
      </aside>
    </section>
  );
}

function LeadStory({
  lead,
  kickerLabel,
  kickerTime,
  locale,
}: {
  lead: NewsPreview;
  kickerLabel: string;
  kickerTime: string;
  locale: "zh" | "en";
}) {
  return (
    <article>
      <Link href={articleHref(lead)} style={{ display: "block" }}>
        <div className="np-mono" style={styles.kicker}>
          <span
            style={{
              width: 8,
              height: 8,
              background: "var(--np-ink-red)",
              display: "inline-block",
              marginRight: 2,
            }}
          />
          {`${locale === "zh" ? "头条" : "LEAD"} · ${kickerTime} · ${kickerLabel}`}
        </div>
        <h2
          className="np-serif np-lead-headline"
          style={{
            fontSize: 56,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            color: "var(--np-ink)",
            margin: "0 0 18px",
          }}
        >
          <InlineMarkdown content={lead.title} inline disableLinks />
        </h2>
        <div
          className="np-serif"
          style={{
            fontStyle: "italic",
            fontSize: 19,
            lineHeight: 1.55,
            color: "var(--np-ink2)",
            maxWidth: 640,
            margin: "0 0 20px",
          }}
        >
          <InlineMarkdown content={lead.description} disableLinks />
        </div>
        <div
          className="np-sans"
          style={{ fontSize: 14, color: "var(--np-ink3)", display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 20 }}
        >
          <span>{formatDisplayDate(lead.date, locale)}</span>
          <span>·</span>
          <span>{locale === "zh" ? `${lead.readingMinutes} 分钟阅读` : `${lead.readingMinutes} min read`}</span>
          {lead.articleCount ? (
            <>
              <span>·</span>
              <span>{locale === "zh" ? `${lead.articleCount} 条要闻` : `${lead.articleCount} stories`}</span>
            </>
          ) : null}
        </div>

        <div
          className="np-hero-placeholder"
          style={{
            aspectRatio: "16 / 8",
            border: "1px solid var(--np-rule)",
            position: "relative",
          }}
        >
          {lead.takeaway ? (
            <span
              className="np-mono"
              style={{
                position: "absolute",
                left: 12,
                bottom: 10,
                fontSize: 12,
                color: "var(--np-ink3)",
                background: "color-mix(in srgb, var(--np-paper) 85%, transparent)",
                padding: "2px 6px",
              }}
            >
              {stripInlineMarkdown(lead.takeaway).slice(0, 80)}
            </span>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

function RuleLabel({ left }: { left: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
      <span
        className="np-mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--np-ink3)",
        }}
      >
        {left}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--np-rule)" }} />
    </div>
  );
}

function StoryRow({ entry, locale }: { entry: NewsPreview; locale: "zh" | "en" }) {
  const meta = getTopicMeta(entry.topic, locale)!;
  return (
    <Link href={articleHref(entry)} className="np-story-row">
      <div>
        <div
          className="np-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: TOPIC_COLOR_VAR[entry.topic],
            fontWeight: 600,
          }}
        >
          {meta.shortLabel}
        </div>
        <div className="np-mono" style={{ fontSize: 11, color: "var(--np-ink3)", marginTop: 6 }}>
          {formatDisplayDate(entry.date, locale)}
        </div>
      </div>
      <div>
        <h3
          className="np-serif np-story-title"
          style={{
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            fontWeight: 600,
            color: "var(--np-ink)",
            margin: 0,
          }}
        >
          <InlineMarkdown content={entry.title} inline disableLinks />
        </h3>
        <div
          className="np-sans"
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            color: "var(--np-ink2)",
            maxWidth: 560,
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          <InlineMarkdown content={entry.description} disableLinks />
        </div>
      </div>
      <div
        className="np-mono"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
          fontSize: 11,
          color: "var(--np-ink3)",
          whiteSpace: "nowrap",
        }}
      >
        <span>{locale === "zh" ? `${entry.readingMinutes} 分钟` : `${entry.readingMinutes} min`}</span>
        <span className="np-story-go" style={{ color: "var(--np-ink)", opacity: 0.7 }}>
          {locale === "zh" ? "读 →" : "READ →"}
        </span>
      </div>
    </Link>
  );
}

function ContinueStrip({
  session,
  onDismiss,
  locale,
}: {
  session: ReadingSession;
  onDismiss: () => void;
  locale: "zh" | "en";
}) {
  const pct = Math.round(session.progress * 100);
  const meta = getTopicMeta(session.topic, locale);
  const label = meta?.label ?? session.topic;
  const body =
    locale === "zh"
      ? `昨日「${label}」读到 ${pct}% —— 回到原处继续。`
      : `Paused on ${label} at ${pct}%. Pick up where you left off.`;

  const href = `/news/${session.topic}/${session.articleId.split(":")[1] ?? ""}`;

  return (
    <section
      style={{
        padding: "24px 0",
        borderBottom: "1px solid var(--np-rule)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 999,
            background: "var(--np-ink)",
            color: "var(--np-paper)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <RotateCcw size={20} />
        </div>
        <div>
          <div
            className="np-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--np-ink3)",
            }}
          >
            {locale === "zh" ? "继续阅读" : "CONTINUE READING"}
          </div>
          <div className="np-serif" style={{ fontSize: 20, color: "var(--np-ink)", marginTop: 4 }}>
            {body}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Link href={href} className="np-btn-primary">
          {locale === "zh" ? "继续阅读" : "Resume"}
        </Link>
        <button type="button" className="np-btn-secondary" onClick={onDismiss}>
          {locale === "zh" ? "稍后" : "Later"}
        </button>
      </div>
    </section>
  );
}

function YesterdayTabloid({
  big,
  small,
  date,
  locale,
  readSet,
  activeTopic,
}: {
  big: NewsPreview;
  small: NewsPreview[];
  date: string | null;
  locale: "zh" | "en";
  readSet: Set<string>;
  activeTopic: TopicFilter;
}) {
  const month = date?.slice(0, 7);
  const sectionLabel =
    activeTopic === "all"
      ? locale === "zh"
        ? "昨日"
        : "Yesterday"
      : locale === "zh"
        ? "更早"
        : "Earlier";

  const dateDisplay = date ? formatDisplayDate(date, locale) : "";

  return (
    <section style={{ padding: "40px 0 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h2
          className="np-serif"
          style={{
            fontSize: 34,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            margin: 0,
            color: "var(--np-ink)",
          }}
        >
          {`${sectionLabel} · ${dateDisplay}`}
        </h2>
        {month ? (
          <Link
            href={`/archive/${month}`}
            className="np-mono"
            style={{ fontSize: 12, color: "var(--np-ink3)", letterSpacing: "0.06em" }}
          >
            {locale === "zh"
              ? `查看 ${month} 全部 →`
              : `SEE ALL ${MONTHS_EN[Number(month.split("-")[1]) - 1]} ${month.split("-")[0]} →`}
          </Link>
        ) : null}
      </div>

      <div className="np-tabloid">
        <TabloidBig entry={big} locale={locale} isRead={readSet.has(articleId(big))} />

        {small.map((entry, idx) => {
          const top = idx < 2;
          const left = idx % 2 === 0;
          return (
            <TabloidSmall
              key={articleId(entry)}
              entry={entry}
              locale={locale}
              isRead={readSet.has(articleId(entry))}
              borderRight={left}
              borderBottom={top}
            />
          );
        })}
      </div>
    </section>
  );
}

function TabloidBig({
  entry,
  locale,
  isRead,
}: {
  entry: NewsPreview;
  locale: "zh" | "en";
  isRead: boolean;
}) {
  const meta = getTopicMeta(entry.topic, locale)!;
  return (
    <Link
      href={articleHref(entry)}
      className="np-tabloid-big"
      data-read={isRead || undefined}
      style={{ opacity: isRead ? 0.78 : 1, display: "block" }}
    >
      <div
        className="np-mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: TOPIC_COLOR_VAR[entry.topic],
          fontWeight: 600,
        }}
      >
        {`${meta.shortLabel} · ${entry.readingMinutes} MIN`}
      </div>
      <h3
        className="np-serif np-story-title"
        style={{
          fontSize: 30,
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          fontWeight: 600,
          color: "var(--np-ink)",
          margin: "12px 0 12px",
        }}
      >
        <InlineMarkdown content={entry.title} inline disableLinks />
      </h3>
      <div
        className="np-sans"
        style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--np-ink2)", margin: 0 }}
      >
        <InlineMarkdown content={entry.description} disableLinks />
      </div>

      {entry.takeaway ? (
        <div
          style={{
            marginTop: 22,
            padding: "16px 18px",
            background: "var(--np-paper-warm)",
            borderLeft: "3px solid var(--np-ink)",
          }}
        >
          <div
            className="np-mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--np-ink3)",
              marginBottom: 8,
            }}
          >
            {locale === "zh" ? "今日定性" : "TAKEAWAY"}
          </div>
          <div
            className="np-serif"
            style={{ fontStyle: "italic", fontSize: 16, lineHeight: 1.55, color: "var(--np-ink)", margin: 0 }}
          >
            <InlineMarkdown content={entry.takeaway} disableLinks />
          </div>
        </div>
      ) : null}

      <div
        className="np-mono"
        style={{
          marginTop: 22,
          display: "flex",
          gap: 14,
          fontSize: 11,
          color: "var(--np-ink3)",
          letterSpacing: "0.08em",
        }}
      >
        {isRead ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Check size={12} /> READ
          </span>
        ) : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Check size={12} style={{ opacity: 0.3 }} />
            {locale === "zh" ? "未读" : "UNREAD"}
          </span>
        )}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Bookmark size={12} /> {locale === "zh" ? "收藏" : "SAVE"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <ExternalLink size={12} /> {locale === "zh" ? "原文" : "OPEN"}
        </span>
      </div>
    </Link>
  );
}

function TabloidSmall({
  entry,
  locale,
  isRead,
  borderRight,
  borderBottom,
}: {
  entry: NewsPreview;
  locale: "zh" | "en";
  isRead: boolean;
  borderRight: boolean;
  borderBottom: boolean;
}) {
  const meta = getTopicMeta(entry.topic, locale)!;
  return (
    <Link
      href={articleHref(entry)}
      className="np-tabloid-small"
      data-read={isRead || undefined}
      style={{
        borderRight: borderRight ? "1px solid var(--np-rule-soft)" : "none",
        borderBottom: borderBottom ? "1px solid var(--np-rule-soft)" : "none",
        display: "block",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          className="np-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: TOPIC_COLOR_VAR[entry.topic],
            fontWeight: 600,
          }}
        >
          {`${meta.shortLabel} · ${entry.readingMinutes} MIN`}
        </span>
        {isRead ? (
          <span
            className="np-mono"
            style={{ fontSize: 10, color: "var(--np-ink3)", letterSpacing: "0.2em" }}
          >
            READ
          </span>
        ) : null}
      </div>
      <h4
        className="np-serif np-story-title"
        style={{
          fontSize: 19,
          lineHeight: 1.22,
          letterSpacing: "-0.01em",
          fontWeight: 600,
          color: "var(--np-ink)",
          margin: "10px 0 8px",
        }}
      >
        <InlineMarkdown content={entry.title} inline disableLinks />
      </h4>
      <div
        className="np-sans"
        style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--np-ink2)", margin: 0 }}
      >
        <InlineMarkdown content={entry.description} disableLinks />
      </div>
    </Link>
  );
}

// --- shared inline style shards -------------------------------------------

const styles = {
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--np-ink-red)",
    marginBottom: 16,
    fontWeight: 600,
  } satisfies CSSProperties,
};
