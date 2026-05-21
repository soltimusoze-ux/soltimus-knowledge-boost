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
    name: "Pompy ciepła — fizyka i mity",
    tagline: "Pomiary, eksperymenty i obalanie mitów o pompach ciepła.",
    description:
      "Wszystko o pompach ciepła w jednym miejscu: bezwładność cieplna, hydraulika, defrost, COP, taktowanie — oraz mity (czy działa zimą? czy potrzeba bufora? czy grzejniki to problem?) konfrontowane z twardymi danymi z instalacji.",
    keywords: [
      "pompa", "pompy", "lab", "fizyka", "defrost", "analiza", "eksperyment",
      "pomiar", "termiczn", "hydraul", "bufor", "grzejnik", "zima", "cop",
      "taktowanie", "mit", "czy", "altherma", "daikin",
    ],
    accent: "#C03B3B",
    kicker: "Seria · 01",
  },
  {
    slug: "energy-management",
    name: "Zarządzanie energią",
    tagline: "Taryfy dynamiczne, PV, magazyny i elektromobilność.",
    description:
      "Jak realnie obniżać rachunki za prąd: taryfa dynamiczna PSTRYK, urządzenia Sigenergy, fotowoltaika, magazyny energii, ładowanie EV i integracja całego ekosystemu energetycznego domu.",
    keywords: [
      "pstryk", "taryfa", "dynamiczn", "sigenergy", "fotowolt", "pv",
      "magazyn", "bess", "bateria", "ev", "elektromob", "ładowarka",
      "wallbox", "autokonsumpcja", "net-billing", "energia",
    ],
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
