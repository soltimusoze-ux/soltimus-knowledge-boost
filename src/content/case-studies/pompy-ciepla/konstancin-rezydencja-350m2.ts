/**
 * Flagship case study — demonstrates the full Case Study engine.
 * Konstancin · Rezydencja 350 m² · Premium energy system.
 */
import type { CaseStudy } from "../types";

export const caseStudy: CaseStudy = {
  slug: "konstancin-rezydencja-350m2",
  status: "published",

  title: "Rezydencja 350 m² w Konstancinie — premium energy system",
  subtitle:
    "Kaskada pomp ciepła, magazyn 20 kWh i fotowoltaika 14 kWp jako jeden, cicho pracujący organizm.",
  excerpt:
    "Jak zaprojektowaliśmy ogrzewanie, chłodzenie i własną energię dla rezydencji premium, redukując koszt operacyjny o 72% bez kompromisu komfortu.",

  publishedAt: "2026-04-12",
  updatedAt: "2026-05-08",
  readingTime: 9,

  category: "kompleksowa",
  tags: ["Daikin Altherma 3", "Kaskada", "BESS", "PV 14 kWp", "Premium"],

  location: {
    city: "Konstancin-Jeziorna",
    region: "mazowieckie",
    countryCode: "PL",
  },

  heroImage:
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2000&q=80",
  heroImageAlt:
    "Nowoczesna rezydencja w Konstancinie z systemem pompy ciepła Soltimus",

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      alt: "Wnętrze rezydencji — strefa dzienna",
      caption: "Komfort cieplny utrzymywany na poziomie 22.5 °C niezależnie od pory roku.",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
      alt: "Kotłownia techniczna — kaskada pomp ciepła Daikin",
      caption: "Kaskada dwóch jednostek Daikin Altherma 3 R 16 kW · hydraulika niskotemperaturowa.",
    },
  ],

  building: {
    type: "Rezydencja jednorodzinna",
    area_m2: 350,
    floors: 2,
    year: 2024,
    occupants: 5,
    insulation: "Pasywna (U ścian 0.14 W/m²K)",
    previousHeating: "Brak — instalacja od zera",
  },

  goals: [
    "Stała temperatura 22.5 °C w 11 strefach grzewczych — bez stref zimnych.",
    "Roczny koszt ogrzewania + CWU + chłodzenia poniżej 6 000 zł.",
    "Cisza pracy — żaden agregat nie może być słyszalny z tarasu.",
    "Autonomia energetyczna domu min. 16 godzin bez zasilania z sieci.",
    "Estetyka klasy premium — bez widocznych elementów technicznych na elewacji.",
  ],

  challenges: [
    {
      title: "11 stref grzewczych, jeden bufor",
      text: "Każda strefa ma indywidualny harmonogram i pojemność cieplną. Bez właściwie dobranego sprzęgła hydraulicznego pompy oscylowałyby między cyklami, tracąc COP i generując hałas.",
    },
    {
      title: "Wymóg cichej pracy",
      text: "Architekt zarezerwował taras południowy jako strefę reprezentacyjną. Klasyczne umiejscowienie monoblocka na elewacji odpadało — wymagało zaprojektowania zagłębionej, akustycznie wyciszonej niszy technicznej.",
    },
    {
      title: "Autokonsumpcja vs net-billing",
      text: "Profil zużycia rezydencji jest zimowo-szczytowy. Net-billing dawał najgorszy możliwy zwrot. Optymalna odpowiedź: BESS 20 kWh sterowany predykcyjnie pod taryfę G12W i prognozę PV.",
    },
  ],

  approach: [
    "Zaczęliśmy od obliczenia zapotrzebowania w warunkach projektowych (−20 °C dla strefy III). Wynik: 14.8 kW przy ΔT 5 K na zasilaniu 38 °C. To pozwoliło świadomie wybrać kaskadę 2 × 8 kW zamiast pojedynczej 16 kW — modulacja schodzi do 2.1 kW w sezonach przejściowych, gdzie spędzamy 60% czasu pracy.",
    "Hydraulikę zbudowaliśmy wokół bufora 200 l z czterema króćcami strefowymi i sprzęgłem hydraulicznym dobranym pod realny przepływ kaskady. To eliminuje tzw. „cycling” — najczęstszą przyczynę utraty COP w domach premium z wieloma strefami.",
    "PV 14 kWp połączone z falownikiem hybrydowym i magazynem 20 kWh sterujemy własnym profilem optymalizacyjnym Soltimus: w lecie BESS ładuje się z nadwyżki PV i zasila dom w szczycie taryfy; w zimie magazyn przesuwa pobór z taryfy szczytowej na G12W, niezależnie od pogody.",
  ],

  system: [
    {
      title: "Pompa ciepła",
      items: [
        { label: "Jednostka", value: "Kaskada 2 × Daikin Altherma 3 R 8 kW", note: "R-32, monoblok zewnętrzny" },
        { label: "Moc grzewcza (A−7/W35)", value: "14.4 kW" },
        { label: "SCOP (projektowy)", value: "4.6", note: "Strefa III, T zasilania 38 °C" },
        { label: "Bufor", value: "200 l + sprzęgło hydrauliczne" },
        { label: "CWU", value: "Zasobnik 300 l ze stali nierdzewnej, wężownica 3 m²" },
      ],
    },
    {
      title: "Fotowoltaika + magazyn",
      items: [
        { label: "Moc PV", value: "14.08 kWp", note: "32 × Jinko Tiger Neo 440 W, dach SW + S" },
        { label: "Falownik", value: "Hybrydowy 12 kW · 3-fazowy" },
        { label: "Magazyn energii", value: "20 kWh LiFePO4", note: "5 modułów × 4 kWh" },
        { label: "Autonomia (backup)", value: "≈ 18 h", note: "Profil bazowy domu" },
      ],
    },
    {
      title: "Automatyka i komfort",
      items: [
        { label: "Sterowanie strefowe", value: "11 stref · niezależny harmonogram" },
        { label: "Chłodzenie pasywne", value: "Tak — przez ogrzewanie podłogowe latem" },
        { label: "Akustyka jednostki zewn.", value: "32 dB(A) @ 5 m", note: "Pomiar nocny, tryb cichy" },
      ],
    },
  ],

  metrics: [
    { label: "Redukcja kosztu energii", value: "−72%", sub: "vs scenariusz: gaz + sieć" },
    { label: "SCOP rzeczywisty", value: "4.61", sub: "Pomiar sezon 2025/26" },
    { label: "Autokonsumpcja PV", value: "84%", sub: "Z BESS · sezon roczny" },
    { label: "Cisza zewn.", value: "32 dB(A)", sub: "5 m, tryb nocny" },
  ],

  beforeAfter: [
    {
      metric: "Roczny koszt energii (ogrzewanie + CWU + bytowa)",
      before: "21 400 zł / rok",
      after: "5 980 zł / rok",
      delta: "−72%",
      tone: "positive",
    },
    {
      metric: "Stabilność komfortu (Δ temperatury w strefach)",
      before: "±2.1 °C (projekt referencyjny)",
      after: "±0.4 °C",
      delta: "−81%",
      tone: "positive",
    },
    {
      metric: "Autonomia bez zasilania sieciowego",
      before: "0 h",
      after: "≈ 18 h",
      tone: "positive",
    },
    {
      metric: "Emisja CO₂ (Scope 2, własne źródło)",
      before: "5.8 t / rok",
      after: "0.9 t / rok",
      delta: "−84%",
      tone: "positive",
    },
  ],

  timeline: [
    {
      phase: "Audyt techniczny i projekt",
      duration: "3 tygodnie",
      text: "Inwentaryzacja, obliczenia OZC, symulacja SCOP, projekt hydrauliczny, projekt PV i BESS, koordynacja z architektem i elektrykiem.",
    },
    {
      phase: "Przygotowanie konstrukcyjne",
      duration: "1 tydzień",
      text: "Wyciszona nisza techniczna, przepusty, fundament pod jednostki zewnętrzne, trasy kablowe pod PV i BESS.",
    },
    {
      phase: "Instalacja pompy ciepła i hydrauliki",
      duration: "5 dni",
      text: "Montaż kaskady, bufora, CWU, podłączenia stref, próby szczelności, izolacja techniczna.",
    },
    {
      phase: "Instalacja PV + BESS",
      duration: "3 dni",
      text: "Konstrukcja, panele, optymalizatory, falownik hybrydowy, magazyn energii, konfiguracja backupu fazowego.",
    },
    {
      phase: "Uruchomienie i tuning",
      duration: "2 dni + 30 dni monitoringu",
      text: "Pierwsze rozruchy, kalibracja krzywej grzewczej, konfiguracja stref, walidacja akustyczna, 30-dniowy monitoring z dostrojeniem.",
    },
  ],

  engineerCommentary: [
    {
      authorId: "dzial-projektowy",
      asPullQuote: true,
      text: "Najtrudniejsza decyzja nie dotyczyła sprzętu, tylko hydrauliki. Wybór sprzęgła i objętości bufora to wybór między cichym, równym SCOP-em a głośnymi cyklami, których nikt nie zauważy w katalogu — ale właściciel usłyszy każdej zimowej nocy.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Z kaskadą 2 × 8 kW zyskaliśmy modulację 2.1–14.4 kW. To prawie 7-krotny zakres — w sezonach przejściowych pompy pracują w optymalnym punkcie sprawności zamiast wpadać w cykle ON/OFF. Tu rodzi się różnica między SCOP 3.8 a 4.6.",
    },
  ],

  lessons: [
    "Dla domów >250 m² z wieloma strefami kaskada dwóch mniejszych pomp niemal zawsze pokonuje pojedynczą większą jednostkę — pod warunkiem właściwego sprzęgła hydraulicznego.",
    "BESS w net-billingu zwraca się szybciej w profilach zimowo-szczytowych niż w profilach letnich — odwrotnie niż przeciętna prognoza marketingowa.",
    "Akustyka jednostki zewnętrznej to projekt, nie wybór z karty. 90% reklamacji „hałasujących pomp” to skutek złego umiejscowienia, nie złego urządzenia.",
    "Monitoring 30-dniowy po uruchomieniu wyłapuje 100% błędów konfiguracji — to taniej niż reklamacja po pierwszej zimie.",
  ],

  testimonial: {
    quote:
      "Po pierwszej zimie nie zauważyliśmy systemu. Nie słyszeliśmy, nie czuliśmy, nie martwiliśmy się rachunkiem. To dokładnie to, co miało się wydarzyć.",
    author: "M. K.",
    role: "Właściciel rezydencji",
  },

  faq: [
    {
      q: "Dlaczego kaskada dwóch pomp zamiast jednej większej?",
      a: "Pojedyncza pompa 16 kW pracuje optymalnie przy ~70% obciążenia. Przez większą część roku rezydencja potrzebuje 3–6 kW — pojedyncza jednostka wpadałaby w cykle ON/OFF. Kaskada 2 × 8 kW pozwala modulować od 2.1 kW, utrzymując pracę w optymalnym oknie sprawności i podnosząc SCOP o ok. 0.7.",
    },
    {
      q: "Czy magazyn 20 kWh zwraca się przy obecnych taryfach?",
      a: "Dla profilu zimowo-szczytowego z odbiorem PV w lecie BESS skraca okres zwrotu całego systemu PV o ok. 2 lata. Decyduje nie pojemność, ale algorytm sterowania — u nas to autorski profil optymalizujący względem prognozy PV i taryfy G12W.",
    },
    {
      q: "Jak głośna jest pompa ciepła w nocy?",
      a: "Pomiar walidacyjny w trybie nocnym: 32 dB(A) w odległości 5 m od jednostki. To poziom porównywalny z szeptem. Osiągnięte przez zagłębienie w niszy akustycznej i wybór najcichszej jednostki w klasie 8 kW.",
    },
    {
      q: "Ile trwała cała realizacja?",
      a: "Od projektu do oddania kluczy klientowi: 7 tygodni. Sam montaż na obiekcie: 10 dni roboczych + 30 dni monitoringu z dostrajaniem parametrów.",
    },
  ],

  related: {
    services: ["pompy-ciepla", "fotowoltaika", "magazyny-energii"],
    articles: [
      "gruntowa-pompa-ciepla-kompletny-przewodnik",
      "cennik-pomp-ciepla-2026",
    ],
  },

  seo: {
    title:
      "Rezydencja 350 m² Konstancin — pompa ciepła, PV 14 kWp, magazyn 20 kWh",
    description:
      "Case study Soltimus: kompleksowy system energetyczny dla rezydencji premium w Konstancinie. Kaskada Daikin Altherma 3, fotowoltaika 14 kWp, BESS 20 kWh. SCOP 4.61, koszt energii −72%.",
  },
};
