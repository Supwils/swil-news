"use client";

import Link from "next/link";
import { useState } from "react";

import type { TopicKey } from "@/lib/news-meta";

type QuickTopicLinksProps = {
  date: string;
  currentTopic: TopicKey;
  availableTopics: TopicKey[];
  topicLabels: { key: TopicKey; label: string }[];
  copy: {
    quickLinkHeading: string;
    quickLinkCurrent: string;
    noNewsHint: string;
  };
};

const TOPIC_COLOR_VAR: Record<TopicKey, string> = {
  general: "var(--color-accent-gold)",
  finance: "var(--color-accent-sky)",
  "ai-tech": "var(--color-accent-rose)",
  science: "var(--color-accent-green)",
  crypto: "var(--color-accent-violet)",
  "energy-climate": "var(--color-accent-amber)",
  "auto-mobility": "var(--color-accent-blue)",
  gaming: "var(--color-accent-fuchsia)",
  "supply-chain": "var(--color-accent-slate)",
  "sports-health-nutrition": "var(--color-accent-emerald)",
};

export function QuickTopicLinks({
  date,
  currentTopic,
  availableTopics,
  topicLabels,
  copy,
}: QuickTopicLinksProps) {
  const [noNewsMessage, setNoNewsMessage] = useState(false);

  const labelMap = new Map(topicLabels.map((t) => [t.key, t.label]));

  return (
    <section
      style={{
        background: "var(--color-surface-muted)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "10px 0",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
        <span
          className="np-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            marginRight: 12,
          }}
        >
          {copy.quickLinkHeading}
        </span>

        {topicLabels.map(({ key }) => {
          const label = labelMap.get(key) ?? key;
          const isCurrent = key === currentTopic;
          const hasNews = availableTopics.includes(key);
          const dot = (
            <span
              className="np-chip-dot"
              style={{ background: TOPIC_COLOR_VAR[key] } as React.CSSProperties}
            />
          );

          if (isCurrent) {
            return (
              <span key={key} className="np-chip" data-active aria-current="page">
                {dot}
                <span>{label}</span>
                <span className="np-chip-count">{copy.quickLinkCurrent}</span>
              </span>
            );
          }

          if (hasNews) {
            return (
              <Link key={key} href={`/news/${key}/${date}`} className="np-chip">
                {dot}
                <span>{label}</span>
              </Link>
            );
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => setNoNewsMessage(true)}
              className="np-chip"
              style={{ opacity: 0.55 }}
              title={copy.noNewsHint}
            >
              {dot}
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {noNewsMessage && (
        <p
          className="np-sans"
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "var(--color-text-secondary)",
            paddingLeft: 2,
          }}
          role="status"
        >
          {copy.noNewsHint}
        </p>
      )}
    </section>
  );
}
