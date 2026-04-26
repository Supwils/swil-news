"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Locale } from "@/data/copy";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "zh",
  setLocale: () => {},
});

const STORAGE_KEY = "s-news-locale";
const COOKIE_NAME = "s-news-locale";

function syncLocaleOnDocument(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale === "en" ? "en-US" : "zh-CN";
}

function persistLocalePreference(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  window.localStorage.setItem(STORAGE_KEY, locale);
}

function inferLocaleFromNavigator(): Locale | null {
  if (typeof navigator === "undefined") return null;

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = candidate.toLowerCase();
    if (normalized.startsWith("zh")) return "zh";
    if (normalized.startsWith("en")) return "en";
  }

  return null;
}

function readLocaleFromDocument(): Locale | null {
  if (typeof document === "undefined") return null;

  const cookieMatch = document.cookie.match(/(?:^|;\s*)s-news-locale=(zh|en)(?:;|$)/);
  if (cookieMatch?.[1] === "zh" || cookieMatch?.[1] === "en") {
    return cookieMatch[1];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "zh" || stored === "en") {
    return stored;
  }

  return inferLocaleFromNavigator();
}

export function LocaleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>("zh");

  useEffect(() => {
    const nextLocale = readLocaleFromDocument();
    if (nextLocale) {
      syncLocaleOnDocument(nextLocale);
      persistLocalePreference(nextLocale);
      const frame = window.requestAnimationFrame(() => {
        setLocale(nextLocale);
      });
      return () => window.cancelAnimationFrame(frame);
    }
    syncLocaleOnDocument("zh");
  }, []);

  useEffect(() => {
    syncLocaleOnDocument(locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => {
        setLocale(nextLocale);
        persistLocalePreference(nextLocale);
      },
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useSetLocale() {
  return useContext(LocaleContext).setLocale;
}
