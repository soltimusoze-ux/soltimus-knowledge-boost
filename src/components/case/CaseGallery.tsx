import type { CaseStudy } from "@/content/case-studies/types";

export function CaseGallery({ items }: { items?: CaseStudy["gallery"] }) {
  if (!items?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Galeria realizacji
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((g, i) => (
            <figure key={i} className="overflow-hidden rounded-3xl bg-black">
              <div className="relative aspect-[4/3]">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-105"
                />
              </div>
              {g.caption && (
                <figcaption className="bg-white px-5 py-4 text-xs leading-relaxed text-black/65 md:text-sm">
                  {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
