import { ArticleFAQ } from "@/components/article/ArticleFAQ";
import type { ServiceFaq } from "@/content/services/types";

export function FAQSection({ items }: { items: ServiceFaq[] }) {
  if (!items?.length) return null;
  return (
    <section className="border-t border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Najczęściej zadawane pytania
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          To, o co inwestorzy pytają najpierw.
        </h2>
        <div className="mt-10">
          <ArticleFAQ items={items} />
        </div>
      </div>
    </section>
  );
}
