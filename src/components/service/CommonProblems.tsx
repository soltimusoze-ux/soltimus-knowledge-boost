import { AlertCircle } from "lucide-react";
import type { ServiceProblem } from "@/content/services/types";

export function CommonProblems({ items }: { items: ServiceProblem[] }) {
  if (!items?.length) return null;
  return (
    <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Najczęstsze problemy
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Z czym przychodzą do nas inwestorzy.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-black/60">
          To diagnoza, nie marketing. Każdy z poniższych punktów wynika z setek audytów na realnych instalacjach.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.title}
              className="flex flex-col gap-4 bg-white p-7 md:p-8"
            >
              <AlertCircle className="h-5 w-5 text-[#F5B800]" />
              <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="text-sm leading-relaxed text-black/70">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
