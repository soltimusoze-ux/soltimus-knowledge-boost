import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  Wrench,
  Thermometer,
  Activity,
  Cpu,
  ShieldCheck,
  Settings2,
  Gauge,
  Flame,
  Sparkles,
  Calculator,
  Phone,
  MapPin,
  Layers,
  Network,
  HeartPulse,
  Clock,
  Building2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";
import { COMPANY, ADDRESS_LINE } from "@/lib/company";

import heroImg from "@/assets/pompy-ciepla/pc-hero.jpg";
import badInstallImg from "@/assets/pompy-ciepla/pc-bad-install.jpg";
import comfortImg from "@/assets/pompy-ciepla/pc-comfort.jpg";
import houseWinterImg from "@/assets/pompy-ciepla/pc-house-winter.jpg";
import hybridImg from "@/assets/pompy-ciepla/pc-hybrid.jpg";
import serviceImg from "@/assets/pompy-ciepla/pc-service.jpg";
import showroomMain from "@/assets/showroom/showroom-daikin-main.jpg";
import engineerRoom from "@/assets/showroom/engineer-mechanical-room.jpg";
import teamPhoto from "@/assets/team/team-hq-soltimus.jpg";
import caseDaikinImg from "@/assets/case-daikin-engineer-hero.jpg";
import caseKonstancinImg from "@/assets/case-konstancin-hero.jpg";
import caseHybridFireplaceImg from "@/assets/case-stodola-hero.jpg";
import caseKostkaImg from "@/assets/case-kostka-prl-hero.jpg";

const FAQ_ITEMS = [
  {
    q: "Czy pompa ciepła sprawdzi się w starym, słabo ocieplonym domu?",
    a: "Często tak, ale nie zawsze. Najpierw robimy audyt — sprawdzamy izolację, grzejniki, instalację elektryczną i realne zapotrzebowanie. Jeśli budynek nie jest gotowy, uczciwie powiemy, że trzeba zacząć od termomodernizacji albo dobrać system hybrydowy. Nie sprzedajemy pomp ciepła na siłę.",
  },
  {
    q: "Co to jest taktowanie i dlaczego to problem?",
    a: "Taktowanie to częste, krótkie cykle pracy sprężarki — efekt przewymiarowanej pompy lub źle dobranej hydrauliki. Skraca żywotność urządzenia i zwiększa zużycie prądu. Eliminujemy je już na etapie projektu: OZC, bufor, mieszacze, krzywa grzewcza.",
  },
  {
    q: "Jaka jest realna roczna sprawność (SCOP) dobrze zaprojektowanego systemu?",
    a: "W dobrze ocieplonym domu z podłogówką SCOP 4,0–4,5 jest realny. W modernizowanym budynku z grzejnikami częściej 3,2–3,8. Wartości katalogowe (5,0+) osiąga się tylko w warunkach laboratoryjnych — nie obiecujemy ich klientom.",
  },
  {
    q: "Czy serwis powykonawczy realnie ma znaczenie?",
    a: "Tak — pompa ciepła pracuje 15–20 lat. Jesteśmy AFS Daikin, mamy własny magazyn części, diagnostykę zdalną i reakcję 24h. Każda zaprojektowana przez nas instalacja jest w naszej bazie commissioningu — wiemy, jak była uruchamiana i co w niej siedzi.",
  },
  {
    q: "Kiedy hybryda (pompa + kominek / pompa + kocioł) ma sens?",
    a: "Gdy budynek jest częściowo modernizowany, mamy ograniczenia mocy elektrycznej, albo użytkownik świadomie chce zachować ogień jako element komfortu i rezerwę bezpieczeństwa. Hybryda to nie kompromis — to świadoma architektura systemu.",
  },
  {
    q: "Ile realnie kosztuje ogrzewanie pompą ciepła w skali roku?",
    a: "W nowym domu WT2021 o pow. 150 m² — najczęściej 1 800–3 500 zł rocznie (ogrzewanie + CWU, przy taryfie G12 lub dynamicznej). W modernizowanym domu z lat 90. — 4 500–8 000 zł. Różnica wynika z izolacji i jakości projektu, nie z marki pompy.",
  },
];

