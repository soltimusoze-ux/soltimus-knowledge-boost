import { createServerFn } from "@tanstack/react-start";
const CATEGORY_IDS = { artykul: 12, wideo: 14 } as const;

const WP_SITE = "https://soltimus.pl";

type PublicPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  link: string;
  date: string;
  image: string | null;
  videoId?: string | null;
  videoProvider?: "youtube" | "vimeo" | null;
  content?: string;
  readingTime?: number;
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
    .replace(/&#039;/g, "'")
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

function mapPost(p: any, includeContent = false): PublicPost {
  const featured = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
  const content = String(p.content?.rendered ?? "");
  const v = extractVideo(content);
  const text = stripHtml(content);
  const words = text.split(/\s+/).filter(Boolean).length;
  return {
    id: p.id,
    slug: p.slug,
    title: stripHtml(p.title?.rendered ?? ""),
    excerpt: stripHtml(p.excerpt?.rendered ?? "").slice(0, 220),
    link: p.link,
    date: p.date,
    image:
      featured ??
      (v?.provider === "youtube" ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : null),
    videoId: v?.id ?? null,
    videoProvider: v?.provider ?? null,
    content: includeContent ? content : undefined,
    readingTime: Math.max(2, Math.round(words / 220)),
  };
}

async function fetchCategory(catId: number, perPage: number): Promise<PublicPost[]> {
  const url = `${WP_SITE}/wp-json/wp/v2/posts?categories=${catId}&per_page=${perPage}&_embed=wp:featuredmedia&orderby=date&order=desc`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`WP fetch ${catId}: ${res.status}`);
      return [];
    }
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) {
      console.error(`WP fetch ${catId}: non-JSON response (${ct})`);
      return [];
    }
    const data = (await res.json()) as any[];
    if (!Array.isArray(data)) return [];
    return data.map((p) => mapPost(p));
  } catch (e) {
    console.error(`WP fetch ${catId} failed:`, e);
    return [];
  }
}

export const fetchPublicArticles = createServerFn({ method: "GET" }).handler(async () => {
  return { posts: await fetchCategory(CATEGORY_IDS.artykul, 20) };
});

export const fetchPublicVideos = createServerFn({ method: "GET" }).handler(async () => {
  return { posts: await fetchCategory(CATEGORY_IDS.wideo, 12) };
});

export const fetchArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const url = `${WP_SITE}/wp-json/wp/v2/posts?slug=${encodeURIComponent(data.slug)}&_embed=wp:featuredmedia`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`WP fetch slug: ${res.status}`);
    const arr = (await res.json()) as any[];
    if (!arr.length) return { post: null };
    return { post: mapPost(arr[0], true) };
  });
