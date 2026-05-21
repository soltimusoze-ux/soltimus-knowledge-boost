import { createFileRoute, Link } from "@tanstack/react-router";
import bartoszImg from "@/assets/team-bartosz.jpg";
import jarekImg from "@/assets/team-jarek.jpg";
import konradImg from "@/assets/team-konrad.jpg";
import izaImg from "@/assets/team-iza.jpg";
import karolinaImg from "@/assets/team-karolina.jpg";
import { HomepageTeamSection } from "@/components/team/HomepageTeamSection";
import { buildMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/zespol")({
  head: () =>
    buildMeta({
      title: "Zespół — inżynierowie i eksperci",
      description:
        "Realni inżynierowie i specjaliści Soltimus — projektujemy nowoczesne systemy HVAC, pompy ciepła i instalacje OZE.",
      path: "/zespol",
      image: bartoszImg,
      jsonLd: [
        breadcrumbSchema([
          { name: "Start", url: `${SITE.url}/` },
          { name: "Zespół", url: `${SITE.url}/zespol` },
        ]),
      ],
    }),
  component: ZespolPage,
});

type Member = {
  id: string;
  firstName: string;
  role: string;
  tone: string;
  credentials: string[];
  bio: string;
  expertise: string[];
  image: string;
  accent: "yellow" | "blue";
};

const members: Member[] = [
  {
    id: "bartosz",
    firstName: "Bartosz",
    role: "Współzałożyciel · Główny inżynier HVAC",
    tone: "Spokojny autorytet inżynierski.",
    credentials: [
      "mgr inż.",
      "Politechnika Warszawska",
      "Ciepłownictwo, ogrzewnictwo i wentylacja",
    ],
    bio: "Projektuje i nadzoruje nowoczesne systemy ogrzewania, wentylacji i chłodzenia. Łączy precyzję obliczeniową z wieloletnim doświadczeniem terenowym — od domów jednorodzinnych po obiekty energooszczędne.",
    expertise: ["Pompy ciepła", "Rekuperacja", "Hydraulika układów", "Audyt energetyczny"],
    image: bartoszImg,
    accent: "yellow",
  },
  {
    id: "jarek",
    firstName: "Jarek",
    role: "Współzałożyciel · Doradca inwestycyjny",
    tone: "Zaufany konsultant i doświadczony doradca.",
    credentials: ["inż. budownictwa", "Politechnika Warszawska", "Doradca HVAC i OZE"],
    bio: "Prowadzi klientów przez cały proces inwestycji — od pierwszej rozmowy po odbiór instalacji. Praktyczna wiedza budowlana pozwala mu przewidywać problemy, zanim się pojawią.",
    expertise: ["Konsulting inwestycyjny", "Koordynacja z wykonawcami", "Analiza projektu"],
    image: jarekImg,
    accent: "blue",
  },
  {
    id: "konrad",
    firstName: "Konrad",
    role: "Inżynier · Koordynator instalacji",
    tone: "Nowoczesna precyzja techniczna.",
    credentials: ["inż.", "Daikin Specialist", "Doradca techniczny"],
    bio: "Specjalista Daikin i koordynator wykonawstwa. Dba o to, by projekt inżynierski przełożył się na bezbłędną realizację — z dokładnością co do milimetra i parametru.",
    expertise: ["Daikin Specialist", "Koordynacja montażu", "Uruchomienia systemów"],
    image: konradImg,
    accent: "blue",
  },
  {
    id: "iza",
    firstName: "Iza",
    role: "Koordynator realizacji projektów",
    tone: "Organizacja i doskonałość wdrożeniowa.",
    credentials: ["inż. budownictwa", "Politechnika Warszawska"],
    bio: "Spina harmonogram, dostawy i ekipy w jeden płynny proces. Dzięki niej każda realizacja Soltimus przebiega zgodnie z planem i bez niespodzianek dla inwestora.",
    expertise: ["Planowanie", "Logistyka realizacji", "Komunikacja zespołowa"],
    image: izaImg,
    accent: "yellow",
  },
  {
    id: "karolina",
    firstName: "Karolina",
    role: "Opieka klienta · Specjalista ds. dofinansowań",
    tone: "Premium customer experience.",
    credentials: ["Czyste Powietrze", "Mój Prąd · Moje Ciepło"],
    bio: "Pierwszy kontakt z Soltimus. Pomaga klientom poruszać się po programach Czyste Powietrze, Mój Prąd i Moje Ciepło — tak, by formalności nie spowalniały inwestycji.",
    expertise: ["Czyste Powietrze", "Mój Prąd · Moje Ciepło", "Obsługa klienta"],
    image: karolinaImg,
    accent: "yellow",
  },
];

function ZespolPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Shared cinematic grading layer for all team portraits across this page */}
      <style>{`
        .soltimus-portrait img {
          filter: contrast(1.05) saturate(0.9) brightness(0.97);
          transition: transform 1400ms cubic-bezier(.2,.7,.2,1), filter 600ms ease;
        }
        .soltimus-portrait:hover img { transform: scale(1.025); }
        .soltimus-portrait::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(10,10,12,0) 50%, rgba(10,10,12,.6) 100%);
        }
        @keyframes soltimus-rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .soltimus-rise { animation: soltimus-rise 1s cubic-bezier(.2,.7,.2,1) both; }
      `}</style>

      {/* Top utility nav */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
          <Link to="/" className="hover:text-neutral-100 transition-colors">
            ← Soltimus
          </Link>
          <span className="hidden sm:inline">Zespół · Eksperci</span>
        </div>
      </div>

      {/* HERO — minimal editorial */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle,#F5B800 0%,transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute top-72 -left-32 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle,#0089CF 0%,transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-24 sm:pt-36 sm:pb-32">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 soltimus-rise">
            Engineering · Energy · Architecture
          </p>
          <h1
            className="mt-6 text-5xl font-extralight leading-[1.02] tracking-tight sm:text-7xl md:text-[5.5rem] soltimus-rise"
            style={{ animationDelay: "100ms" }}
          >
            Inżynierowie,
            <br />
            <span className="italic text-[#F5B800]">nie instalatorzy.</span>
          </h1>
          <p
            className="mt-10 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg soltimus-rise"
            style={{ animationDelay: "220ms" }}
          >
            Soltimus to zespół inżynierów Politechniki Warszawskiej i specjalistów,
            którzy projektują nowoczesne systemy HVAC, pompy ciepła i instalacje OZE
            — dla domów, w których komfort i efektywność idą w parze.
          </p>

          <div
            className="mt-16 grid grid-cols-2 gap-y-8 gap-x-10 sm:grid-cols-4 max-w-3xl soltimus-rise"
            style={{ animationDelay: "340ms" }}
          >
            {[
              { v: "PW", l: "Politechnika Warszawska" },
              { v: "Daikin", l: "Specjalizacja" },
              { v: "10+", l: "Lat doświadczenia" },
              { v: "5", l: "Ekspertów w zespole" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-extralight">{s.v}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOMEPAGE-STYLE TEAM OVERVIEW (reusable component, also used on home) */}
      <HomepageTeamSection />

      {/* DEEP DIVE — individual editorial stories */}
      <section className="relative border-t border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            Profile · Sylwetki ekspertów
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
            Specjaliści, którzy stoją za projektami.
          </h2>
        </div>

        {members.map((m, i) => (
          <ExpertStory key={m.id} member={m} index={i} total={members.length} />
        ))}
      </section>

      {/* CLOSING */}
      <section className="relative overflow-hidden border-t border-white/10 bg-neutral-950">
        <div
          aria-hidden
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle,#F5B800 0%,transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            Porozmawiajmy o Twoim projekcie
          </p>
          <h2 className="mt-6 text-3xl font-extralight leading-tight tracking-tight sm:text-5xl">
            Realni inżynierowie.
            <br />
            <span className="italic text-[#F5B800]">Realne odpowiedzi.</span>
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-neutral-400 leading-relaxed">
            Umów rozmowę z zespołem Soltimus — przeanalizujemy Twój projekt
            i zaproponujemy rozwiązanie dopasowane do budynku, budżetu i stylu życia.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full bg-[#F5B800] px-7 py-3.5 text-sm font-medium text-neutral-950 transition-all hover:bg-[#FFC629] hover:scale-[1.02]"
            >
              Umów konsultację techniczną
            </a>
            <Link
              to="/lab"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-neutral-100 transition-all hover:border-white/40 hover:bg-white/5"
            >
              Zobacz Soltimus Lab →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ExpertStory({
  member,
  index,
  total,
}: {
  member: Member;
  index: number;
  total: number;
}) {
  const isReversed = index % 2 === 1;
  const accent = member.accent === "yellow" ? "#F5B800" : "#0089CF";

  return (
    <article className="relative">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 border-t border-white/5">
        <div
          className={`grid gap-10 sm:gap-16 md:grid-cols-12 md:items-center ${
            isReversed ? "md:[&>figure]:order-2" : ""
          }`}
        >
          {/* PORTRAIT */}
          <figure className="md:col-span-5 group">
            <div className="soltimus-portrait relative overflow-hidden aspect-[4/5] ring-1 ring-white/10">
              <img
                src={member.image}
                alt={`${member.firstName} — ${member.role}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute bottom-5 left-5 h-px w-14"
                style={{ background: accent }}
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              <span>
                0{index + 1} / 0{total}
              </span>
              <span style={{ color: accent }}>{member.firstName}</span>
            </figcaption>
          </figure>

          {/* TEXT */}
          <div className="md:col-span-7 md:pl-8">
            <div
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              <span className="h-px w-6" style={{ background: accent }} />
              {member.role.split(" · ")[0]}
            </div>

            <h3 className="mt-5 text-5xl font-extralight tracking-tight sm:text-6xl">
              {member.firstName}
            </h3>

            <p className="mt-3 text-sm italic text-neutral-400">{member.tone}</p>

            <p className="mt-7 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl">
              {member.bio}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-xl">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 mb-3">
                  Kwalifikacje
                </div>
                <ul className="space-y-1.5 text-sm text-neutral-300">
                  {member.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span
                        className="mt-2 h-px w-3 shrink-0"
                        style={{ background: accent }}
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 mb-3">
                  Specjalizacje
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((e) => (
                    <span
                      key={e}
                      className="inline-flex items-center rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-neutral-200"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
