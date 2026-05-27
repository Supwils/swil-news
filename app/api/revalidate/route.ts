import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Token-protected on-demand revalidation.
 *
 * Usage:
 *   curl -X POST "$SITE_URL/api/revalidate?path=/&token=$REVALIDATE_TOKEN"
 *
 * Designed to be called by daily-news-and-commit.sh after pushing fresh
 * markdown to git, so the deployed site picks up new content without
 * a full redeploy.
 */
export const dynamic = "force-dynamic";

const DEFAULT_PATHS = ["/", "/en", "/about", "/en/about"];

function isAuthorized(provided: string | null) {
  const expected = process.env.REVALIDATE_TOKEN;
  if (!expected) return false;
  if (!provided) return false;
  // Constant-time compare to avoid timing leaks.
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < provided.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!isAuthorized(token)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const explicitPaths = url.searchParams.getAll("path");
  const paths = explicitPaths.length > 0 ? explicitPaths : DEFAULT_PATHS;

  for (const target of paths) {
    revalidatePath(target);
  }

  return NextResponse.json({ ok: true, revalidated: paths, at: Date.now() });
}

export async function GET(request: Request) {
  return POST(request);
}
