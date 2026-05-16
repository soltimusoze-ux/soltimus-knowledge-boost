// =============================================================
// Soltimus Lab — Content layer
// -----------------------------------------------------------------
// Curated, hand-authored video entries used by /lab and related
// knowledge pages. This is intentionally a plain TS module (no
// CMS / DB) — designed to be:
//   • easy to extend (just push a new entry)
//   • easy to migrate later to WP / Supabase
//   • safe before real videoUrl is available (status: "coming-soon")
//
// To add a real episode:
//   1. fill `videoUrl` with a YouTube or Vimeo link
//   2. set `status: "published"`
//   3. optionally add `thumbnail`, otherwise YouTube hqdefault is used
// =============================================================

export type LabVideoStatus = "published" | "coming-soon";

export type LabRelatedLink = {
  label: string;
  href: string; // internal /wiedza/... or external URL
};

export type LabFaq = {
  q: string;
  a: string;
};

export type LabVideo = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  /** Series slug — must match VIDEO_SERIES.slug in `video-series.ts` */
  series: string;
  /** Full YouTube or Vimeo URL. Empty string = not yet recorded. */
  videoUrl: string;
  /** Override thumbnail. If empty — generated from YouTube. */
  thumbnail?: string;
  /** Format mm:ss or h:mm:ss */
  duration?: string;
  tags: string[];
  relatedArticles?: LabRelatedLink[];
  faqs?: LabFaq[];
  caseStudies?: LabRelatedLink[];
  /** CTA card under the player */
  cta?: {
    text: string;
    href: string;
  };
  ctaDescription?: string;
  publishedAt: string; // ISO date
  status: LabVideoStatus;
};

/** Parse a YouTube / Vimeo URL into provider + id. */
export function parseVideoUrl(
  url: string
): { provider: "youtube" | "vimeo"; id: string } | null {
  if (!url) return null;
  const yt =
    url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/) ||
    url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (yt) return { provider: "youtube", id: yt[1] };
  const vm =
    url.match(/player\.vimeo\.com\/video\/(\d+)/) || url.match(/vimeo\.com\/(\d+)/);
  if (vm) return { provider: "vimeo", id: vm[1] };
  return null;
}

/** Resolve thumbnail (override → YouTube hqdefault → null). */
export function resolveThumbnail(v: LabVideo): string | null {
  if (v.thumbnail) return v.thumbnail;
  const parsed = parseVideoUrl(v.videoUrl);
  if (parsed?.provider === "youtube") {
    return `https://i.ytimg.com/vi/${parsed.id}/hqdefault.jpg`;
  }
  return null;
}

// =============================================================
// SAMPLE CONTENT — real topics, ready to be filmed
// -----------------------------------------------------------------
// Każdy wpis ma status "coming-soon" do czasu dodania realnego URL.
// =============================================================

