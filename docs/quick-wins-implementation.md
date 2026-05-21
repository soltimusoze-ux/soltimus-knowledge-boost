# Quick Wins — implementation report

Sprint executed against `docs/premium-ux-audit.md §3`. No UI redesign,
no brand changes. Foundation hardening only.

## 1. Trust & legal — DONE

- **New route `/polityka-prywatnosci`** (`src/routes/polityka-prywatnosci.tsx`) —
  draft GDPR-aligned content with administrator, scope, retention, recipients,
  rights, cookies cross-link. Marked as draft (kancelaria pending).
- **New route `/polityka-cookies`** (`src/routes/polityka-cookies.tsx`) —
  draft documenting necessary / analytics / marketing categories +
  consent storage key. Marked as draft.
- **Footer legal links fixed** — `SiteFooter.tsx` `href="#"` replaced with
  real `<Link to="/polityka-…">`.
- **Cookie consent architecture** —
  - `src/lib/consent.ts`: typed `ConsentState`, `useConsent` hook,
    `getConsent / hasConsented / acceptAll / rejectAll / setConsent`
    helpers backed by `localStorage` key `soltimus.consent.v1` with a
    `soltimus:consent` custom event for live re-render.
  - `src/components/site/CookieConsent.tsx`: non-modal banner,
    `role="dialog"` + `aria-live`, only renders until decided. Mounted
    in `__root.tsx`.
- **Sitemap** extended with both legal routes.

## 2. SEO architecture cleanup — DONE (mechanical pass)

All public route `head()` calls migrated from ad-hoc `meta:[…]` to
`buildMeta({…})` and now ship `BreadcrumbList` JSON-LD:

| Route | `buildMeta` | `BreadcrumbList` | Extra schema |
|---|---|---|---|
| `/` | ✓ (pre-existing) | — (home) | Org + WebSite (root) |
| `/oferta` | ✓ | ✓ | — |
| `/oferta/energia` | ✓ | ✓ | — |
| `/realizacje` | ✓ | ✓ | — |
| `/zespol` | ✓ | ✓ | OG image wired |
| `/kontakt` | ✓ | ✓ | — |
| `/kalkulator-pompy-ciepla` | ✓ | ✓ | — |
| `/wiedza` | ✓ | ✓ | — |
| `/wiedza/$category` | ✓ | ✓ | — |
| `/wiedza/$category/$slug` | ✓ | ✓ | `og:type=article` |
| `/lab` | ✓ | ✓ | — |
| `/lab-episode/$slug` | ✓ | ✓ | `VideoObject` |
| `/polityka-prywatnosci` | ✓ | ✓ | — |
| `/polityka-cookies` | ✓ | ✓ | — |

**Article-level JSON-LD** — the three hardcoded articles
(`wiedza.pompy-ciepla.*.tsx`) already ship inline Article + FAQPage
schema. Left untouched on purpose (they work, scanner verifies, and
they'll be deleted in the Knowledge Hub content-model migration —
refactoring twice is waste).

**Canonical** is emitted exactly once per leaf (via `buildMeta`'s
`links`), never in `__root.tsx`. Verified.

## 3. Design system consistency — partial / scaffolding

- **`src/styles.css`** extended with:
  - `--font-sans`, `--font-display`, `--font-mono` (system stack
    explicitly declared — upgrade path to Inter Tight + Fraunces
    documented in audit).
  - `--space-section`, `--space-section-tight` rhythm tokens.
  - Baseline `html { font-family: var(--font-sans); … }` + smoothing.
  - `output, time, data { font-variant-numeric: tabular-nums }` —
    numeric jiggle on stats removed by default.
  - `:focus-visible` ring on every interactive element.
- **Hex literal migration** — NOT executed wholesale (touches >100
  spots in `PremiumHome.tsx` alone — that's a structural refactor,
  not a quick win). New components (`CookieConsent`, `cta.tsx`,
  legal pages) use `bg-brand-yellow` / `text-brand-ink` /
  `bg-brand-cream` tokens exclusively as the reference pattern.

## 4. Accessibility & performance — DONE for the platform layer

- **`prefers-reduced-motion`** — global `@media (prefers-reduced-motion: reduce)`
  rule in `styles.css` collapses animation + transition duration to
  0.001ms and forces `scroll-behavior: auto`. Defeats framer-motion +
  CSS keyframes site-wide without per-component patching.
- **Focus visibility** — universal `:focus-visible` outline.
- **Mobile perf risks** documented (grain overlay, scroll progress,
  sticky CTA all paint per frame inside `PremiumHome`); left for the
  decomposition sprint.

