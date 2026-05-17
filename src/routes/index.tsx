import { createFileRoute } from "@tanstack/react-router";
import { PremiumHome } from "./premium";
import { ORG_JSONLD } from "@/lib/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soltimus — Nowoczesne systemy energii, ogrzewania i komfortu" },
      {
        name: "description",
        content:
          "Soltimus — premium engineering company. Pompy ciepła, fotowoltaika, magazyny energii, rekuperacja i termomodernizacja dla wymagających domów.",
      },
      { property: "og:title", content: "Soltimus — Premium energy systems" },
      {
        property: "og:description",
        content:
          "Nowoczesne systemy energii, ogrzewania i komfortu dla wymagających domów.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
    ],
  }),
  component: PremiumHome,
});
