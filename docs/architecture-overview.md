# Soltimus — Architecture Overview

> Living document. Single source of truth for how this codebase is structured today and how it should scale into the full Soltimus engineering platform (additional services, Knowledge Hub, Soltimus Lab, case studies, SEO/GEO ecosystems, HubSpot, lead-gen funnels, calculators, video). Pair with `.lovable/plan.md` (delivery roadmap) and `README.md` (developer onboarding).

---

## 1. Stack & runtime

| Layer | Choice |
|---|---|
| Framework | **TanStack Start v1** (React 19, file-based routing, SSR) |
| Build | **Vite 7** + `@lovable.dev/vite-tanstack-config` |
| Language | **TypeScript strict** |
| Styling | **Tailwind CSS v4** via `src/styles.css` (CSS-first, no `tailwind.config.js`) |
| UI primitives | **shadcn/ui** (Radix) in `src/components/ui/` |
| Data | **TanStack Query** + **Supabase** (Lovable Cloud) |
| Server logic | **`createServerFn`** (TanStack RPC) — **NOT** Supabase Edge Functions |
| Auth | Supabase Auth + `_authenticated` layout gate |
| Deploy | Cloudflare Workers (workerd, nodejs_compat) via Lovable hosting |
| Email | Resend (RESEND_API_KEY configured) |
| External content | Headless WordPress (WP_SITE_URL) for legacy article ingestion |

---

## 2. Repository structure

```text
src/
  assets/                       Static imports (hero imagery, team photos, logos)
  components/
    ui/                         shadcn primitives — DO NOT hand-edit
    site/                       SiteHeader, SiteFooter — global chrome
    heat-pump/                  Calculator-specific widgets + RecommendedProducts
    knowledge/                  Knowledge Hub: CategoryIcon, KnowledgeNav,
                                RelatedVideos, VideoPlayerModal
    team/                       HomepageTeamSection
  config/                       SITE-WIDE configuration (the contract layer)
    site.ts                     URL, name, locale, OG defaults
    brand.ts                    Brand color/font tokens (mirror of styles.css)
    nav.ts                      PRIMARY_NAV + FOOTER_LEGAL
    seo.ts                      buildMeta() — the ONLY way to set head() in routes
  hooks/                        use-auth, use-mobile
  integrations/
    supabase/                   Auto-generated — DO NOT EDIT
      client.ts                 Browser client (publishable key, RLS)
      client.server.ts          Admin client (service role, BYPASSES RLS) — server-only
      auth-middleware.ts        requireSupabaseAuth for server fns
      auth-attacher.ts          Browser → server bearer token bridge
      types.ts                  Generated DB types
    hubspot/                    Connector stubs (no-op until secret is set)
      client.server.ts
      types.ts
  lib/                          Domain logic + server functions
    company.ts                  Legal/contact data (NIP, address, hours)
    jsonld.ts                   schema.org generators
    lead-capture.ts             Forms → CRM abstraction (Supabase + HubSpot mirror)
    heat-pump-calc.ts           Calculator domain logic (pure)
    heat-pump-lead.functions.ts createServerFn for calculator leads
    wp.functions.ts             WordPress data layer (auth required)
    wp-public.functions.ts      WordPress public read layer
    wp.server.ts                WP REST client (server-only)
    knowledge-categories.ts     Knowledge Hub taxonomy
    lab-videos.ts               Lab episode metadata
    video-series.ts             Video series metadata
    error-capture.ts            SSR error normalization
    error-page.ts               Branded 500 page
  routes/                       File-based routing (flat dot-separated)
    __root.tsx                  Shell, sitewide head defaults, providers
    index.tsx                   Home
    oferta.tsx, oferta.energia.tsx
    realizacje.tsx, zespol.tsx, kontakt.tsx
    kalkulator-pompy-ciepla.tsx
    wiedza.index.tsx            Knowledge Hub landing
    wiedza.$category.tsx        Category listing
    wiedza.$category.$slug.tsx  Dynamic article renderer (TS-only today)
    wiedza.pompy-ciepla.*.tsx   Hardcoded article routes (LEGACY — to be migrated)
    lab.tsx, lab-episode.$slug.tsx
    premium.tsx                 LEGACY — to be deleted or redirected
    login.tsx
    _authenticated.tsx          Auth gate layout
    _authenticated.admin.*.tsx  Admin CMS (article/video/PDF creation)
    sitemap[.]xml.ts            Dynamic sitemap server route
    api/public/contact.ts       Public webhook-style contact endpoint
  styles.css                    Tailwind v4 entry + design tokens
  router.tsx                    Router factory
  start.ts                      Client/server middleware registration
  server.ts                     SSR entry with error wrapper
public/
  robots.txt
docs/
  architecture-overview.md      ← you are here
.lovable/
  plan.md                       Delivery roadmap / status
```

