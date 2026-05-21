import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/company";

interface CTAContent {
  eyebrow: string;
  title: string;
  lead: string;
}

export function CTASection({ cta }: { cta: CTAContent }) {
  return (
    <section className="bg-[#0E0E10] px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          {cta.eyebrow}
        </p>
        <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
          {cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/70">{cta.lead}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            to="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
          >
            Umów konsultację
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${COMPANY.phoneE164}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5"
          >
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
