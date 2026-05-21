import { createFileRoute } from "@tanstack/react-router";
import { ServicePlaceholder } from "@/components/service/ServicePlaceholder";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/oferta/rekuperacja")({
  head: () =>
    buildMeta({
      title: "Rekuperacja i klimatyzacja — świeże powietrze i komfort termiczny",
      description:
        "Wentylacja mechaniczna z odzyskiem ciepła, filtracja PM2.5/HEPA oraz klimatyzacja Daikin — multi-split i kanałowa. Projekt, montaż, regulacja, serwis.",
      path: "/oferta/rekuperacja",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          { name: "Rekuperacja i klimatyzacja", url: `${SITE.url}/oferta/rekuperacja` },
        ]),
      ],
    }),
  component: () => (
    <ServicePlaceholder
      eyebrow="Powietrze · Komfort termiczny"
      title="Rekuperacja i klimatyzacja"
      italicTail="dla wymagających domów"
      intro="Świeże, przefiltrowane powietrze przez cały rok i komfort termiczny w lecie. Projektujemy systemy wentylacji z odzyskiem ciepła oraz klimatyzację Daikin jako jedną, spójną instalację — cichą, energooszczędną i prostą w obsłudze."
      scope={[
        "Wentylacja mechaniczna z odzyskiem ciepła (rekuperacja)",
        "Filtracja PM2.5 i opcjonalnie HEPA",
        "Klimatyzacja Daikin — multi-split i kanałowa",
        "Projekt kanałów, dobór central, bilans powietrza",
        "Regulacja, pomiar wydajności, dokumentacja powykonawcza",
        "Integracja sterowania z pompą ciepła i automatyką domową",
      ]}
      process={[
        {
          step: "01",
          title: "Audyt i koncepcja",
          text: "Analiza budynku, układu pomieszczeń, stylu życia mieszkańców i wymagań akustycznych.",
        },
        {
          step: "02",
          title: "Projekt techniczny",
          text: "Dobór centrali, trasy kanałów, anemostaty, klimatyzacja w pomieszczeniach kluczowych. Bilans energetyczny.",
        },
        {
          step: "03",
          title: "Montaż i regulacja",
          text: "Montaż, pomiar wydajności, balans przepływów, instruktaż obsługi i przekazanie dokumentacji.",
        },
      ]}
      consultationNote="Pełna karta usługi i case studies pojawią się w kolejnej edycji Strefy Wiedzy. W razie pytań — umów konsultację."
    />
  ),
});
