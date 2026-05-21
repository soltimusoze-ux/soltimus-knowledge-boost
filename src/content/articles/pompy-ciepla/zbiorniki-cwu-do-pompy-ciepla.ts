import type { Article } from "../types";

export const article: Article = {
  slug: "zbiorniki-cwu-do-pompy-ciepla",
  category: "pompy-ciepla",
  status: "published",
  title: "Zbiorniki c.w.u. do pompy ciepła — jaki rodzaj i pojemność wybrać?",
  excerpt:
    "Emaliowany, ze stali nierdzewnej, a może bufor z wężownicą spiralną? Inżynierowie Soltimus tłumaczą różnice między zbiornikami c.w.u. współpracującymi z pompą ciepła Daikin Altherma i jak dobrać pojemność do liczby domowników.",
  publishedAt: "2026-04-02",
  readingTime: 5,
  authorId: "dzial-projektowy",
  tags: ["zbiornik cwu", "Daikin Altherma", "hydraulika", "pompa ciepła"],
  seo: {
    title:
      "Zbiorniki c.w.u. do pompy ciepła — jaki rodzaj i pojemność wybrać?",
    description:
      "Emaliowany, ze stali nierdzewnej czy bufor z wężownicą? Eksperci Soltimus tłumaczą różnice między zbiornikami c.w.u. do pomp ciepła Daikin oraz jak dobrać pojemność do liczby domowników.",
  },
  related: {
    services: ["pompy-ciepla"],
    articles: ["cennik-pomp-ciepla-2026"],
  },
  tldr: "Do pompy ciepła Daikin Altherma najczęściej rekomendujemy zbiornik 200–300 l: emaliowany przy miękkiej wodzie, INOX przy twardej. Pojemność dobierasz do liczby domowników, a nie do mocy pompy.",
  faq: [
    {
      q: "Czy zbiornik c.w.u. musi być od tego samego producenta co pompa ciepła?",
      a: "Nie. Pompa ciepła Daikin Altherma współpracuje z dowolnym zbiornikiem c.w.u. wyposażonym w wężownicę o odpowiedniej powierzchni wymiany (min. 3 m² dla 200 l). Dedykowane zbiorniki Daikin (EKHWS, HPSU) upraszczają montaż i automatykę, ale nie są wymagane.",
    },
    {
      q: "Jaką pojemność zbiornika wybrać dla 4-osobowej rodziny?",
      a: "Optymalny zakres to 230–300 l. Mniej oznacza częste dogrzewanie grzałką (spadek COP), więcej — straty postojowe i niepotrzebny CAPEX.",
    },
    {
      q: "Czy stal nierdzewna jest zawsze lepsza od emalii?",
      a: "Nie. INOX wygrywa przy twardej wodzie (powyżej 14°dH) i przy długoterminowej eksploatacji bez serwisu anody. Przy miękkiej wodzie emaliowany zbiornik z dobrą anodą tytanową służy 12–15 lat za połowę ceny INOX-u.",
    },
  ],
  body: [
    {
      type: "heading",
      level: 2,
      id: "po-co-zbiornik",
      text: "Po co w ogóle zbiornik c.w.u. przy pompie ciepła?",
    },
    {
      type: "paragraph",
      text: "Pompa ciepła Daikin Altherma podgrzewa wodę użytkową cyklicznie — do osiągnięcia zadanej temperatury, a następnie utrzymuje ją w izolowanym zbiorniku. Pojemność i jakość zbiornika decydują o komforcie codziennego użytkowania oraz o efektywności (COP) pracy pompy w trybie CWU.",
    },
    {
      type: "heading",
      level: 2,
      id: "rodzaje",
      text: "Rodzaje zbiorników c.w.u.",
    },
    {
      type: "list",
      items: [
        "Emaliowane (z anodą tytanową lub magnezową) — najpopularniejsze, korzystna cena, wymagają okresowej kontroli anody.",
        "Ze stali nierdzewnej (INOX) — trwałe, lekkie, bez anody. Rekomendowane przy twardej wodzie i dla domów inwestujących długoterminowo.",
        "Bufor z wężownicą / kombinowane (HPSU / EKHWS) — zintegrowane rozwiązania Daikin, oszczędność miejsca w kotłowni.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "pojemnosc",
      text: "Jaką pojemność wybrać?",
    },
    {
      type: "list",
      items: [
        "1–2 osoby: 150–200 l",
        "3–4 osoby: 230–300 l",
        "5+ osób lub wanna z hydromasażem: 300–500 l",
      ],
    },
    {
      type: "callout",
      tone: "blue",
      title: "Dobór wspomagamy w kalkulatorze",
      text: "Moc pompy ciepła nie zależy od zbiornika, ale zestaw i cena tak. W kalkulatorze Soltimus podpowiadamy konfigurację dopasowaną do liczby domowników.",
    },
    {
      type: "heading",
      level: 2,
      id: "bledy",
      text: "Najczęstsze błędy",
    },
    {
      type: "list",
      items: [
        "Za mała pojemność „dla oszczędności” → częste dogrzewanie grzałką elektryczną.",
        "Zbyt duża pojemność bez recyrkulacji → straty postojowe (8–12% rocznie).",
        "Brak filtra mechanicznego na zasilaniu → szybsze zużycie anody i wężownicy.",
      ],
    },
    { type: "cta-calculator" },
  ],
};
