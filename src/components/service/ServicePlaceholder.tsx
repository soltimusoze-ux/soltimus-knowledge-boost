import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { COMPANY } from "@/lib/company";

/**
 * Lightweight service page used for services that don't yet have a full
 * blueprint-driven page in `src/content/services/`. Keeps the site free of
 * dead cards and 404s while preserving editorial tone, IA and CTA flow.
 */
export interface ServicePlaceholderProps {
  eyebrow: string;
  title: string;
  italicTail?: string;
  intro: string;
  scope: string[];
  process: { step: string; title: string; text: string }[];
  consultationNote?: string;
}

export function ServicePlaceholder(p: ServicePlaceholderProps) {
  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />

      {/* HERO */}
      <section className="border-b border-black/5 bg-[#FAFAF7] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/oferta"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-black/50 hover:text-black"
          >
            <ArrowLeft className="h-3 w-3" />
            Oferta
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-black/50">
            {p.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            {p.title}
            {p.italicTail ? (
              <>
                {" "}
                <span className="italic font-light text-black/60">
                  {p.italicTail}
                </span>
              </>
            ) : null}
            .
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            {p.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Umów konsultację
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium text-black hover:bg-black/5"
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Zakres usługi
          </p>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            Co dokładnie obejmuje współpraca.
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {p.scope.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-5 text-sm text-black/75"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: "#F5B800" }}
                />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Jak pracujemy
          </p>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            Proces inżynierski — bez pośpiechu, bez gotowych szablonów.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {p.process.map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-black/5 bg-white p-8"
              >
                <span className="text-xs font-medium text-black/40">
                  {s.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          {p.consultationNote ? (
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-black/55">
              {p.consultationNote}
            </p>
          ) : null}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
            Następny krok
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Porozmawiajmy o Twoim projekcie.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Bezpłatna konsultacja inżynierska. Bez presji sprzedażowej,
            z konkretnym planem dalszych kroków.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
            >
              Umów konsultację
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5"
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