---

## 3. Routing

### Conventions
- **Flat dot-separated** files (`wiedza.$category.$slug.tsx`), NOT directory nesting.
- **One `<h1>` per route.** Headings cascade `<h2>` → `<h3>`.
- **Layout routes**: `_authenticated.tsx` is a pathless layout providing auth gating + `<Outlet />` for child admin routes.
- **Dynamic params**: `$category`, `$slug` — typed by generated route tree.
- **Server routes**: under `src/routes/api/public/*` for external callers (webhooks, public APIs). `sitemap[.]xml.ts` uses the `[.]` escape for the literal dot in `/sitemap.xml`.

### Public route map
| Route | Purpose | Notes |
|---|---|---|
| `/` | Home / landing | `buildMeta` ✓ |
| `/oferta` | Services overview | needs `buildMeta` refactor |
| `/oferta/energia` | Energy service pillar | `buildMeta` ✓ |
| `/realizacje` | Case studies | will grow into per-case dynamic route `/realizacje/$slug` |
| `/kalkulator-pompy-ciepla` | Heat pump calculator | first of many calculators |
| `/zespol` | Team | |
| `/wiedza` | Knowledge Hub landing | |
| `/wiedza/$category` | Category index | |
| `/wiedza/$category/$slug` | Dynamic article | target architecture |
| `/wiedza/pompy-ciepla/*` | Legacy hardcoded articles | **migrate to content model** |
| `/lab` | Soltimus Lab landing | |
| `/lab-episode/$slug` | Lab episode | rename → `/lab/$slug` for consistency |
| `/kontakt` | Contact | |
| `/premium` | Legacy | **delete or redirect to `/`** |
| `/login` | Auth | |
| `/sitemap.xml` | Dynamic sitemap | update `STATIC_ENTRIES` per route |
| `/api/public/contact` | Contact endpoint | |

### Authenticated/admin
`/_authenticated/admin/{index,new-article,new-video,new-pdf}` — internal CMS for ingesting Knowledge Hub content. Gated by Supabase session + `_authenticated` layout's `beforeLoad`.

---

## 4. Component map

### Reusable building blocks (now)
- **`components/ui/*`** — 50+ shadcn primitives (Button, Card, Dialog, Form, Sheet, …). Variants via `cva`. Themed via CSS tokens.
- **`components/site/SiteHeader.tsx`** — uses `PRIMARY_NAV` from `config/nav.ts`.
- **`components/site/SiteFooter.tsx`** — legal + nav.
- **`components/heat-pump/RecommendedProducts.tsx`** — sitewide product strip (rendered in `__root.tsx`).
- **`components/knowledge/*`** — `CategoryIcon`, `KnowledgeNav`, `RelatedVideos`, `VideoPlayerModal`.
- **`components/team/HomepageTeamSection.tsx`**.

### Component layers to introduce as we scale
| Layer | Example | When to add |
|---|---|---|
| `components/article/` | `ArticleHero`, `ArticleBody`, `ArticleMeta`, `ArticleTOC`, `ArticleCTA`, `ArticleRelated` | Knowledge Hub migration |
| `components/case-study/` | `CaseHero`, `CaseStats`, `CaseGallery`, `CaseTimeline` | First `/realizacje/$slug` |
| `components/service/` | `ServiceHero`, `ServicePillars`, `ServiceFAQ`, `ServicePricingTable` | Second service page |
| `components/lab/` | `LabEpisodeHero`, `LabTranscript`, `LabChapters` | Lab expansion |
| `components/forms/` | `LeadForm`, `NewsletterForm`, `QuoteRequestForm` | All to call `submitLead()` |
| `components/marketing/` | `FAQSection`, `TestimonialGrid`, `CTABand`, `StatsBand`, `LogoCloud` | Cross-page reuse |
| `components/seo/` | `Breadcrumbs` (renders + emits JSON-LD), `FAQAccordion` (renders + emits FAQPage JSON-LD) | Pair UI with schema |

