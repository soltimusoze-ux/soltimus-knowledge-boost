import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import type { ServiceHero } from "@/content/services/types";

const FALLBACK =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=80";

export function PremiumHero({ hero }: { hero: ServiceHero }) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative min-h-[78vh] w-full">
        <img
          src={hero.heroImage ?? FALLBACK}
          alt={hero.heroImageAlt ?? hero.title}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-5 pb-24 pt-40 md:px-8 md:pb-28">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
            {hero.eyebrow}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 max-w-4xl text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight"
          >
            {hero.title}
          </motion.h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            {hero.subtitle}
          </p>

          {(hero.ctaPrimary || hero.ctaSecondary) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {hero.ctaPrimary && (
                <Link
                  to={hero.ctaPrimary.to}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
                >
                  {hero.ctaPrimary.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {hero.ctaSecondary && (
                <Link
                  to={hero.ctaSecondary.to}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  <Phone className="h-4 w-4" />
                  {hero.ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
