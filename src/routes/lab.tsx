import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  FileText,
  BookOpen,
  Clock,
} from "lucide-react";
import { fetchPublicVideos } from "@/lib/wp-public.functions";
import { VIDEO_SERIES, matchSeries } from "@/lib/video-series";
import { LAB_VIDEOS, parseVideoUrl, resolveThumbnail, type LabVideo } from "@/lib/lab-videos";
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

/** Unified card model — feeds both curated + WP videos into rails. */
type LabCard = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  series: string;
  image: string | null;
  duration?: string;
  tags?: string[];
  status: "published" | "coming-soon";
  /** Only present when status === "published" */
  play?: PlayableVideo;
};

function curatedToCard(v: LabVideo): LabCard {
  const parsed = parseVideoUrl(v.videoUrl);
  const play: PlayableVideo | undefined =
    v.status === "published" && parsed
      ? {
          id: v.id,
          title: v.title,
          videoId: parsed.id,
          videoProvider: parsed.provider,
          link: v.videoUrl,
        }
      : undefined;
  return {
    id: `curated-${v.id}`,
    slug: v.slug,
    title: v.title,
    description: v.description,
    series: v.series,
    image: resolveThumbnail(v),
    duration: v.duration,
    tags: v.tags,
    status: play ? "published" : "coming-soon",
    play,
  };
}

function wpToCard(v: any): LabCard {
  return {
    id: `wp-${v.id}`,
    title: v.title,
    description: v.excerpt,
    series: matchSeries(`${v.title} ${v.excerpt}`),
    image: v.image,
    duration: `${v.readingTime ?? 4} min`,
    status: "published",
    play: v,
  };
}

function LabPage() {
  const fn = useServerFn(fetchPublicVideos);
  const { data, isLoading } = useQuery({
    queryKey: ["wp", "videos", "hub"],
    queryFn: () => fn(),
    staleTime: 5 * 60 * 1000,
  });
  const [active, setActive] = useState<PlayableVideo | null>(null);

  const cards: LabCard[] = useMemo(() => {
    const curated = LAB_VIDEOS.map(curatedToCard);
    const wp = (data?.posts ?? [])
      .filter((v) => v.videoId)
      .map(wpToCard);
    // curated first (editorial control), then WP
    return [...curated, ...wp];
  }, [data]);

  const grouped = useMemo(() => {
    const map: Record<string, LabCard[]> = {};
    VIDEO_SERIES.forEach((s) => (map[s.slug] = []));
    cards.forEach((c) => {
      if (map[c.series]) map[c.series].push(c);
    });
    return map;
  }, [cards]);

  const featured = cards.find((c) => c.status === "published") ?? cards[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <KnowledgeNav trail={[{ label: "Knowledge Hub", to: "/wiedza" }, { label: "Soltimus Lab" }]} />

      {/* CINEMATIC HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          {featured && (
            <img
              src={featured.image ?? FALLBACK}
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
                onClick={() => featured?.play && setActive(featured.play)}
                disabled={!featured?.play}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all hover:bg-[#F5B800] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-colors group-hover:bg-white group-hover:text-black">
                  <Play className="h-3 w-3 translate-x-px" fill="currentColor" />
                </span>
                {featured?.play ? "Odtwórz feature episode" : "Wkrótce pierwszy odcinek"}
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
              { v: `${LAB_VIDEOS.length}+`, l: "Tematów w produkcji" },
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
              const list = grouped[s.slug] ?? [];
              const v = list.find((c) => c.status === "published") ?? list[0];
              return (
                <motion.button
                  type="button"
                  key={s.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  onClick={() => v?.play && setActive(v.play)}
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
                      <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                        {list.length} {list.length === 1 ? "odcinek" : "odcinków"}
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
          {VIDEO_SERIES.map((s) => (
            <SeriesRail
              key={s.slug}
              series={s}
              cards={grouped[s.slug] ?? []}
              onPlay={setActive}
              loading={isLoading}
            />
          ))}
        </div>
      </section>

      {/* PREMIUM CTA TRIO */}
      <section className="border-t border-white/5 bg-[#0A0A0A] px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Od oglądania do działania
            </div>
            <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-tight">
              Trzy ścieżki, jeden zespół inżynierski.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <CtaCard
              icon={<Phone className="h-4 w-4" />}
              kicker="Krok 1"
              title="Umów konsultację techniczną"
              desc="25 minut z inżynierem Soltimus. Analiza twoich liczb na tle naszych pomiarów."
              href="/premium#kontakt"
              accent="#F5B800"
            />
            <CtaCard
              icon={<FileText className="h-4 w-4" />}
              kicker="Krok 2"
              title="Prześlij projekt domu do analizy"
              desc="Dostajesz pisemną opinię techniczną z rekomendacją mocy, hydrauliki i źródła."
              href="/premium#projekt"
              accent="#0089CF"
            />
            <CtaCard
              icon={<BookOpen className="h-4 w-4" />}
              kicker="Krok 3"
              title="Zobacz Strefę Wiedzy"
              desc="Pełna baza artykułów eksperckich, FAQ i case studies — uzupełnienie do każdego odcinka."
              href="/wiedza"
              accent="#5FB46B"
            />
          </div>
        </div>
      </section>

      {/* VERTICAL REELS */}
      {cards.filter((c) => c.status === "published").length > 0 && (
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
              cards={cards.filter((c) => c.status === "published").slice(0, 10)}
              onPlay={setActive}
            />
          </div>
        </section>
      )}

      {/* FINAL CTA */}
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

function CtaCard({
  icon,
  kicker,
  title,
  desc,
  href,
  accent,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  desc: string;
  href: string;
  accent: string;
}) {
  const external = href.startsWith("/premium");
  const content = (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:border-white/25 hover:bg-white/[0.06]">
      <div
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          {icon}
          {kicker}
        </span>
        <ArrowRight className="h-4 w-4 text-white/35 transition-all group-hover:translate-x-1 group-hover:text-white" />
      </div>
      <h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight md:text-xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/55">{desc}</p>
    </div>
  );
  return external ? (
    <Link to="/premium" hash={href.split("#")[1]} className="block">
      {content}
    </Link>
  ) : (
    <Link to={href} className="block">
      {content}
    </Link>
  );
}

function ComingSoonCard({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="group relative aspect-video w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-dashed border-white/12 bg-gradient-to-br from-white/[0.04] to-transparent md:w-[44%] lg:w-[32%]">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: `${accent}18`, color: accent }}
        >
          <Sparkles className="h-5 w-5" />
        </span>
        <p className="mt-5 text-sm font-medium text-white/75">{label}</p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/35">
          Wkrótce kolejny materiał ekspercki
        </p>
      </div>
    </div>
  );
}

