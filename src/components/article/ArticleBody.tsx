import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Thermometer,
  Snowflake,
  Gauge,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import type { ArticleBlock } from "@/content/articles/types";
import { ArticleCTA, InlineQuote } from "./ArticleCTA";

/**
 * Premium editorial renderer for the typed block model.
 *
 * Conventions:
 * - The wrapper class is `.editorial` — global typography lives in styles.css
 *   so every article gets the same rhythm: 17/29 base, 1.8 leading, h2 with
 *   accent rule, dropcap on opt-in paragraphs, scroll-margin for TOC jumps.
 * - Every "structural" block (anything richer than a paragraph/list) opts
 *   into a subtle scroll reveal via <Reveal>. Disabled automatically by the
 *   prefers-reduced-motion rule in styles.css.
 * - Visual blocks use `.not-prose` to escape the editorial cascade so they
 *   render at their own scale.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="editorial">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return (
        <Tag id={block.id} data-eyebrow={block.eyebrow ?? undefined}>
          {block.eyebrow && <span className="editorial-eyebrow">{block.eyebrow}</span>}
          {block.text}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p className={block.dropcap ? "dropcap" : undefined}>
          {renderInline(block.text)}
        </p>
      );
    case "list":
      return block.ordered ? (
        <ol>
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ol>
      ) : (
        <ul>
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
        <Reveal>
          <div className={`not-prose my-8 rounded-2xl border p-5 md:p-6 ${palette}`}>
            {block.title && (
              <div className="text-[10px] uppercase tracking-[0.3em]">
                {block.title}
              </div>
            )}
            <p className="mt-2 text-sm leading-relaxed md:text-base">
              {renderInline(block.text)}
            </p>
          </div>
        </Reveal>
      );
    }
    case "engineer-note": {
      const tone = block.tone ?? "blue";
      const palette = {
        blue: { bar: "#0089CF", chip: "#0089CF" },
        gold: { bar: "#F5B800", chip: "#9A6B00" },
        cyan: { bar: "#0E7C9C", chip: "#0E7C9C" },
      }[tone];
      const Icon = pickIcon(block.icon);
      return (
        <Reveal>
          <div className="not-prose my-10 overflow-hidden rounded-3xl border border-black/5 bg-[#0E0E10] text-white">
            <div className="grid gap-0 md:grid-cols-12">
              <div
                className="relative flex items-center gap-3 p-6 md:col-span-4 md:p-8"
                style={{
                  background: `linear-gradient(135deg, ${palette.bar}, transparent)`,
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 backdrop-blur">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                    {block.label ?? "Engineering insight"}
                  </div>
                  <div className="mt-1 text-base font-semibold tracking-tight md:text-lg">
                    {block.title}
                  </div>
                </div>
              </div>
              <div className="p-6 text-sm leading-relaxed text-white/80 md:col-span-8 md:p-8 md:text-base">
                {renderInline(block.text)}
              </div>
            </div>
          </div>
        </Reveal>
      );
    }
    case "quote":
      return <InlineQuote text={block.text} cite={block.cite} />;
    case "image":
      return (
        <Reveal>
          <figure>
            <img
              src={block.src}
              alt={block.alt}
              loading="lazy"
              width={1920}
              height={1080}
            />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        </Reveal>
      );
    case "table":
      return (
        <Reveal>
          <div className="not-prose my-10 overflow-hidden rounded-2xl border border-black/10 bg-white">
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
        </Reveal>
      );
    case "stats":
      return (
        <Reveal>
          <div className="not-prose my-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/5 md:grid-cols-4">
            {block.items.map((s) => (
              <div key={s.label} className="bg-white p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-black/50">
                  {s.label}
                </div>
                <div className="mt-2 font-mono text-2xl text-black">{s.value}</div>
                {s.sub && <div className="mt-1 text-xs text-black/55">{s.sub}</div>}
              </div>
            ))}
          </div>
        </Reveal>
      );
    case "metrics-strip":
      return (
        <Reveal>
          <div className="not-prose -mx-5 my-12 border-y border-black/5 bg-white md:-mx-8">
            <div className="grid grid-cols-2 gap-px bg-black/5 md:grid-cols-4">
              {block.items.map((s) => (
                <div key={s.label} className="bg-white p-6 md:p-8">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                    {s.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    {s.value}
                  </div>
                  {s.sub && <div className="mt-1 text-xs text-black/50">{s.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );
    case "compare-cards":
      return (
        <div className="not-prose my-10 grid gap-5 md:grid-cols-2">
          {block.items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white"
            >
              <div className="flex items-center justify-between border-b border-black/5 p-5">
                <h4 className="text-lg font-semibold tracking-tight">{it.title}</h4>
                {it.badge && (
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
                    style={{
                      background: it.recommended ? "#F5B80022" : "#8C8C8C22",
                      color: it.recommended ? "#9A6B00" : "#5b5b5b",
                    }}
                  >
                    {it.badge}
                  </span>
                )}
              </div>
              <div className="grid gap-0 md:grid-cols-2">
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#5FB46B]">
                    Zalety
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-black/75">
                    {it.pros.map((p) => (
                      <li key={p} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5FB46B]" />
                        <span>{renderInline(p)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-black/5 p-5 md:border-l md:border-t-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#C03B3B]">
                    Wady
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-black/75">
                    {it.cons.map((p) => (
                      <li key={p} className="flex gap-2">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#C03B3B]" />
                        <span>{renderInline(p)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    case "cost-breakdown":
      return (
        <Reveal>
          <div className="not-prose my-10 overflow-hidden rounded-2xl border border-black/5 bg-white">
            <div className="flex items-center justify-between gap-4 border-b border-black/5 bg-[#FAFAF7] px-6 py-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                  {block.title ?? "Kosztorys referencyjny"}
                </div>
                {block.subtitle && (
                  <div className="mt-1 text-sm font-medium">{block.subtitle}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                  {block.totalLabel ?? "Razem brutto"}
                </div>
                <div className="mt-1 font-mono text-lg font-semibold tracking-tight">
                  {block.total}
                </div>
              </div>
            </div>
            <div className="divide-y divide-black/5">
              {block.rows.map((r) => (
                <div
                  key={r.item}
                  className="grid grid-cols-12 items-center gap-3 px-6 py-4 text-sm"
                >
                  <div className="col-span-7 md:col-span-6">
                    <div className="font-medium text-black">{r.item}</div>
                    {r.small && (
                      <div className="text-xs text-black/45">{r.small}</div>
                    )}
                  </div>
                  <div className="col-span-5 text-right font-mono text-sm text-black/80 md:col-span-6">
                    {r.price}
                  </div>
                </div>
              ))}
            </div>
            {block.footnote && (
              <div className="border-t border-black/5 bg-[#FFFBEB] px-6 py-4 text-xs text-[#9A6B00]">
                {renderInline(block.footnote)}
              </div>
            )}
          </div>
        </Reveal>
      );
    case "case-cards":
      return (
        <div className="not-prose my-10 grid gap-5 md:grid-cols-3">
          {block.items.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl border border-black/10 bg-[#FAFAF7] p-6 transition hover:border-[#0089CF] hover:shadow-xl"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                {c.spec}
              </div>
              <h4 className="mt-3 text-lg font-semibold leading-tight">
                {c.title}
              </h4>
              <div className="mt-5 border-t border-black/10 pt-4">
                <div className="text-[10px] uppercase tracking-wider text-black/50">
                  {c.priceLabel ?? "Cena pełna"}
                </div>
                <div className="font-mono text-xl text-black">{c.price}</div>
                {c.after && (
                  <>
                    <div className="mt-3 text-[10px] uppercase tracking-wider text-black/50">
                      {c.afterLabel ?? "Po dotacji"}
                    </div>
                    <div className="font-mono text-xl text-[#5FB46B]">
                      {c.after}
                    </div>
                  </>
                )}
              </div>
              {c.recommendation && (
                <div className="mt-4 text-xs text-black/60">
                  Rekomendacja:{" "}
                  <span className="text-black">{c.recommendation}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      );
    case "factor-list":
      return (
        <div className="not-prose my-8 space-y-4">
          {block.items.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-start gap-4 border-b border-black/10 pb-4"
            >
              <span className="mt-0.5 font-mono text-[11px] text-black/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="text-base font-semibold text-black">{it.name}</div>
                <div className="mt-1 text-sm text-black/65">
                  {renderInline(it.detail)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    case "when-fits":
      return (
        <Reveal>
          <div className="not-prose my-10 rounded-2xl border border-[#5FB46B]/30 bg-[#F2F9F3] p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#2F6B3A]">
              {block.title ?? "Kiedy to rozwiązanie ma sens"}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-black/80 md:text-base">
              {block.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5FB46B]" />
                  <span>{renderInline(it)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      );
    case "common-mistakes":
      return (
        <Reveal>
          <div className="not-prose my-10 rounded-2xl border border-[#C03B3B]/25 bg-[#FCF4F4] p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#8E2929]">
              {block.title ?? "Najczęstsze błędy"}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-black/80 md:text-base">
              {block.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#C03B3B]" />
                  <span>{renderInline(it)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      );
    case "key-takeaways":
      return (
        <Reveal>
          <aside
            id={block.id ?? "kluczowe-wnioski"}
            className="not-prose my-14 rounded-3xl border border-black/10 bg-white p-7 md:p-10"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Kluczowe wnioski
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              {block.title ?? "Co zapamiętać z tego artykułu"}
            </h2>
            <ol className="mt-6 space-y-4 text-sm text-black/80 md:text-base">
              {block.items.map((it, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-[#0089CF]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{renderInline(it)}</span>
                </li>
              ))}
            </ol>
          </aside>
        </Reveal>
      );
    case "definition":
      return (
        <Reveal>
          <dl className="not-prose my-8 rounded-2xl border border-black/10 bg-white p-5 md:p-6">
            <dt className="text-[10px] uppercase tracking-[0.3em] text-black/50">
              Definicja · {block.term}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-black/80 md:text-base">
              {renderInline(block.definition)}
            </dd>
          </dl>
        </Reveal>
      );
    case "tldr":
      return (
        <div className="not-prose my-8 rounded-2xl border border-[#F5B800]/30 bg-[#FFFBEB] p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#9A6B00]">
            {block.title ?? "TL;DR"}
          </div>
          <p className="mt-3 text-base leading-relaxed text-black/80">
            {renderInline(block.text)}
          </p>
        </div>
      );
    case "cta-calculator":
      return (
        <ArticleCTA variant="calculator" title={block.title} lead={block.lead} />
      );
    case "cta-engineer":
      return (
        <ArticleCTA variant="engineer" title={block.title} lead={block.lead} />
      );
  }
}

function pickIcon(key?: string) {
  switch (key) {
    case "thermometer":
      return Thermometer;
    case "snowflake":
      return Snowflake;
    case "gauge":
      return Gauge;
    case "trending":
      return TrendingDown;
    case "shield":
      return ShieldCheck;
    default:
      return Sparkles;
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

/**
 * Extract TOC items from level-2 headings + key-takeaways block. Drives the
 * sidebar nav; only headings with an `id` show up.
 */
export function tocFromBlocks(blocks: ArticleBlock[]) {
  const items: { id: string; text: string }[] = [];
  for (const b of blocks) {
    if (b.type === "heading" && b.level === 2 && b.id) {
      items.push({ id: b.id, text: b.text });
    } else if (b.type === "key-takeaways") {
      items.push({ id: b.id ?? "kluczowe-wnioski", text: "Kluczowe wnioski" });
    }
  }
  return items;
}
