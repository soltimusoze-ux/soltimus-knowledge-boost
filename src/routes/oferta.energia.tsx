import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sun,
  Battery,
  Zap,
  Car,
  Gauge,
  Cpu,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { COMPANY } from "@/lib/company";

export const Route = createFileRoute("/oferta/energia")({
  head: () => ({
    meta: [
      {
        title:
          "Wytwarzanie i magazynowanie energii elektrycznej — Soltimus",
      },
      {
        name: "description",
        content:
          "Fotowoltaika premium, magazyny energii Sigenergy, taryfa dynamiczna PSTRYK, elektromobilność. Kompletny system zarządzania energią dla Twojego domu.",
      },
      {
        property: "og:title",
        content:
          "Wytwarzanie i magazynowanie energii elektrycznej — Soltimus",
      },
      {
        property: "og:description",
        content:
          "Zaprojektuj dom, który sam wytwarza, magazynuje i mądrze zużywa energię.",
      },
    ],
  }),
  component: EnergiaPage,
});

const PILLARS = [
  {
    icon: Sun,
    title: "Fotowoltaika",
    lead: "Premium panele i falowniki dobrane do realnego zużycia.",
    points: [
      "Projekt pod autokonsumpcję, nie pod metr kwadratowy dachu",
      "Komponenty Tier-1 z 25-letnią gwarancją mocy",
      "Montaż na dachu i gruncie",
      "Monitoring produkcji 24/7",
    ],
  },
  {
    icon: Battery,
    title: "Magazyny energii Sigenergy",
    lead: "Modułowe magazyny LFP — od 5 do 48 kWh.",
    points: [
      "Współpraca z PV, pompą ciepła i ładowarką EV",
      "Tryb wyspowy (backup) podczas awarii sieci",
      "Optymalizacja kosztów na taryfie dynamicznej",
      "Skalowanie pojemności w czasie",
    ],
  },
  {
    icon: Gauge,
    title: "Taryfa dynamiczna PSTRYK",
    lead: "Płać tyle, ile naprawdę kosztuje prąd o danej godzinie.",
    points: [
      "Konfiguracja automatyki pod ceny godzinowe",
      "Sterowanie pompą ciepła i ładowaniem auta",
      "Ładowanie magazynu w godzinach tanich",
      "Realne oszczędności 20–40% rocznie",
    ],
  },
  {
    icon: Car,
    title: "Elektromobilność",
    lead: "Ładowarki AC i DC zintegrowane z domem.",
    points: [
      "Dobór mocy ładowarki do instalacji",
      "Ładowanie nadwyżką z PV",
      "Sterowanie z poziomu jednej aplikacji",
      "Przygotowanie pod drugie auto w przyszłości",
    ],
  },
];

function EnergiaPage() {
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
          <h1 className="mt-6 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Wytwarzanie i magazynowanie{" "}
            <span className="italic font-light text-black/60">
              energii elektrycznej
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            Spójny system, który produkuje, magazynuje i mądrze zużywa energię.
            Fotowoltaika, magazyn Sigenergy, taryfa dynamiczna PSTRYK i
            elektromobilność — wszystko zaprojektowane jako jedna całość.
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

      {/* PILLARS */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Cztery filary systemu
          </p>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            Jeden ekosystem zamiast czterech osobnych instalacji.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="group flex flex-col gap-5 bg-white p-8 transition-colors hover:bg-[#FAFAF7] md:p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5B800]/15 text-black transition-transform group-hover:scale-110">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-black/60">{p.lead}</p>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-black/70">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        style={{ color: "#F5B800" }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Jak to działa
          </p>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            Energia produkowana, magazynowana i zużywana w odpowiednim momencie.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Sun,
                step: "01",
                title: "Produkcja",
                desc: "PV pokrywa zużycie w dzień. Nadwyżki ładują magazyn i auto.",
              },
              {
                icon: Cpu,
                step: "02",
                title: "Zarządzanie",
                desc: "Automatyka czyta ceny PSTRYK i prognozę PV, planuje pracę pompy ciepła i ładowarki.",
              },
              {
                icon: Zap,
                step: "03",
                title: "Zużycie",
                desc: "W godzinach drogich dom korzysta z magazynu. Z sieci tylko wtedy, gdy to się opłaca.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-black/5 bg-white p-8"
              >
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-black/70" />
                  <span className="text-xs font-medium text-black/40">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
            Następny krok
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Zaprojektujmy Twój system energetyczny.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Bezpłatna konsultacja z inżynierem — sprawdzimy, co realnie się
            opłaca w Twoim budynku i jaką oszczędność daje pełna integracja.
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
