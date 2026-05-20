/**
 * Soltimus — kalkulator doboru pompy ciepła Daikin (powietrze-woda).
 * Orientacyjny dobór; finalny dobór wymaga OZC.
 */

import altherma3R from "@/assets/daikin-altherma-3r.jpg";
import altherma3M from "@/assets/daikin-altherma-3m.jpg";
import altherma3H from "@/assets/daikin-altherma-3h.jpg";

// ─── Typy ───────────────────────────────────────────────────────────────────

export type BuildingStandard = "old_pre" | "old_post" | "new_wt2021" | "custom";
export type CustomUnit = "w_m2" | "kwh_m2_yr";
export type HeatingSystem = "underfloor" | "radiators" | "mixed";
export type TankType = "none" | "ss_180" | "ss_230" | "hyg_300" | "hyg_500";
export type SeriesId = "altherma-3r" | "altherma-3r-mt" | "altherma-3h" | "altherma-3m" | "altherma-4h";

export const BUILDING_INDICATOR_W_PER_M2: Record<Exclude<BuildingStandard, "custom">, number> = {
  old_pre: 150,
  old_post: 80,
  new_wt2021: 45,
};

export const BUILDING_LABELS: Record<BuildingStandard, string> = {
  old_pre: "Stary przed termomodernizacją",
  old_post: "Stary po termomodernizacji",
  new_wt2021: "Nowy WT2021",
  custom: "Własne EU / zapotrzebowanie",
};

export const HEATING_LABELS: Record<HeatingSystem, string> = {
  underfloor: "Ogrzewanie podłogowe",
  radiators: "Grzejniki",
  mixed: "Mieszane (podłogówka + grzejniki)",
};

export const TANK_LABELS: Record<TankType, string> = {
  none: "Brak zbiornika",
  ss_180: "Zbiornik nierdzewny 180 l",
  ss_230: "Zbiornik nierdzewny 230 l",
  hyg_300: "Zasobnik higieniczny 300 l",
  hyg_500: "Zasobnik higieniczny 500 l",
};

export const TANK_PRICE_NET: Record<TankType, number> = {
  none: 0,
  ss_180: 4500,
  ss_230: 5500,
  hyg_300: 9000,
  hyg_500: 13000,
};

export const SERIES_LABELS: Record<SeriesId, string> = {
  "altherma-3r": "Daikin Altherma 3 R split (ERGA / ERLA)",
  "altherma-3r-mt": "Daikin Altherma 3 R MT split",
  "altherma-3h": "Daikin Altherma 3 H MT / HT",
  "altherma-3m": "Daikin Altherma 3 M monoblok",
  "altherma-4h": "Daikin Altherma 4 H",
};

const SERIES_IMAGE: Record<SeriesId, string> = {
  "altherma-3r": altherma3R,
  "altherma-3r-mt": altherma3R,
  "altherma-3h": altherma3H,
  "altherma-3m": altherma3M,
  "altherma-4h": altherma3R,
};

// ─── Katalog produktów ──────────────────────────────────────────────────────

export interface DaikinProduct {
  id: string;
  series: SeriesId;
  /** legacy alias used by RecommendedProductsStrip */
  name: string;
  modelName: string;
  powerKw: number;
  unitType: "split" | "monoblok";
  listPriceNet: number;
  image: string;
  recommendedFor: HeatingSystem[];
  /** placeholder values for RecommendedProductsStrip back-compat */
  priceMin: number;
  priceMax: number;
}

function mk(
  series: SeriesId,
  modelName: string,
  powerKw: number,
  unitType: "split" | "monoblok",
  listPriceNet: number,
  recommendedFor: HeatingSystem[],
): DaikinProduct {
  return {
    id: `${series}-${powerKw}`,
    series,
    name: `${modelName} ${powerKw} kW`,
    modelName,
    powerKw,
    unitType,
    listPriceNet,
    image: SERIES_IMAGE[series],
    recommendedFor,
    priceMin: 0,
    priceMax: 0,
  };
}

