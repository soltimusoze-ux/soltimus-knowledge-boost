/**
 * Flagship case study — Human-centered deep thermomodernization.
 *
 * Storytelling axis: NOT "termomodernizacja" — restoring comfort,
 * independence and dignity of living for an 80-year-old homeowner.
 *
 * Editorial tone: calm, respectful, engineering-supported comfort.
 * Never sentimental. Numbers carry the emotion. Privacy: first name + initial.
 */
import type { CaseStudy } from "../types";
import heroImg from "@/assets/case-kostka-prl-hero.jpg";

export const caseStudy: CaseStudy = {
  slug: "dom-lat-70-gleboka-termomodernizacja-pompa-ciepla",
  status: "published",

  title:
    "Dom z lat 70. — głęboka termomodernizacja, która zwróciła komfort i niezależność",
  subtitle:
    "Ocieplenie, pompa ciepła Daikin, fotowoltaika i modernizacja c.o. — koniec z codzienną obsługą kotła węglowego dla 80-letniego właściciela.",
  excerpt:
    "Dom z dwuwarstwowych ścian, bez ocieplenia, ogrzewany węglem. 80-letni właściciel, dla którego codzienna obsługa kotła stała się fizycznie zbyt trudna. Pokazujemy, jak głęboka termomodernizacja z 70% dofinansowaniem „Czyste Powietrze” zwróciła mu komfort, niezależność i bezpieczeństwo.",

  publishedAt: "2026-05-18",
  readingTime: 11,

  category: "termomodernizacja",
  tags: [
    "Czyste Powietrze",
    "Termomodernizacja",
    "Daikin",
    "Pompa ciepła powietrzna",
    "Komfort seniora",
  ],

  location: {
    city: "Mazowsze",
    region: "mazowieckie",
    countryCode: "PL",
  },

  heroImage: heroImg,
  heroImageAlt:
    "Kostka PRL z lat 70. po głębokiej termomodernizacji — realizacja Soltimus",

  building: {
    type: "Dom jednorodzinny",
    area_m2: 140,
    floors: 1,
    year: "lata 70. XX w.",
    occupants: 1,
    insulation: "Przed projektem: brak — ściana dwuwarstwowa bez warstwy izolacji",
    previousHeating: "Kocioł węglowy + grzejniki stalowe (wymagający codziennej obsługi)",
  },

  goals: [
    "Wyeliminować codzienną obsługę kotła węglowego — donoszenie opału, palenie, czyszczenie.",
    "Zapewnić stabilny, równomierny komfort cieplny w całym domu.",
    "Obniżyć koszt operacyjny ogrzewania w horyzoncie wieloletnim.",
    "Zwiększyć bezpieczeństwo eksploatacji — brak otwartego ognia, brak czadu, brak ryzyka pożaru sadzy.",
    "Zachować pełną niezależność życiową właściciela w jego własnym domu.",
  ],

  challenges: [
    {
      title: "Brak izolacji termicznej budynku",
      text: "Ściany dwuwarstwowe bez warstwy izolacji, strop nieocieplony, stolarka okienna częściowo wymieniona, częściowo oryginalna. Bez termomodernizacji pompa ciepła pracowałaby w warunkach, dla których nie została zaprojektowana — SCOP spadłby do nieakceptowalnego poziomu, a koszty operacyjne nie różniłyby się znacząco od węgla.",
    },
    {
      title: "Codzienna obsługa źródła ciepła stała się fizycznie zbyt trudna",
      text: "Właściciel — 80-letni mieszkaniec — codziennie nosił węgiel, palił w piecu, usuwał popiół. Po dekadach codziennej obsługi te czynności stały się obciążające. Cel inwestycji nie był „eko” — był praktyczny: bezobsługowe źródło ciepła.",
    },
    {
      title: "Stara instalacja c.o. dobrana pod wysokie parametry",
      text: "Grzejniki i instalacja były projektowane pod temperaturę zasilania 75–80 °C typową dla kotła węglowego. Pompa ciepła pracuje optymalnie w 45–55 °C. Wymagało to ponownego doboru wybranych grzejników, by zachować komfort przy niskotemperaturowej pracy źródła.",
    },
    {
      title: "Optymalizacja inwestycji pod możliwości właściciela",
      text: "Inwestycja na tę skalę musiała być wykonalna finansowo dla emeryta. Program „Czyste Powietrze” w wariancie najwyższego poziomu wsparcia pokrył 70% kosztów kwalifikowanych — co przesądziło o realnej możliwości realizacji projektu w jego pełnym zakresie.",
    },
  ],

  approach: [
    "Pierwszą decyzją było potraktowanie projektu jako kompleksowej termomodernizacji, a nie wymiany źródła ciepła. Sama wymiana pieca na pompę bez ocieplenia budynku to klasyczny błąd inwestycyjny — pompa pracuje wtedy poza punktem optymalnym, SCOP spada, a oszczędności nie pojawiają się w deklarowanej skali. Audyt energetyczny wykazał jednoznacznie: ocieplenie + pompa to jeden projekt, nie dwa.",
    "Drugą decyzją była głęboka termomodernizacja koperty: ocieplenie ścian zewnętrznych, ocieplenie stropu/poddasza, weryfikacja stolarki okiennej. Ten etap obniżył obliczeniowe zapotrzebowanie cieplne budynku do poziomu, w którym pompa ciepła Daikin pracuje w punkcie optymalnym przez większą część sezonu.",
    "Trzecią decyzją było dobranie pompy ciepła Daikin Altherma 3 dopasowanej do nowego, niższego zapotrzebowania budynku — nie do starego. To zapobiegło typowemu błędowi „przewymiarowania”, który prowadzi do cykli ON/OFF, hałasu i przedwczesnego zużycia sprężarki.",
    "Czwartą decyzją była modernizacja instalacji c.o.: wymiana wybranych grzejników na modele dobrane do niskotemperaturowej pracy (zasilanie 45–55 °C) oraz przegląd hydrauliki. Dzięki temu pompa pracuje w punkcie projektowym, a komfort cieplny jest równomierny w całym domu — bez stref zimnych typowych dla nieodpowiednio dobranych grzejników.",
    "Piątą decyzją była instalacja PV jako warstwa redukcji kosztu energii napędzającej pompę. Dla profilu emerytalnego (duża obecność w domu) autokonsumpcja jest naturalnie wysoka, co skraca okres zwrotu instalacji i redukuje stały koszt eksploatacji.",
    "Szóstą decyzją była kompletna dokumentacja pod „Czyste Powietrze” — audyt energetyczny, wniosek, rozliczenie, protokoły. Właściciel otrzymał 70% dofinansowania kosztów kwalifikowanych, bez konieczności samodzielnego przechodzenia przez procedury administracyjne.",
  ],

  system: [
    {
      title: "Termomodernizacja koperty budynku",
      items: [
        {
          label: "Ocieplenie ścian zewnętrznych",
          value: "System ETICS",
          note: "Grubość izolacji dobrana wg audytu energetycznego",
        },
        {
          label: "Ocieplenie stropu / poddasza",
          value: "Warstwa izolacji termicznej",
          note: "Eliminacja głównego mostka cieplnego",
        },
        {
          label: "Weryfikacja stolarki okiennej",
          value: "Audyt + wymiana wybranych okien",
        },
      ],
    },
    {
      title: "Źródło ciepła — pompa ciepła Daikin",
      items: [
        {
          label: "Jednostka",
          value: "Daikin Altherma 3",
          note: "Monoblok, R-32",
        },
        {
          label: "Moc dobrana",
          value: "Pod nowe, niższe zapotrzebowanie po termomodernizacji",
          note: "Bez przewymiarowania",
        },
        {
          label: "Punkt pracy projektowy",
          value: "T zasilania 45–55 °C",
          note: "Niskotemperaturowo · maks. SCOP",
        },
        {
          label: "CWU",
          value: "Zasobnik dedykowany",
          note: "Pełna automatyzacja",
        },
      ],
    },
    {
      title: "Modernizacja instalacji c.o.",
      items: [
        {
          label: "Wymiana grzejników",
          value: "Wybrane grzejniki dobrane pod niskotemperaturową pracę",
        },
        {
          label: "Przegląd hydrauliki",
          value: "Równoważenie hydrauliczne instalacji",
        },
        {
          label: "Automatyka",
          value: "Sterowanie krzywą grzewczą + harmonogram CWU",
        },
      ],
    },
    {
      title: "Fotowoltaika",
      items: [
        {
          label: "Instalacja PV",
          value: "Dach budynku",
          note: "Moc dobrana pod realny profil zużycia",
        },
        {
          label: "Cel",
          value: "Redukcja kosztu energii napędzającej pompę ciepła",
        },
        {
          label: "Autokonsumpcja",
          value: "Wysoka (profil emerytalny — duża obecność w domu)",
        },
      ],
    },
  ],

  metrics: [
    {
      label: "Redukcja kosztu operacyjnego",
      value: "≈ −60%",
      sub: "vs ogrzewanie węglem przed projektem",
    },
    {
      label: "Dofinansowanie netto",
      value: "70%",
      sub: "Program „Czyste Powietrze”",
    },
    {
      label: "Obsługa codzienna źródła ciepła",
      value: "0",
      sub: "Wcześniej: codziennie · ręcznie",
    },
    {
      label: "Bezpieczeństwo eksploatacji",
      value: "Pełne",
      sub: "Brak otwartego ognia, czadu, sadzy",
    },
  ],

  beforeAfter: [
    {
      metric: "Źródło ciepła",
      before: "Kocioł węglowy (obsługa codzienna)",
      after: "Pompa ciepła Daikin (praca bezobsługowa)",
      tone: "positive",
    },
    {
      metric: "Roczny koszt ogrzewania",
      before: "Wysoki — węgiel + serwis + transport opału",
      after: "≈ −60% (po termomodernizacji + PV)",
      delta: "≈ −60%",
      tone: "positive",
    },
    {
      metric: "Codzienna fizyczna obsługa źródła ciepła",
      before: "Tak — donoszenie, palenie, popiół",
      after: "Brak — system pracuje automatycznie",
      tone: "positive",
    },
    {
      metric: "Bezpieczeństwo eksploatacji",
      before: "Ryzyko czadu, pożaru sadzy, kontaktu z ogniem",
      after: "Brak otwartego procesu spalania",
      tone: "positive",
    },
    {
      metric: "Stabilność temperatury w pomieszczeniach",
      before: "Wahania zależne od cyklu palenia",
      after: "Stabilna · sterowana automatyką",
      tone: "positive",
    },
    {
      metric: "Bezpieczeństwo instalacji elektrycznej",
      before: "Stare zabezpieczenia, brak nowoczesnej ochrony",
      after: "Zmodernizowane zabezpieczenia + RCD",
      tone: "positive",
    },
  ],

  timeline: [
    {
      phase: "Audyt energetyczny i konsultacja z właścicielem",
      duration: "2 tygodnie",
      text: "Inwentaryzacja budynku, obliczenia OZC przed i po termomodernizacji, ustalenie zakresu prac dopasowanego do możliwości i potrzeb właściciela.",
    },
    {
      phase: "Dokumentacja „Czyste Powietrze”",
      duration: "Równolegle z audytem",
      text: "Przygotowanie wniosku, kosztorysów i dokumentacji wymaganej przez program. Wynik: 70% dofinansowania kosztów kwalifikowanych.",
    },
    {
      phase: "Termomodernizacja koperty",
      duration: "≈ 4 tygodnie",
      text: "Ocieplenie ścian zewnętrznych w systemie ETICS, ocieplenie stropu, weryfikacja i wymiana wybranych okien.",
    },
    {
      phase: "Modernizacja c.o. + montaż pompy ciepła",
      duration: "1 tydzień",
      text: "Wymiana wybranych grzejników pod niskotemperaturową pracę, montaż pompy Daikin Altherma 3, integracja CWU, próby szczelności.",
    },
    {
      phase: "Instalacja PV i uruchomienie",
      duration: "2 dni",
      text: "Montaż instalacji fotowoltaicznej, integracja z systemem, uruchomienie pompy ciepła, kalibracja krzywej grzewczej, instruktaż dla właściciela.",
    },
    {
      phase: "Pierwszy sezon — dostrojenie",
      duration: "Pierwszy pełny sezon grzewczy",
      text: "Monitoring pracy, drobne korekty parametrów, walidacja oszczędności względem prognoz audytu.",
    },
  ],

  engineerCommentary: [
    {
      authorId: "dzial-projektowy",
      asPullQuote: true,
      text: "Najważniejszą decyzją inżynierską nie była marka pompy, tylko kolejność prac. Pompa ciepła w nieocieplonym domu z lat 70. to projekt skazany na rozczarowanie. Dopiero po termomodernizacji koperty pompa pracuje w warunkach, dla których została zaprojektowana — i dopiero wtedy ma sens ekonomiczny.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Drugą decyzją było nie przewymiarować pompy. Po termomodernizacji zapotrzebowanie spadło na tyle, że typowy odruch „weźmy większą, dla bezpieczeństwa” oznaczałby cykle ON/OFF, hałas i krótszą żywotność sprężarki. Dobór mocy pod nowe, niższe zapotrzebowanie — nie pod stare.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Modernizacja grzejników pod niskotemperaturową pracę to etap, który najczęściej pomija się przy „szybkich” wymianach źródła. Bez tego pompa pracuje w trybie ratunkowym, podgrzewając wodę do parametrów kotła węglowego — i traci większość deklarowanego SCOP-u.",
    },
  ],

  lessons: [
    "Pompa ciepła w nieocieplonym budynku to zwykle błąd inwestycyjny. Głęboka termomodernizacja koperty jest warunkiem koniecznym, nie opcjonalnym.",
    "Audyt energetyczny przed projektem wyznacza granicę między „domem dla pompy ciepła” a „domem, który najpierw potrzebuje izolacji”.",
    "Dobór mocy pompy musi być oparty o zapotrzebowanie po termomodernizacji, nie przed nią. Inaczej cały projekt kończy się przewymiarowaniem.",
    "Grzejniki dobrane pod kocioł węglowy (75–80 °C) wymagają weryfikacji przy przejściu na pompę (45–55 °C). Wymiana wybranych grzejników bywa tańsza niż utrata SCOP-u przez całą żywotność systemu.",
    "„Czyste Powietrze” w wariancie najwyższego wsparcia (do 70% kosztów kwalifikowanych) przesądza o wykonalności kompleksowych modernizacji u właścicieli o ograniczonych możliwościach finansowych.",
    "Komfort 80-letniego właściciela mierzy się nie tylko temperaturą w pokoju, ale liczbą codziennych czynności, których już nie musi wykonywać.",
  ],

  testimonial: {
    quote:
      "Najbardziej cieszy mnie cisza i to, że nie muszę już codziennie chodzić do kotłowni. W domu jest równo ciepło, rachunki są niższe niż za węgiel, a ja po prostu mieszkam — jak człowiek, nie jak palacz.",
    author: "Pan J.",
    role: "Właściciel domu",
  },

  faq: [
    {
      q: "Czy pompa ciepła ma sens w starym, nieocieplonym domu?",
      a: "Sama wymiana źródła — nie. Pompa ciepła pracuje optymalnie w domach o niskim zapotrzebowaniu cieplnym i z instalacją niskotemperaturową. W starym domu trzeba najpierw przeprowadzić termomodernizację (ocieplenie ścian, stropu, weryfikacja stolarki), a dopiero potem dobrać pompę. Inaczej SCOP spada, a koszty operacyjne nie różnią się znacząco od węgla.",
    },
    {
      q: "Co dokładnie obejmuje „głęboka termomodernizacja”?",
      a: "Najczęściej: ocieplenie ścian zewnętrznych w systemie ETICS, ocieplenie stropu lub poddasza, weryfikację i częściową wymianę stolarki okiennej, modernizację instalacji c.o. (w tym wybranych grzejników pod niskotemperaturową pracę) oraz wymianę źródła ciepła. Zakres ustala audyt energetyczny dla konkretnego budynku.",
    },
    {
      q: "Czy „Czyste Powietrze” naprawdę pokrywa 70% kosztów?",
      a: "Tak — w wariancie najwyższego poziomu wsparcia (kryterium dochodowe). Program pokrywa do 70% kosztów kwalifikowanych modernizacji, w tym ocieplenia, źródła ciepła, instalacji wewnętrznej c.o. i CWU oraz dokumentacji. Pełną kwotę i warunki ustala się indywidualnie na podstawie sytuacji właściciela.",
    },
    {
      q: "Czy trzeba wymieniać wszystkie grzejniki?",
      a: "Nie zawsze wszystkie — ale prawie zawsze część. Grzejniki dobrane pod kocioł węglowy są przewymiarowane pod parametry niskotemperaturowe pompy ciepła w sposób niejednorodny — niektóre wystarczą, niektóre staną się niewydolne. Audyt c.o. wskazuje konkretne pomieszczenia wymagające wymiany.",
    },
    {
      q: "Czy pompa ciepła wymaga obsługi przez właściciela?",
      a: "W codziennej eksploatacji — nie. Po uruchomieniu i kalibracji system pracuje automatycznie zgodnie z krzywą grzewczą i harmonogramem CWU. Serwis to standardowo jeden przegląd rocznie. Dla starszego właściciela to ogromna różnica w stosunku do kotła na paliwo stałe.",
    },
    {
      q: "Kiedy głęboka termomodernizacja naprawdę się opłaca?",
      a: "Praktycznie zawsze, gdy: dom jest słabo ocieplony, źródło ciepła jest stare (kocioł węglowy, gazowy starszej generacji, olejowy), koszty operacyjne są wysokie, a właściciel planuje mieszkać w domu w horyzoncie 10+ lat. Dodatkowy katalizator: dostępność programów dofinansowania („Czyste Powietrze”, „Mój Prąd”, programy gminne).",
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
      "Dom z lat 70. — głęboka termomodernizacja + pompa ciepła Daikin, „Czyste Powietrze” 70% | Soltimus",
    description:
      "Case study Soltimus: kompleksowa modernizacja domu z lat 70. dla 80-letniego właściciela. Ocieplenie, pompa ciepła Daikin, fotowoltaika, modernizacja c.o. Koszty operacyjne ≈ −60%, dofinansowanie 70% z „Czystego Powietrza”.",
  },
};
