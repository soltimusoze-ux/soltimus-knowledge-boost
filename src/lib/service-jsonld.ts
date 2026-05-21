/**
 * Schema.org Service generator for Soltimus service pages.
 */
import type { ServicePage } from "@/content/services/types";
import { COMPANY } from "@/lib/company";
import { SITE } from "@/config/site";

export function serviceSchema(s: ServicePage, url: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.serviceSchema.name,
    description: s.serviceSchema.description,
    serviceType: s.serviceSchema.serviceType,
    areaServed: s.serviceSchema.areaServed ?? "Polska",
    url,
    provider: {
      "@type": "Organization",
      name: COMPANY.legalName,
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
    },
  };
}