export const DAIKIN_CATALOG: DaikinProduct[] = [
  // Altherma 3 R split — podłogówka, niskotemperaturowa
  mk("altherma-3r", "Altherma 3 R ERGA", 4, "split", 38000, ["underfloor"]),
  mk("altherma-3r", "Altherma 3 R ERGA", 6, "split", 42000, ["underfloor", "radiators", "mixed"]),
  mk("altherma-3r", "Altherma 3 R ERGA", 8, "split", 48000, ["underfloor", "radiators", "mixed"]),
  // Altherma 3 R MT — średniotemperaturowa
  mk("altherma-3r-mt", "Altherma 3 R MT", 8, "split", 52000, ["radiators", "mixed"]),
  mk("altherma-3r-mt", "Altherma 3 R MT", 10, "split", 58000, ["radiators", "mixed"]),
  mk("altherma-3r-mt", "Altherma 3 R MT", 12, "split", 64000, ["radiators", "mixed"]),
  // Altherma 3 H MT / HT — wysokotemperaturowa
  mk("altherma-3h", "Altherma 3 H HT", 8, "monoblok", 56000, ["radiators", "mixed"]),
  mk("altherma-3h", "Altherma 3 H HT", 10, "monoblok", 62000, ["radiators", "mixed"]),
  mk("altherma-3h", "Altherma 3 H HT", 12, "monoblok", 68000, ["radiators", "mixed"]),
  mk("altherma-3h", "Altherma 3 H HT", 14, "monoblok", 74000, ["radiators", "mixed"]),
  mk("altherma-3h", "Altherma 3 H HT", 16, "monoblok", 80000, ["radiators", "mixed"]),
  // Altherma 3 M monoblok
  mk("altherma-3m", "Altherma 3 M Monoblok", 4, "monoblok", 36000, ["underfloor"]),
  mk("altherma-3m", "Altherma 3 M Monoblok", 6, "monoblok", 40000, ["underfloor", "mixed"]),
  mk("altherma-3m", "Altherma 3 M Monoblok", 8, "monoblok", 46000, ["underfloor", "mixed"]),
  mk("altherma-3m", "Altherma 3 M Monoblok", 9, "monoblok", 50000, ["underfloor", "mixed", "radiators"]),
  mk("altherma-3m", "Altherma 3 M Monoblok", 11, "monoblok", 56000, ["mixed", "radiators"]),
  mk("altherma-3m", "Altherma 3 M Monoblok", 14, "monoblok", 64000, ["mixed", "radiators"]),
  mk("altherma-3m", "Altherma 3 M Monoblok", 16, "monoblok", 72000, ["mixed", "radiators"]),
  // Altherma 4 H — nowa generacja, R-290
  mk("altherma-4h", "Altherma 4 H", 6, "monoblok", 48000, ["underfloor", "radiators", "mixed"]),
  mk("altherma-4h", "Altherma 4 H", 8, "monoblok", 54000, ["underfloor", "radiators", "mixed"]),
  mk("altherma-4h", "Altherma 4 H", 10, "monoblok", 60000, ["underfloor", "radiators", "mixed"]),
  mk("altherma-4h", "Altherma 4 H", 12, "monoblok", 66000, ["radiators", "mixed"]),
  mk("altherma-4h", "Altherma 4 H", 14, "monoblok", 72000, ["radiators", "mixed"]),
];

// ─── Dobór ──────────────────────────────────────────────────────────────────

