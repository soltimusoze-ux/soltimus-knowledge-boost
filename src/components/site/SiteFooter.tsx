import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logoLight from "@/assets/soltimus-logo-white.png";
import { COMPANY, NAV_ITEMS } from "@/lib/company";

/**
 * Shared site footer used on all public marketing pages.
 * Premium, calm, trustworthy — single source of truth for company data.
 */
export function SiteFooter() {
  const services = [
    { label: "Pompy ciepła", to: "/oferta" as const },
    { label: "Fotowoltaika", to: "/oferta" as const },
    { label: "Magazyny energii", to: "/oferta" as const },
    { label: "Rekuperacja", to: "/oferta" as const },
    { label: "Termomodernizacja", to: "/oferta" as const },
  ];

  return (
    <footer className="bg-[#0E0E10] px-5 pb-10 pt-20 text-white md:px-8 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Link to="/" aria-label="Soltimus — strona główna" className="inline-flex">
              <img
                src={logoLight}
                alt="Soltimus"
                className="h-9 w-auto select-none"
                draggable={false}
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Premium engineering company. Projektujemy i instalujemy nowoczesne
              systemy energii, ogrzewania i komfortu dla wymagających domów.
            </p>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {["Daikin D1+", "UDT", "F-Gazy", "SEP"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-widest text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Kontakt */}
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Kontakt
            </div>
            <address className="mt-4 not-italic text-sm leading-relaxed text-white/80">
              <div className="font-medium text-white">{COMPANY.legalName}</div>
              <div className="mt-1 text-white/70">
                {COMPANY.street}
                <br />
                {COMPANY.postalCode} {COMPANY.city}
              </div>
            </address>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${COMPANY.phoneE164}`}
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{COMPANY.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{COMPANY.email}</span>
              </a>
              <a
                href={COMPANY.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>Otwórz w mapach</span>
              </a>
            </div>
            <div className="mt-5 text-xs text-white/50">{COMPANY.hours}</div>
          </div>

          {/* Nawigacja */}
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Nawigacja
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_ITEMS.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Usługi */}
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Usługi
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s, i) => (
                <li key={i}>
                  <Link
                    to={s.to}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>NIP: {COMPANY.nip}</span>
              <span>KRS: {COMPANY.krs}</span>
              <span>REGON: {COMPANY.regon}</span>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link to="/polityka-prywatnosci" className="hover:text-white">
                Polityka prywatności
              </Link>
              <Link to="/polityka-cookies" className="hover:text-white">
                Polityka cookies
              </Link>
            </div>
          </div>
          <div className="mt-6 text-[11px] text-white/40">
            © {new Date().getFullYear()} {COMPANY.legalName}. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