### Naming convention
- **PascalCase.tsx**, domain-prefixed when section-level: `EnergiaPillarsSection.tsx`, `WiedzaCategoryGrid.tsx`.
- **One responsibility per file.** Section components compose primitives, not other sections.

---

## 5. SEO architecture

### Layers
1. **Sitewide defaults** — `__root.tsx` sets `viewport`, `charSet`, `theme-color`, `og:site_name`, `og:locale`, plus `Organization` + `WebSite` JSON-LD. NO canonical here (TanStack concatenates links).
2. **Per-route meta** — every route's `head()` returns `buildMeta({ title, description, path, type, jsonLd })` from `@/config/seo`. Generates title/desc/og/twitter/canonical + JSON-LD `<script>` tags.
3. **JSON-LD** — `src/lib/jsonld.ts` exposes `organizationSchema`, `websiteSchema`, `articleSchema`, `faqSchema`, `breadcrumbSchema`, `productSchema`. Pass to `buildMeta({ jsonLd: [...] })`.
4. **Crawlers** — `public/robots.txt` (static) + `/sitemap.xml` (`src/routes/sitemap[.]xml.ts`, server-rendered from `STATIC_ENTRIES` + future dynamic article URLs).

### Rules
- **Single `<h1>`** per route.
- **Semantic landmarks** (`<main>`, `<nav>`, `<article>`, `<section aria-labelledby>`).
- **No noindex sitewide.** Use only on admin/draft routes.
- **og:image** at leaf routes only (never `__root.tsx`).
- **Canonical** only on leaf routes via `buildMeta`.

### Scalability for SEO/GEO
- The `buildMeta` contract is the single chokepoint — adding multi-locale (`hreflang`) means extending one helper, not editing every route.
- JSON-LD generators are typed and composable → Article + FAQPage + BreadcrumbList stack on the same page.
- Dynamic content (`$category/$slug`, future `/realizacje/$slug`, `/lab/$slug`) consumes loader data inside `head()` → search engines see fully-rendered metadata on first paint.

---

## 6. Data flow

```text
Browser (component)
   │
   ├─ useSuspenseQuery(queryOptions)        ← TanStack Query
   │       │
   │       └─ queryFn → useServerFn(fn)     ← typed RPC
   │                       │
   │                       ▼
   │              createServerFn handler    (src/lib/*.functions.ts)
   │                       │
   │     ┌─────────────────┼─────────────────┐
   │     ▼                 ▼                 ▼
   │  supabase         supabaseAdmin      external fetch
   │  (RLS as user)    (service role)     (WP REST, HubSpot, Resend)
   │
   └─ Forms ──► submitLead() ──► server fn ──► Supabase + HubSpot mirror
```

### Loader pattern (canonical)
- Public route → loader calls a public server fn (admin-elevated where needed). Public routes MUST NOT call `requireSupabaseAuth`-protected fns from their loader (prerender 401s and fails build).
- Authenticated route under `_authenticated/` → loader can safely call protected server fns; the layout's `beforeLoad` hydrates the session first.
- Component reads via `useSuspenseQuery(queryOptions)` — never `useEffect + fetch`.

### Auth attach
`src/start.ts` registers `attachSupabaseAuth` as global `functionMiddleware` → every browser→server RPC carries the user's bearer token. Server-side `requireSupabaseAuth` validates and injects `{ supabase, userId, claims }` into handler context.

---

## 7. Supabase (Lovable Cloud) integration

### Clients (three trust boundaries)
| Client | Where | Auth | RLS |
|---|---|---|---|
| `supabase` (`client.ts`) | Components, hooks, realtime | Publishable + user session | Respected |
| `auth-middleware` (`requireSupabaseAuth`) | Server fns acting as user | Publishable + bearer | Respected as user |
| `supabaseAdmin` (`client.server.ts`) | Trusted server-only | Service role | **BYPASSED** |

### Current DB state
- **No tables yet** (schema empty per `<supabase-database-schema>`).
- **No storage buckets.**
- **Secrets configured**: `WP_*`, `RESEND_API_KEY`, `LOVABLE_API_KEY`, standard Supabase keys.

