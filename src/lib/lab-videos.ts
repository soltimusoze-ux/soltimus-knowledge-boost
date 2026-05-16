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
  description: string;
  /** Series slug — must match VIDEO_SERIES.slug in `video-series.ts` */
  series: string;
  /** Pełny URL YouTube lub Vimeo. Pusty string = jeszcze nie nagrane. */
  videoUrl: string;
  /** Override miniatury. Jeżeli puste — generujemy z YouTube. */
  thumbnail?: string;
  /** Format mm:ss lub h:mm:ss */
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
    slug: "czy-bufor-ciepla-jest-potrzebny",
    title: "Czy bufor ciepła jest naprawdę potrzebny?",
    description:
      "Analizujemy 12 instalacji z buforem i 12 bez bufora. Pokazujemy realny wpływ na taktowanie sprężarki, COP sezonowy i komfort cieplny.",
    series: "engineering-lab",
    videoUrl: "",
    duration: "12:40",
    tags: ["bufor", "pompa ciepła", "hydraulika", "taktowanie", "COP"],
    relatedArticles: [
      {
        label: "Hydraulika niskotemperaturowa — projekt",
        href: "/wiedza/hydraulika",
      },
      {
        label: "Pompy ciepła — dobór i COP",
        href: "/wiedza/pompy-ciepla",
      },
    ],
    faqs: [
      {
        q: "Kiedy bufor jest konieczny?",
        a: "Przy instalacjach grzejnikowych z małą objętością zładu, przy pompach on/off oraz przy współpracy z kominkiem z płaszczem wodnym.",
      },
      {
        q: "Ile litrów bufora na 1 kW?",
        a: "Praktycznie 10–20 l/kW dla pomp inwerterowych, 30–50 l/kW dla pomp on/off.",
      },
    ],
    caseStudies: [
      { label: "Dom 180 m² · Wrocław — bez bufora", href: "/wiedza/case-studies" },
    ],
    cta: {
      text: "Umów konsultację techniczną",
      href: "/premium#kontakt",
    },
    publishedAt: "2026-05-10",
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
        a: "Zdolność konstrukcji do magazynowania i powolnego oddawania ciepła — kluczowa przy doborze trybów pracy pompy.",
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
        a: "Najlepsze są płytowe typ 22/33 z odpowiednim przewymiarowaniem (×1.4–1.8) lub konwektory wentylatorowe.",
      },
      {
        q: "Jaka temperatura zasilania?",
        a: "Optymalnie 45–55°C. Powyżej 60°C COP drastycznie spada.",
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
        a: "Powyżej 3 startów/h sprężarka pracuje nieoptymalnie. Cel: 1–2 starty/h przy stabilnej pogodzie.",
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
