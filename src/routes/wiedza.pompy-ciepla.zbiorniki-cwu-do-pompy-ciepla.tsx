import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Calculator } from "lucide-react";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { categoryBySlug } from "@/lib/knowledge-categories";

const TITLE = "Zbiorniki c.w.u. do pompy ciepła — jaki rodzaj i pojemność wybrać?";
const DESCRIPTION =
  "Emaliowany, ze stali nierdzewnej czy bufor z wężownicą? Eksperci Soltimus tłumaczą różnice między zbiornikami c.w.u. do pomp ciepła Daikin oraz jak dobrać pojemność do liczby domowników.";
const CANONICAL =
  "https://soltimus-knowledge-boost.lovable.app/wiedza/pompy-ciepla/zbiorniki-cwu-do-pompy-ciepla";

const cat = categoryBySlug("pompy-ciepla")!;

export const Route = createFileRoute(
  "/wiedza/pompy-ciepla/zbiorniki-cwu-do-pompy-ciepla",
)({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: ZbiornikiCwuArticle,
});

function ZbiornikiCwuArticle() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-black">
      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: cat.name, to: `/wiedza/${cat.slug}` },
          { label: "Zbiorniki c.w.u." },
        ]}
      />

      <section className="border-b border-black/5 bg-white px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-black/60">
            <Droplets className="h-3 w-3 text-[#0089CF]" />
            Poradnik · Ciepła woda użytkowa
          </div>
          <h1 className="mt-8 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
            Zbiorniki c.w.u. do pompy ciepła —
            <span className="block italic font-light text-black/70">
              jaki rodzaj i pojemność wybrać?
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            Emaliowany, ze stali nierdzewnej, a może bufor z wężownicą spiralną?
            Wyjaśniamy, czym różnią się zbiorniki c.w.u. współpracujące z pompą ciepła
            Daikin Altherma i jak dobrać pojemność, żeby ciepłej wody nigdy nie zabrakło.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <article className="mx-auto max-w-3xl space-y-12 text-[15px] leading-relaxed text-black/75 md:text-base">
          <div className="rounded-2xl border border-dashed border-black/15 bg-white p-5 text-sm text-black/55">
            <strong className="text-black/80">Status:</strong> szkielet artykułu —
            pełna treść redakcyjna zostanie uzupełniona przez zespół Soltimus.
          </div>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
              Po co w ogóle zbiornik c.w.u. przy pompie ciepła?
            </h2>
            <p className="mt-4">
              Pompa ciepła Daikin Altherma podgrzewa wodę użytkową cyklicznie —
              do osiągnięcia zadanej temperatury, a następnie utrzymuje ją w izolowanym
              zbiorniku. Pojemność i jakość zbiornika decydują o komforcie codziennego
              użytkowania oraz o efektywności (COP) pracy pompy w trybie CWU.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
              Rodzaje zbiorników c.w.u.
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>
                <strong>Emaliowane (z anodą tytanową lub magnezową)</strong> — najpopularniejsze,
                korzystna cena, wymagają okresowej kontroli anody.
              </li>
              <li>
                <strong>Ze stali nierdzewnej (INOX)</strong> — trwałe, lekkie,
                bez anody. Rekomendowane przy twardej wodzie i dla domów inwestujących
                długoterminowo.
              </li>
              <li>
                <strong>Bufor z wężownicą / kombinowane (HPSU / EKHWS)</strong> —
                zintegrowane rozwiązania Daikin, oszczędność miejsca w kotłowni.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
              Jaką pojemność wybrać?
            </h2>
            <ul className="mt-4 space-y-2 list-disc pl-5">
              <li>1–2 osoby: 150–200 l</li>
              <li>3–4 osoby: 230–300 l</li>
              <li>5+ osób / wanna z hydromasażem: 300–500 l</li>
            </ul>
            <p className="mt-4 text-sm text-black/55">
              Dobór wspomagamy w kalkulatorze — moc pompy nie zależy od zbiornika,
              ale zestaw i cena tak.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
              Najczęstsze błędy
            </h2>
            <ul className="mt-4 space-y-2 list-disc pl-5">
              <li>Za mała pojemność „dla oszczędności” → częste dogrzewanie grzałką.</li>
              <li>Zbyt duża pojemność bez recyrkulacji → straty postojowe.</li>
              <li>Brak filtra na zasilaniu → szybsze zużycie anody / wężownicy.</li>
            </ul>
          </section>

          <Link
            to="/kalkulator-pompy-ciepla"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-black/10 bg-black p-6 text-white transition hover:bg-[#0089CF] md:p-8"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                Kalkulator Soltimus
              </div>
              <div className="mt-2 text-lg font-semibold md:text-xl">
                Wróć do kalkulatora i dobierz zbiornik do swojej pompy
              </div>
              <p className="mt-1 text-sm text-white/70">
                Otrzymasz orientacyjną wycenę brutto z montażem w 90 sekund.
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F6B800] text-black transition group-hover:translate-x-0.5">
              <Calculator className="h-5 w-5" />
            </div>
          </Link>
        </article>
      </section>
    </div>
  );
}
