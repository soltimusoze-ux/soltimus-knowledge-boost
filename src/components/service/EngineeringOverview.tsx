import type { ServiceOverview } from "@/content/services/types";

export function EngineeringOverview({ overview }: { overview: ServiceOverview }) {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Punkt widzenia inżynierski
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Czym naprawdę jest ta usługa.
          </h2>
          <div className="editorial mt-8 space-y-6">
            {overview.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <dl className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-[#FAFAF7]">
            {overview.points.map((p) => (
              <div
                key={p.label}
                className="flex items-baseline justify-between gap-6 px-5 py-5 md:px-6"
              >
                <dt className="text-[10px] uppercase tracking-[0.22em] text-black/50">
                  {p.label}
                </dt>
                <dd className="text-sm font-semibold tracking-tight text-black md:text-base">
                  {p.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
