import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import logoDark from "@/assets/soltimus-logo.png";
import logoLight from "@/assets/soltimus-logo-white.png";
import { COMPANY, NAV_ITEMS } from "@/lib/company";

/**
 * Shared site header used on every public marketing page.
 *
 * variant="transparent" — overlays on a dark hero, becomes solid white on scroll (homepage)
 * variant="solid"       — always solid white with bottom border (interior pages)
 */
export function SiteHeader({
  variant = "solid",
}: {
  variant?: "transparent" | "solid";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "transparent") return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const solid = variant === "solid" || scrolled;
  const logo = solid ? logoDark : logoLight;
  const linkColor = solid
    ? "text-black/60 hover:text-black/90"
    : "text-white/75 hover:text-white";
  const phoneColor = solid
    ? "border-black/10 text-black/80 hover:border-black/30 hover:text-black"
    : "border-white/25 text-white/90 hover:border-white/60 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-black/5 bg-white/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:h-[4.5rem] md:px-8">
        {/* LOGO */}
        <Link
          to="/"
          aria-label="Soltimus — strona główna"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="Soltimus"
            className="h-8 w-auto select-none md:h-9"
            draggable={false}
          />
        </Link>

        {/* NAV — desktop */}
        <nav className="hidden items-center gap-8 text-[13px] tracking-[-0.01em] md:flex lg:gap-10">
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className={`group relative py-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${linkColor} ${solid ? "focus-visible:ring-black/20 focus-visible:ring-offset-white" : "focus-visible:ring-white/30 focus-visible:ring-offset-transparent"}`}
              activeProps={{ className: solid ? "text-black" : "text-white" }}
            >
              {({ isActive }) => (
                <>
                  <span className={`relative z-10 ${isActive ? "font-medium" : ""}`}>
                    {n.label}
                  </span>
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.2,1,0.2,1)] ${
                      isActive
                        ? "w-3.5 opacity-60"
                        : "w-0 opacity-0 group-hover:w-3.5 group-hover:opacity-35"
                    }`}
                    aria-hidden="true"
                  />
                </>
              )}
            </Link>
          ))}
        </nav>

        {/* CTA cluster */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${COMPANY.phoneE164}`}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 ${phoneColor}`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">{COMPANY.phone}</span>
          </a>
          <Link
            to="/kontakt"
            className="group inline-flex items-center gap-1.5 rounded-full bg-[#F5B800] px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#FFC629] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Umów konsultację
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Otwórz menu"
          aria-expanded={open}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden ${
            solid
              ? "border-black/10 text-black hover:border-black/25"
              : "border-white/25 text-white hover:border-white/50"
          }`}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-white md:hidden">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/5 px-5">
            <Link to="/" onClick={() => setOpen(false)} aria-label="Soltimus">
              <img src={logoDark} alt="Soltimus" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Zamknij menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition-colors hover:border-black/25"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col px-5 pt-2">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="flex items-center gap-3 border-b border-black/5 py-3.5 text-lg font-light tracking-tight text-black"
                activeProps={{ className: "!font-medium" }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/20" aria-hidden="true" />
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-black/5 p-5">
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 py-3 text-sm font-medium text-black"
            >
              <Phone className="h-4 w-4" /> Zadzwoń
            </a>
            <Link
              to="/kontakt"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B800] py-3 text-sm font-semibold text-black hover:bg-[#FFC629]"
            >
              Konsultacja
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
