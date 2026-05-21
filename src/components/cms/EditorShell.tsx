import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Calm editorial workspace shell — used by every CMS page so spacing,
 * typography and section hierarchy stay consistent across the admin.
 */
export function EditorShell({
  title,
  eyebrow,
  description,
  actions,
  children,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 border-b pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1.5">
          {eyebrow && (
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </header>
      {children}
    </div>
  );
}

export function EditorSection({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h2 className="text-sm font-semibold tracking-tight">{title}</h2>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function CmsSidebarNav() {
  const items = [
    { to: "/admin/editorial", label: "Pulpit", exact: true },
    { to: "/admin/editorial/articles", label: "Artykuły" },
    { to: "/admin/editorial/case-studies", label: "Realizacje" },
    { to: "/admin/editorial/authors", label: "Autorzy" },
    { to: "/admin/editorial/categories", label: "Kategorie" },
    { to: "/admin/editorial/tags", label: "Tagi" },
    { to: "/admin/editorial/media", label: "Media" },
  ];
  return (
    <nav className="flex flex-wrap gap-1 rounded-lg border bg-background p-1">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          activeOptions={{ exact: i.exact }}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-foreground [&.active]:text-background"
          activeProps={{ className: "active" }}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
