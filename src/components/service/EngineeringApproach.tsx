import type { ServiceApproachStep } from "@/content/services/types";

export function EngineeringApproach({ steps }: { steps: ServiceApproachStep[] }) {
  if (!steps?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Podejście inżynierskie
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Jak myślimy o tej usłudze.
        </h2>

        <ol className="mt-14 space-y-10">
          {steps.map((s) => (
            <li
              key={s.step}
              className="grid gap-6 border-t border-black/10 pt-10 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <div className="font-semibold text-[#F5B800] tabular-nums text-3xl md:text-4xl">
                  {s.step}
                </div>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {s.title}
                </h3>
                <p className="editorial mt-3">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
