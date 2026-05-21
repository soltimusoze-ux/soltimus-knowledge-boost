# Soltimus — Marketing & Knowledge Hub

Production-grade marketing site built on TanStack Start v1 (React 19, Vite 7,
TypeScript strict, Tailwind v4) with Lovable Cloud (Supabase) for forms,
authentication, and the admin-managed Knowledge Hub.

## Repository layout

```text
src/
  assets/                 Static imports (logos, team photos, hero imagery)
  components/
    ui/                   shadcn primitives — do not edit by hand
    site/                 SiteHeader, SiteFooter, layout chrome
    heat-pump/            Calculator-specific widgets
    knowledge/            Knowledge Hub article + listing widgets
    team/                 Team section
  config/                 Site-wide configuration (see below)
    site.ts               URL, name, defaults
    brand.ts              Brand colour/font tokens (references)
    nav.ts                Primary + footer navigation
    seo.ts                buildMeta() helper for every route head()
  hooks/                  Reusable hooks (use-auth, use-mobile)
  integrations/
    supabase/             Auto-generated — DO NOT edit
    hubspot/              Connector stubs (activated when key is set)
  lib/                    Pure domain logic + server functions
    company.ts            Legal/contact data (NIP, address, hours)
    jsonld.ts             schema.org generators (Article, FAQ, Product…)
    lead-capture.ts       Lead submission abstraction (forms → CRM)
    heat-pump-*.ts        Calculator domain
    wp.*.ts               Knowledge Hub data layer
  routes/                 TanStack file-based routing
    __root.tsx            Sitewide head + providers
    sitemap[.]xml.ts      /sitemap.xml server route
    api/public/*          Webhooks and public APIs
  styles.css              Tailwind v4 entry + design tokens
public/
  robots.txt
```

## Conventions

- **Components**: `PascalCase.tsx`. Section-level components named
  `<Domain><Purpose>Section.tsx` (e.g. `EnergiaPillarsSection.tsx`).
- **Files in `lib/`, `config/`**: `kebab-case.ts`.
- **Hooks**: `use-<thing>.ts(x)`.
- **Colours**: use semantic Tailwind classes (`bg-brand-yellow`,
  `text-brand-ink`, `bg-brand-cream`). Hex values live only in `styles.css`
  and `src/config/brand.ts`.
- **Headings**: exactly one `<h1>` per route. Sections use `<h2>`,
  sub-blocks `<h3>`.
- **SEO**: every public route's `head()` returns `buildMeta({ ... })` from
  `@/config/seo`. Canonical and og:url are computed for you. Never set a
  canonical in `__root.tsx`.
- **JSON-LD**: pass schemas through `buildMeta({ jsonLd: [...] })` using
  generators from `@/lib/jsonld`.

## Adding a new page

```tsx
// src/routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";
import { buildMeta } from "@/config/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    buildMeta({
      title: "O nas",
      description: "Krótki opis strony.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return <main>…</main>;
}
```

Then add the URL to `src/routes/sitemap[.]xml.ts` and (if it belongs in the
main nav) to `src/config/nav.ts`.

## Adding a new Knowledge Hub article

Articles currently live as dedicated route files under
`src/routes/wiedza.<category>.<slug>.tsx`. The long-term plan is to move them
into `src/content/knowledge/*.ts` and let `wiedza.$category.$slug.tsx` render
from there — see `.lovable/plan.md`.

## Lead capture

All forms call `submitLead()` from `@/lib/lead-capture`. The persistence
path writes to Supabase today; the HubSpot mirror activates automatically
once the connector secret is set (see `src/integrations/hubspot/`).

## Backend

Lovable Cloud (Supabase). Server logic lives in TanStack `createServerFn`
(see `src/lib/*.functions.ts`). Do not add Supabase Edge Functions.

## Sitemap & robots

- `public/robots.txt` — static.
- `/sitemap.xml` — served by `src/routes/sitemap[.]xml.ts`. Update its
  `STATIC_ENTRIES` array when adding or removing public routes.

## Local development

```bash
bun install
bun dev
```

The Lovable preview runs the same dev server. Builds and typechecks run
automatically on every change.
