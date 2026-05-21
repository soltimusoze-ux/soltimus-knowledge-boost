import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies/types";

export function CaseRelated({ cases }: { cases: CaseStudy[] }) {
  if (!cases.length) return null;
  return (
    <section className="border-t border-black/5 bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Powiązane realizacje
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Zobacz inne projekty Soltimus.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              to="/realizacje/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-3xl bg-black"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={c.heroImage}
                  alt={c.heroImageAlt ?? c.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-[1400ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
                    {c.location.city}
                  </div>
                  <div className="mt-2 text-lg font-semibold leading-tight tracking-tight">
                    {c.title}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/70">
                    Zobacz case study
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
