import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  PremiumHero,
  EngineeringOverview,
  CommonProblems,
  EngineeringApproach,
  ProcessTimeline,
  TechnicalAdvantages,
  MistakesToAvoid,
  MetricsAndOutcomes,
  ComparisonSection,
  FAQSection,
  ConsultationFlow,
  RelatedCaseStudies,
  RelatedKnowledgeHub,
  CTASection,
} from "@/components/service";
import { getService } from "@/content/services";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { serviceSchema } from "@/lib/service-jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/oferta/$service")({
  beforeLoad: ({ params }) => {
    if (!getService(params.service)) throw notFound();
  },
  head: ({ params }) => {
    const s = getService(params.service);
    if (!s) return { meta: [{ title: "Oferta" }] };
    const url = `${SITE.url}/oferta/${s.slug}`;

    const jsonLd: Record<string, unknown>[] = [
      serviceSchema(s, url),
      breadcrumbSchema([
        { name: "Start", url: `${SITE.url}/` },
        { name: "Oferta", url: `${SITE.url}/oferta` },
        { name: s.navLabel, url },
      ]),
    ];
    if (s.faq?.length) {
      jsonLd.push(
        faqSchema(s.faq.map((f) => ({ question: f.q, answer: f.a }))),
      );
    }

    return buildMeta({
      title: s.seo.title,
      description: s.seo.description,
      path: `/oferta/${s.slug}`,
      image: s.seo.ogImage ?? s.hero.heroImage,
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
          Ta usługa nie istnieje lub została przeniesiona.
        </h1>
      </div>
      <SiteFooter />
    </main>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useParams();
  const s = getService(service)!;

  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />
      <PremiumHero hero={s.hero} />
      <EngineeringOverview overview={s.overview} />
      <CommonProblems items={s.commonProblems} />
      <EngineeringApproach steps={s.engineeringApproach} />
      <MetricsAndOutcomes items={s.outcomes} />
      <ProcessTimeline phases={s.processTimeline} />
      <TechnicalAdvantages items={s.technicalAdvantages} />
      <ComparisonSection comparison={s.comparison} />
      <MistakesToAvoid items={s.mistakesToAvoid} />
      <RelatedCaseStudies slugs={s.related?.caseStudies} />
      <RelatedKnowledgeHub slugs={s.related?.articles} />
      <FAQSection items={s.faq} />
      <ConsultationFlow steps={s.consultationFlow} />
      <CTASection cta={s.cta} />
      <SiteFooter />
    </main>
  );
}
