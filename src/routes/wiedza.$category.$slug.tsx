import {
  createFileRoute,
  Link,
  notFound,
  redirect,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import {
  fetchArticleBySlug,
  fetchPublicArticles,
} from "@/lib/wp-public.functions";
import {
  KNOWLEDGE_CATEGORIES,
  categoryBySlug,
  matchCategory,
} from "@/lib/knowledge-categories";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { RelatedVideos } from "@/components/knowledge/RelatedVideos";

import {
  ArticleHero,
  ArticleBody,
  ArticleTOC,
  ArticleFAQ,
  ArticleRelated,
  ArticleAuthorBox,
  ArticleCTA,
  tocFromBlocks,
} from "@/components/article";
import {
  getArticle,
  getRelatedArticles,
  type Article,
} from "@/content/articles";
import { getAuthor } from "@/content/authors";

import { buildMeta } from "@/config/seo";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/jsonld";
import { SITE } from "@/config/site";

/**
 * Legacy WordPress slug → static route redirect map.
 * Kept until external links migrate.
 */
const STATIC_ARTICLE_REDIRECTS: Record<string, string> = {
  "gruntowa-pompa-ciepla-jak-dziala-ile-kosztuje-i-czy-ma-wady-kompletny-przewodnik":
    "/wiedza/pompy-ciepla/gruntowa-pompa-ciepla-kompletny-przewodnik",
};

export const Route = createFileRoute("/wiedza/$category/$slug")({
  beforeLoad: ({ params }) => {
    if (!categoryBySlug(params.category)) throw notFound();
    const target = STATIC_ARTICLE_REDIRECTS[params.slug];
    if (target) throw redirect({ to: target, replace: true });
  },
  head: ({ params }) => {
    const cat = categoryBySlug(params.category);
    const article = getArticle(params.category, params.slug);

    // 1. Article from content model — full structured metadata.
    if (article) {
      const url = `${SITE.url}/wiedza/${article.category}/${article.slug}`;
      const author = getAuthor(article.authorId);
      const jsonLd: Record<string, unknown>[] = [
        articleSchema({
          title: article.seo.title,
          description: article.seo.description,
          url,
          image: article.seo.ogImage ?? article.heroImage,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          authorName: author.name,
        }),
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Strefa Wiedzy", url: `${SITE.url}/wiedza` },
          {
            name: cat?.name ?? article.category,
            url: `${SITE.url}/wiedza/${article.category}`,
          },
          { name: article.title, url },
        ]),
      ];
      if (article.faq && article.faq.length > 0) {
        jsonLd.push(
          faqSchema(article.faq.map((f) => ({ question: f.q, answer: f.a }))),
        );
      }
      return buildMeta({
        title: article.seo.title,
        description: article.seo.description,
        path: `/wiedza/${article.category}/${article.slug}`,
        type: "article",
        image: article.seo.ogImage ?? article.heroImage,
        jsonLd,
      });
    }

    // 2. Fallback to WordPress-sourced article — preserves prior behaviour.
    const title = decodeURIComponent(params.slug).replace(/-/g, " ");
    return buildMeta({
      title,
      description:
        "Pogłębiona analiza inżynierska Soltimus — pompy ciepła, fotowoltaika, magazyny energii.",
      path: `/wiedza/${params.category}/${params.slug}`,
      type: "article",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Strefa Wiedzy", url: `${SITE.url}/wiedza` },
          {
            name: cat?.name ?? params.category,
            url: `${SITE.url}/wiedza/${params.category}`,
          },
          {
            name: title,
            url: `${SITE.url}/wiedza/${params.category}/${params.slug}`,
          },
        ]),
      ],
    });
  },
  component: ArticleRouteComponent,
});

function ArticleRouteComponent() {
  const { category, slug } = Route.useParams();
  const article = getArticle(category, slug);
  if (article) return <ManagedArticlePage article={article} />;
  return <WordpressArticlePage category={category} slug={slug} />;
}

/* ===========================================================
 * Managed article — driven by src/content/articles registry.
 * =========================================================== */
