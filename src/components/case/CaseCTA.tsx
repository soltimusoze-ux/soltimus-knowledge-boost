import { PrimaryCTA, SecondaryCTA } from "@/components/ui/cta";

export function CaseCTA() {
  return (
    <section className="border-t border-black/5 bg-black px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Twój projekt
        </div>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-tight">
          Twój dom zasługuje na ten sam standard.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Zaprojektujemy system energetyczny dopasowany do Twojej rezydencji —
          od audytu, przez dobór, po monitoring po uruchomieniu.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PrimaryCTA to="/kontakt" trackingId="case-study-cta-contact">
            Umów konsultację inżynierską
          </PrimaryCTA>
          <SecondaryCTA
            to="/kalkulator-pompy-ciepla"
            trackingId="case-study-cta-calc"
            className="border-white/25 text-white hover:border-white"
          >
            Sprawdź kalkulator pompy ciepła
          </SecondaryCTA>
        </div>
      </div>
    </section>
  );
}
