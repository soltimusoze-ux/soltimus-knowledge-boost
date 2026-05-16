import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function KnowledgeNav({ trail }: { trail?: { label: string; to?: string }[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          to="/premium"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Soltimus
        </Link>
        <div className="flex items-center gap-5">
          <Link
            to="/wiedza"
            className="text-xs uppercase tracking-[0.25em] text-black/70 hover:text-black"
          >
            Knowledge Hub
          </Link>
          <Link
            to="/lab"
            className="hidden items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-black/70 hover:text-black sm:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C03B3B]" />
            Lab
          </Link>
        </div>
        <Link
          to="/premium"
          hash="kontakt"
          className="hidden rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black/85 md:inline-flex"
        >
          Konsultacja
        </Link>
      </div>
      {trail && trail.length > 0 && (
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 pb-3 text-[11px] uppercase tracking-[0.2em] text-black/40 md:px-8">
          {trail.map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-black/20">/</span>}
              {t.to ? (
                <Link to={t.to} className="hover:text-black">
                  {t.label}
                </Link>
              ) : (
                <span className="text-black/70">{t.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
