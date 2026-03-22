import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { LocaleProvider } from "@/components/locale-context";
import { LocaleSwitch } from "@/components/locale-switch";
import { ThemeSwitch } from "@/components/theme-switch";
import "./global.css";
import { absoluteUrl, getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

import { Analytics } from "@vercel/analytics/next";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  keywords: [
    "AI news",
    "daily digest",
    "news archive",
    "local-first",
    "technology news",
    "finance news",
    "science news",
  ],
  icons: {
    icon: "/snew-logo1.svg",
    apple: "/snew-logo1.svg",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} open graph image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/twitter-image")],
  },
};

const themeScript = `
(function(){
  var t=localStorage.getItem('s-news-theme');
  if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);
  else document.documentElement.removeAttribute('data-theme');
})();
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LocaleProvider>
          <div className="fixed right-3 top-3 z-[9999] flex items-center gap-2 sm:right-6 sm:top-4 md:top-5" style={{ pointerEvents: "auto" }}>
            <LocaleSwitch />
            <ThemeSwitch />
          </div>
          {children}
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
