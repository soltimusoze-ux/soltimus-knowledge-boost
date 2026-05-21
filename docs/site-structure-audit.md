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

---

## 9. Phase 6D — Navigation IA Cleanup & Human-Centered Header Evolution

### 9.1 Philosophy

The header was behaving like a generic company-site navigation: seven items,
one of them a utility tool, one a corporate "team" label. We moved toward a
premium engineering platform architecture:

- **Clarity over completeness.** Six primary items max. Every item earns its
  place by being a core pillar of the user journey.
- **Calm authority.** No mega menus, no marketing animations. The nav should
  feel architectural — precise spacing, subtle active indicators, restrained
  typography.
- **Editorial trust.** The Knowledge Hub and Experts are positioned as peer
  assets, not afterthoughts.

### 9.2 Changes applied

#### Removed from primary nav: Kalkulator

**Rationale:** The heat-pump calculator is a contextual decision-support tool,
not a primary platform pillar. It now lives inside:

- `/oferta/pompy-ciepla` — as a prominent yellow tile above the fold
- related Knowledge Hub articles — linked contextually
- CTA sections — "Sprawdź orientacyjny dobór" embedded in conversion paths
- future energy advisory flows

The calculator route `/kalkulator-pompy-ciepla` remains fully functional and
indexed; it simply no longer competes for attention in the top bar.

#### Replaced: Zespół → Eksperci

**Rationale:** "Zespół" is generic corporate language. "Eksperci" supports:

- engineering authority (not "our people", but "our expertise")
- trust (clients consult experts, not teams)
- premium advisory positioning
- educational brand direction (experts teach, teams merely exist)

The route URL remains `/zespol` for SEO stability; the label and page metadata
now read "Eksperci".

#### New header structure (desktop + mobile)

```
Start | Oferta | Realizacje | Strefa Wiedzy | Eksperci | Kontakt
```

Kept intact:
- phone CTA (visible on desktop, hidden label on small viewports)
- consultation CTA button (yellow, rightmost, highest visual priority)

### 9.3 Header UX refinements

| Element | Before | After |
|---------|--------|-------|
| Active state | `font-semibold` only | `font-medium` + centered 2px dot/line below, `opacity-60` |
| Hover state | color opacity shift only | same color shift + dot slides in (`w-0 → w-3.5`, `opacity-0 → opacity-35`) |
| Spacing | `gap-7 lg:gap-9` | `gap-8 lg:gap-10`, slightly tighter text (`text-[13px]`) |
| Mobile active | none | yellow dot (`bg-[#F5B800]`) beside active item |
| Focus | browser default | explicit `focus-visible:ring-2` with color-matched ring |
| CTA button | scale on hover | scale + slight bg lighten (`#FFC629`) |
| Sticky | solid on scroll | slightly more opaque bg (`bg-white/90`) |

### 9.4 Experts page evolution architecture

The `/zespol` page is now positioned as **Eksperci**. Future iterations should
avoid:
- corporate employee directory aesthetics
- LinkedIn-style profile grids
- generic "our team" copy

Instead, the page should feel like:
- engineering experts with verifiable credentials
- trusted advisors for high-stakes decisions
- calm authority without self-promotion
- premium consultancy, not contractor marketplace

Content architecture readiness (for future build):
- expertise areas per expert
- certifications and accreditations (Daikin D1+, UDT, F-Gazy, SEP)
- engineering specializations as tagged taxonomy
- related articles authored by each expert
- related case studies led by each expert
- Soltimus Lab episode appearances
- LinkedIn profiles (optional, not primary)

### 9.5 Future navigation scalability

The current six-item nav is near the upper limit for readable desktop
navigation. If more sections are needed later, recommended patterns:

1. **Dropdown for Oferta:** sub-links to `/oferta/pompy-ciepla`,
   `/oferta/energia`, etc. — only when all service pages are full blueprints.
2. **Footer-only expansion:** Legal pages, career, press — never in primary nav.
3. **Strefa Wiedzy as gateway:** Deep content (calculator deep-dives, policy
   explainers) lives inside the Knowledge Hub, surfaced via search and taxonomy,
   not top-level links.
4. **Eksperci as gateway:** Individual expert profiles, specializations, and
   case-study authorship — all discoverable from the Experts page, not each
   profile in the header.

Do not add a seventh top-level item without removing one first.
