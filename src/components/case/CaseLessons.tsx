export function CaseLessons({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Lessons learned
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Co zabieramy do kolejnych projektów.
        </h2>
        <ul className="mt-10 space-y-5">
          {items.map((l, i) => (
            <li
              key={i}
              className="flex gap-5 rounded-2xl border border-black/10 bg-white p-6"
            >
              <span className="shrink-0 text-2xl font-light text-[#F5B800] tabular-nums">
                0{i + 1}
              </span>
              <p className="text-base leading-relaxed text-black/80">{l}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
