"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

type NewsMarkdownProps = {
  content: string;
};

type InlineMarkdownProps = {
  content: string;
  className?: string;
  /** When true, render markdown links as plain spans — useful when placed inside an outer <a>. */
  disableLinks?: boolean;
  /** Render inside a span instead of a div, for inline use within a paragraph. */
  inline?: boolean;
};

/**
 * CJK-safe inline markdown tokenizer.
 *
 * ReactMarkdown / CommonMark refuses to treat `**bold**` as emphasis when it sits
 * flush against CJK characters (e.g. `典型的**"..."**：`) because the "flanking"
 * rules require ASCII whitespace/punctuation around the delimiters. Our Chinese
 * digests hit this constantly, so we roll a permissive mini-parser for bold /
 * italic / inline code / links on short text fields.
 */
function tokenizeInline(
  text: string,
  disableLinks: boolean,
  keyCounter: { n: number } = { n: 0 },
): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([\s\S]+?)\*\*|`([^`\n]+?)`|\[([^\]]+?)\]\(([^)\s]+?)\)|\*([^*\n]+?)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`b${keyCounter.n++}`} style={{ fontWeight: 600, color: "inherit" }}>
          {tokenizeInline(match[1], disableLinks, keyCounter)}
        </strong>,
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <code
          key={`c${keyCounter.n++}`}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.92em",
            padding: "0.05em 0.3em",
            background: "var(--color-surface-muted)",
          }}
        >
          {match[2]}
        </code>,
      );
    } else if (match[3] !== undefined && match[4] !== undefined) {
      if (disableLinks) {
        nodes.push(
          <span
            key={`l${keyCounter.n++}`}
            style={{ textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            {tokenizeInline(match[3], disableLinks, keyCounter)}
          </span>,
        );
      } else {
        nodes.push(
          <a
            key={`l${keyCounter.n++}`}
            href={match[4]}
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            {tokenizeInline(match[3], disableLinks, keyCounter)}
          </a>,
        );
      }
    } else if (match[5] !== undefined) {
      nodes.push(
        <em key={`i${keyCounter.n++}`} style={{ color: "inherit" }}>
          {tokenizeInline(match[5], disableLinks, keyCounter)}
        </em>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

/** Renders short markdown (e.g. description, highlights, takeaway) so **bold** is displayed correctly, even adjacent to CJK characters. */
export function InlineMarkdown({
  content,
  className = "",
  disableLinks = false,
  inline = false,
}: InlineMarkdownProps) {
  const Wrapper = inline ? "span" : "div";
  return <Wrapper className={className}>{tokenizeInline(content, disableLinks)}</Wrapper>;
}

/** Preprocess full-article markdown so CJK-adjacent `**bold**` is recognized by CommonMark. */
function padCjkEmphasis(md: string): string {
  const CJK = "\\u3000-\\u303f\\u3040-\\u309f\\u30a0-\\u30ff\\u3400-\\u4dbf\\u4e00-\\u9fff\\uff00-\\uffef";
  const before = new RegExp(`([${CJK}])\\*\\*`, "gu");
  const after = new RegExp(`\\*\\*([${CJK}])`, "gu");
  return md.replace(before, "$1​**").replace(after, "**​$1");
}

export function NewsMarkdown({ content }: NewsMarkdownProps) {
  return (
    <div className="news-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-4xl leading-none tracking-[-0.04em] text-(--color-text-primary) sm:text-5xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display mt-12 border-t border-(--color-border) pt-8 text-3xl leading-none tracking-[-0.03em] text-(--color-text-primary)">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl leading-8 font-semibold text-(--color-text-primary) sm:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[15px] leading-8 text-(--color-text-secondary) sm:text-base">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-(--color-text-primary)">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-[3px] border-(--color-text-primary) bg-(--color-surface-muted) px-5 py-4 text-(--color-text-secondary) italic">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => <ul className="space-y-3">{children}</ul>,
          li: ({ children }) => (
            <li className="ml-4 list-disc pl-2 text-[15px] leading-8 text-(--color-text-secondary) sm:text-base">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-(--color-border-strong) underline-offset-4 transition hover:text-(--color-text-primary)"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-8 border-(--color-border)" />,
        }}
      >
        {padCjkEmphasis(content)}
      </ReactMarkdown>
    </div>
  );
}
