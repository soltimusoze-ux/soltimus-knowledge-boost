# Editorial CMS Architecture — Soltimus (Phase 5)

A lightweight editorial operating system layered on top of the existing
TanStack Start + Lovable Cloud (Supabase) stack. Built for two things only:

1. **Calm editorial workflow** — write, classify, schedule, publish.
2. **A stable foundation** that can scale into a full content graph
   (articles ↔ case studies ↔ services ↔ Lab episodes) without rewrites.

It is intentionally **not** a generic CMS, not an enterprise admin, and not
a workflow engine. Everything outside that scope is deferred.

---

## 1. Architecture decisions

### 1.1 Storage: Supabase tables, not a third-party CMS

We use Supabase Postgres as the editorial database. Reasons:

- already in the stack (single auth model, single billing surface)
- typed via `src/integrations/supabase/types.ts`
- RLS gives us multi-tenant safety for free if we ever need it
- direct SQL migrations keep schema evolution honest

No headless CMS (Sanity, Contentful, Strapi, Payload) — they would add a
second auth system, a second deployment, and a second source of truth.

### 1.2 Schema

Nine tables (`supabase/migrations/...`):

| Table | Purpose |
|---|---|
| `authors` | Credibility layer — name, role, bio, LinkedIn, credentials |
| `categories` | Top-level taxonomy (sorted) |
| `tags` | Lightweight cross-cutting labels |
| `media_assets` | Catalog of uploaded images + metadata (alt, caption, mime) |
| `cms_articles` | Knowledge Hub articles — body as `jsonb` blocks, SEO/GEO/FAQ fields |
| `cms_case_studies` | Engineering case studies — body, metrics, building profile |
| `article_tags`, `case_study_tags` | Many-to-many tag joins |
| `content_relationships` | Generic `(source_type, source_slug) → (target_type, target_slug)` graph |

Status is a Postgres enum: `draft | scheduled | published | archived`.
Body / FAQ / metrics are `jsonb` so the **block schema can evolve without
migrations**. The block contract is owned by the registry types
(`src/content/articles/types.ts`, `src/content/case-studies/types.ts`) — the
DB stores the same shapes.

### 1.3 Coexistence with the registry-driven content

The existing flagship articles and case studies live in static TypeScript
registries (`src/content/articles/*`, `src/content/case-studies/*`). The CMS
**does not replace** them — it complements them:

- Static registry = canonical, version-controlled, design-system flagship
- CMS = ongoing editorial output that doesn't need a code release

Future step (Phase 6+): a render-time merge layer that lists both sources
behind the same API (`listArticles`, `listCaseStudies`). The block schemas
already match.

### 1.4 RLS posture — single editorial tier

The brief is explicit: *"Do NOT overengineer permissions/roles yet."*

- **Public read** for everything `status = 'published'` (and all reference
  tables: authors, categories, tags, media).
- **Authenticated write** for the editorial team. No role table yet.
- The Supabase linter flags this as "RLS Policy Always True" — that is the
  intended posture for Phase 5 and noted in `<security-memory>`.

When the team grows past a single trusted tier, add a `user_roles` table
with `app_role` enum + `has_role()` SECURITY DEFINER function (pattern
already documented in `<user-roles>`).

### 1.5 Media

A single public Supabase Storage bucket `editorial-media`:

