/**
 * Article registry — central index of all Knowledge Hub articles.
 *
 * Today: a typed in-memory list compiled at build time.
 * Tomorrow: replace `ARTICLES` with a `useQuery` against `knowledge_articles`
 * (Supabase) or a HubSpot Blog feed. The consumer API stays the same:
 *
 *   listArticles(), listArticlesByCategory(), getArticle(category, slug),
 *   getRelatedArticles(article, n).
 *
 * Migration contract:
 *   id           uuid               -> Article.slug + category compound
 *   slug         text unique        -> Article.slug
 *   category     text               -> Article.category
 *   status       enum               -> Article.status
 *   body_json    jsonb              -> Article.body (ArticleBlock[])
 *   seo_json     jsonb              -> Article.seo
 *   faq_json     jsonb              -> Article.faq
 *   hubspot_id   text nullable      -> mirror id (HubSpot Blog)
 */
import type { Article } from "./types";

import { article as zbiorniki } from "./pompy-ciepla/zbiorniki-cwu-do-pompy-ciepla";
import { article as cennik } from "./pompy-ciepla/cennik-pomp-ciepla-2026";
import { article as gruntowa } from "./pompy-ciepla/gruntowa-pompa-ciepla-kompletny-przewodnik";

const ARTICLES: Article[] = [zbiorniki, cennik, gruntowa];

/** All published articles, newest first. Drafts are excluded by default. */
export function listArticles(opts: { includeDrafts?: boolean } = {}): Article[] {
  const list = opts.includeDrafts
    ? ARTICLES
    : ARTICLES.filter((a) => a.status === "published");
  return list
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function listArticlesByCategory(category: string): Article[] {
  return listArticles().filter((a) => a.category === category);
}

export function getArticle(category: string, slug: string): Article | undefined {
  return ARTICLES.find(
    (a) => a.category === category && a.slug === slug && a.status === "published",
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug && a.status === "published");
}

/**
 * Related articles — preference order:
 * 1. Explicit `related.articles` slugs (curated by editor).
 * 2. Same category, excluding self.
 * 3. Most recent overall.
 */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const pool = new Map<string, Article>();
  const all = listArticles();
  const add = (a?: Article) => {
    if (a && a.slug !== article.slug) pool.set(a.slug, a);
  };

  for (const slug of article.related?.articles ?? []) {
    add(all.find((a) => a.slug === slug));
  }
  for (const a of all.filter((a) => a.category === article.category)) add(a);
  for (const a of all) add(a);

  return Array.from(pool.values()).slice(0, limit);
}

export type { Article } from "./types";
