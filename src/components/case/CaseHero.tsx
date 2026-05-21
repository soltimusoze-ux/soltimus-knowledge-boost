import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies/types";

const FALLBACK =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2000&q=80";

export function CaseHero({ c }: { c: CaseStudy }) {
  const date = new Date(c.publishedAt).toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric",
  });
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative h-[78vh] min-h-[520px] w-full">
        <img
          src={c.heroImage ?? FALLBACK}
          alt={c.heroImageAlt ?? c.title}
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-[#F5B800]" />
              {c.location.city}
            </span>
            <span className="text-white/30">·</span>
            <span>Case Study</span>
            <span className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {c.readingTime} min
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 max-w-4xl text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight"
          >
            {c.title}
          </motion.h1>

          {c.subtitle && (
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
              {c.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-white/60">
            <time
              dateTime={c.publishedAt}
              className="inline-flex items-center gap-1.5"
            >
              <Calendar className="h-3 w-3" />
              {date}
            </time>
            {c.tags?.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] tracking-[0.18em] text-white/70 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
