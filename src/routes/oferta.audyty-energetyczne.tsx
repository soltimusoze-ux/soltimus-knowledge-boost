import { createFileRoute } from "@tanstack/react-router";
import { ServicePlaceholder } from "@/components/service/ServicePlaceholder";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/oferta/audyty-energetyczne")({
  head: () =>
    buildMeta({
      title: "Audyty energetyczne — inżynierska diagnoza budynku",
      description:
        "Audyt energetyczny, OZC, badanie termowizyjne i plan modernizacji etapowej. Dokumentacja techniczna pod dofinansowania i bezpieczne decyzje inwestycyjne.",
      path: "/oferta/audyty-energetyczne",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          { name: "Audyty energetyczne", url: `${SITE.url}/oferta/audyty-energetyczne` },
        ]),
      ],
    }),
  component: () => (
    <ServicePlaceholder
      eyebrow="Diagnoza · Liczby przed inwestycją"
      title="Audyty energetyczne"
      italicTail="przed każdą poważną decyzją"
      intro="Zanim zaproponujemy pompę ciepła, fotowoltaikę albo termomodernizację — najpierw mierzymy. Audyt energetyczny i badanie termowizyjne pokazują realny stan budynku i pozwalają zaplanować inwestycje bez ryzyka błędu doboru."
      scope={[
        "Audyt energetyczny budynku",
        "Obliczenia OZC (zapotrzebowanie na ciepło)",
        "Badanie kamerą termowizyjną",
        "Test szczelności (Blower Door) — na życzenie",
        "Plan modernizacji etapowej z budżetami",
        "Dokumentacja techniczna pod dofinansowania",
      ]}
      process={[
        {
          step: "01",
          title: "Wizja lokalna",
          text: "Inwentaryzacja przegród, instalacji i sposobu użytkowania budynku.",
        },
        {
          step: "02",
          title: "Pomiary i obliczenia",
          text: "OZC, termowizja, analiza zużycia mediów. Wynik: pełny obraz budynku w liczbach.",
        },
        {
          step: "03",
          title: "Raport i rekomendacje",
          text: "Czytelny raport z priorytetami modernizacji i kosztami. Bez sprzedaży konkretnych produktów.",
        },
      ]}
    />
  ),
});
