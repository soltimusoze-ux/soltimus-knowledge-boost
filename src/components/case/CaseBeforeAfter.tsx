import type { BeforeAfterRow } from "@/content/case-studies/types";

export function CaseBeforeAfter({ rows }: { rows?: BeforeAfterRow[] }) {
  if (!rows?.length) return null;
  return (
    <section className="border-t border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Before · After
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Co się realnie zmieniło.
        </h2>

        <div className="mt-12 overflow-hidden rounded-3xl border border-black/10 bg-white">
          <div className="grid grid-cols-12 border-b border-black/10 bg-black/[0.02] px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-black/50 md:px-8">
            <div className="col-span-12 md:col-span-5">Wskaźnik</div>
            <div className="col-span-5 md:col-span-3">Przed</div>
            <div className="col-span-5 md:col-span-3">Po</div>
            <div className="col-span-2 md:col-span-1 text-right">Δ</div>
          </div>
          {rows.map((r) => (
            <div
              key={r.metric}
              className="grid grid-cols-12 items-baseline border-b border-black/5 px-5 py-5 last:border-0 md:px-8"
            >
              <div className="col-span-12 mb-2 text-sm font-medium md:col-span-5 md:mb-0 md:text-base">
                {r.metric}
              </div>
              <div className="col-span-5 text-sm text-black/55 line-through md:col-span-3 md:text-base">
                {r.before}
              </div>
              <div className="col-span-5 text-sm font-semibold md:col-span-3 md:text-base">
                {r.after}
              </div>
              <div className="col-span-2 text-right md:col-span-1">
                {r.delta && (
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums ${
                      r.tone === "positive"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-black/5 text-black/70"
                    }`}
                  >
                    {r.delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
