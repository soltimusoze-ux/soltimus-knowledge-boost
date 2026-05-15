export type KnowledgeCategory = {
  slug: string;
  name: string;
  short: string;
  description: string;
  keywords: string[];
  accent: string; // tailwind text color hex
  iconKey:
    | "thermometer"
    | "sun"
    | "battery"
    | "banknote"
    | "wrench"
    | "help"
    | "compare"
    | "building"
    | "flask";
};

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    slug: "pompy-ciepla",
    name: "Pompy ciepła",
    short: "Dobór · COP · projekt",
    description:
      "Doradztwo, dobór mocy, hydraulika niskotemperaturowa, COP w warunkach polskiej zimy.",
    keywords: ["pompa", "altherma", "cop", "daikin", "monoblok", "split", "scop"],
    accent: "#0089CF",
    iconKey: "thermometer",
  },
  {
    slug: "fotowoltaika",
    name: "Fotowoltaika",
    short: "Net-billing · autokonsumpcja",
    description: "Projekty PV pod realny profil zużycia, falowniki hybrydowe i optymalizacja zwrotu.",
    keywords: ["fotowolt", "pv", "panel", "falownik", "net-billing", "autokonsumpcja"],
    accent: "#F5B800",
    iconKey: "sun",
  },
  {
    slug: "magazyny-energii",
    name: "Magazyny energii",
    short: "BESS · backup · arbitraż",
    description: "Dobór pojemności, integracja z PV i pompą ciepła, scenariusze backupu sieciowego.",
    keywords: ["magazyn", "bateria", "bess", "backup", "akumulator"],
    accent: "#5FB46B",
    iconKey: "battery",
  },
  {
    slug: "dotacje",
    name: "Dotacje",
    short: "Czyste Powietrze · Mój Prąd",
    description: "Aktualne progi, audyty, dokumentacja, najczęstsze powody odrzucenia wniosków.",
    keywords: ["dotacj", "czyste powietrze", "mój prąd", "ulga", "wniosek"],
    accent: "#C39B5A",
    iconKey: "banknote",
  },
  {
    slug: "hydraulika",
    name: "Hydraulika",
    short: "Bufory · sprzęgła · obiegi",
    description: "Schematy zaworów, bufory cwu, sprzęgła hydrauliczne, dobór pomp obiegowych.",
    keywords: ["hydraul", "bufor", "sprzęgło", "obieg", "zawór"],
    accent: "#0E7C9C",
    iconKey: "wrench",
  },
  {
    slug: "faq",
    name: "FAQ",
    short: "60+ pytań inżynierskich",
    description: "Zwięzłe, ekspercie odpowiedzi na najczęstsze pytania klientów i inwestorów.",
    keywords: ["faq", "pytanie", "odpowied", "czy", "jak"],
    accent: "#8C8C8C",
    iconKey: "help",
  },
  {
    slug: "porownania",
    name: "Porównania",
    short: "Technologie · marki · TCO",
    description: "Twarde liczby: TCO, COP, gwarancje, koszty serwisu — bez marketingowych obietnic.",
    keywords: ["porównanie", "vs", "zestawienie", "ranking", "tco"],
    accent: "#7A4FE0",
    iconKey: "compare",
  },
  {
    slug: "case-studies",
    name: "Case studies",
    short: "Realne instalacje · liczby",
    description: "Realizacje z pomiarami przed/po, kosztami i wnioskami serwisowymi.",
    keywords: ["case", "realizacja", "wdrożenie", "instalacja"],
    accent: "#1F1F1F",
    iconKey: "building",
  },
  {
    slug: "engineering-lab",
    name: "Engineering Lab",
    short: "Fizyka budynku · eksperymenty",
    description:
      "Pogłębione analizy: bezwładność cieplna, defrost, analiza przepływów, optymalizacja energetyczna.",
    keywords: ["lab", "fizyka", "defrost", "analiza", "eksperyment", "termiczn"],
    accent: "#C03B3B",
    iconKey: "flask",
  },
];

export function categoryBySlug(slug: string) {
  return KNOWLEDGE_CATEGORIES.find((c) => c.slug === slug);
}

export function matchCategory(text: string, fallback = "pompy-ciepla"): string {
  const lower = text.toLowerCase();
  for (const c of KNOWLEDGE_CATEGORIES) {
    if (c.keywords.some((k) => lower.includes(k))) return c.slug;
  }
  return fallback;
}
