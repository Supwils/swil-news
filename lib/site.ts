import type { Locale } from "@/data/copy";

export const SITE_NAME = "Swil-News";
export const SITE_DESCRIPTION =
  "Local-first daily news desk with archived multi-topic AI-generated digests.";
export const SITE_DEFAULT_LOCALE: Locale = "zh";

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  return normalizeBaseUrl(envUrl ?? "http://localhost:3011");
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${getSiteUrl()}/`).toString();
}

export function getLanguageTag(locale: Locale) {
  return locale === "en" ? "en-US" : "zh-CN";
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "en" ? "en_US" : "zh_CN";
}
