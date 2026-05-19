import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Clock,
  Sparkles,
  CheckCircle2,
  Banknote,
  Phone,
} from "lucide-react";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { CategoryIcon } from "@/components/knowledge/CategoryIcon";
import { categoryBySlug } from "@/lib/knowledge-categories";
import heroImg from "@/assets/cennik-pomp-hero.jpg";

const TITLE = "Cennik pomp ciepła 2026: ile naprawdę kosztuje montaż?";
const DESCRIPTION =
  "Transparentne widełki cenowe pomp ciepła w 2026 r. — split, monoblok, gruntowa. Realne koszty montażu, dofinansowania i 3 przykłady domów. Dobierz model w kalkulatorze Soltimus.";
const CANONICAL =
  "https://soltimus-knowledge-boost.lovable.app/wiedza/pompy-ciepla/cennik-pomp-ciepla-2026";
const PUBLISHED = "2026-05-19";

const FAQS = [
  {
    q: "Ile kosztuje pompa ciepła z montażem w 2026 roku?",
    a: "Powietrzna pompa ciepła split: 38 000–55 000 zł brutto. Monoblok: 45 000–65 000 zł. Gruntowa z odwiertami: 75 000–120 000 zł. Ceny obejmują urządzenie, materiał i robociznę dla domu 120–180 m².",
  },
  {
    q: "Czy dofinansowanie obniża cenę pompy ciepła?",
    a: "Tak. W programie Czyste Powietrze 2026 maksymalna dotacja na pompę ciepła sięga 35 200 zł, a w wariancie podwyższonym z termomodernizacją nawet 99 000 zł. Efektywna cena netto często spada o 40–60%.",
  },
  {
    q: "Dlaczego dwie podobne pompy ciepła mają różne ceny?",
    a: "O cenie decyduje: moc grzewcza, klasa SCOP, czynnik chłodniczy (R32 vs R290), rodzaj zbiornika CWU, długość instalacji hydraulicznej i automatyka. Tani montaż bez audytu energetycznego to najczęstsze źródło problemów eksploatacyjnych.",
  },
  {
    q: "Jak szybko zwraca się pompa ciepła?",
    a: "Wymiana kotła węglowego: 4–7 lat. Wymiana gazu: 7–11 lat. Dom nowy z PV i taryfą G12w: 5–8 lat. ROI liczymy w naszym kalkulatorze na podstawie taryfy klienta i realnego zapotrzebowania budynku.",
  },
];

const cat = categoryBySlug("pompy-ciepla")!;

export const Route = createFileRoute(
  "/wiedza/pompy-ciepla/cennik-pomp-ciepla-2026",
)({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          image: [heroImg],
          datePublished: PUBLISHED,
          author: { "@type": "Organization", name: "Soltimus" },
          publisher: {
            "@type": "Organization",
            name: "Soltimus",
            logo: {
              "@type": "ImageObject",
              url: "https://soltimus-knowledge-boost.lovable.app/favicon.ico",
            },
          },
          articleSection: "Pompy ciepła",
          mainEntityOfPage: CANONICAL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: CennikArticle,
});

const PRICE_ROWS = [
  {
    type: "Powietrzna SPLIT",
    range: "38 000 – 55 000 zł",
    install: "5 000 – 9 000 zł",
    note: "Najpopularniejszy wybór dla domów 100–160 m² z grzejnikami lub podłogówką.",
  },
  {
    type: "Powietrzna MONOBLOK",
    range: "45 000 – 65 000 zł",
    install: "6 000 – 11 000 zł",
    note: "Hermetyczny obieg chłodniczy — brak kontaktu instalatora z czynnikiem. R32 lub R290.",
  },
  {
    type: "Gruntowa (sondy pionowe)",
    range: "75 000 – 120 000 zł",
    install: "25 000 – 55 000 zł (odwierty)",
    note: "Najwyższy SCOP 4,5–5,2. Sensowna dla zapotrzebowania > 9 kW lub przy planowanym chłodzeniu pasywnym.",
  },
];

