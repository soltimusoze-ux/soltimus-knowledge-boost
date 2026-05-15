import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
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
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  fetchArticleBySlug,
  fetchPublicArticles,
} from "@/lib/wp-public.functions";
import {
  KNOWLEDGE_CATEGORIES,
  categoryBySlug,
  matchCategory,
} from "@/lib/knowledge-categories";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { CategoryIcon } from "@/components/knowledge/CategoryIcon";

export const Route = createFileRoute("/wiedza/$category/$slug")({
  beforeLoad: ({ params }) => {
    if (!categoryBySlug(params.category)) throw notFound();
  },
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.slug).replace(/-/g, " ")} — Soltimus Knowledge Hub` },
      {
        name: "description",
        content:
          "Pogłębiona analiza inżynierska Soltimus — pompy ciepła, fotowoltaika, magazyny energii.",
      },
    ],
  }),
  component: ArticlePage,
});

const FALLBACK = "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1800&q=80";

function ArticlePage() {
  const { category, slug } = Route.useParams();
  const cat = categoryBySlug(category)!;
  const fSlug = useServerFn(fetchArticleBySlug);
  const fAll = useServerFn(fetchPublicArticles);

  const { data, isLoading } = useQuery({
    queryKey: ["wp", "article", slug],
    queryFn: () => fSlug({ data: { slug } }),
    staleTime: 10 * 60 * 1000,
  });
  const { data: allData } = useQuery({
    queryKey: ["wp", "articles", "hub"],
    queryFn: () => fAll(),
    staleTime: 5 * 60 * 1000,
  });

  const post = data?.post;
  const related = (allData?.posts ?? [])
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Build TOC + JSON-LD from content
  const { tocItems, contentHtml } = useMemo(() => {
    if (!post?.content) return { tocItems: [] as { id: string; text: string }[], contentHtml: "" };
    let html = post.content;
    const toc: { id: string; text: string }[] = [];
    html = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (_m, _attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id =
        "sec-" +
        text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 60);
      toc.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    });
    return { tocItems: toc, contentHtml: html };
  }, [post?.content]);

  const jsonLd = post && {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image ? [post.image] : undefined,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Soltimus" },
    publisher: {
      "@type": "Organization",
      name: "Soltimus",
      logo: { "@type": "ImageObject", url: "https://soltimus.pl/favicon.ico" },
    },
    articleSection: cat.name,
  };

  if (isLoading) return <ArticleSkeleton cat={cat} />;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAF7]">
        <KnowledgeNav trail={[{ label: "Knowledge Hub", to: "/wiedza" }, { label: cat.name }]} />
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">Nie znaleziono</div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Ten artykuł nie istnieje lub został przeniesiony.
          </h1>
          <Link
            to="/wiedza/$category"
            params={{ category }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Wróć do {cat.name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-black">
      {/* progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
        style={{ scaleX: x, background: cat.accent }}
      />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <ArticleStyles />

      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: cat.name, to: `/wiedza/${category}` as any },
          { label: post.title.slice(0, 38) + (post.title.length > 38 ? "…" : "") },
        ]}
      />

      {/* CINEMATIC HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="relative h-[68vh] min-h-[460px] w-full">
          <img
            src={post.image ?? FALLBACK}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-16 md:px-8 md:pb-24">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: `${cat.accent}26` }}
              >
                <CategoryIcon
                  iconKey={cat.iconKey}
                  className="h-3.5 w-3.5"

                  style={{ color: cat.accent }}
                />
              </div>
              <Link to="/wiedza/$category" params={{ category }} className="hover:text-white">
                {cat.name}
              </Link>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime ?? 6} min
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 max-w-4xl text-[clamp(2rem,5.5vw,4.4rem)] font-semibold leading-[1.02] tracking-tight"
            >
              {post.title}
            </motion.h1>
            {post.excerpt && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                {post.excerpt}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.2em] text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-[#F5B800]" />
                Redakcja Soltimus
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BODY: TOC + content */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          {/* TOC */}
          <aside className="lg:sticky lg:top-32 lg:col-span-3 lg:self-start">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                Spis treści
              </div>
              {tocItems.length > 0 ? (
                <ol className="mt-4 space-y-2.5 text-sm">
                  {tocItems.map((item, i) => (
                    <li key={item.id} className="flex gap-3">
                      <span className="w-5 shrink-0 text-[10px] font-mono text-black/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${item.id}`}
                        className="text-black/70 transition-colors hover:text-black"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 text-sm text-black/50">
                  Krótki artykuł — bez sekcji.
                </p>
              )}
            </div>
          </aside>

          {/* CONTENT */}
          <article className="lg:col-span-9">
            <div
              className="editorial"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Inline expert callout */}
            <div className="mt-12 flex gap-5 rounded-2xl border-l-4 border-[#0089CF] bg-white p-6 md:p-8">
              <Quote className="h-8 w-8 shrink-0 text-[#0089CF]/30" />
              <div>
                <p className="text-base italic leading-relaxed text-black/80 md:text-lg">
                  „Dobre rozwiązanie HVAC nie polega na zakupie najlepszego urządzenia,
                  lecz na właściwym jego doborze do bryły budynku, hydrauliki i profilu
                  użytkowania.”
                </p>
                <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-black/50">
                  Dział projektowy Soltimus
                </div>
              </div>
            </div>

            <FaqBlock category={cat.name} />

            {/* Article CTA */}
            <div className="mt-16 overflow-hidden rounded-3xl bg-black p-8 text-white md:p-12">
              <div className="grid gap-8 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                    Konsultacja inżynierska
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                    Chcesz przedyskutować swój projekt z naszym inżynierem?
                  </h3>
                  <p className="mt-3 max-w-xl text-sm text-white/60 md:text-base">
                    25-minutowa rozmowa, bez handlowca. Otrzymasz konkretne odpowiedzi
                    dopasowane do Twojego budynku.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                  <Link
                    to="/premium"
                    hash="kontakt"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-[#F5B800]"
                  >
                    <Phone className="h-4 w-4" /> Umów rozmowę
                  </Link>
                  <a
                    href="https://wa.me/48000000000"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white hover:border-white"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="border-t border-black/5 bg-white px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Czytaj dalej
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Powiązane materiały
            </h3>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((r, i) => {
                const c = matchCategory(`${r.title} ${r.excerpt}`);
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to="/wiedza/$category/$slug"
                      params={{ category: c, slug: r.slug }}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-[#FAFAF7] transition-all hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-black/5">
                        <img
                          src={r.image ?? FALLBACK}
                          alt={r.title}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#0089CF]">
                          {r.readingTime ?? 5} min
                        </span>
                        <h4 className="text-base font-semibold leading-snug tracking-tight line-clamp-3 md:text-lg">
                          {r.title}
                        </h4>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <Link
              to="/wiedza/$category"
              params={{ category }}
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Wróć do {cat.name}
            </Link>
          </div>
        </section>
      )}

      {/* Explore other categories */}
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
                  c.slug === category
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white text-black/70 hover:border-black"
                }`}
              >
                {c.name}
                {c.slug !== category && <ArrowRight className="h-3 w-3" />}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- helpers ---------- */

function FaqBlock({ category }: { category: string }) {
  const faqs = [
    {
      q: `Czy oferta ${category.toLowerCase()} obejmuje również projekt techniczny?`,
      a: "Tak. Każda realizacja Soltimus startuje od audytu i projektu — to gwarancja, że dobór mocy, hydraulika i sterowanie są dopasowane do Twojego budynku, a nie do średniej rynkowej.",
    },
    {
      q: "Jakie dotacje mogę uzyskać?",
      a: "W zależności od konfiguracji: Czyste Powietrze (do 135 000 zł), Mój Prąd, ulga termomodernizacyjna oraz programy regionalne. Skuteczność naszych wniosków wynosi 98,7%.",
    },
    {
      q: "Czy dostanę gwarancję serwisową po montażu?",
      a: "5 lat na pompę ciepła Daikin (autoryzowany serwis), 12 lat na panele PV, 10 lat na falownik. Reakcja serwisu w 24h na terenie województwa.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-16">
      <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">FAQ</div>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
        Najczęstsze pytania
      </h3>
      <div className="mt-8 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/5 bg-white">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
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
              {isOpen && (
                <div className="px-6 pb-6 text-sm leading-relaxed text-black/70 md:text-base">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArticleSkeleton({ cat }: { cat: any }) {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <KnowledgeNav trail={[{ label: "Knowledge Hub", to: "/wiedza" }, { label: cat.name }]} />
      <div className="h-[60vh] animate-pulse bg-black/10" />
      <div className="mx-auto max-w-4xl space-y-4 px-5 py-20 md:px-8">
        <div className="h-8 w-3/4 animate-pulse rounded bg-black/10" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-black/10" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-black/10" />
      </div>
    </div>
  );
}

/* Editorial typography (scoped via .editorial class) */
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
        .editorial p:first-of-type::first-letter {
          font-size: 3.2em; float: left; line-height: 0.9; padding: 0.05em 0.12em 0 0;
          font-weight: 600; color: #0089CF;
        }
        .editorial h2 {
          font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 600; line-height: 1.15;
          letter-spacing: -0.01em; margin: 2.6em 0 0.8em; scroll-margin-top: 7rem;
        }
        .editorial h2::before {
          content: ""; display: block; width: 36px; height: 2px;
          background: #0089CF; margin-bottom: 0.8em;
        }
        .editorial h3 {
          font-size: 1.25rem; font-weight: 600; margin: 2em 0 0.6em; letter-spacing: -0.005em;
        }
        .editorial a { color: #0089CF; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .editorial a:hover { color: #006FA8; }
        .editorial strong { color: #000; font-weight: 600; }
        .editorial em { font-style: italic; color: rgba(0,0,0,0.85); }
        .editorial ul, .editorial ol { margin: 0 0 1.6em 1.2em; padding: 0; }
        .editorial ul li, .editorial ol li {
          margin: 0.55em 0; color: rgba(0,0,0,0.78); padding-left: 0.3em;
        }
        .editorial ul li::marker { color: #0089CF; }
        .editorial ol li::marker { color: #0089CF; font-weight: 600; }
        .editorial blockquote {
          margin: 2em 0; padding: 1.4em 1.6em; border-left: 3px solid #F5B800;
          background: #fff; border-radius: 0 14px 14px 0;
          font-size: 1.05em; font-style: italic; color: rgba(0,0,0,0.85);
        }
        .editorial img {
          width: 100%; height: auto; border-radius: 18px; margin: 2.2em 0;
          box-shadow: 0 30px 60px -30px rgba(0,0,0,0.25);
        }
        .editorial figure { margin: 2.2em 0; }
        .editorial figcaption {
          font-size: 0.85em; color: rgba(0,0,0,0.5); text-align: center; margin-top: 0.6em;
        }
        .editorial table {
          width: 100%; border-collapse: collapse; margin: 2em 0; font-size: 0.95em;
          background: #fff; border-radius: 14px; overflow: hidden;
          box-shadow: 0 4px 24px -10px rgba(0,0,0,0.08);
        }
        .editorial th, .editorial td {
          padding: 0.85em 1em; text-align: left; border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .editorial th {
          background: #FAFAF7; font-weight: 600;
          font-size: 0.7em; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(0,0,0,0.55);
        }
        .editorial code {
          background: #0E0E10; color: #F5B800; padding: 0.15em 0.45em;
          border-radius: 6px; font-size: 0.88em; font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
        .editorial iframe, .editorial .video-embed {
          width: 100%; aspect-ratio: 16/9; border-radius: 18px; margin: 2em 0;
          box-shadow: 0 30px 60px -30px rgba(0,0,0,0.3);
        }
        .editorial hr {
          border: 0; height: 1px; background: rgba(0,0,0,0.08); margin: 3em auto; width: 80px;
        }
      `,
      }}
    />
  );
}
