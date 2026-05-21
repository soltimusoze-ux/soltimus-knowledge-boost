import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, MessageCircle, Phone, Quote } from "lucide-react";

interface CalcProps {
  variant: "calculator";
  title?: string;
  lead?: string;
}
interface EngineerProps {
  variant: "engineer";
  title?: string;
  lead?: string;
}

type Props = CalcProps | EngineerProps;

/**
 * Standard article CTAs. Used both inline (via ArticleBody blocks
 * `cta-calculator` / `cta-engineer`) and at the bottom of every article.
 */
export function ArticleCTA(props: Props) {
  if (props.variant === "calculator") {
    return (
      <Link
        to="/kalkulator-pompy-ciepla"
        className="group not-prose mt-12 flex items-center justify-between gap-4 rounded-3xl border border-black/10 bg-black p-6 text-white transition hover:bg-[#0089CF] md:p-8"
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
            Kalkulator Soltimus
          </div>
          <div className="mt-2 text-lg font-semibold md:text-xl">
            {props.title ??
              "Dobierz pompę ciepła do swojego domu w 90 sekund"}
          </div>
          {props.lead && (
            <p className="mt-1 text-sm text-white/70">{props.lead}</p>
          )}
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5B800] text-black transition group-hover:translate-x-0.5">
          <Calculator className="h-5 w-5" />
        </div>
      </Link>
    );
  }

  return (
    <div className="not-prose mt-16 overflow-hidden rounded-3xl bg-black p-8 text-white md:p-12">
      <div className="grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Konsultacja inżynierska
          </div>
          <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {props.title ??
              "Chcesz przedyskutować swój projekt z naszym inżynierem?"}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-white/60 md:text-base">
            {props.lead ??
              "25-minutowa rozmowa, bez handlowca. Otrzymasz konkretne odpowiedzi dopasowane do Twojego budynku."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-[#F5B800]"
          >
            <Phone className="h-4 w-4" /> Umów rozmowę
          </Link>
          <a
            href="https://wa.me/48000000000"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white hover:border-white"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export function InlineQuote({ text, cite }: { text: string; cite?: string }) {
  return (
    <div className="not-prose mt-12 flex gap-5 rounded-2xl border-l-4 border-[#0089CF] bg-white p-6 md:p-8">
      <Quote className="h-8 w-8 shrink-0 text-[#0089CF]/30" />
      <div>
        <p className="text-base italic leading-relaxed text-black/80 md:text-lg">
          „{text}”
        </p>
        {cite && (
          <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-black/50">
            {cite}
          </div>
        )}
      </div>
    </div>
  );
}

export function InlineReadMore({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <a
      href={to}
      className="not-prose mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#0089CF] hover:underline"
    >
      {label} <ArrowRight className="h-3.5 w-3.5" />
    </a>
  );
}
