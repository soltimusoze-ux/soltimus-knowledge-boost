import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fetchPublicArticles } from "@/lib/wp-public.functions";
import {
  KNOWLEDGE_CATEGORIES,
  categoryBySlug,
  matchCategory,
} from "@/lib/knowledge-categories";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { CategoryIcon } from "@/components/knowledge/CategoryIcon";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/wiedza/$category")({
  beforeLoad: ({ params }) => {
    if (!categoryBySlug(params.category)) throw notFound();
  },
  head: ({ params }) => {
    const cat = categoryBySlug(params.category);
    return buildMeta({
      title: `${cat?.name ?? "Wiedza"} — Knowledge Hub`,
      description: cat?.description ?? "Premium baza wiedzy HVAC/OZE.",
      path: `/wiedza/${params.category}`,
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Strefa Wiedzy", url: `${SITE.url}/wiedza` },
          {
            name: cat?.name ?? params.category,
            url: `${SITE.url}/wiedza/${params.category}`,
          },
        ]),
      ],
    });
  },
  component: CategoryPage,
});

const FALLBACK = "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1600&q=80";

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = categoryBySlug(category)!;
  const fA = useServerFn(fetchPublicArticles);
  const { data, isLoading } = useQuery({
    queryKey: ["wp", "articles", "hub"],
    queryFn: () => fA(),
    staleTime: 5 * 60 * 1000,
  });

  const all = data?.posts ?? [];
  const filtered = all.filter(
    (p) =>
      matchCategory(`${p.title} ${p.excerpt}`) === category ||
      cat.keywords.some((k) =>
        `${p.title} ${p.excerpt}`.toLowerCase().includes(k)
      )
  );
  const display = filtered.length > 0 ? filtered : all.slice(0, 6);
  const lead = display[0];
  const rest = display.slice(1);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-black">
      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: cat.name },
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white px-5 py-20 md:px-8 md:py-28">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${cat.accent}1A, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: `${cat.accent}14` }}
            >
              <CategoryIcon
                iconKey={cat.iconKey}
                className="h-7 w-7"

                style={{ color: cat.accent }}
              />
            </div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">
              Kategoria · {cat.short}
            </div>
          </div>
          <h1 className="mt-8 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1] tracking-tight">
            {cat.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            {cat.description}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="h-[460px] animate-pulse rounded-3xl bg-black/5 lg:col-span-8" />
              <div className="space-y-3 lg:col-span-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-28 animate-pulse rounded-2xl bg-black/5" />
                ))}
              </div>
            </div>
          ) : display.length === 0 ? (
            <EmptyState category={cat.name} />
          ) : (
            <>
              {lead && <LeadCard post={lead} category={category} />}
              {rest.length > 0 && (
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p, i) => (
                    <ArticleTile key={p.id} post={p} idx={i} category={category} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* OTHER CATEGORIES */}
      <section className="border-t border-black/5 bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Pozostałe kategorie
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Eksploruj dalej.
          </h3>
          <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {KNOWLEDGE_CATEGORIES.filter((c) => c.slug !== category).map((c) => (
              <Link
                key={c.slug}
                to="/wiedza/$category"
                params={{ category: c.slug }}
                className="group flex flex-col gap-3 rounded-2xl border border-black/5 bg-[#FAFAF7] p-5 transition-all hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${c.accent}14` }}
                >
                  <CategoryIcon
                    iconKey={c.iconKey}
                    className="h-5 w-5"

                    style={{ color: c.accent }}
                  />
                </div>
                <div className="text-sm font-semibold tracking-tight">{c.name}</div>
                <div className="text-[11px] uppercase tracking-widest text-black/40">
                  {c.short}
                </div>
              </Link>
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
    </div>
  );
}

function LeadCard({ post, category }: { post: any; category: string }) {
  return (
    <Link
      to="/wiedza/$category/$slug"
      params={{ category, slug: post.slug }}
      className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-black/5 bg-white lg:grid-cols-12"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/5 lg:col-span-7 lg:aspect-auto">
        <img
          src={post.image ?? FALLBACK}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center gap-5 p-8 md:p-12 lg:col-span-5">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#0089CF]">
          {post.readingTime ?? 5} min · Lead article
        </span>
        <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl lg:text-4xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-black/60 md:text-base">{post.excerpt}</p>
        )}
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-black">
          Czytaj artykuł
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function ArticleTile({
  post,
  idx,
  category,
}: {
  post: any;
  idx: number;
  category: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: idx * 0.05, duration: 0.5 }}
    >
      <Link
        to="/wiedza/$category/$slug"
        params={{ category, slug: post.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_18px_50px_-22px_rgba(0,0,0,0.18)]"
      >
        <div className="aspect-[16/10] overflow-hidden bg-black/5">
          <img
            src={post.image ?? FALLBACK}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#0089CF]">
            {post.readingTime ?? 5} min czytania
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

function EmptyState({ category }: { category: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-black/15 bg-white p-12 text-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
        Sekcja w przygotowaniu
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">
        Materiały dla "{category}" wkrótce.
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-black/60">
        Nasz zespół właśnie redaguje nowe treści. W międzyczasie zajrzyj do
        pozostałych kategorii lub umów konsultację z inżynierem.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/wiedza"
          className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium hover:border-black"
        >
          Wszystkie kategorie
        </Link>
        <Link
          to="/premium"
          hash="kontakt"
          className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0089CF]"
        >
          Konsultacja inżynierska
        </Link>
      </div>
    </div>
  );
}
