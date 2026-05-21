import { createFileRoute } from "@tanstack/react-router";
import { ServicePlaceholder } from "@/components/service/ServicePlaceholder";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/oferta/serwis")({
  head: () =>
    buildMeta({
      title: "Serwis i opieka — inżynierowie, nie call center",
      description:
        "Przeglądy okresowe, reakcja serwisu 24h, własny magazyn części. Opieka nad pompami ciepła, fotowoltaiką, magazynami energii i rekuperacją przez 25+ lat.",
      path: "/oferta/serwis",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Oferta", url: `${SITE.url}/oferta` },
          { name: "Serwis i opieka", url: `${SITE.url}/oferta/serwis` },
        ]),
      ],
    }),
  component: () => (
    <ServicePlaceholder
      eyebrow="Opieka po uruchomieniu · 25+ lat"
      title="Serwis i opieka"
      italicTail="nad systemem przez całe jego życie"
      intro="System energetyczny to nie produkt z gwarancją w pudełku — to instalacja, która pracuje przez dziesięciolecia. Prowadzimy własny serwis: przeglądy, monitoring zdalny, naprawy i modernizacje. Wszystko realizują nasi inżynierowie."
      scope={[
        "Przeglądy okresowe pomp ciepła, PV i rekuperacji",
        "Monitoring zdalny pracy systemu",
        "Reakcja serwisu w 24h",
        "Własny magazyn części zamiennych",
        "Modernizacje i rozbudowa istniejących instalacji",
        "Wsparcie również dla systemów montowanych przez inne firmy",
      ]}
      process={[
        {
          step: "01",
          title: "Zgłoszenie",
          text: "Telefon lub formularz — diagnostyka wstępna z inżynierem, najczęściej już tego samego dnia.",
        },
        {
          step: "02",
          title: "Diagnoza zdalna lub wizyta",
          text: "Część zgłoszeń rozwiązujemy zdalnie. W razie wizyty — przyjeżdżamy z częściami i narzędziami.",
        },
        {
          step: "03",
          title: "Naprawa i raport",
          text: "Naprawa, pomiar pracy systemu po interwencji, raport z rekomendacjami.",
        },
      ]}
      consultationNote="Obsługujemy także instalacje wykonane przez inne firmy. Przed pierwszą interwencją wykonujemy pełen przegląd diagnostyczny."
    />
  ),
});
