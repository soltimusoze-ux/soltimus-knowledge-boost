import type { ServiceConsultationStep } from "@/content/services/types";

export function ConsultationFlow({ steps }: { steps: ServiceConsultationStep[] }) {
  if (!steps?.length) return null;
  return (
    <section className="border-t border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Jak wygląda konsultacja
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Spokojny proces, bez presji sprzedażowej.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-2xl border border-black/10 bg-white p-7"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5B800] tabular-nums">
                {s.step}
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/65">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