function SeriesRail({
  series,
  cards,
  onPlay,
  loading,
}: {
  series: (typeof VIDEO_SERIES)[number];
  cards: LabCard[];
  onPlay: (v: PlayableVideo) => void;
  loading: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const scroll = (dir: number) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth * 0.85;
    ref.current.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const hasAny = cards.length > 0;
  const publishedCount = cards.filter((c) => c.status === "published").length;

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
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
            {publishedCount > 0
              ? `${publishedCount} ${publishedCount === 1 ? "opublikowany" : "opublikowane"} · ${cards.length - publishedCount} w produkcji`
              : `${cards.length} ${cards.length === 1 ? "temat" : "tematy"} w produkcji`}
          </p>
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
        {loading && !hasAny ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video w-[78%] shrink-0 animate-pulse snap-start rounded-2xl bg-white/5 md:w-[42%] lg:w-[32%]"
            />
          ))
        ) : !hasAny ? (
          <ComingSoonCard
            accent={series.accent}
            label={`Pracujemy nad pierwszym odcinkiem serii „${series.name}”.`}
          />
        ) : (
          cards.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => c.play && onPlay(c.play)}
              disabled={!c.play}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="group relative aspect-video w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl bg-black text-left disabled:cursor-default md:w-[44%] lg:w-[32%]"
            >
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-95"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${series.accent}30, transparent 60%), linear-gradient(135deg, #0E0E10, #1a1a1d)`,
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div
                className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur"
                style={{ borderColor: `${series.accent}80` }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: series.accent }}
                />
                {series.name}
              </div>
              {c.status === "coming-soon" && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] text-white/85 backdrop-blur">
                  <Sparkles className="h-2.5 w-2.5 text-[#F5B800]" />
                  Wkrótce
                </div>
              )}
              <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                {c.play ? (
                  <Play className="h-5 w-5 translate-x-0.5 text-black" fill="black" />
                ) : (
                  <Clock className="h-5 w-5 text-black" />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h4 className="text-sm font-semibold leading-tight text-white line-clamp-2 md:text-base">
                  {c.title}
                </h4>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/55">
                  {c.duration && <span>{c.duration}</span>}
                  {c.duration && <span className="text-white/25">·</span>}
                  <span>{c.status === "published" ? "HD" : "W produkcji"}</span>
                </div>
              </div>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}

function ReelsRow({
  cards,
  onPlay,
}: {
  cards: LabCard[];
  onPlay: (v: PlayableVideo) => void;
}) {
  return (
    <div className="mt-12 -mx-5 overflow-x-auto px-5 pb-3 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-3 md:gap-4">
        {cards.map((c, i) => (
          <motion.button
            type="button"
            key={c.id}
            onClick={() => c.play && onPlay(c.play)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            className="group relative aspect-[9/16] w-[55vw] shrink-0 overflow-hidden rounded-2xl bg-black text-left sm:w-[36vw] md:w-[220px] lg:w-[240px]"
          >
            <img
              src={c.image ?? FALLBACK}
              alt={c.title}
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
                {c.title}
              </h4>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
