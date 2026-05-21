import { ArticleFAQ } from "@/components/article/ArticleFAQ";
import type { CaseStudyFaqItem } from "@/content/case-studies/types";

/**
 * Thin wrapper so the case-study route doesn't import from /article directly —
 * keeps a clean import boundary; swap the implementation later if needed.
 */
export function CaseFAQ({ items }: { items?: CaseStudyFaqItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="px-5 md:px-8">
      <div className="mx-auto max-w-4xl">
        <ArticleFAQ items={items} />
      </div>
    </section>
  );
}
