import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ArticleFaqItem } from "@/content/articles/types";

export function ArticleFAQ({ items }: { items: ArticleFaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items || items.length === 0) return null;
  return (
    <section className="not-prose mt-16">
      <div className="text-[10px] uppercase tracking-[0.3em] text-black/50">
        FAQ
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
        Najczęściej zadawane pytania
      </h2>
      <div className="mt-8 space-y-3">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="rounded-2xl border border-black/10 bg-white transition hover:border-black/20"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
              >
                <span className="text-base font-semibold md:text-lg">
                  {f.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm leading-relaxed text-black/70 md:px-6 md:text-base">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
