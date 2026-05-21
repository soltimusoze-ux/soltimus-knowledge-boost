import { createFileRoute } from "@tanstack/react-router";
import { ServicePlaceholder } from "@/components/service/ServicePlaceholder";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/oferta/termomodernizacja")({
  head: () =>
    buildMeta({
      title: "Termomodernizacja — mniej energii, więcej komfortu",
      description:
        "Audyt energetyczny, ocieplenie przegród, wymiana stolarki i etapowy plan modernizacji. Wsparcie w dofinansowaniach Czyste Powietrze i Mój Prąd.",
      path: "/oferta/termomodernizacja",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          { name: "Termomodernizacja", url: `${SITE.url}/oferta/termomodernizacja` },
        ]),
      ],
    }),
  component: () => (
    <ServicePlaceholder
      eyebrow="Powłoka budynku · Efektywność"
      title="Termomodernizacja"
      italicTail="zaplanowana etapowo"
      intro="Zaczynamy od liczb, nie od ofert produktów. Audyt energetyczny pokazuje, gdzie naprawdę ucieka ciepło i które inwestycje zwracają się najszybciej. Plan modernizacji rozkładamy na etapy dopasowane do budżetu i sezonu."
      scope={[
        "Audyt energetyczny i charakterystyka budynku",
        "Badanie termowizyjne przegród",
        "Ocieplenie ścian, dachu, stropów i podłóg",
        "Wymiana stolarki okiennej i drzwiowej",
        "Modernizacja źródła ciepła i instalacji c.o./c.w.u.",
        "Dokumentacja pod dofinansowania (Czyste Powietrze, Mój Prąd)",
      ]}
      process={[
        {
          step: "01",
          title: "Audyt i diagnoza",
          text: "OZC, termowizja, ocena stanu technicznego. Wnioski w formie raportu, bez branżowego żargonu.",
        },
        {
          step: "02",
          title: "Plan etapowy",
          text: "Kolejność prac dobrana pod realny zwrot z inwestycji i komfort mieszkańców w trakcie remontu.",
        },
        {
          step: "03",
          title: "Realizacja i dotacje",
          text: "Koordynacja prac, kontrola wykonania i kompletna dokumentacja do programów dofinansowań.",
        },
      ]}
    />
  ),
});
