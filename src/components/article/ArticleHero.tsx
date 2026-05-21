import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { CategoryIcon } from "@/components/knowledge/CategoryIcon";
import type { KnowledgeCategory } from "@/lib/knowledge-categories";
import type { Article } from "@/content/articles";
import { getAuthor } from "@/content/authors";

interface Props {
  article: Article;
  category: KnowledgeCategory;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1800&q=80";

export function ArticleHero({ article, category }: Props) {
  const author = getAuthor(article.authorId);
  const date = new Date(article.publishedAt).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative h-[68vh] min-h-[460px] w-full">
        <img
          src={article.heroImage ?? FALLBACK}
          alt={article.heroImageAlt ?? article.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-16 md:px-8 md:pb-24">
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: `${category.accent}26` }}
            >
              <CategoryIcon
                iconKey={category.iconKey}
                className="h-3.5 w-3.5"
                style={{ color: category.accent }}
              />
            </div>
            <Link
              to="/wiedza/$category"
              params={{ category: category.slug }}
              className="hover:text-white"
            >
              {category.name}
            </Link>
            <span className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime} min
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 max-w-4xl text-[clamp(2rem,5.5vw,4.4rem)] font-semibold leading-[1.02] tracking-tight"
          >
            {article.title}
          </motion.h1>

          {article.excerpt && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {article.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-white/60">
            <time
              dateTime={article.publishedAt}
              className="inline-flex items-center gap-1.5"
            >
              <Calendar className="h-3 w-3" />
              {date}
            </time>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[#F5B800]" />
              {author.name}
            </span>
            {article.updatedAt && (
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-[#0089CF]" />
                Aktualizacja{" "}
                {new Date(article.updatedAt).toLocaleDateString("pl-PL", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
