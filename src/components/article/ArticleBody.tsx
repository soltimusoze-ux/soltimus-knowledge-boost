import type { ArticleBlock } from "@/content/articles/types";
import { ArticleCTA, InlineQuote } from "./ArticleCTA";

/**
 * Renders an Article body from a typed block array.
 * Wrap the result in `.editorial` styling defined globally where needed,
 * but blocks render their own structural classes so they work standalone.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="editorial space-y-6 text-[15px] leading-relaxed text-black/80 md:text-base">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return (
        <Tag
          id={block.id}
          className={
            block.level === 3
              ? "mt-10 text-xl font-semibold tracking-tight text-black md:text-2xl"
              : "mt-12 text-2xl font-semibold tracking-tight text-black md:text-3xl"
          }
        >
          {block.text}
        </Tag>
      );
    }
    case "paragraph":
      return <p>{renderInline(block.text)}</p>;
    case "list":
      return block.ordered ? (
        <ol className="list-decimal space-y-2 pl-5">
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-2 pl-5">
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    case "callout": {
      const tone = block.tone ?? "blue";
      const palette =
        tone === "gold"
          ? "border-[#F5B800]/30 bg-[#FFFBEB] text-[#9A6B00]"
          : tone === "neutral"
            ? "border-black/10 bg-white text-black/70"
            : "border-[#0089CF]/20 bg-[#EAF6FD] text-[#0E5A82]";
      return (
        <div className={`not-prose rounded-2xl border p-5 ${palette}`}>
          {block.title && (
            <div className="text-[10px] uppercase tracking-[0.3em]">
              {block.title}
            </div>
          )}
          <p className="mt-2 text-sm leading-relaxed md:text-base">
            {block.text}
          </p>
        </div>
      );
    }
    case "quote":
      return <InlineQuote text={block.text} cite={block.cite} />;
    case "image":
      return (
        <figure className="not-prose">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full rounded-2xl"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center text-xs text-black/55">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "table":
      return (
        <div className="not-prose overflow-hidden rounded-2xl border border-black/10 bg-white">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-black text-white">
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="px-4 py-3 md:px-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-black/5">
                  {row.map((c, j) => (
                    <td key={j} className="px-4 py-4 md:px-6">
                      {renderInline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.note && (
            <p className="px-4 pb-4 pt-2 text-xs text-black/50 md:px-6">
              {block.note}
            </p>
          )}
        </div>
      );
    case "stats":
      return (
        <div className="not-prose grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/5 md:grid-cols-4">
          {block.items.map((s) => (
            <div key={s.label} className="bg-white p-5">
              <div className="text-[10px] uppercase tracking-[0.28em] text-black/50">
                {s.label}
              </div>
              <div className="mt-2 font-mono text-2xl text-black">
                {s.value}
              </div>
              {s.sub && (
                <div className="mt-1 text-xs text-black/55">{s.sub}</div>
              )}
            </div>
          ))}
        </div>
      );
    case "tldr":
      return (
        <div className="not-prose rounded-2xl border border-[#F5B800]/30 bg-[#FFFBEB] p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#9A6B00]">
            {block.title ?? "TL;DR"}
          </div>
          <p className="mt-3 text-base leading-relaxed text-black/80">
            {block.text}
          </p>
        </div>
      );
    case "cta-calculator":
      return (
        <ArticleCTA
          variant="calculator"
          title={block.title}
          lead={block.lead}
        />
      );
    case "cta-engineer":
      return (
        <ArticleCTA variant="engineer" title={block.title} lead={block.lead} />
      );
  }
}

/** Minimal inline `**bold**` parser — keeps content authoring lightweight. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold text-black">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

/** Extract TOC items from heading blocks (level 2 with an `id`). */
export function tocFromBlocks(blocks: ArticleBlock[]) {
  return blocks
    .filter(
      (b): b is Extract<ArticleBlock, { type: "heading" }> =>
        b.type === "heading" && b.level === 2 && !!b.id,
    )
    .map((b) => ({ id: b.id!, text: b.text }));
}
