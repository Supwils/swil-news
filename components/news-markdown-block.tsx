import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { reparseInlineChildren } from "@/components/news-markdown";

type NewsMarkdownProps = {
  content: string;
};

/**
 * Server-rendered article body. Renders the full markdown tree at build time
 * (every news detail page is `force-static`) so `react-markdown` + `remark-gfm`
 * never ship to the client. Do NOT import this from a client component.
 */
export function NewsMarkdown({ content }: NewsMarkdownProps) {
  return (
    <div className="news-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-4xl leading-none tracking-[-0.04em] text-(--color-text-primary) sm:text-5xl">
              {reparseInlineChildren(children, false)}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display mt-12 border-t border-(--color-border) pt-8 text-3xl leading-none tracking-[-0.03em] text-(--color-text-primary)">
              {reparseInlineChildren(children, false)}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl leading-8 font-semibold text-(--color-text-primary) sm:text-2xl">
              {reparseInlineChildren(children, false)}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[15px] leading-8 text-(--color-text-secondary) sm:text-base">
              {reparseInlineChildren(children, false)}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-(--color-text-primary)">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-[3px] border-(--color-text-primary) bg-(--color-surface-muted) px-5 py-4 text-(--color-text-secondary) italic">
              {reparseInlineChildren(children, false)}
            </blockquote>
          ),
          ul: ({ children }) => <ul className="space-y-3">{children}</ul>,
          li: ({ children }) => (
            <li className="ml-4 list-disc pl-2 text-[15px] leading-8 text-(--color-text-secondary) sm:text-base">
              {reparseInlineChildren(children, false)}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-(--color-border-strong) underline-offset-4 transition hover:text-(--color-text-primary)"
            >
              {reparseInlineChildren(children, true)}
            </a>
          ),
          hr: () => <hr className="my-8 border-(--color-border)" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
