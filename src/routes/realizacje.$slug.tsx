import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  CaseHero,
  CaseMetrics,
  CaseOverview,
  CaseChallenges,
  CaseApproach,
  CaseSystem,
  CaseBeforeAfter,
  CaseTimeline,
  CaseCommentary,
  CaseLessons,
  CaseTestimonial,
  CaseGallery,
  CaseFAQ,
  CaseRelated,
  CaseCTA,
} from "@/components/case";
import { getCase, getRelatedCases } from "@/content/case-studies";
import { getAuthor } from "@/content/authors";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { caseStudyArticleSchema } from "@/lib/case-jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/realizacje/$slug")({
  beforeLoad: ({ params }) => {
    if (!getCase(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const c = getCase(params.slug);
    if (!c) return { meta: [{ title: "Realizacja" }] };

    const url = `${SITE.url}/realizacje/${c.slug}`;
    const authorName = getAuthor(
      c.engineerCommentary?.[0]?.authorId ?? "dzial-projektowy",
    ).name;

    const jsonLd: Record<string, unknown>[] = [
      caseStudyArticleSchema({ c, url, authorName }),
      breadcrumbSchema([
        { name: "Start", url: `${SITE.url}/` },
        { name: "Realizacje", url: `${SITE.url}/realizacje` },
        { name: c.title, url },
      ]),
    ];
    if (c.faq?.length) {
      jsonLd.push(
        faqSchema(c.faq.map((f) => ({ question: f.q, answer: f.a }))),
      );
    }

    return buildMeta({
      title: c.seo.title,
      description: c.seo.description,
      path: `/realizacje/${c.slug}`,
      type: "article",
      image: c.seo.ogImage ?? c.heroImage,
      extraMeta: [
        { property: "article:published_time", content: c.publishedAt },
        ...(c.updatedAt
          ? [{ property: "article:modified_time", content: c.updatedAt }]
          : []),
        { property: "og:locality", content: c.location.city },
      ],
      jsonLd,
    });
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />
      <div className="mx-auto max-w-3xl px-5 py-40 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Nie znaleziono
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Ta realizacja nie istnieje lub została przeniesiona.
        </h1>
      </div>
      <SiteFooter />
    </main>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const c = getCase(slug)!;
  const related = getRelatedCases(c, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  return (
    <main key={slug} className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />
      {import.meta.env.DEV ? (
        <div className="fixed bottom-2 right-2 z-50 rounded bg-black/80 px-2 py-1 text-[10px] font-mono text-white">
          case: {slug}
        </div>
      ) : null}
      <CaseHero c={c} />
      <CaseMetrics items={c.metrics} />
      <CaseOverview c={c} />
      <CaseChallenges items={c.challenges} />
      <CaseApproach paragraphs={c.approach} />
      <CaseSystem groups={c.system} />
      <CaseBeforeAfter rows={c.beforeAfter} />
      <CaseTimeline phases={c.timeline} />
      <CaseCommentary items={c.engineerCommentary} />
      <CaseGallery items={c.gallery} />
      <CaseTestimonial t={c.testimonial} />
      <CaseLessons items={c.lessons} />
      <div className="bg-[#FAFAF7] py-10">
        <CaseFAQ items={c.faq} />
      </div>
      <CaseRelated cases={related} />
      <CaseCTA />
      <SiteFooter />
    </main>
  );
}
