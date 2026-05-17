/**
 * Single source of truth for Soltimus company data.
 * Import from here instead of hardcoding phone/email/address anywhere.
 */
export const COMPANY = {
  legalName: "Soltimus sp. z o.o.",
  brand: "Soltimus",
  street: "ul. Kościuszki 62",
  postalCode: "08-400",
  city: "Garwolin",
  country: "Poland",
  countryCode: "PL",
  phone: "+48 500 350 150",
  phoneRaw: "+48500350150",
  phoneE164: "+48500350150",
  email: "biuro@soltimus.pl",
  nip: "8262208527",
  krs: "0000840158",
  regon: "386009714",
  hours: "pon. – pt.: 9:00 – 17:00",
  hoursShort: "pn–pt 9:00–17:00",
  hoursStructured: "Mo-Fr 09:00-17:00",
  website: "https://soltimus.pl",
  // Garwolin coordinates (approx — ul. Kościuszki area)
  geo: { lat: 51.8983, lng: 21.6151 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Soltimus+ul.+Kościuszki+62+08-400+Garwolin",
  mapsEmbed:
    "https://www.google.com/maps?q=ul.+Ko%C5%9Bciuszki+62%2C+08-400+Garwolin&output=embed",
} as const;

export const ADDRESS_LINE = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  alternateName: COMPANY.brand,
  url: COMPANY.website,
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

export const NAV_ITEMS = [
  { label: "Start", to: "/" as const },
  { label: "Oferta", to: "/oferta" as const },
  { label: "Realizacje", to: "/realizacje" as const },
  { label: "Zespół", to: "/zespol" as const },
  { label: "Strefa Wiedzy", to: "/wiedza" as const },
  { label: "Kontakt", to: "/kontakt" as const },
];
