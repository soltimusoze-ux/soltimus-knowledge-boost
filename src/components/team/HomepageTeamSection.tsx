import { Link } from "@tanstack/react-router";
import bartoszImg from "@/assets/team-bartosz.jpg";
import jarekImg from "@/assets/team-jarek.jpg";
import konradImg from "@/assets/team-konrad.jpg";
import izaImg from "@/assets/team-iza.jpg";
import karolinaImg from "@/assets/team-karolina.jpg";

/**
 * Premium, cinematic "Team" section intended for the homepage.
 * Minimal, editorial — large portraits, asymmetric composition,
 * subtle motion, no corporate cards.
 *
 * All portraits share the same CSS grading layer (`.soltimus-portrait`)
 * defined inline below so the photos read as one editorial set.
 */
export function HomepageTeamSection() {
  const featured = [
    { img: bartoszImg, name: "Bartosz", role: "Główny inżynier HVAC" },
    { img: jarekImg, name: "Jarek", role: "Doradca inwestycyjny" },
  ];
  const supporting = [
    { img: konradImg, name: "Konrad", role: "Daikin Specialist" },
    { img: izaImg, name: "Iza", role: "Koordynacja realizacji" },
    { img: karolinaImg, name: "Karolina", role: "Opieka klienta · Dofinansowania" },
  ];

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-neutral-100">
      {/* Shared cinematic grading for all team portraits */}
      <style>{`
        .soltimus-portrait img {
          filter: contrast(1.04) saturate(0.92) brightness(0.98);
          transition: transform 1200ms cubic-bezier(.2,.7,.2,1), filter 600ms ease;
        }
        .soltimus-portrait:hover img { transform: scale(1.025); filter: contrast(1.06) saturate(0.95) brightness(1); }
        .soltimus-portrait::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,10,12,0) 45%, rgba(10,10,12,.55) 100%);
          pointer-events: none;
        }
        @keyframes soltimus-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .soltimus-rise { animation: soltimus-rise .9s cubic-bezier(.2,.7,.2,1) both; }
      `}</style>

      {/* fine grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* warm radial */}
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle,#F5B800 0%,transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        {/* HEADER */}
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7 soltimus-rise">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              Zespół · Inżynierowie · Eksperci
            </p>
            <h2 className="mt-5 text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Zespół <span className="italic font-extralight text-[#F5B800]">Soltimus.</span>
            </h2>
          </div>
          <p
            className="md:col-span-5 text-neutral-400 text-base leading-relaxed soltimus-rise"
            style={{ animationDelay: "120ms" }}
          >
            Łączymy wiedzę inżynierską, doświadczenie projektowe i nowoczesne
            technologie, aby projektować komfortowe oraz energooszczędne
            instalacje dla nowoczesnych domów.
          </p>
        </div>

        {/* FEATURED — two large editorial portraits, asymmetric */}
        <div className="mt-16 grid gap-6 md:gap-8 md:grid-cols-12">
          {featured.map((m, i) => (
            <figure
              key={m.name}
              className={`soltimus-rise group ${
                i === 0 ? "md:col-span-7 md:mt-0" : "md:col-span-5 md:mt-20"
              }`}
              style={{ animationDelay: `${200 + i * 120}ms` }}
            >
              <div className="soltimus-portrait relative overflow-hidden aspect-[4/5] ring-1 ring-white/10">
                <img
                  src={m.img}
                  alt={`${m.name} — ${m.role}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute bottom-5 left-5 h-px w-14"
                  style={{ background: i === 0 ? "#F5B800" : "#0089CF" }}
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="text-lg font-light tracking-tight">{m.name}</span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  {m.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* SUPPORTING — three smaller portraits, single row */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {supporting.map((m, i) => (
            <figure
              key={m.name}
              className="soltimus-rise group"
              style={{ animationDelay: `${500 + i * 100}ms` }}
            >
              <div className="soltimus-portrait relative overflow-hidden aspect-[3/4] ring-1 ring-white/10">
                <img
                  src={m.img}
                  alt={`${m.name} — ${m.role}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="text-sm font-light tracking-tight">{m.name}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                  {m.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
            Realni inżynierowie. Realne odpowiedzi. Każdy projekt prowadzi
            specjalista z odpowiednią wiedzą.
          </p>
          <div className="flex gap-3">
            <Link
              to="/zespol"
              className="inline-flex items-center rounded-full bg-[#F5B800] px-6 py-3 text-sm font-medium text-neutral-950 transition-all hover:bg-[#FFC629] hover:scale-[1.02]"
            >
              Poznaj cały zespół
            </Link>
            <a
              href="/kontakt"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-100 transition-all hover:border-white/40 hover:bg-white/5"
            >
              Umów konsultację →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageTeamSection;
