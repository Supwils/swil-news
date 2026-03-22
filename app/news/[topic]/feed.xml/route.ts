import { buildTopicFeed } from "@/lib/rss";

type RouteContext = {
  params: Promise<{ topic: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { topic } = await context.params;
  const xml = await buildTopicFeed(topic);

  if (!xml) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
