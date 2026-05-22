/**
 * Flagship case study — Business continuity through energy storage.
 * Stacja paliw · Sigenergy 18 kWh · stabilizacja napięcia + backup.
 *
 * Storytelling axis: NOT "battery installation" — operational continuity
 * and energy reliability for a business that cannot stop operating.
 */
import type { CaseStudy } from "../types";
import heroImg from "@/assets/case-stacja-paliw-hero.jpg";

export const caseStudy: CaseStudy = {
  slug: "stacja-paliw-ciaglosc-zasilania-sigenergy",
  status: "published",

  title:
    "Stacja paliw — ciągłość zasilania i stabilne 230 V dla biznesu, który nie może się zatrzymać",
  subtitle:
    "Magazyn energii Sigenergy 18 kWh jako warstwa stabilizująca napięcie i podtrzymująca pracę dystrybutorów podczas zaników sieci.",
  excerpt:
    "Jak rozwiązaliśmy problem przepalanych bezpieczników, niestabilnego napięcia i przerw w tankowaniu — projektując architekturę zasilania, nie tylko montując baterię.",

  publishedAt: "2026-05-02",
  readingTime: 10,

  category: "magazyny-energii",
  tags: [
    "Sigenergy",
    "BESS 18 kWh",
    "Ciągłość zasilania",
    "Stabilizacja napięcia",
    "B2B",
  ],

  location: {
    city: "Mazowsze",
    region: "mazowieckie",
    countryCode: "PL",
  },

  heroImage: heroImg,
  heroImageAlt:
    "Polska stacja paliw o zmierzchu — dostawczy van przy dystrybutorze, atmosfera ciągłości operacyjnej",

  building: {
    type: "Obiekt komercyjny — stacja paliw",
    area_m2: 220,
    floors: 1,
    occupants: 3,
    insulation: "Obiekt usługowy (poza zakresem projektu)",
    previousHeating: "Poza zakresem — projekt dotyczył wyłącznie zasilania",
  },

  goals: [
    "Wyeliminować przerwy w tankowaniu wynikające z zaników zasilania.",
    "Ustabilizować napięcie na poziomie 230 V, niezależnie od stanu sieci.",
    "Ochronić wrażliwą elektronikę dystrybutorów przed skokami i podnapięciami.",
    "Zapewnić wielogodzinny backup dla krytycznych obwodów obiektu.",
    "Zredukować ryzyko operacyjne i stres właściciela związany z przestojami.",
  ],

  challenges: [
    {
      title: "Niestabilna sieć w lokalizacji wiejskiej",
      text: "Pomiary w punkcie przyłącza pokazywały wahania napięcia w zakresie 198–242 V oraz krótkotrwałe zapady poniżej 180 V kilka razy w tygodniu. To poziom, przy którym elektronika dystrybutorów paliw wchodzi w błąd zasilania i wymaga restartu serwisowego.",
    },
    {
      title: "Przepalane bezpieczniki w dystrybutorach",
      text: "Powtarzające się skoki napięcia powodowały aktywację zabezpieczeń nadprądowych w dystrybutorach. Każde zdarzenie = przerwa w obsłudze klienta, koszt serwisu, ryzyko reputacyjne. W skali miesiąca: 4–7 incydentów.",
    },
    {
      title: "Zanik zasilania = całkowite zatrzymanie obiektu",
      text: "Klasyczny agregat spalinowy oznacza minuty przerwy, hałas, koszty paliwa i serwisu. Wymaganie inwestora było jednoznaczne: przełączenie ma być niezauważalne dla klienta tankującego, a backup ma trwać godziny, nie minuty.",
    },
    {
      title: "Brak miejsca na ciężkie urządzenia rezerwowe",
      text: "Obiekt nie miał przestrzeni technicznej na agregat z dużym zbiornikiem paliwa ani na infrastrukturę go obsługującą. Rozwiązanie musiało zmieścić się w istniejącym pomieszczeniu technicznym.",
    },
  ],

  approach: [
    "Pierwszą decyzją było zdiagnozowanie problemu — nie założenie go. 14-dniowy pomiar analizatorem jakości energii pokazał dokładnie, czego nie widać „na oko”: krótkie zapady (sag) o długości 80–400 ms, których klasyczny licznik nigdy nie odnotuje, ale które wystarczą, aby elektronika dystrybutora przeszła w stan błędu.",
    "Drugą decyzją było zerwanie z paradygmatem „awaryjny agregat”. Zaprojektowaliśmy warstwę magazynu energii Sigenergy o pojemności 18 kWh jako bufor stabilizujący — pracujący stale, nie tylko w momencie awarii. Magazyn wraz z falownikiem hybrydowym pełni rolę aktywnego regulatora napięcia: utrzymuje stabilne 230 V niezależnie od tego, co dzieje się po stronie sieci.",
    "Trzecią decyzją było zaprojektowanie selektywnego backupu. Nie podtrzymujemy wszystkiego — podtrzymujemy obwody krytyczne: dystrybutory, kasa, sterowanie, oświetlenie zadaszenia. Reszta obiektu (pomocnicza) przełącza się w tryb redukcji poboru. To pozwala wydłużyć autonomię z 2–3 godzin do realnych 8–12 godzin pracy bez sieci.",
    "Czwartą decyzją było zabezpieczenie elektryczne. Zweryfikowaliśmy istniejące rozdzielnice, dobraliśmy nowe zabezpieczenia różnicowo-prądowe i przepięciowe klasy I+II, oraz zaprojektowaliśmy przełącznik ATS, który dokonuje transferu w czasie poniżej 20 ms — niezauważalnym dla elektroniki dystrybutorów.",
  ],

  system: [
    {
      title: "Magazyn energii",
      items: [
        {
          label: "Jednostka",
          value: "Sigenergy SigenStor BAT 18 kWh",
          note: "LiFePO4, modułowa, rozszerzalna",
        },
        { label: "Falownik hybrydowy", value: "Sigenergy SigenStor 12 kW 3F" },
        {
          label: "Tryb pracy",
          value: "Stabilizacja napięcia + UPS-on-line",
          note: "Praca ciągła, nie tylko awaryjna",
        },
        {
          label: "Czas transferu (ATS)",
          value: "< 20 ms",
          note: "Niezauważalny dla elektroniki dystrybutorów",
        },
      ],
    },
    {
      title: "Architektura zasilania",
      items: [
        {
          label: "Obwody krytyczne (backup)",
          value: "Dystrybutory · kasa · sterowanie · oświetlenie zadaszenia",
        },
        {
          label: "Obwody pomocnicze",
          value: "Redukcja poboru w trybie wyspowym",
        },
        {
          label: "Stabilizacja napięcia",
          value: "230 V ±2%",
          note: "Niezależnie od stanu sieci (mierzone 198–242 V przed)",
        },
        {
          label: "Autonomia (profil krytyczny)",
          value: "8–12 h",
          note: "Zależnie od obciążenia chwilowego",
        },
      ],
    },
    {
      title: "Zabezpieczenia i pomiar",
      items: [
        {
          label: "Ochrona przepięciowa",
          value: "SPD klasy I + II",
          note: "Strona AC + DC PV",
        },
        {
          label: "Zabezpieczenia różnicowo-prądowe",
          value: "RCD typ B (dla falowników)",
        },
        {
          label: "Monitoring",
          value: "Telemetria 24/7 + alerty SMS/e-mail",
        },
      ],
    },
  ],

  metrics: [
    {
      label: "Incydenty miesięcznie",
      value: "0",
      sub: "vs 4–7 przed projektem",
    },
    {
      label: "Stabilność napięcia",
      value: "230 V ±2%",
      sub: "vs 198–242 V przed",
    },
    {
      label: "Autonomia w trybie krytycznym",
      value: "8–12 h",
      sub: "Wcześniej: 0 minut",
    },
    {
      label: "Czas transferu (ATS)",
      value: "< 20 ms",
      sub: "Tankowanie nieprzerwane",
    },
  ],

  beforeAfter: [
    {
      metric: "Przerwy w pracy dystrybutorów / mc",
      before: "4–7 zdarzeń",
      after: "0",
      delta: "−100%",
      tone: "positive",
    },
    {
      metric: "Zakres napięcia w punkcie zasilania",
      before: "198–242 V (zapady < 180 V)",
      after: "230 V ±2%",
      tone: "positive",
    },
    {
      metric: "Czas pracy bez zasilania sieciowego",
      before: "0 min",
      after: "8–12 h (profil krytyczny)",
      tone: "positive",
    },
    {
      metric: "Wezwania serwisowe (przepalone bezpieczniki) / kwartał",
      before: "12–18",
      after: "0",
      delta: "−100%",
      tone: "positive",
    },
  ],

  timeline: [
    {
      phase: "Diagnoza jakości energii",
      duration: "2 tygodnie",
      text: "Pomiar analizatorem jakości energii w punkcie przyłącza — zapady napięcia, harmoniczne, asymetria faz, krótkotrwałe przepięcia. Dane jako fundament projektu.",
    },
    {
      phase: "Projekt i dobór architektury",
      duration: "1 tydzień",
      text: "Wybór pojemności magazynu, falownika, podział na obwody krytyczne i pomocnicze, projekt rozdzielnicy, dobór ATS i zabezpieczeń.",
    },
    {
      phase: "Modernizacja rozdzielnicy i okablowania",
      duration: "3 dni",
      text: "Wymiana kluczowych zabezpieczeń, rozdzielenie obwodów, instalacja SPD klasy I+II, prefabrykacja linii do magazynu.",
    },
    {
      phase: "Montaż magazynu Sigenergy",
      duration: "2 dni",
      text: "Posadowienie, podłączenie DC/AC, integracja z ATS, uruchomienie, parametryzacja, kalibracja regulatora napięcia.",
    },
    {
      phase: "Walidacja i 30 dni monitoringu",
      duration: "1 dzień + 30 dni",
      text: "Symulowane zaniki sieci, test transferu, walidacja działania dystrybutorów. 30 dni monitoringu w warunkach rzeczywistych z dostrojeniem.",
    },
  ],

  engineerCommentary: [
    {
      authorId: "dzial-projektowy",
      asPullQuote: true,
      text: "Klient prosił o agregat. Pomiar pokazał, że problemem nie były długie awarie, tylko zapady napięcia trwające ułamek sekundy. Agregat by tu nie pomógł — uruchamia się w 5–10 sekund, a dystrybutor potrzebuje stabilnego zasilania w 20 ms. To była decyzja inżynierska, nie sprzętowa.",
    },
    {
      authorId: "dzial-projektowy",
      text: "Selektywny backup to często niedoceniana decyzja projektowa. Podtrzymując tylko obwody krytyczne, z tego samego magazynu wyciągamy 4× dłuższą autonomię niż przy backupie całego obiektu. W modelu B2B to różnica między „pomocą” a „rozwiązaniem”.",
    },
  ],

  lessons: [
    "W obiektach komercyjnych z wrażliwą elektroniką (POS, dystrybutory, automatyka) magazyn energii bywa skuteczniejszy niż agregat — bo problem to najczęściej zapady i wahania napięcia, nie długie awarie.",
    "Pomiar analizatorem jakości energii to obowiązkowy krok zerowy. Bez niego projekt zgaduje przyczynę problemu zamiast ją rozwiązywać.",
    "Selektywny backup (tylko obwody krytyczne) wydłuża autonomię 3–5× w porównaniu do backupu całego obiektu, przy tej samej pojemności magazynu.",
    "ATS o czasie transferu < 20 ms to warunek konieczny dla obiektów, w których przerwa milisekundowa = restart elektroniki = przerwa operacyjna.",
    "Monitoring 30-dniowy po uruchomieniu wyłapuje warunki brzegowe, których nie odda nawet 2-tygodniowy pomiar diagnostyczny.",
  ],

  testimonial: {
    quote:
      "Przestaliśmy wzywać serwis. Klienci nie zauważają już, że coś się wydarzyło — a my w tle widzimy w aplikacji, że sieć znowu „mrugnęła”. To zmieniło sposób, w jaki prowadzimy obiekt.",
    author: "Właściciel obiektu",
  },

  faq: [
    {
      q: "Dlaczego magazyn energii zamiast agregatu prądotwórczego?",
      a: "Diagnoza pokazała, że dominującym problemem były krótkotrwałe zapady napięcia (80–400 ms) i jego wahania, nie długie awarie. Agregat uruchamia się w 5–10 sekund — to za późno dla elektroniki dystrybutorów. Magazyn z falownikiem hybrydowym działa w trybie ciągłej stabilizacji, transfer poniżej 20 ms jest niezauważalny dla urządzeń.",
    },
    {
      q: "Czy 18 kWh wystarczy na całą stację paliw?",
      a: "Tak — przy projekcie selektywnego backupu. Podtrzymujemy obwody krytyczne (dystrybutory, kasa, sterowanie, oświetlenie zadaszenia), a obwody pomocnicze przełączają się w tryb redukcji. To daje 8–12 godzin realnej pracy operacyjnej bez sieci.",
    },
    {
      q: "Co się dzieje, gdy magazyn się rozładuje?",
      a: "System przechodzi w tryb kontrolowanego wyłączenia obwodów niekrytycznych i alarmuje operatora. Architektura jest gotowa na rozbudowę o moduł PV lub dodatkowe moduły baterii (Sigenergy jest modularny — 18 kWh można powiększyć bez wymiany falownika).",
    },
    {
      q: "Jaka jest żywotność systemu Sigenergy?",
      a: "Ogniwa LiFePO4 mają 6 000+ cykli pełnego ładowania/rozładowania przy zachowaniu >70% pojemności. W profilu stabilizacyjnym (płytkie cykle) realna żywotność wynosi 15+ lat. Gwarancja producenta: 10 lat na magazyn, 10 lat na falownik.",
    },
    {
      q: "Czy rozwiązanie nadaje się do innych obiektów B2B?",
      a: "Tak — wszędzie, gdzie ciągłość zasilania ma realną wartość biznesową: gabinety medyczne, serwerownie, zakłady produkcyjne z procesami ciągłymi, hotele, restauracje, sklepy z chłodnictwem. Architektura (diagnoza → selektywny backup → stabilizacja) jest powtarzalna.",
    },
  ],

  related: {
    services: ["magazyny-energii", "fotowoltaika"],
    articles: ["cennik-pomp-ciepla-2026"],
  },

  seo: {
    title:
      "Stacja paliw — magazyn energii Sigenergy 18 kWh · ciągłość zasilania | Case Study Soltimus",
    description:
      "Jak magazyn energii Sigenergy 18 kWh wyeliminował przepalane bezpieczniki, zapady napięcia i przerwy w tankowaniu. Case study: stabilizacja 230 V, backup 8–12 h, transfer < 20 ms.",
  },
};
