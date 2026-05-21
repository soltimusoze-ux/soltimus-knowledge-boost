# Site Structure Audit — Phase 6

Full information architecture and navigation audit of the public Soltimus
website. Focus: clarity of clickability, removal of dead cards, completeness
of user journeys from discovery → consideration → consultation.

---

## 1. Current public route map

### Top-level marketing
- `/` — homepage (`src/routes/index.tsx`)
- `/oferta` — services hub (`src/routes/oferta.tsx`)
- `/realizacje` — case studies index
- `/realizacje/$slug` — individual case study
- `/wiedza` — Knowledge Hub index
- `/wiedza/$category` — category index
- `/wiedza/$category/$slug` — article
- `/zespol` — team
- `/kontakt` — contact + lead form
- `/kalkulator-pompy-ciepla` — heat pump sizing tool
- `/lab` — Soltimus Lab episode index
- `/lab-episode/$slug` — episode page
- `/polityka-prywatnosci`, `/polityka-cookies`
- `/sitemap.xml`, `/robots.txt`

### Service pages
- `/oferta/pompy-ciepla` — full blueprint (`oferta.$service.tsx` → registry)
- `/oferta/energia` — bespoke route (`oferta.energia.tsx`)
- `/oferta/rekuperacja` — placeholder (NEW — Phase 6)
- `/oferta/termomodernizacja` — placeholder (NEW — Phase 6)
- `/oferta/audyty-energetyczne` — placeholder (NEW — Phase 6)
- `/oferta/serwis` — placeholder (NEW — Phase 6)

### Authenticated / editorial CMS
- `/_authenticated/admin/editorial/*` — gated; not part of public IA.

---

## 2. Intended user journeys

Primary conversion paths the IA must support without dead ends:

1. **Discovery → Service → Consultation**
   `/` → `/oferta` → `/oferta/{service}` → `/kontakt`

2. **Discovery → Service → Calculator → Consultation**
   `/` → `/oferta` → `/oferta/pompy-ciepla` → `/kalkulator-pompy-ciepla`
   → `/kontakt`

3. **Trust → Case study → Service → Consultation**
   `/` → `/realizacje` → `/realizacje/{slug}` → related service / `/kontakt`

4. **Research → Knowledge Hub → Service / Calculator → Consultation**
   `/` → `/wiedza` → `/wiedza/{category}/{slug}` → related service or
   calculator → `/kontakt`

5. **Lab (premium brand) → Service → Consultation**
   `/lab` → `/lab-episode/{slug}` → related service → `/kontakt`

Every public page MUST terminate (visually and structurally) in at least one
of: phone, contact form, or a related service that itself terminates there.

---

## 3. Broken / weak links found

### 🔴 Critical (fixed in Phase 6)
- **Dead service cards on `/oferta`.** Four cards
  (Rekuperacja i klimatyzacja, Audyty energetyczne, Termomodernizacja,
  Serwis i opieka) had no `to` prop — they rendered as static `<article>`,
  not `<Link>`. Hover hint (arrow) was conditional on `s.to` so they did
  not even *look* clickable, yet they sit in a clickable grid alongside
  real links. High user confusion, lost conversions.
- **Missing destinations.** Even if those cards had `to`, the routes
  `/oferta/rekuperacja`, `/oferta/termomodernizacja`,
  `/oferta/audyty-energetyczne`, `/oferta/serwis` did not exist and would
  have rendered the dynamic `oferta.$service.tsx` not-found state.

### 🟡 Medium (fixed in Phase 6)
- **No visible CTA verb on service cards.** Cards relied on a tiny arrow.
  Added `Zobacz usługę →` line + `cursor-pointer` + `focus-visible:ring`.
- **Calculator was an isolated tool.** `/kalkulator-pompy-ciepla` had no
  upstream entry from the heat-pump service page. Added a dedicated
  Calculator promo section on `/oferta/pompy-ciepla` with primary CTA
  `Sprawdź orientacyjny dobór pompy` and a secondary
  `Wolę od razu konsultację` route to `/kontakt`.

### 🟢 Verified OK
- `SiteHeader` `NAV_ITEMS` → all routes exist.
- `SiteFooter` links → consistent with route tree.
- Mobile drawer mirrors header.
- `CaseCTA` → `/kontakt` and `/kalkulator-pompy-ciepla` — valid.
- Related blocks on service pages (`RelatedCaseStudies`,
  `RelatedKnowledgeHub`) resolve slugs via registry — no dangling refs in
  current data.

