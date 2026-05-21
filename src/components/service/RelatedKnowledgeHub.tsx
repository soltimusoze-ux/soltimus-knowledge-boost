import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { getArticleBySlug } from "@/content/articles";

export function RelatedKnowledgeHub({ slugs }: { slugs?: string[] }) {
  if (!slugs?.length) return null;
  const articles = slugs.map((s) => getArticleBySlug(s)).filter(Boolean);
  if (!articles.length) return null;

  return (
    <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Z bazy wiedzy
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Pogłębione materiały do dalszej lektury.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a!.slug}
              to="/wiedza/$category/$slug"
              params={{ category: a!.category, slug: a!.slug }}
              className="group flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-7 transition-colors hover:bg-white"
            >
              <BookOpen className="h-5 w-5 text-[#F5B800]" />
              <h3 className="text-lg font-semibold leading-snug tracking-tight">
                {a!.title}
              </h3>
              {a!.excerpt && (
                <p className="line-clamp-3 text-sm leading-relaxed text-black/65">
                  {a!.excerpt}
                </p>
              )}
              <div className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-black">
                Czytaj artykuł
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
