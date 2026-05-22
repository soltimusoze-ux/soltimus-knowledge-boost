import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Construction } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";
import { listCases } from "@/content/case-studies";
import { PORTFOLIO } from "@/content/portfolio";

export const Route = createFileRoute("/realizacje/")({
  head: () =>
    buildMeta({
      title: "Realizacje — portfolio domów premium",
      description:
        "Portfolio realizacji Soltimus — pompy ciepła, fotowoltaika, magazyny energii w domach jednorodzinnych i rezydencjach.",
      path: "/realizacje",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Realizacje", url: `${SITE.url}/realizacje` },
        ]),
      ],
    }),
  component: RealizacjeIndexPage,
});

function RealizacjeIndexPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />

      {/* HERO */}
      <section className="border-b border-black/5 bg-[#FAFAF7] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Portfolio · Realizacje Soltimus
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Domy, w których{" "}
            <span className="italic font-light text-black/60">pracujemy</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            Współpracujemy z architektami, generalnymi wykonawcami i właścicielami
            nieruchomości premium. Każdy dom traktujemy jak jednorazowy projekt
            inżynierski.
          </p>
        </div>
      </section>

      {/* FEATURED CASE STUDIES (registry-driven) */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Case studies
          </div>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">
            Realizacje z pełnym rozbiorem inżynierskim.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {listCases().map((c) => (
              <Link
                key={c.slug}
                to="/realizacje/$slug"
                params={{ slug: c.slug }}
                className="group relative overflow-hidden rounded-3xl bg-black"
              >
                <div className="relative aspect-[16/11]">
                  <img
                    src={c.heroImage}
                    alt={c.heroImageAlt ?? c.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#F5B800]">
                      {c.location.city}
                    </div>
                    <div className="mt-3 text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                      {c.title}
                    </div>
                    <div className="mt-3 text-sm text-white/70">{c.excerpt}</div>
                    <div className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80">
                      Zobacz case study
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* REAL IMPLEMENTATION ARCHIVE — proof of scale & repeatability */}
          <div className="mt-20 flex flex-col gap-4 md:mt-24 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                Archiwum realizacji
              </div>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                Setki projektów. Polska codzienność inżynierska.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-black/55">
              Wybór z archiwum: domy, modernizacje, obiekty publiczne i
              komercyjne. Każda pozycja to realna instalacja w polskich
              warunkach.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PORTFOLIO.map((p) => (
              <figure
                key={p.id}
                className="group relative overflow-hidden rounded-2xl bg-black"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/70">
                      <span style={{ color: "#F5B800" }}>{p.location}</span>
                      <span className="text-white/30">·</span>
                      <span>{p.type}</span>
                    </div>
                    <div className="mt-1.5 text-[15px] font-medium leading-snug tracking-tight">
                      {p.title}
                    </div>
                    {p.system && (
                      <div className="mt-1 text-[11px] text-white/60">
                        {p.system}
                      </div>
                    )}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>


          {/* COMING SOON STRIP */}
          <div className="mt-20 overflow-hidden rounded-3xl border border-black/10 bg-[#FAFAF7] p-8 md:p-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-black/50">
                  <Construction className="h-3.5 w-3.5" /> Rozwijamy portfolio
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  Pełne case studies trafiają tu wkrótce.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-black/60 md:text-base">
                  Przygotowujemy szczegółowe omówienia kolejnych realizacji
                  z liczbami, decyzjami projektowymi i efektami u klienta.
                </p>
              </div>
              <Link
                to="/kontakt"
                className="group inline-flex items-center gap-2 self-start rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                Porozmawiaj o swoim projekcie
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
