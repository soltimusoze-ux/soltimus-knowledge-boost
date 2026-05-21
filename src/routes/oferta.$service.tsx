import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Calculator } from "lucide-react";
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [service]);

  return (
    <main key={service} className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />
      {import.meta.env.DEV ? (
        <div className="fixed bottom-2 right-2 z-50 rounded bg-black/80 px-2 py-1 text-[10px] font-mono text-white">
          service: {service}
        </div>
      ) : null}
      <PremiumHero hero={s.hero} />
      {s.slug === "pompy-ciepla" ? <CalculatorTile /> : null}
      <EngineeringOverview overview={s.overview} />
      <CommonProblems items={s.commonProblems} />
      <EngineeringApproach steps={s.engineeringApproach} />
      <MetricsAndOutcomes items={s.outcomes} />
      <ProcessTimeline phases={s.processTimeline} />
      <TechnicalAdvantages items={s.technicalAdvantages} />
      <ComparisonSection comparison={s.comparison} />
      <MistakesToAvoid items={s.mistakesToAvoid} />
      {s.slug === "pompy-ciepla" ? <CalculatorPromo /> : null}
      <RelatedCaseStudies slugs={s.related?.caseStudies} />
      <RelatedKnowledgeHub slugs={s.related?.articles} />
      <FAQSection items={s.faq} />
      <ConsultationFlow steps={s.consultationFlow} />
      <CTASection cta={s.cta} />
      <SiteFooter />
    </main>
  );
}

function CalculatorTile() {
  return (
    <section className="bg-white px-5 pt-10 md:px-8 md:pt-14">
      <Link
        to="/kalkulator-pompy-ciepla"
        className="group mx-auto block max-w-6xl overflow-hidden rounded-3xl border-2 border-black/10 bg-gradient-to-br from-[#F5B800] via-[#FFD24A] to-[#F5B800] p-8 shadow-[0_20px_60px_-20px_rgba(245,184,0,0.5)] transition-all hover:scale-[1.01] hover:shadow-[0_24px_70px_-20px_rgba(245,184,0,0.65)] md:p-12"
      >
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-black/10 backdrop-blur md:h-24 md:w-24">
            <Calculator className="h-10 w-10 text-black md:h-12 md:w-12" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/70">
              Kalkulator · Narzędzie inżynierskie
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-black">
              Sprawdź orientacyjny dobór pompy ciepła dla Twojego domu
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/75 md:text-base">
              Moc, roczne zapotrzebowanie na ciepło i koszt ogrzewania — w 2 minuty. Bezpłatnie.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition-transform group-hover:translate-x-1 md:self-center">
            Otwórz kalkulator
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </section>
  );
}

function CalculatorPromo() {
  return (
    <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-black/60">
            <Calculator className="h-3.5 w-3.5" />
            Narzędzie inżynierskie
          </div>
          <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            Sprawdź orientacyjny dobór pompy ciepła dla Twojego domu.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-black/60">
            Bezpłatny kalkulator pokazuje orientacyjną moc pompy, roczne
            zapotrzebowanie na ciepło i przewidywany koszt ogrzewania.
            To punkt wyjścia do rozmowy z inżynierem — nie zastępuje
            audytu OZC ani projektu instalacji.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/kalkulator-pompy-ciepla"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Sprawdź orientacyjny dobór pompy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium text-black hover:bg-black/5"
            >
              Wolę od razu konsultację
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Co dostajesz z kalkulatora
          </p>
          <ul className="mt-5 space-y-3 text-sm text-black/75">
            <li>· Orientacyjna moc pompy ciepła</li>
            <li>· Szacowane roczne zapotrzebowanie na ciepło</li>
            <li>· Przewidywany koszt ogrzewania w skali roku</li>
            <li>· Rekomendacja kolejnego kroku (audyt / konsultacja)</li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-black/45">
            Wynik kalkulatora jest szacunkiem opartym o dane wejściowe.
            Decyzja inwestycyjna zawsze opiera się o audyt OZC i projekt.
          </p>
        </div>
      </div>
    </section>
  );
}

