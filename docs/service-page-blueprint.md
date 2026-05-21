# Service Page Blueprint — Soltimus

> Phase 4 of the Soltimus platform architecture. Premium engineering
> service pages as a scalable, conversion-oriented content system —
> not standard HVAC landing pages.

## Goal

A Soltimus service page must do five things at once:

1. **Educate before selling.** The first thing a visitor learns is how
   we think about the problem, not which product we sell.
2. **Demonstrate engineering authority.** Audit → OZC → projekt →
   uruchomienie → monitoring is the spine, repeated across every service.
3. **Reduce decision anxiety.** Common problems, mistakes to avoid,
   honest comparison, transparent consultation flow.
4. **Convert calmly.** One CTA goal (consultation), shown twice,
   without urgency or scarcity tactics.
5. **Stay machine-scannable.** Service + FAQPage + BreadcrumbList
   JSON-LD, real headings, real tables, no marketing fluff.

The blueprint enforces this shape so every future service page (PV,
BESS, rekuperacja, termomodernizacja) starts from the same standard.

---

## Architecture

```
src/content/services/
  types.ts                        # ServicePage schema (single source of truth)
  index.ts                        # Registry + helpers (getService, listServices)
  pompy-ciepla.ts                 # Flagship example

src/components/service/
  PremiumHero, EngineeringOverview, CommonProblems,
  EngineeringApproach, ProcessTimeline, TechnicalAdvantages,
  MistakesToAvoid, MetricsAndOutcomes, ComparisonSection,
  FAQSection, ConsultationFlow,
  RelatedCaseStudies, RelatedKnowledgeHub, RelatedLabEpisodes,
  CTASection                      # 15 reusable opinionated sections

src/routes/
  oferta.$service.tsx             # Dynamic service route — registry-driven

src/lib/service-jsonld.ts         # ServicePage → schema.org Service
```

`/oferta/energia` keeps its bespoke route for now (static routes win
in TanStack Router). When ready, port it into the registry and delete
the bespoke file. The dynamic route already handles everything else.

### Migration path to Supabase

`index.ts` and `types.ts` are the migration boundary. When we move to a
DB-backed editorial workflow:

| DB column      | Source                          |
| -------------- | ------------------------------- |
| `slug`         | `ServicePage.slug`              |
| `status`       | `ServicePage.status`            |
| `payload_json` | the entire `ServicePage` object |
| `hubspot_id`   | optional CRM mirror id          |

Consumer API (`getService`, `listServices`, `listServiceSlugs`) stays.

---

## Reusable sections (fixed editorial spine)

The order of sections on a service page is NOT decided by the editor.
It is fixed in the dynamic route so every Soltimus service tells the
same story arc: framing → diagnosis → method → proof → process →
honesty → social proof → answers → invitation.

| Component              | Editorial role                                       |
| ---------------------- | ---------------------------------------------------- |
| `PremiumHero`          | Cinematic entry. Eyebrow + H1 + subtitle + 2 CTAs   |
| `EngineeringOverview`  | "What this service actually is" (engineer framing)   |
| `CommonProblems`       | What visitors arrive worried about                   |
| `EngineeringApproach`  | 3–5 numbered decisions = the method                  |
| `MetricsAndOutcomes`   | Black strip — the 4 numbers that matter              |
| `ProcessTimeline`      | 5 phases with realistic durations                    |
| `TechnicalAdvantages`  | Dark grid — Soltimus standard, not generic claims    |
| `ComparisonSection`    | Honest "branżowy vs Soltimus" table                  |
| `MistakesToAvoid`      | Educational — never aggressive toward competitors    |
| `RelatedCaseStudies`   | Cross-link to flagship realizacje                    |
| `RelatedKnowledgeHub`  | Pull deeper learners into long-form content          |
| `RelatedLabEpisodes`   | Video / Soltimus Lab cross-link (optional)           |
| `FAQSection`           | FAQ — AI-search surface, emits FAQPage JSON-LD       |
| `ConsultationFlow`     | 4-step "what happens if you contact us"              |
| `CTASection`           | Single conversion goal — consultation                |

---

## SEO / GEO rules

- **Service JSON-LD** is emitted as `Service` with full Organization
  provider block and `areaServed: "Polska"`. Stacked with
  `BreadcrumbList` and `FAQPage` (when faq is present).
