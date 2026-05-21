/**
 * Service page content model.
 *
 * Reusable blueprint for all Soltimus service pages (pompy ciepła,
 * fotowoltaika, magazyny energii, rekuperacja, termomodernizacja).
 *
 * NOT a marketing landing page — a premium engineering conversion
 * ecosystem: educate → demonstrate expertise → reduce anxiety →
 * guide to consultation. Single source of truth; designed to migrate
 * cleanly to Supabase (`services`) later without changing the
 * rendering layer. See docs/service-page-blueprint.md.
 */

export type ServiceSlug =
  | "pompy-ciepla"
  | "fotowoltaika"
  | "magazyny-energii"
  | "rekuperacja"
  | "termomodernizacja";

export type ServiceStatus = "draft" | "published";

export interface ServiceHero {
  eyebrow: string;
  /** H1. Editorial — engineering act, not the product. */
  title: string;
  /** One-sentence subtitle (calm, premium, no superlatives). */
  subtitle: string;
  /** 1–2 paragraphs that frame the engineering stance. */
  intro: string[];
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
  heroImage?: string;
  heroImageAlt?: string;
}

export interface ServiceOverviewPoint {
  label: string;
  value: string;
}

export interface ServiceOverview {
  /** Engineer-first framing of what this service IS. */
  paragraphs: string[];
  /** Up to 4 scannable proof points (e.g. "Audyt → OZC → Projekt → Montaż"). */
  points: ServiceOverviewPoint[];
}

export interface ServiceProblem {
  title: string;
  text: string;
}

export interface ServiceApproachStep {
  step: string; // "01"
  title: string;
  text: string;
}

export interface ServiceProcessPhase {
  phase: string;
  duration: string;
  text: string;
}

export interface ServiceAdvantage {
  /** Lucide icon name (resolved in component, kept as string in data). */
  icon?: string;
  title: string;
  text: string;
}

export interface ServiceMistake {
  title: string;
  text: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceOutcome {
  label: string;
  value: string;
  sub?: string;
}

export interface ServiceComparisonRow {
  metric: string;
  ours: string;
  typical: string;
}

export interface ServiceComparison {
  /** Headers, e.g. ["Standard branżowy", "Standard Soltimus"]. */
  intro?: string;
  rows: ServiceComparisonRow[];
}

export interface ServiceConsultationStep {
  step: string;
  title: string;
  text: string;
}

export interface ServiceRelated {
  caseStudies?: string[]; // slugs in /realizacje
  articles?: string[]; // slugs in /wiedza/<category>/<slug>
  labEpisodes?: string[]; // slugs in /lab-episode/<slug>
}

export interface ServiceSeo {
  title: string;
  description: string;
  ogImage?: string;
}

export interface ServicePage {
  slug: ServiceSlug;
  status: ServiceStatus;
  /** Used in breadcrumbs + canonical, e.g. "Pompy ciepła". */
  navLabel: string;

  hero: ServiceHero;
  overview: ServiceOverview;

  /** What problems homeowners arrive with. Audience-language. */
  commonProblems: ServiceProblem[];
  /** How we approach the problem — 3–5 engineering decisions. */
  engineeringApproach: ServiceApproachStep[];

  /** Engineering / process timeline. */
  processTimeline: ServiceProcessPhase[];

  /** Technical advantages (Soltimus standard, not generic). */
  technicalAdvantages: ServiceAdvantage[];

  /** Industry mistakes to avoid — educational, never aggressive. */
  mistakesToAvoid: ServiceMistake[];

  /** Honest outcomes — engineering metrics, not vanity. */
  outcomes: ServiceOutcome[];

  /** Optional comparison (typical vs Soltimus standard). */
  comparison?: ServiceComparison;

  /** FAQ — AI-search surface. */
  faq: ServiceFaq[];

  /** Consultation flow shown above the conversion CTA. */
  consultationFlow: ServiceConsultationStep[];

  /** Final CTA copy. */
  cta: {
    eyebrow: string;
    title: string;
    lead: string;
  };

  related?: ServiceRelated;

  /** Schema.org Service offer details. */
  serviceSchema: {
    /** "Heat pump installation", "PV installation"... in PL. */
    name: string;
    /** Plain-text 1–2 sentence description for JSON-LD. */
    description: string;
    /** Service type from schema.org enumeration (free text in PL is fine). */
    serviceType: string;
    /** Optional providerArea — defaults to "Polska". */
    areaServed?: string;
  };

  seo: ServiceSeo;
}
