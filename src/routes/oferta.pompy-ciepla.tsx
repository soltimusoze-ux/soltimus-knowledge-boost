import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Wind,
  Droplets,
  Mountain,
  CheckCircle2,
  Gauge,
  Thermometer,
  Activity,
} from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { COMPANY } from "@/lib/company";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/oferta/pompy-ciepla")({
  head: () =>
    buildMeta({
      title: "Pompy ciepła — powietrze-powietrze, powietrze-woda, gruntowe",
      description:
        "Trzy technologie pomp ciepła w jednym inżynierskim standardzie Soltimus: powietrze-powietrze, powietrze-woda i gruntowe. Audyt, OZC, projekt, uruchomienie, monitoring.",
      path: "/oferta/pompy-ciepla",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          { name: "Pompy ciepła", url: `${SITE.url}/oferta/pompy-ciepla` },
        ]),
      ],
    }),
  component: PompyCieplaHub,
});

const TYPES = [
  {
    slug: "powietrze-powietrze",
    icon: Wind,
    title: "Powietrze–powietrze",
    lead: "Klimatyzacja z funkcją grzania. Komfort termiczny przez cały rok.",
    description:
      "System split / multi-split z odzyskiem ciepła z powietrza zewnętrznego. Ogrzewanie i chłodzenie w jednym, bez instalacji wodnej.",
    bestFor: "Mieszkania, biura, domy bez instalacji centralnego ogrzewania.",
    points: [
      "Szybka instalacja — bez wymiany grzejników",
      "Funkcja chłodzenia w lecie",
      "Filtracja powietrza klasy premium",
      "Niski koszt inwestycji",
    ],
  },
  {
    slug: "powietrze-woda",
    icon: Droplets,
    title: "Powietrze–woda",
    lead: "Najczęstszy wybór dla domów jednorodzinnych. Ogrzewanie, CWU i chłodzenie.",
    description:
      "Daikin Altherma 3 — pełna integracja z instalacją niskotemperaturową, podłogówką, CWU i chłodzeniem pasywnym przez wymiennik.",
    bestFor:
      "Domy jednorodzinne — nowe i po termomodernizacji, instalacja podłogowa.",
    points: [
      "SCOP 4.2–4.8 przy poprawnym projekcie",
      "Współpraca z PV i magazynem energii",
      "Pełna obsługa CWU + cyrkulacja",
      "30–35 dB(A) w trybie nocnym",
    ],
  },
  {
    slug: "gruntowe",
    icon: Mountain,
    title: "Gruntowe",
    lead: "Najwyższa efektywność. Stabilna praca w każdej temperaturze.",
    description:
      "Pompa solanka–woda z wymiennikiem pionowym lub poziomym. Źródło dolne o stabilnej temperaturze przez 12 miesięcy.",
    bestFor:
      "Domy premium, rezydencje, osiedla, obiekty o długim horyzoncie eksploatacji.",
    points: [
      "SCOP 4.8–5.5 — najlepsza klasa efektywności",
      "Brak jednostki zewnętrznej i hałasu",
      "Żywotność źródła dolnego 50+ lat",
      "Pasywne chłodzenie niemal za darmo",
    ],
  },
];

const PRINCIPLES = [
  {
    icon: Gauge,
    title: "OZC zanim padnie nazwa urządzenia",
    text: "Obliczenia zapotrzebowania na ciepło są punktem wyjścia. Bez nich dobór mocy to zgadywanie — a przewymiarowanie zabija SCOP i sprężarkę.",
  },
  {
    icon: Thermometer,
    title: "Hydraulika niskotemperaturowa",
    text: "Bufor, sprzęgło, prawidłowy przepływ i krzywa grzewcza. Sama pompa to mniej niż 40% jakości pracy systemu.",
  },
  {
    icon: Activity,
    title: "30 dni monitoringu po uruchomieniu",
    text: "Po starcie zbieramy dane i korygujemy parametry. Dopiero potem instalacja zostaje przekazana — z raportem i krzywą referencyjną.",
  },
];

function PompyCieplaHub() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />

      {/* HERO */}
      <section className="border-b border-black/5 bg-[#FAFAF7] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Oferta · Pompy ciepła
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Trzy technologie. Jeden{" "}
            <span className="italic font-light text-black/60">
              inżynierski standard
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            Powietrze–powietrze, powietrze–woda i gruntowe. Każda z nich ma
            inne miejsce — wybór wynika z budynku, instalacji, sposobu życia
            i horyzontu eksploatacji. Pomagamy podjąć tę decyzję na podstawie
            obliczeń, nie katalogu.
          </p>
        </div>
      </section>

      {/* TECHNOLOGY OVERVIEW */}
      <section className="border-b border-black/5 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
                Technologia
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Pompa ciepła to nie urządzenie — to system.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-black/70">
              <p>
                Pompa ciepła przenosi energię z otoczenia (powietrza, gruntu,
                wody) do wnętrza budynku, zużywając do tego kilkukrotnie mniej
                energii elektrycznej niż klasyczne ogrzewanie. Wskaźnik SCOP
                opisuje, ile kWh ciepła otrzymujemy z każdej kWh prądu — w
                dobrze zaprojektowanej instalacji to 4–5,5.
              </p>
              <p>
                Wybór między powietrzem, wodą a gruntem to nie kwestia mody —
                to kwestia OZC, dostępnej działki, instalacji wewnętrznej i
                horyzontu inwestycji. Każda z trzech technologii ma swoje
                miejsce; różnica leży w efektywności, koszcie inwestycji,
                pracochłonności montażu i przewidywanej żywotności.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-white p-8 md:p-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5B800]/15 text-black">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/65">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPE TILES */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Wybierz technologię
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Trzy ścieżki. Pełne specyfikacje wewnątrz.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 md:grid-cols-3">
            {TYPES.map((t) => (
              <Link
                key={t.slug}
                to="/oferta/pompy-ciepla/$type"
                params={{ type: t.slug }}
                className="group flex flex-col gap-5 bg-white p-8 transition-colors hover:bg-[#FAFAF7] md:p-10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5B800]/15 text-black transition-transform group-hover:scale-110">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-black/30 transition-all group-hover:translate-x-1 group-hover:text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm text-black/60">{t.lead}</p>
                </div>
                <p className="text-sm leading-relaxed text-black/70">
                  {t.description}
                </p>
                <ul className="mt-1 space-y-2 text-sm text-black/70">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        style={{ color: "#F5B800" }}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 border-t border-black/5 pt-4 text-[12px] uppercase tracking-[0.2em] text-black/45">
                  Najlepsze dla
                </div>
                <p className="-mt-2 text-sm text-black/70">{t.bestFor}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
            Nie wiesz która technologia?
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Wybór zaczyna się od OZC, nie od ulotki.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Umów konsultację — przejdziemy przez budynek, instalację i
            oczekiwania. Rekomendacja technologii i mocy wynika z obliczeń, nie
            z preferencji handlowca.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Umów konsultację
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/kalkulator-pompy-ciepla"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5"
            >
              Kalkulator mocy
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
