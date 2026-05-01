import type { Locale } from "@/data/copy";

const EN_PREFIX = "/en";

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function stripLocalePrefix(path: string) {
  const normalized = normalizePath(path);

  if (normalized === EN_PREFIX) {
    return "/";
  }

  if (normalized.startsWith(`${EN_PREFIX}/`)) {
    return normalized.slice(EN_PREFIX.length);
  }

  return normalized;
}

export function localizePath(path: string, locale: Locale) {
  const basePath = stripLocalePrefix(path);

  if (locale === "en") {
    return basePath === "/" ? EN_PREFIX : `${EN_PREFIX}${basePath}`;
  }

  return basePath;
}

export function detectLocaleFromPath(path: string): Locale {
  const normalized = normalizePath(path);
  return normalized === EN_PREFIX || normalized.startsWith(`${EN_PREFIX}/`) ? "en" : "zh";
}

export function switchPathLocale(path: string, locale: Locale) {
  return localizePath(stripLocalePrefix(path), locale);
}
