# Case Study Engine — Soltimus

> Phase 3 of the Soltimus platform architecture. Premium engineering
> case studies as a scalable content system, not a project gallery.

## Goal

Each Soltimus case study must do four things at once:

1. **Sell engineering thinking**, not just the finished installation.
2. **Stand up to scrutiny** of architects, GCs, and other engineers.
3. **Convert** homeowners who recognise themselves in the project profile.
4. **Be machine-scannable** for SEO, AI search, and HubSpot reuse.

The engine described here gives editors a fixed shape to fill in. They
never decide layout, never decide JSON-LD, never decide section order.
That is how we keep the bar high across 50+ future case studies.

---

## Architecture

```
src/content/case-studies/
  types.ts                              # CaseStudy schema (single source of truth)
  index.ts                              # Registry + helpers (listCases, getCase, related)
  pompy-ciepla/
    konstancin-rezydencja-350m2.ts      # Flagship example

src/components/case/
  CaseHero, CaseMetrics, CaseOverview,
  CaseChallenges, CaseApproach, CaseSystem,
  CaseBeforeAfter, CaseTimeline, CaseCommentary,
  CaseLessons, CaseTestimonial, CaseGallery,
  CaseFAQ, CaseRelated, CaseCTA           # Sectional, opinionated, reusable

src/routes/
  realizacje.tsx                          # Index — featured + teasers
  realizacje.$slug.tsx                    # Dynamic case study route

src/lib/case-jsonld.ts                    # CaseStudy → schema.org Article
```

### Why sections, not freeform blocks

Articles use a freeform block array. Case studies are different:
they have a **fixed editorial spine** (overview → challenges → approach →
system → results → commentary → lessons). Forcing every case study to walk
the same spine creates a coherent reading experience across the portfolio
and removes the chance of an editor producing a "thin" study. New section
types must be added to `types.ts` deliberately, not invented on a page.

### Migration path to Supabase

`index.ts` and `types.ts` are the migration boundary. When we move to a
DB-backed editorial workflow:

| DB column      | Source                          |
| -------------- | ------------------------------- |
| `slug`         | `CaseStudy.slug`                |
| `category`     | `CaseStudy.category`            |
| `status`       | `CaseStudy.status`              |
| `payload_json` | the entire `CaseStudy` object   |
| `hubspot_id`   | optional CRM mirror id          |

Consumer API (`listCases`, `getCase`, `getRelatedCases`) does not change.

---

## Reusable patterns

| Component         | Editorial role                                      |
| ----------------- | --------------------------------------------------- |
| `CaseHero`        | Cinematic entry — title, subtitle, location anchor  |
| `CaseMetrics`     | Black metrics strip — "the four numbers that matter"|
| `CaseOverview`    | Profile of obiektu + goals, side-by-side            |
| `CaseChallenges`  | "What we had to solve" cards (engineering depth)    |
| `CaseApproach`    | Narrative paragraphs — premium storytelling tone    |
| `CaseSystem`      | Dark grouped specs (HP / PV / BESS / Automation)    |
| `CaseBeforeAfter` | Comparison table with deltas                        |
| `CaseTimeline`    | Realization phases with durations                   |
| `CaseCommentary`  | Pull-quote engineer voice (E-E-A-T)                 |
| `CaseLessons`     | Transferable takeaways                              |
| `CaseTestimonial` | Privacy-respecting homeowner voice                  |
| `CaseGallery`     | Supplementary photography                           |
| `CaseFAQ`         | FAQ with FAQPage JSON-LD emission                   |
| `CaseRelated`     | Cross-link to related projects                      |
| `CaseCTA`         | Single conversion goal — consultation               |

---

## Storytelling principles

- **Engineering first, marketing second.** Open with the problem and the
  decision, not the brand promise.
- **Calm, premium tone.** No exclamation marks, no superlatives without
  numbers. "−72%" is louder than "incredible savings".
