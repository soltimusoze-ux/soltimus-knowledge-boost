import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";

interface LabEpisodeLite {
  slug: string;
  title: string;
  excerpt?: string;
}

/**
 * Renders related Soltimus Lab episodes. Today the lab episode registry
 * is not yet centralized — caller passes pre-resolved metadata so this
 * component does not couple to an unstable internal API. When the Lab
 * registry consolidates, swap to a `getEpisode(slug)` lookup here.
 */
export function RelatedLabEpisodes({ episodes }: { episodes?: LabEpisodeLite[] }) {
  if (!episodes?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Z Soltimus Lab
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Zobacz, jak to wygląda w praktyce.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e) => (
            <Link
              key={e.slug}
              to="/lab-episode/$slug"
              params={{ slug: e.slug }}
              className="group flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-7 transition-colors hover:bg-[#FAFAF7]"
            >
              <PlayCircle className="h-6 w-6 text-[#F5B800]" />
              <h3 className="text-lg font-semibold leading-snug tracking-tight">
                {e.title}
              </h3>
              {e.excerpt && (
                <p className="line-clamp-3 text-sm leading-relaxed text-black/65">
                  {e.excerpt}
                </p>
              )}
              <div className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-black">
                Obejrzyj odcinek
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