- **Canonical** lives only on the leaf (`/oferta/<slug>`), never on
  `__root.tsx` (TanStack/router#6719).
- **Sitemap** is registry-driven — adding a service file automatically
  adds it to sitemap.xml.
- **OG image** = the hero image. No placeholder OG image. If the
  hero is missing, OG image is omitted (per project SEO rules).
- **Geo expansion**: when local-SEO pages are added (`/oferta/<slug>/<miasto>`),
  add `areaServed: { @type: City, name: ... }` and a Local-pack-ready
  H1 pattern. The registry already supports it via `serviceSchema.areaServed`.

---

## CTA hierarchy

Service pages use a **single conversion goal**: consultation. It is
shown twice — once in the hero (above the fold), once in the final
`CTASection`. The header phone link is the third, ambient channel.

No urgency. No scarcity. No "ostatnie 3 miejsca w lutym". The Soltimus
brand voice cannot survive that tone.

`hero.ctaSecondary` is reserved for an educational path
(calculator, guide, case studies). It must never compete with the
primary CTA — it pulls hesitant visitors deeper into the funnel
instead of dropping them.

---

## Premium storytelling rules

These are the house rules for service-page copy. They mirror the
editorial standards established in `docs/premium-editorial-system.md`
and `docs/case-study-engine.md`:

1. **Lead with the engineering act.** The H1 names the decision, not
   the brand or the product. "Pompa ciepła zaprojektowana, nie dobrana
   z katalogu" beats "Najlepsze pompy ciepła Daikin w Warszawie".
2. **Diagnosis-first `commonProblems`.** Describe what the visitor
   sees / hears / pays — never use a marketing pain point.
3. **`engineeringApproach` as 3–5 decisions.** Each step = one
   decision and the reason it beats the alternative.
4. **Comparison without naming names.** "Standard branżowy" vs
   "Standard Soltimus" — never a competitor's brand.
5. **`mistakesToAvoid` is educational, not accusatory.** The point
   is a more informed inwestor, not a frightened one.
6. **`consultationFlow` is the trust bridge.** Spell out what happens
   after the form — that removes 80% of the click anxiety.
7. **Numbers carry the emotion.** Never use "rewelacyjny",
   "najlepszy", "fantastyczny". No exclamation marks anywhere.

---

## AI-search optimisation principles

Service pages are pulled into snippet engines (Google AIO, Perplexity,
ChatGPT browsing) when they answer crisply. Surfaces that matter:

- `commonProblems` → "why does my heat pump cycle?"-class queries
- `engineeringApproach` → "how does <vendor> install heat pumps?"
- `comparison` → "what is the difference between cheap and premium HP installs?"
- `faq` → direct question-match (FAQPage JSON-LD)
- `outcomes` strip → quantified claim retrieval ("SCOP 4.2–4.8", "30–35 dB(A)")
- `mistakesToAvoid` → "common heat pump installation mistakes"

The renderer keeps real `<h2>`/`<h3>`/`<table>` semantics so retrievers
don't have to guess structure.

---

## Engineering credibility checklist

A service page is shippable when it answers, in evidence:

1. **What problem does this service solve?** → `commonProblems`
2. **How do you approach it differently?** → `engineeringApproach`
3. **What does the process actually look like?** → `processTimeline`
4. **What standard do you hold yourselves to?** → `technicalAdvantages` + `comparison`
5. **What should I avoid in this market?** → `mistakesToAvoid`
6. **What results can I expect?** → `outcomes` + `relatedCaseStudies`
7. **What happens if I contact you?** → `consultationFlow`

If any of these is missing, the page is a brochure, not a Soltimus
service page.

---

## Authoring a new service page

1. Create `src/content/services/<slug>.ts` exporting `service: ServicePage`.
2. Add the import + registry entry in `src/content/services/index.ts`.
3. The dynamic route, sitemap, JSON-LD, breadcrumbs, and section
   layout are now wired automatically. No new route file is needed.
4. Optional: cross-link from `/oferta` index by adding a card with
   `to: "/oferta/<slug>"`.

---

## What was shipped in Phase 4

- Full content model + registry (`src/content/services/*`).
- 15 reusable sectional components (`src/components/service/`).
- Dynamic route `/oferta/$service` with full SEO + JSON-LD wiring.
- `Service` schema generator (`src/lib/service-jsonld.ts`).
- Sitemap is registry-driven for services.
- `/oferta` index now links to `/oferta/pompy-ciepla`.
- One flagship: **Pompy ciepła** demonstrating every section.

## What is intentionally postponed

- Port of `/oferta/energia` (static bespoke route) into the registry.
- Local-pack pages (`/oferta/<slug>/<miasto>`) — content model is
  GEO-ready; only the route + city registry remain.
- Supabase migration of the registry (joint with case-studies in Phase 4B).
- Admin authoring UI for services.
- A dedicated `getEpisode(slug)` Lab lookup so `RelatedLabEpisodes`
  can resolve from slugs (today the component takes pre-resolved data).
- Multi-language (PL/EN) — content model is locale-agnostic.
