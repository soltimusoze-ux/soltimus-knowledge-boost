import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Calendar,
  ChevronDown,
  Sparkles,
  Quote,
  MessageCircle,
  Phone,
  Thermometer,
  Snowflake,
  Layers,
  TrendingDown,
  Gauge,
  Drill,
  ShieldCheck,
  Leaf,
  Building2,
  FileText,
  Play,
} from "lucide-react";
import { useState } from "react";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { CategoryIcon } from "@/components/knowledge/CategoryIcon";
import { RelatedVideos } from "@/components/knowledge/RelatedVideos";
import { categoryBySlug, KNOWLEDGE_CATEGORIES } from "@/lib/knowledge-categories";
import heroImg from "@/assets/gruntowa-pompa-hero.jpg";
import schemaImg from "@/assets/gruntowa-pompa-schema.jpg";
import roomImg from "@/assets/gruntowa-pompa-room.jpg";

const TITLE =
  "Gruntowa pompa ciepła: Jak działa, ile kosztuje i czy ma wady? [Kompletny Przewodnik]";
const DESCRIPTION =
  "Inżynierski przewodnik po gruntowych pompach ciepła: zasada działania, COP, koszty, dolne źródło, pasywne chłodzenie, ROI, wady i ryzyka geologiczne. Wiedza ekspertów Soltimus.";
const CANONICAL =
  "https://soltimus-knowledge-boost.lovable.app/wiedza/pompy-ciepla/gruntowa-pompa-ciepla-kompletny-przewodnik";
const PUBLISHED = "2026-05-12";

export const Route = createFileRoute(
  "/wiedza/pompy-ciepla/gruntowa-pompa-ciepla-kompletny-przewodnik",
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
  component: GruntowaPompaArticle,
});

const TAGS = [
  "gruntowa pompa ciepła",
  "dolne źródło",
  "COP",
  "geotermia",
  "pasywne chłodzenie",
  "ROI",
  "Daikin Altherma",
];

const cat = categoryBySlug("pompy-ciepla")!;

