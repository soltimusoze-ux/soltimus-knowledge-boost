import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wind,
  Droplets,
  Activity,
  Moon,
  Leaf,
  Gauge,
  Ruler,
  Volume2,
  Filter,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Building2,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

import heroImg from "@/assets/rekuperacja/rekuperacja-hero.jpg";
import sbsImg from "@/assets/rekuperacja/rekuperacja-sbs.jpg";
import diffuserImg from "@/assets/rekuperacja/rekuperacja-diffuser.jpg";
import unitImg from "@/assets/rekuperacja/rekuperacja-unit.jpg";
import bedroomImg from "@/assets/rekuperacja/rekuperacja-bedroom.jpg";
import showroomMain from "@/assets/showroom/showroom-daikin-main.jpg";
import engineerRoom from "@/assets/showroom/engineer-mechanical-room.jpg";

export const Route = createFileRoute("/oferta/rekuperacja")({
  head: () =>
    buildMeta({
      title:
        "Rekuperacja i jakość powietrza — projektowanie zdrowego domu | Soltimus",
      description:
        "Projektujemy systemy wentylacji mechanicznej z odzyskiem ciepła, które realnie poprawiają jakość powietrza, sen i komfort życia. Nie sprzedajemy rekuperatorów — projektujemy zdrowe domy.",
      path: "/oferta/rekuperacja",
      image: heroImg,
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          { name: "Rekuperacja", url: `${SITE.url}/oferta/rekuperacja` },
        ]),
      ],
    }),
  component: RekuperacjaPage,
});

/* Brand accents:
   - #2F4A55 — calm slate-teal "air" accent
   - #F5B800 — primary CTA (unchanged)
   - #FBFAF6 — warm off-white base
*/

function RekuperacjaPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="transparent" />
      <Hero />
      <WhyBadAir />
      <CaseSBS />
      <NotJustSavings />
      <CaseResigned />
      <HowGoodDesign />
      <HouseThatDoesntTire />
      <ShowroomTrust />
      <Process />
      <Realizations />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F1EEE7] text-[#0E0E10]">
      <div className="relative min-h-[92vh] w-full">
        <img
          src={heroImg}
          alt="Spokojny, jasny salon nowoczesnego domu wypełniony świeżym powietrzem i naturalnym światłem"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/55 to-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_85%,rgba(47,74,85,0.10),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-40 md:px-10 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#2F4A55]"
          >
            <span className="inline-block h-px w-8 bg-[#2F4A55]" />
            Air Architecture · Zdrowe powietrze w domu
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-7 max-w-5xl text-[clamp(2.2rem,5.8vw,5.2rem)] font-semibold leading-[1.02] tracking-tight text-[#1A1F22]"
          >
            W nowoczesnym domu najważniejsze nie jest ogrzewanie.{" "}
            <span className="italic font-light text-[#2F4A55]">
              Tylko jakość powietrza.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-black/65 md:text-xl"
          >
            Projektujemy systemy wentylacji, które poprawiają komfort życia,
            jakość snu i zdrowie domowników — przez cały rok. Cicho, niewidocznie,
            w tle codzienności.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-7 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Porozmawiaj o swoim domu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-4 text-sm font-medium text-black hover:bg-black/5"
            >
              Zobacz realizacje
            </Link>
          </motion.div>

          {/* Hero principles strip */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 backdrop-blur md:grid-cols-4">
            {[
              { k: "CO₂", v: "pod kontrolą 24/7" },
              { k: "40–60%", v: "stabilna wilgotność" },
              { k: "PM2.5", v: "skuteczna filtracja" },
              { k: "0 okien", v: "wietrzonych zimą" },
            ].map((s) => (
              <div key={s.v} className="bg-white/85 px-6 py-5 backdrop-blur">
                <div className="text-2xl font-semibold tracking-tight text-[#1A1F22] md:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-black/50">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Dlaczego źle się oddycha w nowych domach                */
/* ------------------------------------------------------------------ */

function WhyBadAir() {
  const points = [
    {
      icon: Building2,
      tag: "Szczelność",
      title: "Nowy dom jest szczelniejszy niż uważasz.",
      body: "Współczesne okna i izolacje sprawiają, że budynek praktycznie nie oddycha. To dobre dla rachunku za ogrzewanie — i złe dla powietrza, którym oddychasz.",
    },
    {
      icon: Activity,
      tag: "CO₂",
      title: "1400–2000 ppm w sypialni nad ranem.",
      body: "Stężenie dwutlenku węgla rośnie przez całą noc. Efekt: ciężki sen, ból głowy, brak koncentracji rano. Najczęstsza, najmniej rozpoznana przyczyna zmęczenia.",
    },
    {
      icon: Droplets,
      tag: "Wilgotność",
      title: "Para wodna nie ma którędy uciec.",
      body: "Gotowanie, prysznic, oddech. W szczelnym domu wilgoć osiada na ościeżach okien i w narożnikach. Z czasem — pleśń, której nie widać od razu.",
    },
    {
      icon: HeartPulse,
      tag: "Smog i alergeny",
      title: "Otwarte okno wpuszcza wszystko.",
      body: "PM2.5, pyłki, kurz, spaliny sąsiada. „Wietrzenie” w polskich realiach to często wymiana jednego problemu na inny.",
    },
  ];

  return (
    <section className="border-y border-black/5 bg-[#FBFAF6] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
              Fizjologia budynku
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Nowoczesny dom może wyglądać świetnie — i jednocześnie{" "}
              <span className="italic font-light text-black/55">
                źle wpływać na samopoczucie.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-black/65">
              Nie chodzi o straszenie. Chodzi o świadomy projekt. Powietrze,
              którym oddychamy przez 16 godzin dziennie, decyduje o komforcie
              tak samo jak temperatura czy światło.
            </p>
            <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
                Nasza obserwacja
              </div>
              <p className="mt-3 text-base leading-relaxed text-black/80">
                W większości domów, które audytujemy,{" "}
                <strong>powietrze jest gorsze niż na ruchliwej ulicy</strong> —
                tylko nikt tego nie mierzy.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-2">
              {points.map((p) => (
                <article
                  key={p.tag}
                  className="bg-white p-7 transition-colors hover:bg-[#FBFAF6] md:p-9"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2F4A55]/10 text-[#2F4A55]">
                      <p.icon className="h-4 w-4" />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
                      {p.tag}
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/65">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CASE STUDY — Sick Building Syndrome                                */
/* ------------------------------------------------------------------ */

function CaseSBS() {
  return (
    <section className="bg-white px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-black/10">
              <img
                src={sbsImg}
                alt="Skroplona para wodna na ramie okna w szczelnym, źle wentylowanym domu"
                className="h-auto w-full"
                width={1600}
                height={1100}
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-start gap-3 text-[11px] uppercase tracking-[0.25em] text-black/45">
              <Stethoscope className="h-3.5 w-3.5 text-[#2F4A55]" />
              Case study · Sick Building Syndrome
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
              Historia z audytu
            </div>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-tight">
              Problemem nie zawsze jest ogrzewanie.{" "}
              <span className="italic font-light text-black/55">
                Czasem problemem jest powietrze.
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
              Dom z lat 90. po głębokiej termomodernizacji. Nowe okna, dodatkowa
              izolacja, świeże tynki. Komfort cieplny — wzorowy. Po kilku
              miesiącach pojawiły się przewlekłe katary, problemy ze snem,
              skropliny w narożnikach sypialni i zapach „starego powietrza”
              w łazience.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
              <div className="bg-[#FBFAF6] p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
                  Przed
                </div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>· CO₂ w sypialni: 1850 ppm rano</li>
                  <li>· Wilgotność: 68% w łazience po nocy</li>
                  <li>· Pleśń w 2 narożnikach</li>
                  <li>· Codzienne wietrzenie ręczne</li>
                </ul>
              </div>
              <div className="bg-white p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
                  Po projekcie wentylacji
                </div>
                <ul className="mt-3 space-y-2 text-sm font-medium text-[#1A1F22]">
                  <li>· CO₂: stabilne 600–800 ppm</li>
                  <li>· Wilgotność: 45–55% w całym domu</li>
                  <li>· Powietrze filtrowane PM2.5</li>
                  <li>· Sen głębszy, brak skroplin</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-black/55">
              To nie marketing. To efekt sześciu tygodni od audytu do
              uruchomienia centrali z balansowaniem przepływów. Najtańszy element
              tej inwestycji — komfort, który wraca każdego ranka.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Rekuperacja to nie tylko oszczędności                    */
/* ------------------------------------------------------------------ */

function NotJustSavings() {
  const real = [
    { icon: Moon, t: "Głębszy sen", d: "Stabilne CO₂ w nocy = mniej wybudzeń, lżejszy poranek." },
    { icon: Wind, t: "Świeże powietrze 24/7", d: "Zawsze, bez otwierania okien — także zimą i przy smogu." },
    { icon: Droplets, t: "Wilgotność 40–60%", d: "Bez skroplin, bez pleśni, bez wysuszania błon śluzowych." },
    { icon: Filter, t: "Filtracja PM2.5", d: "Mniej kurzu, pyłków i alergenów wewnątrz domu." },
    { icon: HeartPulse, t: "Lepsza koncentracja", d: "Praca z domu bez „mgły” popołudniowej." },
    { icon: Leaf, t: "Mniej zapachów", d: "Kuchnia, łazienka, garaż — bez śladu w salonie." },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1A1F22] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(120,160,175,0.10),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              Pozycjonowanie
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.8rem)] font-semibold leading-[1.05] tracking-tight">
              Rekuperacja to{" "}
              <span className="italic font-light text-white/55">
                nie tylko oszczędności.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/65 lg:col-span-5">
            Odzysk ciepła jest miłym dodatkiem. Prawdziwa wartość mieszka gdzie
            indziej — w tym, jak czujesz się w swoim domu każdego dnia przez
            kolejne dwadzieścia lat.
          </p>
        </div>

        {/* Quote */}
        <figure className="mt-16 max-w-4xl border-l-2 border-[#F5B800]/70 pl-8">
          <blockquote className="text-[clamp(1.4rem,2.6vw,2.1rem)] font-light leading-[1.3] tracking-tight text-white/90">
            „Klienci często pytają: <em>po ilu latach się zwróci?</em>
            <br />
            Znacznie rzadziej: <em>jak będzie się żyło w tym domu przez następne
            20 lat?</em>”
          </blockquote>
          <figcaption className="mt-5 text-[11px] uppercase tracking-[0.3em] text-white/45">
            Notatka z konsultacji — Soltimus
          </figcaption>
        </figure>

        {/* Real benefits grid */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {real.map((r) => (
            <article
              key={r.t}
              className="group flex flex-col gap-4 bg-[#1A1F22] p-7 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/85 transition-transform group-hover:scale-110">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">{r.t}</h3>
              <p className="text-sm leading-relaxed text-white/60">{r.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CASE STUDY — Klient zrezygnował z rekuperacji                      */
/* ------------------------------------------------------------------ */

function CaseResigned() {
  return (
    <section className="bg-[#FBFAF6] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6 lg:order-2">
            <div className="overflow-hidden rounded-3xl border border-black/10">
              <img
                src={diffuserImg}
                alt="Anemostat sufitowy w nowoczesnym, czystym wnętrzu — element niewidocznej infrastruktury powietrza"
                className="h-auto w-full"
                width={1600}
                height={1100}
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-start gap-3 text-[11px] uppercase tracking-[0.25em] text-black/45">
              <Building2 className="h-3.5 w-3.5 text-[#2F4A55]" />
              Case study · Dom zaprojektowany bez rekuperacji
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
              Szczera historia
            </div>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-tight">
              Najdroższa instalacja to często ta,{" "}
              <span className="italic font-light text-black/55">
                której zabrakło na etapie budowy.
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
              Nowy dom, świetna architektura, pompa ciepła. Rekuperacja
              wypadła z budżetu — „przecież da się przewietrzyć przez okno”.
              Po pierwszej zimie pojawiły się skropliny, ciężkie poranki
              i pytania, dlaczego dom „nie oddycha”.
            </p>
            <p className="mt-5 text-base leading-relaxed text-black/70">
              Wdrożyliśmy system wentylacji <strong>zdecentralizowanej</strong> —
              jednostki ścienne w sypialniach i salonie. Działa. Poprawiła
              komfort. Ale uczciwie:
            </p>

            <div className="mt-8 rounded-2xl border border-[#2F4A55]/15 bg-white p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-[#2F4A55]" />
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
                  Mówimy wprost
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed text-black/80">
                Wentylacja zdecentralizowana <strong>nie zastąpi</strong> dobrze
                zaprojektowanej rekuperacji centralnej. Daje 60–70% efektu —
                kosztem 2–3× wyższej ceny jednostkowej za m³ powietrza i mniej
                eleganckiej integracji architektonicznej.
              </p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-black/55">
              Dlatego o powietrzu rozmawiamy <em>przed</em> wylewką, nie po niej.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Jak wygląda dobrze zaprojektowana wentylacja             */
/* ------------------------------------------------------------------ */

function HowGoodDesign() {
  const principles = [
    {
      icon: Ruler,
      t: "Bilans przepływów",
      d: "Każde pomieszczenie ma policzoną krotność wymian. Salon, sypialnie i gabinet — nawiew. Kuchnia, łazienki, garderoba — wywiew.",
    },
    {
      icon: Volume2,
      t: "Cisza poniżej 25 dB",
      d: "Dobrane średnice kanałów, tłumiki, separacja akustyczna. System ma znikać — nie szumieć w sypialni.",
    },
    {
      icon: Filter,
      t: "Filtracja zaplanowana",
      d: "Filtry F7/ePM1 jako standard. HEPA tam, gdzie ma sens. Harmonogram wymian wpisany w projekt, nie improwizowany.",
    },
    {
      icon: Droplets,
      t: "Sterowanie wilgotnością",
      d: "Czujniki CO₂ i RH, automatyczne tryby, integracja z systemem grzewczym i chłodzeniem. Powietrze reaguje na życie domu.",
    },
    {
      icon: Gauge,
      t: "Komisjoning i pomiar",
      d: "Po montażu — pomiar wydajności anemometrem na każdym anemostacie. Bez tego krok = instalacja, nie system.",
    },
    {
      icon: Sparkles,
      t: "Koordynacja architektoniczna",
      d: "Trasy kanałów ukryte w stropach i zabudowach. Anemostaty dopasowane do projektu wnętrz. Niewidoczna inżynieria.",
    },
  ];

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
              Inżynieria
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Jak wygląda dobrze zaprojektowana{" "}
              <span className="italic font-light text-black/55">wentylacja.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-black/65 lg:col-span-5">
            Większość problemów z rekuperacją nie wynika z urządzenia. Wynika
            z projektu, którego zabrakło. Sześć rzeczy, które decydują, czy
            system będzie pomagał — czy przeszkadzał.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <article
              key={p.t}
              className="group flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-[#FBFAF6]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F4A55]/10 text-[#2F4A55] transition-transform group-hover:scale-110">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">{p.t}</h3>
              <p className="text-sm leading-relaxed text-black/65">{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Dom, który nie męczy                                     */
/* ------------------------------------------------------------------ */

function HouseThatDoesntTire() {
  const lines = [
    "Budzisz się bez ciężkiej głowy.",
    "Zimą nie otwierasz okien — i tak jest świeżo.",
    "Para po prysznicu znika sama, bez śladu na lustrze za pół godziny.",
    "Zapachy z kuchni nie wędrują do sypialni.",
    "Wieczorem powietrze nie jest „gęste” — choć w salonie siedzi sześć osób.",
    "Centrala pracuje cicho na poddaszu i nie pamiętasz, kiedy ostatnio o niej myślałeś.",
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[60vh] lg:min-h-[90vh]">
          <img
            src={bedroomImg}
            alt="Spokojna, jasna sypialnia o poranku — świeże powietrze i głęboki sen jako efekt dobrej wentylacji"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={1100}
            loading="lazy"
          />
        </div>

        <div className="flex items-center bg-[#FBFAF6] px-6 py-20 md:px-16 md:py-28">
          <div className="max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
              Codzienność, której nie zauważasz
            </div>
            <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
              Dom, który{" "}
              <span className="italic font-light text-black/55">nie męczy.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/65 md:text-lg">
              Najlepsze systemy wentylacji rozpoznaje się po jednym — przestaje
              się o nich myśleć. Świeże powietrze, równa temperatura, cisza.
            </p>

            <ul className="mt-10 space-y-4">
              {lines.map((l) => (
                <li key={l} className="flex items-start gap-3 text-base text-black/75">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2F4A55]" />
                  <span className="leading-relaxed">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Showroom / Trust                                         */
/* ------------------------------------------------------------------ */

function ShowroomTrust() {
  return (
    <section className="bg-[#0E0E10] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">
              Soltimus · Showroom Garwolin
            </div>
            <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
              Powietrza nie widać.{" "}
              <span className="italic font-light text-white/55">
                Dlatego projekt musi być przemyślany.
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
              W naszym salonie pokazujemy działające centrale, układy
              filtracyjne i sterowanie — żebyś zobaczył, jak system zachowuje
              się w realnym domu, a nie w PDF-ie producenta.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                { k: "10+", v: "lat doświadczenia" },
                { k: "260+", v: "opinii Google" },
                { k: "OZC", v: "audyt energetyczny" },
                { k: "24h", v: "serwis pogwarancyjny" },
              ].map((s) => (
                <div key={s.v} className="bg-[#0E0E10] px-5 py-4">
                  <div className="text-xl font-semibold tracking-tight">
                    {s.k}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={unitImg}
                  alt="Centrala wentylacyjna z odzyskiem ciepła zamontowana w pomieszczeniu technicznym domu"
                  className="h-auto w-full"
                  width={1600}
                  height={1100}
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={engineerRoom}
                  alt="Inżynier Soltimus przy pomieszczeniu technicznym"
                  className="h-full w-full object-cover"
                  width={900}
                  height={900}
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={showroomMain}
                  alt="Showroom Soltimus — Salon Partnerski Daikin w Garwolinie"
                  className="h-full w-full object-cover"
                  width={900}
                  height={900}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Process                                                  */
/* ------------------------------------------------------------------ */

function Process() {
  const steps = [
    {
      n: "01",
      t: "Analiza i audyt",
      d: "Pomiar geometrii, profilu życia, krotności wymian dla każdego pomieszczenia. Rozmowa o tym, jak realnie używasz domu.",
    },
    {
      n: "02",
      t: "Projekt techniczny",
      d: "Dobór centrali, trasy kanałów, lokalizacje anemostatów, koordynacja z architekturą wnętrz i innymi instalacjami.",
    },
    {
      n: "03",
      t: "Montaż",
      d: "Własna ekipa techniczna. Bez podwykonawców-przypadków. Trasy szczelne, izolowane akustycznie, dokumentowane fotograficznie.",
    },
    {
      n: "04",
      t: "Balansowanie i pomiar",
      d: "Anemometr, regulacja każdego anemostatu pod projektowane przepływy. Protokół pomiarowy w dokumentacji.",
    },
    {
      n: "05",
      t: "Komisjoning i instruktaż",
      d: "Tryby sezonowe, harmonogramy, integracja z pompą ciepła. Pokazujemy, co robić raz w roku — i czego nie ruszać.",
    },
    {
      n: "06",
      t: "Serwis i diagnostyka",
      d: "Przeglądy, wymiana filtrów, czyszczenie wymiennika, kontrola wydajności. Powietrze utrzymuje się tak dobre, jak serwis za nim stoi.",
    },
  ];

  return (
    <section className="border-y border-black/5 bg-[#FBFAF6] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
              Proces
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Sześć kroków od pomysłu do{" "}
              <span className="italic font-light text-black/55">
                dobrze oddychającego domu.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-black/65 lg:col-span-5">
            Źle zaprojektowana rekuperacja generuje hałas, nierówne przepływy
            i frustrację. Dlatego nie skracamy procesu — i nie pomijamy
            balansowania.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <article
              key={s.n}
              className="bg-white p-8 transition-colors hover:bg-[#FBFAF6]"
            >
              <div className="text-xs font-medium tabular-nums text-[#2F4A55]">
                {s.n}
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                {s.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                {s.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Realizations                                             */
/* ------------------------------------------------------------------ */

function Realizations() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F4A55]">
              Realizacje
            </div>
            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
              Domy, w których powietrze projektowaliśmy razem z architekturą.
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

        <div className="mt-12 rounded-3xl border border-black/10 bg-[#FBFAF6] p-10 text-center md:p-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
            Wkrótce
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-black/65">
            Publikujemy dedykowane case studies wentylacyjne wraz z pomiarami
            CO₂, RH i wydajności anemostatów. Jeśli planujesz projekt teraz —
            możemy przeprowadzić Cię przez nasze archiwum w trakcie konsultacji.
          </p>
          <Link
            to="/kontakt"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/85"
          >
            Umów konsultację
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FINAL CTA                                                          */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#1A1F22] px-5 py-28 text-white md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,160,175,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">
          Zacznijmy rozmowę
        </div>
        <h2 className="mt-6 text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1.05] tracking-tight">
          Dobre powietrze zmienia codzienne życie bardziej,{" "}
          <span className="italic font-light text-white/55">
            niż większość inwestorów zakłada.
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
          Nie sprzedajemy rekuperatorów. Projektujemy zdrowe, ciche, dobrze
          oddychające domy. Jeden telefon — i wiemy, czy jesteśmy w stanie
          pomóc.
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
          </Link>
        </div>
      </div>
    </section>
  );
}
