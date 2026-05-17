import { createFileRoute, Link } from "@tanstack/react-router";
import bartoszImg from "@/assets/team-bartosz.jpg";
import jarekImg from "@/assets/team-jarek.jpg";
import konradImg from "@/assets/team-konrad.jpg";
import karolinaImg from "@/assets/team-karolina.jpg";
import izaImg from "@/assets/team-iza.jpg";
import logoDark from "@/assets/soltimus-logo.png";
import logoLight from "@/assets/soltimus-logo-white.png";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchPublicArticles, fetchPublicVideos } from "@/lib/wp-public.functions";
import { matchCategory } from "@/lib/knowledge-categories";
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
  ChevronDown,
  ClipboardList,
  PencilRuler,
  HardHat,
  LifeBuoy,
  CheckCircle2,
  Users,
  Building2,
  Sparkles,
  Quote,
  Plus,
  Minus,
  BookOpen,
  HelpCircle,
  GitCompare,
  Layers,
  FileText,
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
  // Smooth scroll site-wide
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = prev; };
  }, []);
  return (
    <div className="min-h-screen bg-white text-[#0E0E10] antialiased selection:bg-[#F5B800] selection:text-black">
      <ScrollProgress />
      <GrainOverlay />
      <Nav />
      <Hero />
      <PartnerTicker />
      <ComfortStrip />
      <ModernLivingManifesto />
      <SocialProofStats />
      <LifestyleGallery />
      <Team />
      <HowWeWork />
      <CinematicQuote
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=85"
        quote="Dom nie powinien być projektem. Powinien być spokojem."
        author="Filozofia Soltimus"
      />
      <WhySoltimus />
      <CaseStudies />
      <BehindTheScenes />
      <TrustAwards />
      <VideoHub />
      <KnowledgeHub />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

/* ----------------------------- SCROLL PROGRESS ----------------------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%", background: `linear-gradient(90deg, ${GOLD}, ${BLUE})` }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px]"
      aria-hidden
    />
  );
}

/* ------------------------------- GRAIN OVERLAY ------------------------------- */
function GrainOverlay() {
  // Subtle film grain — adds cinematic texture without distracting
  const svg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>`,
    );
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] opacity-[0.06] mix-blend-overlay"
      style={{ backgroundImage: `url("${svg}")`, backgroundSize: "160px 160px" }}
    />
  );
}

/* ------------------------------ PARTNER TICKER ------------------------------ */
function PartnerTicker() {
  const items = [
    "Autoryzowany Partner Daikin D1+",
    "Certyfikat UDT",
    "Uprawnienia F-Gazy",
    "Mój Prąd · Czyste Powietrze",
    "1000+ Realizacji",
    "5.0 ★ · 263+ opinii Google",
    "15 lat doświadczenia",
    "Inżynierski projekt indywidualny",
  ];
  const row = [...items, ...items];
  return (
    <section aria-label="Zaufali nam" className="relative overflow-hidden border-y border-black/5 bg-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <motion.div
        className="flex gap-12 whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-black/55"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="inline-block h-1 w-1 rounded-full" style={{ background: GOLD }} />
            {t}
          </span>
        ))}
      </motion.div>
    </section>
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
        <a href="#" aria-label="Soltimus — strona główna" className="flex items-center">
          <img
            src={scrolled ? logoDark : logoLight}
            alt="Soltimus Energy Efficiency"
            className="h-7 w-auto md:h-8 select-none"
            draggable={false}
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            { label: "Zespół", href: "#zespol" },
            { label: "Jak pracujemy", href: "#proces" },
            { label: "Realizacje", href: "#realizacje" },
            { label: "Wiedza", href: "#wiedza" },
            { label: "Kontakt", href: "#kontakt" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`transition-colors ${
                scrolled ? "text-black/70 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
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
      {/* Lifestyle background — warm premium home */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=85"
          alt="Wnętrze nowoczesnego domu z komfortową temperaturą"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(70% 55% at 75% 25%, ${GOLD}33, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background: `radial-gradient(50% 50% at 15% 80%, ${BLUE}33, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Ambient floating orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD}40, transparent 70%)` }}
        animate={{ y: [0, -30, 0], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE}33, transparent 70%)` }}
        animate={{ y: [0, 24, 0], x: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Vignette for cinematic depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 pt-32 md:px-8 md:pb-28"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/90 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
          Autoryzowany Partner Daikin · 1000+ domów
        </motion.span>

        <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tight text-white">
          {["Ciepły", "dom."].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mr-3 inline-block"
            >
              {w}
            </motion.span>
          ))}
          <br />
          {["Spokojna", "głowa."].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mr-3 inline-block italic font-light text-white/90"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-xl text-base text-white/85 md:text-lg"
        >
          Projektujemy i montujemy systemy, które dają Twojej rodzinie komfort
          przez 25 lat — pompy ciepła, fotowoltaikę, magazyny energii i rekuperację.
          Z opieką inżynierów, nie tylko monterów.
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
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Zobacz realizacje
          </a>
        </motion.div>

        <TrustIndicators />
      </motion.div>

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
  const reviews = useCountUp(50, 1500, seen);
  const reviewCount = useCountUp(263, 2000, seen);
  const realizacje = useCountUp(1000, 2000, seen);
  const lat = useCountUp(15, 1500, seen);

  const items = [
    { label: `${reviewCount}+ opinii Google`, value: `${(reviews / 10).toFixed(1)}`, icon: <Star className="h-4 w-4" fill={GOLD} stroke={GOLD} /> },
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

/* --------------------------- COMFORT LIFESTYLE STRIP --------------------------- */
function ComfortStrip() {
  const shots = [
    {
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      label: "Cicho",
      sub: "23 dB w salonie",
    },
    {
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      label: "Ciepło",
      sub: "21°C całą zimę",
    },
    {
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80",
      label: "Świeżo",
      sub: "Powietrze jak po burzy",
    },
    {
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      label: "Tanio",
      sub: "Rachunki niższe o 70%",
    },
  ];
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Co dostajesz</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
          Nie sprzedajemy pomp ciepła. <span className="italic font-light text-black/60">Sprzedajemy efekt.</span>
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {shots.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-black md:aspect-[4/5]"
            >
              <img
                src={s.img}
                alt={s.label}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <div className="text-lg font-semibold text-white md:text-xl">{s.label}</div>
                <div className="text-xs text-white/70 md:text-sm">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- SOCIAL PROOF STATS --------------------------- */
function SocialProofStats() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const realizacje = useCountUp(1000, 2200, seen);
  const reviews = useCountUp(50, 1800, seen);
  const reviewCount = useCountUp(263, 2200, seen);
  const lat = useCountUp(15, 1500, seen);
  const ekipy = useCountUp(8, 1400, seen);

  const stats = [
    { value: `${realizacje}+`, label: "Zrealizowanych instalacji", sub: "od 2010 roku" },
    { value: `${(reviews / 10).toFixed(1)}/5`, label: "Średnia ocena Google", sub: `${reviewCount}+ opinii klientów` },
    { value: `${lat}`, label: "Lat doświadczenia", sub: "w fotowoltaice i HVAC" },
    { value: `${ekipy}`, label: "Własnych ekip montażowych", sub: "bez podwykonawców" },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32"
    >
      <div
        className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD}, transparent 60%)` }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2 border-l border-white/10 px-5 first:border-l-0 md:px-8"
            >
              <div className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tight">
                {s.value}
              </div>
              <div className="text-sm font-medium text-white/90">{s.label}</div>
              <div className="text-xs text-white/50">{s.sub}</div>
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
    {
      name: "Bartosz",
      role: "Główny inżynier",
      quote: "Każdy projekt zaczynam od bilansu cieplnego. Zawsze.",
      img: bartoszImg,
    },
    {
      name: "Jarek",
      role: "Doradca techniczny",
      quote: "Mój klient ma rozumieć każdą decyzję, którą razem podejmujemy.",
      img: jarekImg,
    },
    {
      name: "Konrad",
      role: "Koordynator montaży",
      quote: "Jeden opiekun, jeden numer, jedna odpowiedzialność.",
      img: konradImg,
    },
    {
      name: "Iza",
      role: "Koordynatorka realizacji",
      quote: "Harmonogram, dostawy, ekipy — wszystko ma się spiąć co do dnia.",
      img: izaImg,
    },
    {
      name: "Karolina",
      role: "Specjalistka dotacji",
      quote: "Czyste Powietrze od A do Z. Nie zostawiam papierów klientowi.",
      img: karolinaImg,
    },
  ];
  return (
    <section
      id="zespol"
      className="relative overflow-hidden bg-white px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionLabel>Ludzie Soltimus</SectionLabel>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              Za każdą instalacją <span className="italic font-light text-black/60">stoi człowiek</span>.
            </h2>
            <p className="mt-6 max-w-md text-base text-black/60 md:text-lg">
              Nie jesteśmy call-center, ani agregatorem podwykonawców. Jesteśmy
              zespołem inżynierów, doradców i monterów, których poznasz osobiście —
              i którzy biorą realną odpowiedzialność za Twój dom.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-black/60">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" style={{ color: BLUE }} /> 8 własnych ekip
              </span>
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4" style={{ color: BLUE }} /> Showroom w Warszawie
              </span>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {people.map((p, i) => (
                <motion.figure
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className={`group relative overflow-hidden rounded-3xl bg-[#FAFAF7] ${
                    i % 3 === 0 ? "md:translate-y-8" : ""
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white md:p-5">
                    <Quote
                      className="mb-2 h-3.5 w-3.5 opacity-70"
                      style={{ color: GOLD }}
                    />
                    <p className="text-xs leading-snug text-white/85 md:text-sm">
                      {p.quote}
                    </p>
                    <div className="mt-3 border-t border-white/15 pt-2.5">
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="text-[11px] text-white/60">{p.role}</div>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ HOW WE WORK ------------------------------ */
function HowWeWork() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Konsultacja",
      desc: "Słuchamy. Pytamy o dom, rodzinę, plany. Bez sprzedażowej presji.",
      time: "30–60 min",
    },
    {
      icon: PencilRuler,
      title: "Projekt i dobór",
      desc: "Bilans cieplny, dobór mocy, wizualizacja oszczędności. Inżynierski szczegół.",
      time: "3–5 dni",
    },
    {
      icon: Banknote,
      title: "Pomoc w dotacjach",
      desc: "Czyste Powietrze, Mój Prąd, Moje Ciepło. Wnioski wypełniamy razem z Tobą.",
      time: "do 2 tyg.",
    },
    {
      icon: HardHat,
      title: "Profesjonalny montaż",
      desc: "Własna ekipa. Bez podwykonawców. Czysto, terminowo, z dokumentacją.",
      time: "2–5 dni",
    },
    {
      icon: LifeBuoy,
      title: "Opieka i serwis",
      desc: "Reakcja w 24h. Magazyn części. Jesteśmy z Tobą przez 25 lat.",
      time: "365 dni/rok",
    },
  ];

  return (
    <section
      id="proces"
      className="relative overflow-hidden bg-[#FAFAF7] px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Jak pracujemy</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
              Pięć kroków. <span className="italic font-light text-black/60">Zero chaosu.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-black/60">
            Każdy etap ma swojego opiekuna. Zawsze wiesz, co dzieje się w Twoim
            projekcie i kto za to odpowiada.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-px md:block"
            style={{
              background: `linear-gradient(to right, transparent, ${GOLD}66, ${GOLD}66, transparent)`,
            }}
          />
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative flex flex-col gap-3 md:items-start"
              >
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
                  style={{ borderTop: `2px solid ${GOLD}` }}
                >
                  <s.icon className="h-6 w-6 text-black" />
                  <span
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-black"
                    style={{ background: GOLD }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-black/40">
                  {s.time}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-black/60">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
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
    <section className="relative bg-white px-5 py-28 md:px-8 md:py-40">
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

/* ------------------------------ CASE STUDIES ------------------------------ */
function CaseStudies() {
  const [open, setOpen] = useState<number | null>(0);
  const cases = [
    {
      title: "Dom 220 m² — modernizacja ogrzewania i fotowoltaika",
      city: "Pruszków",
      img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
      photos: [
        "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&q=80",
        "https://images.unsplash.com/photo-1605579375923-cb44c98e9e98?w=1200&q=80",
      ],
      problem: "Stary kocioł gazowy + rachunki 12 000 zł/rok. Zimne podłogi i wilgoć.",
      challenge: "Modernizacja bez przerywania zamieszkania. Trudny dostęp do dachu.",
      solution: "Pompa ciepła Daikin Altherma 3 + 9.8 kWp PV + magazyn 10 kWh.",
      tech: ["Daikin Altherma 3 H HT", "PV 9.8 kWp", "Magazyn 10 kWh", "Dotacja: Czyste Powietrze"],
      effect: "Rachunki niższe o 70%. Stała temperatura 21°C. Zwrot inwestycji w 7 lat.",
      saving: "−70%",
      kpis: [
        { v: "12 000 zł", l: "rocznie wcześniej" },
        { v: "3 600 zł", l: "rocznie teraz" },
        { v: "7 lat", l: "okres zwrotu" },
      ],
    },
    {
      title: "Nowoczesny dom 180 m² — kompleksowa instalacja",
      city: "Józefosław",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      photos: [
        "https://images.unsplash.com/photo-1545208974-b9ed28e80bd5?w=1200&q=80",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80",
      ],
      problem: "Pusta inwestycja, brak źródła ciepła, brak wentylacji mechanicznej.",
      challenge: "Pełna koordynacja z generalnym wykonawcą i elektrykiem.",
      solution: "Pompa Daikin + rekuperacja + PV 8 kWp + ciepła woda użytkowa.",
      tech: ["Daikin Altherma 3 R", "Rekuperacja Mistral", "PV 8 kWp"],
      effect: "Komfort A+ od pierwszego dnia zamieszkania. Powietrze filtrowane HEPA.",
      saving: "A+",
      kpis: [
        { v: "21°C", l: "stała temperatura" },
        { v: "60%", l: "filtracja PM2.5" },
        { v: "0 zł", l: "rachunek za grzanie w lecie" },
      ],
    },
    {
      title: "Rezydencja 350 m² — premium energy system",
      city: "Konstancin",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      photos: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      ],
      problem: "Wysokie wymagania komfortu, estetyki i niezależności energetycznej.",
      challenge: "Ukrycie urządzeń. Integracja z systemem smart home.",
      solution: "Kaskada pomp ciepła Daikin + PV 14 kWp + magazyn 20 kWh.",
      tech: ["Kaskada Daikin", "PV 14 kWp", "Magazyn 20 kWh", "Loxone integration"],
      effect: "Niezależność energetyczna na poziomie 92%. Pełna integracja smart home.",
      saving: "−85%",
      kpis: [
        { v: "92%", l: "niezależności energetycznej" },
        { v: "20 kWh", l: "pojemność magazynu" },
        { v: "−85%", l: "rachunki r/r" },
      ],
    },
  ];
  return (
    <section id="realizacje" className="bg-white px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Realizacje</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          Każdy dom to <span className="italic font-light">historia oszczędności</span>.
        </h2>
        <div className="mt-16 space-y-5">
          {cases.map((c, i) => {
            const isOpen = open === i;
            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-3xl border border-black/5 bg-[#FAFAF7]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="grid w-full grid-cols-1 text-left md:grid-cols-[280px_1fr_auto] md:items-center"
                >
                  <div className="relative h-56 overflow-hidden md:h-44">
                    <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
                    <div
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: GOLD, color: GRAPHITE }}
                    >
                      {c.saving}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-6 md:p-8">
                    <div className="text-[10px] uppercase tracking-widest text-black/40">
                      {c.city}
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      {c.title}
                    </h3>
                    <div className="mt-1 text-sm text-black/60 line-clamp-1">
                      {c.effect}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-6 pb-6 text-sm font-medium text-black/70 md:px-8 md:pb-0">
                    {isOpen ? "Zwiń" : "Rozwiń"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-8 border-t border-black/5 p-6 md:grid-cols-2 md:p-10">
                    <div className="flex flex-col gap-5">
                      <Row label="Problem" value={c.problem} />
                      <Row label="Wyzwanie" value={c.challenge} />
                      <Row label="Rozwiązanie" value={c.solution} />
                      <Row label="Efekt" value={c.effect} highlight />
                      <div className="flex flex-wrap gap-2 pt-2">
                        {c.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-2 gap-3">
                        {c.photos.map((p, j) => (
                          <div key={j} className="aspect-[4/3] overflow-hidden rounded-2xl">
                            <img src={p} alt="Realizacja" className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-4">
                        {c.kpis.map((k) => (
                          <div key={k.l} className="text-center">
                            <div className="text-lg font-semibold tracking-tight md:text-xl">{k.v}</div>
                            <div className="text-[10px] uppercase tracking-widest text-black/40">
                              {k.l}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-3">
      <span className="pt-1 text-[10px] uppercase tracking-widest text-black/40">{label}</span>
      <span
        className={highlight ? "font-semibold" : "text-black/70"}
        style={highlight ? { color: GRAPHITE } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

/* ------------------------------ TRUST AWARDS ------------------------------ */
function TrustAwards() {
  const badges = [
    { label: "Daikin D1+", sub: "Autoryzowany Partner" },
    { label: "UDT", sub: "Uprawnienia montażowe" },
    { label: "F-Gazy", sub: "Certyfikat FGAZ" },
    { label: "SEP", sub: "do 1 kV" },
    { label: "Czyste Powietrze", sub: "Operator programu" },
    { label: "Mój Prąd", sub: "Wnioski 1–6" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionLabel dark>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" style={{ color: GOLD }} /> Zaufanie
              </span>
            </SectionLabel>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
              Certyfikaty, które <span className="italic font-light text-white/60">faktycznie chronią</span> Twoją inwestycję.
            </h2>
            <p className="mt-6 max-w-md text-base text-white/60">
              Pracujemy wyłącznie na sprzęcie i zasadach producentów. Każdy monter
              ma uprawnienia, każda instalacja ma dokumentację.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <CheckCircle2 className="h-5 w-5" style={{ color: GOLD }} />
              <span className="text-sm text-white/80">Pełna gwarancja producenta utrzymana</span>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:grid-cols-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="group flex flex-col gap-2 bg-[#0E0E10] p-6 transition-colors hover:bg-white/5 md:p-8"
                >
                  <div
                    className="text-lg font-semibold tracking-tight md:text-xl"
                    style={{ color: GOLD }}
                  >
                    {b.label}
                  </div>
                  <div className="text-xs text-white/50">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ VIDEO HUB ------------------------------ */
function VideoHub() {
  const fetchVideos = useServerFn(fetchPublicVideos);
  const { data, isLoading } = useQuery({
    queryKey: ["wp", "videos"],
    queryFn: () => fetchVideos(),
    staleTime: 5 * 60 * 1000,
  });
  const reels = data?.posts ?? [];

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
          <a
            href="https://soltimus.pl/strefa-wiedzy/wideo/"
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1.5 text-sm text-white/70 hover:text-white md:inline-flex"
          >
            Wszystkie wideo <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-12 -mx-5 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:gap-6 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isLoading && reels.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[9/16] w-[260px] flex-shrink-0 animate-pulse rounded-3xl bg-white/5 md:w-[280px]"
                />
              ))
            : reels.map((r, i) => (
                <motion.a
                  key={r.id}
                  href={r.link}
                  target="_blank"
                  rel="noopener"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative aspect-[9/16] w-[260px] flex-shrink-0 overflow-hidden rounded-3xl bg-white/5 md:w-[280px]"
                >
                  {r.image ? (
                    <img
                      src={r.image}
                      alt={r.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/5" />
                  )}
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
                    {r.title}
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- KNOWLEDGE HUB ----------------------------- */
function KnowledgeHub() {
  const cats = [
    { slug: "pompy-ciepla", name: "Pompy ciepła", icon: Thermometer, count: "42 materiały" },
    { slug: "fotowoltaika", name: "Fotowoltaika", icon: Sun, count: "38 materiałów" },
    { slug: "magazyny-energii", name: "Magazyny energii", icon: Battery, count: "21 materiałów" },
    { slug: "dotacje", name: "Dotacje", icon: Banknote, count: "17 materiałów" },
    { slug: "case-studies", name: "Case studies", icon: Building2, count: "29 realizacji" },
    { slug: "faq", name: "FAQ", icon: HelpCircle, count: "60+ pytań" },
    { slug: "porownania", name: "Porównania", icon: GitCompare, count: "12 zestawień" },
    { slug: "engineering-lab", name: "Engineering Lab", icon: BookOpen, count: "Pogłębione analizy" },
  ];

  const fetchArticles = useServerFn(fetchPublicArticles);
  const fetchVideos = useServerFn(fetchPublicVideos);
  const { data: aData, isLoading: aLoading } = useQuery({
    queryKey: ["wp", "articles"],
    queryFn: () => fetchArticles(),
    staleTime: 5 * 60 * 1000,
  });
  const { data: vData } = useQuery({
    queryKey: ["wp", "videos"],
    queryFn: () => fetchVideos(),
    staleTime: 5 * 60 * 1000,
  });

  const articles = aData?.posts ?? [];
  const videos = (vData?.posts ?? []).filter((v) => v.videoId);
  const lead = articles[0];
  const secondary = articles.slice(1, 4);
  const more = articles.slice(4, 7);

  const fallbackImg =
    "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1600&q=80";

  const comparison = [
    { feature: "Roczny koszt ogrzewania (150 m²)", heat: "~3 500 zł", gas: "~7 800 zł", elec: "~12 400 zł" },
    { feature: "Emisja CO₂", heat: "Niska", gas: "Średnia", elec: "Średnia" },
    { feature: "Dotacja Czyste Powietrze", heat: "do 135 000 zł", gas: "brak", elec: "brak" },
    { feature: "Żywotność systemu", heat: "20–25 lat", gas: "15 lat", elec: "10–15 lat" },
    { feature: "Praca z fotowoltaiką", heat: "Pełna integracja", gas: "Brak", elec: "Częściowa" },
  ];

  const faqs = [
    {
      q: "Czy pompa ciepła sprawdzi się w starszym domu?",
      a: "Tak — w 90% przypadków. Kluczowy jest indywidualny audyt strat ciepła oraz dobór mocy i typu pompy (powietrze–woda lub gruntowa). W starszych domach często wystarcza wymiana 2–3 grzejników i poprawa izolacji strychu, aby uzyskać COP > 3,5 nawet przy –10°C.",
    },
    {
      q: "Ile kosztuje pompa ciepła z montażem w 2026 roku?",
      a: "Kompletna inwestycja w pompę ciepła Daikin Altherma 3 z montażem to 55 000–85 000 zł brutto, zależnie od mocy (8–16 kW) i wariantu (split / monoblock). Po dotacji Czyste Powietrze koszt netto może spaść do 20 000–40 000 zł.",
    },
    {
      q: "Czy fotowoltaika opłaca się przy net-billingu?",
      a: "Tak, ale tylko w połączeniu z magazynem energii lub sterownikiem konsumpcji własnej. Realny zwrot inwestycji to dziś 7–9 lat, a przy integracji z pompą ciepła nawet 5–6 lat. Sama instalacja PV bez magazynu pokrywa dziś ok. 30–40% rocznego zużycia.",
    },
    {
      q: "Jak długo trwa cały proces — od konsultacji do uruchomienia?",
      a: "Standardowo 4–8 tygodni. Konsultacja i audyt: 1 tydzień. Projekt i wycena: 5–10 dni. Realizacja montażu: 2–5 dni dla PV, 3–7 dni dla pompy ciepła. Dokumentacja dotacyjna i uruchomienie: 1–2 tygodnie.",
    },
    {
      q: "Czy pomagacie w dotacjach Czyste Powietrze i Mój Prąd?",
      a: "Tak, prowadzimy klienta przez cały proces dotacyjny — od audytu energetycznego, przez wniosek, po rozliczenie. To usługa wliczona w pakiet realizacji, bez dodatkowych opłat. Skuteczność naszych wniosków: 98,7%.",
    },
    {
      q: "Jaki serwis i gwarancję otrzymuję po montażu?",
      a: "5 lat gwarancji producenta na pompę ciepła Daikin (przy serwisowaniu autoryzowanym), 12 lat na panele i 10 lat na falownik. Dodatkowo własny dział serwisu Soltimus z reakcją w 24h na terenie województwa.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="wiedza" className="relative bg-[#FAFAF7] px-5 py-28 md:px-8 md:py-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-7xl">
        {/* ---------- HEADER ---------- */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>Strefa wiedzy · Knowledge Hub</SectionLabel>
            <h2 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
              Decyzje warte <span className="italic font-light">setek tysięcy</span>
              <br />
              wymagają realnej wiedzy inżynierskiej.
            </h2>
            <p className="mt-6 max-w-2xl text-base text-black/60 md:text-lg">
              Praktyczne poradniki, technologiczne porównania i case studies pisane przez naszych projektantów i serwisantów —
              nie copywriterów. Bez marketingowych obietnic, z liczbami z realnych instalacji.
            </p>
          </div>
          <Link
            to="/wiedza"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium transition-all hover:border-black hover:bg-black hover:text-white"
          >
            Cała baza wiedzy
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ---------- CATEGORY GRID ---------- */}
        <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {cats.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            >
              <Link
                to="/wiedza/$category"
                params={{ category: c.slug }}
                className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-black/5 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] md:p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${BLUE}10` }}
                >
                  <c.icon className="h-5 w-5" style={{ color: BLUE }} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold tracking-tight">{c.name}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-widest text-black/40">
                    {c.count}
                  </div>
                </div>
                <ArrowRight className="absolute right-5 top-5 h-4 w-4 text-black/20 transition-all group-hover:right-4 group-hover:text-black" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ---------- EDITORIAL FEATURED ---------- */}
        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Lead article */}
          {aLoading && !lead ? (
            <div className="h-[560px] animate-pulse rounded-3xl bg-black/5 lg:col-span-7" />
          ) : lead ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="col-span-1 lg:col-span-7"
            >
              <Link
                to="/wiedza/$category/$slug"
                params={{
                  category: matchCategory(`${lead.title} ${lead.excerpt}`),
                  slug: lead.slug,
                }}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-black"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/11]">
                  <img
                    src={lead.image ?? fallbackImg}
                    alt={lead.title}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur">
                    <Sparkles className="h-3 w-3" style={{ color: GOLD }} />
                    Materiał redakcyjny
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                    <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                      {lead.title}
                    </h3>
                    {lead.excerpt && (
                      <p className="mt-3 max-w-xl text-sm text-white/70 line-clamp-2 md:text-base">
                        {lead.excerpt}
                      </p>
                    )}
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                      Czytaj pełny artykuł
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : null}

          {/* Secondary stack */}
          <div className="col-span-1 flex flex-col gap-3 lg:col-span-5">
            {(aLoading && secondary.length === 0
              ? Array.from({ length: 3 }).map((_, i) => ({ id: i, loading: true } as any))
              : secondary
            ).map((s: any, i: number) =>
              s.loading ? (
                <div
                  key={s.id}
                  className="h-32 animate-pulse rounded-2xl border border-black/5 bg-white p-4"
                />
              ) : (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to="/wiedza/$category/$slug"
                    params={{
                      category: matchCategory(`${s.title} ${s.excerpt}`),
                      slug: s.slug,
                    }}
                    className="group flex gap-4 rounded-2xl border border-black/5 bg-white p-4 transition-all hover:border-black/20 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-black/5 md:h-28 md:w-28">
                      <img
                        src={s.image ?? fallbackImg}
                        alt={s.title ?? ""}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-widest" style={{ color: BLUE }}>
                        Poradnik · {s.readingTime ?? 5} min
                      </span>
                      <h4 className="text-sm font-semibold leading-snug tracking-tight line-clamp-3 md:text-base">
                        {s.title ?? ""}
                      </h4>
                    </div>
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* ---------- VIDEO LIBRARY ---------- */}
        {videos.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <SectionLabel>Wideo · Eksperci Soltimus</SectionLabel>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  Zobacz, jak to robimy w praktyce.
                </h3>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos.slice(0, 3).map((v, i) => (
                <motion.a
                  key={v.id}
                  href={v.link}
                  target="_blank"
                  rel="noopener"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative aspect-video overflow-hidden rounded-2xl bg-black"
                >
                  <img
                    src={v.image ?? fallbackImg}
                    alt={v.title}
                    className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-0.5 text-black" fill="black" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[10px] uppercase tracking-widest text-white/70">Wideo</span>
                    <h4 className="mt-1 text-sm font-semibold leading-tight text-white line-clamp-2 md:text-base">
                      {v.title}
                    </h4>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* ---------- COMPARISON TABLE ---------- */}
        <div className="mt-24">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Porównanie technologii</SectionLabel>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Pompa ciepła vs gaz vs ogrzewanie elektryczne.
              </h3>
            </div>
            <span className="text-xs text-black/40">Dane uśrednione dla domu 150 m² · 2026</span>
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-black/5 bg-white">
            <div className="hidden grid-cols-4 gap-px bg-black/5 text-[11px] uppercase tracking-widest text-black/50 md:grid">
              <div className="bg-white p-5">Parametr</div>
              <div className="bg-white p-5 font-semibold" style={{ color: BLUE }}>Pompa ciepła</div>
              <div className="bg-white p-5">Gaz</div>
              <div className="bg-white p-5">Elektryczne</div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-2 gap-px bg-black/5 text-sm md:grid-cols-4 ${i % 2 === 0 ? "" : "bg-[#FAFAF7]"}`}
              >
                <div className="col-span-2 bg-white p-5 font-medium md:col-span-1">{row.feature}</div>
                <div className="bg-white p-5">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-black/40">Pompa ciepła</span>
                  <div className="font-semibold" style={{ color: BLUE }}>{row.heat}</div>
                </div>
                <div className="bg-white p-5 text-black/70">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-black/40">Gaz</span>
                  <div>{row.gas}</div>
                </div>
                <div className="bg-white p-5 text-black/70">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-black/40">Elektryczne</span>
                  <div>{row.elec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- FAQ ---------- */}
        <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>FAQ · Najczęstsze pytania</SectionLabel>
            <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              Pytania, które
              <br />
              <span className="italic font-light">naprawdę</span> zadają klienci.
            </h3>
            <p className="mt-5 text-sm text-black/60 md:text-base">
              Sześćdziesiąt najczęstszych pytań z konsultacji projektowych — w jednym miejscu. Odpowiedzi pisane przez
              naszych inżynierów, nie skopiowane z internetu.
            </p>
            <a
              href="#kontakt"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              Nie znalazłeś odpowiedzi? Zapytaj eksperta
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-black/10 border-y border-black/10">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="py-5">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-start justify-between gap-6 text-left"
                      aria-expanded={open}
                    >
                      <span className="text-base font-semibold leading-snug tracking-tight md:text-lg">
                        {f.q}
                      </span>
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15">
                        {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pr-12 pt-4 text-sm leading-relaxed text-black/70 md:text-base">
                        {f.a}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- MORE READS ---------- */}
        {more.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between gap-6">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">Więcej z bazy wiedzy</h3>
              <Link
                to="/wiedza"
                className="text-xs uppercase tracking-widest text-black/50 hover:text-black"
              >
                Wszystkie →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {more.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to="/wiedza/$category/$slug"
                    params={{
                      category: matchCategory(`${m.title} ${m.excerpt}`),
                      slug: m.slug,
                    }}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-black/5 bg-white p-5 transition-all hover:border-black/20 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
                  >
                    <FileText className="h-4 w-4 text-black/40" />
                    <h4 className="text-[15px] font-semibold leading-snug tracking-tight line-clamp-3">
                      {m.title}
                    </h4>
                    <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium">
                      Czytaj <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
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
      install: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80",
      quote: "Profesjonalizm na każdym etapie. Rachunki spadły o 60%, a komfort wzrósł.",
      rating: 5,
    },
    {
      name: "Magdalena R.",
      city: "Kraków",
      install: "https://images.unsplash.com/photo-1605579375923-cb44c98e9e98?w=800&q=80",
      quote: "Pomogli mi przejść przez Czyste Powietrze. Zero stresu, wszystko zorganizowane.",
      rating: 5,
    },
    {
      name: "Jakub W.",
      city: "Poznań",
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
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-black"
                    style={{ background: `${GOLD}33`, border: `1px solid ${GOLD}` }}
                    aria-hidden
                  >
                    {t.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  </div>
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
                <MapPin className="h-3.5 w-3.5" /> <span>Otwórz w mapach</span>
              </a>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-black/40">Kontakt</div>
              <a href="tel:+48000000000" className="mt-3 flex items-center gap-2 text-sm text-black/80">
                <Phone className="h-3.5 w-3.5" /> <span>+48 000 000 000</span>
              </a>
              <a href="mailto:biuro@soltimus.pl" className="mt-2 flex items-center gap-2 text-sm text-black/80">
                <Mail className="h-3.5 w-3.5" /> <span>biuro@soltimus.pl</span>
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
          <div>© 2026 Soltimus. Wszelkie prawa zastrzeżone.</div>
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
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden"
    >
      <a
        href="tel:+48000000000"
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Zadzwoń"
      >
        <Phone className="h-4 w-4" />
      </a>
      <a
        href="https://wa.me/48000000000"
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <a
        href="#kontakt"
        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-black"
        style={{ background: `linear-gradient(135deg, ${GOLD}, #FFD24A)` }}
      >
        Darmowa konsultacja <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

/* ------------------------ MODERN LIVING MANIFESTO ------------------------ */
function ModernLivingManifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-5 py-24 md:grid-cols-12 md:gap-12 md:px-8 md:py-40">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <SectionLabel>Modern living</SectionLabel>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            Komfort, którego <span className="italic font-light text-black/60">nie słychać</span>.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-black/60 md:text-lg">
            Projektujemy systemy dla domów, w których dziecko zasypia przy
            21°C, kawa pachnie świeżym powietrzem, a rachunek za prąd nie
            psuje niedzielnego śniadania.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-black/60 md:text-lg">
            To nie jest sprzęt. To architektura codziennego dobrostanu.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-black/5 pt-8">
            <div>
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">21°C</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-black/40">
                stała temperatura — cały rok
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">23 dB</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-black/40">
                ciszej niż szept
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 md:col-span-7 md:mt-0">
          <div className="grid grid-cols-6 gap-3 md:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-4 aspect-[4/5] overflow-hidden rounded-3xl bg-black"
            >
              <motion.img
                style={{ scale }}
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=85"
                alt="Wieczorny salon"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-2 mt-12 aspect-[3/4] overflow-hidden rounded-3xl bg-black md:mt-20"
            >
              <motion.img
                style={{ y }}
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85"
                alt="Naturalne światło"
                className="h-[120%] w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-3 aspect-[5/4] overflow-hidden rounded-3xl bg-black"
            >
              <img
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=85"
                alt="Rodzina"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-3 aspect-[5/4] overflow-hidden rounded-3xl bg-black"
            >
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=85"
                alt="Wieczorne wnętrze"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- LIFESTYLE GALLERY --------------------------- */
function LifestyleGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yC = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const tiles = [
    {
      img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=85",
      tag: "Dom jednorodzinny",
      sub: "Konstancin",
      y: yA,
      h: "h-[420px] md:h-[560px]",
    },
    {
      img: "https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=1200&q=85",
      tag: "Apartament premium",
      sub: "Mokotów",
      y: yB,
      h: "h-[340px] md:h-[440px]",
    },
    {
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85",
      tag: "Rezydencja",
      sub: "Józefosław",
      y: yC,
      h: "h-[460px] md:h-[600px]",
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAFAF7] px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel>Domy, w których pracujemy</SectionLabel>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              Architektura.
              <br />
              <span className="italic font-light text-black/60">Komfort.</span> Niezależność.
            </h2>
          </div>
          <p className="text-base text-black/60 md:col-span-5 md:text-lg">
            Współpracujemy z architektami, generalnymi wykonawcami i właścicielami
            nieruchomości premium. Każdy dom traktujemy jak jednorazowy projekt
            inżynierski — bo nim jest.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          {tiles.map((t, i) => (
            <motion.figure
              key={t.tag}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl bg-black ${t.h} ${
                i === 1 ? "md:translate-y-16" : ""
              } ${i === 2 ? "md:-translate-y-6" : ""}`}
            >
              <motion.img
                style={{ y: t.y }}
                src={t.img}
                alt={t.tag}
                className="h-[120%] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <div
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: GOLD }}
                >
                  {t.sub}
                </div>
                <div className="mt-2 text-xl font-semibold md:text-2xl">{t.tag}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- CINEMATIC QUOTE --------------------------- */
function CinematicQuote({
  image,
  quote,
  author,
}: {
  image: string;
  quote: string;
  author: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative isolate h-[70vh] min-h-[520px] overflow-hidden bg-black md:h-[85vh]"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[130%]">
        <img src={image} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-5 text-center md:px-8"
      >
        <span
          className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/60"
        >
          <span className="h-px w-10" style={{ background: GOLD }} />
          Manifest
        </span>
        <Quote className="mb-6 h-7 w-7" style={{ color: GOLD }} />
        <p className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-light italic leading-[1.15] tracking-tight text-white">
          „{quote}"
        </p>
        <div className="mt-10 text-xs uppercase tracking-[0.3em] text-white/50">{author}</div>
      </motion.div>
    </section>
  );
}

/* ---------------------------- BEHIND THE SCENES ---------------------------- */
function BehindTheScenes() {
  const items = [
    {
      img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=85",
      tag: "Magazyn",
      title: "Własny magazyn części",
      desc: "Kluczowe komponenty Daikin zawsze pod ręką. Reakcja serwisu w 24h.",
      stat: "1 200 m²",
      statLabel: "powierzchni",
    },
    {
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1400&q=85",
      tag: "Projektowanie",
      title: "Biuro inżynierskie",
      desc: "Bilans cieplny, dobór mocy, symulacje — zanim cokolwiek pojedzie na budowę.",
      stat: "5 inżynierów",
      statLabel: "etatowo",
    },
    {
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=85",
      tag: "Koordynacja",
      title: "Operations & logistyka",
      desc: "Dedykowany opiekun projektu. Planowanie ekip, dostaw, harmonogramów.",
      stat: "8 ekip",
      statLabel: "własnych",
    },
    {
      img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=85",
      tag: "Montaż",
      title: "Mobilne brygady",
      desc: "Każda ekipa ma uprawnienia UDT, F-Gazy i SEP. Bez podwykonawców.",
      stat: "100%",
      statLabel: "in-house",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel>Za kulisami</SectionLabel>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              Organizacja, której <span className="italic font-light text-black/60">nie widać</span> — ale czuć.
            </h2>
          </div>
          <p className="text-base text-black/60 md:col-span-5 md:text-lg">
            Soltimus to nie dwóch monterów z busem. To zespół 40+ osób, magazyn,
            biuro projektowe i logistyka, która sprawia, że Twoja instalacja idzie
            jak w zegarku.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl bg-[#0E0E10] text-white ${
                i % 3 === 0 ? "md:translate-y-0" : ""
              } ${i === 1 ? "md:translate-y-12" : ""} ${i === 3 ? "md:translate-y-12" : ""}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  className="h-full w-full object-cover opacity-90 transition-all duration-[1400ms] group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div
                  className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur"
                  style={{ color: GOLD }}
                >
                  {it.tag}
                </div>
                <div className="absolute bottom-5 right-5 text-right">
                  <div className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {it.stat}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">
                    {it.statLabel}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-7 md:p-8">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {it.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{it.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
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