export const Route = createFileRoute("/oferta/pompy-ciepla")({
  head: () =>
    buildMeta({
      title:
        "Pompy ciepła Daikin — projektowanie systemów ogrzewania | Soltimus",
      description:
        "Nie sprzedajemy pomp ciepła. Projektujemy kompletne systemy ogrzewania, które działają bezpiecznie i oszczędnie przez kilkanaście lat. AFS Daikin, serwis 24h, własny dział inżynieryjny.",
      path: "/oferta/pompy-ciepla",
      image: heroImg,
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          {
            name: "Pompy ciepła",
            url: `${SITE.url}/oferta/pompy-ciepla`,
          },
        ]),
        faqSchema(
          FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a })),
        ),
      ],
    }),
  component: PompyCieplaPage,
});

function PompyCieplaPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="transparent" />
      <Hero />
      <Manifesto />
      <WhyPumpsBreak />
      <CaseRepair />
      <SystemThinking />
      <WhenNotIdea />
      <Effortless />
      <ServiceLayer />
      <RealCosts />
      <Hybrid />
      <CalculatorReadiness />
      <LabIntegration />
      <ShowroomTrust />
      <RealCases />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

/* ============================================================
   HERO
============================================================ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative min-h-[92vh] w-full">
        <img
          src={heroImg}
          alt="Premium kotłownia z pompą ciepła Daikin Altherma i precyzyjną hydrauliką"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(245,184,0,0.10),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-40 md:px-10 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#F5B800]"
          >
            <span className="inline-block h-px w-8 bg-[#F5B800]" />
            Pompy ciepła · Engineering & long-term service
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-7 max-w-5xl text-[clamp(2.2rem,5.8vw,5.2rem)] font-semibold leading-[1.02] tracking-tight"
          >
            Pompa ciepła to tylko część systemu.{" "}
            <span className="italic font-light text-white/65">
              Reszta decyduje, czy zadziała.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            Projektujemy kompletne systemy ogrzewania i energii, które mają
            działać bezpiecznie, oszczędnie i bezproblemowo przez
            kilkanaście lat. Nie sprzedajemy urządzeń — projektujemy
            infrastrukturę cieplną domu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/kalkulator-pompy-ciepla"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-7 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Sprawdź, czy Twój dom jest gotowy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white/90 hover:bg-white/5"
            >
              Zobacz realizacje
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-white/70"
          >
            <Stat label="Lat doświadczenia" value="10+" />
            <Stat label="Status Daikin AFS" value="Affiliated Service" />
            <Stat label="Reakcja serwisu" value="24h" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/45">
        {label}
      </div>
    </div>
  );
}

/* ============================================================
   MANIFESTO
============================================================ */

