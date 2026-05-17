import { createFileRoute, Link } from "@tanstack/react-router";
import bartoszImg from "@/assets/team-bartosz.jpg";
import jarekImg from "@/assets/team-jarek.jpg";
import konradImg from "@/assets/team-konrad.jpg";
import izaImg from "@/assets/team-iza.jpg";
import karolinaImg from "@/assets/team-karolina.jpg";

export const Route = createFileRoute("/zespol")({
  head: () => ({
    meta: [
      { title: "Zespół Soltimus — Inżynierowie i eksperci" },
      {
        name: "description",
        content:
          "Poznaj zespół Soltimus — inżynierów Politechniki Warszawskiej projektujących nowoczesne systemy HVAC, pompy ciepła i instalacje OZE.",
      },
      { property: "og:title", content: "Zespół Soltimus — Inżynierowie i eksperci" },
      {
        property: "og:description",
        content:
          "Realni inżynierowie i specjaliści stojący za nowoczesnymi instalacjami HVAC oraz OZE.",
      },
      { property: "og:image", content: bartoszImg },
    ],
  }),
  component: ZespolPage,
});

type Member = {
  id: string;
  firstName: string;
  role: string;
  title: string;
  education: string;
  bio: string;
  expertise: string[];
  image?: string;
  accent: "yellow" | "blue";
};

const members: Member[] = [
  {
    id: "bartosz",
    firstName: "Bartosz",
    role: "Współzałożyciel · Główny inżynier HVAC",
    title: "mgr inż.",
    education: "Politechnika Warszawska · Inżynieria środowiska, ciepłownictwo i wentylacja",
    bio: "Projektuje i nadzoruje nowoczesne systemy ogrzewania, wentylacji i chłodzenia. Łączy precyzję obliczeniową z wieloletnim doświadczeniem terenowym — od domów jednorodzinnych po obiekty energooszczędne.",
    expertise: ["Pompy ciepła", "Rekuperacja", "Hydraulika układów", "Audyt energetyczny"],
    image: bartoszImg,
    accent: "yellow",
  },
  {
    id: "jarek",
    firstName: "Jarek",
    role: "Współzałożyciel · Doradca inwestycyjny",
    title: "inż. budownictwa",
    education: "Politechnika Warszawska · Wydział Inżynierii Lądowej",
    bio: "Prowadzi klientów przez cały proces inwestycji — od pierwszej rozmowy po odbiór instalacji. Praktyczna wiedza budowlana pozwala mu przewidywać problemy, zanim się pojawią.",
    expertise: ["Konsulting inwestycyjny", "Koordynacja z wykonawcami", "Analiza projektu"],
    image: jarekImg,
    accent: "blue",
  },
  {
    id: "konrad",
    firstName: "Konrad",
    role: "Inżynier · Koordynator instalacji",
    title: "inż.",
    education: "Politechnika Warszawska",
    bio: "Specjalista Daikin i koordynator wykonawstwa. Dba o to, by projekt inżynierski przełożył się na bezbłędną realizację — z dokładnością co do milimetra i parametru.",
    expertise: ["Daikin Specialist", "Koordynacja montażu", "Uruchomienia systemów"],
    accent: "blue",
  },
  {
    id: "iza",
    firstName: "Iza",
    role: "Koordynator realizacji projektów",
    title: "inż. budownictwa",
    education: "Politechnika Warszawska",
    bio: "Spina harmonogram, dostawy i ekipy w jeden płynny proces. Dzięki niej każda realizacja Soltimus przebiega zgodnie z planem i bez niespodzianek dla inwestora.",
    expertise: ["Planowanie", "Logistyka realizacji", "Komunikacja zespołowa"],
    accent: "yellow",
  },
  {
    id: "karolina",
    firstName: "Karolina",
    role: "Opieka klienta · Specjalista ds. dofinansowań",
    title: "",
    education: "",
    bio: "Pierwszy kontakt z Soltimus. Pomaga klientom poruszać się po programach Czyste Powietrze, Mój Prąd i Moje Ciepło — tak, by formalności nie spowalniały inwestycji.",
    expertise: ["Czyste Powietrze", "Mój Prąd · Moje Ciepło", "Obsługa klienta"],
    accent: "yellow",
  },
];

function ZespolPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Top utility nav */}
      <div className="border-b border-neutral-200/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs uppercase tracking-[0.18em] text-neutral-500">
          <Link to="/" className="hover:text-neutral-900 transition-colors">
            ← Soltimus
          </Link>
          <span className="hidden sm:inline">Zespół · Eksperci</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #F5B800 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute top-40 -left-32 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #0089CF 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Zespół · Inżynierowie · Eksperci
          </p>
          <h1 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-neutral-950 sm:text-6xl md:text-7xl">
            Poznaj zespół
            <br />
            <span className="font-normal">Soltimus.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Łączymy wiedzę inżynierską, doświadczenie projektowe i nowoczesne
            technologie, aby tworzyć komfortowe oraz energooszczędne instalacje
            dla nowoczesnych domów.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-12 max-w-3xl">
            {[
              { v: "5", l: "Ekspertów w zespole" },
              { v: "PW", l: "Politechnika Warszawska" },
              { v: "Daikin", l: "Specjalizacja" },
              { v: "10+", l: "Lat doświadczenia" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-light text-neutral-950 sm:text-3xl">{s.v}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM STORIES */}
      <section className="border-t border-neutral-200/70">
        {members.map((m, i) => (
          <ExpertStory key={m.id} member={m} index={i} />
        ))}
      </section>

      {/* CLOSING — dark cinematic */}
      <section className="relative overflow-hidden bg-neutral-950 text-neutral-100">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #F5B800 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Porozmawiajmy o Twoim projekcie
          </p>
          <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight sm:text-5xl">
            Realni inżynierowie.
            <br />
            <span className="text-[#F5B800]">Realne odpowiedzi.</span>
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
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-7 py-3.5 text-sm font-medium text-neutral-100 transition-all hover:border-neutral-500 hover:bg-neutral-900"
            >
              Zobacz Soltimus Lab →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ExpertStory({ member, index }: { member: Member; index: number }) {
  const isReversed = index % 2 === 1;
  const isDark = index % 2 === 1;
  const accentColor = member.accent === "yellow" ? "#F5B800" : "#0089CF";

  return (
    <article
      className={`relative overflow-hidden ${
        isDark ? "bg-neutral-950 text-neutral-100" : "bg-white text-neutral-900"
      }`}
    >
      {/* subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isDark ? 0.05 : 0.04,
          backgroundImage: `linear-gradient(to right, ${
            isDark ? "#fff" : "#000"
          } 1px, transparent 1px), linear-gradient(to bottom, ${
            isDark ? "#fff" : "#000"
          } 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      {/* accent glow */}
      <div
        aria-hidden
        className={`absolute h-[22rem] w-[22rem] rounded-full blur-3xl pointer-events-none ${
          isReversed ? "-left-32" : "-right-32"
        } ${isDark ? "opacity-25" : "opacity-15"} top-1/4`}
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-32">
        <div
          className={`grid gap-10 sm:gap-16 md:grid-cols-2 md:items-center ${
            isReversed ? "md:[&>div:first-child]:order-2" : ""
          }`}
        >
          {/* IMAGE / PORTRAIT */}
          <div className="relative group">
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-sm ${
                isDark ? "ring-1 ring-white/10" : "ring-1 ring-black/5"
              }`}
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={`${member.firstName} — ${member.role}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <PortraitPlaceholder
                  initial={member.firstName[0]}
                  accent={accentColor}
                  dark={isDark}
                />
              )}
              {/* cinematic top-down gradient */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              {/* corner accent line */}
              <div
                aria-hidden
                className="absolute bottom-4 left-4 h-px w-14"
                style={{ background: accentColor }}
              />
            </div>
            {/* meta strip under image */}
            <div
              className={`mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] ${
                isDark ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              <span>0{index + 1} / 0{members.length}</span>
              <span>{member.firstName}</span>
            </div>
          </div>

          {/* TEXT */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ color: accentColor }}
            >
              <span className="h-px w-6" style={{ background: accentColor }} />
              {member.role.split(" · ")[0]}
            </div>

            <h2
              className={`mt-5 text-4xl font-light tracking-tight sm:text-5xl ${
                isDark ? "text-white" : "text-neutral-950"
              }`}
            >
              {member.firstName}
            </h2>

            {member.title || member.education ? (
              <div
                className={`mt-3 space-y-1 text-sm ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {member.title && <div>{member.title}</div>}
                {member.education && <div>{member.education}</div>}
              </div>
            ) : null}

            <p
              className={`mt-7 text-base leading-relaxed sm:text-lg ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              {member.bio}
            </p>

            <div className="mt-8">
              <div
                className={`text-[11px] uppercase tracking-[0.2em] mb-3 ${
                  isDark ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                Specjalizacje
              </div>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((e) => (
                  <span
                    key={e}
                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs ${
                      isDark
                        ? "border-white/15 text-neutral-200"
                        : "border-neutral-200 text-neutral-700"
                    }`}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function PortraitPlaceholder({
  initial,
  accent,
  dark,
}: {
  initial: string;
  accent: string;
  dark: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        dark ? "bg-neutral-900" : "bg-neutral-100"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, ${accent} 0%, transparent 55%)`,
        }}
      />
      <div className="relative flex flex-col items-center gap-4">
        <div
          className={`text-7xl font-extralight ${
            dark ? "text-white/80" : "text-neutral-400"
          }`}
        >
          {initial}
        </div>
        <div
          className={`text-[10px] uppercase tracking-[0.25em] ${
            dark ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          Portret · wkrótce
        </div>
      </div>
    </div>
  );
}
