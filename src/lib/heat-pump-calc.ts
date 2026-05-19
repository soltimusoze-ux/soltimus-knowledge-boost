/**
 * Heat pump sizing logic + Daikin product catalog for Soltimus calculator.
 * Values based on PN-EN 12831 unit-area heat-loss method (uproszczony).
 */

import altherma3R from "@/assets/daikin-altherma-3r.jpg";
import altherma3M from "@/assets/daikin-altherma-3m.jpg";
import altherma3H from "@/assets/daikin-altherma-3h.jpg";

export type BuildingType = "new" | "modernized" | "old";
export type Insulation = "wt2021" | "good" | "average" | "poor";
export type HeatingSystem = "underfloor" | "radiators" | "mixed";

/** Wskaźnik strat ciepła W/m² wg standardu izolacji × typ budynku */
const HEAT_LOSS_W_PER_M2: Record<BuildingType, Record<Insulation, number>> = {
  new: { wt2021: 35, good: 45, average: 55, poor: 65 },
  modernized: { wt2021: 55, good: 65, average: 80, poor: 95 },
  old: { wt2021: 90, good: 110, average: 130, poor: 160 },
};

/** Strefa klimatyczna PL (I–V), poprawka na temp. obliczeniową */
const CLIMATE_FACTOR: Record<number, number> = {
  1: 0.92, // -16°C
  2: 0.96, // -18°C
  3: 1.0, // -20°C
  4: 1.04, // -22°C
  5: 1.1, // -24°C
};

export interface CalcInput {
  buildingType: BuildingType;
  areaM2: number;
  floors: number;
  insulation: Insulation;
  heatingSystem: HeatingSystem;
  occupants: number;
  climateZone: number;
}

export interface CalcResult {
  heatDemandKw: number;
  recommendedPowerKw: number;
  series: "altherma-3r" | "altherma-3m" | "altherma-3h";
  product: DaikinProduct;
  priceMin: number;
  priceMax: number;
  notes: string[];
}

