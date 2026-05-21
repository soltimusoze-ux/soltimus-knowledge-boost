/**
 * Flagship service page — Pompy ciepła.
 * Reference blueprint for all future Soltimus service pages.
 */
import type { ServicePage } from "./types";

export const service: ServicePage = {
  slug: "pompy-ciepla",
  status: "published",
  navLabel: "Pompy ciepła",

  hero: {
    eyebrow: "Pompy ciepła · Soltimus Engineering",
    title:
      "Pompa ciepła zaprojektowana, nie dobrana z katalogu.",
    subtitle:
      "Audyt, OZC, hydraulika, elektryka, uruchomienie i monitoring — jeden inżynierski standard zamiast pięciu osobnych decyzji.",
    intro: [
      "Większość problemów z pompami ciepła w Polsce — taktowanie, wysokie rachunki, hałas, awarie sprężarki — to nie problemy urządzeń. To skutki braku obliczeń i braku projektu. U nas projekt zaczyna się od audytu i kończy 30-dniowym monitoringiem po uruchomieniu.",
      "Pracujemy z urządzeniami Daikin Altherma 3. Wybór technologiczny jest świadomy: szerokie okno modulacji, niskie poziomy hałasu, dojrzała platforma serwisowa. Pompa to ostatni element łańcucha — przed nim są OZC, hydraulika i elektryka.",
    ],
    ctaPrimary: { label: "Umów konsultację inżynierską", to: "/kontakt" },
    ctaSecondary: { label: "Sprawdź kalkulator mocy", to: "/kalkulator-pompy-ciepla" },
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=80",
    heroImageAlt:
      "Nowoczesna pompa ciepła Daikin Altherma 3 zaprojektowana przez Soltimus",
  },

  overview: {
    paragraphs: [
      "Pompa ciepła to nie urządzenie — to system. Sam monoblok stanowi mniej niż 40% jakości pracy całości. Resztę robi dobór mocy na podstawie OZC, hydraulika niskotemperaturowa, właściwe zabezpieczenia elektryczne (RCD typ B), konfiguracja krzywej grzewczej i — najczęściej pomijane — monitoring po uruchomieniu.",
      "Nasza praca nie zaczyna się od oferty na konkretne urządzenie. Zaczyna się od audytu budynku i obliczeń. Dopiero z tej wiedzy wynika dobór mocy, typ (powietrze–woda lub grunt–woda), konfiguracja CWU i hydraulika.",
    ],
    points: [
      { label: "Krok 01", value: "Audyt i pomiary" },
      { label: "Krok 02", value: "OZC + projekt" },
      { label: "Krok 03", value: "Montaż i uruchomienie" },
      { label: "Krok 04", value: "30 dni monitoringu" },
    ],
  },

  commonProblems: [
    {
      title: "Pompa taktuje — krótkie cykle ON/OFF",
      text: "Najczęściej skutek przewymiarowania mocy lub błędnej hydrauliki (za mały bufor, brak sprzęgła, niewłaściwy przepływ). Każde taktowanie obniża SCOP i przybliża awarię sprężarki.",
    },
    {
      title: "Rachunki znacząco wyższe od projektowych",
      text: "Najczęstsza przyczyna: system pracuje głównie na wbudowanej grzałce elektrycznej. To „cichy” objaw — widać go dopiero w rocznym zestawieniu, gdy strata jest już istotna.",
    },
    {
      title: "Hałas jednostki zewnętrznej",
      text: "90% reklamacji „hałasujących pomp” to skutek złego umiejscowienia, nie złego urządzenia. Akustyka to projekt — odbicia od ścian, kierunek wydmuchu, zagłębienie w niszy.",
    },
    {
      title: "Awarie sprężarki w pierwszym sezonie",
      text: "Sprężarka inwerterowa znosi dużo, ale nie znosi ciągłego taktowania ani braku właściwej ochrony elektrycznej (RCD typu B). Awaria to zwykle ostatni objaw długiego procesu.",
    },
    {
      title: "Niespójność z resztą instalacji",
      text: "Pompa dobrana w oderwaniu od izolacji, instalacji wodnej i profilu zużycia CWU pracuje obok budynku, nie z nim. Stąd różnice 30–50% w realnym SCOP względem deklaracji katalogowej.",
    },
  ],

  engineeringApproach: [
    {
      step: "01",
      title: "Audyt zamiast oferty na sprzęt",
      text: "Inwentaryzacja, pomiary, weryfikacja stanu instalacji wodnej i elektrycznej. Dopiero z tej wiedzy wynika realny zakres projektu — czasem to nowa pompa, czasem korekta hydrauliki i konfiguracji.",
    },
    {
      step: "02",
      title: "OZC zgodnie z normą, nie z metra²",
      text: "Obliczenie zapotrzebowania cieplnego budynku z uwzględnieniem realnej izolacji, mostków termicznych, wymiany powietrza i profilu użytkowania. Symulacja po metrze kwadratowym daje błąd 30–50%.",
    },
    {
      step: "03",
      title: "Dobór mocy w realnym oknie pracy",
      text: "Wybieramy moc tak, aby pompa pracowała w optymalnym oknie modulacji przez większość sezonu — bez wpadania w cykle ON/OFF i bez wsparcia grzałki w warunkach projektowych.",
    },
    {
      step: "04",
      title: "Hydraulika i elektryka jako część projektu",
      text: "Bufor i sprzęgło hydrauliczne dobrane pod realny przepływ pompy. Przewody zasilające we właściwym przekroju, RCD typu B, SPD klasy II, uziemienie zweryfikowane.",
    },
    {
      step: "05",
      title: "Uruchomienie + 30 dni monitoringu",
      text: "Kalibracja krzywej grzewczej i parametrów modulacji w warunkach rzeczywistych. Monitoring wyłapuje 100% błędów konfiguracji — taniej teraz niż reklamacja po pierwszej zimie.",
    },
  ],

  processTimeline: [
    {
      phase: "Audyt i pomiary",
      duration: "1 tydzień",
      text: "Wizyta na obiekcie, dokumentacja zastanego stanu, pomiary elektryczne, weryfikacja instalacji wodnej.",
    },
    {
      phase: "OZC i projekt",
      duration: "1–2 tygodnie",
      text: "Obliczenia, dobór mocy, projekt hydrauliczny, projekt elektryczny, dobór CWU, wycena z rozbiciem na komponenty.",
    },
    {
      phase: "Przygotowanie i logistyka",
      duration: "2–4 tygodnie",
      text: "Zamówienie urządzeń, koordynacja terminów, przygotowanie miejsca montażu, ewentualna prefabrykacja.",
    },
    {
      phase: "Montaż na obiekcie",
      duration: "3–7 dni",
      text: "Posadowienie jednostek, hydraulika, elektryka, integracja z CWU, próby szczelności, izolacja techniczna.",
    },
    {
      phase: "Uruchomienie i 30 dni monitoringu",
      duration: "2 dni + 30 dni",
      text: "Pierwsze uruchomienie, konfiguracja, walidacja akustyczna, monitoring zdalny z dostrojeniem parametrów.",
    },
  ],

  technicalAdvantages: [
    {
      icon: "Gauge",
      title: "Szerokie okno modulacji",
      text: "Dobór Daikin Altherma 3 zapewnia płynną pracę od ~25% do 100% mocy — bez cykli ON/OFF w sezonach przejściowych, gdzie spędzamy 60% czasu pracy.",
    },
    {
      icon: "Volume2",
      title: "Akustyka jako projekt",
      text: "Walidacja poziomu hałasu w warunkach nocnych. W praktyce osiągamy 30–35 dB(A) w odległości 5 m — poziom porównywalny z szeptem.",
    },
    {
      icon: "ShieldCheck",
      title: "Bezpieczeństwo elektryczne",
      text: "RCD typ B (wymagany dla pomp z falownikiem), SPD klasy II, właściwy przekrój przewodów. Bez kompromisów, bez „oszczędności”.",
    },
    {
      icon: "LineChart",
      title: "Monitoring 24/7",
      text: "Telemetria po uruchomieniu — wykrywa anomalie zanim staną się awariami. Klient i nasz serwis widzą te same dane.",
    },
    {
      icon: "Wrench",
      title: "Własny zespół serwisowy",
      text: "Reakcja serwisu 24h, magazyn części zamiennych, ten sam zespół, który projektował i uruchomił system.",
    },
    {
      icon: "Layers",
      title: "Spójność z PV i magazynem energii",
      text: "Projekt pompy uwzględnia profil produkcji PV i pojemność BESS — to dla pompy ciepła oznacza realne obniżenie kosztu pracy o 20–40%.",
    },
  ],

  mistakesToAvoid: [
    {
      title: "Dobór mocy „na oko” lub po metrze kwadratowym",
      text: "Bez OZC dobór jest zgadywaniem. Margines „dodajmy 30% bo lepiej za dużo niż za mało” to dokładnie powód, dla którego pompy taktują i sprężarki padają.",
    },
    {
      title: "Pomijanie elektryki w wycenie",
      text: "Pompa to urządzenie elektroenergetyczne. RCD typ B i właściwy przekrój przewodów nie są opcją — to warunek bezpiecznej pracy. Każda „oszczędność” tutaj to realne ryzyko.",
    },
    {
      title: "Brak bufora lub niewłaściwy bufor",
      text: "Pompa bez właściwie dobranego bufora i sprzęgła hydraulicznego oscyluje między cyklami. Tracimy SCOP, generujemy hałas, skracamy żywotność.",
    },
    {
      title: "Wybór najtańszej oferty bez projektu",
      text: "Oferta bez OZC, bez schematu hydraulicznego i bez projektu elektrycznego to nie oferta — to deklaracja ceny urządzenia. Realny koszt poznasz dopiero przy pierwszych korektach.",
    },
    {
      title: "Brak monitoringu po uruchomieniu",
      text: "Bez monitoringu pierwsza zima jest jednoczesnym testem akceptacyjnym i reklamacyjnym. 30-dniowy monitoring eliminuje ten problem.",
    },
  ],

  outcomes: [
    { label: "Realny SCOP", value: "4.2–4.8", sub: "Pomiar sezon roczny" },
    { label: "Udział grzałki", value: "≈ 0%", sub: "Poza dezynfekcją CWU" },
    { label: "Hałas zewn.", value: "30–35 dB(A)", sub: "Pomiar nocny, 5 m" },
    { label: "Czas montażu", value: "3–7 dni", sub: "Na obiekcie" },
  ],

  comparison: {
    intro:
      "Tabela poniżej porównuje typowy standard branżowy z procesem Soltimus. To nie jest porównanie z konkretną firmą — to porównanie z najczęściej spotykanym sposobem realizacji.",
    rows: [
      {
        metric: "Dobór mocy",
        typical: "Szacunek po metrze², często z marginesem +30%",
        ours: "OZC zgodnie z normą + symulacja roczna",
      },
      {
        metric: "Hydraulika",
        typical: "Bufor „standardowy”, sprzęgło opcjonalnie",
        ours: "Bufor i sprzęgło dobrane pod realny przepływ",
      },
      {
        metric: "Elektryka",
        typical: "RCD typ A, przekrój „jak wyjdzie”",
        ours: "RCD typ B, SPD II, weryfikacja uziemienia",
      },
      {
        metric: "Uruchomienie",
        typical: "Konfiguracja domyślna, koniec usługi",
        ours: "Kalibracja + 30 dni monitoringu z dostrojeniem",
      },
      {
        metric: "Serwis",
        typical: "Call center, podwykonawcy",
        ours: "Ten sam zespół, który projektował",
      },
      {
        metric: "Dokumentacja",
        typical: "Faktura + karta gwarancyjna",
        ours: "Projekt + OZC + protokoły + raport monitoringu",
      },
    ],
  },

  faq: [
    {
      q: "Czy pompa ciepła sprawdzi się w starym domu?",
      a: "Tak — pod warunkiem audytu i OZC. W domach z lat 90. i wcześniejszych często wymagana jest częściowa korekta instalacji grzewczej (powiększenie powierzchni grzejników lub uzupełnienie ogrzewania podłogowego), aby pompa mogła pracować na niskich parametrach. Decyzję podejmujemy po audycie — nigdy przed.",
    },
    {
      q: "Powietrzna czy gruntowa pompa ciepła?",
      a: "Większość projektów (≈85%) zamykamy z powodzeniem na pompie powietrznej Daikin Altherma 3. Gruntowa ma sens przy bardzo dużych mocach, specyficznych warunkach gruntowych lub gdy estetycznie / akustycznie nie ma miejsca na jednostkę zewnętrzną. Decyzję podejmujemy po OZC.",
    },
    {
      q: "Jak długo trwa cały proces — od kontaktu do działającej pompy?",
      a: "Średnio 6–10 tygodni. Audyt i OZC: 2 tygodnie. Logistyka urządzeń: 2–4 tygodnie. Montaż: 3–7 dni. Uruchomienie + 30 dni monitoringu. Dokładny harmonogram ustalamy po audycie.",
    },
    {
      q: "Ile realnie kosztuje pompa ciepła z projektem?",
      a: "Zakres typowy dla domu jednorodzinnego (150–250 m²) to 60–110 tys. zł brutto z pełnym projektem, montażem, uruchomieniem i monitoringiem. Cena finalna zależy od mocy, typu, zakresu modernizacji hydrauliki i elektryki. Szczegółowy cennik publikujemy w przewodniku.",
    },
    {
      q: "Co odróżnia Daikin Altherma 3 od tańszych pomp?",
      a: "Szerokie okno modulacji (płynna praca od ~25% mocy), niskie poziomy hałasu, dojrzała platforma serwisowa, kompatybilność z polskim ekosystemem instalatorów. To nie jest najtańsza pompa — jest natomiast jedną z najbardziej przewidywalnych w eksploatacji.",
    },
    {
      q: "Czy montujecie pompy zakupione gdzie indziej?",
      a: "Nie. Odpowiadamy za cały system — dobór, projekt, montaż, uruchomienie, serwis. Bez kontroli nad doborem mocy i kompatybilnością komponentów nie możemy zagwarantować rezultatu. To wybór etyczny, nie cenowy.",
    },
  ],

  consultationFlow: [
    {
      step: "01",
      title: "Pierwsza rozmowa (15 min)",
      text: "Telefonicznie lub e-mailowo — krótki wywiad: typ budynku, obecne ogrzewanie, oczekiwania. Bez wyceny, bez presji.",
    },
    {
      step: "02",
      title: "Audyt na obiekcie",
      text: "Wizyta inżyniera, dokumentacja, pomiary. Z tego powstaje OZC i rekomendacja zakresu.",
    },
    {
      step: "03",
      title: "Projekt + wycena",
      text: "Dokument z OZC, doborem mocy, schematem hydraulicznym i elektrycznym oraz transparentnym rozbiciem kosztów.",
    },
    {
      step: "04",
      title: "Decyzja po Twojej stronie",
      text: "Nie sprzedajemy w trakcie audytu. Otrzymujesz dokumenty — decyzję podejmujesz spokojnie.",
    },
  ],

  cta: {
    eyebrow: "Następny krok",
    title: "Porozmawiajmy o Twoim projekcie pompy ciepła.",
    lead: "Bezpłatna konsultacja z inżynierem. Bez presji sprzedażowej, bez gotowej oferty „na już”. Najpierw rozumiemy budynek — potem proponujemy rozwiązanie.",
  },

  related: {
    caseStudies: [
      "konstancin-rezydencja-350m2",
      "dom-2000-naprawa-instalacji-daikin",
    ],
    articles: [
      "gruntowa-pompa-ciepla-kompletny-przewodnik",
      "cennik-pomp-ciepla-2026",
      "zbiorniki-cwu-do-pompy-ciepla",
    ],
  },

  serviceSchema: {
    name: "Projekt i montaż pomp ciepła Daikin Altherma 3 — Soltimus",
    description:
      "Pełny proces inżynierski: audyt, OZC, dobór mocy, hydraulika niskotemperaturowa, elektryka (RCD typ B), montaż, uruchomienie i 30 dni monitoringu.",
    serviceType: "Heat pump installation and engineering",
    areaServed: "Polska",
  },

  seo: {
    title:
      "Pompy ciepła Daikin Altherma 3 — projekt, montaż, serwis | Soltimus",
    description:
      "Audyt, OZC, projekt hydrauliczny i elektryczny, montaż, uruchomienie i 30 dni monitoringu. Inżynierski standard zamiast oferty na sam sprzęt.",
  },
};
