import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Wind,
  Droplets,
  Mountain,
  type LucideIcon,
} from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { COMPANY } from "@/lib/company";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

type HpType = {
  slug: "powietrze-powietrze" | "powietrze-woda" | "gruntowe";
  icon: LucideIcon;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  metrics: { label: string; value: string }[];
  howItWorks: string[];
  pros: string[];
  considerations: string[];
  bestFor: string;
  seoTitle: string;
  seoDescription: string;
};

const TYPES: Record<string, HpType> = {
  "powietrze-powietrze": {
    slug: "powietrze-powietrze",
    icon: Wind,
    navLabel: "Powietrze–powietrze",
    eyebrow: "Pompy ciepła · Powietrze–powietrze",
    title:
      "Pompa ciepła powietrze–powietrze — komfort termiczny przez cały rok.",
    subtitle:
      "System split / multi-split z funkcją grzania i chłodzenia. Bez instalacji wodnej, bez wymiany grzejników.",
    intro: [
      "Powietrze–powietrze to klimatyzacja, która grzeje. Jednostka zewnętrzna pobiera energię z powietrza, jednostki wewnętrzne oddają ją bezpośrednio do pomieszczeń. Brak obiegu wodnego oznacza prostszą instalację i niższy próg wejścia.",
      "To rozwiązanie naturalne dla mieszkań, biur i domów bez centralnego ogrzewania wodnego. Współpracuje świetnie z fotowoltaiką, a w lecie zapewnia chłodzenie i filtrację powietrza.",
    ],
    metrics: [
      { label: "SCOP", value: "3.8–4.5" },
      { label: "Tryb pracy", value: "Grzanie + chłodzenie" },
      { label: "Hałas wewn.", value: "19–24 dB(A)" },
      { label: "Czas montażu", value: "1–3 dni" },
    ],
    howItWorks: [
      "Jednostka zewnętrzna pobiera ciepło z powietrza i przekazuje je czynnikiem chłodniczym do jednostek wewnętrznych.",
      "Każde pomieszczenie może mieć osobny tryb i temperaturę — pełna kontrola strefowa.",
      "Latem cykl odwraca się — system działa jako klimatyzator z funkcją osuszania i filtracji.",
    ],
    pros: [
      "Najniższy koszt inwestycji wśród pomp ciepła",
      "Funkcja chłodzenia i osuszania w standardzie",
      "Szybka instalacja — bez ingerencji w hydraulikę",
      "Filtracja PM2.5 i alergenów (zależnie od jednostki)",
    ],
    considerations: [
      "Nie ogrzewa wody użytkowej — wymaga osobnego źródła CWU",
      "Sprawdza się najlepiej w dobrze ocieplonych budynkach",
      "Komfort termiczny zależy od rozmieszczenia jednostek wewnętrznych",
    ],
    bestFor:
      "Mieszkania, lokale biurowe, domy bez centralnego ogrzewania wodnego, obiekty wymagające jednocześnie grzania i chłodzenia.",
    seoTitle:
      "Pompa ciepła powietrze–powietrze — split / multi-split | Soltimus",
    seoDescription:
      "Pompa ciepła powietrze–powietrze z funkcją grzania i chłodzenia. Projekt, montaż i uruchomienie w inżynierskim standardzie Soltimus.",
  },
  "powietrze-woda": {
    slug: "powietrze-woda",
    icon: Droplets,
    navLabel: "Powietrze–woda",
    eyebrow: "Pompy ciepła · Powietrze–woda",
    title:
      "Pompa ciepła powietrze–woda — pełna integracja z domem.",
    subtitle:
      "Daikin Altherma 3 — ogrzewanie, CWU i chłodzenie pasywne w jednym systemie niskotemperaturowym.",
    intro: [
      "Najczęściej wybierane rozwiązanie dla domów jednorodzinnych w Polsce. Pracujemy z urządzeniami Daikin Altherma 3 — szerokie okno modulacji, dojrzała platforma serwisowa, niskie poziomy hałasu.",
      "Większość problemów (taktowanie, wysokie rachunki, hałas) wynika nie z urządzenia, lecz z braku OZC i hydrauliki. Nasza praca zaczyna się od audytu — pompa to ostatni element łańcucha.",
    ],
    metrics: [
      { label: "SCOP", value: "4.2–4.8" },
      { label: "Tryb pracy", value: "CO + CWU + chłodzenie" },
      { label: "Hałas tryb nocny", value: "30–35 dB(A)" },
      { label: "Monitoring po starcie", value: "30 dni" },
    ],
    howItWorks: [
      "Jednostka zewnętrzna pobiera ciepło z powietrza i przekazuje je do modułu hydraulicznego we wnętrzu budynku.",
      "Moduł hydrauliczny zasila instalację podłogową, bufor i zasobnik CWU.",
      "Krzywa grzewcza dostosowuje temperaturę zasilania do warunków zewnętrznych — pompa moduluje moc zamiast cyklicznie się włączać.",
    ],
    pros: [
      "Najlepszy stosunek ceny do efektywności dla domu jednorodzinnego",
      "Pełna integracja z PV i magazynem energii",
      "CWU + cyrkulacja w jednym urządzeniu",
      "Chłodzenie pasywne przez instalację podłogową",
    ],
    considerations: [
      "Wymaga instalacji niskotemperaturowej (podłogówka lub duże grzejniki)",
      "Jednostka zewnętrzna wymaga przemyślanej lokalizacji (hałas, odpływ kondensatu)",
      "Sprawność spada w skrajnie niskich temperaturach — projekt musi to przewidzieć",
    ],
    bestFor:
      "Domy jednorodzinne — nowe i po termomodernizacji, z instalacją podłogową, łączące ogrzewanie, CWU i chłodzenie.",
    seoTitle:
      "Pompa ciepła powietrze–woda Daikin Altherma 3 | Soltimus",
    seoDescription:
      "Pompa ciepła powietrze–woda Daikin Altherma 3 — audyt, OZC, projekt, montaż, monitoring. Inżynierski standard Soltimus.",
  },
  gruntowe: {
    slug: "gruntowe",
    icon: Mountain,
    navLabel: "Gruntowe",
    eyebrow: "Pompy ciepła · Gruntowe",
    title:
      "Gruntowa pompa ciepła — najwyższa klasa efektywności.",
    subtitle:
      "Źródło dolne o stabilnej temperaturze przez 12 miesięcy. SCOP 4.8–5.5, brak jednostki zewnętrznej, pasywne chłodzenie niemal za darmo.",
    intro: [
      "Pompa solanka–woda pobiera energię z gruntu poprzez wymiennik pionowy (odwierty) lub poziomy (kolektor płaski). Temperatura źródła dolnego waha się w wąskim zakresie 4–10 °C przez cały rok — to fundament wysokiej i stabilnej efektywności.",
      "Wyższy koszt inwestycji zwraca się dwojako: niższe rachunki przez cały okres eksploatacji i znacznie dłuższy horyzont użytkowania. Wymiennik gruntowy ma żywotność liczoną w dekadach.",
    ],
    metrics: [
      { label: "SCOP", value: "4.8–5.5" },
      { label: "Tryb pracy", value: "CO + CWU + chłodzenie pasywne" },
      { label: "Żywotność źródła", value: "50+ lat" },
      { label: "Hałas zewnętrzny", value: "0 dB" },
    ],
    howItWorks: [
      "Wymiennik gruntowy (sondy pionowe lub kolektor poziomy) odbiera ciepło z gruntu poprzez krążącą solankę.",
      "Pompa ciepła wewnątrz budynku podnosi temperaturę solanki i przekazuje energię do instalacji CO i CWU.",
      "Latem cykl może być odwrócony — chłód z gruntu trafia bezpośrednio do podłogówki przez wymiennik, niemal bez zużycia energii (chłodzenie pasywne).",
    ],
    pros: [
      "Najwyższa efektywność wśród pomp ciepła (SCOP 4.8–5.5)",
      "Brak jednostki zewnętrznej — zero hałasu i estetyki technicznej",
      "Pasywne chłodzenie przez wymiennik, niemal bez zużycia energii",
      "Stabilna praca niezależnie od temperatury powietrza",
    ],
    considerations: [
      "Wyższy koszt inwestycji — głównie z powodu odwiertów lub powierzchni kolektora",
      "Wymaga miejsca (kolektor poziomy) lub odwiertów (sondy pionowe)",
      "Dłuższy proces realizacji — uzgodnienia geologiczne i wykonanie źródła dolnego",
    ],
    bestFor:
      "Domy premium, rezydencje, obiekty o długim horyzoncie eksploatacji, osiedla wielomieszkaniowe z polem odwiertów.",
    seoTitle:
      "Gruntowa pompa ciepła — solanka-woda, SCOP 4.8–5.5 | Soltimus",
    seoDescription:
      "Gruntowa pompa ciepła z odwiertami pionowymi lub kolektorem poziomym. Projekt, geologia, montaż i uruchomienie w standardzie Soltimus.",
  },
};

