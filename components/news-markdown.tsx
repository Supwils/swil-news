import { Children, cloneElement, isValidElement, type ReactNode } from "react";

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
export function tokenizeInline(
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

export function reparseInlineChildren(
  children: ReactNode,
  disableLinks: boolean,
  keyCounter: { n: number } = { n: 0 },
): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return tokenizeInline(child, disableLinks, keyCounter);
    }

    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return child;
    }

    if (typeof child.type === "string" && (child.type === "code" || child.type === "pre")) {
      return child;
    }

    if (child.props.children === undefined) {
      return child;
    }

    return cloneElement(child, {
      children: reparseInlineChildren(
        child.props.children,
        disableLinks || child.type === "a",
        keyCounter,
      ),
    });
  });
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
