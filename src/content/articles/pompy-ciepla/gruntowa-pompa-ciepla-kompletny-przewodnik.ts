import type { Article } from "../types";
import heroImage from "@/assets/gruntowa-pompa-hero.jpg";
import schemaImage from "@/assets/gruntowa-pompa-schema.jpg";
import roomImage from "@/assets/gruntowa-pompa-room.jpg";

/**
 * Gruntowa pompa ciepła — kompletny przewodnik (Phase 2B).
 *
 * Fully migrated to the block model. Editorial tone: inżynierski, decyzyjny,
 * uczciwy o ograniczeniach. The piece is structured as a decision document
 * for an informed buyer, not a marketing pamphlet.
 */
export const article: Article = {
  slug: "gruntowa-pompa-ciepla-kompletny-przewodnik",
  category: "pompy-ciepla",
  status: "published",
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
      a: "Standardowo 80–150 m, 1–2 otwory. Reguła kciuka: 12–20 mb odwiertu na 1 kW mocy pompy. Dokładną wartość wyznacza Test Reakcji Termicznej (TRT) gruntu.",
    },
    {
      q: "Czy odwiert geotermalny może uszkodzić działkę?",
      a: "Nie. Po zakończeniu prac odwiert jest cementowany i niewidoczny — pozostaje tylko kolektor ukryty pod ziemią. Powierzchnia ogrodu nie traci użyteczności.",
    },
    {
      q: "Jaki jest realny SCOP gruntowej pompy ciepła?",
      a: "W warunkach polskich (dolne źródło 7°C, podłogówka 35°C) realny SCOP to 4.8–5.3 — 1 kWh prądu zamienia się w ok. 5 kWh ciepła.",
    },
    {
      q: "Czy gruntowa pompa ciepła może chłodzić dom latem?",
      a: "Tak — w trybie pasywnego chłodzenia. Solanka z odwiertów (7–10°C) chłodzi budynek niemal bezkosztowo (pracuje tylko pompa obiegowa).",
    },
    {
      q: "Po ilu latach gruntowa pompa ciepła się zwraca?",
      a: "Wobec kotła gazowego: 8–11 lat. Wobec kotła na olej: 5–7 lat. Wobec dobrej pompy powietrznej: 12–16 lat (ale gruntowa ma 2× dłuższy resurs).",
    },
    {
      q: "Jakie są ryzyka geologiczne odwiertu?",
      a: "Trzy realne: artezyjski wypływ wody (+8–15 tys. zł), skała macierzysta blisko powierzchni (+20–40% kosztu wiercenia), strefy ochrony wód podziemnych (wymóg uzgodnień). Wszystkie identyfikujemy przed podpisaniem umowy.",
    },
  ],
  body: [
    {
      type: "metrics-strip",
      items: [
        { label: "Realny SCOP", value: "4.8–5.3", sub: "dolne źródło 7°C" },
        { label: "Koszt instalacji", value: "95–160k zł", sub: "dom 180 m²" },
        { label: "ROI", value: "8–11 lat", sub: "vs. gaz / olej" },
        { label: "Żywotność", value: "25+ lat", sub: "odwiert: 50–80 lat" },
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "czym-jest",
      eyebrow: "01 · Fundament",
      text: "Czym właściwie jest gruntowa pompa ciepła?",
    },
    {
      type: "paragraph",
      dropcap: true,
      text: "Gruntowa pompa ciepła (geotermalna pompa ciepła, w skrócie **GSHP — Ground Source Heat Pump**) to urządzenie, które pobiera niskotemperaturową energię zgromadzoną w gruncie i podnosi jej parametry do poziomu użytecznego dla instalacji grzewczej budynku. Sercem układu jest obieg termodynamiczny ze sprężarką inwerterową — taki sam, jak w nowoczesnej pompie powietrznej — ale **dolne źródło** stanowi tu grunt, a nie powietrze.",
    },
    {
      type: "paragraph",
      text: "Różnica brzmi technicznie, lecz jej konsekwencje są bardzo praktyczne: temperatura gruntu na głębokości 10–100 m utrzymuje się przez cały rok w okolicach **8–10°C**. To stała, niezależna od mrozu, deszczu i wiatru baza, która sprężarce pompy ciepła pozwala pracować zawsze w optymalnym punkcie.",
    },
    {
      type: "definition",
      term: "SCOP (Seasonal Coefficient of Performance)",
      definition:
        "Średnioroczna sprawność pompy ciepła w warunkach klimatu. Liczba znacząca: SCOP 4,8 oznacza, że na 1 kWh energii elektrycznej pompa dostarcza 4,8 kWh ciepła. SCOP odpowiada Twojemu rachunkowi za prąd; COP to chwilowy parametr testowy.",
    },
    {
      type: "engineer-note",
      tone: "blue",
      icon: "thermometer",
      label: "Engineering insight · COP",
      title: "Dlaczego COP geotermalnej pompy jest tak stabilny",
      text: "W pompie powietrznej COP spada wraz z temperaturą powietrza — przy −15°C nawet o 35–45%. Pompa gruntowa „nie wie”, że jest zima: dolne źródło ma stabilne 7°C. Efekt? **SCOP 4.8–5.3** przez cały sezon i brak strat na cykle odszraniania.",
    },
    {
      type: "image",
      src: schemaImage,
      alt: "Schemat dolnego źródła pompy ciepła — pionowe odwierty z kolektorem U-rurowym",
      caption:
        "Schemat dwóch pionowych odwiertów (100 m) z kolektorem U-rurowym — najczęstsza konfiguracja w polskich warunkach geologicznych.",
    },
    {
      type: "heading",
      level: 2,
      id: "jak-dziala",
      eyebrow: "02 · Fizyka procesu",
      text: "Jak działa krok po kroku",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Dolne źródło** — w pionowych odwiertach lub poziomym kolektorze krąży solanka (glikol), pobierając ciepło z gruntu.",
        "**Parownik** — solanka oddaje ciepło czynnikowi chłodniczemu (np. R32 / R290), który odparowuje już przy bardzo niskiej temperaturze.",
        "**Sprężarka inwerterowa** — modularnie spręża parę, podnosząc jej ciśnienie i temperaturę do 35–55°C.",
        "**Skraplacz** — gorący czynnik oddaje ciepło do obiegu grzewczego budynku (podłogówka, grzejniki niskotemperaturowe, bufor CWU).",
        "**Zawór rozprężny** — czynnik wraca do parownika, cykl się zamyka.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "dolne-zrodlo",
      eyebrow: "03 · Decyzja projektowa",
      text: "Dolne źródło — odwierty vs kolektor poziomy",
    },
    {
      type: "paragraph",
      text: "W 92% nowych realizacji Soltimus stosujemy **pionowe odwierty**. Powód poniżej — zestawienie rzeczywistych zalet i ograniczeń obu rozwiązań.",
    },
    {
      type: "compare-cards",
      items: [
        {
          title: "Pionowe odwierty (BHE)",
          badge: "Rekomendowane",
          recommended: true,
          pros: [
            "Stabilne 7–10°C cały rok",
            "Działka 4–6 arów wystarczy",
            "Najwyższy realny SCOP",
            "Możliwe pasywne chłodzenie",
            "Żywotność 50–80 lat",
          ],
          cons: ["Wyższy CAPEX (40–70k zł)", "Wymaga firmy z koncesją górniczą"],
        },
        {
          title: "Kolektor poziomy",
          badge: "Tylko duże działki",
          pros: ["Niższy koszt instalacji", "Brak głębokich odwiertów"],
          cons: [
            "Min. 2–3× powierzchnia ogrzewana",
            "Niższa temperatura zimą (2–4°C)",
            "Spadek COP w lutym/marcu",
            "Brak pasywnego chłodzenia",
            "Konflikt z drzewami i nasadzeniami",
          ],
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "koszty",
      eyebrow: "04 · Pieniądze",
      text: "Ile to naprawdę kosztuje?",
    },
    {
      type: "paragraph",
      text: "Najczęściej zadawane pytanie — i najczęściej źle odpowiadane. Realny budżet brutto dla dobrze izolowanego domu 180 m² (instalacja niskotemperaturowa 35°C):",
    },
    {
      type: "cost-breakdown",
      title: "Kosztorys referencyjny",
      subtitle: "Dom 180 m², instalacja 35°C, 8–14 kW",
      total: "104 500 – 154 500 zł",
      rows: [
        { item: "Projekt + TRT gruntu", small: "8–14 kW", price: "4 500 – 7 500 zł" },
        {
          item: "Pompa Daikin Altherma 3 GEO",
          small: "wraz z automatyką",
          price: "42 000 – 62 000 zł",
        },
        {
          item: "Odwierty pionowe",
          small: "2 × 80–120 m",
          price: "38 000 – 56 000 zł",
        },
        {
          item: "Bufor + zasobnik CWU",
          small: "100 + 300 l",
          price: "9 000 – 14 000 zł",
        },
        {
          item: "Montaż, rozruch, dokumentacja",
          small: "z odbiorem UDT",
          price: "11 000 – 15 000 zł",
        },
      ],
      footnote:
        "Po dotacji Czyste Powietrze (do 135 000 zł) realny koszt netto: **59 500 – 109 500 zł**.",
    },
    {
      type: "engineer-note",
      tone: "gold",
      icon: "trending",
      label: "Engineering insight · TCO / ROI",
      title: "20-letnie TCO: gdzie gruntowa wygrywa",
      text: "W perspektywie 20 lat (z 4% inflacją cen energii) gruntowa pompa ciepła **oszczędza 90–150 tys. zł** względem kotła gazowego i 40–70 tys. zł względem dobrej pompy powietrznej. Punkt przecięcia kosztów następuje pomiędzy **8. a 11. rokiem** eksploatacji.",
    },
    {
      type: "heading",
      level: 2,
      id: "cop",
      eyebrow: "05 · Czytanie kart katalogowych",
      text: "COP i SCOP — jak czytać dane producenta",
    },
    {
      type: "paragraph",
      text: "**COP** to chwilowa sprawność w warunkach testowych. Liczba znacząca dopiero w kontekście: *B0/W35* oznacza dolne źródło 0°C, woda grzewcza 35°C. Realny benchmark dla polskiej geotermii: *B7/W35*, gdzie dobre pompy gruntowe osiągają COP ≈ 5,6. **SCOP** to średnioroczna sprawność — i to ta liczba odpowiada Twojemu rachunkowi za prąd.",
    },
    {
      type: "table",
      head: ["Warunek", "Opis", "COP"],
      rows: [
        ["**B0/W35**", "Test producencki — porównanie pomp", "5,1"],
        ["**B7/W35**", "Realny scenariusz polski (zima)", "5,6"],
        ["**B7/W45**", "Hybryda z grzejnikami niskotemp.", "4,2"],
        ["**Pasywne chłodzenie**", "Lato, podłogówka 18°C", "20+"],
      ],
      note: "Daikin Altherma 3 GEO — sprawność w warunkach roboczych.",
    },
    {
      type: "heading",
      level: 2,
      id: "chlodzenie",
      eyebrow: "06 · Bonus konstrukcyjny",
      text: "Pasywne chłodzenie — niedoceniany bonus",
    },
    {
      type: "paragraph",
      text: "Latem, gdy grunt jest chłodniejszy od powietrza w domu, gruntowa pompa może chłodzić bez uruchamiania sprężarki. Działa wyłącznie pompa obiegowa — **~80 W zamiast 2–3 kW**. To realnie darmowe chłodzenie podłogi i wody w fancoilach.",
    },
    {
      type: "engineer-note",
      tone: "cyan",
      icon: "snowflake",
      label: "Engineering insight · Free cooling",
      title: "Pasywne chłodzenie: 80 W vs 2 500 W",
      text: "W przeciętny letni miesiąc pasywne chłodzenie zużywa **~40 kWh** energii elektrycznej — ok. 30 zł. Klimatyzacja split o porównywalnej mocy chłodniczej: 600–900 kWh i 450–700 zł. Różnica w 10 lat: **40–60 tys. zł**.",
    },
    {
      type: "image",
      src: roomImage,
      alt: "Premium pomieszczenie techniczne z gruntową pompą ciepła i buforem",
      caption:
        "Kotłownia z gruntową pompą ciepła Daikin Altherma 3 GEO, buforem oraz manifoldem solanki. Realizacja Soltimus, 2025.",
    },
    {
      type: "heading",
      level: 2,
      id: "kiedy-warto",
      eyebrow: "07 · Kwalifikacja",
      text: "Kiedy gruntowa pompa ciepła naprawdę ma sens",
    },
    {
      type: "when-fits",
      items: [
        "Dom 150 m² lub większy, zapotrzebowanie cieplne ≥ 9 kW.",
        "Instalacja niskotemperaturowa (podłogówka, grzejniki 35–45°C).",
        "Działka pozwala na dojazd masztu wiertniczego (3–5 dni prac).",
        "Plan pozostania w domu min. 12–15 lat (horyzont ROI).",
        "Wartość komfortu cieplnego i ciszy ważniejsza niż minimalizacja CAPEX.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "wady",
      eyebrow: "08 · Uczciwie",
      text: "Wady i ryzyka — kiedy odradzamy",
    },
    {
      type: "common-mistakes",
      title: "Sytuacje, w których gruntowa się nie obroni",
      items: [
        "**Mały dom (< 120 m²)** z niskim zużyciem — ROI rozmywa się poza 15 lat.",
        "**Działka skalista lub artezyjska** — koszty wiercenia mogą wzrosnąć o 50–80%.",
        "**Instalacja wysokotemperaturowa** (stare grzejniki żeliwne 70°C) — bez modernizacji COP spada do poziomu pompy powietrznej.",
        "**Brak miejsca na maszt wiertniczy** (dom w zwartej zabudowie miejskiej).",
        "Horyzont sprzedaży nieruchomości poniżej 5 lat — wartość rezydualna nie zrekompensuje CAPEX.",
      ],
    },
    {
      type: "quote",
      text: "Najczęstszy błąd inwestorów to porównywanie ceny urządzenia zamiast TCO. Gruntowa pompa ciepła to inwestycja infrastrukturalna — odwiert pracuje 50–80 lat, niezależnie od tego, którą pompę do niego podłączysz za 20 lat.",
      cite: "Dział projektowy Soltimus",
    },
    {
      type: "key-takeaways",
      items: [
        "Gruntowa pompa ciepła ma **najwyższy realny SCOP** (4,8–5,3) i jest niezależna od pogody.",
        "**Odwiert to inwestycja pokoleniowa** (50–80 lat); sama pompa: 20–25 lat.",
        "Sens ekonomiczny pojawia się przy budynkach **≥ 150 m²** i zapotrzebowaniu ≥ 9 kW.",
        "**Pasywne chłodzenie** oszczędza 40–60 tys. zł w 10 lat vs. klimatyzacja split.",
        "Realny budżet 2026 dla 180 m²: **104–154 tys. zł brutto** (59–109 tys. po dotacji).",
        "Decyzja zależy od działki, instalacji i horyzontu — nie od „mody na geotermię”.",
      ],
    },
    { type: "cta-calculator", lead: "Sprawdź, czy Twój budynek mieści się w widełkach gruntowej pompy ciepła." },
    { type: "cta-engineer" },
  ],
};
