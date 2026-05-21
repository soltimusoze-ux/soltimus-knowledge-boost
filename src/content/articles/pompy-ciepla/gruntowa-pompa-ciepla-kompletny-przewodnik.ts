import type { Article } from "../types";
import heroImage from "@/assets/gruntowa-pompa-hero.jpg";

/**
 * Gruntowa pompa ciepła — kompletny przewodnik.
 *
 * Bespoke route — keeps src/routes/wiedza.pompy-ciepla.gruntowa-pompa-ciepla-kompletny-przewodnik.tsx
 * for the rich engineering layout (Reveal, InsightBlock, CompareCards).
 * Body will be ported to blocks in a follow-up sprint; SEO + FAQ + author
 * are already authoritative here.
 */
export const article: Article = {
  slug: "gruntowa-pompa-ciepla-kompletny-przewodnik",
  category: "pompy-ciepla",
  status: "published",
  customRoute: true,
  title:
    "Gruntowa pompa ciepła: Jak działa, ile kosztuje i czy ma wady? [Kompletny Przewodnik]",
  excerpt:
    "Kompletny przewodnik inżynierski — od fizyki dolnego źródła, przez realny COP w polskich warunkach, po TCO w 20-letniej perspektywie.",
  publishedAt: "2026-05-12",
  readingTime: 14,
  heroImage,
  heroImageAlt:
    "Nowoczesny dom z gruntową pompą ciepła i odwiertem geotermalnym o zmierzchu",
  authorId: "dzial-projektowy",
  tags: [
    "gruntowa pompa ciepła",
    "dolne źródło",
    "COP",
    "geotermia",
    "pasywne chłodzenie",
    "ROI",
    "Daikin Altherma",
  ],
  seo: {
    title:
      "Gruntowa pompa ciepła: Jak działa, ile kosztuje i czy ma wady? [Kompletny Przewodnik]",
    description:
      "Inżynierski przewodnik po gruntowych pompach ciepła: zasada działania, COP, koszty, dolne źródło, pasywne chłodzenie, ROI, wady i ryzyka geologiczne. Wiedza ekspertów Soltimus.",
    ogImage: heroImage,
  },
  related: {
    services: ["pompy-ciepla"],
    articles: ["cennik-pomp-ciepla-2026", "zbiorniki-cwu-do-pompy-ciepla"],
  },
  tldr: "Gruntowa pompa ciepła = najwyższy SCOP (4.8–5.3) i pasywne chłodzenie w cenie. Wyższy CAPEX, niższy OPEX. Sens ekonomiczny pojawia się przy budynkach od 150 m² i niskotemperaturowej instalacji.",
  faq: [
    {
      q: "Czy gruntowa pompa ciepła opłaca się przy małym domu?",
      a: "Granica sensu ekonomicznego to ok. 150 m² i zapotrzebowanie powyżej 9 kW. Poniżej tej skali różnica CAPEX vs. powietrzna pompa ciepła trudno się amortyzuje w 10-letnim horyzoncie.",
    },
    {
      q: "Jak głębokie muszą być odwierty?",
      a: "Standardowo 80–120 m. Liczba odwiertów zależy od zapotrzebowania cieplnego budynku i przewodności gruntu (TRT). Dla domu 180 m² to zwykle 2 odwierty po 100 m.",
    },
    {
      q: "Czy odwiert geotermalny może uszkodzić działkę?",
      a: "Nie. Po zakończeniu prac odwiert jest cementowany i niewidoczny — pozostaje tylko kolektor ukryty pod ziemią. Powierzchnia ogrodu nie traci użyteczności.",
    },
    {
      q: "Jaki jest realny SCOP gruntowej pompy ciepła?",
      a: "W warunkach polskich (dolne źródło 7°C, podłogówka 35°C) realny SCOP to 4.8–5.3 — czyli 1 kWh prądu zamienia się w ok. 5 kWh ciepła.",
    },
    {
      q: "Czy gruntowa pompa ciepła może chłodzić dom latem?",
      a: "Tak — w trybie pasywnego chłodzenia. Solanka z odwiertów (7–10°C) chłodzi budynek niemal bezkosztowo (pracuje tylko pompa obiegowa). To istotna przewaga vs. pompy powietrzne.",
    },
  ],
};
