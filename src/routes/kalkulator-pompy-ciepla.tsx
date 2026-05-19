import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Home,
  Layers,
  Phone,
  Sparkles,
  ThermometerSun,
  Users,
} from "lucide-react";

import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { saveRecommendedProduct } from "@/components/heat-pump/RecommendedProducts";
import {
  BUILDING_TYPE_LABELS,
  CLIMATE_ZONE_LABELS,
  DAIKIN_CATALOG,
  HEATING_LABELS,
  INSULATION_LABELS,
  calculateHeatPump,
  getRelatedProducts,
  type BuildingType,
  type CalcInput,
  type HeatingSystem,
  type Insulation,
} from "@/lib/heat-pump-calc";
import { submitHeatPumpLead } from "@/lib/heat-pump-lead.functions";
import { COMPANY } from "@/lib/company";
import heroImg from "@/assets/kalkulator-hero.jpg";

export const Route = createFileRoute("/kalkulator-pompy-ciepla")({
  head: () => ({
    meta: [
      { title: "Kalkulator doboru pompy ciepła Daikin — Soltimus" },
      {
        name: "description",
        content:
          "Dobierz pompę ciepła Daikin Altherma dla swojego domu w 60 sekund. Powierzchnia, izolacja, instalacja — otrzymasz moc, model i szacunkową cenę.",
      },
      { property: "og:title", content: "Kalkulator doboru pompy ciepła Daikin — Soltimus" },
      { property: "og:description", content: "Sprawdź jaką pompę ciepła wybrać. Szacunkowa wycena Daikin Altherma." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: CalculatorPage,
});

const PRESET_AREAS = [100, 120, 150, 180, 220];

function CalculatorPage() {
  const submit = useServerFn(submitHeatPumpLead);

  const [input, setInput] = useState<CalcInput>({
    buildingType: "new",
    areaM2: 150,
    floors: 1,
    insulation: "good",
    heatingSystem: "underfloor",
    occupants: 4,
    climateZone: 3,
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [rodo, setRodo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => calculateHeatPump(input), [input]);
  const related = useMemo(() => getRelatedProducts(result.product.id, 2), [result.product.id]);

  function update<K extends keyof CalcInput>(key: K, value: CalcInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rodo) {
      toast.error("Wymagana jest zgoda na przetwarzanie danych.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submit({
        data: {
          ...input,
          heatDemandKw: result.heatDemandKw,
          recommendedPowerKw: result.recommendedPowerKw,
          recommendedSeries: result.product.shortName,
          estimatedPriceMin: result.priceMin,
          estimatedPriceMax: result.priceMax,
          name,
          phone,
          email,
          rodoConsent: true,
          notes: notes || null,
          sourceUrl: typeof window !== "undefined" ? window.location.href : null,
        },
      });
      if (res.ok) {
        saveRecommendedProduct(result.product.id);
        setSubmitted(true);
        toast.success("Dziękujemy! Skontaktujemy się w ciągu 24h.");
      } else {
        toast.error("Nie udało się zapisać zgłoszenia. Spróbuj ponownie.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Wystąpił błąd. Zadzwoń: " + COMPANY.phone);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-black">
      <SiteHeader variant="solid" />

      {/* HERO */}
      <section className="relative pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#F8F7F4]" />
        </div>
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-10 md:px-8 md:pb-20 md:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Kalkulator doboru
          </div>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-light leading-[1.05] tracking-tight text-white md:text-6xl">
            Jaka pompa ciepła do <span className="font-medium">Twojego domu</span>?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Odpowiedz na kilka pytań, a otrzymasz rekomendowaną moc, model Daikin Altherma
            i szacunkową cenę. Bez logowania, bez spamu.
          </p>
        </div>
      </section>

      {/* CALCULATOR + LIVE RESULT */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* FORM (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            <CalcCard
              icon={<Home className="h-4 w-4" />}
              title="1. Typ budynku"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {(Object.keys(BUILDING_TYPE_LABELS) as BuildingType[]).map((t) => (
                  <OptionPill
                    key={t}
                    selected={input.buildingType === t}
                    onClick={() => update("buildingType", t)}
                    label={BUILDING_TYPE_LABELS[t]}
                  />
                ))}
              </div>
            </CalcCard>

            <CalcCard
              icon={<Layers className="h-4 w-4" />}
              title="2. Powierzchnia ogrzewana"
            >
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={20}
                  max={2000}
                  value={input.areaM2}
                  onChange={(e) => update("areaM2", Math.max(20, Math.min(2000, Number(e.target.value) || 0)))}
                  className="w-32 rounded-xl border border-black/15 bg-white px-4 py-3 text-lg font-medium text-black focus:border-black focus:outline-none"
                />
                <span className="text-sm text-black/60">m²</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESET_AREAS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => update("areaM2", a)}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      input.areaM2 === a
                        ? "bg-black text-white"
                        : "bg-black/5 text-black/70 hover:bg-black/10"
                    }`}
                  >
                    {a} m²
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-sm text-black/60">Kondygnacje:</span>
                {[1, 2, 3].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => update("floors", f)}
                    className={`h-9 w-9 rounded-full text-sm transition-colors ${
                      input.floors === f
                        ? "bg-black text-white"
                        : "bg-black/5 text-black/70 hover:bg-black/10"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </CalcCard>

            <CalcCard
              icon={<ThermometerSun className="h-4 w-4" />}
              title="3. Standard izolacji"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(Object.keys(INSULATION_LABELS) as Insulation[]).map((i) => (
                  <OptionPill
                    key={i}
                    selected={input.insulation === i}
                    onClick={() => update("insulation", i)}
                    label={INSULATION_LABELS[i]}
                  />
                ))}
              </div>
            </CalcCard>

            <CalcCard
              icon={<Flame className="h-4 w-4" />}
              title="4. Rodzaj instalacji grzewczej"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {(Object.keys(HEATING_LABELS) as HeatingSystem[]).map((h) => (
                  <OptionPill
                    key={h}
                    selected={input.heatingSystem === h}
                    onClick={() => update("heatingSystem", h)}
                    label={HEATING_LABELS[h]}
                  />
                ))}
              </div>
            </CalcCard>

            <CalcCard
              icon={<Users className="h-4 w-4" />}
              title="5. Liczba domowników (CWU)"
            >
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update("occupants", n)}
                    className={`h-10 w-10 rounded-full text-sm transition-colors ${
                      input.occupants === n
                        ? "bg-black text-white"
                        : "bg-black/5 text-black/70 hover:bg-black/10"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </CalcCard>

            <CalcCard
              icon={<ThermometerSun className="h-4 w-4" />}
              title="6. Strefa klimatyczna"
            >
              <select
                value={input.climateZone}
                onChange={(e) => update("climateZone", Number(e.target.value))}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black focus:border-black focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((z) => (
                  <option key={z} value={z}>
                    {CLIMATE_ZONE_LABELS[z]}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-black/50">
                W razie wątpliwości pozostaw strefę III (centralna Polska, Mazowsze).
              </p>
            </CalcCard>
          </div>

          {/* RESULT (2/5) — sticky on desktop */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Recommended product */}
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
                <div className="aspect-[4/3] bg-neutral-100">
                  <img
                    src={result.product.image}
                    alt={result.product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium uppercase tracking-wider text-[#F5B800]">
                    Rekomendacja
                  </div>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">
                    {result.product.name}
                  </h3>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <Stat label="Zapotrzebowanie" value={`${result.heatDemandKw} kW`} />
                    <Stat label="Moc pompy" value={`${result.recommendedPowerKw} kW`} />
                    <Stat label="COP" value={result.product.cop} />
                  </div>
                  <div className="mt-4 rounded-xl bg-black/5 p-4 text-center">
                    <div className="text-xs text-black/60">Szacunkowa inwestycja</div>
                    <div className="text-xl font-semibold text-black">
                      {result.priceMin.toLocaleString("pl-PL")} –{" "}
                      {result.priceMax.toLocaleString("pl-PL")} zł
                    </div>
                    <div className="mt-1 text-[11px] text-black/50">
                      Pompa + zasobnik + montaż standard. Bez dofinansowań.
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {result.product.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-black/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {result.notes.length > 0 && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                      {result.notes.map((n) => (
                        <p key={n} className="leading-relaxed">{n}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Alternatives */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="text-xs font-medium uppercase tracking-wider text-black/50">
                    Alternatywne modele
                  </div>
                  <div className="mt-3 space-y-3">
                    {related.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{p.shortName}</div>
                          <div className="text-xs text-black/60">
                            COP {p.cop} · od {p.priceMin.toLocaleString("pl-PL")} zł
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LEAD FORM */}
        <div className="mt-16 rounded-3xl bg-black p-8 text-white md:p-12">
          {submitted ? (
            <div className="mx-auto max-w-xl text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
              <h2 className="mt-4 text-2xl font-light tracking-tight md:text-3xl">
                Dziękujemy, {name.split(" ")[0]}!
              </h2>
              <p className="mt-3 text-white/70">
                Wynik kalkulatora zapisaliśmy — nasz inżynier odezwie się do 24h, żeby
                doprecyzować dobór i przygotować pełną ofertę.
              </p>
              <p className="mt-2 text-sm text-white/50">
                W międzyczasie zapisaliśmy Twoją rekomendację — model{" "}
                <strong className="text-white">{result.product.shortName}</strong> będzie
                pojawiał się w stopce strony jako szybki podgląd.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={`tel:${COMPANY.phoneE164}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> {COMPANY.phone}
                </a>
                <Link
                  to="/wiedza"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-5 py-2.5 text-sm font-semibold text-black"
                >
                  Strefa Wiedzy <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-[#F5B800]" /> Bezpłatna konsultacja
                </div>
                <h2 className="mt-4 text-3xl font-light leading-tight tracking-tight md:text-4xl">
                  Otrzymaj <span className="font-medium">pełną ofertę</span> dopasowaną do Twojego domu.
                </h2>
                <p className="mt-4 text-white/70">
                  Inżynier Soltimus zweryfikuje dobór, oszacuje koszty dofinansowania
                  (Czyste Powietrze, Mój Prąd) i przygotuje wycenę pod klucz.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/80">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                    Indywidualny dobór mocy z uwzględnieniem audytu
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                    Pełna obsługa wniosków o dofinansowanie
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                    Autoryzowany Partner Daikin — 5 lat gwarancji
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field
                  label="Imię i nazwisko"
                  value={name}
                  onChange={setName}
                  required
                  autoComplete="name"
                />
                <Field
                  label="Telefon"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  required
                  autoComplete="tel"
                />
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                  autoComplete="email"
                />
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-white/60">
                    Dodatkowe informacje (opcjonalnie)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Np. preferowany termin montażu, dodatkowe pytania..."
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                  />
                </div>
                <label className="flex items-start gap-3 text-xs text-white/70">
                  <input
                    type="checkbox"
                    checked={rodo}
                    onChange={(e) => setRodo(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/30 bg-white/5"
                  />
                  <span>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez{" "}
                    {COMPANY.legalName} w celu kontaktu i przygotowania oferty.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.01] disabled:opacity-60"
                >
                  {submitting ? "Wysyłanie..." : "Otrzymaj pełną wycenę"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-[11px] text-white/40">
                  Nie wysyłamy spamu. Dane wykorzystamy wyłącznie do przygotowania oferty.
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Methodology */}
        <div className="mt-16 rounded-2xl border border-black/10 bg-white p-6 md:p-10">
          <h2 className="text-2xl font-light tracking-tight md:text-3xl">
            Jak liczymy dobór?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-black/70 md:text-base">
            Korzystamy z uproszczonej metody jednostkowej wg PN-EN 12831, w której
            zapotrzebowanie cieplne budynku wynosi <strong>powierzchnia × wskaźnik strat</strong>{" "}
            (W/m²), modyfikowane o poprawkę strefy klimatycznej i dodatek na CWU.
            Końcowy wynik powiększamy o 10% margines bezpieczeństwa, a następnie
            dobieramy najbliższy standardowy wariant Daikin Altherma.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/60 md:text-base">
            Wynik kalkulatora jest <strong>orientacyjny</strong>. Dokładny dobór
            wymaga audytu termicznego — wykonujemy go bezpłatnie dla klientów Soltimus.
          </p>
        </div>

        {/* Catalog snapshot */}
        <div className="mt-16">
          <h2 className="text-2xl font-light tracking-tight md:text-3xl">
            Cała gama Daikin Altherma
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DAIKIN_CATALOG.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white"
              >
                <div className="aspect-square bg-neutral-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain p-3" loading="lazy" />
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold">{p.shortName}</div>
                  <div className="mt-1 text-xs text-black/60">COP {p.cop} · {p.energyClass}</div>
                  <div className="mt-2 text-sm font-medium text-black">
                    od {p.priceMin.toLocaleString("pl-PL")} zł
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function CalcCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-black/50">
        {icon}
        {title}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function OptionPill({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
        selected
          ? "border-black bg-black text-white"
          : "border-black/15 bg-white text-black/80 hover:border-black/40"
      }`}
    >
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/5 p-2">
      <div className="text-[10px] uppercase tracking-wider text-black/50">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-black">{value}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-white/60">
        {label} {required && <span className="text-[#F5B800]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/50 focus:outline-none"
      />
    </div>
  );
}