### Required schema (next migration batch)
- `leads` — unified lead capture (id, source, payload jsonb, hubspot_synced_at, created_at).
- `articles` — Knowledge Hub long-form (slug, category, title, excerpt, body_md, hero_image, author_id, status, published_at, seo jsonb).
- `lab_episodes` — video metadata (slug, title, description, video_url, transcript, chapters jsonb, published_at).
- `case_studies` — `/realizacje/$slug` (slug, client, sector, summary, body, gallery, metrics jsonb).
- `profiles` — public profile per `auth.users` (never reference `auth.users` from FKs other than `user_id`).
- `user_roles` — separate roles table with `app_role` enum + `has_role()` SECURITY DEFINER function (per project rules — NEVER on profiles).

All tables MUST ship with RLS enabled, policies scoped via `auth.uid()` for writes, and public read paths via admin-elevated `createServerFn` with explicit column projection.

---

## 8. Styling system

### Layers
1. **Tailwind v4** — single entry `src/styles.css`. No `tailwind.config.js`.
2. **Design tokens** in `:root` (oklch): `--background`, `--foreground`, `--primary`, `--brand-yellow`, `--brand-ink`, `--brand-cream`, plus `--gradient-*` and `--shadow-*` composites.
3. **Semantic Tailwind classes** — `bg-brand-yellow`, `text-brand-ink`, `bg-brand-cream`. Hex values live ONLY in `styles.css` + `src/config/brand.ts` (the reference doc).
4. **shadcn variants** via `cva` for component-level theming (e.g. `Button` `variant="premium"`).
5. **Motion** — `framer-motion` for hero-level animation. Respect `prefers-reduced-motion`.

### Rules
- No raw hex in components (legacy hardcodes pending migration).
- No `text-white` / `bg-black` — always semantic tokens.
- Dark/light variants belong in `styles.css`, not component conditionals.

---

## 9. Content architecture

### Today
- **Knowledge Hub articles** = individual route files (`wiedza.pompy-ciepla.*.tsx`). Each duplicates layout shell. **This does not scale past ~10 articles.**
- **Lab episodes** = static metadata in `src/lib/lab-videos.ts` + single dynamic route.
- **Categories** = static taxonomy in `src/lib/knowledge-categories.ts`.

### Target content model
```text
Source of truth: Supabase tables (articles, lab_episodes, case_studies, services)
   │
   ├─ Admin CMS (/_authenticated/admin/*) writes rows
   ├─ Optional WP ingestion (wp.server.ts) backfills legacy articles
   │
   ▼
Public server fn (e.g. getArticleBySlug) — admin-elevated, projects safe columns
   │
   ▼
Dynamic route loader (wiedza.$category.$slug.tsx) ensures query data
   │
   ▼
Component renders MDX-or-rich-text via shared <ArticleBody />
   │
   ▼
head() emits Article + Breadcrumb + (optional) FAQPage JSON-LD from loader data
```

### Migration path
1. Create `articles` table + RLS + public `getArticleBySlug` / `listArticlesByCategory` server fns.
2. Move three legacy article bodies into rows (or `src/content/knowledge/*.ts` as interim TS-only store).
3. Delete hardcoded route files; `wiedza.$category.$slug.tsx` renders everything.
4. Sitemap pulls article slugs dynamically.
5. (Later) Adopt MDX when copywriter joins — body column stores compiled MDX or raw markdown.

---

## 10. Scalability assessment

| Dimension | Current | Risk at 10× scale | Mitigation |
|---|---|---|---|
| Routes | ~25 hand-written | Hardcoded article routes balloon | Dynamic content model (§9) |
| Components | Domain folders + ui/ | Mixed concerns when sections grow | Enforce `components/<domain>/` split + naming convention (§4) |
| SEO | `buildMeta` chokepoint | Multi-locale, hreflang | Extend helper, add `locale` param |
| Data | No tables yet | Schema sprawl, missing RLS | Strict migration discipline + RLS on every table from day one |
| Forms | One-off submissions | Lead leakage, no CRM mirror | Funnel ALL forms through `submitLead()` |
| Styling | Tokens defined, partial adoption | Hex hardcodes drift | Migrate remaining hardcodes, add CI lint |
| Assets | `src/assets/` imports | Bundle bloat on hero imagery | Move large images to Supabase Storage + responsive `<img>` with `loading="lazy"` |
| i18n | None | Hard retrofit | Wrap copy in a `t()` shim early; even a no-op makes later i18n a mechanical pass |