- Public read (so we don't need signed URLs in published HTML).
- Authenticated write/update/delete.
- Files are addressed by `${uuid}.${ext}` to avoid filename collisions and
  cache poisoning.
- Each upload also inserts a row into `media_assets` with mime + dimensions
  + alt — this is what powers the **Media library** UI.

Why one bucket, not per-content: Phase 5 doesn't need access partitioning;
adding more buckets later is a one-migration change.

### 1.6 Admin UI

All admin pages live under `/admin/editorial/*` (separate from the legacy
WordPress-bridge admin at `/admin`). Built directly on the browser
Supabase client + TanStack Query — no server functions yet, because:

- RLS already enforces the rules
- editorial admin is low-volume (one team, low concurrency)
- staying client-side keeps the editor snappy and removes a layer

Server functions will be introduced when we need: scheduled publishing
(cron), revalidation hooks, or HubSpot mirror writes.

---

## 2. Editorial workflow

Operational loop the team follows day-to-day:

1. **Capture** — paste outline / interview notes into a new draft.
2. **Structure** — fill blocks (JSON), excerpt, classification (author +
   category + tags).
3. **Enrich** — add hero/cover from Media, fill SEO + GEO (city/region),
   add FAQ entries.
4. **Link** — attach related content via `content_relationships`.
5. **Schedule or publish** — `status = published` flips the visibility
   bit; `scheduled_for` is the timestamp a future cron will respect.
6. **Iterate** — published items remain editable; updating the body
   automatically bumps `updated_at`.

### 2.1 Draft / publish workflow

| Status | Visibility | Use |
|---|---|---|
| `draft` | Admin only | Work in progress |
| `scheduled` | Admin only (until cron flips it) | Embargoed launch |
| `published` | Public | Live on site |
| `archived` | Admin only | Removed from listings, not deleted |

`scheduled_for` is stored on the row. A future TanStack server function
(or pg_cron) flips matching rows to `published` and sets `published_at`.

---

## 3. SEO / GEO workflow

Each editorial row carries its own SEO surface:

- `seo_title`, `seo_description` — overrides for `<head>`
- `canonical_url` — for syndication, AMP, or duplicate-content safety
- `og_image_url` — share image (separate from cover/hero so editorial can
  optimize for 1200×630)
- `city`, `region` — GEO metadata, used to build `LocalBusiness` /
  area-served schema on rendered pages
- `faq` (jsonb) — used directly for `FAQPage` JSON-LD

Render-time helpers (`src/lib/jsonld.ts`, `src/lib/case-jsonld.ts`) already
exist for the static registries — Phase 6 adds the equivalents that read
from the CMS rows.

**AI-search readiness**: the structured blocks + dedicated FAQ + city/region
fields are exactly what AI Overviews / Perplexity / ChatGPT extract. Keep
FAQs short (1 question, 2-4 sentences), keep blocks scannable, and the
content is GEO-ready by construction.

---

## 4. Media strategy

Today (Phase 5):

- One public bucket
- Manual upload from the editor
- URL pasted into article/case-study fields

Recommended evolution:

1. **Inline media picker** in the body editor (Phase 6) — surfaces the
   Media library inside the block editor; no copy/paste URLs.
2. **Automatic responsive variants** — generate 480/960/1920 widths on
   upload via a server function + `sharp`-free image pipeline (use
   Cloudflare Images or a Workers-compatible WASM resizer, since
   `sharp` is not Worker-compatible per `<server-runtime>`).
3. **AVIF + lazy loading** — defaults on the public site.
4. **Per-asset rights tracking** — add `credit`, `license`, `source_url`
   columns when third-party stock enters the catalog.

---

## 5. Content graph & relationships

`content_relationships` is intentionally generic:

```
(source_type, source_slug)  --[relation]-->  (target_type, target_slug)
```

Supported types so far: `article`, `case_study`, `service`, `lab_episode`,
`faq`. New types are free — no migration needed.

Patterns:

- `article → case_study` (rel: `proves`) — "here's the project that
  proves this article"
- `case_study → service` (rel: `service`) — "service involved"
- `service → article` (rel: `related`) — "deepen your understanding"
- `service → faq` (rel: `faq`) — surface curated questions

This is what powers the "Related" rails on service pages, articles, and
case studies — and it's also the dataset to feed into an embedding-based
recommender later.

---

## 6. Future scaling path

**Phase 6 — Editor experience**
- Block editor (replace the JSON textarea) — Tiptap or Plate, mapped 1:1
  to our block schema.
- Inline media picker
- Slug uniqueness validation + redirect-on-rename table

**Phase 7 — Operations**
- Roles (`editor`, `reviewer`, `admin`) via `user_roles` + `has_role()`
- Versioning (`article_revisions` table, append-only)
- Scheduled publishing (TanStack server fn invoked by Cloudflare Cron or
  Supabase pg_cron hitting `/api/public/cms/run-scheduler`)
- Webhook-driven cache busting / revalidation

**Phase 8 — Integrations**
- **HubSpot mirror** — outbound sync: every `cms_articles` publish event
  also POSTs to HubSpot Blog via the existing
  `src/integrations/hubspot/client.server.ts`. One-way, HubSpot is the
  marketing-automation mirror, Supabase remains source of truth.
- **Soltimus Lab integration** — videos in `lab_episode` registry become a
  first-class CMS entity (`cms_lab_episodes` table) with the same status
  model. Already structurally supported by `content_relationships`.
- **AI authoring assist** — Lovable AI Gateway (`google/gemini-2.5-pro`)
  used inside the editor for: SEO title suggestions, FAQ extraction from
  body, alt-text generation, internal-linking recommendations against the
  content graph.

---

## 7. Constraints & non-goals

- ❌ No multi-tenant
- ❌ No public comments / community features
- ❌ No marketing-page builder (services are still registry-driven)
- ❌ No native rich-text editor in Phase 5 (JSON blocks instead)
- ❌ No multi-language (single locale, Polish)

Each of these is a deliberate "not yet". Adding them later doesn't require
re-thinking the schema.

---

## 8. File map

```
supabase/migrations/<ts>_phase5_editorial_cms.sql   schema + RLS + storage

src/lib/cms.ts                                      typed data layer
src/components/cms/EditorShell.tsx                  page chrome + nav
src/components/cms/StatusBadge.tsx
src/components/cms/ContentEditor.tsx                shared article/case editor

src/routes/_authenticated.admin.editorial.tsx              layout
src/routes/_authenticated.admin.editorial.index.tsx        dashboard
src/routes/_authenticated.admin.editorial.articles.tsx     list
src/routes/_authenticated.admin.editorial.articles.$id.tsx editor
src/routes/_authenticated.admin.editorial.case-studies.tsx     list
src/routes/_authenticated.admin.editorial.case-studies.$id.tsx editor
src/routes/_authenticated.admin.editorial.authors.tsx
src/routes/_authenticated.admin.editorial.categories.tsx
src/routes/_authenticated.admin.editorial.tags.tsx
src/routes/_authenticated.admin.editorial.media.tsx
```
