/**
 * Single-flight loader for the Pagefind runtime served at /pagefind/pagefind.js.
 *
 * The runtime is a static asset produced by scripts/build-search-index.mjs.
 * If the asset is missing (e.g. a build skipped the prebuild step), the loader
 * resolves to `null` and callers degrade to their fallback path — never throw.
 */

import type { TopicKey } from "@/lib/news-meta";

export type Locale = "zh" | "en";

export type PagefindFilters = {
  topic?: TopicKey[];
  locale?: Locale[];
  year?: string[];
  month?: string[];
};

export type PagefindMeta = {
  title: string;
  description: string;
  date: string;
  topic: TopicKey;
  locale: Locale;
};

export type PagefindResultData = {
  url: string;
  excerpt: string;
  meta: PagefindMeta;
  filters?: Record<string, string[]>;
  raw_url?: string;
};

export type PagefindResult = {
  id: string;
  score: number;
  data: () => Promise<PagefindResultData>;
};

export type PagefindSearchResponse = {
  results: PagefindResult[];
  filters?: Record<string, Record<string, number>>;
  totalFilters?: Record<string, Record<string, number>>;
  unfilteredResultCount?: number;
};

export type PagefindRuntime = {
  search: (
    query: string,
    options?: { filters?: PagefindFilters; sort?: Record<string, "asc" | "desc"> },
  ) => Promise<PagefindSearchResponse>;
  filters: () => Promise<Record<string, Record<string, number>>>;
  options?: (opts: Record<string, unknown>) => Promise<void>;
};

let loaderPromise: Promise<PagefindRuntime | null> | null = null;

export function loadPagefind(): Promise<PagefindRuntime | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (loaderPromise) return loaderPromise;

  loaderPromise = (async () => {
    try {
      // The Pagefind runtime is a static asset (built by scripts/build-search-index.mjs).
      // TypeScript / the Next bundler cannot statically resolve it; route the import
      // through a runtime-only path so neither tries to bundle or type-check it.
      const url = "/pagefind/pagefind.js";
      const dynamicImport = new Function("u", "return import(u)") as (
        u: string,
      ) => Promise<PagefindRuntime>;
      const mod = await dynamicImport(url);
      if (typeof mod.options === "function") {
        await mod.options({ excerptLength: 30 });
      }
      return mod;
    } catch (err) {
      console.warn("[pagefind] runtime unavailable; falling back", err);
      loaderPromise = null; // allow retry on a later interaction
      return null;
    }
  })();

  return loaderPromise;
}
