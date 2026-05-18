import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import {
  fetchPublicArticles,
  fetchPublicVideos,
} from "@/lib/wp-public.functions";
import {
  KNOWLEDGE_CATEGORIES,
  matchCategory,
} from "@/lib/knowledge-categories";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { CategoryIcon } from "@/components/knowledge/CategoryIcon";
import gruntowaPompaHero from "@/assets/gruntowa-pompa-hero.jpg";

const IMAGE_OVERRIDES: Record<string, string> = {
  "gruntowa-pompa-ciepla-jak-dziala-ile-kosztuje-i-czy-ma-wady-kompletny-przewodnik":
    gruntowaPompaHero,
};

function postImage(post: any): string {
  return IMAGE_OVERRIDES[post?.slug] ?? post?.image ?? FALLBACK;
}

export const Route = createFileRoute("/wiedza/")({
  head: () => ({
    meta: [
      {
        title:
          "Knowledge Hub — Soltimus | Inżynierska wiedza o pompach ciepła, PV i magazynach energii",
      },
      {
        name: "description",
        content:
          "Premium baza wiedzy HVAC/OZE: pompy ciepła, fotowoltaika, magazyny energii, dotacje, hydraulika, Engineering Lab. Pisane przez inżynierów Soltimus.",
      },
      { property: "og:title", content: "Soltimus Knowledge Hub" },
      {
        property: "og:description",
        content:
          "Inżynierska wiedza o pompach ciepła, fotowoltaice i magazynach energii — bez marketingu, z liczbami z realnych instalacji.",
      },
    ],
  }),
  component: WiedzaIndex,
});

const FALLBACK = "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1600&q=80";