function ManagedArticlePage({ article }: { article: Article }) {
  const cat = categoryBySlug(article.category)!;
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const tocItems = useMemo(
    () => (article.body ? tocFromBlocks(article.body) : []),
    [article.body],
  );
  const related = useMemo(() => getRelatedArticles(article, 3), [article]);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-black">
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
        style={{ scaleX: x, background: cat.accent }}
      />

      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: cat.name, to: `/wiedza/${cat.slug}` },
          {
            label:
              article.title.slice(0, 38) +
              (article.title.length > 38 ? "…" : ""),
          },
        ]}
      />

      <ArticleHero article={article} category={cat} />

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <aside className="lg:sticky lg:top-32 lg:col-span-3 lg:self-start">
            <ArticleTOC items={tocItems} />
            {article.tldr && (
              <div className="mt-6 rounded-2xl border border-[#F5B800]/30 bg-[#FFFBEB] p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#9A6B00]">
                  TL;DR
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75">
                  {article.tldr}
                </p>
              </div>
            )}
          </aside>

          <article className="lg:col-span-9">
            {article.body && <ArticleBody blocks={article.body} />}

            <ArticleFAQ items={article.faq ?? []} />

            <ArticleAuthorBox article={article} />

            <RelatedVideos
              matchText={`${article.title} ${cat.name}`}
              limit={4}
            />

            <ArticleCTA variant="engineer" />
          </article>
        </div>
      </section>

      <ArticleRelated articles={related} />

      <section className="border-t border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Eksploruj Knowledge Hub
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {KNOWLEDGE_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/wiedza/$category"
                params={{ category: c.slug }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all ${
                  c.slug === article.category
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white text-black/70 hover:border-black"
                }`}
              >
                {c.name}
                {c.slug !== article.category && (
                  <ArrowRight className="h-3 w-3" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===========================================================
 * WordPress fallback — preserves the prior dynamic-route flow
 * for slugs that haven't been migrated to the content model.
 * =========================================================== */
function WordpressArticlePage({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const cat = categoryBySlug(category)!;
  const fSlug = useServerFn(fetchArticleBySlug);
  const fAll = useServerFn(fetchPublicArticles);

  const { data, isLoading } = useQuery({
    queryKey: ["wp", "article", slug],
    queryFn: () => fSlug({ data: { slug } }),
    staleTime: 10 * 60 * 1000,
  });
  const { data: allData } = useQuery({
    queryKey: ["wp", "articles", "hub"],
    queryFn: () => fAll(),
    staleTime: 5 * 60 * 1000,
  });

  const post = data?.post;
  const related = (allData?.posts ?? [])
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7]">
        <KnowledgeNav
          trail={[
            { label: "Knowledge Hub", to: "/wiedza" },
            { label: cat.name },
          ]}
        />
        <div className="mx-auto max-w-5xl space-y-4 px-5 py-32">
          <div className="h-12 animate-pulse rounded-xl bg-black/5" />
          <div className="h-96 animate-pulse rounded-2xl bg-black/5" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAF7]">
        <KnowledgeNav
          trail={[
            { label: "Knowledge Hub", to: "/wiedza" },
            { label: cat.name },
          ]}
        />
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Nie znaleziono
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Ten artykuł nie istnieje lub został przeniesiony.
          </h1>
          <Link
            to="/wiedza/$category"
            params={{ category }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Wróć do {cat.name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-black">
      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: cat.name, to: `/wiedza/${category}` },
          { label: post.title.slice(0, 38) },
        ]}
      />
      <section className="border-b border-black/5 bg-white px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-base leading-relaxed text-black/65 md:text-lg">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div
          className="editorial"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <ArticleCTA variant="engineer" />
      </article>
      {related.length > 0 && (
        <section className="border-t border-black/5 bg-white px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              Powiązane materiały
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => {
                const c = matchCategory(`${r.title} ${r.excerpt}`);
                return (
                  <Link
                    key={r.id}
                    to="/wiedza/$category/$slug"
                    params={{ category: c, slug: r.slug }}
                    className="rounded-2xl border border-black/5 bg-[#FAFAF7] p-5 hover:border-black/20"
                  >
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#0089CF]">
                      {r.readingTime ?? 5} min
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-snug">
                      {r.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
