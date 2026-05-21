import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/polityka-cookies")({
  head: () =>
    buildMeta({
      title: "Polityka cookies",
      description:
        "Polityka plików cookies Soltimus — jakie pliki cookies wykorzystujemy, w jakich celach, jak długo i jak zarządzać zgodami.",
      path: "/polityka-cookies",
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Polityka cookies", url: `${SITE.url}/polityka-cookies` },
        ]),
      ],
    }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <SiteHeader variant="solid" />

      <section className="border-b border-black/5 bg-brand-cream px-5 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Dokument prawny
          </p>
          <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
            Polityka cookies
          </h1>
          <p className="mt-4 text-sm text-black/55">
            Obowiązuje od: {new Date().toISOString().slice(0, 10)} · Wersja 1.0
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-10 px-5 py-16 text-[15px] leading-relaxed text-black/75 md:px-8 md:py-24 md:text-base">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            1. Czym są pliki cookies
          </h2>
          <p className="mt-4">
            Pliki cookies to niewielkie pliki tekstowe zapisywane przez
            przeglądarkę na Twoim urządzeniu. Pozwalają stronie zapamiętać Twoje
            preferencje i prawidłowo funkcjonować pomiędzy odsłonami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            2. Kategorie cookies, których używamy
          </h2>

          <div className="mt-4 space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-brand-ink">
                Niezbędne (zawsze aktywne)
              </h3>
              <p className="mt-1">
                Wymagane do działania strony — m.in. utrzymanie sesji, pamiętanie
                wyboru w banerze zgód, ochrona przed nadużyciami. Nie można ich
                wyłączyć w obrębie strony.
              </p>
              <p className="mt-1 text-sm text-black/55">
                Przykład: <code className="rounded bg-black/5 px-1.5 py-0.5">soltimus.consent.v1</code>{" "}
                (localStorage, czas: do wycofania zgody).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-ink">
                Analityczne (opcjonalne)
              </h3>
              <p className="mt-1">
                Pozwalają mierzyć ruch i sposób korzystania ze strony, aby
                ulepszać treści. Aktywowane wyłącznie po wyrażeniu zgody.
              </p>
              <p className="mt-1 text-sm text-black/55">
                Planowane: PostHog / Google Analytics 4.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-ink">
                Marketingowe (opcjonalne)
              </h3>
              <p className="mt-1">
                Wspierają działania reklamowe i remarketing. Aktywowane wyłącznie
                po wyrażeniu zgody.
              </p>
              <p className="mt-1 text-sm text-black/55">
                Planowane: HubSpot Tracking, Meta Pixel.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            3. Zarządzanie zgodami
          </h2>
          <p className="mt-4">
            Decyzję możesz zmienić w każdej chwili, czyszcząc dane strony w
            ustawieniach przeglądarki — przy kolejnej wizycie ponownie pokaże się
            baner zgód. W kolejnej wersji udostępnimy także link „Ustawienia
            cookies” w stopce.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">
            4. Dostawcy zewnętrzni
          </h2>
          <p className="mt-4">
            Po wyrażeniu zgody część cookies może być ustawiana przez podmioty
            trzecie (np. dostawców analityki czy CRM). Pełna lista znajduje się w{" "}
            <Link
              to="/polityka-prywatnosci"
              className="underline underline-offset-4 hover:text-black"
            >
              Polityce prywatności
            </Link>
            .
          </p>
        </section>

        <p className="rounded-2xl border border-dashed border-black/15 bg-brand-cream p-5 text-sm text-black/60">
          <strong className="text-brand-ink">Uwaga:</strong> dokument w wersji
          roboczej. Zostanie zaktualizowany przy aktywacji konkretnych narzędzi
          analitycznych i marketingowych.
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
