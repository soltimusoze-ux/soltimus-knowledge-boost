/**
 * Flagship case study — Premium lifestyle energy independence.
 *
 * Storytelling axis: NOT "heat pump + fireplace installation" —
 * a home energy system designed around the homeowner's lifestyle,
 * habits, and emotional connection to the home.
 *
 * Editorial tone: calm, emotionally intelligent, engineering-supported.
 * Technology serves the homeowner. Never "technology replaces tradition".
 */
import type { CaseStudy } from "../types";
import heroImg from "@/assets/case-stodola-hero.jpg";

export const caseStudy: CaseStudy = {
  slug: "dom-nowy-hybryda-kominek-pompa-ciepla",
  status: "published",

  title:
    "Nowy dom — elastyczne ogrzewanie hybrydowe: kominek i pompa ciepła jako jeden system",
  subtitle:
    "Daikin Altherma 3 zintegrowany z kominkiem z płaszczem wodnym i buforem 500 l — ciepło, które dostosowuje się do rytmu dnia i nieobecności właściciela.",
  excerpt:
    "Właściciel prywatnego lasu, który ceni rytuał ognia w domu i często podróżuje. Pokazujemy, jak zaprojektowaliśmy system, w którym kominek i pompa ciepła współpracują przez jeden bufor — bez przymusu wyboru między tradycją a automatyką.",

  publishedAt: "2026-05-21",
  readingTime: 10,

  category: "kompleksowa",
  tags: [
    "Daikin Altherma 3",
    "Kominek z płaszczem wodnym",
    "ECH2O",
    "Bufor ciepła",
    "Hybryda",
    "Niezależność energetyczna",
    "Styl życia",
  ],

  location: {
    city: "Warmia",
    region: "warmińsko-mazurskie",
    countryCode: "PL",
  },

  heroImage: heroImg,
  heroImageAlt:
    "Nowoczesna stodoła z grafitowym dachem i panelami PV — realizacja Soltimus",

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
      alt: "Przestronny salon z nowoczesnym kominkiem",
      caption:
        "Kominek pozostaje emocyjnym centrum domu — teraz zintegrowany z całym systemem grzewczym.",
    },
    {
      src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80",
      alt: "Kotłownia techniczna — pompa ciepła Daikin i zbiornik buforowy",
      caption:
        "Pompa ciepła Daikin Altherma 3, zbiornik ECH2O i bufor 500 l — jeden spójny układ hydrauliczny.",
    },
    {
      src: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?w=1600&q=80",
      alt: "Las wokół domu — źródło darmowego drewna opałowego",
      caption:
        "Własny las dostarcza drewno opałowe, które staje się częścią bilansu energetycznego domu.",
    },
  ],

  building: {
    type: "Dom jednorodzinny",
    area_m2: 220,
    floors: 1,
    year: 2025,
    occupants: 4,
    insulation: "Wysoka (U ścian ≤ 0.15 W/m²K, strop/poddasze, okna trzyszybowe)",
    previousHeating: "Brak — nowa budowa",
  },

  goals: [
    "Zachować rytuał i atmosferę kominka jako emocyjnego centrum domu — bez izolowania go od reszty systemu.",
    "Pełna automatyzacja podczas wyjazdów — żadnej interwencji, żadnego ryzyka zamarznięcia, żadnego niepokoju.",
    "Niskie koszty operacyjne dzięki darmowemu drewnu z własnego lasu i wysokiemu SCOP pompy.",
    "Płynne przejście między ogrzewaniem kominkowym a pracą pompy ciepła — bez wiedzy użytkownika.",
    "Zachować charakter domu: nowoczesny komfort bez rezygnacji z ciepła i tradycji.",
  ],

  challenges: [
    {
      title: "Dwa fundamentalnie różne źródła ciepła w jednym domu",
      text: "Kominek z płaszczem wodnym: wysokotemperaturowy (70–80 °C), impulsowy, sterowany ręcznie. Pompa ciepła: niskotemperaturowa (35–45 °C), ciągła, automatyczna. Bez właściwej integracji hydraulicznej każde źródło pracuje przeciwko drugiemu — kominek przegrzewa dom, a pompa traci sprawność, próbując stabilizować temperaturę.",
    },
    {
      title: "Bufor ciepła jako warstwa integracyjna",
      text: "Bez bufora energia z kominka ulatuje w postaci nadmiaru ciepła w salonie — traci się ją, zamiast przechowywać i rozprowadzać do pozostałych pomieszczeń. Bufor musi przyjmować ciepło z obu źródeł, magazynować je i oddawać zgodnie z zapotrzebowaniem budynku, niezależnie od tego, które źródło aktualnie pracuje.",
    },
    {
      title: "Tryb nieobecności bez przekomplikowania",
      text: "Właściciel często wyjeżdża na kilka dni. System musi sam przełączać się w tryb automatyczny pompy ciepła, utrzymywać temperaturę bazową 18 °C i wracać do trybu hybrydowego po powrocie — bez konieczności programowania termostatu przez telefon i bez ryzyka zamarznięcia.",
    },
    {
      title: "Hydraulika wysoko- i niskotemperaturowa w jednym układzie",
      text: "Płaszcz wodny kominka wymaga obiegu 70–80 °C. Pompa ciepła pracuje optymalnie przy 35–45 °C. Zbiornik ECH2O musi tolerować oba poziomy temperatury bez szoku termicznego i bez utraty sprawności. Wymagało to dokładnego doboru krzywej mieszania i priorytetów źródła.",
    },
  ],

  approach: [
    "Pierwszą decyzją było potraktowanie kominka nie jako dekoracji ani alternatywy dla pompy ciepła, tylko jako współpracującego źródła w jednym systemie hydraulicznym. Większość domów z kominkiem i pompą ma dwa osobne światy: kominek grzeje salon, pompa grzeje resztę. My zaprojektowaliśmy jeden bufor, do którego trafia ciepło z obu źródeł — i z którego ciepło trafia do całego domu. To decyzja projektowa, nie produktowa: kominek staje się częścią organizmu grzewczego, nie wyspą.",
    "Drugą decyzją był wybór zbiornika ECH2O zintegrowanego z pompą ciepła Daikin jako centrum systemu. ECH2O łączy w sobie przygotowanie c.w.u., bufor grzewczy i interfejs źródeł alternatywnych. Dzięki temu kominek z płaszczem wodnym podłączony jest do tego samego obiegu, co pompa — przez jeden wymiennik, jedną automatyke, jeden priorytet.",
    "Trzecią decyzją był dobór bufora 500 l jako magazynu ciepła. Pojemność wyznaczona została nie z katalogu, ale z cyklu pracy kominka: jedno pełne załadunkowanie drewnem daje energię wystarczającą na 24–36 godzin ogrzewania domu w sezonie przejściowym. Bufor 500 l magazynuje tę energię i oddaje ją stopniowo, zanim pompa ciepła musi uruchomić sprężarkę. To redukuje liczbę godzin pracy pompy o 30–40% w okresach, gdy kominek jest aktywny.",
    "Czwartą decyzją była logika sterowania: priorytet kominka, pompa ciepła jako warstwa bazowa. Gdy bufor osiąga temperaturę zadawaną z kominka, pompa moduluje w dół do minimalnej mocy lub zatrzymuje się. Gdy bufor oziębia, pompa startuje płynnie — bez nagłego przełączania, bez szoku termicznego w instalacji. Właściciel nie musi pamiętać o przełączaniu źródeł. System sam wie, które źródło jest aktywne.",
    "Piątą decyzją było zaprojektowanie trybu nieobecności jako rozszerzenia normalnej pracy, a nie osobnego programu. W trybie nieobecności pompa ciepła utrzymuje temperaturę bazową 18 °C automatycznie. Kominek pozostaje wyłączony — nie ma ryzyka niezgaszenia ognia. Po powrocie właściciela wystarczy jedno naciśnięcie przycisku, by system wrócił do trybu hybrydowego. Żadnej aplikacji, żadnego zdalnego logowania.",
  ],

  system: [
    {
      title: "Pompa ciepła",
      items: [
        { label: "Jednostka", value: "Daikin Altherma 3 R 10 kW", note: "R-32, monoblok zewnętrzny" },
        { label: "Moc grzewcza (A−7/W35)", value: "9.8 kW" },
        { label: "SCOP (projektowy)", value: "4.5", note: "Strefa IV, T zasilania 40 °C" },
        { label: "Akustyka", value: "38 dB(A)", note: "5 m, tryb standardowy" },
      ],
    },
    {
      title: "Zbiornik ECH2O + bufor",
      items: [
        { label: "Zbiornik ECH2O", value: "Zintegrowany z pompą", note: "CWU + interfejs źródeł alternatywnych" },
        { label: "Bufor grzewczy", value: "500 l", note: "Stalowy, izolowany, z wężownicą kominkową" },
        { label: "Priorytet źródeł", value: "Kominek → bufor → pompa ciepła", note: "Automatyczna logika przełączania" },
        { label: "Magazynowanie ciepła z kominka", value: "24–36 h", note: "Dla budynku 220 m² w sezonie przejściowym" },
      ],
    },
    {
      title: "Kominek",
      items: [
        { label: "Typ", value: "Kominek z płaszczem wodnym", note: "Zintegrowany z układem hydraulicznym" },
        { label: "Moc płaszcza", value: "8–12 kW", note: "W zależności od załadunku i gatunku drewna" },
        { label: "Temperatura wylotowa", value: "70–80 °C", note: "Do bufora 500 l" },
        { label: "Źródło opału", value: "Drewno z własnego lasu", note: "Darmowe, odnawialne" },
      ],
    },
    {
      title: "Automatyka i komfort",
      items: [
        { label: "Sterowanie źródłami", value: "Automatyczne priorytetowe", note: "Bez ręcznego przełączania" },
        { label: "Tryb nieobecności", value: "Automatyczny · 18 °C bazowo", note: "Pompa ciepła utrzymuje temperaturę" },
        { label: "Powrót do trybu hybrydowego", value: "Jeden przycisk", note: "Po przyjeździe właściciela" },
        { label: "Strefy grzewcze", value: "5 stref · niezależne termostaty", note: "W tym oddzielna strefa salonu z kominkiem" },
      ],
    },
  ],

  metrics: [
    { label: "Redukcja kosztu ogrzewania", value: "≈ −40%", sub: "vs samodzielna pompa ciepła (darmowe drewno)" },
    { label: "Godziny pracy pompy", value: "−35%", sub: "w okresach aktywnego kominka (sezon przejściowy)" },
    { label: "Autonomia podczas nieobecności", value: "Pełna", sub: "Pompa utrzymuje temperaturę bez interwencji" },
    { label: "Pojemność bufora", value: "500 l", sub: "Magazynowanie do 36 h ciepła z kominka" },
  ],

  beforeAfter: [
    {
      metric: "Filozofia ogrzewania",
      before: "Wybór: albo kominek, albo pompa ciepła — dwa osobne światy",
      after: "Hybryda: kominek i pompa w jednym systemie hydraulicznym",
      tone: "positive",
    },
    {
      metric: "Koszt operacyjny ogrzewania (sezon zimowy)",
      before: "Szacunek: pompa ciepła + prąd (bez bufora kominkowego)",
      after: "≈ −40% (darmowe drewno + wysoki SCOP pompy)",
      delta: "≈ −40%",
      tone: "positive",
    },
    {
      metric: "Ogrzewanie podczas nieobecności",
      before: "Niepewność, zdalne sterowanie lub obawa o zamarznięcie",
      after: "Pełna automatyzacja pompy ciepła · temperatura bazowa 18 °C",
      tone: "positive",
    },
    {
      metric: "Wykorzystanie energii z kominka",
      before: "Ciepło ulatuje głównie w salonie — reszta domu bez korzyści",
      after: "Bufor 500 l magazynuje i rozprowadza do całego budynku",
      tone: "positive",
    },
    {
      metric: "Komfort emocjonalny",
      before: "Technika kontra tradycja — dwa oddzielne doświadczenia",
      after: "Jeden spójny system — atmosfera ognia i nowoczesny komfort",
      tone: "positive",
    },
  ],

  timeline: [
    {
      phase: "Projekt systemu hybrydowego",
      duration: "3 tygodnie",
      text: "Audyt potrzeb właściciela, bilans cieplny budynku, projekt hydrauliczny z priorytetem źródeł, dobór bufora pod cykl pracy kominka, wybór kominka z płaszczem wodnym.",
    },
    {
      phase: "Montaż pompy ciepła i hydrauliki",
      duration: "5 dni",
      text: "Montaż jednostki zewnętrznej Daikin Altherma 3, zbiornika ECH2O, instalacja niskotemperaturowa z podłogówką i grzejnikami, próby szczelności.",
    },
    {
      phase: "Integracja kominka z systemem ECH2O",
      duration: "3 dni",
      text: "Podłączenie płaszcza wodnego kominka do obiegu bufora 500 l, kalibracja priorytetów źródła, test mieszania temperatur.",
    },
    {
      phase: "Instalacja bufora 500 l",
      duration: "1 dzień",
      text: "Montaż bufora jako centralnego węzła magazynowania ciepła, izolacja techniczna, podłączenie obwodów grzewczych.",
    },
    {
      phase: "Uruchomienie i kalibracja",
      duration: "2 dni",
      text: "Pierwsze rozruchy, konfiguracja logiki hybrydowej, kalibracja krzywej grzewczej, test trybu nieobecności.",
    },
    {
      phase: "Sezon walidacyjny",
      duration: "Zima 2025/26",
      text: "Monitoring pracy hybrydowej: przełączanie źródeł, zużycie drewna, godziny pracy pompy, walidacja komfortu termicznego i trybu nieobecności.",
    },
  ],

  engineerCommentary: [
    {
      authorId: "dzial-projektowy",
      asPullQuote: true,
      text: "Najważniejsza decyzja nie była techniczna — była filozoficzna. Nie pytaliśmy 'jak zmusić kominek i pompę do współpracy'. Pytaliśmy: jak dom ma żyć, gdy właściciel jest w domu, i jak ma żyć, gdy go nie ma. Dopiero odpowiedź na to pytanie wyznaczyła wybór bufora, logikę sterowania i priorytet źródeł.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Bufor 500 l to nie tylko zbiornik — to pamięć termiczna domu. Gdy kominek pali, bufor zapamiętuje nadmiar ciepła. Gdy właściciel wyjeżdża, pompa ciepła odczytuje zapotrzebowanie i utrzymuje komfort. Gdy wraca, system wraca do trybu hybrydowego jednym przyciskiem. Żadnej aplikacji, żadnego hasła.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Darmowe drewno z własnego lasu zmienia bilans ekonomiczny. W sezonie przejściowym, gdy kominek pali codziennie, pompa pracuje o 35% mniej godzin. To nie oznacza, że pompa jest zbędna — oznacza, że każda godzina pracy pompy jest wykorzystana tam, gdzie kominek nie może być aktywny: w nocy, w trakcie nieobecności, w zbyt ciepłe dni na palenie.",
    },
  ],

  lessons: [
    "Kominek i pompa ciepła współpracują tylko wtedy, gdy bufor jest zaprojektowany jako warstwa integracyjna — nie jako zbiornik CWU z dodatkową wężownicą.",
    "Pojemność bufora musi odpowiadać cyklowi pracy kominka, nie tylko mocy pompy ciepła. Za mały bufor = utrata energii. Za duży = zbędne koszty i czas odpowiedzi.",
    "Tryb nieobecności powinien być prostym rozszerzeniem normalnej pracy, a nie osobnym, skomplikowanym programem. Im prostszy, tym bardziej używany.",
    "Darmowe drewno z własnego terenu zmienia kalkulację ekonomiczną projektu — ale tylko wtedy, gdy system jest zaprojektowany do efektywnego wykorzystania tego paliwa. W przeciwnym razie drewno pali się w salonie, a reszta domu jest ogrzewana drogo.",
    "Technologia powinna dostosować się do stylu życia właściciela, a nie odwrotnie. Właściciel nie powinien uczyć się obsługi systemu — system powinien uczyć się rytmu właściciela.",
    "Logika priorytetowa musi być transparentna dla użytkownika: kominek ma pierwszeństwo, pompa ciepła jest warstwą bazową. Ta hierarchia budzi zaufanie — właściciel wie, że technologia nie zastąpi ognia, tylko go wesprze.",
  ],

  testimonial: {
    quote:
      "Kominek nadal jest sercem naszego domu — rytuał palenia drewna, które sami przygotowujemy z lasu, to część naszego życia. Ale gdy wyjeżdżamy, nie martwimy się o nic. Wracamy do ciepła, które na nas czekało. Nie musieliśmy wybierać między tradycją a nowoczesnością.",
    author: "Pani M.",
    role: "Właścicielka domu",
  },

  faq: [
    {
      q: "Czy kominek i pompa ciepła mogą naprawdę współpracować w jednym systemie?",
      a: "Tak — pod warunkiem zastosowania bufora ciepła jako warstwy integracyjnej. Kominek z płaszczem wodnym dostarcza ciepło do bufora (70–80 °C), pompa ciepła utrzymuje bazę (35–45 °C), a bufor magazynuje energię i rozprowadza ją do całego domu. Logika priorytetowa automatycznie decyduje, które źródło aktualnie pracuje — właściciel nie musi przełączać ręcznie.",
    },
    {
      q: "Jak działa bufor 500 l w systemie hybrydowym?",
      a: "Bufor pełni rolę magazynu termicznego. Gdy kominek pali, ciepło z płaszcza wodnego trafia do bufora, zamiast ulatywać tylko w salonie. Bufor oddaje ciepło stopniowo przez 24–36 godzin, ogrzewając cały dom. Gdy bufor oziębia, pompa ciepła startuje płynnie i utrzymuje komfort. W sezonie przejściowym to redukuje godziny pracy pompy o 30–40%.",
    },
    {
      q: "Czy system wymaga obsługi podczas wyjazdów?",
      a: "Nie. W trybie nieobecności pompa ciepła utrzymuje temperaturę bazową 18 °C automatycznie. Kominek pozostaje wyłączony — nie ma ryzyka niezgaszenia ognia. Po powrocie wystarczy jeden przycisk, by wrócić do trybu hybrydowego. Żadnej aplikacji, żadnego logowania.",
    },
    {
      q: "Ile drewna zużywa taki system rocznie?",
      a: "Zależy od stylu życia właściciela. W tym projekcie — z własnym lasem — drewno jest darmowe i odnawialne. W sezonie zimowym, przy codziennym paleniu, kominek pokrywa 50–60% zapotrzebowania cieplnego. W sezonie przejściowym, gdy pompa ciepła pracuje optymalnie, kominek działa wybiórczo. To elastyczność, a nie sztywny podział.",
    },
    {
      q: "Czy hybryda jest droższa w budowie niż sama pompa ciepła?",
      a: "Inwestycja początkowa jest wyższa ze względu na kominek z płaszczem wodnym, bufor 500 l i dodatkową hydraulikę integracyjną. Jednak przy darmowym drewnie z własnego lasu zwrot tej różnicy występuje w horyzoncie 4–6 lat — szybciej niż przy samej pompie ciepła z prądem z sieci. Decyzja jest ekonomiczna i emocjonalna jednocześnie.",
    },
    {
      q: "Czy taki system ma sens bez własnego lasu?",
      a: "Ma sens, ale bilans ekonomiczny zmienia się. Drewno komercyjne to koszt, który należy wliczyć w kalkulację. Wartość systemu hybrydowego bez własnego lasu to głównie elastyczność: kominek jako źródło awaryjne podczas blackoutu, bufor jako stabilizator temperatury i emocjonalne centrum domu. Każdy wariant wymaga indywidualnego bilansu.",
    },
    {
      q: "Dlaczego priorytet ma kominek, a nie pompa ciepła?",
      a: "Bo kominek jest impulsowy i ręcznie sterowany — kiedy pali, musi oddać ciepło do systemu natychmiast. Pompa ciepła jest ciągła i automatyczna — może poczekać, modulując w dół lub zatrzymując się. Ta hierarchia jest intuicyjna dla właściciela i optymalna dla sprawności systemu. Kominek ma pierwszeństwo, pompa ciepła ma pewność.",
    },
  ],

  related: {
    services: ["pompy-ciepla"],
    articles: [
      "gruntowa-pompa-ciepla-kompletny-przewodnik",
      "cennik-pomp-ciepla-2026",
      "zbiorniki-cwu-do-pompy-ciepla",
    ],
    labEpisodes: [],
  },

  seo: {
    title:
      "Nowy dom — hybrydowe ogrzewanie: kominek + pompa ciepła Daikin + bufor 500 l | Soltimus",
    description:
      "Case study Soltimus: elastyczny system grzewczy dla nowego domu. Kominek z płaszczem wodnym zintegrowany z pompą ciepła Daikin Altherma 3 przez bufor 500 l. Pełna automatyzacja podczas nieobecności, ogrzewanie drewnem z własnego lasu, redukcja kosztów ≈ −40%.",
  },
};
