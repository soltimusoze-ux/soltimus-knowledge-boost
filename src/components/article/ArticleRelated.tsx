import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/content/articles";

const FALLBACK =
  "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1600&q=80";

export function ArticleRelated({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="border-t border-black/5 bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Czytaj dalej
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Powiązane materiały
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((r, i) => (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/wiedza/$category/$slug"
                params={{ category: r.category, slug: r.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-[#FAFAF7] transition-all hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black/5">
                  <img
                    src={r.heroImage ?? FALLBACK}
                    alt={r.heroImageAlt ?? r.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#0089CF]">
                    {r.readingTime} min
                  </span>
                  <h3 className="text-base font-semibold leading-snug tracking-tight line-clamp-3 md:text-lg">
                    {r.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-black/70">
                    Czytaj <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
