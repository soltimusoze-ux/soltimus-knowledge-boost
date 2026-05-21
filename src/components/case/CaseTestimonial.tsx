import { Quote } from "lucide-react";
import type { CaseTestimonial as T } from "@/content/case-studies/types";

export function CaseTestimonial({ t }: { t?: T }) {
  if (!t) return null;
  return (
    <section className="border-t border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Quote className="mx-auto h-7 w-7 text-[#F5B800]" aria-hidden />
        <blockquote className="mt-6 text-[clamp(1.4rem,2.4vw,2.2rem)] font-light leading-snug tracking-tight text-black">
          „{t.quote}"
        </blockquote>
        <figcaption className="mt-8 text-xs uppercase tracking-[0.3em] text-black/55">
          {t.author}
          {t.role ? ` · ${t.role}` : ""}
        </figcaption>
      </div>
    </section>
  );
}
