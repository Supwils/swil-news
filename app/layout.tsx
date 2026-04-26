import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { LocaleProvider } from "@/components/locale-context";
import "./global.css";
import { absoluteUrl, getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

import { Analytics } from "@vercel/analytics/next";

const displayFont = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
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

const bootScript = `
(function(){
  var t=localStorage.getItem('s-news-theme');
  if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);
  else document.documentElement.removeAttribute('data-theme');

  var cookieMatch=document.cookie.match(/(?:^|;\\s*)s-news-locale=(zh|en)(?:;|$)/);
  var storedLocale=localStorage.getItem('s-news-locale');
  var locale=(cookieMatch&&cookieMatch[1])||(storedLocale==='zh'||storedLocale==='en'?storedLocale:null);

  if(!locale){
    var candidates=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language])||[];
    for(var i=0;i<candidates.length;i++){
      var candidate=(candidates[i]||'').toLowerCase();
      if(candidate.indexOf('zh')===0){ locale='zh'; break; }
      if(candidate.indexOf('en')===0){ locale='en'; break; }
    }
  }

  if(locale==='zh'||locale==='en'){
    document.documentElement.lang=locale==='en'?'en-US':'zh-CN';
    document.cookie='s-news-locale='+locale+'; path=/; max-age='+(60*60*24*365)+'; SameSite=Lax';
    localStorage.setItem('s-news-locale', locale);
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <LocaleProvider>
          {children}
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
