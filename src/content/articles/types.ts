/**
 * Knowledge Hub — content model.
 *
 * Single source of truth for editorial articles. Designed to migrate cleanly
 * to Supabase (`knowledge_articles`) or HubSpot CMS later without changing
 * the rendering layer. See docs/knowledge-hub-content-model.md.
 *
 * Rendering rules:
 * - When `body` is present, the dynamic route `/wiedza/$category/$slug`
 *   renders the article using <ArticleBody blocks={body} /> + shared
 *   primitives (ArticleHero, ArticleTOC, ArticleFAQ, ArticleRelated, ...).
 * - When `customRoute: true`, the article keeps its bespoke route file
 *   under src/routes/. The registry still owns the SEO metadata, FAQ,
 *   author, related links — so JSON-LD, sitemap, hub listings and HubSpot
 *   mirroring stay consistent. This is the supported migration path: rich
 *   legacy designs stay live while we port them to blocks incrementally.
 */
export type ArticleStatus = "draft" | "published";

export type ArticleAuthorRef = string; // author id in src/content/authors.ts

export interface ArticleFaqItem {
  q: string;
  a: string;
}

export interface ArticleSeo {
  title: string;
  description: string;
  /** Optional override of the OG image (else falls back to hero). */
  ogImage?: string;
  /** Future: HubSpot canonical override / cross-publishing. */
  canonicalOverride?: string;
}

export interface ArticleRelated {
  services?: string[]; // e.g. ["pompy-ciepla", "fotowoltaika"]
  caseStudies?: string[]; // realizacja slugs (future)
  articles?: string[]; // slugs in same / other categories
}

/* ---------- content blocks ----------
 * The block model is deliberately wide and editorial-first. Each block has a
 * clear *editorial role* (not just a visual variant) so writers reach for the
 * same shape across articles. New patterns must justify a new block; never
 * re-style an existing one to mean something else.
 *
 * Roles at a glance:
 *   heading/paragraph/list/quote/image/table  — base prose
 *   tldr / key-takeaways                       — scannability bookends
 *   callout                                    — short aside
 *   engineer-note                              — high-authority insight
 *   metrics-strip / stats                      — data anchors
 *   compare-cards / cost-breakdown / case-cards — decision support
 *   factor-list                                — "what drives X"
 *   when-fits / common-mistakes                — qualification signals
 *   definition                                 — AI-citation friendly term
 *   cta-calculator / cta-engineer              — conversion hooks
 */
export type ArticleBlock =
  | { type: "heading"; level: 2 | 3; id?: string; text: string; eyebrow?: string }
  | { type: "paragraph"; text: string; dropcap?: boolean }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "callout";
      tone?: "blue" | "gold" | "neutral";
      title?: string;
      text: string;
    }
  | {
      /** Premium dark "Engineering insight" block — high-authority signal. */
      type: "engineer-note";
      label?: string;
      title: string;
      text: string;
      tone?: "blue" | "gold" | "cyan";
      icon?: "thermometer" | "snowflake" | "gauge" | "trending" | "shield" | "spark";
    }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "table";
      head: string[];
      rows: string[][];
      note?: string;
    }
  | {
      type: "stats";
      items: { label: string; value: string; sub?: string }[];
    }
  | {
      /** Edge-to-edge stats strip — placed right under the hero. */
      type: "metrics-strip";
      items: { label: string; value: string; sub?: string }[];
    }
  | {
      /** Side-by-side pros/cons cards. */
      type: "compare-cards";
      items: {
        title: string;
        badge?: string;
        recommended?: boolean;
        pros: string[];
        cons: string[];
      }[];
    }
  | {
      /** Itemised cost breakdown with a total. */
      type: "cost-breakdown";
      title?: string;
      subtitle?: string;
      totalLabel?: string;
      total: string;
      rows: { item: string; small?: string; price: string }[];
      footnote?: string;
    }
  | {
      /** 2–3 worked examples with headline numbers. */
      type: "case-cards";
      items: {
        title: string;
        spec: string;
        priceLabel?: string;
        price: string;
        afterLabel?: string;
        after?: string;
        recommendation?: string;
      }[];
    }
  | {
      /** Numbered factors with short rationale. */
      type: "factor-list";
      items: { name: string; detail: string }[];
    }
  | {
      /** "When this solution makes sense" — positive criteria. */
      type: "when-fits";
      title?: string;
      items: string[];
    }
  | {
      /** "Common mistakes / when to skip" — negative criteria. */
      type: "common-mistakes";
      title?: string;
      items: string[];
    }
  | {
      /** Article conclusion — scannable bullets, ends the body. */
      type: "key-takeaways";
      id?: string;
      title?: string;
      items: string[];
    }
  | {
      /** Glossary-style term + definition — AI-citation friendly. */
      type: "definition";
      term: string;
      definition: string;
    }
  | { type: "cta-calculator"; title?: string; lead?: string }
  | { type: "cta-engineer"; title?: string; lead?: string }
  | { type: "tldr"; title?: string; text: string };

export interface Article {
  /** URL slug — unique per category. */
  slug: string;
  /** Category slug from src/lib/knowledge-categories.ts. */
  category: string;
  status: ArticleStatus;

  title: string;
  excerpt: string;
  /** ISO-8601 (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  /** Minutes — used in UI and for AI/SEO surfaces. */
  readingTime: number;

  heroImage?: string;
  heroImageAlt?: string;

  authorId: ArticleAuthorRef;
  seo: ArticleSeo;
  related?: ArticleRelated;
  tags?: string[];

  /** TL;DR shown above the body. */
  tldr?: string;

  /** FAQ — also emitted as FAQPage JSON-LD when non-empty. */
  faq?: ArticleFaqItem[];

  /** Content body. Omit when `customRoute: true`. */
  body?: ArticleBlock[];

  /**
   * Bespoke legacy route. When true, this article keeps its dedicated
   * src/routes/ file; the dynamic route doesn't render the body. The
   * registry record is still authoritative for SEO + listings.
   */
  customRoute?: boolean;
}