function Manifesto() {
  return (
    <section className="relative bg-[#FBFAF6] px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Pozycja inżynierska
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight"
        >
          Większość problemów z pompami ciepła{" "}
          <span className="italic font-light text-black/55">
            nie wynika z samej pompy.
          </span>{" "}
          Tylko ze źle zaprojektowanego systemu.
        </motion.h2>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-black/65">
          Po boomie 2022 roku polski rynek przyjął tysiące pomp ciepła
          dobranych „na oko”, montowanych bez OZC, podłączanych do
          hydrauliki sprzed dekady. Dziś te same domy wracają do nas —
          z taktowaniem, awariami sprężarek, fakturami za prąd, których
          nikt nie zapowiadał. To, czego naprawdę brakuje, to nie lepsze
          urządzenie. To projekt.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   WHY PUMPS BREAK
============================================================ */

const BREAK_CARDS = [
  {
    icon: Gauge,
    title: "Przewymiarowanie",
    body:
      "Pompa dobrana „z zapasem” pracuje krótkimi cyklami (taktowanie). Sprężarka się zużywa, prąd rośnie, komfort spada.",
  },
  {
    icon: AlertTriangle,
    title: "Brak audytu OZC",
    body:
      "Bez obliczenia obciążenia cieplnego dobór mocy jest zgadywaniem. Każdy projekt zaczynamy od OZC — nigdy od katalogu.",
  },
  {
    icon: Activity,
    title: "Zła hydraulika",
    body:
      "Za małe przepływy, brak bufora, niewłaściwe mieszacze. Pompa próbuje grzać dom, który technicznie tego nie przyjmuje.",
  },
  {
    icon: Wrench,
    title: "Błędny montaż",
    body:
      "Nieizolowane rury, źle dobrane zabezpieczenia, brak filtra magnetycznego. Mała oszczędność na ekipie — duża faktura za naprawy.",
  },
  {
    icon: Cpu,
    title: "Brak commissioningu",
    body:
      "Włączenie urządzenia to nie uruchomienie systemu. Krzywa grzewcza, parametry pracy, bilans — wszystko musi być nastawione i udokumentowane.",
  },
  {
    icon: Layers,
    title: "Boom 2022 — masówka",
    body:
      "Ekipy „pomp-ciepłowe” powstałe w pół roku zostawiły rynek z tysiącami problematycznych instalacji. Większość naszych serwisów to dziś naprawa cudzych projektów.",
  },
];

function WhyPumpsBreak() {
  return (
    <section className="bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Dlaczego pompy ciepła się psują
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Problemem często nie jest urządzenie.{" "}
              <span className="italic font-light text-black/50">
                Problemem jest projekt.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-black/60">
            Sześć powtarzalnych błędów, które widzimy w serwisach co
            tydzień. Nie krytykujemy rynku — pokazujemy, co konkretnie
            decyduje o tym, czy pompa ciepła ma 15 lat życia, czy 4.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-3">
          {BREAK_CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="bg-white p-8 md:p-10">
                <Icon className="h-6 w-6 text-[#F5B800]" strokeWidth={1.6} />
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {c.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CASE — REPAIR
============================================================ */

function CaseRepair() {
  return (
    <section className="relative overflow-hidden bg-[#0E0E10] px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <img
            src={badInstallImg}
            alt="Źle wykonana instalacja pompy ciepła przed naprawą"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1600}
            height={2000}
          />
        </motion.div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
            Case · Naprawa instalacji
          </div>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight">
            Naprawiamy błędy rynku pomp ciepła.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
            Dom z 2000 r., pompa przewymiarowana o 60%, spalona sprężarka,
            instalacja elektryczna niezgodna z normą, faktury 1 800 zł
            miesięcznie. Audyt OZC, redesign hydrauliki, wymiana na
            dobraną jednostkę Daikin, nowe zabezpieczenia, commissioning.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <CaseStat value="−58%" label="Koszt ogrzewania" />
            <CaseStat value="0" label="Awarii w 12 mies." />
            <CaseStat value="OZC + redesign" label="Punkt wyjścia" />
          </div>
          <Link
            to="/realizacje/$slug"
            params={{ slug: "dom-2000-naprawa-instalacji-daikin" }}
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium hover:bg-white/5"
          >
            Zobacz pełne case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CaseStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-white md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
        {label}
      </div>
    </div>
  );
}

/* ============================================================
   SYSTEM THINKING
============================================================ */

const SYSTEM_LAYERS = [
  { icon: Activity, title: "Hydraulika", desc: "Przepływy, bufor, mieszacze, rozdzielacze." },
  { icon: Thermometer, title: "Emitery", desc: "Podłogówka, grzejniki niskoparametrowe, fancoile." },
  { icon: ShieldCheck, title: "Izolacja", desc: "Bez termomodernizacji żadna pompa nie pracuje optymalnie." },
  { icon: Cpu, title: "Automatyka", desc: "Krzywa grzewcza, sterowanie pogodowe, integracja AI." },
  { icon: Network, title: "Wentylacja", desc: "Rekuperacja jako element bilansu energetycznego." },
  { icon: Settings2, title: "Magazyn energii", desc: "PV + bateria + taryfa dynamiczna = tańsza praca pompy." },
];

function SystemThinking() {
  return (
    <section className="bg-[#FBFAF6] px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              System thinking
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Pompa ciepła nie działa sama.
            </h2>
          </div>
          <blockquote className="border-l-2 border-[#F5B800] pl-6 text-base leading-relaxed text-black/65 md:text-lg">
            „Najlepsza pompa ciepła w źle zaprojektowanym domu nadal
            będzie działała źle. Dlatego nie zaczynamy od urządzenia.
            Zaczynamy od budynku.”
          </blockquote>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {SYSTEM_LAYERS.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border border-black/10 bg-white p-7"
              >
                <Icon className="h-5 w-5 text-black/70" strokeWidth={1.6} />
                <div className="mt-5 text-xs uppercase tracking-[0.22em] text-black/45">
                  Warstwa {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {l.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {l.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHEN NOT A GOOD IDEA
============================================================ */

function WhenNotIdea() {
  const blockers = [
    "Brak ocieplenia ścian / dachu",
    "Małe, stare grzejniki na wysokie parametry",
    "Instalacja elektryczna niezdolna do zwiększenia mocy",
    "Brak miejsca na bufor i jednostkę zewnętrzną",
    "Założenie „pompa zrobi wszystko” bez zmiany domu",
  ];
  const firsts = [
    "Audyt energetyczny i OZC",
    "Termomodernizacja ścian i dachu",
    "Wymiana grzejników lub podłogówka",
    "Modernizacja instalacji elektrycznej",
    "Decyzja o hybrydzie zamiast monoźródła",
  ];
  return (
    <section className="bg-white px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Uczciwie
          </div>
          <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
            Kiedy pompa ciepła{" "}
            <span className="italic font-light text-black/50">
              nie jest dobrym pomysłem?
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-black/60 md:text-lg">
            Czasem najlepszą odpowiedzią inżyniera jest „jeszcze nie”.
            Albo „nie w tej konfiguracji”. To nie strata sprzedaży —
            to ochrona klienta przed instalacją, która nie zadziała.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-2">
          <div className="bg-[#FFF8EC] p-10 md:p-12">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-black/55">
              <AlertTriangle className="h-4 w-4" />
              Sygnały ostrzegawcze
            </div>
            <ul className="mt-7 space-y-4">
              {blockers.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 border-b border-black/10 pb-4 text-sm leading-relaxed text-black/75 last:border-0 last:pb-0"
                >
                  <span className="mt-2 inline-block h-1 w-3 shrink-0 bg-black/60" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-10 md:p-12">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-black/55">
              <Sparkles className="h-4 w-4" />
              Co powinno wydarzyć się najpierw
            </div>
            <ul className="mt-7 space-y-4">
              {firsts.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 border-b border-black/10 pb-4 text-sm leading-relaxed text-black/75 last:border-0 last:pb-0"
                >
                  <span className="mt-2 inline-block h-1 w-3 shrink-0 bg-[#F5B800]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EFFORTLESS — comfort
============================================================ */

function Effortless() {
  return (
    <section className="relative overflow-hidden bg-[#0E0E10] text-white">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="relative min-h-[60vh]">
          <img
            src={comfortImg}
            alt="Spokojny poranek w nowoczesnym polskim domu z ogrzewaniem podłogowym"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1600}
            height={1100}
          />
        </div>
        <div className="flex items-center px-5 py-20 md:px-14 md:py-28">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
              Bezobsługowość
            </div>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight">
              Ogrzewanie, o którym nie trzeba myśleć.
            </h2>
            <p className="mt-7 text-base leading-relaxed text-white/65 md:text-lg">
              Nie ma węgla. Nie ma popiołu. Nie ma dostaw. Nie ma
              dzwonienia po kominiarza, paliwo, ekipę. Jest aplikacja,
              krzywa grzewcza dobrana raz, dom o stałej temperaturze
              i rachunek, który nie zaskakuje. Komfort polega tu nie na
              luksusie — tylko na braku codziennego problemu.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
              <SmallBlock
                icon={Clock}
                title="Zero codziennej obsługi"
                body="Brak rytuału opału, kontroli, sprzątania."
              />
              <SmallBlock
                icon={Cpu}
                title="Zdalne sterowanie"
                body="Krzywa, harmonogram, wakacje — z telefonu."
              />
              <SmallBlock
                icon={HeartPulse}
                title="Stabilny komfort"
                body="±0,5°C dzień i noc, bez wahań."
              />
              <SmallBlock
                icon={Gauge}
                title="Przewidywalne koszty"
                body="Roczny rachunek znany z dokładnością do kilkuset zł."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Clock;
  title: string;
  body: string;
}) {
  return (
    <div>
      <Icon className="h-4 w-4 text-[#F5B800]" strokeWidth={1.6} />
      <div className="mt-3 text-sm font-medium tracking-tight">{title}</div>
      <div className="mt-1 text-xs leading-relaxed text-white/55">{body}</div>
    </div>
  );
}

/* ============================================================
   SERVICE LAYER
============================================================ */

function ServiceLayer() {
  return (
    <section className="bg-[#FBFAF6] px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Serwis i bezpieczeństwo
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Pompa ciepła to inwestycja na kilkanaście lat.{" "}
              <span className="italic font-light text-black/50">
                Dlatego serwis ma znaczenie.
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/60 md:text-lg">
              Soltimus jest{" "}
              <strong className="font-semibold text-black">
                Affiliated Service Daikin (AFS)
              </strong>{" "}
              — z własnym magazynem części, diagnostyką zdalną,
              dokumentacją commissioningu i reakcją serwisową 24h.
              Każda instalacja, którą zaprojektowaliśmy, jest w naszej
              bazie technicznej.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <ServiceStat value="AFS Daikin" label="Status partnera" />
              <ServiceStat value="24h" label="Reakcja serwisu" />
              <ServiceStat value="Własny magazyn" label="Części zamienne" />
              <ServiceStat value="Zdalna diagnostyka" label="Telemetria" />
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img
              src={serviceImg}
              alt="Inżynier Soltimus diagnozuje pompę ciepła w trakcie serwisu"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1600}
              height={2000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-black/10 pt-4">
      <div className="text-lg font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-black/45">
        {label}
      </div>
    </div>
  );
}

/* ============================================================
   REAL COSTS
============================================================ */

const COST_ROWS = [
  {
    profile: "Dom WT2021 · 150 m²",
    sub: "Podłogówka, dobra izolacja",
    range: "1 800 – 3 500 zł / rok",
    note: "SCOP ~4,2 · taryfa G12 lub dynamiczna",
  },
  {
    profile: "Dom modernizowany · 180 m²",
    sub: "Podłogówka + grzejniki, izolacja po termomodernizacji",
    range: "3 500 – 5 500 zł / rok",
    note: "SCOP ~3,6 · zalecany bufor 200 l",
  },
  {
    profile: "Dom z lat 90. · 160 m²",
    sub: "Grzejniki niskoparametrowe, częściowa modernizacja",
    range: "4 500 – 8 000 zł / rok",
    note: "SCOP ~3,2 · warto rozważyć hybrydę",
  },
  {
    profile: "Hybryda: pompa + kominek",
    sub: "Świadomy backup, ECH2O / bufor",
    range: "2 500 – 4 500 zł / rok",
    note: "Ogień jako rezerwa, pompa jako baza",
  },
];

function RealCosts() {
  return (
    <section className="bg-white px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Rzeczywiste koszty eksploatacji
          </div>
          <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
            Bez obietnic. Tylko realne zakresy.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-black/60 md:text-lg">
            Marketing pomp ciepła obiecuje „rachunek 80 zł miesięcznie”.
            W praktyce koszt zależy od izolacji, emiterów, taryfy
            i nawyków użytkowania. Poniżej — szczere widełki z naszych
            własnych instalacji w monitoringu.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-black/10">
          {COST_ROWS.map((r, i) => (
            <div
              key={r.profile}
              className={`grid items-baseline gap-4 px-7 py-7 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-8 ${
                i % 2 === 0 ? "bg-[#FBFAF6]" : "bg-white"
              }`}
            >
              <div>
                <div className="text-base font-semibold tracking-tight md:text-lg">
                  {r.profile}
                </div>
                <div className="mt-1 text-xs text-black/50 md:text-sm">
                  {r.sub}
                </div>
              </div>
              <div className="text-lg font-semibold tracking-tight text-[#0E0E10] md:text-xl">
                {r.range}
              </div>
              <div className="text-xs leading-relaxed text-black/55 md:text-sm">
                {r.note}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-black/45">
          Zakresy roczne (ogrzewanie + CWU), ceny 2026, taryfa G12 lub
          dynamiczna PSTRYK. Dokładny wynik daje audyt OZC i symulacja
          z realnym profilem energetycznym domu.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   HYBRID SYSTEMS
============================================================ */

function Hybrid() {
  return (
    <section className="relative overflow-hidden bg-[#0E0E10] text-white">
      <div className="grid items-stretch md:grid-cols-[1.1fr_1fr]">
        <div className="flex items-center px-5 py-20 md:px-14 md:py-28">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
              Systemy hybrydowe
            </div>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight">
              Nowoczesny dom nie musi działać{" "}
              <span className="italic font-light text-white/55">
                tylko w jeden sposób.
              </span>
            </h2>
            <p className="mt-7 text-base leading-relaxed text-white/65 md:text-lg">
              Pompa ciepła + kominek z płaszczem wodnym, bufor ECH2O,
              magazyn energii, integracja z fotowoltaiką i taryfą
              dynamiczną. Architektura systemu, w której każdy element
              robi to, w czym jest najlepszy — i przejmuje pracę, kiedy
              inny element jest w trybie wakacyjnym, awaryjnym albo po
              prostu nieopłacalnym.
            </p>
            <ul className="mt-10 space-y-4 text-sm leading-relaxed text-white/75">
              <li className="flex gap-3">
                <Flame className="mt-0.5 h-4 w-4 shrink-0 text-[#F5B800]" />
                Ogień jako rezerwa bezpieczeństwa, nie nawyk.
              </li>
              <li className="flex gap-3">
                <Layers className="mt-0.5 h-4 w-4 shrink-0 text-[#F5B800]" />
                Bufor ECH2O łączy CWU, ogrzewanie i magazyn ciepła.
              </li>
              <li className="flex gap-3">
                <Network className="mt-0.5 h-4 w-4 shrink-0 text-[#F5B800]" />
                Sterowanie wybiera tańsze źródło automatycznie.
              </li>
            </ul>
            <Link
              to="/realizacje/$slug"
              params={{ slug: "dom-nowy-hybryda-kominek-pompa-ciepla" }}
              className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium hover:bg-white/5"
            >
              Zobacz realizację hybrydową
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <div className="relative min-h-[60vh]">
          <img
            src={hybridImg}
            alt="Nowoczesny kominek z płaszczem wodnym jako element systemu hybrydowego"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1600}
            height={1100}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/35" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CALCULATOR READINESS
============================================================ */

function CalculatorReadiness() {
  return (
    <section className="bg-[#FBFAF6] px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-black/60">
              <Calculator className="h-3.5 w-3.5" />
              Narzędzie inżynierskie
            </div>
            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Czy Twój dom jest gotowy{" "}
              <span className="italic font-light text-black/50">
                na pompę ciepła?
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/60 md:text-lg">
              Krótka, inżynierska ocena gotowości: izolacja, emitery,
              instalacja elektryczna, wentylacja, profil energetyczny.
              Wynik to nie oferta — to konsultacja: gdzie jesteś, czego
              brakuje, co warto zrobić najpierw.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/kalkulator-pompy-ciepla"
                className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
              >
                Sprawdź gotowość domu
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
          <div className="rounded-3xl border border-black/10 bg-white p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Co kalkulator ocenia
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-black/75">
              <li>· Poziom izolacji budynku</li>
              <li>· Typ i parametry emiterów ciepła</li>
              <li>· Gotowość instalacji elektrycznej</li>
              <li>· Obecność i jakość wentylacji</li>
              <li>· Stan modernizacji i nawyki energetyczne</li>
              <li>· Rekomendację następnego kroku</li>
            </ul>
            <p className="mt-7 text-xs leading-relaxed text-black/45">
              Wynik kalkulatora jest punktem wyjścia. Decyzja
              inwestycyjna zawsze opiera się o audyt OZC i projekt
              instalacji.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LAB INTEGRATION
============================================================ */

const LAB_TOPICS = [
  { tag: "OZC", title: "Po co liczyć obciążenie cieplne, skoro „katalog wystarcza”." },
  { tag: "Taktowanie", title: "Skąd się bierze i jak je eliminujemy projektem." },
  { tag: "Hydraulika", title: "Bufor: kiedy go potrzebujesz, a kiedy szkodzi." },
  { tag: "Sprężarka", title: "Co naprawdę zabija sprężarkę w pompie ciepła." },
  { tag: "Hybryda", title: "Pompa + kominek + magazyn: jak to spina sterownik." },
  { tag: "Taryfa", title: "Pompa ciepła w taryfie dynamicznej PSTRYK." },
];

function LabIntegration() {
  return (
    <section className="bg-white px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Soltimus Lab
            </div>
            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
              Wiedza, której nie znajdziesz w broszurze producenta.
            </h2>
          </div>
          <Link
            to="/wiedza"
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium hover:bg-black/5"
          >
            Cała baza wiedzy
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {LAB_TOPICS.map((t) => (
            <div
              key={t.title}
              className="group rounded-2xl border border-black/10 bg-[#FBFAF6] p-7 transition-colors hover:bg-white"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F5B800]">
                {t.tag}
              </div>
              <h3 className="mt-5 text-base font-semibold leading-snug tracking-tight">
                {t.title}
              </h3>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-black/45">
                W przygotowaniu
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SHOWROOM TRUST
============================================================ */

function ShowroomTrust() {
  return (
    <section className="bg-[#0E0E10] px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
          <h2 className="text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
            Za dobrze działającą instalacją{" "}
            <span className="italic font-light text-white/55">
              stoją konkretni ludzie.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-white/65 md:text-lg">
            Salon partnerski Daikin w Garwolinie. Własny zespół
            inżynieryjny. Własny serwis. Jeden adres, jedna
            odpowiedzialność — od projektu po piętnasty rok pracy
            urządzenia.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl">
            <img
              src={teamPhoto}
              alt="Zespół Soltimus przy salonie partnerskim Daikin w Garwolinie"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1920}
              height={1200}
            />
          </div>
          <div className="grid gap-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src={showroomMain}
                alt="Showroom Daikin Soltimus"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1200}
                height={900}
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src={engineerRoom}
                alt="Inżynier Soltimus w kotłowni technicznej"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1200}
                height={900}
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <MapPin className="h-4 w-4 text-[#F5B800]" />
            <div className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">
              Showroom
            </div>
            <div className="mt-1 text-base font-medium">{ADDRESS_LINE}</div>
          </div>
          <div>
            <Building2 className="h-4 w-4 text-[#F5B800]" />
            <div className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">
              Status
            </div>
            <div className="mt-1 text-base font-medium">
              Daikin Partner · Affiliated Service
            </div>
          </div>
          <div>
            <Phone className="h-4 w-4 text-[#F5B800]" />
            <div className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">
              Kontakt
            </div>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="mt-1 inline-block text-base font-medium hover:underline"
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REAL CASES
============================================================ */

const CASE_TILES = [
  {
    slug: "dom-2000-naprawa-instalacji-daikin",
    img: caseDaikinImg,
    tag: "Naprawa instalacji",
    title: "Spalona sprężarka — projekt od nowa",
    metric: "−58% kosztów ogrzewania",
  },
  {
    slug: "dom-nowy-hybryda-kominek-pompa-ciepla",
    img: caseHybridFireplaceImg,
    tag: "Hybryda",
    title: "Pompa ciepła + kominek z płaszczem wodnym",
    metric: "Backup termiczny · ECH2O",
  },
  {
    slug: "konstancin-rezydencja-350m2",
    img: caseKonstancinImg,
    tag: "Premium rezydencja",
    title: "Konstancin 350 m² — integracja systemów",
    metric: "Pompa · PV · magazyn energii",
  },
  {
    slug: "dom-lat-70-gleboka-termomodernizacja-pompa-ciepla",
    img: caseKostkaImg,
    tag: "Termomodernizacja",
    title: "Dom z lat 70. — głęboka modernizacja",
    metric: "Ze starego pieca na pompę ciepła",
  },
];

function RealCases() {
  return (
    <section className="bg-white px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Realizacje
            </div>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
              Domy, w których system działa{" "}
              <span className="italic font-light text-black/50">
                tak, jak miał działać.
              </span>
            </h2>
          </div>
          <Link
            to="/realizacje"
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium hover:bg-black/5"
          >
            Wszystkie realizacje
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CASE_TILES.map((c) => (
            <Link
              key={c.slug}
              to="/realizacje/$slug"
              params={{ slug: c.slug }}
              className="group relative block overflow-hidden rounded-3xl bg-black/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  loading="lazy"
                  width={1600}
                  height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
                  {c.tag}
                </div>
                <div className="mt-3 text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {c.title}
                </div>
                <div className="mt-2 text-sm text-white/70">{c.metric}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
============================================================ */

function FAQ() {
  return (
    <section className="bg-[#FBFAF6] px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Najczęstsze pytania inwestorów
        </div>
        <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
          To, co inwestorzy pytają pierwsze.
        </h2>

        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-black/10 bg-white px-7 py-6 transition-colors open:border-black/30"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6 text-base font-semibold tracking-tight md:text-lg">
                {f.q}
                <span className="mt-1 text-black/40 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-5 text-sm leading-relaxed text-black/65 md:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
============================================================ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0E0E10] text-white">
      <img
        src={houseWinterImg}
        alt="Nowoczesny dom o zmierzchu z pompą ciepła Daikin"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        loading="lazy"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,184,0,0.10),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-5 py-28 text-center md:px-10 md:py-40">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">
          Zacznijmy rozmowę
        </div>
        <h2 className="mt-6 text-[clamp(2.2rem,5.2vw,4.6rem)] font-semibold leading-[1.05] tracking-tight">
          Dobrze działająca pompa ciepła{" "}
          <span className="italic font-light text-white/55">
            zaczyna się od dobrego projektu.
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Jeden telefon, jedna rozmowa, jeden audyt — i wiemy, czy
          jesteśmy w stanie pomóc, jaki system będzie miał sens i co
          warto zrobić najpierw. Nie obiecujemy. Doradzamy.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-7 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
          >
            Umów konsultację
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white hover:bg-white/5"
          >
            Odwiedź showroom w Garwolinie
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