const CASES = [
  {
    title: "Dom nowy, 120 m², podłogówka",
    spec: "Zapotrzebowanie 4,5 kW · WT2021 · CWU 200 l",
    brutto: "42 800 zł",
    net: "od 18 600 zł po dotacji",
    model: "Daikin Altherma 3 R 6 kW",
  },
  {
    title: "Termomodernizacja, 160 m²",
    spec: "Zapotrzebowanie 8 kW · grzejniki 55°C · CWU 300 l",
    brutto: "58 400 zł",
    net: "od 24 200 zł po dotacji",
    model: "Daikin Altherma 3 M 8 kW",
  },
  {
    title: "Starszy dom, 200 m², bez ocieplenia",
    spec: "Zapotrzebowanie 14 kW · grzejniki wysokotemp. · CWU 300 l",
    brutto: "98 700 zł",
    net: "od 41 500 zł po dotacji",
    model: "Daikin Altherma 3 H HT 14 kW",
  },
];

function CennikArticle() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-black">
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
        style={{ scaleX, background: cat.accent }}
      />

      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: "Pompy ciepła", to: "/wiedza/$category" as any },
          { label: "Cennik pomp ciepła 2026" },
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="relative h-[72vh] min-h-[520px] w-full">
          <img
            src={heroImg}
            alt="Dom jednorodzinny zimą z zewnętrzną jednostką pompy ciepła"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-14 md:px-8 md:pb-24">
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: `${cat.accent}33` }}
              >
                <CategoryIcon
                  iconKey={cat.iconKey}
                  className="h-3.5 w-3.5"
                  style={{ color: cat.accent }}
                />
              </div>
              <Link
                to="/wiedza/$category"
                params={{ category: "pompy-ciepla" }}
                className="hover:text-white"
              >
                Pompy ciepła
              </Link>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#F5B800]" />
                Cennik 2026
              </span>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />8 min czytania
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mt-6 max-w-5xl text-[clamp(2rem,5.5vw,4.6rem)] font-semibold leading-[1.04] tracking-tight"
            >
              Cennik pomp ciepła 2026:{" "}
              <span className="text-white/60">ile naprawdę kosztuje montaż?</span>
            </motion.h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Transparentne widełki cenowe, realne przykłady 3 domów i pełna mapa
              dofinansowań. Bez „od 19 999 zł" — z liczbami, które dostaniesz
              w ofercie Soltimus.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/kalkulator-pompy-ciepla"
                className="group inline-flex items-center gap-3 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white"
              >
                <Calculator className="h-4 w-4" />
                Dobierz pompę w kalkulatorze
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm text-white/90 transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Skonsultuj z inżynierem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TLDR */}
      <section className="border-b border-black/5 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr,2fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/50">
              TL;DR
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Cena pompy ciepła to nie jedna liczba.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-black/70 md:text-lg">
            <p>
              W 2026 r. realna inwestycja w pompę ciepła z montażem mieści się
              między <strong className="text-black">38 000 a 120 000 zł brutto</strong>.
              Różnica wynika z typu źródła (powietrze vs grunt), mocy, klasy SCOP
              i stanu instalacji w budynku.
            </p>
            <p>
              Po dotacji Czyste Powietrze efektywna cena netto najczęściej spada
              o 40–60%. Najtańszy montaż „od ręki" to zwykle najdroższy w 10-letnim
              cyklu eksploatacji.
            </p>
          </div>
        </div>
      </section>

      {/* PRICE TABLE */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/50">
                01 · Widełki cenowe
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Pompa ciepła z montażem — cennik 2026
              </h2>
            </div>
            <Banknote className="hidden h-12 w-12 text-[#0089CF] md:block" />
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-black/10 bg-white">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-4 md:px-6">Typ</th>
                  <th className="px-4 py-4 md:px-6">Pompa + montaż</th>
                  <th className="hidden px-4 py-4 md:table-cell md:px-6">
                    Dolne źródło / instalacja
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map((r) => (
                  <tr
                    key={r.type}
                    className="border-t border-black/5 align-top transition hover:bg-[#FAFAF7]"
                  >
                    <td className="px-4 py-5 font-medium md:px-6">
                      {r.type}
                      <p className="mt-1 hidden text-xs font-normal text-black/60 md:block">
                        {r.note}
                      </p>
                    </td>
                    <td className="px-4 py-5 font-mono text-[#0089CF] md:px-6">
                      {r.range}
                    </td>
                    <td className="hidden px-4 py-5 font-mono text-black/70 md:table-cell md:px-6">
                      {r.install}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-black/50">
            Ceny brutto dla domów 100–200 m². Zawierają urządzenie, zbiornik CWU,
            materiał hydrauliczny, automatykę i robociznę. Nie zawierają
            modernizacji rozdzielnicy elektrycznej i instalacji wewnętrznej C.O.
          </p>
        </div>
      </section>

      {/* CASES */}
      <section className="border-y border-black/5 bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/50">
            02 · Realne przykłady
          </div>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            3 domy, 3 budżety. Konkretne liczby z 2026 r.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CASES.map((c) => (
              <div
                key={c.title}
                className="group rounded-2xl border border-black/10 bg-[#FAFAF7] p-7 transition hover:border-[#0089CF] hover:shadow-xl"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                  {c.spec}
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight">
                  {c.title}
                </h3>
                <div className="mt-6 border-t border-black/10 pt-5">
                  <div className="text-xs uppercase tracking-wider text-black/50">
                    Cena pełna
                  </div>
                  <div className="font-mono text-2xl text-black">{c.brutto}</div>
                  <div className="mt-3 text-xs uppercase tracking-wider text-black/50">
                    Po Czystym Powietrzu
                  </div>
                  <div className="font-mono text-2xl text-[#5FB46B]">{c.net}</div>
                </div>
                <div className="mt-5 text-xs text-black/60">
                  Rekomendacja: <span className="text-black">{c.model}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT DRIVES PRICE */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr,2fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/50">
              03 · Z czego wynika cena
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              6 czynników, które przesuwają budżet o 20 000 zł
            </h2>
          </div>
          <div className="space-y-5">
            {[
              ["Moc grzewcza", "Każdy +2 kW to ok. 3 000–5 000 zł różnicy w cenie urządzenia."],
              ["Klasa SCOP / A+++", "Wyższa efektywność = wyższy CAPEX, ale 15–25% niższe rachunki rocznie."],
              ["Czynnik R32 vs R290", "Propan (R290) — wyższa temperatura zasilania, idealny do termomodernizacji."],
              ["Zbiornik CWU", "Bufor 200/300 l vs zintegrowany ze stacją hybrydową: różnica 2 000–6 000 zł."],
              ["Stan instalacji C.O.", "Stare grzejniki = potrzeba pompy wysokotemperaturowej (droższa o 8 000–15 000 zł)."],
              ["Modernizacja elektryki", "Przyłącze 3-fazowe, zabezpieczenia, ochronniki — 2 500–7 000 zł."],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start gap-4 border-b border-black/10 pb-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0089CF]" />
                <div>
                  <div className="font-semibold">{k}</div>
                  <div className="text-sm text-black/65">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: CALCULATOR */}
      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-black text-white">
          <div className="grid gap-10 p-10 md:grid-cols-[2fr,1fr] md:p-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                <Calculator className="h-3 w-3 text-[#F5B800]" />
                Kalkulator Soltimus
              </div>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                Sprawdź swoją cenę
                <br />
                <span className="text-white/60">w 90 sekund.</span>
              </h2>
              <p className="mt-5 max-w-xl text-white/70">
                6 pytań o Twój budynek. Otrzymasz zapotrzebowanie cieplne,
                rekomendowany model Daikin Altherma 3 i widełki cenowe — dopasowane,
                nie ogólne.
              </p>
            </div>
            <div className="flex items-end">
              <Link
                to="/kalkulator-pompy-ciepla"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F5B800] px-8 py-4 text-base font-medium text-black transition hover:bg-white"
              >
                Otwórz kalkulator
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-black/5 bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/50">
            FAQ
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Najczęściej zadawane pytania
          </h2>
          <div className="mt-10 space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-black/10 bg-[#FAFAF7] p-6 transition open:border-[#0089CF]"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 text-base leading-relaxed text-black/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
