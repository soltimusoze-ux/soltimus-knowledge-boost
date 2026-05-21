import type { CaseStudyChallenge } from "@/content/case-studies/types";

export function CaseChallenges({ items }: { items: CaseStudyChallenge[] }) {
  if (!items?.length) return null;
  return (
    <section className="border-t border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Wyzwania inżynierskie
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Co musieliśmy rozwiązać, zanim w ogóle dotknęliśmy sprzętu.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((ch, i) => (
            <article
              key={ch.title}
              className="rounded-3xl border border-black/10 bg-white p-7"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#0089CF] tabular-nums">
                Wyzwanie 0{i + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight md:text-xl">
                {ch.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/70 md:text-base">
                {ch.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
