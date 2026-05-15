import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchPublicArticles, fetchPublicVideos } from "@/lib/wp-public.functions";
import {
  Star,
  Award,
  Wrench,
  HeartHandshake,
  Banknote,
  ShieldCheck,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Play,
  Sun,
  Battery,
  Wind,
  Thermometer,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Soltimus — Komfort i niskie rachunki | Pompy ciepła, fotowoltaika" },
      {
        name: "description",
        content:
          "Soltimus projektuje i montuje pompy ciepła, fotowoltaikę, magazyny energii i rekuperację. Autoryzowany Partner Daikin. 1000+ realizacji.",
      },
      { property: "og:title", content: "Soltimus — Komfort i niskie rachunki" },
      {
        property: "og:description",
        content:
          "Pompy ciepła, fotowoltaika, magazyny energii i rekuperacja — od projektu po serwis.",
      },
    ],
  }),
  component: PremiumHome,
});

const GOLD = "#F5B800";
const BLUE = "#0089CF";
const GRAPHITE = "#0E0E10";

/* ------------------------------- HOOKS ------------------------------- */
function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

/* ------------------------------ COMPONENT ------------------------------ */
function PremiumHome() {
  return (
    <div className="min-h-screen bg-white text-[#0E0E10] antialiased selection:bg-[#F5B800] selection:text-black">
      <Nav />
      <Hero />
      <WhySoltimus />
      <Team />
      <CaseStudies />
      <VideoHub />
      <KnowledgeHub />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

/* ---------------------------------- NAV ---------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            className="inline-block h-6 w-6 rounded-md"
            style={{ background: `conic-gradient(from 210deg, ${GOLD}, ${BLUE}, ${GOLD})` }}
          />
          <span className={scrolled ? "text-black" : "text-white"}>Soltimus</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {["Dlaczego my", "Zespół", "Realizacje", "Wiedza", "Kontakt"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className={`transition-colors ${
                scrolled ? "text-black/70 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition-transform hover:scale-[1.03]"
        >
          Konsultacja <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
      {/* Video bg */}
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1545153996-04ce20069bb1?w=1920&q=80"
          className="h-full w-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-solar-panels-on-a-modern-house-2633/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(60% 50% at 70% 30%, ${GOLD}33, transparent 70%)`,
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 pt-32 md:px-8 md:pb-28"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
          Autoryzowany Partner Daikin
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tight text-white"
        >
          Projektujemy komfort
          <br />
          <span className="italic font-light text-white/90">i niskie rachunki.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-xl text-base text-white/80 md:text-lg"
        >
          Pompy ciepła, fotowoltaika, magazyny energii i rekuperacja —
          od projektu po montaż i serwis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-black transition-all hover:scale-[1.03] hover:shadow-[0_10px_40px_-10px_rgba(245,184,0,0.6)]"
            style={{ background: GOLD }}
          >
            Darmowa konsultacja
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#realizacje"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Zobacz realizacje
          </a>
        </motion.div>

        <TrustIndicators />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/60"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function TrustIndicators() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const reviews = useCountUp(49, 1500, seen);
  const realizacje = useCountUp(1000, 2000, seen);
  const lat = useCountUp(15, 1500, seen);

  const items = [
    { label: "Google Reviews", value: `${(reviews / 10).toFixed(1)}`, icon: <Star className="h-4 w-4" fill={GOLD} stroke={GOLD} /> },
    { label: "Realizacji", value: `${realizacje}+`, icon: <ShieldCheck className="h-4 w-4 text-white" /> },
    { label: "Lat doświadczenia", value: `${lat}`, icon: <Award className="h-4 w-4 text-white" /> },
    { label: "Pomoc w dotacjach", value: "Tak", icon: <Banknote className="h-4 w-4 text-white" /> },
  ];

  return (
    <div
      ref={ref}
      className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:grid-cols-4"
    >
      {items.map((it) => (
        <div key={it.label} className="flex flex-col gap-1 bg-black/20 p-4 md:p-5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60">
            {it.icon}
            {it.label}
          </div>
          <div className="text-2xl font-semibold text-white md:text-3xl">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- WHY SOLTIMUS ----------------------------- */
function WhySoltimus() {
  const cards = [
    { icon: Award, title: "Autoryzowany Partner Daikin", desc: "Pełen dostęp do technologii premium i wsparcia producenta." },
    { icon: Wrench, title: "Własne ekipy montażowe", desc: "Bez podwykonawców. Pełna kontrola jakości na każdym etapie." },
    { icon: Sun, title: "Kompleksowa obsługa", desc: "Audyt, projekt, montaż, uruchomienie i serwis pod jednym dachem." },
    { icon: HeartHandshake, title: "Opieka posprzedażowa", desc: "Realny kontakt po instalacji. Jesteśmy na lata, nie na fakturę." },
    { icon: Banknote, title: "Pomoc w dotacjach", desc: "Czyste Powietrze, Mój Prąd, Moje Ciepło — prowadzimy za rękę." },
    { icon: ShieldCheck, title: "Profesjonalny serwis", desc: "Reakcja w 24h. Własny magazyn części i mobilni technicy." },
  ];
  return (
    <section id="dlaczego-my" className="relative bg-white px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Dlaczego Soltimus</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          Inżynieria, której można <span className="italic font-light">zaufać</span>.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="group relative flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-[#FAFAF7] md:p-10"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                style={{ background: `${GOLD}22`, color: GRAPHITE }}
              >
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="text-sm leading-relaxed text-black/60">{c.desc}</p>
              <ChevronRight className="absolute right-6 top-6 h-4 w-4 text-black/20 transition-all group-hover:translate-x-1 group-hover:text-black" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- TEAM --------------------------------- */
function Team() {
  const people = [
    { name: "Marek Kowalski", role: "Główny inżynier", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
    { name: "Anna Zielińska", role: "Doradca techniczny", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
    { name: "Piotr Nowak", role: "Koordynator montaży", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
    { name: "Karolina Wiśniewska", role: "Specjalista dotacji", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
  ];
  return (
    <section id="zespół" className="relative bg-[#0E0E10] px-5 py-28 text-white md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel dark>Ludzie Soltimus</SectionLabel>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Poznaj ludzi <span className="italic font-light text-white/70">Soltimus</span>.
          </h2>
          <p className="max-w-md text-base text-white/60">
            Nowoczesna technologia zaczyna się od ludzi. Inżynierów, doradców, monterów i serwisantów,
            którzy biorą odpowiedzialność za każdą instalację.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {people.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 md:p-5">
                <div className="text-sm font-semibold md:text-base">{p.name}</div>
                <div className="text-xs text-white/60">{p.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CASE STUDIES ------------------------------ */
function CaseStudies() {
  const cases = [
    {
      title: "Dom 220 m² — modernizacja ogrzewania i fotowoltaika",
      img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
      problem: "Stary kocioł gazowy + rachunki 12 000 zł/rok",
      solution: "Pompa ciepła Daikin Altherma 3 + 9.8 kWp PV + magazyn 10 kWh",
      result: "Rachunki niższe o 70%",
      tech: ["Daikin Altherma 3", "PV 9.8 kWp", "Magazyn 10 kWh"],
      saving: "−70%",
    },
    {
      title: "Nowoczesny dom 180 m² — kompleksowa instalacja",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      problem: "Pusta inwestycja, brak źródła ciepła i wentylacji",
      solution: "Pompa + rekuperacja + PV 8 kWp + ciepła woda",
      result: "Komfort A+ od pierwszego dnia",
      tech: ["Daikin Altherma", "Rekuperacja", "PV 8 kWp"],
      saving: "A+",
    },
    {
      title: "Rezydencja 350 m² — premium energy system",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      problem: "Wysokie wymagania komfortu i estetyki",
      solution: "Kaskada pomp ciepła + PV 14 kWp + magazyn 20 kWh",
      result: "Niezależność energetyczna",
      tech: ["Kaskada Daikin", "PV 14 kWp", "Magazyn 20 kWh"],
      saving: "−85%",
    },
  ];
  return (
    <section id="realizacje" className="bg-white px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Realizacje</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          Każdy dom to <span className="italic font-light">historia oszczędności</span>.
        </h2>
        <div className="mt-16 space-y-6">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-black/5 bg-[#FAFAF7] md:grid-cols-2"
            >
              <div className="relative h-64 overflow-hidden md:h-auto">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div
                  className="absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: GOLD, color: GRAPHITE }}
                >
                  {c.saving}
                </div>
              </div>
              <div className="flex flex-col gap-5 p-8 md:p-12">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{c.title}</h3>
                <div className="grid gap-3 text-sm">
                  <Row label="Problem" value={c.problem} />
                  <Row label="Rozwiązanie" value={c.solution} />
                  <Row label="Rezultat" value={c.result} highlight />
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.tech.map((t) => (
                    <span key={t} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">
                      {t}
                    </span>
                  ))}
                </div>
                <button className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-black/80 hover:text-black">
                  Zobacz pełną historię <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-3">
      <span className="text-[10px] uppercase tracking-widest text-black/40 pt-1">{label}</span>
      <span
        className={highlight ? "font-semibold" : "text-black/70"}
        style={highlight ? { color: GRAPHITE } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

/* ------------------------------ VIDEO HUB ------------------------------ */
function VideoHub() {
  const reels = [
    { t: "Pompy ciepła — od czego zacząć", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80" },
    { t: "5 błędów przy doborze PV", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80" },
    { t: "Czyste Powietrze 2026", img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&q=80" },
    { t: "Magazyn energii — kiedy się opłaca", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { t: "Daikin Altherma w akcji", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    { t: "Montaż pompy — kulisy", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#0E0E10] px-5 py-28 text-white md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel dark>Wiedza w 60 sekund</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
              Reels, które <span className="italic font-light text-white/70">tłumaczą.</span>
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-1.5 text-sm text-white/70 hover:text-white md:inline-flex">
            Wszystkie wideo <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-12 -mx-5 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:gap-6 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reels.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[9/16] w-[260px] flex-shrink-0 overflow-hidden rounded-3xl bg-white/5 md:w-[280px]"
            >
              <img
                src={r.img}
                alt={r.t}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full backdrop-blur transition-transform group-hover:scale-110"
                  style={{ background: `${GOLD}EE` }}
                >
                  <Play className="h-5 w-5 fill-black text-black" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium leading-snug">
                {r.t}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- KNOWLEDGE HUB ----------------------------- */
function KnowledgeHub() {
  const cats = [
    { name: "Pompy ciepła", icon: Thermometer, count: 24 },
    { name: "Fotowoltaika", icon: Sun, count: 18 },
    { name: "Magazyny energii", icon: Battery, count: 9 },
    { name: "Rekuperacja", icon: Wind, count: 11 },
    { name: "Dotacje", icon: Banknote, count: 14 },
    { name: "Poradniki", icon: ShieldCheck, count: 32 },
  ];
  const featured = [
    {
      cat: "Pompy ciepła",
      title: "Gruntowa pompa ciepła: jak działa, ile kosztuje i czy ma wady?",
      img: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1200&q=80",
    },
    {
      cat: "Fotowoltaika",
      title: "Net-billing 2026 — co się zmienia dla Twojej instalacji?",
      img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    },
  ];
  return (
    <section id="wiedza" className="bg-white px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Strefa wiedzy</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          Decyzje warte <span className="italic font-light">setek tysięcy</span> wymagają wiedzy.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featured.map((f, i) => (
            <motion.a
              key={f.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#FAFAF7] lg:row-span-2"
            >
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-[60%]">
                <img
                  src={f.img}
                  alt={f.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-8">
                <span className="text-[10px] uppercase tracking-widest" style={{ color: BLUE }}>
                  {f.cat}
                </span>
                <h3 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {f.title}
                </h3>
                <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium">
                  Czytaj <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.a>
          ))}

          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {cats.map((c) => (
              <a
                key={c.name}
                href="#"
                className="group flex flex-col gap-2 rounded-2xl border border-black/5 bg-white p-5 transition-all hover:border-black/20 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
              >
                <c.icon className="h-5 w-5 text-black/60 transition-colors group-hover:text-black" />
                <div className="mt-auto">
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-black/40">{c.count} artykułów</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
function Testimonials() {
  const items = [
    {
      name: "Tomasz K.",
      city: "Warszawa",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      install: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80",
      quote: "Profesjonalizm na każdym etapie. Rachunki spadły o 60%, a komfort wzrósł.",
      rating: 5,
    },
    {
      name: "Magdalena R.",
      city: "Kraków",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      install: "https://images.unsplash.com/photo-1605579375923-cb44c98e9e98?w=800&q=80",
      quote: "Pomogli mi przejść przez Czyste Powietrze. Zero stresu, wszystko zorganizowane.",
      rating: 5,
    },
    {
      name: "Jakub W.",
      city: "Poznań",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      install: "https://images.unsplash.com/photo-1545208974-b9ed28e80bd5?w=800&q=80",
      quote: "Najlepsza decyzja przy budowie domu. Daikin + PV + magazyn — działa idealnie.",
      rating: 5,
    },
  ];
  return (
    <section className="bg-[#FAFAF7] px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Opinie klientów</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          Mówią o nas ich <span className="italic font-light">domy</span>.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col overflow-hidden rounded-3xl bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={t.install} alt="Realizacja" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4" fill={GOLD} stroke={GOLD} />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-black/80">"{t.quote}"</p>
                <div className="mt-2 flex items-center gap-3 border-t border-black/5 pt-4">
                  <img src={t.photo} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-black/50">{t.city}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FINAL CTA ------------------------------- */
function FinalCTA() {
  return (
    <section id="kontakt" className="relative overflow-hidden bg-[#0E0E10] px-5 py-28 text-white md:px-8 md:py-40">
      <div
        className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD}, transparent 60%)` }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionLabel dark center>
          Następny krok
        </SectionLabel>
        <h2 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
          Porozmawiajmy o <span className="italic font-light text-white/80">Twoim domu</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/70 md:text-lg">
          Doradzimy najlepsze rozwiązanie i pomożemy uzyskać dofinansowanie.
          Konsultacja jest darmowa i niezobowiązująca.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            style={{ background: GOLD }}
          >
            Darmowa konsultacja <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+48000000000"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" /> Zadzwoń teraz
          </a>
          <a
            href="https://wa.me/48000000000"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER --------------------------------- */
function Footer() {
  return (
    <footer className="bg-white px-5 pb-32 pt-20 md:px-8 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                alt="Showroom Soltimus"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-black/40">Showroom</div>
              <div className="mt-3 text-sm leading-relaxed text-black/80">
                ul. Energetyczna 12<br />
                00-000 Warszawa<br />
                pn–pt 9:00–17:00
              </div>
              <a href="#" className="mt-3 inline-flex items-center gap-1 text-sm font-medium" style={{ color: BLUE }}>
                <MapPin className="h-3.5 w-3.5" /> Otwórz w mapach
              </a>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-black/40">Kontakt</div>
              <a href="tel:+48000000000" className="mt-3 flex items-center gap-2 text-sm text-black/80">
                <Phone className="h-3.5 w-3.5" /> +48 000 000 000
              </a>
              <a href="mailto:biuro@soltimus.pl" className="mt-2 flex items-center gap-2 text-sm text-black/80">
                <Mail className="h-3.5 w-3.5" /> biuro@soltimus.pl
              </a>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-black/40">Partnerstwo</div>
              <div className="mt-3 text-sm text-black/80">
                Autoryzowany Partner<br />
                <span className="font-semibold">Daikin</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                <span className="rounded-md bg-black/5 px-2 py-1 text-[10px]">UDT</span>
                <span className="rounded-md bg-black/5 px-2 py-1 text-[10px]">F-Gazy</span>
                <span className="rounded-md bg-black/5 px-2 py-1 text-[10px]">SEP</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-8 text-xs text-black/40 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Soltimus. Wszelkie prawa zastrzeżone.</div>
          <div className="flex gap-5">
            <a href="#">Polityka prywatności</a>
            <a href="#">Regulamin</a>
            <a href="#">RODO</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- STICKY MOBILE ----------------------------- */
function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 md:hidden">
      <a
        href="tel:+48000000000"
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black text-white shadow-lg"
      >
        <Phone className="h-4 w-4" />
      </a>
      <a
        href="#kontakt"
        className="flex flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-black shadow-[0_10px_30px_-10px_rgba(245,184,0,0.7)]"
        style={{ background: GOLD }}
      >
        Darmowa konsultacja <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ------------------------------- HELPERS ------------------------------- */
function SectionLabel({
  children,
  dark,
  center,
}: {
  children: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] ${
        dark ? "text-white/50" : "text-black/40"
      } ${center ? "justify-center" : ""}`}
    >
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
    </div>
  );
}
