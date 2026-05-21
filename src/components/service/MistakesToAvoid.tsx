import { TriangleAlert } from "lucide-react";
import type { ServiceMistake } from "@/content/services/types";

export function MistakesToAvoid({ items }: { items: ServiceMistake[] }) {
  if (!items?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Czego unikać
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Najczęstsze błędy w branży.
        </h2>
        <p className="mt-4 text-base text-black/60">
          Sekcja edukacyjna — bez wskazywania konkretnych firm. Naszym celem jest
          świadomy inwestor, nie sprzedaż przez strach.
        </p>

        <ul className="mt-12 space-y-6">
          {items.map((m) => (
            <li
              key={m.title}
              className="grid gap-4 border-l-2 border-[#F5B800] bg-[#FAFAF7] p-6 md:grid-cols-12 md:p-8"
            >
              <div className="md:col-span-1">
                <TriangleAlert className="h-5 w-5 text-[#F5B800]" />
              </div>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/75 md:text-base">
                  {m.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
