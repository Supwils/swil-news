"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

import { useLocale } from "@/components/locale-context";
import { LocaleSwitch } from "@/components/locale-switch";
import { ThemeSwitch } from "@/components/theme-switch";

const WEEKDAYS_EN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

type NavRoute = "today" | "archive" | "topics" | "about" | null;

type MastheadProps = {
  /** Which nav item to mark as active. `null` = no active item (e.g. detail page). */
  active?: NavRoute;
  /** Date used for the mono stamp. Falls back to today's date. */
  date?: string;
  /** Archive month for the "Archive" link (YYYY-MM). Defaults to current month. */
  archiveMonth?: string;
};

function formatStamp(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return "";
  const d = new Date(Date.UTC(year, month - 1, day));
  const weekday = WEEKDAYS_EN[d.getUTCDay()];
  const monthLabel = MONTHS_EN[month - 1];
  const dayStr = String(day).padStart(2, "0");
  const monthStr = String(month).padStart(2, "0");
  return `${weekday} · ${monthLabel} ${dayStr} · ${year} · ISSUE № ${year}.${monthStr}.${dayStr}`;
}

export function NewspaperMasthead({ active = null, date, archiveMonth }: MastheadProps) {
  const locale = useLocale();
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const fallbackDate = `${today.getUTCFullYear()}-${pad(today.getUTCMonth() + 1)}-${pad(today.getUTCDate())}`;
  const stampDate = date ?? fallbackDate;
  const stamp = formatStamp(stampDate);
  const archiveHref = `/archive/${archiveMonth ?? stampDate.slice(0, 7)}`;

  return (
    <header
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        padding: "14px 40px",
      }}
    >
      <div
        className="mx-auto flex w-full flex-wrap items-baseline justify-between"
        style={{ maxWidth: 1280, gap: 16 }}
      >
        <div className="flex items-baseline" style={{ gap: 16 }}>
          <Link href="/" className="np-serif" style={wordmark}>
            Swil-News
          </Link>
          {stamp ? (
            <span className="np-mono" style={stampStyle}>
              {stamp}
            </span>
          ) : null}
        </div>

        <nav className="np-nav-hide flex items-center" style={{ gap: 20 }}>
          <NavItem href="/" active={active === "today"}>
            {locale === "zh" ? "今日" : "Today"}
          </NavItem>
          <NavItem href={archiveHref} active={active === "archive"}>
            {locale === "zh" ? "归档" : "Archive"}
          </NavItem>
          <NavItem href="/#topics" active={active === "topics"}>
            {locale === "zh" ? "主题" : "Topics"}
          </NavItem>
          <NavItem href="/about" active={active === "about"}>
            {locale === "zh" ? "关于" : "About"}
          </NavItem>
          <span
            className="np-mono"
            style={{ ...stampStyle, letterSpacing: "0.06em", marginLeft: 4, marginRight: 4 }}
            aria-hidden
          >
            ·
          </span>
          <LocaleSwitch />
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="np-sans"
      style={{
        fontSize: 13,
        color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        textDecoration: active ? "underline" : "none",
        textUnderlineOffset: 6,
        textDecorationThickness: 1,
      }}
    >
      {children}
    </Link>
  );
}

const wordmark: CSSProperties = {
  fontSize: 26,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "var(--color-text-primary)",
  lineHeight: 1,
};

const stampStyle: CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.08em",
  color: "var(--color-text-muted)",
};
