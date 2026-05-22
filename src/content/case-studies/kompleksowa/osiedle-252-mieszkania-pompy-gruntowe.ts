/**
 * Flagship case study — Infrastructure-scale energy transformation.
 *
 * Storytelling axis: NOT "duża instalacja pomp ciepła" —
 * kompleksowa transformacja infrastruktury energetycznej osiedla
 * po przymusowym odłączeniu od ciepła sieciowego zakładu przemysłowego.
 *
 * Editorial tone: calm engineering authority, infrastructure-scale,
 * long-term thinking. Community impact framed jako stabilność
 * operacyjna, nie sentyment.
 */
import type { CaseStudy } from "../types";
import heroImg from "@/assets/case-osiedle-hero.jpg";

export const caseStudy: CaseStudy = {
  slug: "osiedle-252-mieszkania-pompy-gruntowe",
  status: "published",

  title:
    "Osiedle 252 mieszkań — własna infrastruktura ciepła po odłączeniu od sieci przemysłowej",
  subtitle:
    "Gruntowe pompy ciepła, 120 odwiertów po 100 m (≈ 12 km) i fotowoltaika jako jeden, niezależny system ciepła dla 6 budynków mieszkalnych.",
  excerpt:
    "Wspólnota straciła dostawcę ciepła z dnia na dzień. Zaprojektowaliśmy i wdrożyliśmy całkowicie nową, własną infrastrukturę grzewczą dla 252 mieszkań — w oparciu o dolne źródło 12 km odwiertów i 50% dofinansowanie z Grantu OZE.",

  publishedAt: "2026-05-15",
  readingTime: 12,

  category: "kompleksowa",
  tags: [
    "Pompy gruntowe",
    "Dolne źródło",
    "12 km odwiertów",
    "Grant OZE",
    "Osiedle",
    "Infrastruktura",
  ],

  location: {
    city: "Mazowsze",
    region: "mazowieckie",
    countryCode: "PL",
  },

  heroImage: heroImg,
  heroImageAlt:
    "Ujęcie z drona — osiedle 252 mieszkań po modernizacji infrastruktury ciepła Soltimus",

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80",
      alt: "Sześć budynków mieszkalnych osiedla — widok z lotu ptaka",
      caption: "6 budynków · 252 mieszkania · jeden zintegrowany system ciepła.",
    },
    {
      src: "https://images.unsplash.com/photo-1581094289810-adf5d25690e3?w=1600&q=80",
      alt: "Pole odwiertów gruntowych pod osiedlem — etap wiercenia",
      caption: "120 odwiertów pionowych po 100 m — łącznie ok. 12 km dolnego źródła.",
    },
  ],

  building: {
    type: "Osiedle mieszkaniowe (6 budynków wielorodzinnych)",
    area_m2: 18900,
    floors: 4,
    occupants: 620,
    insulation: "Budynki po podstawowej termomodernizacji elewacji",
    previousHeating:
      "Ciepło sieciowe z pobliskiego zakładu przemysłowego (zlikwidowane)",
  },

  goals: [
    "Zapewnić ciągłość ogrzewania i CWU dla 252 mieszkań po odłączeniu od sieci zakładu.",
    "Zbudować własną, niezależną infrastrukturę ciepła — bez powrotu do paliw kopalnych.",
    "Obniżyć długoterminowy koszt jednostkowy ciepła dla mieszkańców.",
    "Zoptymalizować inwestycję z wykorzystaniem dostępnych programów dofinansowania.",
    "Zaprojektować system o przewidywalnym koszcie eksploatacji w horyzoncie 20+ lat.",
  ],

  challenges: [
    {
      title: "Utrata dostawcy ciepła z krótkim wyprzedzeniem",
      text: "Zakład przemysłowy zakończył dostawy ciepła do osiedla w wyznaczonym terminie. Wspólnota stanęła przed koniecznością zbudowania własnej infrastruktury grzewczej w jednym sezonie inwestycyjnym, bez możliwości przerwy w ogrzewaniu mieszkań.",
    },
    {
      title: "Skala mocy zamiast pojedynczego źródła",
      text: "Zapotrzebowanie 252 mieszkań to inny problem inżynierski niż dom jednorodzinny. Wymagało rozdzielenia źródła ciepła na kaskadę jednostek pracujących równolegle, z hydrauliką buforową dla każdego z 6 budynków i wspólnym dolnym źródłem zaprojektowanym pod szczyt zimowy.",
    },
    {
      title: "Dolne źródło o długiej żywotności",
      text: "Pole 120 odwiertów (≈ 12 km) musi pracować stabilnie przez 25–30 lat bez regeneracji termicznej. Wymagało to obliczeń bilansu cieplnego gruntu, rozplanowania siatki odwiertów z odpowiednim rozstawem oraz zaprojektowania pracy sezonowej, która nie wychładza złoża.",
    },
    {
      title: "Optymalizacja finansowa inwestycji wspólnoty",
      text: "Inwestycja na tę skalę wymagała struktury finansowania — sam budżet eksploatacyjny wspólnoty go nie udźwignie. Skompletowaliśmy dokumentację techniczną i finansową pod program „Grant OZE”, który ostatecznie pokrył 50% kosztu netto.",
    },
  ],

  approach: [
    "Pierwszą decyzją było rozdzielenie problemu na warstwy: dolne źródło (geologia + odwierty), źródło ciepła (kaskada pomp), dystrybucja (6 węzłów buforowych w budynkach) i energia elektryczna (PV jako warstwa redukcji OPEX). Każda warstwa była projektowana niezależnie, a następnie integrowana — to standard projektowy dla obiektów infrastrukturalnych.",
    "Drugą decyzją było gruntowe dolne źródło zamiast powietrznego. Dla osiedla pracującego w pełnym sezonie zimowym SCOP gruntu jest stabilny (4.4–4.8) niezależnie od temperatury zewnętrznej, podczas gdy źródło powietrzne traci wydajność dokładnie wtedy, gdy potrzeba jej najbardziej. Na skali 252 mieszkań różnica ΔSCOP ≈ 1.0 przekłada się na sześciocyfrową roczną różnicę OPEX.",
    "Trzecią decyzją było rozplanowanie 120 odwiertów po 100 m w siatce z rozstawem zapewniającym brak interferencji termicznej. Obliczenia EED (Earth Energy Designer) potwierdziły stabilny bilans cieplny gruntu w horyzoncie 25 lat. Łączna długość dolnego źródła to ok. 12 km — to nie jest „instalacja pomp ciepła”, to lokalna infrastruktura geotermalna niskoenergetyczna.",
    "Czwartą decyzją było rozdzielenie dystrybucji ciepła na 6 niezależnych węzłów buforowych — po jednym na budynek. Każdy węzeł ma własną automatykę i może być serwisowany bez wpływu na pozostałe. To eliminuje pojedynczy punkt awarii dla całego osiedla i upraszcza modernizacje w przyszłości.",
    "Piątą decyzją było skompletowanie dokumentacji pod „Grant OZE”. Program pokrył 50% kosztu netto inwestycji — co dla wspólnoty oznaczało realną wykonalność projektu w jednym roku budżetowym. Po stronie inżynierskiej oznaczało to dodatkową warstwę dokumentacji audytowej i pomiarowej, którą zaplanowaliśmy od początku, nie post factum.",
  ],

  system: [
    {
      title: "Dolne źródło — pole geotermalne",
      items: [
        { label: "Liczba odwiertów", value: "120 odwiertów pionowych" },
        { label: "Głębokość odwiertu", value: "100 m" },
        {
          label: "Łączna długość dolnego źródła",
          value: "≈ 12 km",
          note: "Sondy U-rurowe, wypełnienie termoprzewodzące",
        },
        {
          label: "Rozstaw odwiertów",
          value: "Siatka projektowa wg bilansu EED",
          note: "Brak interferencji w horyzoncie 25 lat",
        },
      ],
    },
    {
      title: "Źródło ciepła — kaskada pomp gruntowych",
      items: [
        {
          label: "Topologia",
          value: "Kaskada gruntowych pomp ciepła (B0/W35)",
          note: "Praca modulacyjna, redundancja N+1",
        },
        {
          label: "Punkt pracy projektowy",
          value: "T zasilania ≤ 45 °C",
          note: "Praca niskotemperaturowa dla maks. SCOP",
        },
        { label: "SCOP projektowy", value: "4.4–4.8", note: "Profil sezonu rocznego" },
        {
          label: "Dystrybucja",
          value: "6 niezależnych węzłów buforowych",
          note: "Jeden węzeł na budynek",
        },
      ],
    },
    {
      title: "Fotowoltaika i redukcja OPEX",
      items: [
        {
          label: "Instalacja PV",
          value: "Dachy budynków wspólnoty",
          note: "Redukcja kosztu energii napędzającej pompy",
        },
        {
          label: "Cel PV",
          value: "Obniżenie rocznego kosztu energii elektrycznej części wspólnej",
        },
        {
          label: "Integracja",
          value: "Wspólny układ pomiarowy z systemem pomp ciepła",
        },
      ],
    },
    {
      title: "Automatyka, monitoring i bezpieczeństwo",
      items: [
        {
          label: "BMS",
          value: "Centralny monitoring 6 węzłów + dolnego źródła",
        },
        {
          label: "Telemetria",
          value: "24/7 · alerty serwisowe",
        },
        {
          label: "Redundancja",
          value: "N+1 na kaskadzie pomp",
          note: "Serwis jednostki bez przerwy w ogrzewaniu",
        },
      ],
    },
  ],

  metrics: [
    {
      label: "Mieszkania objęte projektem",
      value: "252",
      sub: "6 budynków wielorodzinnych",
    },
    {
      label: "Dolne źródło",
      value: "≈ 12 km",
      sub: "120 odwiertów × 100 m",
    },
    {
      label: "Dofinansowanie netto",
      value: "50%",
      sub: "Program „Grant OZE”",
    },
    {
      label: "SCOP projektowy",
      value: "4.4–4.8",
      sub: "Gruntowe dolne źródło",
    },
  ],

  beforeAfter: [
    {
      metric: "Źródło ciepła",
      before: "Ciepło z sieci zakładu przemysłowego",
      after: "Własna infrastruktura geotermalna + PV",
      tone: "positive",
    },
    {
      metric: "Niezależność operacyjna wspólnoty",
      before: "Pełna zależność od decyzji zewnętrznego dostawcy",
      after: "Pełna kontrola nad źródłem i kosztem ciepła",
      tone: "positive",
    },
    {
      metric: "Przewidywalność kosztu ciepła (horyzont 20+ lat)",
      before: "Taryfa zewnętrzna — brak wpływu",
      after: "Koszt zdominowany przez stałe parametry SCOP i taryfę energii",
      tone: "positive",
    },
    {
      metric: "Emisyjność źródła ciepła",
      before: "Ciepło z procesu przemysłowego (paliwa kopalne)",
      after: "Geotermia niskoenergetyczna + PV",
      tone: "positive",
    },
  ],

  timeline: [
    {
      phase: "Audyt techniczny i koncepcja",
      duration: "4 tygodnie",
      text: "Inwentaryzacja 6 budynków, obliczenia zapotrzebowania, analiza geologiczna terenu, koncepcja architektury źródła i dystrybucji.",
    },
    {
      phase: "Projekt budowlany i wykonawczy",
      duration: "8 tygodni",
      text: "Projekt pola odwiertów (rozstaw, bilans EED), projekt kotłowni, projekt 6 węzłów buforowych, projekt PV, projekt elektryczny i AKPiA.",
    },
    {
      phase: "Dokumentacja Grant OZE",
      duration: "Równolegle z projektem",
      text: "Kompletna dokumentacja techniczna i finansowa pod program — audyt, harmonogram, kosztorysy, kryteria efektywności. Wynik: 50% dofinansowania netto.",
    },
    {
      phase: "Wiercenie pola geotermalnego",
      duration: "≈ 10 tygodni",
      text: "Wykonanie 120 odwiertów pionowych po 100 m, montaż sond, próby ciśnieniowe, zalanie wypełnieniem termoprzewodzącym, podłączenie do rozdzielacza.",
    },
    {
      phase: "Montaż kotłowni i węzłów buforowych",
      duration: "≈ 6 tygodni",
      text: "Kaskada pomp ciepła, hydraulika, 6 węzłów buforowych w budynkach, integracja z istniejącymi instalacjami c.o.",
    },
    {
      phase: "Montaż PV i automatyki",
      duration: "≈ 4 tygodnie",
      text: "Instalacje PV na dachach budynków, BMS, telemetria, integracja monitoringu.",
    },
    {
      phase: "Uruchomienie i sezon walidacyjny",
      duration: "Pierwszy pełny sezon grzewczy",
      text: "Rozruch kaskady, kalibracja krzywych grzewczych, walidacja SCOP, dostrojenie BMS, raport pomiarowy dla wspólnoty.",
    },
  ],

  engineerCommentary: [
    {
      authorId: "dzial-projektowy",
      asPullQuote: true,
      text: "To nie była „duża instalacja pompy ciepła”. To było zaprojektowanie lokalnej infrastruktury ciepła dla społeczności 252 mieszkań — z bilansem cieplnym gruntu w horyzoncie 25 lat i redundancją, której nigdy nie projektuje się dla domu jednorodzinnego.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Decyzja o dolnym źródle gruntowym, a nie powietrznym, była decyzją finansową — nie ideologiczną. Na 252 mieszkaniach każda dziesiętna SCOP to wymierne pieniądze rocznie przez całą żywotność systemu. Grunt daje stabilność, której powietrze nie da nigdy.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Architektura sześciu niezależnych węzłów buforowych była świadomą rezygnacją z „eleganckiego” jednego centrum. Wspólnota dostała system, w którym serwis jednego węzła nie zatrzymuje ogrzewania pozostałych pięciu budynków. To jest infrastrukturalne myślenie.",
    },
  ],

  lessons: [
    "Na skali osiedla dolne źródło gruntowe niemal zawsze pokonuje powietrzne — różnica ΔSCOP × moc × godziny pracy daje rocznie kwotę, która zamyka dyskusję CAPEX vs OPEX.",
    "Pole odwiertów to infrastruktura, nie urządzenie. Projektuje się je z bilansem cieplnym gruntu w horyzoncie 25–30 lat, nie pod sezon.",
    "Rozdzielona dystrybucja (jeden węzeł na budynek) eliminuje pojedynczy punkt awarii i upraszcza przyszłą modernizację — to standard, który warto stosować również w mniejszych zespołach budynków.",
    "Dokumentację pod program dofinansowania (Grant OZE, FEnIKS, KPO) projektuje się równolegle z projektem technicznym, nie po. W przeciwnym razie traci się dostęp do dofinansowania lub wydłuża projekt o kilka miesięcy.",
    "Redundancja N+1 na źródle ciepła to standard dla obiektów, w których przerwa w ogrzewaniu = ryzyko reputacyjne dla zarządcy.",
    "Pierwszy pełny sezon grzewczy to integralna część projektu — bez kalibracji w warunkach rzeczywistych SCOP-y projektowe pozostają obietnicą.",
  ],

  testimonial: {
    quote:
      "Po odłączeniu od dotychczasowego dostawcy mieliśmy bardzo krótki czas na decyzję. Soltimus przeprowadził nas przez projekt, dokumentację dofinansowania i wykonanie tak, że pierwszy sezon grzewczy wystartowaliśmy w swoim, niezależnym systemie. Dzisiaj wiemy, ile będzie kosztować ciepło za rok i za pięć lat.",
    author: "Zarząd wspólnoty",
    role: "Inwestor",
  },

  faq: [
    {
      q: "Dlaczego gruntowe pompy ciepła, a nie powietrzne — przy tej skali?",
      a: "Gruntowe dolne źródło ma stabilną temperaturę przez cały sezon zimowy, dzięki czemu SCOP utrzymuje się w przedziale 4.4–4.8 niezależnie od pogody. Powietrzne pompy ciepła tracą wydajność dokładnie wtedy, gdy zapotrzebowanie jest największe. Na 252 mieszkaniach różnica SCOP-u przekłada się na sześciocyfrową roczną różnicę kosztu energii — to przesądziło o wyborze.",
    },
    {
      q: "Co oznacza 120 odwiertów po 100 m i 12 km dolnego źródła?",
      a: "To pole geotermalne niskoenergetyczne: 120 pionowych odwiertów o głębokości 100 m każdy, z sondami wypełnionymi cieczą roboczą, połączonymi rozdzielaczem z kotłownią. Łączna długość rur dolnego źródła to około 12 km. Pole zaprojektowano z rozstawem, który zapewnia stabilny bilans cieplny gruntu w horyzoncie 25 lat.",
    },
    {
      q: "Czy „Grant OZE” naprawdę pokrył 50% kosztu inwestycji?",
      a: "Tak — program pokrył 50% kosztu netto kwalifikowanej części inwestycji. Wymagało to przygotowania pełnej dokumentacji technicznej i finansowej zgodnej z kryteriami programu (audyt, harmonogram, efektywność, kosztorysy). Dokumentację prowadziliśmy równolegle z projektem technicznym, co skróciło proces o kilka miesięcy.",
    },
    {
      q: "Jak długo trwała cała realizacja?",
      a: "Od decyzji wspólnoty do uruchomienia własnego systemu ciepła na pierwszy pełny sezon grzewczy: kilkanaście miesięcy. Najdłuższym etapem było wiercenie pola odwiertów (≈ 10 tygodni) oraz dokumentacja Grant OZE prowadzona równolegle z projektem.",
    },
    {
      q: "Co się dzieje, gdy jedna pompa wymaga serwisu?",
      a: "Kaskada źródła pracuje w trybie N+1 — pozostałe jednostki przejmują obciążenie bez przerwy w ogrzewaniu. Dodatkowo każdy z 6 budynków ma niezależny węzeł buforowy, więc nawet prace serwisowe w jednym węźle nie wpływają na pozostałe budynki.",
    },
    {
      q: "Czy podobny model można zastosować dla mniejszej wspólnoty lub dewelopera?",
      a: "Tak — architektura (dolne źródło gruntowe + kaskada N+1 + rozdzielona dystrybucja + dokumentacja pod program dofinansowania) jest powtarzalna od kilkunastu mieszkań w górę. Każdy projekt zaczyna się od audytu zapotrzebowania i badań geologicznych, które przesądzają o opłacalności dolnego źródła gruntowego.",
    },
  ],

  related: {
    services: ["pompy-ciepla", "fotowoltaika"],
    articles: [
      "gruntowa-pompa-ciepla-kompletny-przewodnik",
      "cennik-pomp-ciepla-2026",
    ],
  },

  seo: {
    title:
      "Osiedle 252 mieszkań — pompy gruntowe, 12 km odwiertów, Grant OZE 50% | Case Study Soltimus",
    description:
      "Jak zbudowaliśmy własną infrastrukturę ciepła dla osiedla 252 mieszkań po odłączeniu od sieci przemysłowej: 120 odwiertów × 100 m, kaskada pomp gruntowych, PV, dofinansowanie 50% z Grant OZE.",
  },
};
