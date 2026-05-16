import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  Film,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { fetchPublicVideos } from "@/lib/wp-public.functions";
import { VIDEO_SERIES, matchSeries } from "@/lib/video-series";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import {
  VideoPlayerModal,
  type PlayableVideo,
} from "@/components/knowledge/VideoPlayerModal";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      {
        title:
          "Soltimus Lab — Engineering TV | Cinematic wiedza o pompach ciepła i OZE",
      },
      {
        name: "description",
        content:
          "Soltimus Lab to inżynierska platforma wideo: Engineering Lab, HVAC Myths, Premium Case Studies i Expert Answers. Pomiary, fizyka, realne instalacje.",
      },
      { property: "og:title", content: "Soltimus Lab — Engineering TV" },
      {
        property: "og:description",
        content:
          "Premium video platform Soltimus: eksperymenty inżynierskie, mity HVAC obalane danymi, case studies z liczbami przed/po.",
      },
    ],
  }),
  component: LabPage,
});

const FALLBACK =
  "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1800&q=80";

function LabPage() {
  const fn = useServerFn(fetchPublicVideos);
  const { data, isLoading } = useQuery({
    queryKey: ["wp", "videos", "hub"],
    queryFn: () => fn(),
    staleTime: 5 * 60 * 1000,
  });
  const [active, setActive] = useState<PlayableVideo | null>(null);

  const videos = (data?.posts ?? []).filter((v) => v.videoId);
  const hero = videos[0];

  const grouped = useMemo(() => {
    const map: Record<string, typeof videos> = {};
    VIDEO_SERIES.forEach((s) => (map[s.slug] = []));
    videos.forEach((v) => {
      const s = matchSeries(`${v.title} ${v.excerpt}`);
      map[s].push(v);
    });
    // ensure every series has at least one fallback item if possible
    VIDEO_SERIES.forEach((s, i) => {
      if (map[s.slug].length === 0 && videos.length > 0) {
        map[s.slug] = [videos[(i + 1) % videos.length]];
      }
    });
    return map;
  }, [videos]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <KnowledgeNav trail={[{ label: "Knowledge Hub", to: "/wiedza" }, { label: "Soltimus Lab" }]} />

      {/* CINEMATIC HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          {hero && (
            <img
              src={hero.image ?? FALLBACK}
              alt=""
              className="h-full w-full scale-105 object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-[#0A0A0A]" />
          <div className="absolute -right-32 top-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(245,184,0,0.18),transparent_70%)]" />
          <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,137,207,0.15),transparent_70%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/75 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5B800]" />
              Soltimus Lab · Engineering TV
            </div>
            <h1 className="mt-8 text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tight">
              Inżynieria,
              <br />
              <span className="italic font-light text-white/70">
                którą widać na własne oczy.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Premium platforma wideo Soltimus. Eksperymenty z fizyki budynku,
              cinematic case studies, mity HVAC obalane pomiarami i odpowiedzi
              naszych inżynierów na pytania, które dostajemy najczęściej.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => hero && setActive(hero)}
                disabled={!hero}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all hover:bg-[#F5B800] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-colors group-hover:bg-white group-hover:text-black">
                  <Play className="h-3 w-3 translate-x-px" fill="currentColor" />
                </span>
                Odtwórz feature episode
              </button>
              <a
                href="#series"
                className="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white"
              >
                Przeglądaj serie ↓
              </a>
            </div>
          </motion.div>

          {/* meta strip */}
          <div className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:grid-cols-4">
            {[
              { v: "120+", l: "Epizodów" },
              { v: "4", l: "Serie premium" },
              { v: "5.0 ★", l: "263+ opinii" },
              { v: "4K", l: "Cinematic" },
            ].map((m) => (
              <div key={m.l} className="bg-[#0A0A0A]/60 px-5 py-5">
                <div className="font-mono text-xl tracking-tight text-[#F5B800] md:text-2xl">
                  {m.v}
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERIES NAV */}
      <section id="series" className="border-t border-white/5 bg-[#0A0A0A] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Cztery serie. Jedna filozofia.
              </div>
              <h2 className="mt-4 text-[clamp(1.8rem,4.4vw,3.2rem)] font-semibold leading-tight tracking-tight">
                Każdy odcinek prowadzi inżynier Soltimus.
              </h2>
            </div>
            <Link
              to="/wiedza"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70 hover:border-white hover:text-white"
            >
              Wróć do Knowledge Hub
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {VIDEO_SERIES.map((s, i) => {
              const v = grouped[s.slug]?.[0];
              return (
                <motion.button
                  type="button"
                  key={s.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  onClick={() => v && setActive(v)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/8 bg-black text-left"
                >
                  {v?.image && (
                    <img
                      src={v.image}
                      alt={v.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-[1400ms] group-hover:scale-110 group-hover:opacity-65"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: s.accent }}
                  />
                  <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] uppercase tracking-[0.3em]"
                        style={{ color: s.accent }}
                      >
                        {s.kicker}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-black">
                        <Play className="h-3 w-3 translate-x-px" fill="currentColor" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-[11px] uppercase tracking-widest text-white/50">
                        {s.tagline}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-white/65 line-clamp-3">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERIES RAILS */}
      <section className="bg-[#0E0E10] px-5 pb-24 pt-4 md:px-8">
        <div className="mx-auto max-w-7xl space-y-20">
          {VIDEO_SERIES.map((s) => {
            const list = grouped[s.slug] ?? [];
            if (list.length === 0) return null;
            return (
              <SeriesRail
                key={s.slug}
                series={s}
                videos={list}
                onPlay={setActive}
                loading={isLoading}
              />
            );
          })}
        </div>
      </section>

      {/* VERTICAL REELS (mobile-native vibe) */}
      {videos.length > 0 && (
        <section className="border-t border-white/5 bg-black px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
                  <Film className="h-3 w-3" />
                  Reels · Krótkie odpowiedzi
                </div>
                <h2 className="mt-3 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
                  Sześćdziesiąt sekund. Konkret.
                </h2>
              </div>
              <p className="max-w-md text-sm text-white/55">
                Vertical-first format. Pytanie inwestora → odpowiedź inżyniera →
                pomiar lub rysunek. Bez wody.
              </p>
            </div>
            <ReelsRow
              videos={videos.slice(0, 10)}
              onPlay={setActive}
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0A0A0A] px-5 py-24 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Soltimus Lab · For investors & engineers
          </div>
          <h2 className="mt-5 text-[clamp(1.8rem,4.4vw,3rem)] font-semibold leading-tight tracking-tight">
            Twój dom zasługuje na ten sam poziom analizy,
            <br />
            <span className="italic font-light text-white/70">co odcinek Lab.</span>
          </h2>
          <p className="mt-6 text-white/60 md:text-lg">
            25-minutowa konsultacja z inżynierem Soltimus — pokażemy Ci,
            jak twoje liczby wyglądają na tle naszych pomiarów.
          </p>
          <Link
            to="/premium"
            hash="kontakt"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-[#F5B800]"
          >
            <Phone className="h-4 w-4" />
            Umów konsultację inżynierską
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <VideoPlayerModal video={active} onClose={() => setActive(null)} />
    </div>
  );
}

/* ---------- in-file components ---------- */

function SeriesRail({
  series,
  videos,
  onPlay,
  loading,
}: {
  series: (typeof VIDEO_SERIES)[number];
  videos: any[];
  onPlay: (v: PlayableVideo) => void;
  loading: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: number) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth * 0.85;
    ref.current.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: series.accent }}
          >
            {series.kicker} · {series.tagline}
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {series.name}
          </h3>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
            aria-label="Poprzednie"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
            aria-label="Następne"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loading && videos.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video w-[78%] shrink-0 animate-pulse snap-start rounded-2xl bg-white/5 md:w-[42%] lg:w-[32%]"
              />
            ))
          : videos.map((v, i) => (
              <motion.button
                key={v.id}
                type="button"
                onClick={() => onPlay(v)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="group relative aspect-video w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl bg-black text-left md:w-[44%] lg:w-[32%]"
              >
                <img
                  src={v.image ?? FALLBACK}
                  alt={v.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div
                  className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur"
                  style={{ borderColor: `${series.accent}80` }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: series.accent }}
                  />
                  {series.name}
                </div>
                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                  <Play className="h-5 w-5 translate-x-0.5 text-black" fill="black" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h4 className="text-sm font-semibold leading-tight text-white line-clamp-2 md:text-base">
                    {v.title}
                  </h4>
                  <div className="mt-1.5 text-[10px] uppercase tracking-widest text-white/55">
                    {v.readingTime ?? 4} min · HD
                  </div>
                </div>
              </motion.button>
            ))}
      </div>
    </div>
  );
}

function ReelsRow({
  videos,
  onPlay,
}: {
  videos: any[];
  onPlay: (v: PlayableVideo) => void;
}) {
  return (
    <div className="mt-12 -mx-5 overflow-x-auto px-5 pb-3 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-3 md:gap-4">
        {videos.map((v, i) => (
          <motion.button
            type="button"
            key={v.id}
            onClick={() => onPlay(v)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            className="group relative aspect-[9/16] w-[55vw] shrink-0 overflow-hidden rounded-2xl bg-black text-left sm:w-[36vw] md:w-[220px] lg:w-[240px]"
          >
            <img
              src={v.image ?? FALLBACK}
              alt={v.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-[1100ms] group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur">
              <Sparkles className="h-2.5 w-2.5 text-[#F5B800]" />
              Reel
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-110">
                <Play className="h-4 w-4 translate-x-0.5 text-black" fill="black" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <h4 className="text-xs font-semibold leading-snug text-white line-clamp-3 md:text-sm">
                {v.title}
              </h4>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
