import type { Article } from "../types";
import heroImage from "@/assets/cennik-pomp-hero.jpg";

/**
 * Cennik pomp ciepła 2026.
 *
 * Fully migrated to the block model in Phase 2B. The bespoke route file is
 * deleted; rendering is handled by `/wiedza/$category/$slug` using the
 * shared editorial system. Tone: transparent, data-first, decision-support.
 */
export const article: Article = {
  slug: "cennik-pomp-ciepla-2026",
  category: "pompy-ciepla",
  status: "published",
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
  body: [
    {
      type: "metrics-strip",
      items: [
        { label: "Powietrzna split", value: "38–55k zł", sub: "z montażem" },
        { label: "Monoblok R32/R290", value: "45–65k zł", sub: "hermetyczny obieg" },
        { label: "Gruntowa", value: "75–120k zł", sub: "z odwiertami" },
        { label: "Po Czystym Powietrzu", value: "–40–60%", sub: "ceny netto" },
      ],
    },
    {
      type: "paragraph",
      dropcap: true,
      text: "W 2026 r. realna inwestycja w pompę ciepła z montażem mieści się między **38 000 a 120 000 zł brutto**. Różnica wynika z typu źródła (powietrze vs grunt), mocy, klasy SCOP i stanu instalacji w budynku. Po dotacji Czyste Powietrze efektywna cena netto najczęściej spada o 40–60% — a najtańszy montaż „od ręki” to zwykle najdroższy w 10-letnim cyklu eksploatacji.",
    },
    {
      type: "heading",
      level: 2,
      id: "widelki-cenowe",
      eyebrow: "01 · Widełki cenowe",
      text: "Pompa ciepła z montażem — cennik 2026",
    },
    {
      type: "paragraph",
      text: "Ceny brutto dla domów 100–200 m² obejmują urządzenie, zbiornik CWU, materiał hydrauliczny, automatykę i robociznę. Nie zawierają modernizacji rozdzielnicy elektrycznej ani wymiany instalacji wewnętrznej C.O.",
    },
    {
      type: "table",
      head: ["Typ", "Pompa + montaż", "Dolne źródło / instalacja"],
      rows: [
        [
          "**Powietrzna SPLIT** — najpopularniejszy wybór dla domów 100–160 m²",
          "38 000 – 55 000 zł",
          "5 000 – 9 000 zł",
        ],
        [
          "**Powietrzna MONOBLOK** — hermetyczny obieg, R32 lub R290",
          "45 000 – 65 000 zł",
          "6 000 – 11 000 zł",
        ],
        [
          "**Gruntowa (sondy pionowe)** — najwyższy SCOP 4,5–5,2; sens powyżej 9 kW",
          "75 000 – 120 000 zł",
          "25 000 – 55 000 zł (odwierty)",
        ],
      ],
      note: "Tani montaż bez audytu energetycznego to najczęstsze źródło problemów eksploatacyjnych. Audyt 1–2 tys. zł chroni przed źle dobraną mocą, która kosztuje 8–15 tys. zł rocznie.",
    },
    {
      type: "engineer-note",
      tone: "blue",
      icon: "gauge",
      label: "Engineering insight · CAPEX vs OPEX",
      title: "Tańsza pompa zwykle = droższa eksploatacja",
      text: "Różnica 8–12 tys. zł między dobrym a tanim urządzeniem zwraca się w 4–6 lat samym kosztem prądu. Niższa klasa SCOP (np. 3,8 vs 4,8) to **+1 200–1 800 zł rocznie** na rachunkach przy 8 MWh/rok zapotrzebowania.",
    },
    {
      type: "heading",
      level: 2,
      id: "trzy-budzety",
      eyebrow: "02 · Realne przykłady",
      text: "3 domy, 3 budżety — konkretne liczby z 2026 r.",
    },
    {
      type: "case-cards",
      items: [
        {
          title: "Dom nowy, 120 m², podłogówka",
          spec: "Zapotrzebowanie 4,5 kW · WT2021 · CWU 200 l",
          price: "42 800 zł",
          after: "od 18 600 zł",
          afterLabel: "Po Czystym Powietrzu",
          recommendation: "Daikin Altherma 3 R 6 kW",
        },
        {
          title: "Termomodernizacja, 160 m²",
          spec: "Zapotrzebowanie 8 kW · grzejniki 55°C · CWU 300 l",
          price: "58 400 zł",
          after: "od 24 200 zł",
          afterLabel: "Po Czystym Powietrzu",
          recommendation: "Daikin Altherma 3 M 8 kW",
        },
        {
          title: "Starszy dom, 200 m², bez ocieplenia",
          spec: "Zapotrzebowanie 14 kW · grzejniki wysokotemp. · CWU 300 l",
          price: "98 700 zł",
          after: "od 41 500 zł",
          afterLabel: "Po Czystym Powietrzu",
          recommendation: "Daikin Altherma 3 H HT 14 kW",
        },
      ],
    },
    { type: "cta-calculator", lead: "Sprawdź realne widełki ceny dla Twojego budynku w 90 sekund." },
    {
      type: "heading",
      level: 2,
      id: "co-przesuwa-budzet",
      eyebrow: "03 · Z czego wynika cena",
      text: "6 czynników, które przesuwają budżet o 20 000 zł",
    },
    {
      type: "factor-list",
      items: [
        {
          name: "Moc grzewcza",
          detail:
            "Każde +2 kW to ok. **3 000–5 000 zł** różnicy w cenie urządzenia. Przewymiarowanie tnie SCOP — sprężarka pracuje w cyklach on/off zamiast modulować.",
        },
        {
          name: "Klasa SCOP / A+++",
          detail:
            "Wyższa efektywność = wyższy CAPEX, ale **15–25% niższe rachunki** rocznie. Na 15-letnim horyzoncie różnica to 18–32 tys. zł.",
        },
        {
          name: "Czynnik R32 vs R290",
          detail:
            "Propan (R290) — wyższa temperatura zasilania do 75°C, idealny do termomodernizacji bez wymiany grzejników. Dopłata ok. 4–7 tys. zł.",
        },
        {
          name: "Zbiornik CWU",
          detail:
            "Bufor 200/300 l vs zintegrowana stacja hybrydowa: różnica **2 000–6 000 zł**. INOX przy twardej wodzie zwraca się w 8 lat.",
        },
        {
          name: "Stan instalacji C.O.",
          detail:
            "Stare grzejniki żeliwne = potrzeba pompy wysokotemperaturowej (droższa o **8 000–15 000 zł**) albo modernizacji emiterów ciepła.",
        },
        {
          name: "Modernizacja elektryki",
          detail:
            "Przyłącze 3-fazowe, zabezpieczenia różnicowoprądowe, ochronniki przepięciowe — 2 500–7 000 zł, często pomijane w „cenach od”.",
        },
      ],
    },
    {
      type: "engineer-note",
      tone: "gold",
      icon: "trending",
      label: "Engineering insight · ROI",
      title: "Kiedy pompa ciepła zwraca się najszybciej",
      text: "Wymiana kotła węglowego: **4–7 lat**. Wymiana gazu: 7–11 lat. Nowy dom z PV i taryfą G12w: 5–8 lat. ROI liczymy w kalkulatorze na podstawie Twojej taryfy i realnego zapotrzebowania budynku — nie szacunków z internetu.",
    },
    {
      type: "heading",
      level: 2,
      id: "kiedy-warto",
      text: "Kiedy inwestycja w pompę ciepła ma sens",
    },
    {
      type: "when-fits",
      items: [
        "Dom z instalacją niskotemperaturową (podłogówka, grzejniki 35–45°C).",
        "Roczne zużycie energii grzewczej powyżej 6 MWh — krótszy ROI.",
        "Plan integracji z PV: pompa ciepła konsumuje autoprodukcję latem (CWU) i w przejściach.",
        "Wymiana kotła węglowego lub na olej — dotacja + redukcja OPEX = ROI poniżej 7 lat.",
        "Budowa nowego domu — zaprojektowanie instalacji pod pompę kosztuje 0 zł więcej.",
      ],
    },
    {
      type: "common-mistakes",
      title: "Kiedy uczciwie odradzamy",
      items: [
        "Stare grzejniki żeliwne bez termomodernizacji — COP spadnie do 2,5, rachunki będą rozczarowujące.",
        "Roczne zużycie poniżej 3 MWh (małe mieszkanie) — ROI rozmywa się poza 15 lat.",
        "Brak miejsca na jednostkę zewnętrzną z zachowaniem 3 m od granicy działki (przepisy hałasowe).",
        "Plan sprzedaży nieruchomości w horyzoncie 3–4 lat — wartość rezydualna nie zrekompensuje CAPEX.",
      ],
    },
    {
      type: "key-takeaways",
      items: [
        "Realny budżet 2026: **38–120 tys. zł brutto** z montażem; po dotacji 18–55 tys. zł netto.",
        "Najtańszy montaż „od ręki” prawie zawsze oznacza wyższe TCO w 10-letnim cyklu.",
        "Pompa powietrzna split = standard dla nowych domów; gruntowa = sens powyżej 150 m² i 9 kW.",
        "ROI zależy od tego, co wymieniasz: węgiel (4–7 lat), gaz (7–11), olej (5–8).",
        "Każdy nasz kosztorys zaczyna się od audytu energetycznego — nie od wybranego modelu.",
      ],
    },
    { type: "cta-engineer" },
  ],
};
