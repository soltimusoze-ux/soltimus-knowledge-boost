import type { TimelinePhase } from "@/content/case-studies/types";

export function CaseTimeline({ phases }: { phases?: TimelinePhase[] }) {
  if (!phases?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Proces instalacji
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Jak wyglądała realizacja krok po kroku.
        </h2>

        <ol className="mt-12 space-y-8 border-l border-black/15 pl-8">
          {phases.map((p, i) => (
            <li key={p.phase} className="relative">
              <span className="absolute -left-[37px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white tabular-nums">
                {i + 1}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                  {p.phase}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#0089CF]">
                  {p.duration}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-black/70 md:text-base">
                {p.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
