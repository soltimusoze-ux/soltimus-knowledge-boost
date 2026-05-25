import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Battery,
  BrainCircuit,
  CloudSun,
  Gauge,
  LineChart,
  ShieldCheck,
  Sparkles,
  Sun,
  Cpu,
  PlugZap,
  Activity,
  Settings2,
  Network,
  Home as HomeIcon,
  Phone,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { COMPANY } from "@/lib/company";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";
import { getCase } from "@/content/case-studies";

import heroImg from "@/assets/energia/energia-hero.jpg";
import batteryImg from "@/assets/energia/energia-battery.jpg";
import switchboardImg from "@/assets/energia/energia-switchboard.jpg";
import appImg from "@/assets/energia/energia-app.jpg";
import aiImg from "@/assets/energia/energia-ai.jpg";
import showroomMain from "@/assets/showroom/showroom-daikin-main.jpg";
import showroomWall from "@/assets/showroom/showroom-equipment-wall.jpg";
import engineerRoom from "@/assets/showroom/engineer-mechanical-room.jpg";

export const Route = createFileRoute("/oferta/energia")({
  head: () =>
    buildMeta({
      title: "Inteligentne systemy energii — magazyn, AI, backup, taryfa dynamiczna",
      description:
        "Projektujemy nowoczesną infrastrukturę energetyczną domu: fotowoltaika, magazyn Sigenergy, zarządzanie AI, backup zasilania i taryfa dynamiczna PSTRYK — jako jeden inteligentny system.",
      path: "/oferta/energia",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          { name: "Energia", url: `${SITE.url}/oferta/energia` },
        ]),
      ],
    }),
  component: EnergiaPage,
});

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative min-h-[92vh] w-full">
        <img
          src={heroImg}
          alt="Nowoczesny dom z magazynem energii Sigenergy o zmierzchu"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(245,184,0,0.12),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-40 md:px-10 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#F5B800]"
          >
            <span className="inline-block h-px w-8 bg-[#F5B800]" />
            Infrastruktura energetyczna domu
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-7 max-w-5xl text-[clamp(2.4rem,6.5vw,5.6rem)] font-semibold leading-[0.98] tracking-tight"
          >
            Dom, który sam zarządza{" "}
            <span className="italic font-light text-white/70">energią</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Projektujemy inteligentne systemy energii, które w czasie rzeczywistym
            analizują produkcję, zużycie, taryfy i magazynowanie — automatycznie
            optymalizując koszty i bezpieczeństwo energetyczne domu.
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
              Zaprojektuj swój system
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white hover:bg-white/5"
            >
              Zobacz realizacje
            </Link>
          </motion.div>

          {/* Hero stat strip */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:grid-cols-4">
            {[
              { k: "78%", v: "autokonsumpcji" },
              { k: "24/7", v: "monitoring systemu" },
              { k: "5–48 kWh", v: "magazyn Sigenergy" },
              { k: "1 app", v: "PV · bateria · EV · HP" },
            ].map((s) => (
              <div key={s.v} className="bg-black/40 px-6 py-5">
                <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/50">
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
/*  SECTION — Fotowoltaika 1.0 się skończyła                           */
/* ------------------------------------------------------------------ */

function PVEraEnded() {
  const points = [
    {
      tag: "Net-billing",
      title: "Sprzedaż nadwyżek już się nie opłaca.",
      body: "Cena odkupu nadwyżek jest niska i zmienna. Wartość energii powstaje wtedy, gdy zużywasz ją sam — nie wtedy, gdy ją oddajesz.",
    },
    {
      tag: "Taryfa dynamiczna",
      title: "Cena prądu zmienia się co godzinę.",
      body: "Wieczorne szczyty potrafią być 5–10× droższe niż doliny w nocy. Dom bez automatyki płaci zawsze najwięcej.",
    },
    {
      tag: "Sieć",
      title: "Falowniki wyłączają się w słoneczne dni.",
      body: "Przeciążona sieć NN powoduje wyłączenia produkcji. Bez magazynu — tracisz tę energię bezpowrotnie.",
    },
    {
      tag: "Zużycie",
      title: "Pompa ciepła i EV zmieniły profil domu.",
      body: "Główne zużycie przesunęło się na wieczór i noc. Same panele nie pokryją już realnych potrzeb nowoczesnego budynku.",
    },
  ];

  return (
    <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
              Nowa generacja energii w domu
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Same panele już nie wystarczą.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-black/65">
              Fotowoltaika 1.0 — „im więcej kWp, tym lepiej” — należy do
              poprzedniej dekady. Nowoczesny system energii musi{" "}
              <em>myśleć</em>, <em>przewidywać</em> i <em>reagować</em>.
            </p>
            <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
                Nasza teza
              </div>
              <p className="mt-3 text-base leading-relaxed text-black/80">
                Wartość nie leży już w panelach. Leży w{" "}
                <strong>magazynie energii</strong> i{" "}
                <strong>inteligencji, która nim zarządza</strong>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-2">
              {points.map((p) => (
                <article
                  key={p.tag}
                  className="bg-white p-7 transition-colors hover:bg-[#FAFAF7] md:p-9"
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#B98A00]">
                    {p.tag}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
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
/*  SECTION — AI Energy Management                                     */
/* ------------------------------------------------------------------ */

function AIManagement() {
  const cards = [
    {
      icon: CloudSun,
      title: "Prognozowanie produkcji",
      body: "System analizuje prognozę pogody i historyczne dane uzysku, by przewidzieć produkcję PV na kolejne 24–72 h.",
    },
    {
      icon: LineChart,
      title: "Zarządzanie taryfami dynamicznymi",
      body: "Czyta ceny godzinowe z giełdy i planuje pracę magazynu oraz odbiorników w oknach najtańszej energii.",
    },
    {
      icon: Battery,
      title: "Inteligentne ładowanie baterii",
      body: "Magazyn ładuje się tylko wtedy, gdy ma to sens ekonomicznie i zostawia rezerwę na wieczorny szczyt.",
    },
    {
      icon: Activity,
      title: "Optymalizacja autokonsumpcji",
      body: "Pompa ciepła, CWU, ładowarka EV i magazyn synchronizują się tak, by zużyć maksimum własnej energii.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0B0B0E] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(96,165,250,0.10),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">
              AI Energy Management
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.8rem)] font-semibold leading-[1.05] tracking-tight">
              System, który podejmuje{" "}
              <span className="italic font-light text-white/60">
                tysiące decyzji
              </span>{" "}
              za Ciebie.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/65 lg:col-span-5">
            Każdej godziny system analizuje produkcję, zużycie, ceny giełdowe i
            prognozy. Magazyn ładuje się, gdy energia jest tania. Dom korzysta z
            niej, gdy jest droga. Wszystko bez Twojego udziału.
          </p>
        </div>

        {/* Dashboard visual */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
              <img
                src={aiImg}
                alt="Wizualizacja AI: ceny dynamiczne, prognoza produkcji PV i stan magazynu"
                className="h-auto w-full opacity-90"
                width={1600}
                height={1000}
                loading="lazy"
              />
              <div className="border-t border-white/10 px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-white/40">
                Decyzyjna warstwa systemu · podgląd analityczny
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:col-span-5">
            {[
              { k: "−38%", v: "rachunku po wpięciu w taryfę dynamiczną" },
              { k: "0 s", v: "czas reakcji magazynu na zmianę ceny" },
              { k: "72 h", v: "horyzont prognozy produkcji i zużycia" },
            ].map((s) => (
              <div
                key={s.v}
                className="flex items-baseline gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {s.k}
                </div>
                <div className="text-sm leading-snug text-white/65">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Capability cards */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col gap-4 bg-[#0B0B0E] p-7 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5B800]/15 text-[#F5B800] transition-transform group-hover:scale-110">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Backup energetyczny                                      */
/* ------------------------------------------------------------------ */

function Backup() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
              Bezpieczeństwo energetyczne
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Światło{" "}
              <span className="italic font-light text-black/55">
                działa dalej.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/65">
              Przerwa w dostawie prądu nie zatrzymuje domu. Magazyn energii w
              trybie wyspowym automatycznie przejmuje zasilanie wybranych
              obwodów — w czasie krótszym niż sekunda.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  t: "Obwody krytyczne",
                  d: "Pompa ciepła, lodówka, serwerownia, oświetlenie, internet — wszystko zaprojektowane jako gwarantowane.",
                },
                {
                  icon: PlugZap,
                  t: "Przełączenie automatyczne",
                  d: "Reakcja w ms. Bez ręcznych przełączników, bez utraty pracy w sieci domowej.",
                },
                {
                  icon: Sun,
                  t: "Ładowanie z PV w trybie wyspowym",
                  d: "Jeśli świeci słońce — magazyn doładowuje się również podczas awarii sieci.",
                },
              ].map((b) => (
                <div key={b.t} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-black/5">
                    <b.icon className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold tracking-tight">
                      {b.t}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-black/60">
                      {b.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-5 sm:grid-rows-2">
              <div className="relative overflow-hidden rounded-3xl bg-black sm:col-span-3 sm:row-span-2">
                <img
                  src={batteryImg}
                  alt="Modułowy magazyn energii Sigenergy"
                  className="h-full w-full object-cover"
                  width={1600}
                  height={1200}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                    Magazyn energii
                  </div>
                  <div className="mt-1 text-lg font-medium text-white">
                    Sigenergy SigenStor · 5–48 kWh
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-black sm:col-span-2">
                <img
                  src={switchboardImg}
                  alt="Rozdzielnia z wydzielonymi obwodami backup"
                  className="h-full w-full object-cover"
                  width={1600}
                  height={1200}
                  loading="lazy"
                />
              </div>
              <div className="rounded-3xl border border-black/10 bg-[#FAFAF7] p-6 sm:col-span-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
                  Przepływ backup
                </div>
                <div className="mt-4 space-y-2 text-sm text-black/75">
                  <div className="flex items-center justify-between border-b border-black/5 pb-2">
                    <span>Sieć</span>
                    <span className="text-black/40">offline</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-2">
                    <span>Magazyn</span>
                    <span className="font-medium text-black">aktywny</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Obwody krytyczne</span>
                    <span className="font-medium text-[#B98A00]">zasilone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Jedna aplikacja                                          */
/* ------------------------------------------------------------------ */

function OneApp() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0E] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">
              Interfejs systemu
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Jedna aplikacja.{" "}
              <span className="italic font-light text-white/60">
                Pełna kontrola.
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
              Nowoczesna energia potrzebuje nowoczesnego interfejsu. Z poziomu
              jednej aplikacji widzisz wszystko — i zmieniasz nic, bo system
              robi to sam.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                { i: Sun, t: "Produkcja PV", d: "live + historia" },
                { i: Battery, t: "Stan magazynu", d: "kWh + SoC" },
                { i: HomeIcon, t: "Zużycie domu", d: "obwody + urządzenia" },
                { i: Network, t: "Sieć / EV", d: "import · eksport · ładowanie" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="flex items-center gap-3 bg-[#0B0B0E] p-5"
                >
                  <x.i className="h-4 w-4 text-[#F5B800]" />
                  <div>
                    <div className="text-sm font-medium">{x.t}</div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                      {x.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-tr from-[#F5B800]/10 via-transparent to-blue-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-black">
                <img
                  src={appImg}
                  alt="mySigen — Sankey produkcji, magazynu i zużycia"
                  className="h-auto w-full"
                  width={1400}
                  height={1600}
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
/*  SECTION — Co realnie zyskujesz                                     */
/* ------------------------------------------------------------------ */

function RealOutcomes() {
  const items = [
    {
      tag: "Taryfa dynamiczna",
      p: "Ceny prądu zmieniają się 24 razy na dobę.",
      s: "System ładuje magazyn w godzinach najtańszych i zużywa go w szczycie.",
      e: "Realnie 20–40% mniejszy rachunek roczny.",
    },
    {
      tag: "Niezależność energetyczna",
      p: "Dom oddaje nadwyżki do sieci po niskiej cenie.",
      s: "Magazyn + AI zatrzymują energię u Ciebie zamiast w sieci.",
      e: "Autokonsumpcja 70–90% zamiast 25–35%.",
    },
    {
      tag: "Backup zasilania",
      p: "Awarie sieci wyłączają pompę ciepła, internet, lodówkę.",
      s: "Obwody krytyczne przepinają się na magazyn w ms.",
      e: "Dom działa dalej — bez agregatu, bez ręcznej obsługi.",
    },
    {
      tag: "Zarządzanie AI",
      p: "Ręczne sterowanie taryfą jest niewykonalne.",
      s: "System sam analizuje pogodę, ceny i zużycie 24/7.",
      e: "Optymalizacja bez Twojej uwagi — działa w tle.",
    },
    {
      tag: "Zintegrowany ekosystem",
      p: "PV, bateria, pompa ciepła i EV bywają „osobnymi światami”.",
      s: "Projektujemy je jako jeden system z jedną logiką sterowania.",
      e: "Jedna aplikacja, jedna odpowiedzialność, jeden serwis.",
    },
    {
      tag: "Długoterminowe koszty",
      p: "Tania instalacja często znaczy drogi dom przez 15 lat.",
      s: "Komponenty Tier-1, magazyn LFP, projekt pod skalowanie.",
      e: "Niższe TCO przez cały cykl życia systemu.",
    },
  ];

  return (
    <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
            Co realnie zyskujesz
          </div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Problem. Rozwiązanie. Efekt.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-black/65">
            Każda decyzja inżynierska w systemie ma konkretny powód i konkretny
            rezultat w Twoim domu.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.tag}
              className="flex flex-col gap-5 bg-white p-8 transition-colors hover:bg-[#FAFAF7]"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#B98A00]">
                {it.tag}
              </div>
              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-black/40">
                    Problem
                  </div>
                  <div className="mt-1 text-black/75">{it.p}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-black/40">
                    Rozwiązanie
                  </div>
                  <div className="mt-1 text-black/75">{it.s}</div>
                </div>
                <div className="border-t border-black/10 pt-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-black/40">
                    Efekt
                  </div>
                  <div className="mt-1 font-medium text-black">{it.e}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Jak projektujemy                                         */
/* ------------------------------------------------------------------ */

function HowWeDesign() {
  const steps = [
    {
      n: "01",
      t: "Audyt profilu energetycznego",
      d: "Analizujemy realne zużycie godzinowe, sezonowość, urządzenia, taryfę.",
    },
    {
      n: "02",
      t: "Analiza budynku",
      d: "Pompa ciepła, CWU, wentylacja, EV — integracja na poziomie sterowania.",
    },
    {
      n: "03",
      t: "Dobór magazynu i PV",
      d: "Pojemność magazynu pod profil, nie pod metr dachu. PV pod autokonsumpcję.",
    },
    {
      n: "04",
      t: "Architektura backup",
      d: "Wybór obwodów gwarantowanych, projekt rozdzielni, logika przełączeń.",
    },
    {
      n: "05",
      t: "Konfiguracja AI",
      d: "Strategie ładowania, integracja z taryfą dynamiczną, scenariusze.",
    },
    {
      n: "06",
      t: "Monitoring i skalowanie",
      d: "Po uruchomieniu system uczy się domu. Magazyn można rozbudować w czasie.",
    },
  ];

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
              Proces inżynierski
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Każdy dom ma{" "}
              <span className="italic font-light text-black/55">
                inny profil energetyczny.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/65">
              Nie sprzedajemy paneli z katalogu. Projektujemy infrastrukturę
              energetyczną pod konkretny budynek, profil zużycia i plany
              właściciela na najbliższą dekadę.
            </p>
            <div className="mt-10 rounded-2xl border border-black/10 bg-[#FAFAF7] p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-black/45">
                <Sparkles className="h-3 w-3 text-[#F5B800]" />
                Pozycja Soltimus
              </div>
              <p className="mt-3 text-base leading-relaxed text-black/80">
                Doradca inżynierski. Nie instalator z katalogu.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-2">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="group flex flex-col gap-4 bg-white p-7 transition-colors hover:bg-[#FAFAF7]"
                >
                  <div className="flex items-center justify-between">
                    <Settings2 className="h-4 w-4 text-black/45" />
                    <span className="text-xs font-medium text-black/40">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {s.t}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/60">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Case studies                                             */
/* ------------------------------------------------------------------ */

function CaseStudies() {
  const slugs = [
    "stacja-paliw-ciaglosc-zasilania-sigenergy",
    "konstancin-rezydencja-350m2",
    "dom-nowy-hybryda-kominek-pompa-ciepla",
  ];
  const cases = slugs.map(getCase).filter(Boolean);

  if (!cases.length) return null;

  return (
    <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
              Realizacje
            </div>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              Inteligentna energia — w praktyce.
            </h2>
          </div>
          <Link
            to="/realizacje"
            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-[#B98A00]"
          >
            Wszystkie realizacje
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c!.slug}
              to="/realizacje/$slug"
              params={{ slug: c!.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition-colors hover:bg-white"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                {c!.heroImage && (
                  <img
                    src={c!.heroImage}
                    alt={c!.heroImageAlt ?? c!.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-7">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-black/45">
                  <MapPin className="h-3 w-3 text-[#F5B800]" />
                  {c!.location.city}
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">
                  {c!.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-black/60">
                  {c!.excerpt}
                </p>
                <div className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-black">
                  Zobacz case study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Showroom                                                 */
/* ------------------------------------------------------------------ */

function Showroom() {
  return (
    <section className="bg-[#0B0B0E] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">
              Showroom i centrum projektowe
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Technologię można zobaczyć{" "}
              <span className="italic font-light text-white/55">na żywo.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/65 lg:col-span-5">
            Projektujemy, konfigurujemy i serwisujemy systemy energii we własnym
            centrum projektowym — w salonie partnerskim Daikin w Garwolinie.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6 md:grid-rows-2">
          <div className="relative overflow-hidden rounded-3xl md:col-span-4 md:row-span-2">
            <img
              src={showroomMain}
              alt="Showroom Soltimus — strefa konsultacji"
              className="h-full w-full object-cover"
              width={1600}
              height={1200}
              loading="lazy"
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl md:col-span-2">
            <img
              src={showroomWall}
              alt="Ściana technologiczna z pompami ciepła i magazynami energii"
              className="h-full w-full object-cover"
              width={1200}
              height={900}
              loading="lazy"
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl md:col-span-2">
            <img
              src={engineerRoom}
              alt="Inżynier Soltimus w kotłowni klienta"
              className="h-full w-full object-cover"
              width={1200}
              height={900}
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { i: BrainCircuit, t: "Centrum projektowe", d: "Doborowe analizy energetyczne, symulacje, projekty." },
            { i: Cpu, t: "Salon partnerski Daikin", d: "Pełne portfolio pomp ciepła i systemów HVAC." },
            { i: ShieldCheck, t: "Autoryzowany serwis", d: "Fabryczna obsługa Daikin · Sigenergy · falowniki." },
          ].map((x) => (
            <div
              key={x.t}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <x.i className="mt-0.5 h-5 w-5 text-[#F5B800]" />
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  {x.t}
                </div>
                <div className="mt-1 text-sm leading-relaxed text-white/60">
                  {x.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Calculator teaser                                        */
/* ------------------------------------------------------------------ */

function CalcTeaser() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 rounded-[2.2rem] border border-black/10 bg-[#FAFAF7] p-8 md:grid-cols-12 md:p-14">
          <div className="md:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/45">
              Konsultacja inżynierska
            </div>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              Czy inteligentny magazyn energii ma sens{" "}
              <span className="italic font-light text-black/55">
                w Twoim domu?
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-black/65">
              W ciągu jednej rozmowy ocenimy potencjał autokonsumpcji, sens
              backupu, korzyść z taryfy dynamicznej i poziom niezależności
              energetycznej, który realnie da się osiągnąć w Twoim budynku.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1a1a1a]"
              >
                Umów konsultację
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kalkulator-pompy-ciepla"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium text-black hover:bg-black/5"
              >
                <Gauge className="h-4 w-4" />
                Kalkulator pompy ciepła
              </Link>
            </div>
          </div>
          <div className="grid gap-3 md:col-span-5">
            {[
              { k: "Potencjał autokonsumpcji", v: "70–90%" },
              { k: "Sens backupu", v: "obwody krytyczne" },
              { k: "Korzyść z taryfy dynamicznej", v: "−20 do −40%" },
              { k: "Niezależność energetyczna", v: "skala 1–10" },
            ].map((s) => (
              <div
                key={s.k}
                className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-5 py-4"
              >
                <span className="text-sm text-black/65">{s.k}</span>
                <span className="text-sm font-semibold text-black">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION — Final CTA                                                */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-28 text-white md:px-10 md:py-36">
      <img
        src={heroImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Następny krok
        </div>
        <h2 className="mt-5 text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.05] tracking-tight">
          Nowoczesna energia zaczyna się{" "}
          <span className="italic font-light text-white/65">
            od dobrego projektu.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-white/65">
          Porozmawiajmy o profilu Twojego domu. Bez katalogów, bez sprzedaży —
          po inżyniersku.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-7 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
          >
            Umów konsultację
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${COMPANY.phoneE164}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white hover:bg-white/5"
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

function EnergiaPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="transparent" />

      <div className="absolute left-5 top-24 z-10 md:left-10">
        <Link
          to="/oferta"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" />
          Oferta
        </Link>
      </div>

      <Hero />
      <PVEraEnded />
      <AIManagement />
      <Backup />
      <OneApp />
      <RealOutcomes />
      <HowWeDesign />
      <CaseStudies />
      <Showroom />
      <CalcTeaser />
      <FinalCTA />

      <SiteFooter />
    </main>
  );
}
