interface TocItem {
  id: string;
  text: string;
}

export function ArticleTOC({ items }: { items: TocItem[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
        Spis treści
      </div>
      {items.length > 0 ? (
        <ol className="mt-4 space-y-2.5 text-sm">
          {items.map((item, i) => (
            <li key={item.id} className="flex gap-3">
              <span className="w-5 shrink-0 font-mono text-[10px] text-black/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <a
                href={`#${item.id}`}
                className="text-black/70 transition-colors hover:text-black"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 text-sm text-black/50">Krótki artykuł — bez sekcji.</p>
      )}
    </div>
  );
}
