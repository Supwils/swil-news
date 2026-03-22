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

  return null;
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
      const frame = window.requestAnimationFrame(() => {
        setLocale(nextLocale);
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => {
        setLocale(nextLocale);
        if (typeof document !== "undefined") {
          document.cookie = `${COOKIE_NAME}=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
          window.localStorage.setItem(STORAGE_KEY, nextLocale);
        }
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
