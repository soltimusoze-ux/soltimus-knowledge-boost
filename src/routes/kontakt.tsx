import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
  MessageSquare,
} from "lucide-react";
import { COMPANY } from "@/lib/company";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import heroImg from "@/assets/team-konrad.jpg";
import trustImg from "@/assets/team-jarek.jpg";

const CONTACT_EMAIL = "zapytania@soltimus.pl";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Soltimus | Umów konsultację techniczną" },
      {
        name: "description",
        content:
          "Porozmawiaj z zespołem inżynierów Soltimus — pompy ciepła, fotowoltaika, magazyny energii, rekuperacja. Garwolin, tel. +48 500 350 150.",
      },
      { property: "og:title", content: "Kontakt — Soltimus" },
      {
        property: "og:description",
        content:
          "Konsultacja techniczna z zespołem Soltimus. Realni doradcy, realne projekty, realne rozwiązania.",
      },
    ],
  }),
  component: KontaktPage,
});

const TOPICS = [
  "Pompa ciepła",
  "Fotowoltaika",
  "Magazyn energii",
  "Rekuperacja / wentylacja",
  "Termomodernizacja",
  "Dofinansowanie",
  "Serwis",
  "Inne",
];

type SendState = "idle" | "sending" | "ok" | "error";

function KontaktPage() {
  const [state, setState] = useState<SendState>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          phone: String(data.get("phone") || ""),
          email: String(data.get("email") || ""),
          topic: String(data.get("topic") || ""),
          message: String(data.get("message") || ""),
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setState("ok");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#0E0E10]">
      <SiteHeader variant="solid" />

      {/* HERO — cinematic */}
      <section className="relative overflow-hidden bg-[#0E0E10] text-white">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[#0E0E10]/70 via-[#0E0E10]/85 to-[#0E0E10]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#F5B800]">
            Kontakt · Konsultacja techniczna
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            Porozmawiajmy o Twojej{" "}
            <span className="font-light italic text-white/70">inwestycji</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Projektujemy nowoczesne systemy ogrzewania, energii i komfortu dla
            domów, które mają działać niezawodnie przez lata.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#formularz"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B800] px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              Umów konsultację
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Zadzwoń: {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT DATA — editorial cards */}
      <section className="border-b border-black/5 bg-[#FAFAF7] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">
              Dane kontaktowe
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Wybierz dogodny dla siebie sposób.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              eyebrow="Telefon"
              value={COMPANY.phone}
              href={`tel:${COMPANY.phoneE164}`}
              cta="Zadzwoń"
            />
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              eyebrow="Email"
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
              cta="Napisz wiadomość"
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              eyebrow="Biuro / showroom"
              value={
                <>
                  {COMPANY.street}
                  <br />
                  {COMPANY.postalCode} {COMPANY.city}
                </>
              }
              href={COMPANY.mapsUrl}
              external
              cta="Otwórz w mapach"
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              eyebrow="Godziny otwarcia"
              value={COMPANY.hours}
              cta="Odpowiadamy w dniu zgłoszenia"
            />
          </div>

          <div className="mt-10 rounded-2xl border border-black/5 bg-white p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.28em] text-black/40">
              Dane rejestrowe — {COMPANY.legalName}
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-6 text-sm">
              <RegItem label="NIP" value={COMPANY.nip} />
              <RegItem label="KRS" value={COMPANY.krs} />
              <RegItem label="REGON" value={COMPANY.regon} />
            </dl>
          </div>
        </div>
      </section>

      {/* TRUST + FORM */}
      <section
        id="formularz"
        className="px-5 py-20 md:px-8 md:py-28"
        aria-label="Formularz kontaktowy"
      >
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12 md:gap-16">
          {/* HUMAN TRUST */}
          <aside className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-black/5">
              <img
                src={trustImg}
                alt="Doradca techniczny Soltimus"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">
                Realny zespół
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                Nie trafiasz do anonimowego call center.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-black/65">
                Za kontaktem z Soltimus stoją doradcy techniczni, inżynierowie
                i specjaliści, którzy pomagają dobrać rozwiązanie do realnych
                warunków budynku.
              </p>
              <div className="mt-8 flex items-center gap-4 text-sm text-black/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B800]/15 text-[#0E0E10]">
                  <Users className="h-4 w-4" />
                </div>
                <span>Inżynierowie · doradcy · serwis</span>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-black/5 bg-[#FAFAF7] p-6 md:p-10">
              <div className="text-[10px] uppercase tracking-[0.28em] text-black/40">
                Formularz kontaktowy
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Umów konsultację
              </h2>
              <p className="mt-3 text-sm text-black/55">
                Wypełnij krótki formularz — odpowiemy w godzinach pracy biura.
              </p>

              {state === "ok" ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-sm leading-relaxed">
                    Dziękujemy za wiadomość. Zespół Soltimus skontaktuje się
                    z Tobą możliwie szybko.
                  </div>
                </div>
              ) : (
                <>
                  {state === "error" && (
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <div className="text-sm leading-relaxed">
                        Nie udało się wysłać formularza. Spróbuj ponownie lub
                        napisz bezpośrednio na{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="font-semibold underline"
                        >
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </div>
                    </div>
                  )}
                  <form
                    onSubmit={onSubmit}
                    className="mt-8 grid gap-5 sm:grid-cols-2"
                  >
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
                      <label className="text-[10px] uppercase tracking-[0.24em] text-black/50">
                        Temat zapytania
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
                      <label className="text-[10px] uppercase tracking-[0.24em] text-black/50">
                        Wiadomość
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-relaxed transition-colors focus:border-black focus:outline-none"
                        placeholder="Opisz projekt, metraż domu, oczekiwania…"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B800] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] disabled:opacity-60 sm:col-span-2 sm:w-fit"
                    >
                      {state === "sending" ? "Wysyłanie…" : "Wyślij zapytanie"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-[12px] leading-relaxed text-black/45 sm:col-span-2">
                      Twoje zapytanie trafi bezpośrednio do zespołu Soltimus.
                      Odpowiadamy w godzinach pracy biura.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAP / LOCATION */}
      <section className="bg-[#0E0E10] px-5 pb-28 pt-20 text-white md:px-8 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#F5B800]">
                Lokalizacja
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Znajdziesz nas w Garwolinie.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                Zapraszamy do kontaktu telefonicznego, mailowego lub na
                spotkanie po wcześniejszym umówieniu.
              </p>
            </div>
            <a
              href={COMPANY.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm transition-colors hover:bg-white/10 md:self-end"
            >
              <MapPin className="h-4 w-4" />
              {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city}
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <iframe
              title="Mapa: Soltimus Garwolin"
              src={COMPANY.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[460px] w-full"
              style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
            />
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <div className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/95 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] backdrop-blur">
          <a
            href={`tel:${COMPANY.phoneE164}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-medium text-black/80 transition-colors hover:bg-black/5"
          >
            <Phone className="h-3.5 w-3.5" />
            Zadzwoń
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-medium text-black/80 transition-colors hover:bg-black/5"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Napisz
          </a>
          <a
            href="#formularz"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#F5B800] px-3 py-2.5 text-xs font-semibold text-black"
          >
            Konsultacja
          </a>
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  eyebrow,
  value,
  href,
  external,
  cta,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  value: React.ReactNode;
  href?: string;
  external?: boolean;
  cta?: string;
}) {
  const inner = (
    <div className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5B800]/15 text-[#0E0E10]">
        {icon}
      </div>
      <div className="mt-5 text-[10px] uppercase tracking-[0.25em] text-black/40">
        {eyebrow}
      </div>
      <div className="mt-2 text-[17px] font-medium leading-snug text-black/90">
        {value}
      </div>
      {cta && (
        <div className="mt-auto pt-6 text-xs text-black/45 transition-colors group-hover:text-black/80">
          {cta} →
        </div>
      )}
    </div>
  );
  if (!href) return inner;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="block"
    >
      {inner}
    </a>
  );
}

function RegItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.22em] text-black/40">
        {label}
      </dt>
      <dd className="mt-1.5 font-medium text-black/85">{value}</dd>
    </div>
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
      <label className="text-[10px] uppercase tracking-[0.24em] text-black/50">
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