---

## 11. Performance

### In place
- TanStack Start SSR — first paint includes meta + critical HTML.
- Vite 7 code-splitting per route.
- TanStack Query caching + `defaultPreloadStaleTime: 0` baseline.
- Cloudflare Workers edge runtime.

### Next moves
- **Lazy-load** heavy widgets (`kalkulator-pompy-ciepla`, future tools) via `React.lazy` + Suspense.
- **Image discipline**: `loading="lazy"` + `decoding="async"` on all non-hero `<img>`; preload only above-the-fold hero.
- **Bundle audit** once first three articles + Lab are live (`bun run build` → analyze chunks).
- **Defer third-party scripts** (HubSpot tracking, analytics) — load after `requestIdleCallback`.
- **Cache headers** on `/sitemap.xml` and public article fns (server fn response headers).
- **Image CDN** — once Supabase Storage is in use, leverage transform params for responsive sizes.

### Worker runtime constraints (CRITICAL)
- No `child_process`, no `sharp`, no `puppeteer`, no `canvas`. Image transforms must use Supabase Storage transforms or external services.
- All deps must be Worker-compatible (pure JS or WASM). Vet before `bun add`.

---

## 12. HubSpot integration readiness

### Status: stubbed, off
- `src/integrations/hubspot/{client.server.ts,types.ts}` — no-op until `HUBSPOT_API_KEY` (via connector) is set.
- `src/lib/lead-capture.ts` exposes `LeadPayload` + `LeadSource` types and the `submitLead` contract.

### Activation plan
1. Enable HubSpot connector (auto-injects `HUBSPOT_API_KEY`).
2. Implement `submitLead()` body: write to `leads` table → fire-and-forget mirror to HubSpot Contacts + Deals via gateway URL `https://connector-gateway.lovable.dev/hubspot/*`.
3. Refactor every existing form (`kontakt`, `kalkulator`, future `newsletter`) to import `submitLead` instead of bespoke server fns.
4. Add `hubspot_synced_at` + `hubspot_contact_id` columns to `leads` for retry/idempotency.
5. (Optional) Add server route `/api/public/hubspot/webhook` for inbound sync (contact updates, deal stage changes) — with HMAC signature verification.

### Tracking
- Defer HubSpot tracking script (`hs-scripts.com`) to `requestIdleCallback`.
- Respect consent (cookie banner is on the roadmap — see §15).

---

## 13. Knowledge Hub readiness

### Ready
- Taxonomy (`knowledge-categories.ts`), nav (`KnowledgeNav`), video relations (`RelatedVideos`, `VideoPlayerModal`), category routing skeleton (`wiedza.$category.tsx`), dynamic slug route shell (`wiedza.$category.$slug.tsx`), admin authoring routes.

### Missing
- Article persistence layer (table + server fns).
- Shared `ArticleBody` / `ArticleHero` / `ArticleTOC` components.
- Article JSON-LD wired through `buildMeta` (helper exists; not yet used on `$slug`).
- Reading-time, author bio, related-articles algorithm.
- Sitemap pulling article slugs dynamically.
- RSS / Atom feed (optional but cheap once the table exists).

### Open decisions (carried from `.lovable/plan.md`)
- TS-only content store vs Supabase table vs MDX. Recommended path: **Supabase table now**, MDX layer later when content velocity demands it.

---

## 14. Soltimus Lab readiness

### Ready
- `/lab` landing + `/lab-episode/$slug` route, `lab-videos.ts` + `video-series.ts` metadata, `VideoPlayerModal`.

### Missing
- DB-backed `lab_episodes` (transcripts, chapters, guest metadata).
- VideoObject JSON-LD generator (add to `lib/jsonld.ts`).
- Episode list / season groupings.
- Route rename `/lab-episode/$slug` → `/lab/$slug` for URL consistency (use redirect to preserve old links).
- Transcript rendering + chapter deep links (`#t=...`).
- YouTube/Vimeo embed strategy with consent gate.

---

## 15. Risks, technical debt, architectural weaknesses

