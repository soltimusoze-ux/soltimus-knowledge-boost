import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Flame,
  Home,
  Layers,
  Droplets,
  Sparkles,
  AlertTriangle,
  Shield,
  Clock,
  Heart,
} from "lucide-react";

import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { saveRecommendedProduct } from "@/components/heat-pump/RecommendedProducts";
import {
  BUILDING_LABELS,
  HEATING_LABELS,
  TANK_LABELS,
  SERIES_LABELS,
  calculateHeatPump,
  type BuildingStandard,
  type CalcInput,
  type CustomUnit,
  type HeatingSystem,
  type TankType,
} from "@/lib/heat-pump-calc";
import { submitHeatPumpLead } from "@/lib/heat-pump-lead.functions";
import { COMPANY } from "@/lib/company";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

const ACCENT = "#F6B800";

export const Route = createFileRoute("/kalkulator-pompy-ciepla")({
  head: () =>
    buildMeta({
      title: "Kalkulator doboru pompy ciepła Daikin",
      description:
        "Orientacyjny dobór pompy ciepła Daikin Altherma w 60 sekund: moc, model, szacunkowa cena brutto z montażem.",
      path: "/kalkulator-pompy-ciepla",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Kalkulator pompy ciepła", url: `${SITE.url}/kalkulator-pompy-ciepla` },
        ]),
      ],
    }),
  component: CalculatorPage,
});

// ─── State ──────────────────────────────────────────────────────────────────

interface FormState {
  buildingStandard: BuildingStandard;
  customValue: string;
  customUnit: CustomUnit;
  areaM2: string;
  heating: HeatingSystem;
  tank: TankType;
}

const initialForm: FormState = {
  buildingStandard: "new_wt2021",
  customValue: "",
  customUnit: "w_m2",
  areaM2: "150",
  heating: "underfloor",
  tank: "ss_230",
};

interface LeadState {
  name: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
  rodo: boolean;
}

const initialLead: LeadState = { name: "", phone: "", email: "", city: "", notes: "", rodo: false };

