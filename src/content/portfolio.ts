/**
 * Real implementation archive — Phase 6G.
 *
 * Smaller, calmer portfolio entries that sit BELOW the flagship case studies
 * on /realizacje. They communicate scale, repeatability and field experience.
 * Not editorial stories — just proof that the work has been done, many times,
 * in real Polish locations.
 */
import img01 from "@/assets/portfolio/realizacja-01-termo-dom.jpg";
import img02 from "@/assets/portfolio/realizacja-02-pv-parterowiec.jpg";
import img03 from "@/assets/portfolio/realizacja-03-pompa-monoblok.jpg";
import img04 from "@/assets/portfolio/realizacja-04-termo-kostka.jpg";
import img05 from "@/assets/portfolio/realizacja-05-szkola-pv.jpg";
import img06 from "@/assets/portfolio/realizacja-06-stodola.jpg";
import img07 from "@/assets/portfolio/realizacja-07-wiejski-dom.jpg";
import img08 from "@/assets/portfolio/realizacja-08-kotlownia.jpg";
import img09 from "@/assets/portfolio/realizacja-09-dom-podmiejski.jpg";
import img10 from "@/assets/portfolio/realizacja-10-hala-pv.jpg";
import img11 from "@/assets/portfolio/realizacja-11-blok-termo.jpg";
import img12 from "@/assets/portfolio/realizacja-12-hybryda.jpg";

export type PortfolioEntry = {
  id: string;
  title: string;
  location: string;
  type: string;
  system?: string;
  image: string;
  alt: string;
};

export const PORTFOLIO: PortfolioEntry[] = [
  {
    id: "p01",
    title: "Termomodernizacja domu jednorodzinnego",
    location: "Piaseczno",
    type: "Termomodernizacja",
    system: "Ocieplenie 20 cm + wymiana stolarki",
    image: img01,
    alt: "Dom jednorodzinny po termomodernizacji w Piasecznie",
  },
  {
    id: "p02",
    title: "Parterowiec z instalacją PV",
    location: "Pruszków",
    type: "Fotowoltaika",
    system: "PV 8,4 kWp · falownik hybrydowy",
    image: img02,
    alt: "Parterowiec z panelami fotowoltaicznymi na dachu",
  },
  {
    id: "p03",
    title: "Pompa ciepła Daikin Altherma",
    location: "Józefosław",
    type: "Pompa ciepła",
    system: "Monoblok 12 kW · bufor 100 l",
    image: img03,
    alt: "Jednostka zewnętrzna pompy ciepła Daikin przy domu jednorodzinnym",
  },
  {
    id: "p04",
    title: "Głęboka termomodernizacja kostki",
    location: "Otwock",
    type: "Termomodernizacja",
    system: "EPS 20 cm + dach + okna",
    image: img04,
    alt: "Dom typu kostka w trakcie ocieplenia styropianem",
  },
  {
    id: "p05",
    title: "Szkoła podstawowa — PV na dachu",
    location: "Gmina Lesznowola",
    type: "Obiekt publiczny",
    system: "PV 40 kWp · on-grid",
    image: img05,
    alt: "Budynek szkoły podstawowej z instalacją fotowoltaiczną na dachu",
  },
  {
    id: "p06",
    title: "Nowoczesna stodoła — system hybrydowy",
    location: "Mazowsze",
    type: "Kompleksowa",
    system: "Pompa ciepła + PV 10 kWp",
    image: img06,
    alt: "Nowoczesna stodoła z grafitowym dachem o zmierzchu",
  },
  {
    id: "p07",
    title: "Dom drewniany — PV i CWU",
    location: "Powiat grójecki",
    type: "Fotowoltaika",
    system: "PV 6 kWp · CWU z PC",
    image: img07,
    alt: "Wiejski dom z drewna z instalacją PV na dachu",
  },
  {
    id: "p08",
    title: "Kotłownia z buforem i automatyką",
    location: "Konstancin-Jeziorna",
    type: "Pompa ciepła",
    system: "Bufor 300 l · sterowanie pogodowe",
    image: img08,
    alt: "Wnętrze kotłowni z buforem CWU i instalacją miedzianą",
  },
  {
    id: "p09",
    title: "Modernizacja domu podmiejskiego",
    location: "Warszawa — Wesoła",
    type: "Modernizacja",
    system: "Wymiana źródła ciepła + PV 7 kWp",
    image: img09,
    alt: "Dom podmiejski z carportem po modernizacji",
  },
  {
    id: "p10",
    title: "Hala usługowa — PV i serwis",
    location: "Janki",
    type: "Obiekt komercyjny",
    system: "PV 50 kWp · pompa ciepła powietrze-woda",
    image: img10,
    alt: "Hala usługowa z dachem o instalacji fotowoltaicznej",
  },
  {
    id: "p11",
    title: "Termomodernizacja bloku",
    location: "Pruszków",
    type: "Wielorodzinny",
    system: "Ocieplenie + wymiana instalacji c.o.",
    image: img11,
    alt: "Czteropiętrowy blok po termomodernizacji elewacji",
  },
  {
    id: "p12",
    title: "Hybryda PV + pompa ciepła",
    location: "Magdalenka",
    type: "Kompleksowa",
    system: "PV 9 kWp + pompa ciepła + magazyn 10 kWh",
    image: img12,
    alt: "Dom jednorodzinny z PV na dachu i pompą ciepła przy elewacji",
  },
];