| # | Issue | Severity | Action |
|---|---|---|---|
| 1 | Hardcoded article routes (`wiedza.pompy-ciepla.*.tsx`) | High | Migrate to dynamic content model (§9, §13) |
| 2 | `/premium` legacy route still in tree | Low | Delete or redirect to `/` |
| 3 | Most `head()` calls not yet using `buildMeta` | Medium | Mechanical refactor pass |
| 4 | No DB schema yet — every table is greenfield | Medium | Land core schema (`leads`, `articles`, `user_roles`) in one migration; RLS enforced |
| 5 | Color hex literals still scattered in components | Low | Migrate to `bg-brand-*` tokens; add CI grep rule |
| 6 | `RecommendedProductsStrip` rendered in `__root.tsx` for every route incl. admin/login | Medium | Move into a marketing-only layout route |
| 7 | `_authenticated.admin.*` flat — will become unwieldy | Medium | Split into `_authenticated/admin/` directory-style as count grows |
| 8 | No automated tests | Medium | Add Vitest for `heat-pump-calc`, `jsonld`, `buildMeta` first (pure functions) |
| 9 | No cookie/consent banner | Medium | Required before HubSpot/analytics scripts ship under GDPR |
| 10 | No 404/500 design polish | Low | Branded variants for `notFoundComponent` + `error-page.ts` |
| 11 | `wp.*` WordPress dependency | Medium | Treat as migration source only; sunset once content lives in Supabase |
| 12 | No i18n primitive | Low now, high later | Wrap copy in `t()` shim early |
| 13 | No structured analytics layer | Medium | Decide GA4 vs Plausible vs PostHog before first paid campaign |
| 14 | OG image strategy = none | Medium | Generate per-route OG images (static for marketing, dynamic for articles via Cloudflare image transform) |

---

## 16. Recommendations — scaling into a premium engineering platform

### Phase A — foundation hardening (1–2 sprints)
1. Land `leads`, `articles`, `lab_episodes`, `case_studies`, `user_roles` migrations with RLS.
2. Refactor all `head()` to `buildMeta`. Wire `articleSchema` + `breadcrumbSchema` on article routes.
3. Migrate legacy articles into `articles` table; delete hardcoded route files.
4. Route ALL forms through `submitLead()`.
5. Delete `/premium`. Move `RecommendedProductsStrip` out of `__root.tsx`.

### Phase B — content engine (2–4 sprints)
6. Build authoring UX in `_authenticated/admin/*` (rich text or markdown, image upload via Supabase Storage, draft/publish workflow, scheduled publishing).
7. Dynamic sitemap pulls article + case-study + lab slugs.
8. `BreadcrumbList`, `FAQPage`, `VideoObject` JSON-LD adopted across content types.
9. Per-route OG image system (cached at the edge).
10. RSS + JSON feed for `/wiedza`.

### Phase C — growth & integrations (2–4 sprints)
11. Activate HubSpot connector; implement lead mirror + contact webhook.
12. Consent banner + deferred tracking scripts.
13. Analytics layer (recommend PostHog for product + marketing in one).
14. A/B test harness for hero/CTA variants (PostHog feature flags).
15. Second + third service pages (`/oferta/fotowoltaika`, `/oferta/rekuperacja`) using `components/service/*` blueprint.

### Phase D — premium polish & platform expansion (ongoing)
16. Motion design pass on hero + section transitions (framer-motion, GSAP if needed).
17. Calculator framework — extract `kalkulator-pompy-ciepla` into a `components/calculator/` engine reused by future calculators (fotowoltaika sizing, ROI, magazyn energii).
18. Case study storytelling template — long-form scrollytelling with metrics, timeline, gallery.
19. i18n (EN) once EU expansion is in scope.
20. Programmatic SEO/GEO landing pages (`/pompy-ciepla/$city`) generated from a `locations` table + reusable `LocationPage` template. Mandatory unique content per page — no thin content.
21. CI: typecheck + Vitest + `bun run build` + Lighthouse budgets on every PR.
22. Observability: Sentry (or equivalent Worker-compatible) for SSR + client errors; Supabase log retention policy.

---

## 17. Cross-references

- **Delivery roadmap & status**: `.lovable/plan.md`
- **Developer onboarding**: `README.md`
- **Brand tokens (reference doc)**: `src/config/brand.ts`
- **SEO contract**: `src/config/seo.ts`
- **JSON-LD generators**: `src/lib/jsonld.ts`
- **Lead capture contract**: `src/lib/lead-capture.ts`
