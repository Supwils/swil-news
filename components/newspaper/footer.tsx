import Link from "next/link";
import type { ReactNode } from "react";

type NewspaperFooterProps = {
  /** UTC timestamp for the "GENERATED …" stamp. Accepts any formatted string. */
  generatedAt?: string;
};

export function NewspaperFooter({ generatedAt }: NewspaperFooterProps) {
  const stamp =
    generatedAt ??
    (() => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(
        now.getUTCDate(),
      )} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())} UTC`;
    })();

  return (
    <footer
      className="np-mono"
      style={{
        marginTop: 40,
        paddingTop: 24,
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        fontSize: 11,
        letterSpacing: "0.08em",
        color: "var(--color-text-muted)",
      }}
    >
      <span>SWIL-NEWS · LOCAL-FIRST DAILY DIGEST</span>
      <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <span>GENERATED {stamp}</span>
        <FooterLink href="/feed.xml">RSS</FooterLink>
        <FooterLink href="/about">ABOUT</FooterLink>
        <FooterLink href="/runtime">RUNTIME</FooterLink>
      </span>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} style={{ color: "var(--color-text-secondary)" }}>
      {children}
    </Link>
  );
}