export interface CalcInput {
  buildingStandard: BuildingStandard;
  customValue?: number;
  customUnit?: CustomUnit;
  areaM2: number;
  heating: HeatingSystem;
  tank: TankType;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface RecommendationItem {
  product: DaikinProduct;
  priceRange: PriceRange;
}

export interface CalcResult {
  demandKw: number;
  indicatorWperM2: number | null;
  isCustomEnergy: boolean;
  primary: RecommendationItem;
  alternatives: RecommendationItem[];
  undersizedWarning: boolean;
  notes: string[];
}

/** ((listPriceNet + tankNet) × 0.7 + 12000) × 1.08 — zaokrąglone do 100 zł */
export function priceBruttoWithInstall(listPriceNet: number, tankNet: number): PriceRange {
  const raw = (listPriceNet + tankNet) * 0.7 + 12000;
  const brutto = raw * 1.08;
  const min = Math.round(brutto / 100) * 100;
  return { min, max: min + 10000 };
}

function computeDemandKw(input: CalcInput): { demandKw: number; indicator: number | null; isCustomEnergy: boolean } {
  if (input.buildingStandard === "custom") {
    const v = input.customValue ?? 0;
    if (input.customUnit === "kwh_m2_yr") {
      return { demandKw: (input.areaM2 * v) / 2000, indicator: null, isCustomEnergy: true };
    }
    return { demandKw: (input.areaM2 * v) / 1000, indicator: v, isCustomEnergy: false };
  }
  const ind = BUILDING_INDICATOR_W_PER_M2[input.buildingStandard];
  return { demandKw: (input.areaM2 * ind) / 1000, indicator: ind, isCustomEnergy: false };
}

function preferredSeriesOrder(heating: HeatingSystem): SeriesId[] {
  if (heating === "underfloor") {
    return ["altherma-3r", "altherma-4h", "altherma-3m"];
  }
  // radiators & mixed
  return ["altherma-4h", "altherma-3r", "altherma-3h", "altherma-3m"];
}

/** Najbliższa moc (nie zawsze większa) w obrębie serii. */
function nearestInSeries(series: SeriesId, demandKw: number): DaikinProduct | null {
  const pool = DAIKIN_CATALOG.filter((p) => p.series === series);
  if (pool.length === 0) return null;
  return pool.reduce((best, p) =>
    Math.abs(p.powerKw - demandKw) < Math.abs(best.powerKw - demandKw) ? p : best,
  );
}

export function calculateHeatPump(input: CalcInput): CalcResult {
  const { demandKw: rawDemand, indicator, isCustomEnergy } = computeDemandKw(input);
  const demandKw = Math.round(rawDemand * 10) / 10;

  const order = preferredSeriesOrder(input.heating);
  const picks: DaikinProduct[] = [];
  for (const s of order) {
    const p = nearestInSeries(s, demandKw);
    if (p) picks.push(p);
  }
  // fallback safety
  if (picks.length === 0) picks.push(DAIKIN_CATALOG[0]);

  const tankNet = TANK_PRICE_NET[input.tank];
  const toItem = (product: DaikinProduct): RecommendationItem => ({
    product,
    priceRange: priceBruttoWithInstall(product.listPriceNet, tankNet),
  });

  const primary = toItem(picks[0]);
  const alternatives = picks.slice(1, 4).map(toItem);

  const undersizedWarning = (demandKw - primary.product.powerKw) / Math.max(demandKw, 0.1) > 0.1;

  const notes: string[] = [];
  if (isCustomEnergy) {
    notes.push(
      "Wynik ma charakter orientacyjny — dokładny dobór wymaga OZC. Przeliczenie z kWh/m²/rok jest uproszczone.",
    );
  }
  if (undersizedWarning) {
    notes.push("Wymagana weryfikacja OZC — możliwy dobór wyższej jednostki.");
  }
  if (input.heating === "radiators" && primary.product.series === "altherma-3r") {
    notes.push(
      "Przy grzejnikach często warto rozważyć Altherma 4 H lub Altherma 3 H HT dla wyższych temperatur zasilania.",
    );
  }

  return {
    demandKw,
    indicatorWperM2: indicator,
    isCustomEnergy,
    primary,
    alternatives,
    undersizedWarning,
    notes,
  };
}
