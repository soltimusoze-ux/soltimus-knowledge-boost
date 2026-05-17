import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import logoLight from "@/assets/soltimus-logo-white.png";
import { COMPANY, NAV_ITEMS } from "@/lib/company";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Soltimus | Umów konsultację" },
      {
        name: "description",
        content:
          "Skontaktuj się z zespołem Soltimus. Pompy ciepła, fotowoltaika, magazyny energii. Garwolin — tel. +48 500 350 150.",
      },
      { property: "og:title", content: "Kontakt — Soltimus" },
      {
        property: "og:description",
        content: "Umów konsultację techniczną z zespołem inżynierów Soltimus.",
      },
    ],
  }),
  component: KontaktPage,
});

const TOPICS = [
  "Pompa ciepła",
  "Fotowoltaika",
  "Magazyn energii",
  "Rekuperacja",
  "Dofinansowanie",
  "Serwis",
  "Inne",
];

function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = `Zapytanie: ${data.get("topic") || "Inne"} — ${data.get("name") || ""}`;
    const body = [
      `Imię i nazwisko: ${data.get("name") || ""}`,
      `Telefon: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Temat: ${data.get("topic") || ""}`,
      "",
      `${data.get("message") || ""}`,
    ].join("\n");
    // Open user's mail client with prefilled message — simple, reliable fallback
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      setSent(true);
      setSubmitting(false);
      form.reset();
    }, 300);
  }

  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <PageHeader />

      {/* HERO */}
      <section className="border-b border-black/5 bg-[#FAFAF7] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Kontakt · Konsultacja techniczna
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Porozmawiajmy o Twoim{" "}
            <span className="italic font-light text-black/60">projekcie</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-black/60 md:text-lg">
            Odpowiadamy w ciągu jednego dnia roboczego. Konsultacja jest
            bezpłatna i niezobowiązująca.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
          {/* INFO */}
          <aside className="md:col-span-5">
            <div className="space-y-8">
              <ContactBlock
                icon={<Phone className="h-4 w-4" />}
                label="Telefon"
                value={COMPANY.phone}
                href={`tel:${COMPANY.phoneE164}`}
              />
              <ContactBlock
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={COMPANY.email}
                href={`mailto:${COMPANY.email}`}
              />
              <ContactBlock
                icon={<MapPin className="h-4 w-4" />}
                label="Biuro"
                value={
                  <>
                    {COMPANY.legalName}
                    <br />
                    {COMPANY.street}
                    <br />
                    {COMPANY.postalCode} {COMPANY.city}
                  </>
                }
                href={COMPANY.mapsUrl}
                external
              />
              <ContactBlock
                icon={<Clock className="h-4 w-4" />}
                label="Godziny otwarcia"
                value={COMPANY.hours}
              />
            </div>

            <div className="mt-10 rounded-2xl border border-black/5 bg-[#FAFAF7] p-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Dane rejestrowe
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">
                    NIP
                  </dt>
                  <dd className="font-medium">{COMPANY.nip}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">
                    KRS
                  </dt>
                  <dd className="font-medium">{COMPANY.krs}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">
                    REGON
                  </dt>
                  <dd className="font-medium">{COMPANY.regon}</dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* FORM */}
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-black/5 bg-[#FAFAF7] p-6 md:p-10">
              <div className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Formularz kontaktowy
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Umów konsultację
              </h2>

              {sent ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-sm leading-relaxed">
                    Otworzyliśmy Twojego klienta poczty z wypełnioną wiadomością.
                    Jeśli się nie pojawił, napisz do nas bezpośrednio na{" "}
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="font-semibold underline"
                    >
                      {COMPANY.email}
                    </a>
                    .
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Imię i nazwisko" name="name" required />
                  <Field
                    label="Telefon"
                    name="phone"
                    type="tel"
                    placeholder="+48 …"
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    className="sm:col-span-2"
                  />
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-black/50">
                      Temat
                    </label>
                    <select
                      name="topic"
                      required
                      defaultValue=""
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm transition-colors focus:border-black focus:outline-none"
                    >
                      <option value="" disabled>
                        Wybierz temat
                      </option>
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-black/50">
                      Wiadomość
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm transition-colors focus:border-black focus:outline-none"
                      placeholder="Opisz projekt, metraż domu, oczekiwania…"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] disabled:opacity-50 sm:col-span-2 sm:w-fit"
                  >
                    {submitting ? "Wysyłanie…" : "Umów konsultację"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[11px] text-black/40 sm:col-span-2">
                    Wysyłając formularz akceptujesz naszą{" "}
                    <Link to="/polityka-prywatnosci" className="underline">
                      politykę prywatności
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-[#0E0E10] px-5 pb-20 pt-4 md:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10">
          <iframe
            title="Mapa: Soltimus Garwolin"
            src={COMPANY.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full"
            style={{ border: 0 }}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContactBlock({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F5B800]/20 text-black">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-black/40">
          {label}
        </div>
        <div className="mt-1.5 text-base font-medium leading-relaxed text-black/85">
          {value}
        </div>
      </div>
    </div>
  );
  if (!href) return content;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="block transition-opacity hover:opacity-70"
    >
      {content}
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[10px] uppercase tracking-[0.22em] text-black/50">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm transition-colors focus:border-black focus:outline-none"
      />
    </div>
  );
}

/* Minimal page header — shared shell pattern, light theme. */
function PageHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link
          to="/"
          aria-label="Soltimus — strona główna"
          className="flex items-center"
        >
          <img
            src={logoLight.replace("white", "white").replace("-white", "")}
            alt="Soltimus"
            className="h-8 w-auto select-none md:h-9"
            draggable={false}
            style={{ filter: "invert(1)" }}
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-black/70 transition-colors hover:text-black"
              activeProps={{ className: "text-black font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${COMPANY.phoneE164}`}
          className="hidden items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-black/80 transition-colors hover:border-black hover:text-black md:inline-flex"
        >
          <Phone className="h-3.5 w-3.5" />
          {COMPANY.phone}
        </a>
      </div>
    </header>
  );
}