## 5. Structural cleanup — DONE

- **`/premium` route removed**. The 2,104-line component lives in
  `src/components/home/PremiumHome.tsx`; `src/routes/index.tsx`
  imports it from there. `routeTree.gen.ts` regenerates automatically.
  This kills the duplicate route warning and the conceptual
  "where is the homepage?" confusion.
- **`RecommendedProductsStrip` removed from `__root.tsx`** — no longer
  leaks into `/login`, `/admin/*`, 404, or legal pages. Re-mount
  contextually in marketing routes when the product strip is wanted
  again (deferred — first verify it's still valuable post-decomposition).
- **Reusable CTA primitive** — `src/components/ui/cta.tsx` exposes
  `PrimaryCTA`, `SecondaryCTA`, `UtilityCTA`. Each emits a
  `data-cta="…"` attribute for analytics, supports internal `to=` or
  external `href=`, and bakes the gold-pill / outline-pill / utility
  hierarchy into one place. Migration of existing CTAs is **not**
  done — primitive is ready, sweep happens incrementally.

## What still needs future work

| Area | Reason it's not "quick" |
|---|---|
| Real privacy/cookies copy reviewed by kancelaria | Legal, not engineering |
| Article JSON-LD migrated to `articleSchema()` generator | Articles slated for content-model migration; refactor twice = waste |
| `FAQPage` schema on homepage FAQ section | Lives inside the 2,104-line `PremiumHome.tsx` — wait for decomposition |
| `Product` schema on `/oferta/energia` services | Needs prices/SKUs decision first |
| Per-route OG images | Image generation is its own sprint |
| Editorial font pair (Tiempos / Inter Tight) | Brand decision + perf budget |
| Hex literal sweep across `PremiumHome.tsx` + `oferta.tsx` etc. | High-volume mechanical edit — schedule when touching those files anyway |
| CTA primitive adoption across all routes | Per-route review, not mechanical |
| `RecommendedProductsStrip` re-mounting in marketing routes | Pending product strategy clarification |
| Cookie banner: "Manage preferences" granular UI | Banner ships with accept-all / reject-all only; granular UI in next pass |
| Deferred-script wiring for HubSpot / analytics through `hasConsented(…)` | Activates with HubSpot connector |

## Intentionally postponed (with reason)

1. **Breaking up `PremiumHome.tsx` into section components** — the
   audit's #1 high-impact item, but a multi-day refactor. Out of
   scope for "quick wins"; tracked in audit §4.
2. **Knowledge Hub content model (Supabase `articles` table)** —
   Phase B work in `docs/architecture-overview.md §16`.
3. **`/lab-episode/$slug` → `/lab/$slug` URL rename** — needs a 301
   redirect path; bundle with episode template work.
4. **Vitest scaffolding for `heat-pump-calc.ts`** — tooling sprint.
5. **Real `LocalBusiness` + author `Person` schema** — needs author
   entities that don't exist in data yet.
6. **Removing `/premium` from `STATIC_ARTICLE_REDIRECTS` / any leftover
   `<Link to="/premium">`** — none found in grep; if any internal
   link surfaces, it'll 404 cleanly via root `notFoundComponent`.

## Files changed

**New**
- `src/routes/polityka-prywatnosci.tsx`
- `src/routes/polityka-cookies.tsx`
- `src/lib/consent.ts`
- `src/components/site/CookieConsent.tsx`
- `src/components/ui/cta.tsx`
- `src/components/home/PremiumHome.tsx` (moved from `src/routes/premium.tsx`)
- `docs/quick-wins-implementation.md`

**Edited**
- `src/styles.css` (font stack, tokens, focus, reduced-motion, tabular-nums)
- `src/routes/__root.tsx` (CookieConsent in, RecommendedProductsStrip out)
- `src/routes/index.tsx` (import from new home location)
- `src/components/site/SiteFooter.tsx` (real legal links)
- `src/config/nav.ts` (unchanged — already centralised)
- `src/routes/sitemap[.]xml.ts` (legal routes added)
- `src/routes/oferta.tsx`, `oferta.energia.tsx`, `realizacje.tsx`,
  `zespol.tsx`, `kontakt.tsx`, `kalkulator-pompy-ciepla.tsx`,
  `wiedza.index.tsx`, `wiedza.$category.tsx`, `wiedza.$category.$slug.tsx`,
  `lab.tsx`, `lab-episode.$slug.tsx` (all migrated to `buildMeta` +
  `breadcrumbSchema`)

**Deleted**
- `src/routes/premium.tsx`