---

## 4. Fixes applied in Phase 6

1. `src/routes/oferta.tsx`
   - Added `to` prop on every service card → 6/6 cards are real Links.
   - Always-visible `Zobacz usługę →` action label inside each card.
   - `cursor-pointer` + `focus-visible:ring` for keyboard/AT users.
2. `src/components/service/ServicePlaceholder.tsx` (NEW)
   - Reusable, editorially-toned placeholder with hero / scope / process /
     CTA. Avoids the "lorem-ipsum" feeling while the full blueprint pages
     are in production.
3. NEW routes (each with `head()` + breadcrumb JSON-LD):
   - `src/routes/oferta.rekuperacja.tsx`
   - `src/routes/oferta.termomodernizacja.tsx`
   - `src/routes/oferta.audyty-energetyczne.tsx`
   - `src/routes/oferta.serwis.tsx`
4. `src/routes/oferta.$service.tsx`
   - Inserted `CalculatorPromo` section for `slug === "pompy-ciepla"`.
   - CTA copy: `Sprawdź orientacyjny dobór pompy` + secondary
     `Wolę od razu konsultację`.
   - Includes calibration caveat — kalkulator nie zastępuje OZC.
5. `src/routes/sitemap[.]xml.ts`
   - Added 4 new service URLs.

Note: TanStack file-based routing resolves the static
`oferta.rekuperacja.tsx` (and siblings) **before** the dynamic
`oferta.$service.tsx`, so the new placeholders take precedence and the
dynamic route remains reserved for blueprint-driven content.

---

## 5. Recommended structure (validated)

```
/ (home)
├─ /oferta
│  ├─ /pompy-ciepla          ← blueprint (full) + calculator entry
│  ├─ /energia               ← bespoke
│  ├─ /rekuperacja           ← placeholder (Phase 6)
│  ├─ /termomodernizacja     ← placeholder (Phase 6)
│  ├─ /audyty-energetyczne   ← placeholder (Phase 6)
│  └─ /serwis                ← placeholder (Phase 6)
├─ /realizacje/[slug]        ← cross-links to services + /kontakt
├─ /wiedza/[category]/[slug] ← cross-links to services + /kalkulator + /kontakt
├─ /kalkulator-pompy-ciepla  ← terminates in /kontakt
├─ /lab/[slug]               ← cross-links to services
├─ /zespol
└─ /kontakt
```

---

## 6. Remaining content gaps

- **Full blueprint pages** for: rekuperacja, termomodernizacja,
  audyty-energetyczne, serwis. Placeholders are live and conversion-safe
  but lack: problems-we-solve, comparison table, mistakes-to-avoid, FAQ,
  case-study cross-links. Migrate from `ServicePlaceholder` into
  `src/content/services/` registry entries one at a time.
- **Calculator → Consultation handoff.** Today the calculator's result
  page should explicitly link to `/kontakt` with prefilled context
  (heating load, recommended power). Wire after blueprint pages.
- **Case-study → service cross-links** are present on case pages but not
  yet on every related service. Bidirectional linking pass recommended
  when each service gets its blueprint.
- **Knowledge Hub category landing pages** need editorial intro + curated
  service links (currently default listing).

---

## 7. Recommended next pages to build (priority order)

1. `/oferta/rekuperacja` — full blueprint (highest revenue cross-sell with
   pompy ciepła).
2. `/oferta/audyty-energetyczne` — full blueprint (top of funnel, feeds
   every other service).
3. `/oferta/termomodernizacja` — full blueprint (paired with grant /
   dofinansowanie storytelling).
4. `/oferta/serwis` — full blueprint with trust signals (SLA, magazyn
   części, własna brygada).
5. Calculator-result → contact prefill flow.
6. `/wiedza/{category}` editorial intros.

---

## 8. Out of scope for Phase 6 (do not regress later)

- Visual identity / design tokens — untouched.
- No new functionality beyond IA repair and calculator entry-point.
- CMS rendering path (Phase 5B QA item) — still pending.
- Sitemap generation from `cms_*` tables — still pending.