function GruntowaPompaArticle() {
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

      <ArticleStyles />

      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: "Pompy ciepła", to: "/wiedza/$category" as any },
          { label: "Gruntowa pompa ciepła — przewodnik" },
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="relative h-[78vh] min-h-[560px] w-full">
          <img
            src={heroImg}
            alt="Nowoczesny dom z gruntową pompą ciepła i odwiertem geotermalnym o zmierzchu"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          {/* subtle grid */}
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
                Engineering Lab · Knowledge Hub
              </span>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                14 min czytania
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mt-6 max-w-5xl text-[clamp(2.1rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight"
            >
              Gruntowa pompa ciepła:{" "}
              <span className="text-white/60">
                jak działa, ile kosztuje i czy ma wady?
              </span>
            </motion.h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Kompletny przewodnik inżynierski — od fizyki dolnego źródła, przez
              realny COP w polskich warunkach, po TCO w 20-letniej perspektywie.
              Bez marketingu. Tylko liczby i decyzje projektowe.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                12 maja 2026
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-[#F5B800]" />
                Recenzja inżynierska Soltimus
              </span>
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <FileText className="h-3 w-3 text-[#0089CF]" />
                12 sekcji · 7 FAQ
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KEY STATS STRIP */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-black/5 md:grid-cols-4">
          <Stat label="Realny SCOP" value="4.8–5.3" sub="dolne źródło 7°C" />
          <Stat label="Koszt instalacji" value="95–160k zł" sub="dom 180 m²" />
          <Stat label="ROI" value="8–11 lat" sub="vs. gaz / olej" />
          <Stat label="Żywotność" value="25+ lat" sub="odwiert: 50–80 lat" />
        </div>
      </section>

      {/* INTRO + TOC */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <aside className="lg:sticky lg:top-32 lg:col-span-3 lg:self-start">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                Spis treści
              </div>
              <ol className="mt-4 space-y-2.5 text-sm">
                {TOC.map((t, i) => (
                  <li key={t.id} className="flex gap-3">
                    <span className="w-5 shrink-0 font-mono text-[10px] text-black/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${t.id}`}
                      className="text-black/70 transition-colors hover:text-black"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-2xl border border-[#F5B800]/30 bg-[#FFFBEB] p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#9A6B00]">
                Skrót dla zabieganych
              </div>
              <p className="mt-3 text-sm leading-relaxed text-black/75">
                Gruntowa pompa ciepła = najwyższy SCOP (4.8–5.3) i pasywne
                chłodzenie w cenie. Wyższy CAPEX, niższy OPEX. Sens ekonomiczny
                pojawia się przy budynkach od 150 m² i niskotemperaturowej
                instalacji.
              </p>
            </div>
          </aside>

          <article className="editorial lg:col-span-9">
            <Reveal>
              <h2 id="czym-jest">Czym właściwie jest gruntowa pompa ciepła?</h2>
              <p>
                Gruntowa pompa ciepła (geotermalna pompa ciepła, w skrócie{" "}
                <strong>GSHP — Ground Source Heat Pump</strong>) to urządzenie,
                które pobiera niskotemperaturową energię zgromadzoną w gruncie i
                podnosi jej parametry do poziomu użytecznego dla instalacji
                grzewczej budynku. Sercem układu jest obieg termodynamiczny ze
                sprężarką inwerterową — taki sam, jak w nowoczesnej pompie
                powietrznej — ale <strong>dolne źródło</strong> stanowi tu grunt,
                a nie powietrze.
              </p>
              <p>
                Różnica brzmi technicznie, lecz jej konsekwencje są bardzo
                praktyczne: temperatura gruntu na głębokości 10–100 m utrzymuje
                się przez cały rok w okolicach <strong>8–10°C</strong>. To stała,
                niezależna od mrozu, deszczu i wiatru baza, która sprężarce
                pompy ciepła pozwala pracować zawsze w optymalnym punkcie.
              </p>
            </Reveal>

            <InsightBlock
              icon={<Thermometer className="h-5 w-5" />}
              tone="blue"
              label="Engineering insight · COP"
              title="Dlaczego COP geotermalnej pompy jest tak stabilny"
            >
              W pompie powietrznej COP spada wraz z temperaturą powietrza — przy
              −15°C nawet o 35–45%. Pompa gruntowa „nie wie”, że jest zima:
              dolne źródło ma stabilne 7°C. Efekt? <strong>SCOP 4.8–5.3</strong>{" "}
              przez cały sezon i brak strat na cykle odszraniania.
            </InsightBlock>

            <Reveal>
              <figure>
                <img
                  src={schemaImg}
                  alt="Schemat dolnego źródła pompy ciepła — pionowe odwierty z kolektorem U-rurowym"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
                <figcaption>
                  Schemat dwóch pionowych odwiertów (100 m) z kolektorem U-rurowym
                  — najczęstsza konfiguracja w polskich warunkach geologicznych.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal>
              <h2 id="jak-dziala">Jak działa krok po kroku</h2>
              <ol>
                <li>
                  <strong>Dolne źródło</strong> — w pionowych odwiertach lub
                  poziomym kolektorze krąży solanka (glikol), pobierając ciepło z
                  gruntu.
                </li>
                <li>
                  <strong>Parownik</strong> — solanka oddaje ciepło czynnikowi
                  chłodniczemu (np. R32 / R290), który odparowuje już przy
                  bardzo niskiej temperaturze.
                </li>
                <li>
                  <strong>Sprężarka inwerterowa</strong> — modularnie sprężaja
                  parę, podnosząc jej ciśnienie i temperaturę do 35–55°C.
                </li>
                <li>
                  <strong>Skraplacz</strong> — gorący czynnik oddaje ciepło do
                  obiegu grzewczego budynku (podłogówka, grzejniki
                  niskotemperaturowe, bufor CWU).
                </li>
                <li>
                  <strong>Zawór rozprężny</strong> — czynnik wraca do parownika,
                  cykl się zamyka.
                </li>
              </ol>
            </Reveal>

            <Reveal>
              <h2 id="dolne-zrodlo">Dolne źródło — odwierty vs kolektor poziomy</h2>
              <p>
                W 92% nowych realizacji Soltimus stosujemy{" "}
                <strong>pionowe odwierty</strong>. Dlaczego?
              </p>
            </Reveal>

            <CompareCards
              items={[
                {
                  title: "Pionowe odwierty (BHE)",
                  badge: "Rekomendowane",
                  badgeColor: "#F5B800",
                  pros: [
                    "Stabilne 7–10°C cały rok",
                    "Działka 4–6 arów wystarczy",
                    "Najwyższy realny SCOP",
                    "Możliwe pasywne chłodzenie",
                  ],
                  cons: [
                    "Wyższy CAPEX (40–70k zł)",
                    "Wymaga firmy z koncesją",
                  ],
                },
                {
                  title: "Kolektor poziomy",
                  badge: "Tylko duże działki",
                  badgeColor: "#8C8C8C",
                  pros: [
                    "Niższy koszt instalacji",
                    "Brak głębokich odwiertów",
                  ],
                  cons: [
                    "Min. 2–3× powierzchnia ogrzewana",
                    "Niższa temperatura zimą (2–4°C)",
                    "Spadek COP w lutym/marcu",
                    "Brak pasywnego chłodzenia",
                  ],
                },
              ]}
            />

            <Reveal>
              <h2 id="koszty">Ile to naprawdę kosztuje?</h2>
              <p>
                Najczęściej zadawane pytanie — i najczęściej źle odpowiadane.
                Realny budżet brutto, uwzględniający projekt, odwierty,
                jednostkę wewnętrzną Daikin Altherma 3 GEO, bufor, montaż i
                uruchomienie:
              </p>
            </Reveal>

            <CostTable />

            <InsightBlock
              icon={<TrendingDown className="h-5 w-5" />}
              tone="yellow"
              label="Engineering insight · TCO / ROI"
              title="20-letnie TCO: gdzie gruntowa wygrywa"
            >
              W perspektywie 20 lat (z 4% inflacją cen energii) gruntowa pompa
              ciepła <strong>oszczędza 90–150 tys. zł</strong> względem kotła
              gazowego i 40–70 tys. zł względem dobrej pompy powietrznej. Punkt
              przecięcia kosztów następuje pomiędzy <strong>8. a 11. rokiem</strong>{" "}
              eksploatacji.
            </InsightBlock>

            <Reveal>
              <h2 id="cop">COP i SCOP — jak czytać dane producenta</h2>
              <p>
                <strong>COP</strong> to chwilowa sprawność w warunkach
                testowych. Liczba znacząca dopiero w kontekście:{" "}
                <em>B0/W35</em> oznacza dolne źródło 0°C, woda grzewcza 35°C.
                Realny benchmark dla polskiej geotermii: <em>B7/W35</em>, gdzie
                dobre pompy gruntowe osiągają COP ≈ 5.6.
              </p>
              <p>
                <strong>SCOP</strong> to średnioroczna sprawność — i to ta
                liczba odpowiada Twojemu rachunkowi za prąd.
              </p>
            </Reveal>

            <COPTable />

            <Reveal>
              <h2 id="chlodzenie">Pasywne chłodzenie — niedoceniany bonus</h2>
              <p>
                Latem, gdy grunt jest chłodniejszy od powietrza w domu,
                gruntowa pompa może chłodzić bez uruchamiania sprężarki. Działa
                wyłącznie pompa obiegowa — <strong>~80 W zamiast 2–3 kW</strong>.
                To realnie darmowe chłodzenie podłogi i wody w fancoilach.
              </p>
            </Reveal>

            <InsightBlock
              icon={<Snowflake className="h-5 w-5" />}
              tone="cyan"
              label="Engineering insight · Pasywne chłodzenie"
              title="Free cooling: 80 W vs 2 500 W"
            >
              W przeciętny letni miesiąc pasywne chłodzenie zużywa{" "}
              <strong>~40 kWh</strong> energii elektrycznej — czyli ok. 30 zł.
              Klimatyzacja split o porównywalnej mocy chłodniczej: 600–900 kWh
              i 450–700 zł. Różnica w 10 lat: <strong>40–60 tys. zł</strong>.
            </InsightBlock>

            <Reveal>
              <figure>
                <img
                  src={roomImg}
                  alt="Premium pomieszczenie techniczne z gruntową pompą ciepła i buforem"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
                <figcaption>
                  Kotłownia z gruntową pompą ciepła Daikin Altherma 3 GEO,
                  buforem oraz manifoldem solanki. Realizacja Soltimus, 2025.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal>
              <h2 id="wady">Wady i ryzyka — uczciwie</h2>
              <p>
                Gruntowa pompa ciepła nie jest dla każdego. Oto sytuacje, w
                których szczerze odradzamy ten wybór:
              </p>
              <ul>
                <li>
                  <strong>Mały dom (&lt; 120 m²)</strong> z niskim zużyciem —
                  ROI rozmywa się poza 15 lat.
                </li>
                <li>
                  <strong>Działka skalista lub artezyjska</strong> — koszty
                  wiercenia mogą wzrosnąć o 50–80%.
                </li>
                <li>
                  <strong>Instalacja wysokotemperaturowa</strong> (stare
                  grzejniki żeliwne 70°C) — bez modernizacji COP spada do
                  poziomu pompy powietrznej.
                </li>
                <li>
                  <strong>Brak miejsca na maszt wiertniczy</strong> (dom w
                  zwartej zabudowie miejskiej).
                </li>
              </ul>
            </Reveal>

            <Reveal>
              <div className="mt-12 flex gap-5 rounded-2xl border-l-4 border-[#0089CF] bg-white p-6 md:p-8">
                <Quote className="h-8 w-8 shrink-0 text-[#0089CF]/30" />
                <div>
                  <p className="text-base italic leading-relaxed text-black/80 md:text-lg">
                    „Najczęstszy błąd inwestorów to porównywanie ceny urządzenia
                    zamiast TCO. Gruntowa pompa ciepła to inwestycja
                    infrastrukturalna — odwiert pracuje 50–80 lat, niezależnie
                    od tego, którą pompę do niego podłączysz za 20 lat.”
                  </p>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-black/50">
                    Dział projektowy Soltimus
                  </div>
                </div>
              </div>
            </Reveal>

            {/* FAQ */}
            <div id="faq" className="mt-16">
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                FAQ
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Najczęstsze pytania
              </h3>
              <FaqAccordion />
            </div>

            <RelatedVideos
              matchText="gruntowa pompa ciepła geotermia dolne źródło"
              limit={4}
            />

            {/* CTA */}
            <CTA />
          </article>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <RelatedArticles />

      {/* EXPLORE */}
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
                  c.slug === "pompy-ciepla"
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white text-black/70 hover:border-black"
                }`}
              >
                {c.name}
                {c.slug !== "pompy-ciepla" && <ArrowRight className="h-3 w-3" />}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- TOC ---------- */
const TOC = [
  { id: "czym-jest", label: "Czym jest gruntowa pompa ciepła" },
  { id: "jak-dziala", label: "Jak działa krok po kroku" },
  { id: "dolne-zrodlo", label: "Dolne źródło: odwierty vs kolektor" },
  { id: "koszty", label: "Ile to naprawdę kosztuje" },
  { id: "cop", label: "COP i SCOP — jak czytać dane" },
  { id: "chlodzenie", label: "Pasywne chłodzenie" },
  { id: "wady", label: "Wady i ryzyka" },
  { id: "faq", label: "FAQ" },
];

/* ---------- FAQ data ---------- */
const FAQS = [
  {
    q: "Ile kosztuje gruntowa pompa ciepła z odwiertem dla domu 180 m²?",
    a: "Realny budżet brutto dla dobrze izolowanego domu 180 m² to 115–145 tys. zł: jednostka Daikin Altherma 3 GEO (45–60k), 2 odwierty po 100 m (40–55k), bufor + CWU + automatyka (12–18k), montaż i uruchomienie (10–14k). Po dotacji Czyste Powietrze koszt spada o 35–55 tys. zł.",
  },
  {
    q: "Jak głębokie muszą być odwierty pod pompę ciepła?",
    a: "Standardowo 80–150 metrów na 1–2 otwory. Reguła kciuka: 12–20 mb odwiertu na 1 kW mocy pompy. Dokładną wartość wyznacza Test Reakcji Termicznej (TRT) gruntu — w Soltimus robimy go dla każdej realizacji powyżej 14 kW.",
  },
  {
    q: "Jak długo wytrzymuje odwiert i sama pompa?",
    a: "Odwiert (sonda gruntowa z PE100-RC) ma żywotność 50–80 lat — to inwestycja pokoleniowa. Sama pompa ciepła Daikin Altherma 3 GEO: 20–25 lat przy serwisie co 24 miesiące. Sprężarka inwerterowa to element zużywający się; jej wymiana po 18–22 latach to koszt 8–14 tys. zł.",
  },
  {
    q: "Czy gruntowa pompa ciepła naprawdę chłodzi pasywnie za darmo?",
    a: "Tak — przy temperaturze gruntu 7–10°C i instalacji podłogowej z fancoilami pasywne chłodzenie pobiera tylko energię pomp obiegowych (~80 W). Schłodzenie całego domu kosztuje 25–40 zł miesięcznie. Klimatyzacja split o tej samej mocy: 400–700 zł.",
  },
  {
    q: "Po ilu latach gruntowa pompa ciepła się zwraca?",
    a: "Wobec kotła gazowego: 8–11 lat. Wobec kotła na olej: 5–7 lat. Wobec dobrej pompy powietrznej: 12–16 lat (ale gruntowa ma 2× dłuższy resurs). Z dotacją Czyste Powietrze ROI skraca się o 3–4 lata.",
  },
  {
    q: "Jakie są ryzyka geologiczne odwiertu?",
    a: "Trzy realne: (1) artezyjski wypływ wody pod ciśnieniem — wymaga specjalnej obudowy, +8–15 tys. zł, (2) skała macierzysta na małej głębokości — wolniejsze wiercenie, +20–40%, (3) lokalne strefy ochrony wód podziemnych — wymóg uzgodnień. Wszystkie identyfikujemy w fazie projektowej, przed podpisaniem umowy.",
  },
  {
    q: "Czy potrzebuję dużej działki pod gruntową pompę ciepła?",
    a: "Nie. Dla pionowych odwiertów wystarcza 4–6 arów wolnej przestrzeni — na maszt wiertniczy potrzeba miejsca tylko podczas wiercenia (3–5 dni). Po zakończeniu prac powierzchnia wraca do pełnego użytkowania, łącznie z ogrodem i tarasem.",
  },
];

/* ---------- helpers / blocks ---------- */

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white p-6 md:p-8">
      <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-black/50">{sub}</div>
    </div>
  );
}

function InsightBlock({
  icon,
  label,
  title,
  tone,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  tone: "blue" | "yellow" | "cyan";
  children: React.ReactNode;
}) {
  const palette = {
    blue: { bar: "#0089CF", chip: "#0089CF", bg: "#F3F9FD" },
    yellow: { bar: "#F5B800", chip: "#9A6B00", bg: "#FFFBEB" },
    cyan: { bar: "#0E7C9C", chip: "#0E7C9C", bg: "#F0F7FA" },
  }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="my-10 overflow-hidden rounded-3xl border border-black/5 bg-[#0E0E10] text-white"
    >
      <div className="grid gap-0 md:grid-cols-12">
        <div
          className="relative flex items-center gap-3 p-6 md:col-span-4 md:p-8"
          style={{ background: `linear-gradient(135deg, ${palette.bar}, transparent)` }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 backdrop-blur">
            {icon}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              {label}
            </div>
            <div className="mt-1 text-base font-semibold tracking-tight md:text-lg">
              {title}
            </div>
          </div>
        </div>
        <div className="p-6 text-sm leading-relaxed text-white/80 md:col-span-8 md:p-8 md:text-base">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function CompareCards({
  items,
}: {
  items: {
    title: string;
    badge: string;
    badgeColor: string;
    pros: string[];
    cons: string[];
  }[];
}) {
  return (
    <div className="my-10 grid gap-5 md:grid-cols-2">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="overflow-hidden rounded-2xl border border-black/5 bg-white"
        >
          <div className="flex items-center justify-between border-b border-black/5 p-5">
            <h4 className="text-lg font-semibold tracking-tight">{it.title}</h4>
            <span
              className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-black"
              style={{ background: `${it.badgeColor}33`, color: it.badgeColor }}
            >
              {it.badge}
            </span>
          </div>
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#5FB46B]">
                Zalety
              </div>
              <ul className="mt-3 space-y-2 text-sm text-black/75">
                {it.pros.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#5FB46B]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-black/5 p-5 md:border-l md:border-t-0">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C03B3B]">
                Wady
              </div>
              <ul className="mt-3 space-y-2 text-sm text-black/75">
                {it.cons.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C03B3B]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CostTable() {
  const rows = [
    { item: "Projekt + TRT gruntu", small: "8–14 kW", price: "4 500 – 7 500 zł" },
    { item: "Pompa Daikin Altherma 3 GEO", small: "wraz z automatyką", price: "42 000 – 62 000 zł" },
    { item: "Odwierty pionowe", small: "2 × 80–120 m", price: "38 000 – 56 000 zł" },
    { item: "Bufor + zasobnik CWU", small: "100 + 300 l", price: "9 000 – 14 000 zł" },
    { item: "Montaż, rozruch, dokumentacja", small: "z odbiorem UDT", price: "11 000 – 15 000 zł" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="my-10 overflow-hidden rounded-2xl border border-black/5 bg-white"
    >
      <div className="flex items-center justify-between border-b border-black/5 bg-[#FAFAF7] px-6 py-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Kosztorys referencyjny
          </div>
          <div className="mt-1 text-sm font-medium">Dom 180 m², instalacja 35°C</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">Razem brutto</div>
          <div className="mt-1 text-lg font-semibold tracking-tight">
            104 500 – 154 500 zł
          </div>
        </div>
      </div>
      <div className="divide-y divide-black/5">
        {rows.map((r) => (
          <div
            key={r.item}
            className="grid grid-cols-12 items-center gap-3 px-6 py-4 text-sm"
          >
            <div className="col-span-7 md:col-span-6">
              <div className="font-medium text-black">{r.item}</div>
              <div className="text-xs text-black/45">{r.small}</div>
            </div>
            <div className="col-span-5 text-right font-mono text-sm text-black/80 md:col-span-6">
              {r.price}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 bg-[#FFFBEB] px-6 py-4 text-xs text-[#9A6B00]">
        Po dotacji Czyste Powietrze (do 135 000 zł) realny koszt netto:{" "}
        <strong>59 500 – 109 500 zł</strong>.
      </div>
    </motion.div>
  );
}

function COPTable() {
  const rows = [
    { cond: "B0/W35", desc: "Test producencki — porównanie pomp", cop: "5.1" },
    { cond: "B7/W35", desc: "Realny scenariusz polski (zima)", cop: "5.6" },
    { cond: "B7/W45", desc: "Hybryda z grzejnikami niskotemp.", cop: "4.2" },
    { cond: "Pasywne chłodzenie", desc: "Lato, podłogówka 18°C", cop: "20+" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="my-10 overflow-hidden rounded-2xl border border-black/5 bg-[#0E0E10] text-white"
    >
      <div className="border-b border-white/10 px-6 py-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
          Daikin Altherma 3 GEO — sprawność w warunkach roboczych
        </div>
      </div>
      <div className="grid grid-cols-12 border-b border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-white/45">
        <div className="col-span-4">Warunek</div>
        <div className="col-span-5">Opis</div>
        <div className="col-span-3 text-right">COP</div>
      </div>
      <div className="divide-y divide-white/5">
        {rows.map((r) => (
          <div key={r.cond} className="grid grid-cols-12 items-center px-6 py-4 text-sm">
            <div className="col-span-4 font-mono text-[#F5B800]">{r.cond}</div>
            <div className="col-span-5 text-white/75">{r.desc}</div>
            <div className="col-span-3 text-right font-semibold text-white">{r.cop}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-8 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/5 bg-white">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-black/[0.015]"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold tracking-tight md:text-base">
                {f.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-black/50 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 text-sm leading-relaxed text-black/70 md:text-base">
                {f.a}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="relative mt-16 overflow-hidden rounded-3xl bg-[#0E0E10] p-8 text-white md:p-14"
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, #F5B80044, transparent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, #0089CF44, transparent)" }}
      />

      <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Konsultacja inżynierska
          </div>
          <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
            Masz pytania dotyczące Twojej działki?
          </h3>
          <p className="mt-4 max-w-xl text-sm text-white/70 md:text-base">
            Przeanalizujemy warunki geologiczne i dobierzemy najlepsze
            rozwiązanie dla Twojej inwestycji — bez handlowca, bez presji.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-5">
          <Link
            to="/premium"
            hash="kontakt"
            className="group inline-flex items-center justify-between gap-2 rounded-full bg-[#F5B800] px-6 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> Umów konsultację
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/premium"
            hash="projekt"
            className="group inline-flex items-center justify-between gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white"
          >
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" /> Prześlij projekt domu
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/lab"
            className="group inline-flex items-center justify-between gap-2 rounded-full border border-white/10 px-6 py-4 text-sm font-medium text-white/85 transition-colors hover:border-white/40"
          >
            <span className="inline-flex items-center gap-2">
              <Play className="h-4 w-4 text-[#C03B3B]" /> Zobacz Soltimus Lab
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function RelatedArticles() {
  const items = [
    {
      icon: <Gauge className="h-4 w-4" />,
      tag: "Pompy ciepła",
      title: "Pompa powietrzna vs gruntowa — która wybór dla Twojego domu?",
      to: "/wiedza/$category" as const,
      params: { category: "porownania" },
    },
    {
      icon: <Layers className="h-4 w-4" />,
      tag: "Hydraulika",
      title: "Czy bufor ciepła jest potrzebny przy pompie ciepła?",
      to: "/lab-episode/$slug" as const,
      params: { slug: "czy-bufor-ciepla-jest-potrzebny" },
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      tag: "Case study",
      title: "Modernizacja domu z lat 90. — gruntowa pompa po termomodernizacji",
      to: "/wiedza/$category" as const,
      params: { category: "case-studies" },
    },
    {
      icon: <Leaf className="h-4 w-4" />,
      tag: "Dotacje",
      title: "Czyste Powietrze 2026 — jakie progi dla pomp ciepła?",
      to: "/wiedza/$category" as const,
      params: { category: "dotacje" },
    },
  ];
  return (
    <section className="border-t border-black/5 bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Czytaj dalej
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Powiązane materiały eksperckie
        </h3>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={it.to as any}
                params={it.params as any}
                className="group flex h-full flex-col gap-5 rounded-2xl border border-black/5 bg-[#FAFAF7] p-6 transition-all hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#0089CF]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0089CF]/10">
                    {it.icon}
                  </span>
                  {it.tag}
                </div>
                <h4 className="text-base font-semibold leading-snug tracking-tight md:text-lg">
                  {it.title}
                </h4>
                <div className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-black/60 group-hover:text-black">
                  Czytaj <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <Link
          to="/wiedza"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Wróć do Knowledge Hub
        </Link>
      </div>
    </section>
  );
}

/* Editorial typography (scoped) */
function ArticleStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        .editorial { color: #111; font-size: 1.0625rem; line-height: 1.78; }
        @media (min-width: 768px) {
          .editorial { font-size: 1.175rem; line-height: 1.82; }
        }
        .editorial p { margin: 0 0 1.4em; color: rgba(0,0,0,0.78); }
        .editorial > div:first-child p:first-of-type::first-letter,
        .editorial p.dropcap::first-letter {
          font-size: 3.2em; float: left; line-height: 0.9; padding: 0.05em 0.12em 0 0;
          font-weight: 600; color: #0089CF;
        }
        .editorial h2 {
          font-size: clamp(1.6rem, 3vw, 2.15rem); font-weight: 600; line-height: 1.15;
          letter-spacing: -0.015em; margin: 2.6em 0 0.8em; scroll-margin-top: 7rem;
        }
        .editorial h2::before {
          content: ""; display: block; width: 36px; height: 2px;
          background: #0089CF; margin-bottom: 0.8em;
        }
        .editorial h3 { font-size: 1.25rem; font-weight: 600; margin: 2em 0 0.6em; }
        .editorial strong { color: #000; font-weight: 600; }
        .editorial em { font-style: italic; color: rgba(0,0,0,0.85); }
        .editorial ul, .editorial ol { margin: 0 0 1.6em 1.2em; padding: 0; }
        .editorial ul li, .editorial ol li {
          margin: 0.55em 0; color: rgba(0,0,0,0.78); padding-left: 0.3em;
        }
        .editorial ul li::marker { color: #0089CF; }
        .editorial ol li::marker { color: #0089CF; font-weight: 600; }
        .editorial figure { margin: 2.6em 0; }
        .editorial img {
          width: 100%; height: auto; border-radius: 18px;
          box-shadow: 0 30px 60px -30px rgba(0,0,0,0.25);
        }
        .editorial figcaption {
          font-size: 0.85em; color: rgba(0,0,0,0.5); text-align: center; margin-top: 0.8em;
        }
      `,
      }}
    />
  );
}
