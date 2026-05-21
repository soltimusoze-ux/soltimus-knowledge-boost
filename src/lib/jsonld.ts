/**
 * JSON-LD schema.org generators.
 *
 * Pick the type that matches the page's content:
 * - `organizationSchema` — sitewide in `__root.tsx`
 * - `websiteSchema` — sitewide, with SearchAction once /search exists
 * - `articleSchema` — Knowledge Hub posts
 * - `faqSchema` — FAQ sections / pages
 * - `breadcrumbSchema` — deep routes
 * - `productSchema` — heat pump / equipment product pages (future)
 */

import { COMPANY } from "./company";
import { SITE } from "@/config/site";

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    alternateName: COMPANY.brand,
    url: SITE.url,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      postalCode: COMPANY.postalCode,
      addressLocality: COMPANY.city,
      addressCountry: COMPANY.countryCode,
    },
    taxID: COMPANY.nip,
    vatID: `PL${COMPANY.nip}`,
    identifier: [
      { "@type": "PropertyValue", propertyID: "NIP", value: COMPANY.nip },
      { "@type": "PropertyValue", propertyID: "KRS", value: COMPANY.krs },
      { "@type": "PropertyValue", propertyID: "REGON", value: COMPANY.regon },
    ],
    openingHours: COMPANY.hoursStructured,
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string; // ISO 8601
  dateModified?: string;
  authorName?: string;
}

export function articleSchema(input: ArticleSchemaInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": input.authorName ? "Person" : "Organization",
      name: input.authorName ?? COMPANY.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: SITE.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: ReadonlyArray<FaqItem>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: ReadonlyArray<BreadcrumbItem>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  sku?: string;
  offers?: { price: string; currency: string; availability?: string };
}

export function productSchema(input: ProductSchemaInput): Json {
  const out: Json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image,
    brand: { "@type": "Brand", name: input.brand ?? COMPANY.brand },
    sku: input.sku,
  };
  if (input.offers) {
    out.offers = {
      "@type": "Offer",
      price: input.offers.price,
      priceCurrency: input.offers.currency,
      availability:
        input.offers.availability ?? "https://schema.org/InStock",
    };
  }
  return out;
}
