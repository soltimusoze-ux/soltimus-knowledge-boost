/**
 * Case Study JSON-LD generator.
 *
 * Strategy: schema.org has no native `CaseStudy` type that crawlers
 * understand richly. We emit `Article` with `articleSection: "Case Study"`
 * + `about: Place` to anchor location (LocalBusiness relevance), and
 * stack with `BreadcrumbList` + optional `FAQPage` from the route.
 */
import { COMPANY } from "./company";
import { SITE } from "@/config/site";
import type { CaseStudy } from "@/content/case-studies/types";

type Json = Record<string, unknown>;

export function caseStudyArticleSchema(input: {
  c: CaseStudy;
  url: string;
  authorName: string;
}): Json {
  const { c, url, authorName } = input;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    articleSection: "Case Study",
    headline: c.seo.title,
    description: c.seo.description,
    image: c.seo.ogImage ?? c.heroImage,
    datePublished: c.publishedAt,
    dateModified: c.updatedAt ?? c.publishedAt,
    inLanguage: SITE.language,
    keywords: c.tags?.join(", "),
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: SITE.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    about: {
      "@type": "Place",
      name: `${c.location.city}, ${c.location.region}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: c.location.city,
        addressRegion: c.location.region,
        addressCountry: c.location.countryCode ?? "PL",
      },
    },
  };
}
