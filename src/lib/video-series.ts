export type VideoSeries = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  accent: string;
  kicker: string;
};

export const VIDEO_SERIES: VideoSeries[] = [
  {
    slug: "engineering-lab",
    name: "Engineering Lab",
    tagline: "Fizyka. Pomiary. Eksperymenty.",
    description:
      "Pogłębione analizy: bezwładność cieplna, hydraulika, defrost, przepływy, optymalizacja energetyczna.",
    keywords: ["lab", "fizyka", "defrost", "analiza", "eksperyment", "pomiar", "termiczn", "hydraul"],
    accent: "#C03B3B",
    kicker: "Seria · 01",
  },
  {
    slug: "hvac-myths",
    name: "HVAC Myths",
    tagline: "Mity vs. dane z instalacji.",
    description:
      "Czy pompa działa zimą? Czy bufor jest konieczny? Czy grzejniki to problem? Sprawdzamy mity twardymi liczbami.",
    keywords: ["mit", "czy", "grzejnik", "bufor", "zima", "działa"],
    accent: "#F5B800",
    kicker: "Seria · 02",
  },
  {
    slug: "case-studies",
    name: "Premium Case Studies",
    tagline: "Realne transformacje · liczby przed/po.",
    description:
      "Cinematic reportaż z naszych realizacji — od audytu przez projekt po pierwszy sezon grzewczy.",
    keywords: ["case", "realizacja", "wdrożenie", "instalacja", "przed", "po", "transform"],
    accent: "#0089CF",
    kicker: "Seria · 03",
  },
  {
    slug: "expert-answers",
    name: "Expert Answers",
    tagline: "Pytania klientów · odpowiedzi inżynierów.",
    description:
      "Krótkie, treściwe odpowiedzi na pytania, które dostajemy od inwestorów najczęściej.",
    keywords: ["pytanie", "odpowied", "faq", "expert", "porad"],
    accent: "#5FB46B",
    kicker: "Seria · 04",
  },
];

export function seriesBySlug(slug: string) {
  return VIDEO_SERIES.find((s) => s.slug === slug);
}

export function matchSeries(text: string, fallback = "engineering-lab"): string {
  const lower = text.toLowerCase();
  for (const s of VIDEO_SERIES) {
    if (s.keywords.some((k) => lower.includes(k))) return s.slug;
  }
  return fallback;
}
