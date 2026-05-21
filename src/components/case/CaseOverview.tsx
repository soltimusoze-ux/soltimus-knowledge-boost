import type { CaseStudy } from "@/content/case-studies/types";

/**
 * "At a glance" overview: building profile + homeowner goals.
 * Premium scannable card placed right after the metrics strip.
 */
export function CaseOverview({ c }: { c: CaseStudy }) {
  const b = c.building;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Profil obiektu
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Co dostaliśmy w punkcie zero.
          </h2>
          <dl className="mt-8 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
            {(
              [
                ["Typ obiektu", b.type],
                ["Powierzchnia", `${b.area_m2} m²`],
                b.floors ? ["Kondygnacje", String(b.floors)] : null,
                b.year ? ["Rok budowy", String(b.year)] : null,
                b.occupants ? ["Domownicy", String(b.occupants)] : null,
                b.insulation ? ["Izolacja", b.insulation] : null,
                b.previousHeating
                  ? ["Poprzednie ogrzewanie", b.previousHeating]
                  : null,
                ["Lokalizacja", `${c.location.city}, ${c.location.region}`],
              ] as Array<[string, string] | null>
            )
              .filter((r): r is [string, string] => r !== null)
              .map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 px-5 py-4 md:px-6"
                >
                  <dt className="text-xs uppercase tracking-[0.18em] text-black/50">
                    {k}
                  </dt>
                  <dd className="text-sm font-medium text-black md:text-base">
                    {v}
                  </dd>
                </div>
              ))}
          </dl>

        </div>

        <div className="lg:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Cele właściciela
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Czego oczekiwał klient.
          </h2>
          <ul className="mt-8 space-y-4">
            {c.goals.map((g, i) => (
              <li
                key={g}
                className="relative pl-10 text-base leading-relaxed text-black/80 md:text-lg"
              >
                <span className="absolute left-0 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#F5B800] text-[10px] font-semibold text-black tabular-nums">
                  {i + 1}
                </span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