export const LAB_VIDEOS: LabVideo[] = [
  {
    id: "bufor-ciepla",
    slug: "czy-bufor-ciepla-jest-potrzebny-przy-pompie-ciepla",
    title: "Czy bufor ciepła jest potrzebny przy pompie ciepła?",
    shortTitle: "Bufor ciepła — konieczność czy zbędny koszt?",
    description:
      "Wyjaśniamy, kiedy bufor ciepła jest niepotrzebnym kosztem, a kiedy chroni pompę ciepła przed taktowaniem, błędami przepływu i problemami podczas defrostu.",
    series: "engineering-lab",
    videoUrl: "",
    duration: "12:40",
    tags: [
      "bufor ciepła",
      "pompa ciepła",
      "taktowanie",
      "defrost",
      "grzejniki",
      "ogrzewanie podłogowe",
      "hydraulika",
      "Daikin",
    ],
    relatedArticles: [
      {
        label:
          "Czy bufor ciepła do pompy ciepła jest potrzebny? Cała prawda o kosztach i hydraulice",
        href: "/wiedza/pompy-ciepla",
      },
      {
        label: "Hydraulika niskotemperaturowa — projekt",
        href: "/wiedza/hydraulika",
      },
    ],
    faqs: [
      {
        q: "Czy każda pompa ciepła musi mieć bufor?",
        a:
          "Nie. Pompy inwerterowe z dobrze dobraną objętością zładu instalacyjnego (ogrzewanie podłogowe, duża liczba grzejników) często pracują optymalnie bez bufora. Problem pojawia się przy pompach on/off oraz instalacjach z małą objętością wody.",
      },
      {
        q: "Czy przy ogrzewaniu podłogowym bufor jest potrzebny?",
        a:
          "Zazwyczaj nie. Ogrzewanie podłogowe ma bardzo dużą bezwładność cieplną i objętość wody w układzie, która sama w sobie pełni funkcję bufora. Dla pompy inwerterowej to wystarczająca stabilizacja.",
      },
      {
        q: "Dlaczego przy grzejnikach bufor jest często konieczny?",
        a:
          "Grzejniki mają małą objętość wody i wysoką temperaturę zasilania. Pompa inwerterowa pracuje najefektywniej przy stałym obciążeniu — przy grzejnikach zmienia się szybko, co prowadzi do taktowania sprężarki. Bufor wydłuża cykl pracy.",
      },
      {
        q: "Co to jest taktowanie pompy ciepła?",
        a:
          "To cykliczne załączanie i wyłączanie sprężarki w krótkich odstępach czasu. Powyżej 3 startów na godzinę pompa pracuje nieoptymalnie: zużywa więcej energii na rozruch, mechanizm zużywa się szybciej, a COP sezonowy spada.",
      },
      {
        q: "Jak bufor pomaga przy defroście?",
        a:
          "Podczas defrostu pompa pobiera ciepło z instalacji wewnętrznej. Bez bufora temperatura w grzejnikach lub podłogówce gwałtownie spada. Bufor dostarcza ciepło bez odczuwalnego spadku komfortu w pomieszczeniach.",
      },
    ],
    caseStudies: [
      {
        label: "Modernizacja domu z grzejnikami i pompą ciepła Daikin",
        href: "/wiedza/case-studies",
      },
    ],
    cta: {
      text: "Umów konsultację techniczną",
      href: "/premium#kontakt",
    },
    ctaDescription:
      "Nie wiesz, czy w Twojej instalacji bufor jest potrzebny? Przeanalizujemy układ hydrauliczny i dobierzemy rozwiązanie bez zbędnych kosztów.",
    publishedAt: "2026-05-20",
    status: "coming-soon",
  },
  {
    id: "masa-termiczna",
    slug: "dom-jako-magazyn-energii-masa-termiczna",
    title: "Dom jako magazyn energii — masa termiczna budynku",
    description:
      "Dlaczego dobrze zaprojektowany dom pasywny nie potrzebuje bufora? Pomiar bezwładności cieplnej w realnej konstrukcji murowanej.",
    series: "engineering-lab",
    videoUrl: "",
    duration: "15:20",
    tags: ["masa termiczna", "fizyka budynku", "magazyn energii", "pasywny"],
    relatedArticles: [
      {
        label: "Engineering Lab — fizyka budynku",
        href: "/wiedza/engineering-lab",
      },
    ],
    faqs: [
      {
        q: "Co to jest bezwładność cieplna?",
        a:
          "Zdolność konstrukcji do magazynowania i powolnego oddawania ciepła — kluczowa przy doborze trybów pracy pompy.",
      },
    ],
    cta: {
      text: "Prześlij projekt domu do analizy",
      href: "/premium#projekt",
    },
    publishedAt: "2026-05-12",
    status: "coming-soon",
  },
  {
    id: "pompa-z-grzejnikami",
    slug: "czy-pompa-ciepla-dziala-z-grzejnikami",
    title: "Czy pompa ciepła działa z grzejnikami?",
    description:
      "Pomiar realny: stary dom z grzejnikami żeliwnymi + pompa monoblok. COP, temperatura zasilania i koszt sezonu grzewczego.",
    series: "hvac-myths",
    videoUrl: "",
    duration: "09:55",
    tags: ["grzejniki", "pompa ciepła", "modernizacja", "COP", "mity"],
    relatedArticles: [
      {
        label: "Pompy ciepła — kompletny przewodnik",
        href: "/wiedza/pompy-ciepla",
      },
      {
        label: "Hydraulika niskotemperaturowa",
        href: "/wiedza/hydraulika",
      },
    ],
    faqs: [
      {
        q: "Jakie grzejniki przy pompie ciepła?",
        a:
          "Najlepsze są płytowe typ 22/33 z odpowiednim przewymiarowaniem (×1.4–1.8) lub konwektory wentylatorowe.",
      },
      {
        q: "Jaka temperatura zasilania?",
        a:
          "Optymalnie 45–55°C. Powyżej 60°C COP drastycznie spada.",
      },
    ],
    cta: {
      text: "Umów konsultację techniczną",
      href: "/premium#kontakt",
    },
    publishedAt: "2026-05-14",
    status: "coming-soon",
  },
  {
    id: "taktowanie-pompy",
    slug: "dlaczego-pompa-ciepla-taktuje",
    title: "Dlaczego pompa ciepła taktuje?",
    description:
      "Pięć najczęstszych przyczyn taktowania sprężarki — od źle dobranej mocy, przez hydraulikę, po nastawy krzywej grzewczej.",
    series: "expert-answers",
    videoUrl: "",
    duration: "07:30",
    tags: ["taktowanie", "sprężarka", "dobór", "krzywa grzewcza", "serwis"],
    relatedArticles: [
      {
        label: "Engineering Lab — analiza pracy sprężarki",
        href: "/wiedza/engineering-lab",
      },
      {
        label: "Pompy ciepła — dobór mocy",
        href: "/wiedza/pompy-ciepla",
      },
    ],
    faqs: [
      {
        q: "Ile cykli na godzinę to za dużo?",
        a:
          "Powyżej 3 startów/h sprężarka pracuje nieoptymalnie. Cel: 1–2 starty/h przy stabilnej pogodzie.",
      },
    ],
    cta: {
      text: "Umów audyt instalacji",
      href: "/premium#kontakt",
    },
    publishedAt: "2026-05-16",
    status: "coming-soon",
  },
];

export function labVideosBySeries(seriesSlug: string): LabVideo[] {
  return LAB_VIDEOS.filter((v) => v.series === seriesSlug);
}

export function findLabVideo(slug: string): LabVideo | undefined {
  return LAB_VIDEOS.find((v) => v.slug === slug);
}
