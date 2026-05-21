import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceAdvantage } from "@/content/services/types";

function resolveIcon(name?: string): LucideIcon {
  if (!name) return Icons.Sparkles;
  const Lib = Icons as unknown as Record<string, LucideIcon>;
  return Lib[name] ?? Icons.Sparkles;
}

export function TechnicalAdvantages({ items }: { items: ServiceAdvantage[] }) {
  if (!items?.length) return null;
  return (
    <section className="bg-black px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Standard Soltimus
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Co realnie odróżnia naszą realizację.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => {
            const Icon = resolveIcon(a.icon);
            return (
              <article
                key={a.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <Icon className="h-5 w-5 text-[#F5B800]" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {a.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
