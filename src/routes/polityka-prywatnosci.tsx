import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";
import { COMPANY } from "@/lib/company";

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () =>
    buildMeta({
      title: "Polityka prywatności",
      description:
        "Polityka prywatności Soltimus sp. z o.o. — jakie dane przetwarzamy, w jakim celu, przez jaki okres i jakie masz prawa zgodnie z RODO.",
      path: "/polityka-prywatnosci",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Polityka prywatności", url: `${SITE.url}/polityka-prywatnosci` },
        ]),
      ],
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <SiteHeader variant="solid" />

      <section className="border-b border-black/5 bg-brand-cream px-5 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Dokument prawny
          </p>
          <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
            Polityka prywatności
          </h1>
          <p className="mt-4 text-sm text-black/55">
            Obowiązuje od: {new Date().toISOString().slice(0, 10)} · Wersja 1.0
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-10 px-5 py-16 text-[15px] leading-relaxed text-black/75 md:px-8 md:py-24 md:text-base">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            1. Administrator danych
          </h2>
          <p className="mt-4">
            Administratorem Twoich danych osobowych jest{" "}
            <strong>{COMPANY.legalName}</strong>, z siedzibą przy{" "}
            {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city}, NIP{" "}
            {COMPANY.nip}, KRS {COMPANY.krs}, REGON {COMPANY.regon}.
          </p>
          <p className="mt-2">
            Kontakt w sprawach dotyczących danych osobowych:{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="underline underline-offset-4 hover:text-black"
            >
              {COMPANY.email}
            </a>
            , {COMPANY.phone}.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            2. Zakres i cele przetwarzania
          </h2>
          <p className="mt-4">Przetwarzamy dane osobowe w następujących celach:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Odpowiedź na zapytanie / formularz kontaktowy</strong> —
              imię, e-mail, telefon, treść wiadomości (art. 6 ust. 1 lit. b i f RODO).
            </li>
            <li>
              <strong>Wycena i realizacja umowy</strong> — dane teleadresowe,
              dane techniczne budynku, dane do faktury (art. 6 ust. 1 lit. b RODO).
            </li>
            <li>
              <strong>Obowiązki podatkowe i księgowe</strong> — dane na fakturach
              (art. 6 ust. 1 lit. c RODO, w zw. z przepisami podatkowymi).
            </li>
            <li>
              <strong>Marketing własnych usług</strong> — wyłącznie za Twoją
              odrębną zgodą (art. 6 ust. 1 lit. a RODO).
            </li>
            <li>
              <strong>Analityka ruchu</strong> — wyłącznie po wyrażeniu zgody w
              banerze cookies (art. 6 ust. 1 lit. a RODO).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            3. Okres przechowywania
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Korespondencja: do 24 miesięcy od ostatniego kontaktu.</li>
            <li>
              Umowy i dokumenty księgowe: 5 lat od końca roku podatkowego
              (wymóg ustawowy).
            </li>
            <li>Zgody marketingowe: do momentu wycofania zgody.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            4. Odbiorcy danych
          </h2>
          <p className="mt-4">
            Dane mogą być powierzane wyłącznie podmiotom przetwarzającym na
            podstawie umowy: dostawca hostingu, dostawca poczty e-mail (Resend),
            biuro rachunkowe, dostawcy oprogramowania CRM (HubSpot — po
            aktywacji). Nie przekazujemy danych poza EOG bez zachowania
            standardowych klauzul umownych.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            5. Twoje prawa
          </h2>
          <p className="mt-4">
            Przysługuje Ci prawo: dostępu do danych, sprostowania, usunięcia,
            ograniczenia przetwarzania, przenoszenia, sprzeciwu oraz wycofania
            zgody w dowolnym momencie. W przypadku zastrzeżeń możesz złożyć
            skargę do Prezesa UODO (ul. Stawki 2, 00-193 Warszawa).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            6. Pliki cookies
          </h2>
          <p className="mt-4">
            Szczegółowe informacje o plikach cookies znajdziesz w naszej{" "}
            <Link
              to="/polityka-cookies"
              className="underline underline-offset-4 hover:text-black"
            >
              Polityce cookies
            </Link>
            .
          </p>
        </section>

        <p className="rounded-2xl border border-dashed border-black/15 bg-brand-cream p-5 text-sm text-black/60">
          <strong className="text-brand-ink">Uwaga:</strong> dokument w wersji
          roboczej. Przed publikacją zostanie zweryfikowany przez kancelarię
          prawną — w szczególności w zakresie aktywowanych narzędzi (HubSpot,
          analityka).
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
