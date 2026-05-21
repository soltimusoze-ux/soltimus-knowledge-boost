import type { SpecGroup } from "@/content/case-studies/types";

export function CaseSystem({ groups }: { groups: SpecGroup[] }) {
  if (!groups?.length) return null;
  return (
    <section className="border-t border-black/5 bg-black px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          System
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Konfiguracja techniczna.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
            >
              <h3 className="text-lg font-semibold tracking-tight text-[#F5B800]">
                {g.title}
              </h3>
              <dl className="mt-6 space-y-4">
                {g.items.map((row) => (
                  <div key={row.label}>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white md:text-base">
                      {row.value}
                    </dd>
                    {row.note && (
                      <div className="mt-0.5 text-xs text-white/55">
                        {row.note}
                      </div>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
