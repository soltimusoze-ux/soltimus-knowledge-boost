import type { ServiceProcessPhase } from "@/content/services/types";

export function ProcessTimeline({ phases }: { phases: ServiceProcessPhase[] }) {
  if (!phases?.length) return null;
  return (
    <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Proces realizacji
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Od pierwszej rozmowy do działającego systemu.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {phases.map((p, i) => (
            <div
              key={p.phase}
              className="relative rounded-2xl border border-black/5 bg-white p-6"
            >
              <div className="text-xs font-medium text-black/40 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {p.phase}
              </h3>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#F5B800]">
                {p.duration}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
