import type { EngineerCommentary } from "@/content/case-studies/types";
import { getAuthor } from "@/content/authors";

export function CaseCommentary({ items }: { items?: EngineerCommentary[] }) {
  if (!items?.length) return null;
  return (
    <section className="border-t border-black/5 bg-[#0E0E10] px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Komentarz inżynierski
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Co zdecydowało o tym projekcie.
        </h2>

        <div className="mt-12 space-y-10">
          {items.map((it, i) => {
            const a = getAuthor(it.authorId);
            return (
              <figure key={i} className="relative">
                {it.asPullQuote ? (
                  <blockquote className="text-[clamp(1.4rem,2.2vw,2rem)] font-light leading-snug tracking-tight text-white">
                    „{it.text}"
                  </blockquote>
                ) : (
                  <p className="text-base leading-relaxed text-white/80 md:text-lg">
                    {it.text}
                  </p>
                )}
                <figcaption className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/55">
                  <span className="h-px w-8 bg-[#F5B800]" />
                  {a.name} · {a.role}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
