/**
 * Site-wide configuration. Single source of truth for URLs,
 * SEO defaults, language, and global feature flags.
 *
 * Import from `@/config/site` everywhere instead of hardcoding.
 */

export const SITE = {
  name: "Soltimus",
  legalName: "Soltimus sp. z o.o.",
  tagline: "Nowoczesne systemy energii, ogrzewania i komfortu",
  description:
    "Premium engineering — pompy ciepła, fotowoltaika, magazyny energii, rekuperacja i termomodernizacja dla wymagających domów.",
  locale: "pl_PL",
  language: "pl",
  // Production/preview canonical host. Used for canonical + og:url.
  // When a custom domain is set, change this in one place.
  url: "https://soltimus-knowledge-boost.lovable.app",
  // Optional default OG image. Leave empty until a real branded image exists —
  // placeholders preview worse than no image at all.
  defaultOgImage: "",
  twitterHandle: "",
} as const;

export type SiteConfig = typeof SITE;
