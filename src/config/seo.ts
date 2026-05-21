/**
 * SEO helpers.
 *
 * Usage in a route file:
 *
 *   import { buildMeta } from "@/config/seo";
 *
 *   export const Route = createFileRoute("/about")({
 *     head: () => buildMeta({
 *       title: "O nas",
 *       description: "Krótki opis strony.",
 *       path: "/about",
 *     }),
 *   });
 *
 * Rules followed:
 * - `<link rel="canonical">` is emitted ONLY for leaf routes (this helper).
 *   `__root.tsx` MUST NOT set canonical — TanStack concatenates `links`
 *   without dedupe (TanStack/router#6719).
 * - `title` lives inside `meta`, never as a top-level field.
 * - `og:image` is added only when a non-empty `image` is provided.
 */

import { SITE } from "./site";

export type OgType =
  | "website"
  | "article"
  | "product"
  | "profile"
  | "video.other";

export interface BuildMetaInput {
  /** Page title without site suffix. */
  title: string;
  /** Plain-text meta description (≤160 chars). */
  description: string;
  /** Absolute path beginning with `/`. */
  path: string;
  /** Optional absolute or root-relative image URL. */
  image?: string;
  /** Defaults to "website". Use "article" on Knowledge Hub posts, etc. */
  type?: OgType;
  /** Override the title suffix. Pass `false` to disable. */
  suffix?: string | false;
  /** Skip the `<link rel="canonical">` (rare — usually keep it). */
  noCanonical?: boolean;
  /** Set `<meta name="robots" content="noindex, nofollow">`. */
  noindex?: boolean;
  /** Extra meta tags to append (e.g. article:published_time). */
  extraMeta?: ReadonlyArray<Record<string, string>>;
  /** JSON-LD payloads. Stringified for you. */
  jsonLd?: ReadonlyArray<Record<string, unknown>>;
}

interface HeadResult {
  meta: Array<Record<string, string>>;
  links: Array<Record<string, string>>;
  scripts: Array<{ type: string; children: string }>;
}

function joinUrl(base: string, path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base.replace(/\/$/, "")}${path}`;
}

export function buildMeta(input: BuildMetaInput): HeadResult {
  const {
    title,
    description,
    path,
    image,
    type = "website",
    suffix = SITE.name,
    noCanonical = false,
    noindex = false,
    extraMeta = [],
    jsonLd = [],
  } = input;

  const fullTitle =
    suffix === false || title.includes(suffix) ? title : `${title} — ${suffix}`;
  const url = joinUrl(SITE.url, path);
  const ogImage = image || SITE.defaultOgImage;

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: SITE.locale },
    { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];

  if (ogImage) {
    meta.push({ property: "og:image", content: ogImage });
    meta.push({ name: "twitter:image", content: ogImage });
  }

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  for (const m of extraMeta) meta.push(m);

  const links: Array<Record<string, string>> = [];
  if (!noCanonical && !noindex) {
    links.push({ rel: "canonical", href: url });
  }

  const scripts = jsonLd.map((payload) => ({
    type: "application/ld+json",
    children: JSON.stringify(payload),
  }));

  return { meta, links, scripts };
}

/** Convenience: full canonical URL for a path. */
export function canonicalUrl(path: string): string {
  return joinUrl(SITE.url, path);
}
