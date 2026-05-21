import { Link } from "@tanstack/react-router";
import { useConsent } from "@/lib/consent";

/**
 * Cookie consent banner — minimal, premium, non-modal.
 *
 * Renders only until the user has decided. Calls into `@/lib/consent`
 * so downstream features (HubSpot, analytics, embedded video) can
 * check `hasConsented("analytics" | "marketing")` before loading.
 */
export function CookieConsent() {
  const { decided, acceptAll, rejectAll } = useConsent();

  if (decided) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookies"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="text-sm leading-relaxed text-black/75">
          Używamy plików cookies, aby zapewnić podstawowe działanie strony oraz —
          za Twoją zgodą — mierzyć ruch i prowadzić działania marketingowe.
          Szczegóły opisaliśmy w{" "}
          <Link
            to="/polityka-cookies"
            className="underline underline-offset-4 hover:text-black"
          >
            Polityce cookies
          </Link>{" "}
          i{" "}
          <Link
            to="/polityka-prywatnosci"
            className="underline underline-offset-4 hover:text-black"
          >
            Polityce prywatności
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-full border border-black/15 px-4 py-2 text-xs font-medium text-black/80 transition-colors hover:border-black hover:text-black"
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-brand-yellow px-4 py-2 text-xs font-semibold text-brand-ink transition-transform hover:scale-[1.02]"
          >
            Akceptuję wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
