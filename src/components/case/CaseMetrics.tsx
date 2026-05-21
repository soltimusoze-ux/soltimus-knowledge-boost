import type { MetricItem } from "@/content/case-studies/types";

export function CaseMetrics({ items }: { items: MetricItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="border-y border-black/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
          {items.map((m) => (
            <div key={m.label} className="px-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                {m.label}
              </div>
              <div className="mt-3 font-semibold tracking-tight text-[#F5B800] text-[clamp(1.6rem,2.8vw,2.6rem)] tabular-nums">
                {m.value}
              </div>
              {m.sub && (
                <div className="mt-1 text-xs text-white/60">{m.sub}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
