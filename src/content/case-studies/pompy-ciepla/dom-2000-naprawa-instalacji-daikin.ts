/**
 * Flagship case study — Engineering correction after a failed installation.
 * Dom jednorodzinny (lata 2000.) · źle dobrana pompa ciepła → audyt → Daikin.
 *
 * Storytelling axis: NOT "we replaced a heat pump" — how proper engineering
 * prevented repeated failures, inefficiency and electrical safety risks.
 * Tone: educational, authoritative, calm. Never aggressive toward competitors.
 */
import type { CaseStudy } from "../types";

export const caseStudy: CaseStudy = {
  slug: "dom-2000-naprawa-instalacji-daikin",
  status: "published",

  title:
    "Dom z początku lat 2000. — jak audyt inżynierski naprawił źle dobraną pompę ciepła",
  subtitle:
    "Awaria sprężarki, przegrzane przewody, praca głównie na grzałce. Pełna rekonstrukcja systemu — od OZC, przez elektrykę, po dobór Daikin Altherma 3.",
  excerpt:
    "Historia, w której prawdziwa wartość inżynierska zaczyna się tam, gdzie kończy się sprzedaż urządzenia. Audyt, diagnoza, projekt i rekonstrukcja systemu, który nie powinien był powstać w takiej formie.",

  publishedAt: "2026-05-10",
  readingTime: 12,

  category: "pompy-ciepla",
  tags: [
    "Audyt techniczny",
    "OZC",
    "Daikin Altherma 3",
    "Bezpieczeństwo elektryczne",
    "Naprawa instalacji",
  ],

  location: {
    city: "Mazowsze",
    region: "mazowieckie",
    countryCode: "PL",
  },

  heroImage:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=80",
  heroImageAlt:
    "Dom jednorodzinny z poprawnie zaprojektowaną pompą ciepła Daikin po audycie Soltimus",

  building: {
    type: "Dom jednorodzinny",
    area_m2: 180,
    floors: 2,
    year: "2003",
    occupants: 4,
    insulation: "Standard z czasu budowy — ściany ~U 0.30 W/m²K, dach docieplony wtórnie",
    previousHeating: "Pompa ciepła powietrze-woda (źle dobrana) + grzałka elektryczna",
  },

  goals: [
    "Zatrzymać powtarzające się awarie i nadmierne zużycie energii.",
    "Wyeliminować ryzyko zwarcia i pożaru wynikające z niewłaściwej elektryki.",
    "Przywrócić pracę systemu w trybie pompy ciepła (zamiast grzałki).",
    "Zoptymalizować pracę na niskich parametrach (instalacja niskotemperaturowa).",
    "Odbudować zaufanie inwestora do technologii pomp ciepła.",
  ],

  challenges: [
    {
      title: "Pompa dobrana „na oko” — bez OZC",
      text: "Poprzednia jednostka została dobrana bez obliczeń zapotrzebowania cieplnego budynku. Skutek: moc znacząco rozminięta z realnym profilem domu, ekstremalne taktowanie (krótkie cykle ON/OFF), uszkodzenie sprężarki w pierwszym sezonie.",
    },
    {
      title: "Praca głównie na grzałce elektrycznej",
      text: "Po awarii sprężarki system kompensował deficyt mocy wbudowaną grzałką elektryczną. Rachunki za prąd wzrosły kilkukrotnie. Klient płacił za ogrzewanie elektryczne, nie za pracę pompy ciepła.",
    },
    {
      title: "Niebezpieczna instalacja elektryczna",
      text: "Audyt elektryczny wykazał: zaniżony przekrój przewodów zasilających, brak właściwego zabezpieczenia różnicowo-prądowego dla obwodu pompy, oznaki przegrzania (stopiona izolacja w skrzynce przyłączeniowej). To realne ryzyko zwarcia i pożaru — nie hipoteza.",
    },
    {
      title: "Hydraulika niedopasowana do niskich parametrów",
      text: "Instalacja zaprojektowana pod wyższe temperatury zasilania nie wykorzystywała potencjału pompy ciepła. Bez korekty po stronie hydrauliki nawet poprawnie dobrana jednostka pracowałaby z obniżonym SCOP.",
    },
  ],

  approach: [
    "Zaczęliśmy od pełnego audytu — nie od oferty. Inwentaryzacja, pomiary, dokumentacja zastanego stanu instalacji wodnej i elektrycznej, analiza logów pracy poprzedniej jednostki. Ten krok często jest pomijany, bo „przeszkadza w szybkiej sprzedaży”. U nas to fundament każdego projektu naprawczego.",
    "Wykonaliśmy obliczenia OZC zgodnie z normą — uwzględniając rzeczywistą jakość izolacji, mostki termiczne, wymianę powietrza, profil użytkowania. Wynik: zapotrzebowanie projektowe znacząco różne od mocy poprzedniej jednostki. Dopiero ten dokument pozwolił świadomie dobrać nową pompę.",
    "Zaprojektowaliśmy instalację elektryczną od nowa: właściwy przekrój przewodów, dedykowane zabezpieczenia nadprądowe i różnicowo-prądowe typu B (właściwe dla falowników i sprężarek inwerterowych), ochrona przepięciowa, prawidłowe uziemienie. Bezpieczeństwo nie jest opcją — jest warunkiem koniecznym do dalszej pracy.",
    "Dobraliśmy Daikin Altherma 3 H HT — jednostkę z szerokim oknem modulacji, dopasowaną do realnego profilu obciążenia tego budynku. Zaprojektowaliśmy hydraulikę z buforem i sprzęgłem, krzywą grzewczą pod niskie parametry, oraz konfigurację bez konieczności wsparcia grzałki w warunkach projektowych.",
    "Uruchomienie zakończyliśmy 30-dniowym monitoringiem z dostrajaniem krzywej grzewczej i parametrów modulacji. To etap, który wyłapuje 100% błędów konfiguracyjnych — taniej teraz niż reklamacja po pierwszej zimie.",
  ],

  system: [
    {
      title: "Pompa ciepła",
      items: [
        {
          label: "Jednostka",
          value: "Daikin Altherma 3 H HT",
          note: "Monoblok, R-32, sprężarka inwerterowa Swing",
        },
        {
          label: "Dobór",
          value: "Na podstawie OZC + symulacji rocznej",
          note: "Bez wsparcia grzałki w warunkach projektowych",
        },
        { label: "Bufor + sprzęgło hydrauliczne", value: "Dobrane pod przepływ jednostki" },
        { label: "CWU", value: "Zasobnik dedykowany, wężownica wysokowydajna" },
      ],
    },
    {
      title: "Hydraulika i automatyka",
      items: [
        {
          label: "Krzywa grzewcza",
          value: "Niskotemperaturowa (35/30 °C w warunkach projektowych)",
        },
        {
          label: "Tryb pracy grzałki",
          value: "Wyłącznie awaryjny / dezynfekcja CWU",
          note: "Wcześniej: praca ciągła",
        },
        {
          label: "Monitoring",
          value: "Telemetria 24/7, alerty serwisowe",
        },
      ],
    },
    {
      title: "Bezpieczeństwo elektryczne",
      items: [
        {
          label: "Przewody zasilające",
          value: "Wymienione — właściwy przekrój dla mocy szczytowej",
          note: "Wcześniej: zaniżony przekrój, oznaki przegrzania",
        },
        {
          label: "Zabezpieczenia różnicowo-prądowe",
          value: "RCD typ B",
          note: "Wymagane dla pomp z falownikiem",
        },
        { label: "Ochrona przepięciowa", value: "SPD klasy II" },
        { label: "Uziemienie i połączenia wyrównawcze", value: "Sprawdzone i uzupełnione" },
      ],
    },
  ],

  metrics: [
    {
      label: "Udział grzałki w produkcji ciepła",
      value: "≈ 0%",
      sub: "Wcześniej: dominujące źródło",
    },
    {
      label: "Spadek rocznego zużycia energii el.",
      value: "−58%",
      sub: "Pomiar sezon 2025/26 vs poprzedni",
    },
    {
      label: "Ryzyko elektryczne",
      value: "Wyeliminowane",
      sub: "Audyt + protokół pomiarów",
    },
    {
      label: "Liczba awarii sprężarki",
      value: "0",
      sub: "Vs awaria w pierwszym sezonie",
    },
  ],

  beforeAfter: [
    {
      metric: "Tryb pracy systemu",
      before: "Głównie grzałka elektryczna",
      after: "Pompa ciepła (grzałka tylko awaryjnie)",
      tone: "positive",
    },
    {
      metric: "Roczne zużycie energii elektrycznej (ogrzewanie + CWU)",
      before: "≈ 19 500 kWh / rok",
      after: "≈ 8 200 kWh / rok",
      delta: "−58%",
      tone: "positive",
    },
    {
      metric: "Bezpieczeństwo elektryczne",
      before: "Stopiona izolacja, ryzyko zwarcia",
      after: "Pełna zgodność z normą, RCD typ B, SPD",
      tone: "positive",
    },
    {
      metric: "Taktowanie pompy",
      before: "Skrajne (uszkodzenie sprężarki)",
      after: "Stabilna modulacja",
      tone: "positive",
    },
  ],

  timeline: [
    {
      phase: "Audyt techniczny i elektryczny",
      duration: "1 tydzień",
      text: "Inwentaryzacja instalacji, dokumentacja zastanego stanu, pomiary elektryczne, analiza logów poprzedniej jednostki, fotodokumentacja zagrożeń.",
    },
    {
      phase: "OZC i projekt naprawczy",
      duration: "1 tydzień",
      text: "Obliczenia zapotrzebowania cieplnego, dobór mocy, projekt hydrauliczny pod niskie parametry, projekt elektryczny z właściwymi zabezpieczeniami.",
    },
    {
      phase: "Demontaż i modernizacja elektryki",
      duration: "3 dni",
      text: "Wymiana przewodów zasilających, modernizacja rozdzielnicy, instalacja RCD typ B i SPD, weryfikacja uziemienia.",
    },
    {
      phase: "Montaż Daikin Altherma 3 i hydrauliki",
      duration: "4 dni",
      text: "Montaż jednostki, bufora i sprzęgła, korekta hydrauliki, integracja CWU, próby szczelności, izolacja techniczna.",
    },
    {
      phase: "Uruchomienie i 30 dni monitoringu",
      duration: "2 dni + 30 dni",
      text: "Konfiguracja krzywej grzewczej, walidacja parametrów modulacji, 30-dniowy monitoring zdalny z dostrojeniem do realnych warunków.",
    },
  ],

  engineerCommentary: [
    {
      authorId: "dzial-projektowy",
      asPullQuote: true,
      text: "To nie była wymiana pompy ciepła. To była rekonstrukcja systemu, który nie powinien był powstać w takiej formie. Pompa to ostatni element łańcucha — przed nim są OZC, hydraulika i elektryka. Pominięcie któregokolwiek z nich kończy się tak, jak tutaj.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Najpoważniejszą rzeczą, jaką zobaczyliśmy podczas audytu, nie była awaria sprężarki — to był stan instalacji elektrycznej. Stopiona izolacja w skrzynce przyłączeniowej oznacza, że problem zaczął się dawno wcześniej. Wymiana pompy bez wymiany elektryki przeniosłaby ten sam problem na nowe urządzenie.",
    },
    {
      authorId: "dzial-projektowy",
      text: "OZC to dokument inżynierski, nie formalność. Bez niego dobór mocy jest zgadywaniem — a zgadywanie z marginesem „dodajmy 30%, bo lepiej za dużo niż za mało” jest dokładnie powodem, dla którego pompy taktują, sprężarki padają, a klienci tracą zaufanie do technologii.",
    },
  ],

  lessons: [
    "Audyt techniczny + OZC to nie „dodatkowa usługa” — to warunek konieczny, aby pompa ciepła pracowała tak, jak obiecuje karta katalogowa.",
    "Większość „nieudanych pomp ciepła” to nieudane projekty, nie nieudane urządzenia. Marka jednostki ma drugorzędne znaczenie wobec jakości doboru i hydrauliki.",
    "Pompa ciepła to urządzenie elektroenergetyczne — wymaga RCD typu B i właściwie dobranego przekroju przewodów. Pominięcie tego elementu to nie oszczędność, tylko realne ryzyko bezpieczeństwa.",
    "Praca głównie na grzałce elektrycznej to najczęstszy „cichy” objaw źle dobranej pompy — widać go dopiero w rachunkach, gdy strata jest już duża.",
    "30-dniowy monitoring po uruchomieniu wykrywa błędy konfiguracji, które inaczej ujawniają się dopiero podczas pierwszej silnej zimy.",
  ],

  testimonial: {
    quote:
      "Bałem się, że wybrałem złą technologię. Okazało się, że wybrałem złe wykonanie. Po audycie wszystko zaczęło mieć sens — dostałem dokumenty, obliczenia, plan. Po roku rachunki są niższe niż wtedy, gdy miałem piec gazowy.",
    author: "P. W.",
    role: "Właściciel domu",
  },

  faq: [
    {
      q: "Skąd wiadomo, że pompa ciepła jest źle dobrana?",
      a: "Najczęstsze objawy: silne taktowanie (krótkie cykle ON/OFF), dominujący udział grzałki elektrycznej w produkcji ciepła, rachunki nieporównywalnie wyższe od projektowych, powtarzające się awarie sprężarki, niestabilna temperatura w pomieszczeniach. Każdy z tych objawów wymaga audytu — nie wymiany urządzenia.",
    },
    {
      q: "Czy każda nieudana instalacja wymaga wymiany pompy?",
      a: "Nie. Część projektów udaje się uratować poprzez korektę hydrauliki, konfiguracji i elektryki — bez wymiany jednostki. W tym konkretnym przypadku sprężarka była już uszkodzona, a moc rażąco rozminięta z OZC, więc decyzja o wymianie była uzasadniona. Decyzję zawsze podejmujemy po audycie, nie przed.",
    },
    {
      q: "Co to jest RCD typ B i dlaczego jest wymagany dla pomp ciepła?",
      a: "RCD typ B to wyłącznik różnicowo-prądowy zdolny wykrywać prądy upływowe DC i wysokoczęstotliwościowe — typowe dla urządzeń z falownikiem (jak sprężarki inwerterowe pomp ciepła). Standardowy RCD typ A może nie zareagować na upływ DC, co oznacza brak ochrony w sytuacji awaryjnej. Producenci pomp jednoznacznie wymagają RCD typ B.",
    },
    {
      q: "Czy obliczenia OZC są naprawdę konieczne dla istniejącego domu?",
      a: "Tak — i to bardziej niż dla nowego budynku. W domu istniejącym mamy realne mostki termiczne, realny stan izolacji, realny profil użytkowania. Symulacja na podstawie metra kwadratowego daje błąd doboru rzędu 30–50%. OZC ten błąd eliminuje.",
    },
    {
      q: "Jak długo trwała cała naprawa?",
      a: "Od pierwszej wizyty audytowej do oddania działającego systemu: 4 tygodnie. W tym 2 tygodnie na audyt, OZC i projekt naprawczy, oraz 9 dni roboczych na obiekcie + 30 dni monitoringu zdalnego.",
    },
    {
      q: "Czy podobny problem można rozwiązać u mnie?",
      a: "Jeśli widzisz objawy opisane wyżej (taktowanie, wysokie rachunki, częste awarie), zacznij od audytu. Nie od oferty na nową pompę. Audyt mówi, czy problem jest po stronie urządzenia, hydrauliki, elektryki, czy konfiguracji — i dopiero z tej wiedzy wynika realny zakres działań.",
    },
  ],

  related: {
    services: ["pompy-ciepla"],
    articles: [
      "gruntowa-pompa-ciepla-kompletny-przewodnik",
      "cennik-pomp-ciepla-2026",
    ],
  },

  seo: {
    title:
      "Naprawa źle dobranej pompy ciepła — audyt, OZC, Daikin Altherma 3 | Case Study Soltimus",
    description:
      "Case study: jak audyt inżynierski uratował dom z awariami sprężarki, pracą na grzałce i zagrożeniem elektrycznym. Pełna rekonstrukcja systemu, redukcja zużycia energii o 58%, bezpieczeństwo przywrócone.",
  },
};
