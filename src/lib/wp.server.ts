// WordPress REST API helpers — server-only.
// Uses Application Password Basic Auth.

const STREFA_WIEDZY_CAT_ID = 11;
export const CATEGORY_IDS = {
  artykul: 12,
  pdf: 13,
  wideo: 14,
} as const;

export type MaterialType = keyof typeof CATEGORY_IDS;

function getConfig() {
  const site = process.env.WP_SITE_URL;
  const user = process.env.WP_USERNAME;
  const pass = process.env.WP_APP_PASSWORD;
  if (!site || !user || !pass) {
    throw new Error("WordPress credentials not configured");
  }
  return {
    site: site.replace(/\/$/, ""),
    auth: "Basic " + Buffer.from(`${user}:${pass}`).toString("base64"),
  };
}

async function wpFetch(path: string, init: RequestInit = {}) {
  const { site, auth } = getConfig();
  const url = `${site}/wp-json${path}`;
  const headers = new Headers(init.headers);
  headers.set("Authorization", auth);
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(url, { ...init, headers });
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const msg = (data && (data.message || data.code)) || `HTTP ${res.status}`;
    throw new Error(`WordPress: ${msg}`);
  }
  return data;
}

export async function listMaterials() {
  const posts = await wpFetch(
    `/wp/v2/posts?categories=${STREFA_WIEDZY_CAT_ID}&per_page=50&status=publish,draft,private,future&_embed=wp:featuredmedia&context=edit&orderby=date&order=desc`
  );
  return (posts as any[]).map((p) => {
    const subCat = (p.categories || []).find((id: number) =>
      Object.values(CATEGORY_IDS).includes(id as any)
    );
    let type: MaterialType | "inny" = "inny";
    if (subCat === CATEGORY_IDS.artykul) type = "artykul";
    else if (subCat === CATEGORY_IDS.pdf) type = "pdf";
    else if (subCat === CATEGORY_IDS.wideo) type = "wideo";
    return {
      id: p.id as number,
      title: (p.title?.rendered || p.title?.raw || "(bez tytułu)") as string,
      slug: p.slug as string,
      status: p.status as string,
      link: p.link as string,
      date: p.date as string,
      type,
      excerpt: (p.excerpt?.rendered || "") as string,
    };
  });
}

export async function deleteMaterial(id: number) {
  // force=true → permanent delete (otherwise → trash)
  await wpFetch(`/wp/v2/posts/${id}?force=false`, { method: "DELETE" });
}

async function uploadMediaFromBase64(opts: {
  filename: string;
  contentType: string;
  base64: string;
}) {
  const { site, auth } = getConfig();
  const binary = Buffer.from(opts.base64, "base64");
  const res = await fetch(`${site}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": opts.contentType,
      "Content-Disposition": `attachment; filename="${opts.filename.replace(/"/g, "")}"`,
    },
    body: binary,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Upload mediów: ${(data && data.message) || res.status}`);
  }
  return data as { id: number; source_url: string };
}

export async function createArticle(input: {
  title: string;
  content: string;
  excerpt?: string;
  status: "publish" | "draft";
  featured?: { filename: string; contentType: string; base64: string } | null;
}) {
  let featured_media: number | undefined;
  if (input.featured) {
    const m = await uploadMediaFromBase64(input.featured);
    featured_media = m.id;
  }
  return wpFetch(`/wp/v2/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: input.title,
      content: input.content,
      excerpt: input.excerpt || "",
      status: input.status,
      categories: [STREFA_WIEDZY_CAT_ID, CATEGORY_IDS.artykul],
      featured_media,
    }),
  });
}

export async function createPdfPost(input: {
  title: string;
  description: string;
  status: "publish" | "draft";
  file: { filename: string; contentType: string; base64: string };
}) {
  const media = await uploadMediaFromBase64(input.file);
  const safeTitle = escapeHtml(input.title);
  const desc = input.description ? `<p>${escapeHtml(input.description)}</p>` : "";
  const content = `${desc}<p><a href="${media.source_url}" target="_blank" rel="noopener" download>📎 Pobierz: ${safeTitle} (PDF)</a></p>`;
  return wpFetch(`/wp/v2/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: input.title,
      content,
      excerpt: input.description?.slice(0, 200) || "",
      status: input.status,
      categories: [STREFA_WIEDZY_CAT_ID, CATEGORY_IDS.pdf],
    }),
  });
}

export async function createVideoPost(input: {
  title: string;
  description: string;
  videoUrl: string;
  status: "publish" | "draft";
}) {
  const embed = buildVideoEmbed(input.videoUrl);
  if (!embed) {
    throw new Error("Nieobsługiwany link wideo. Wklej URL z YouTube lub Vimeo.");
  }
  const desc = input.description ? `<p>${escapeHtml(input.description)}</p>` : "";
  const content = `${embed}\n${desc}`;
  return wpFetch(`/wp/v2/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: input.title,
      content,
      excerpt: input.description?.slice(0, 200) || "",
      status: input.status,
      categories: [STREFA_WIEDZY_CAT_ID, CATEGORY_IDS.wideo],
    }),
  });
}

function buildVideoEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      let id = "";
      if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
      else if (u.searchParams.get("v")) id = u.searchParams.get("v")!;
      else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2];
      if (!id) return null;
      return `<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="https://www.youtube.com/embed/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (!id) return null;
      return `<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="https://player.vimeo.com/video/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    }
  } catch {
    return null;
  }
  return null;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
