/**
 * Single-flight loader for the Pagefind runtime served at /pagefind/pagefind.js.
 *
 * The runtime is a static asset produced by scripts/build-search-index.mjs.
 * If the asset is missing (e.g. a build skipped the prebuild step), the loader
 * resolves to `null` and callers degrade to their fallback path — never throw.
 */

import type { Locale } from "@/data/copy";
import type { TopicKey } from "@/lib/news-meta";

export type { Locale };

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

// Pagefind's runtime is a static asset, not part of the bundle. Routing the
// import through new Function keeps both TypeScript and the Next bundler out
// of the resolution path. Built once at module load, reused per call.
const dynamicImport = new Function("u", "return import(u)") as (
  u: string,
) => Promise<PagefindRuntime>;

const PAGEFIND_URL = "/pagefind/pagefind.js";

export function loadPagefind(): Promise<PagefindRuntime | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (loaderPromise) return loaderPromise;

  loaderPromise = (async () => {
    try {
      const mod = await dynamicImport(PAGEFIND_URL);
      if (typeof mod.options === "function") {
        // excerptLength is in tokens; 60 reads well for both CJK (≈60 chars,
        // ~2 lines) and English (≈60 words, ~3 lines clamped to 3 in CSS).
        await mod.options({ excerptLength: 60 });
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

/**
 * Fire-and-forget warmup. Triggers the dynamic import without awaiting,
 * letting the browser fetch + parse Pagefind during idle time so the first
 * modal/page open is instant. Safe to call multiple times (single-flight).
 */
export function prefetchPagefind(): void {
  if (typeof window === "undefined") return;
  void loadPagefind();
}