export const Route = createFileRoute("/oferta/pompy-ciepla/$type")({
  beforeLoad: ({ params }) => {
    if (!TYPES[params.type]) throw notFound();
  },
  head: ({ params }) => {
    const t = TYPES[params.type];
    if (!t) return { meta: [{ title: "Pompy ciepła" }] };
    const url = `${SITE.url}/oferta/pompy-ciepla/${t.slug}`;
    return buildMeta({
      title: t.seoTitle,
      description: t.seoDescription,
      path: `/oferta/pompy-ciepla/${t.slug}`,
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          {
            name: "Pompy ciepła",
            url: `${SITE.url}/oferta/pompy-ciepla`,
          },
          { name: t.navLabel, url },
        ]),
      ],
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
          Ten typ pompy ciepła nie istnieje.
        </h1>
        <Link
          to="/oferta/pompy-ciepla"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Wróć do pomp ciepła
        </Link>
      </div>
      <SiteFooter />
    </main>
  ),
  component: PompyCieplaTypePage,
});

function PompyCieplaTypePage() {
  const { type } = Route.useParams();
  const t = TYPES[type]!;
  const Icon = t.icon;

  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />

      {/* HERO */}
      <section className="border-b border-black/5 bg-[#FAFAF7] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/oferta/pompy-ciepla"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-black/50 hover:text-black"
          >
            <ArrowLeft className="h-3 w-3" />
            Pompy ciepła
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5B800]/15 text-black">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
              {t.eyebrow}
            </p>
          </div>
          <h1 className="mt-5 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            {t.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Umów konsultację
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/kalkulator-pompy-ciepla"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium text-black hover:bg-black/5"
            >
              Kalkulator mocy
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-black/5 px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-black/70 md:text-lg">
          {t.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="bg-[#0E0E10] px-5 py-20 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
            Parametry kluczowe
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-4">
            {t.metrics.map((m) => (
              <div key={m.label} className="bg-[#0E0E10] p-6 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {m.label}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-black/5 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
                Jak działa
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Trzy kroki obiegu energii.
              </h2>
            </div>
            <ol className="space-y-6">
              {t.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F5B800] text-sm font-semibold text-black">
                    {i + 1}
                  </div>
                  <p className="pt-1.5 text-base leading-relaxed text-black/75">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PROS + CONSIDERATIONS */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          <div className="rounded-3xl border border-black/5 bg-[#FAFAF7] p-8 md:p-10">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" style={{ color: "#F5B800" }} />
              <h2 className="text-xl font-semibold tracking-tight">
                Mocne strony
              </h2>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-black/75">
              {t.pros.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "#F5B800" }}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-black/10 p-8 md:p-10">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-black/60" />
              <h2 className="text-xl font-semibold tracking-tight">
                Co warto wiedzieć
              </h2>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-black/75">
              {t.considerations.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/40" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BEST FOR */}
      <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Najlepsze dla
          </p>
          <p className="mt-5 text-xl leading-relaxed text-black/80 md:text-2xl">
            {t.bestFor}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
            Następny krok
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Porozmawiajmy o Twoim budynku.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Audyt, OZC i rekomendacja technologii — bez presji sprzedażowej.
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
