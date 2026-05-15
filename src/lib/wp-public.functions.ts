import { createServerFn } from "@tanstack/react-start";
import { CATEGORY_IDS } from "./wp.server";

const WP_SITE = "https://soltimus.pl";

type PublicPost = {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  date: string;
  image: string | null;
  videoId?: string | null;
  videoProvider?: "youtube" | "vimeo" | null;
};

function stripHtml(s: string) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8230;/g, "…")
    .replace(/&#8211;/g, "–")
    .replace(/&hellip;/g, "…")
    .trim();
}

function extractVideo(html: string): { id: string; provider: "youtube" | "vimeo" } | null {
  const yt =
    html.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/) ||
    html.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/) ||
    html.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (yt) return { id: yt[1], provider: "youtube" };
  const vm = html.match(/player\.vimeo\.com\/video\/(\d+)/) || html.match(/vimeo\.com\/(\d+)/);
  if (vm) return { id: vm[1], provider: "vimeo" };
  return null;
}

async function fetchCategory(catId: number, perPage: number): Promise<PublicPost[]> {
  const url = `${WP_SITE}/wp-json/wp/v2/posts?categories=${catId}&per_page=${perPage}&_embed=wp:featuredmedia&orderby=date&order=desc`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WP fetch ${catId}: ${res.status}`);
  const data = (await res.json()) as any[];
  return data.map((p) => {
    const featured = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
    const content = String(p.content?.rendered ?? "");
    const v = extractVideo(content);
    return {
      id: p.id,
      title: stripHtml(p.title?.rendered ?? ""),
      excerpt: stripHtml(p.excerpt?.rendered ?? "").slice(0, 180),
      link: p.link,
      date: p.date,
      image:
        featured ??
        (v?.provider === "youtube" ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : null),
      videoId: v?.id ?? null,
      videoProvider: v?.provider ?? null,
    };
  });
}

export const fetchPublicArticles = createServerFn({ method: "GET" }).handler(async () => {
  return { posts: await fetchCategory(CATEGORY_IDS.artykul, 6) };
});

export const fetchPublicVideos = createServerFn({ method: "GET" }).handler(async () => {
  return { posts: await fetchCategory(CATEGORY_IDS.wideo, 8) };
});