export function calculateHeatPump(input: CalcInput): CalcResult {
  const lossPerM2 = HEAT_LOSS_W_PER_M2[input.buildingType][input.insulation];
  const climate = CLIMATE_FACTOR[input.climateZone] ?? 1;

  // base demand
  let demandW = input.areaM2 * lossPerM2 * climate;
  // multi-storey correction (lower envelope per m² for compact buildings)
  if (input.floors >= 2) demandW *= 0.92;

  // add DHW continuous load contribution (~0.2 kW per person, very rough)
  const dhwW = Math.max(0, input.occupants - 1) * 200;
  const totalKw = (demandW + dhwW) / 1000;

  // round to 0.1
  const heatDemandKw = Math.round(totalKw * 10) / 10;
  // size with 10% safety margin, round up to standard rating
  const sizedKw = heatDemandKw * 1.1;

  // pick recommended series
  // - underfloor + new/modernized → Altherma 3 R (low-temp split, najpopularniejsza)
  // - mixed → Altherma 3 M (monoblok, brak czynnika w domu)
  // - radiators / old → Altherma 3 H HT (wysokotemperaturowa)
  let series: CalcResult["series"];
  if (input.heatingSystem === "radiators" || input.buildingType === "old") {
    series = "altherma-3h";
  } else if (input.heatingSystem === "mixed") {
    series = "altherma-3m";
  } else {
    series = "altherma-3r";
  }

  const product = pickProductVariant(series, sizedKw);
  const recommendedPowerKw = product.powerKw;

  const notes: string[] = [];
  if (input.buildingType === "old" && input.insulation === "poor") {
    notes.push(
      "Przy słabej izolacji rekomendujemy termomodernizację przed montażem — obniży to koszty eksploatacji o 30–50%.",
    );
  }
  if (input.heatingSystem === "radiators" && series !== "altherma-3h") {
    notes.push("Przy grzejnikach warto rozważyć wersję wysokotemperaturową dla pełnego komfortu w mrozie.");
  }
  if (sizedKw > 16) {
    notes.push("Zapotrzebowanie powyżej 16 kW — przygotujemy indywidualną wycenę z doborem kaskadowym.");
  }

  return {
    heatDemandKw,
    recommendedPowerKw,
    series,
    product,
    priceMin: product.priceMin,
    priceMax: product.priceMax,
    notes,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Catalog
// ─────────────────────────────────────────────────────────────────────────────

export interface DaikinProduct {
  id: string;
  series: "altherma-3r" | "altherma-3m" | "altherma-3h";
  name: string;
  shortName: string;
  powerKw: number;
  type: "split" | "monoblok" | "monoblok-ht";
  cop: string;
  energyClass: string;
  priceMin: number; // PLN netto (sama pompa + zasobnik)
  priceMax: number; // PLN brutto + montaż standard
  image: string;
  highlights: string[];
}

export const DAIKIN_CATALOG: DaikinProduct[] = [
  // Altherma 3 R — split, low-temp (podłogówka, nowe budynki)
  {
    id: "altherma-3r-4",
    series: "altherma-3r",
    name: "Daikin Altherma 3 R 4 kW",
    shortName: "Altherma 3 R · 4 kW",
    powerKw: 4,
    type: "split",
    cop: "5,10",
    energyClass: "A+++",
    priceMin: 32000,
    priceMax: 42000,
    image: altherma3R,
    highlights: ["Split — wysoki COP", "Podłogówka", "Ciche jednostki"],
  },
  {
    id: "altherma-3r-6",
    series: "altherma-3r",
    name: "Daikin Altherma 3 R 6 kW",
    shortName: "Altherma 3 R · 6 kW",
    powerKw: 6,
    type: "split",
    cop: "5,05",
    energyClass: "A+++",
    priceMin: 36000,
    priceMax: 48000,
    image: altherma3R,
    highlights: ["Najczęstszy wybór dla domów 100–150 m²", "R-32", "Bivalent ready"],
  },
  {
    id: "altherma-3r-8",
    series: "altherma-3r",
    name: "Daikin Altherma 3 R 8 kW",
    shortName: "Altherma 3 R · 8 kW",
    powerKw: 8,
    type: "split",
    cop: "4,98",
    energyClass: "A+++",
    priceMin: 41000,
    priceMax: 55000,
    image: altherma3R,
    highlights: ["Idealna dla 150–200 m²", "Niski poziom hałasu 35 dB(A)"],
  },
  // Altherma 3 M — monoblok
  {
    id: "altherma-3m-6",
    series: "altherma-3m",
    name: "Daikin Altherma 3 M 6 kW",
    shortName: "Altherma 3 M · 6 kW",
    powerKw: 6,
    type: "monoblok",
    cop: "4,75",
    energyClass: "A+++",
    priceMin: 34000,
    priceMax: 46000,
    image: altherma3M,
    highlights: ["Monoblok — brak czynnika wewnątrz", "Łatwy montaż"],
  },
  {
    id: "altherma-3m-9",
    series: "altherma-3m",
    name: "Daikin Altherma 3 M 9 kW",
    shortName: "Altherma 3 M · 9 kW",
    powerKw: 9,
    type: "monoblok",
    cop: "4,65",
    energyClass: "A++",
    priceMin: 42000,
    priceMax: 56000,
    image: altherma3M,
    highlights: ["Dla domów 160–220 m²", "Mieszane instalacje"],
  },
  // Altherma 3 H HT — wysokotemperaturowa (grzejniki, stary dom)
  {
    id: "altherma-3h-11",
    series: "altherma-3h",
    name: "Daikin Altherma 3 H HT 11 kW",
    shortName: "Altherma 3 H HT · 11 kW",
    powerKw: 11,
    type: "monoblok-ht",
    cop: "4,20",
    energyClass: "A++",
    priceMin: 48000,
    priceMax: 62000,
    image: altherma3H,
    highlights: ["Do 70°C na zasilaniu", "Grzejniki bez wymiany"],
  },
  {
    id: "altherma-3h-14",
    series: "altherma-3h",
    name: "Daikin Altherma 3 H HT 14 kW",
    shortName: "Altherma 3 H HT · 14 kW",
    powerKw: 14,
    type: "monoblok-ht",
    cop: "4,10",
    energyClass: "A++",
    priceMin: 54000,
    priceMax: 70000,
    image: altherma3H,
    highlights: ["Termomodernizowane domy 200+ m²", "Praca do -28°C"],
  },
  {
    id: "altherma-3h-16",
    series: "altherma-3h",
    name: "Daikin Altherma 3 H HT 16 kW",
    shortName: "Altherma 3 H HT · 16 kW",
    powerKw: 16,
    type: "monoblok-ht",
    cop: "4,00",
    energyClass: "A++",
    priceMin: 59000,
    priceMax: 78000,
    image: altherma3H,
    highlights: ["Duże domy", "Możliwość kaskadowania"],
  },
];

export function pickProductVariant(
  series: CalcResult["series"],
  sizedKw: number,
): DaikinProduct {
  const inSeries = DAIKIN_CATALOG.filter((p) => p.series === series);
  // najmniejszy wariant ≥ sizedKw; jeśli przekracza zakres → największy
  const fit = inSeries.find((p) => p.powerKw >= sizedKw);
  return fit ?? inSeries[inSeries.length - 1];
}

export function getRelatedProducts(productId: string, max = 2): DaikinProduct[] {
  const main = DAIKIN_CATALOG.find((p) => p.id === productId);
  if (!main) return [];
  return DAIKIN_CATALOG.filter((p) => p.id !== productId)
    .sort((a, b) => Math.abs(a.powerKw - main.powerKw) - Math.abs(b.powerKw - main.powerKw))
    .slice(0, max);
}

export const BUILDING_TYPE_LABELS: Record<BuildingType, string> = {
  new: "Nowy dom (po 2021)",
  modernized: "Termomodernizowany",
  old: "Starszy, bez modernizacji",
};

export const INSULATION_LABELS: Record<Insulation, string> = {
  wt2021: "Wysoka (WT 2021 / pasywny)",
  good: "Dobra (po 2010)",
  average: "Przeciętna",
  poor: "Słaba",
};

export const HEATING_LABELS: Record<HeatingSystem, string> = {
  underfloor: "Ogrzewanie podłogowe",
  radiators: "Grzejniki",
  mixed: "Mieszane (podłogówka + grzejniki)",
};

export const CLIMATE_ZONE_LABELS: Record<number, string> = {
  1: "I — zachodnia PL (-16°C)",
  2: "II — centralna zachodnia (-18°C)",
  3: "III — centralna (-20°C)",
  4: "IV — wschodnia (-22°C)",
  5: "V — Suwalszczyzna (-24°C)",
};