- **Always quantify.** Every claim has a value, a unit, and a measurement
  context (e.g. "32 dB(A) @ 5 m, tryb nocny").
- **Three names, one story.** Goals (homeowner language) → Challenges
  (engineer language) → Approach (engineer-to-engineer language). Each
  audience finds its level on the same page.
- **Protect the homeowner.** First name + initial, never full names,
  addresses, or recognisable photos without consent.

---

## SEO / GEO principles

- **CaseStudy JSON-LD**: emitted as `Article` with
  `articleSection: "Case Study"` (no widely supported `CaseStudy` type
  in schema.org). Stacked with `BreadcrumbList` and optional `FAQPage`.
- **LocalBusiness relevance** is achieved via `about: Place` (city +
  region) on the Article. The route's `og:locality` mirrors this so
  Facebook/LinkedIn previews carry geography.
- **Canonical** lives only on the leaf route (never on `__root.tsx`).
- **Sitemap**: case studies are added dynamically from the registry —
  editors never touch sitemap.xml.

### AI-search optimisation

These are the surfaces AI assistants and snippet engines pull from:

- `metrics` strip → "the four numbers that matter" (scannable headline data)
- `beforeAfter` table → comparison block, easily extracted
- `faq` → FAQPage JSON-LD + scannable Q/A
- `system` groups → structured product/spec data
- `lessons` → transferable conclusions

The renderer keeps headings as real `<h2>`/`<h3>` and tables as real
`<table>` semantics so retrievers do not have to guess structure.

---

## Engineering credibility standards

A case study is shippable when it answers, in evidence, the following
questions. The registry does not enforce this — the editor does — but the
section components exist so each question gets its own home:

1. **Why this system, not a cheaper alternative?** → `CaseApproach` + `CaseChallenges`.
2. **What are the actual specs?** → `CaseSystem` groups.
3. **How do you know it worked?** → `CaseMetrics` + `CaseBeforeAfter`.
4. **What would you do differently?** → `CaseLessons`.
5. **Who designed it?** → `CaseCommentary` with author reference.

If any of these is missing, the case study is not yet a Soltimus case
study — it is a project photo.

---

## Future-proofing

- **Video integration.** Add a `video?: { src, poster, transcript? }`
  field to `types.ts` and a `CaseVideo` component sitting between
  `CaseHero` and `CaseMetrics`. Use the same Lab episode infrastructure
  so studies and episodes cross-link cleanly. Transcript becomes part of
  the indexable body.
- **HubSpot mirror.** `hubspot_id` already reserved in the migration
  contract. When wired, the registry stays the source of truth on the
  marketing site; HubSpot CMS is a downstream consumer (NOT a co-owner).
- **Filtering / search.** `category` + `tags` + `location.region` are
  ready for facet UI on `/realizacje`. The registry can serve faceted
  filtering today; only the UI is missing.
- **Admin workflow.** When the registry moves to Supabase, the existing
  `_authenticated.admin.new-article.tsx` route gives the obvious shape
  for `new-case-study.tsx`. Reuse the auth middleware and types.

---

## What was shipped in Phase 3

- Full content model + registry (`src/content/case-studies/*`).
- 15 reusable section components under `src/components/case/`.
- Dynamic route `/realizacje/$slug` with full SEO + JSON-LD wiring.
- `/realizacje` index now features registry studies above legacy teasers.
- Sitemap is registry-driven for case studies.
- One flagship example: **Konstancin · Rezydencja 350 m²** demonstrating
  every section, every block, and every JSON-LD payload.

## What is intentionally postponed

- Video embeds (waiting on Lab episode unification).
- Facet/filter UI on `/realizacje`.
- Supabase migration of the registry (Phase 4 candidate).
- Admin authoring UI for case studies.
- Multi-language (PL/EN) — content model is locale-agnostic; add a
  `locale` field when the editorial team is ready.