function WiedzaIndex() {
  const fA = useServerFn(fetchPublicArticles);
  const fV = useServerFn(fetchPublicVideos);
  const { data: aData, isLoading } = useQuery({
    queryKey: ["wp", "articles", "hub"],
    queryFn: () => fA(),
    staleTime: 5 * 60 * 1000,
  });
  const { data: vData } = useQuery({
    queryKey: ["wp", "videos", "hub"],
    queryFn: () => fV(),
    staleTime: 5 * 60 * 1000,
  });

  const articles = aData?.posts ?? [];
  const videos = (vData?.posts ?? []).filter((v) => v.videoId);
  const lead = articles[0];
  const editorial = articles.slice(1, 4);
  const more = articles.slice(4, 10);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-black">
      <KnowledgeNav trail={[{ label: "Knowledge Hub" }]} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/5 bg-white px-5 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,137,207,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(245,184,0,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-black/60">
              <Sparkles className="h-3 w-3 text-[#F5B800]" />
              Engineering Knowledge Platform
            </div>
            <h1 className="mt-8 text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.98] tracking-tight">
              Wiedza, którą piszą
              <br />
              <span className="italic font-light text-black/70">
                inżynierowie, nie copywriterzy.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
              Knowledge Hub Soltimus to baza wiedzy dla wymagających inwestorów,
              projektantów i instalatorów. Bez marketingowej waty —
              tylko fizyka, liczby, doświadczenie z 1000+ realizacji.
            </p>
          </motion.div>

          {/* category strip */}
          <div className="mt-16 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-3">
            {KNOWLEDGE_CATEGORIES.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
              >
                <Link
                  to="/wiedza/$category"
                  params={{ category: c.slug }}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_18px_50px_-22px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: `${c.accent}12` }}
                    >
                      <CategoryIcon
                        iconKey={c.iconKey}
                        className="h-5 w-5"

                        style={{ color: c.accent }}
                      />
                    </div>
                    <ArrowRight className="h-4 w-4 text-black/20 transition-all group-hover:translate-x-0.5 group-hover:text-black" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold tracking-tight">
                      {c.name}
                      {c.slug === "engineering-lab" && (
                        <span className="ml-2 inline-flex translate-y-[-2px] items-center rounded-full bg-black px-1.5 py-0.5 align-middle text-[8px] font-medium uppercase tracking-widest text-white">
                          Lab
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-black/40">
                      {c.short}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-black/60">
                      {c.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD ARTICLE */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker="Artykuł tygodnia"
            title="Materiał redakcyjny"
            sub="Najnowszy wpis naszego zespołu inżynierskiego."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {isLoading && !lead ? (
              <div className="h-[520px] animate-pulse rounded-3xl bg-black/5 lg:col-span-8" />
            ) : lead ? (
              <ArticleHeroCard post={lead} />
            ) : null}
            <div className="flex flex-col gap-3 lg:col-span-4">
              {(isLoading && editorial.length === 0
                ? Array.from({ length: 3 }).map((_, i) => ({ id: i, _loading: true } as any))
                : editorial
              ).map((s: any) => (
                <SideArticleCard key={s.id} post={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING LAB callout */}
      <section className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5B800]" />
              Engineering Lab
            </div>
            <h2 className="mt-6 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
              Tam, gdzie inni piszą poradniki,
              <br />
              <span className="italic font-light text-white/70">my prowadzimy eksperymenty.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Engineering Lab to nasza pogłębiona analiza fizyki budynku,
              bezwładności cieplnej, hydrauliki, cykli defrost i przepływów.
              Studia przypadków z prawdziwymi danymi pomiarowymi z naszych instalacji.
            </p>
            <Link
              to="/wiedza/$category"
              params={{ category: "engineering-lab" }}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-[#F5B800]"
            >
              Wejdź do Lab
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-5">
            {[
              { v: "ΔT = 5K", l: "Dobór niskotemperaturowy" },
              { v: "COP 4.2", l: "Pomiar @ -7°C" },
              { v: "98.7%", l: "Skuteczność dotacji" },
              { v: "1200 m²", l: "Magazyn części" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
              >
                <div className="font-mono text-xl tracking-tight text-[#F5B800] md:text-2xl">
                  {s.v}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-widest text-white/50">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MORE READS */}
      {more.length > 0 && (
        <section className="px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Najnowsze publikacje"
              title="Świeże analizy i poradniki"
              sub="Każda pozycja redagowana przez naszych projektantów lub serwisantów."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {more.map((m, i) => (
                <SmallArticleCard key={m.id} post={m} idx={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SOLTIMUS LAB TEASER */}
      {videos.length > 0 && (
        <section className="relative overflow-hidden bg-[#0A0A0A] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="pointer-events-none absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(245,184,0,0.12),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/70">
                  <Play className="h-3 w-3 text-[#F5B800]" fill="currentColor" />
                  Soltimus Lab · Engineering TV
                </div>
                <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-tight tracking-tight">
                  Cztery serie. Setki odcinków.
                  <br />
                  <span className="italic font-light text-white/70">
                    Inżynieria, którą widać.
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-white/60 md:text-lg">
                  Engineering Lab, HVAC Myths, Premium Case Studies i Expert Answers —
                  cinematic platforma wideo Soltimus.
                </p>
                <Link
                  to="/lab"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all hover:bg-[#F5B800]"
                >
                  Wejdź do Soltimus Lab
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {videos.slice(0, 4).map((v) => (
                  <Link
                    key={v.id}
                    to="/lab"
                    className="group relative aspect-[4/5] w-[140px] overflow-hidden rounded-xl bg-black md:w-[160px]"
                  >
                    <img
                      src={postImage(v)}
                      alt={v.title}
                      className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-xl">
                      <Play className="h-3.5 w-3.5 translate-x-0.5 text-black" fill="black" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <FooterCTA />
    </div>
  );
}

/* ---------- shared in-file components ---------- */

function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">{kicker}</div>
      <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold leading-tight tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-3 text-sm text-black/60 md:text-base">{sub}</p>}
    </div>
  );
}

function ArticleHeroCard({ post }: { post: any }) {
  const cat = matchCategory(`${post.title} ${post.excerpt}`);
  return (
    <Link
      to="/wiedza/$category/$slug"
      params={{ category: cat, slug: post.slug }}
      className="group relative col-span-1 flex flex-col overflow-hidden rounded-3xl bg-black lg:col-span-8"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/10]">
        <img
          src={postImage(post)}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur">
          <Sparkles className="h-3 w-3 text-[#F5B800]" />
          Lead story
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-3 max-w-xl text-sm text-white/70 line-clamp-2 md:text-base">
              {post.excerpt}
            </p>
          )}
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
            Czytaj pełny artykuł
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function SideArticleCard({ post }: { post: any }) {
  if (post._loading) {
    return <div className="h-32 animate-pulse rounded-2xl bg-black/5" />;
  }
  const cat = matchCategory(`${post.title} ${post.excerpt}`);
  return (
    <Link
      to="/wiedza/$category/$slug"
      params={{ category: cat, slug: post.slug }}
      className="group flex gap-4 rounded-2xl border border-black/5 bg-white p-4 transition-all hover:border-black/20 hover:shadow-[0_14px_40px_-22px_rgba(0,0,0,0.18)]"
    >
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-black/5 md:h-28 md:w-28">
        <img
          src={postImage(post)}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        <span className="text-[10px] uppercase tracking-widest text-[#0089CF]">
          {post.readingTime ?? 5} min czytania
        </span>
        <h4 className="text-sm font-semibold leading-snug tracking-tight line-clamp-3 md:text-base">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}

function SmallArticleCard({ post, idx }: { post: any; idx: number }) {
  const cat = matchCategory(`${post.title} ${post.excerpt}`);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: idx * 0.05, duration: 0.5 }}
    >
      <Link
        to="/wiedza/$category/$slug"
        params={{ category: cat, slug: post.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_18px_50px_-22px_rgba(0,0,0,0.18)]"
      >
        <div className="aspect-[16/10] overflow-hidden bg-black/5">
          <img
            src={postImage(post)}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#0089CF]">
            {post.readingTime ?? 5} min · Artykuł
          </span>
          <h4 className="text-base font-semibold leading-snug tracking-tight line-clamp-3 md:text-lg">
            {post.title}
          </h4>
          {post.excerpt && (
            <p className="mt-auto text-sm text-black/60 line-clamp-2">{post.excerpt}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function FooterCTA() {
  return (
    <section className="border-t border-black/5 bg-[#FAFAF7] px-5 py-24 text-center md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Konsultacja inżynierska
        </div>
        <h3 className="mt-4 text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-tight tracking-tight">
          Pytanie, na które nie znalazłeś odpowiedzi?
        </h3>
        <p className="mt-4 text-black/60 md:text-lg">
          Bezpłatna rozmowa z inżynierem Soltimus — 25 minut, bez handlowca, bez presji.
        </p>
        <Link
          to="/premium"
          hash="kontakt"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#0089CF]"
        >
          Umów konsultację
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
