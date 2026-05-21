/**
 * Case Study content model.
 *
 * Premium engineering case studies — NOT a simple project gallery.
 * Each case study presents:
 *   - the engineering decision process
 *   - the building profile + homeowner goals
 *   - the system that was designed and why
 *   - measurable outcomes (energy, comfort, savings)
 *   - cinematic premium storytelling
 *
 * Single source of truth. Designed to migrate cleanly to Supabase
 * (`case_studies`) or HubSpot CMS later without changing the rendering
 * layer. See docs/case-study-engine.md.
 *
 * Migration contract (when moved to DB):
 *   id              uuid                -> CaseStudy.slug
 *   slug            text unique         -> CaseStudy.slug
 *   status          enum                -> CaseStudy.status
 *   payload_json    jsonb               -> full CaseStudy object
 *   hubspot_id      text nullable       -> CRM mirror id
 */

export type CaseStudyStatus = "draft" | "published";

export type CaseStudyCategory =
  | "pompy-ciepla"
  | "fotowoltaika"
  | "magazyny-energii"
  | "rekuperacja"
  | "termomodernizacja"
  | "kompleksowa";

export interface CaseStudyLocation {
  /** City or town. Used in OG, JSON-LD, and "Konstancin" eyebrow lines. */
  city: string;
  /** Voivodeship / region. */
  region: string;
  /** ISO country code, defaults to "PL". */
  countryCode?: string;
}

export interface BuildingProfile {
  type: string; // "Dom jednorodzinny", "Rezydencja", "Bliźniak"
  area_m2: number;
  floors?: number;
  year?: number | string; // build year
  occupants?: number;
  insulation?: string;
  previousHeating?: string;
}

export interface SpecRow {
  label: string;
  value: string;
  note?: string;
}

export interface SpecGroup {
  /** "Pompa ciepła", "Fotowoltaika", "Magazyn energii", "Automatyka" */
  title: string;
  items: SpecRow[];
}

export interface MetricItem {
  label: string;
  value: string;
  sub?: string;
}

export interface BeforeAfterRow {
  /** "Roczne zużycie energii", "Koszt ogrzewania / mc", "Temperatura komfortu" */
  metric: string;
  before: string;
  after: string;
  /** Optional delta string, e.g. "−72%" */
  delta?: string;
  /** Optional positive/negative hint for styling. */
  tone?: "positive" | "neutral";
}

export interface TimelinePhase {
  phase: string;
  /** "5 dni", "2 tygodnie" */
  duration: string;
  text: string;
}

export interface EngineerCommentary {
  /** Author id from src/content/authors.ts */
  authorId: string;
  text: string;
  /** Optional pull-quote framing. */
  asPullQuote?: boolean;
}

export interface CaseTestimonial {
  quote: string;
  /** First name or initials only — preserve homeowner privacy. */
  author: string;
  role?: string;
}

export interface CaseStudyChallenge {
  title: string;
  text: string;
}

export interface CaseStudyRelated {
  services?: string[];
  articles?: string[];
  labEpisodes?: string[];
}

export interface CaseStudySeo {
  title: string;
  description: string;
  ogImage?: string;
  canonicalOverride?: string;
}

export interface CaseStudyFaqItem {
  q: string;
  a: string;
}

export interface CaseStudy {
  slug: string;
  status: CaseStudyStatus;

  /** Headline. */
  title: string;
  /** Sub-headline shown under the hero h1 (premium storytelling line). */
  subtitle?: string;
  /** 1–2 sentence summary for cards, OG description fallback. */
  excerpt: string;

  publishedAt: string; // ISO 8601
  updatedAt?: string;
  /** Minutes — also informs schema.timeRequired. */
  readingTime: number;

  category: CaseStudyCategory;
  /** Free-form tags used in filtering + AI surfaces. */
  tags?: string[];

  /** Geographic anchor — drives LocalBusiness relevance + OG. */
  location: CaseStudyLocation;

  heroImage?: string;
  heroImageAlt?: string;
  /** Optional supplementary photography. */
  gallery?: { src: string; alt: string; caption?: string }[];

  /** Building card shown above-the-fold. */
  building: BuildingProfile;

  /** Homeowner-language goals. Bullet list. */
  goals: string[];

  /** "What we had to solve" — engineering challenges. */
  challenges: CaseStudyChallenge[];

  /** Plain-language narrative of the engineering approach (1–3 paragraphs). */
  approach: string[];

  /** System configuration — grouped specs (PV / HP / BESS / Recup). */
  system: SpecGroup[];

  /** Headline metrics — rendered as a strip just under the hero. */
  metrics: MetricItem[];

  /** Before / after comparison rows. */
  beforeAfter?: BeforeAfterRow[];

  /** Installation timeline. */
  timeline?: TimelinePhase[];

  /** Engineer commentary — high-authority signal. */
  engineerCommentary?: EngineerCommentary[];

  /** "What we learned" — transferable lessons. */
  lessons?: string[];

  testimonial?: CaseTestimonial;

  faq?: CaseStudyFaqItem[];

  related?: CaseStudyRelated;

  seo: CaseStudySeo;
}
