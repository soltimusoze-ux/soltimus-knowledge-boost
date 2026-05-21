import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Thermometer,
  Sun,
  Wind,
  Layers,
  Wrench,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { COMPANY } from "@/lib/company";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/oferta")({
  head: () =>
    buildMeta({
      title: "Oferta — pompy ciepła, fotowoltaika, magazyny energii",
      description:
        "Kompleksowe systemy energii dla domu: pompy ciepła, fotowoltaika, magazyny energii, rekuperacja i termomodernizacja. Projekt, montaż, serwis.",
      path: "/oferta",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
        ]),
      ],
    }),
  component: OfertaPage,
});

const SERVICES = [
  {
    icon: Thermometer,
    title: "Pompy ciepła",
    lead: "Daikin Altherma — powietrzne i gruntowe.",
    to: "/oferta/pompy-ciepla",
    points: [
      "Audyt + OZC + projekt",
      "Powietrze–woda · grunt–woda",
      "Hydraulika i elektryka jako część projektu",
      "Uruchomienie + 30 dni monitoringu",
    ],
  },
  {
    icon: Sun,
    title: "Wytwarzanie i magazynowanie energii elektrycznej",
    lead: "Fotowoltaika, magazyny energii, taryfy dynamiczne.",
    to: "/oferta/energia",
    points: [
      "Premium panele i falowniki",
      "Magazyny energii Sigenergy",
      "Integracja z pompą ciepła i EV",
      "Optymalizacja pod taryfę dynamiczną",
    ],
  },

  {
    icon: Wind,
    title: "Rekuperacja i klimatyzacja",
    lead: "Świeże powietrze i komfort termiczny przez cały rok.",
    to: "/oferta/rekuperacja",
    points: [
      "Wentylacja z odzyskiem ciepła",
      "Filtracja PM2.5 / HEPA",
      "Klimatyzacja Daikin — multi-split i kanałowa",
      "Cisza i komfort klasy premium",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Audyty energetyczne",
    lead: "Inżynierska diagnoza budynku przed inwestycją.",
    to: "/oferta/audyty-energetyczne",
    points: [
      "Audyt energetyczny i OZC",
      "Badanie kamerą termowizyjną",
      "Plan modernizacji etapowej",
      "Dokumentacja pod dofinansowania",
    ],
  },
  {
    icon: Layers,
    title: "Termomodernizacja",
    lead: "Mniej energii, więcej komfortu.",
    to: "/oferta/termomodernizacja",
    points: [
      "Audyt energetyczny budynku",
      "Ocieplenie i wymiana stolarki",
      "Plan modernizacji etapowej",
      "Wsparcie w dofinansowaniach",
    ],
  },
  {
    icon: Wrench,
    title: "Serwis i opieka",
    lead: "Inżynierowie, nie call center.",
    to: "/oferta/serwis",
    points: [
      "Przeglądy okresowe",
      "Reakcja serwisu 24h",
      "Własny magazyn części",
      "Opieka przez 25+ lat",
    ],
  },
];


function OfertaPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />

      {/* HERO */}
      <section className="border-b border-black/5 bg-[#FAFAF7] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Oferta · Premium energy systems
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Kompletne systemy energii dla{" "}
            <span className="italic font-light text-black/60">wymagających domów</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            Projektujemy i instalujemy spójne systemy: ogrzewanie, energia,
            wentylacja i magazynowanie. Wszystko w jednym, inżynierskim
            standardzie — od audytu po serwis.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5B800]/15 text-black transition-transform group-hover:scale-110">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-black/30 transition-all group-hover:translate-x-1 group-hover:text-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {s.title}
                    </h2>
                    <p className="mt-1 text-sm text-black/60">{s.lead}</p>
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-black/70">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 flex-shrink-0"
                          style={{ color: "#F5B800" }}
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/70 transition-colors group-hover:text-black">
                    Zobacz usługę
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </>
              );
              const cls =
                "group flex flex-col gap-5 bg-white p-8 transition-colors hover:bg-[#FAFAF7] md:p-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] cursor-pointer";
              return (
                <Link key={s.title} to={s.to} className={cls}>
                  {inner}
                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
            Następny krok
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Porozmawiajmy o Twoim projekcie.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Zaprojektujemy system dopasowany do budynku, budżetu i stylu życia.
            Bezpłatna konsultacja, bez presji sprzedażowej.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Umów konsultację
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5"
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