// ─── Komponenty pomocnicze ──────────────────────────────────────────────────

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-5 py-4 text-left text-sm transition-all ${
        active
          ? "border-black bg-black text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
          : "border-black/10 bg-white text-black hover:border-black/30"
      }`}
    >
      {children}
    </button>
  );
}

function StepHeading({
  index,
  title,
  icon: Icon,
}: {
  index: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
        {index}
      </div>
      <Icon className="h-5 w-5 text-black/60" />
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

function fmtPLN(n: number) {
  return `${n.toLocaleString("pl-PL")} zł`;
}

// ─── Strona ─────────────────────────────────────────────────────────────────

function CalculatorPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [lead, setLead] = useState<LeadState>(initialLead);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const submitLead = useServerFn(submitHeatPumpLead);

  const calcInput: CalcInput | null = useMemo(() => {
    const area = parseFloat(form.areaM2);
    if (!area || area <= 0) return null;
    if (form.buildingStandard === "custom") {
      const v = parseFloat(form.customValue);
      if (!v || v <= 0) return null;
      return {
        buildingStandard: "custom",
        customValue: v,
        customUnit: form.customUnit,
        areaM2: area,
        heating: form.heating,
        tank: form.tank,
      };
    }
    return {
      buildingStandard: form.buildingStandard,
      areaM2: area,
      heating: form.heating,
      tank: form.tank,
    };
  }, [form]);

  const result = useMemo(() => (calcInput ? calculateHeatPump(calcInput) : null), [calcInput]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !calcInput) return;
    if (!lead.rodo) {
      toast.error("Wymagana zgoda RODO.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/meedveor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Kalkulator pompy ciepła - nowy lead",
          buildingStandard: calcInput.buildingStandard,
          customValue: calcInput.customValue ?? null,
          customUnit: calcInput.customUnit ?? null,
          areaM2: calcInput.areaM2,
          heating: calcInput.heating,
          tank: calcInput.tank,
          demandKw: result.demandKw,
          recommendedPowerKw: result.primary.product.powerKw,
          recommendedSeries: result.primary.product.series,
          recommendedModel: result.primary.product.modelName,
          estimatedPriceMin: result.primary.priceRange.min,
          estimatedPriceMax: result.primary.priceRange.max,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          city: lead.city,
          notes: lead.notes || null,
          rodoConsent: true,
          sourceUrl: typeof window !== "undefined" ? window.location.href : null,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      saveRecommendedProduct(result.primary.product.id);
      setSubmitted(true);
      toast.success("Dziękujemy. Skontaktujemy się z Tobą.");
    } catch (err) {
      console.error(err);
      toast.error("Nie udało się wysłać. Zadzwoń bezpośrednio.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <SiteHeader />

      {/* Hero — minimalist */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/70">
              <Sparkles className="h-3.5 w-3.5" style={{ color: ACCENT }} /> Kalkulator doboru · Daikin
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Dobierz pompę ciepła<br />
              <span className="text-black/40">w 60 sekund.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-black/60">
              Orientacyjna moc, model Daikin Altherma i szacunkowa cena brutto z montażem (8% VAT). Bez zobowiązań.
            </p>
          </div>
        </div>
      </section>

      {/* Gwarancja + serwis — trust strip */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 py-6 md:gap-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5">
              <Shield className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="text-sm font-semibold">5-letnia gwarancja</div>
              <div className="text-xs text-black/50">Na urządzenie i montaż</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5">
              <Clock className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="text-sm font-semibold">Serwis 24h</div>
              <div className="text-xs text-black/50">Całodobowa pomoc techniczna</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5">
              <Heart className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="text-sm font-semibold">Troska o Twój dom</div>
              <div className="text-xs text-black/50">Komfort i bezpieczeństwo rodziny</div>
            </div>
          </div>
        </div>
      </section>

      {/* Główna sekcja: formularz + sticky wynik */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Formularz */}
          <div className="space-y-10">
            {/* Krok 1 */}
            <div>
              <StepHeading index={1} title="Rodzaj budynku" icon={Home} />
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.keys(BUILDING_LABELS) as BuildingStandard[]).map((b) => (
                  <Pill
                    key={b}
                    active={form.buildingStandard === b}
                    onClick={() => setForm((f) => ({ ...f, buildingStandard: b }))}
                  >
                    <div className="font-medium">{BUILDING_LABELS[b]}</div>
                    {b !== "custom" && (
                      <div className="mt-1 text-xs opacity-60">
                        {{ old_pre: "150 W/m²", old_post: "80 W/m²", new_wt2021: "45 W/m²" }[b]}
                      </div>
                    )}
                  </Pill>
                ))}
              </div>

              {form.buildingStandard === "custom" && (
                <div className="mt-4 grid gap-3 rounded-2xl border border-black/10 bg-white p-4 sm:grid-cols-[1fr_auto]">
                  <input
                    type="number"
                    placeholder="np. 60"
                    value={form.customValue}
                    onChange={(e) => setForm((f) => ({ ...f, customValue: e.target.value }))}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none"
                  />
                  <div className="flex rounded-xl bg-black/5 p-1 text-xs">
                    {(["w_m2", "kwh_m2_yr"] as CustomUnit[]).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, customUnit: u }))}
                        className={`flex-1 rounded-lg px-3 py-2 transition-all ${
                          form.customUnit === u ? "bg-white shadow-sm font-medium" : "text-black/60"
                        }`}
                      >
                        {u === "w_m2" ? "W/m²" : "kWh/m²/rok"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Krok 2 */}
            <div>
              <StepHeading index={2} title="Powierzchnia ogrzewana" icon={Layers} />
              <div className="relative">
                <input
                  type="number"
                  value={form.areaM2}
                  onChange={(e) => setForm((f) => ({ ...f, areaM2: e.target.value }))}
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 pr-16 text-2xl font-semibold tracking-tight focus:border-black focus:outline-none"
                />
                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-black/40">
                  m²
                </span>
              </div>
            </div>

            {/* Krok 3 */}
            <div>
              <StepHeading index={3} title="Rodzaj instalacji grzewczej" icon={Flame} />
              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(HEATING_LABELS) as HeatingSystem[]).map((h) => (
                  <Pill key={h} active={form.heating === h} onClick={() => setForm((f) => ({ ...f, heating: h }))}>
                    <div className="font-medium">{HEATING_LABELS[h]}</div>
                  </Pill>
                ))}
              </div>
            </div>

            {/* Krok 4 */}
            <div>
              <StepHeading index={4} title="Ciepła woda użytkowa" icon={Droplets} />
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.keys(TANK_LABELS) as TankType[]).map((t) => (
                  <Pill key={t} active={form.tank === t} onClick={() => setForm((f) => ({ ...f, tank: t }))}>
                    <div className="font-medium">{TANK_LABELS[t]}</div>
                  </Pill>
                ))}
              </div>
              <p className="mt-3 text-xs text-black/40">
                CWU wpływa wyłącznie na sugerowany zestaw i cenę — nie zmienia mocy pompy.
              </p>

              <Link
                to="/wiedza/pompy-ciepla/zbiorniki-cwu-do-pompy-ciepla"
                className="group mt-4 flex items-start gap-4 rounded-2xl border border-black/10 bg-[#FAFAF7] p-4 transition hover:border-black/30 hover:bg-white md:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                  <Droplets className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#0089CF]">
                    Strefa wiedzy · Poradnik
                  </div>
                  <div className="mt-1 text-sm font-semibold leading-snug md:text-base">
                    Czym się różnią zbiorniki c.w.u.? Nie wiesz jaki rodzaj i pojemność wybrać?
                  </div>
                  <p className="mt-1 text-xs text-black/60 md:text-sm">
                    Nasi eksperci wyjaśniają różnice między zbiornikami emaliowanymi, ze stali nierdzewnej i buforowymi — oraz jak dobrać pojemność do liczby domowników.
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-black/40 transition group-hover:translate-x-0.5 group-hover:text-black" />
              </Link>
            </div>

            {/* Krok 5 — lead */}
            <div id="lead" className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
              <StepHeading index={5} title="Otrzymaj pełną ofertę" icon={CheckCircle2} />

              {submitted ? (
                <div className="rounded-2xl bg-black/5 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-black" />
                  <h4 className="mt-3 text-lg font-semibold">Dziękujemy.</h4>
                  <p className="mt-1 text-sm text-black/60">
                    Skontaktujemy się z Tobą.
                  </p>
                </div>
              ) : (
                <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleLeadSubmit}>
                  <input
                    required
                    placeholder="Imię i nazwisko"
                    value={lead.name}
                    onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Telefon"
                    value={lead.phone}
                    onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="E-mail"
                    value={lead.email}
                    onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none"
                  />
                  <input
                    placeholder="Miejscowość / województwo"
                    value={lead.city}
                    onChange={(e) => setLead((l) => ({ ...l, city: e.target.value }))}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    placeholder="Dodatkowe informacje (opcjonalnie)"
                    value={lead.notes}
                    onChange={(e) => setLead((l) => ({ ...l, notes: e.target.value }))}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none sm:col-span-2"
                  />
                  <label className="flex items-start gap-3 text-xs text-black/60 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={lead.rodo}
                      onChange={(e) => setLead((l) => ({ ...l, rodo: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 accent-black"
                    />
                    <span>
                      Wyrażam zgodę na przetwarzanie moich danych przez {COMPANY.legalName} w celu przygotowania
                      oferty (RODO).
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={sending || !result}
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50 sm:col-span-2"
                    style={{ backgroundColor: ACCENT, color: "#000" }}
                  >
                    {sending ? "Wysyłanie…" : "Wyślij wynik i otrzymaj pełną ofertę"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>

            <p className="text-xs leading-relaxed text-black/40">
              Kalkulator ma charakter orientacyjny. Finalny dobór wymaga weryfikacji OZC, instalacji grzewczej,
              temperatur zasilania i warunków montażowych.
            </p>
          </div>

          {/* Sticky wynik */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ResultCard result={result} heating={form.heating} tank={form.tank} />
          </aside>
        </div>
      </section>

      {/* Dlaczego taka rekomendacja */}
      {result && (
        <section className="border-t border-black/5 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Dlaczego taka rekomendacja?</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Why title="Zapotrzebowanie budynku">
                Na podstawie powierzchni {form.areaM2} m² i standardu „{BUILDING_LABELS[form.buildingStandard]}"
                {result.indicatorWperM2 != null && ` (${result.indicatorWperM2} W/m²)`} szacujemy
                zapotrzebowanie na <strong>{result.demandKw} kW</strong> przy temperaturze projektowej -20°C.
              </Why>
              <Why title="Wpływ rodzaju ogrzewania">
                {form.heating === "underfloor" &&
                  "Podłogówka pracuje na niskich temperaturach zasilania (35–40°C) — idealnie współpracuje z pompami niskotemperaturowymi (Altherma 3 R, 4 H)."}
                {form.heating === "radiators" &&
                  "Grzejniki potrzebują wyższych temperatur zasilania (50–65°C) — rekomendujemy Altherma 4 H lub wysokotemperaturową Altherma 3 H HT."}
                {form.heating === "mixed" &&
                  "Instalacja mieszana wymaga elastyczności w doborze — Altherma 4 H lub 3 H HT poradzą sobie z obydwoma obiegami."}
              </Why>
              <Why title="Dlaczego ta seria">
                Wybraliśmy <strong>{SERIES_LABELS[result.primary.product.series]}</strong> jako najlepiej dopasowaną do
                Twojego typu instalacji. Moc {result.primary.product.powerKw} kW jest najbliższa wyliczonemu
                zapotrzebowaniu.
              </Why>
              <Why title="Kiedy warto rozważyć alternatywę">
                Alternatywne serie ({result.alternatives.map((a) => SERIES_LABELS[a.product.series]).join(", ")})
                warto rozważyć, jeśli zależy Ci na innym typie urządzenia (split vs monoblok), wyższych temperaturach
                zasilania lub ekologicznym czynniku R-290 (Altherma 4 H).
              </Why>
            </div>

            {result.notes.length > 0 && (
              <div className="mt-8 space-y-2">
                {result.notes.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/70"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

// ─── Wynik ──────────────────────────────────────────────────────────────────

function ResultCard({
  result,
  heating,
  tank,
}: {
  result: ReturnType<typeof calculateHeatPump> | null;
  heating: HeatingSystem;
  tank: TankType;
}) {
  if (!result) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-8 text-center text-sm text-black/40">
        Uzupełnij dane, aby zobaczyć rekomendację.
      </div>
    );
  }

  const { primary, alternatives } = result;

  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="bg-black p-6 text-white">
        <div className="text-xs uppercase tracking-widest text-white/50">Rekomendacja</div>
        <div className="mt-2 text-xl font-semibold">{primary.product.modelName}</div>
        <div className="mt-1 text-sm text-white/70">
          {primary.product.powerKw} kW · {primary.product.unitType === "split" ? "Split" : "Monoblok"}
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 divide-x divide-y divide-black/5 border-b border-black/5 text-sm">
        <Spec label="Zapotrzebowanie" value={`${result.demandKw} kW`} />
        <Spec label="Dobrana moc" value={`${primary.product.powerKw} kW`} />
        <Spec label="Instalacja" value={HEATING_LABELS[heating]} />
        <Spec label="CWU" value={TANK_LABELS[tank]} />
      </div>

      {/* Cena */}
      <div className="p-6">
        <div className="text-xs uppercase tracking-widest text-black/40">
          Cena brutto z montażem (8% VAT)
        </div>
        <div className="mt-2 text-3xl font-semibold tracking-tight">
          {fmtPLN(primary.priceRange.min)} – {fmtPLN(primary.priceRange.max)}
        </div>
        <p className="mt-2 text-xs text-black/50">
          Orientacyjnie: pompa + zasobnik + standardowy montaż. Dokładna wycena po weryfikacji instalacji.
        </p>

        <a
          href="#lead"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: ACCENT, color: "#000" }}
        >
          Otrzymaj pełną ofertę <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Alternatywy */}
      {alternatives.length > 0 && (
        <div className="border-t border-black/5 bg-[#fafafa] p-6">
          <div className="mb-3 text-xs uppercase tracking-widest text-black/40">Alternatywy</div>
          <div className="space-y-2">
            {alternatives.map((alt) => (
              <div
                key={alt.product.id}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-white p-3 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{alt.product.modelName}</div>
                  <div className="text-xs text-black/50">{alt.product.powerKw} kW</div>
                </div>
                <div className="text-right text-xs text-black/60">
                  od {fmtPLN(alt.priceRange.min)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4">
      <div className="text-[10px] uppercase tracking-widest text-black/40">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function Why({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6">
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-black/60">{children}</p>
    </div>
  );
}
