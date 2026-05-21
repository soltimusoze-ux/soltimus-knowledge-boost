import type { Article } from "../types";
import heroImage from "@/assets/cennik-pomp-hero.jpg";

/**
 * Cennik pomp ciepła 2026.
 *
 * Bespoke route — keeps src/routes/wiedza.pompy-ciepla.cennik-pomp-ciepla-2026.tsx
 * for the rich legacy layout. SEO + FAQ + author live here, so JSON-LD,
 * sitemap and hub listings stay consistent. Body migration is staged.
 */
export const article: Article = {
  slug: "cennik-pomp-ciepla-2026",
  category: "pompy-ciepla",
  status: "published",
  customRoute: true,
  title: "Cennik pomp ciepła 2026: ile naprawdę kosztuje montaż?",
  excerpt:
    "Transparentne widełki cenowe pomp ciepła w 2026 r. — split, monoblok, gruntowa. Realne koszty montażu, dofinansowania i 3 przykłady domów.",
  publishedAt: "2026-05-19",
  readingTime: 8,
  heroImage,
  heroImageAlt:
    "Dom jednorodzinny zimą z zewnętrzną jednostką pompy ciepła Daikin Altherma",
  authorId: "redakcja",
  tags: [
    "cennik pomp ciepła",
    "koszt montażu",
    "Czyste Powietrze",
    "Daikin Altherma",
    "ROI",
  ],
  seo: {
    title: "Cennik pomp ciepła 2026: ile naprawdę kosztuje montaż?",
    description:
      "Transparentne widełki cenowe pomp ciepła w 2026 r. — split, monoblok, gruntowa. Realne koszty montażu, dofinansowania i 3 przykłady domów. Dobierz model w kalkulatorze Soltimus.",
    ogImage: heroImage,
  },
  related: {
    services: ["pompy-ciepla"],
    articles: [
      "gruntowa-pompa-ciepla-kompletny-przewodnik",
      "zbiorniki-cwu-do-pompy-ciepla",
    ],
  },
  tldr: "Realna inwestycja w pompę ciepła z montażem mieści się między 38 000 a 120 000 zł brutto. Po dotacji Czyste Powietrze efektywna cena netto najczęściej spada o 40–60%.",
  faq: [
    {
      q: "Ile kosztuje pompa ciepła z montażem w 2026 roku?",
      a: "Powietrzna pompa ciepła split: 38 000–55 000 zł brutto. Monoblok: 45 000–65 000 zł. Gruntowa z odwiertami: 75 000–120 000 zł. Ceny obejmują urządzenie, materiał i robociznę dla domu 120–180 m².",
    },
    {
      q: "Czy dofinansowanie obniża cenę pompy ciepła?",
      a: "Tak. W programie Czyste Powietrze 2026 maksymalna dotacja na pompę ciepła sięga 35 200 zł, a w wariancie podwyższonym z termomodernizacją nawet 99 000 zł. Efektywna cena netto często spada o 40–60%.",
    },
    {
      q: "Dlaczego dwie podobne pompy ciepła mają różne ceny?",
      a: "O cenie decyduje: moc grzewcza, klasa SCOP, czynnik chłodniczy (R32 vs R290), rodzaj zbiornika CWU, długość instalacji hydraulicznej i automatyka. Tani montaż bez audytu energetycznego to najczęstsze źródło problemów eksploatacyjnych.",
    },
    {
      q: "Jak szybko zwraca się pompa ciepła?",
      a: "Wymiana kotła węglowego: 4–7 lat. Wymiana gazu: 7–11 lat. Dom nowy z PV i taryfą G12w: 5–8 lat. ROI liczymy w naszym kalkulatorze na podstawie taryfy klienta i realnego zapotrzebowania budynku.",
    },
  ],
};
