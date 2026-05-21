import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { getCase } from "@/content/case-studies";

export function RelatedCaseStudies({ slugs }: { slugs?: string[] }) {
  if (!slugs?.length) return null;
  const cases = slugs.map(getCase).filter(Boolean);
  if (!cases.length) return null;

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Realizacje powiązane
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Tak ta usługa wygląda w praktyce.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c!.slug}
              to="/realizacje/$slug"
              params={{ slug: c!.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition-colors hover:bg-[#FAFAF7]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                {c!.heroImage && (
                  <img
                    src={c!.heroImage}
                    alt={c!.heroImageAlt ?? c!.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-black/45">
                  <MapPin className="h-3 w-3 text-[#F5B800]" />
                  {c!.location.city}
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">
                  {c!.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-black/65">
                  {c!.excerpt}
                </p>
                <div className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-black">
                  Zobacz case study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
