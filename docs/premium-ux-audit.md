# Soltimus — Premium UX & Platform Audit

> Snapshot audit of the current build. Pair with `docs/architecture-overview.md` (structure/scalability) and `.lovable/plan.md` (delivery roadmap). Audit lens: premium engineering company × clean-energy technology brand × expert media platform × future educational ecosystem. No UI changes were made — this is diagnosis, not surgery.

---

## 0. TL;DR

Soltimus already feels considerably more premium than the Polish clean-energy peer set: cinematic homepage rhythm, restrained palette (graphite + Soltimus gold + cream), credentialed footer, real team faces, and a working calculator. The brand reads **boutique-premium**, not commodity-installer.

The gaps are not visual — they are **structural**: a 2,117-line monolithic homepage, content that lives in code (not a CMS), heading hierarchy that drifts, no per-route JSON-LD beyond Organization/WebSite, no breadcrumbs, no real case-study layer, and a Knowledge Hub whose articles are hardcoded route files. For a marketing site these are tolerable; for the **expert media platform + educational ecosystem** Soltimus wants to become, they are the ceiling.

**Headline numbers**
- Public routes: ~17 — adequate for marketing, thin for a "media platform".
- Homepage component size: **2,117 LOC in one file** (`premium.tsx`) — the single biggest scalability risk.
- Knowledge Hub articles: 3, each as a hand-coded route — does not scale past ~10.
- JSON-LD coverage: Organization + WebSite only. Zero Article / Breadcrumb / FAQ / VideoObject in production.
- Per-route `head()` via `buildMeta`: 2 of ~17 routes. Rest use ad-hoc `meta` arrays.
- Forms unified through `submitLead()`: 0 of N.
- Lighthouse-style risks: large hero, framer-motion + scroll handlers + grain overlay everywhere, no lazy import on calculator.

---

## 1. Homepage structure

The homepage (`PremiumHome` in `src/routes/premium.tsx`, imported by `/`) is a 25-section cinematic scroll: ScrollProgress → GrainOverlay → Hero → PartnerTicker → ComfortStrip → ModernLivingManifesto → SocialProofStats → LifestyleGallery → Team → HowWeWork → CinematicQuote → WhySoltimus → CaseStudies → BehindTheScenes → TrustAwards → VideoHub → KnowledgeHub → Testimonials → FinalCTA → StickyMobileCTA.

**Strengths**
- Strong narrative arc: aspiration → proof → people → process → philosophy → proof again → conversion. This is editorial-grade pacing rare in the segment.
- Trust artifacts surface early (partner ticker after hero) and late (TrustAwards before CTA) — classic conversion structure.
- Real team photography and case studies, not stock + lorem.

**Weaknesses**
- **Single 2,117-LOC file** — every section is anonymous to the rest of the app. CaseStudies, Team, KnowledgeHub on the homepage cannot be reused by `/realizacje`, `/zespol`, `/wiedza` without copy-paste.
- **Section count borders on overload.** 25 sections compete for the same attention budget; some (BehindTheScenes, LifestyleGallery, CinematicQuote, ComfortStrip) overlap thematically and could merge.
- **No clear primary conversion path.** Calculator, "Umów konsultację", phone, and contact form all compete with equal weight. Premium engineering brands typically funnel to **one** primary CTA.
- **Film grain + scroll progress + sticky CTA + parallax** stack — each is fine; the sum risks "tries too hard" on second visit.

---

## 2. Navigation clarity

`NAV_ITEMS` drives `SiteHeader` + `SiteFooter` from one source. Header is transparent-over-hero on home, solid white elsewhere — correct pattern.

**Strengths**
- Single source of truth for nav (`src/lib/company.ts` / `src/config/nav.ts`).
- Mobile drawer is full-screen, generous tap targets, escape via close button.
- Phone CTA + "Umów konsultację" persistently in header.

**Weaknesses**
- "Strefa Wiedzy" label is fine for SEO but slightly buried — for a future media platform, treat **Wiedza** + **Lab** as first-class destinations with their own visual treatment in the nav.
- No mega-menu / no sub-nav for "Oferta" — five services (pompy ciepła, fotowoltaika, magazyny, rekuperacja, termomodernizacja) all collapse to one link.
- Header has **no active-state visual weight** on solid-light variant (just `font-semibold`); easy to miss which page you're on.
- Mobile drawer items are large but lack the secondary "Wiedza →" / "Lab →" depth signals.
- "Konsultacja" CTA in header is `bg-[#F5B800]` hardcoded — design token discipline gap.

---

## 3. Premium brand perception

**Strengths**
- Restrained palette (graphite #0E0E10, Soltimus gold #F5B800, cream #FAFAF7) — disciplined, not corporate-bland.
- "Premium engineering company" copy in footer + "Inżynierski projekt indywidualny" in partner ticker do real brand work.
- Cinematic quote sections + film grain + selection color = thoughtful texture.
- Real team photography elevates the brand above the installer category instantly.

**Weaknesses**
- Trust badges in footer rendered as `[10px] uppercase tracking-widest` chips — reads slightly generic. Premium peers use either fewer/larger badges or a dedicated certifications band.
- "Premium" is **asserted** ("Premium engineering company"), not **demonstrated** through process artifacts (sketches, CAD snippets, simulations, monitoring screenshots). The visual pieces are there; the engineering-evidence layer is missing.
- Inconsistent typography weight in CTA chips vs. headlines (font-semibold body + font-light XL headlines) — the contrast works but isn't codified.

---

## 4. Engineering authority perception

**Strengths**
- Calculator (`/kalkulator-pompy-ciepla`) is a real authority artifact — most competitors fake one.
- Footer cert chips (Daikin D1+, UDT, F-Gazy, SEP) are correct trust signals.
- Knowledge Hub categories taxonomy exists (`knowledge-categories.ts`).

**Weaknesses**
- **No technical depth on the homepage.** No system schematic, no efficiency curve, no real performance numbers, no monitoring dashboard mock. "Engineering" is a label, not yet shown.
- Articles read marketing-first; no equations, no graphs, no source citations, no "engineer's note" sidebar.
- No "Tools" / "Resources" hub — engineers gain authority by giving away utilities (sizing tables, comparison tools, downloadable PDFs).
- No co-author / author bios with credentials on articles.

---

## 5. Visual hierarchy

**Strengths**
- H1 / H2 sizes follow editorial typography (large light → smaller medium).
- Generous whitespace, cream backgrounds break dark sections cleanly.
- Section labels (small caps, `tracking-[0.25em]`) provide consistent anchor cues.

**Weaknesses**
- The homepage likely emits **multiple `<h1>` candidates** across stacked hero/manifesto/quote sections — needs an audit pass (target: exactly one `<h1>` per route).
- Sub-sections sometimes use `<div>` + class for what should be `<section aria-labelledby>` — landmark structure is loose.
- CTAs share visual weight with section titles in places (FinalCTA, Hero) — eye doesn't know where to land.

---

## 6. CTA structure

**Strengths**
- Persistent phone + "Umów konsultację" in header.
- Sticky mobile CTA — correct for the device that converts.
- Final CTA section before footer.

**Weaknesses**
- **No CTA hierarchy.** Calculator, contact, phone, consultation are all rendered as equal-weight pills. Define one **primary** ("Umów konsultację" or "Zacznij od kalkulatora"), one **secondary**, and one **utility** (phone) — and enforce it everywhere.
- CTAs lack microcopy that lowers commitment ("15 min · bez zobowiązań · darmowa wycena").
- No exit-intent / scroll-depth CTA variant.
- Calculator completion doesn't visibly hand off to a lead form — the conversion bridge is weak (verify in flow audit).

---

## 7. Readability

**Strengths**
- Line length ~ 60–75ch in body copy.
- Calm contrast (graphite on cream / white on graphite).
- Generous paragraph spacing.

**Weaknesses**
- Light-weight large display headlines on cream → contrast is fine but **glanceability** suffers on lower-quality screens.
- Body copy size on article routes is closer to 15px than the editorial 18–19px premium publications use.
- No measured reading-time indicator on articles.

---

## 8. Content flow

**Strengths**
- Homepage flow is genuinely cinematic.
- Service → calculator → contact is a plausible journey.

**Weaknesses**
- **No cross-linking discipline.** Articles don't link back to relevant services; services don't link to relevant articles; case studies don't link to either. SEO and AI search both punish this.
- No "Next step" component at the end of articles / case studies.
- No editorial pillars connecting homepage Knowledge Hub strip → category → article → product → CTA in one coherent flow.

---

## 9. Trust-building structure

**Strengths**
- Real team faces (huge, often underrated).
- Partner ticker with Daikin D1+, UDT, F-Gazy.
- "5.0 ★ · 263+ opinii Google" signal.
- Legal block in footer (NIP, KRS, REGON, registered address).

**Weaknesses**
- Google reviews count is a **string**, not a live data feed — first credibility crack the moment a competitor builds it real.
- No real client logos / project map / heat map of realizations.
- No video testimonials, only quote testimonials.
- "Polityka prywatności" and "Polityka cookies" footer links are `href="#"` — **broken**. Killer trust failure for a company asking for personal data via forms.
- No cookie consent banner — regulatory + trust risk before HubSpot/analytics activate.

---

## 10. Mobile UX

**Strengths**
- Mobile drawer is full-screen with large tap targets.
- Sticky mobile CTA covers the conversion need.
- Type scales down sensibly.

**Weaknesses**
- Homepage scroll length on mobile is **long** (25 sections). Bounce risk between scroll positions 50–80%.
- Calculator on mobile not verified in this audit pass — risk of cramped inputs.
- `h-screen` rather than `h-dvh` may cause iOS Safari address-bar jumps in hero (verify in code grep).
- Grain overlay + scroll progress + sticky CTA all paint on every frame → potential jank on low-end Android.

---

## 11. Responsiveness

**Strengths**
- Breakpoints follow Tailwind defaults; `md:` and `lg:` used consistently in header/footer.
- Grid collapses to single-column cleanly in footer.

**Weaknesses**
- No tablet-specific testing target (768–1024) — likely "ok" but never proven.
- Inconsistent max-width (`max-w-7xl` in header/footer vs. ad-hoc widths inside section components).
- Image assets imported directly (`@/assets/team-*.jpg`) — no responsive `<picture>` / `srcset` strategy.

---

## 12. Section spacing consistency

**Weaknesses**
- Vertical rhythm varies (`py-20`, `py-24`, `py-28`, `pt-20 pb-10`) — needs a spacing token (`--space-section`, `--space-section-tight`).
- Different sections inside `premium.tsx` use different horizontal padding patterns (`px-5 md:px-8` vs. `px-6`).

---

## 13. Typography consistency

**Weaknesses**
- No font stack declared in `src/styles.css` — defaults to system. For a premium brand this is a missed opportunity; a deliberate pair (e.g. **Söhne / Inter Tight** + **Tiempos / Fraunces**) would carry significant premium weight at near-zero engineering cost.
- Font weights mix `font-light`, `font-medium`, `font-semibold` without a documented scale.
- No tabular-numerals on stats (`SocialProofStats`) — numbers jiggle as they count up.

---

## 14. Component consistency

**Strengths**
- shadcn primitives in `components/ui/*` provide a stable kernel.
- Header/Footer are single-source.

**Weaknesses**
- Homepage sections live **inside** `premium.tsx` — not as components — so `<CaseStudies />`, `<Team />`, `<KnowledgeHub />`, `<Testimonials />`, `<HowWeWork />` cannot be reused on `/realizacje`, `/zespol`, `/wiedza`, `/oferta`. This is the single biggest component-consistency issue.
- Two parallel patterns for buttons: shadcn `Button` + hand-rolled `Link` with Tailwind classes. Should converge on `Button` variants (`premium`, `outline-on-dark`, `pill-cta`).
- Color hex literals (`#F5B800`, `#0E0E10`, `#0089CF`) still in components despite `bg-brand-*` tokens being available.

---

## 15. SEO structure

**Strengths**
- `noindex, nofollow` sitewide bug already removed.
- Organization + WebSite JSON-LD in root.
- Dynamic `/sitemap.xml` route exists.
- `buildMeta` helper with canonical-on-leaf-only correctly modelled.
- `robots.txt` present.

**Weaknesses**
- `buildMeta` used on only **2 of ~17 routes**. The rest still hand-roll `meta` arrays (homepage included, via `premium.tsx`).
- **No `Article` JSON-LD** on the three Knowledge Hub articles → losing rich-results eligibility.
- **No `BreadcrumbList` anywhere** → losing breadcrumb SERP feature.
- **No `FAQPage`** on FAQ sections (homepage + service pages) → losing FAQ rich results.
- **No `Product` schema** on `oferta.energia` despite specific service offerings.
- Sitemap only enumerates static routes — won't auto-include articles once they move to DB.
- No OG images per route → social cards look generic.
- Article URLs use the `wiedza/<category>/<slug>` pattern which is fine, but no internal "related articles" graph yet.

---

## 16. Semantic hierarchy

**Weaknesses**
- Likely multiple `<h1>` and skipped levels in `premium.tsx` (audit needed — too long to verify line-by-line here).
- Section components use `<div>` + visual title rather than `<section aria-labelledby="...">` + `<h2 id>`.
- No `<main>` audit — verify exactly one per route.
- `<address>` used correctly in footer ✓.
- Decorative SVG ticker and grain overlay correctly `aria-hidden` ✓.

---

## 17. AI-search readiness (GEO)

This is increasingly the **highest-leverage** SEO surface (ChatGPT, Perplexity, Gemini, Google AI Overviews).

**Strengths**
- Real engineering language and Polish-specific terms (Mój Prąd, Czyste Powietrze, F-Gazy, UDT) — exactly what AI engines extract as authority signals.
- Calculator output is genuinely citable.

**Weaknesses**
- **No FAQPage JSON-LD** — AI engines lean heavily on Q&A schema for direct-answer extraction.
- **No HowTo** schema on calculator / installation flow.
- **No Speakable schema** for content suitable for voice.
- **No structured author entities** (no Person schema with sameAs LinkedIn / professional registries) — AI engines weigh authorship heavily for E-E-A-T.
- **Articles lack TL;DR / key-takeaway blocks** in the first 200 words — AI engines extract those preferentially.
- No `llms.txt` (emerging convention) declaring crawl preferences for LLM crawlers.

---

## 18. Knowledge Hub readiness

**Strengths**
- Taxonomy + nav + video relations + admin authoring routes exist.
- Dynamic `$category/$slug` shell exists.

**Weaknesses**
- Articles are **hardcoded route files**, not data. Three articles ≈ ceiling unless migrated.
- No shared `ArticleHero` / `ArticleBody` / `ArticleTOC` / `ArticleMeta` components → every new article forks layout.
- No author entity, no published/updated dates rendered, no reading time, no related articles.
- No RSS / JSON feed.
- No category landing pillar content (categories should be 1,500-word pillar pages, not just listings).

---

## 19. Premium storytelling quality

**Strengths**
- "Filozofia Soltimus" cinematic quote section is rare and effective.
- `BehindTheScenes`, `LifestyleGallery`, `ModernLivingManifesto` are deliberate editorial moves.
- Team section is humanizing.

**Weaknesses**
- Storytelling stops at the homepage. Service pages and articles drop to standard marketing register.
- No long-form **case-study format** with hero, metrics dashboard, system diagram, before/after, owner quote.
- No founder / engineer-led narrative ("Why we build this way") — premium engineering brands always have one.
- Quote attribution is anonymous ("Filozofia Soltimus") — attributing to a real engineer would 10× the credibility.

---

## 20. Conversion flow quality

**Path A — Homepage → Calculator → Lead**
- Likely the strongest path. Verify the calculator's final screen explicitly bridges into a contact form rather than leaving the user to find `/kontakt`.

**Path B — Homepage → Knowledge → Service → Lead**
- Currently broken: articles don't link into services, services don't have inline calculators, no contextual lead capture inside content.

**Path C — Phone**
- Strong: phone is persistent in header + sticky mobile CTA.

**Weaknesses**
- No mid-page lead magnets (downloadable "Heat pump sizing guide PDF" with email gate, etc.).
- No abandonment recovery (calculator state isn't saved; if a user leaves and returns, they restart).
- No A/B harness — every CTA tweak is a guess.

---

## 21. Emotional perception of the brand

What the current site likely makes a high-intent visitor *feel*:

| Emotion | Triggered by | Sustained? |
|---|---|---|
| Curiosity | Cinematic hero, partner ticker | ✓ |
| Trust | Team faces, certs, "1000+ realizacji" | Partly — undermined by `href="#"` legal links |
| Aspiration | LifestyleGallery, ModernLivingManifesto | ✓ |
| Safety | "Inżynierski projekt indywidualny", warranty language | Implicit — needs an explicit warranty/process band |
| Authority | Calculator, certs | Stops at homepage — articles don't reinforce |
| Belonging | Team, BehindTheScenes | ✓ on home, absent elsewhere |

The dominant brand emotion is **calm aspiration with technical reassurance** — the right register. Just not yet consistent past the homepage.

---

## 22. Technical UX weaknesses

- `premium.tsx` is 2,117 LOC — any change risks regressions across 25 sections.
- `RecommendedProductsStrip` renders inside `__root.tsx` → shows on `/login`, `/admin/*`, 404 pages. Should be marketing-layout-only.
- `useEffect` setting global `scrollBehavior: "smooth"` on the html element from a homepage component is a side-effect leak.
- Grain overlay + scroll progress are sitewide-feeling but live inside the homepage component — they vanish on other routes, breaking continuity.
- No code-splitting on the calculator (heavy widget shipped in every route's bundle if hoisted to root layout components).
- Animations don't respect `prefers-reduced-motion`.
- WordPress dependency (`wp.*`) for legacy article fetch is a hidden runtime + auth surface.
- No automated tests; `heat-pump-calc.ts` is pure and untested — easy regression vector for a numeric tool.

---

## 23. Scalability limitations

Already enumerated in `docs/architecture-overview.md §10 & §15`. UX-impacting subset:

- Each new service page = a fork of `oferta.energia.tsx` until `components/service/*` blueprint exists.
- Each new article = a new file in `src/routes/wiedza.<category>.<slug>.tsx` until the data model lands.
- Each new lab episode = an edit to `src/lib/lab-videos.ts`.
- Each new case study = no template at all (`/realizacje` is currently a list with no detail route).
- Adding EN locale = global refactor (no i18n primitive).
- Adding cookie consent = blocks HubSpot tracking activation.

---

## Findings — synthesized

### 1) Strengths
1. Disciplined premium palette and editorial typography.
2. Cinematic homepage rhythm that genuinely differentiates from the installer category.
3. Real team photography and credentialed footer.
4. Working calculator — rare in this segment.
5. Strong technical foundation (TanStack Start SSR, TypeScript strict, design tokens, sitemap, helper-based SEO).
6. `buildMeta` + `jsonld.ts` + `submitLead` contracts already designed (even if under-adopted).
7. Knowledge Hub admin routes exist — authoring layer is closer than it looks.
8. Sitewide noindex bug already eliminated.

### 2) Weaknesses
1. Monolithic 2,117-LOC `premium.tsx` blocks reuse and increases regression risk.
2. Knowledge Hub articles are hardcoded routes — content layer is not yet a layer.
3. JSON-LD coverage limited to Organization/WebSite (no Article, Breadcrumb, FAQ, Product, VideoObject).
4. `buildMeta` adopted on only 2 of ~17 routes.
5. Broken legal links in footer (`href="#"`) — trust failure.
6. No cookie consent / no privacy policy / no cookies policy pages.
7. CTA hierarchy is flat — no single primary conversion path.
8. No case-study detail route; no service-page blueprint; no article components.
9. No author entities, no published dates, no reading time → weak E-E-A-T.
10. No font stack declared → defaults to system, leaving premium credit on the table.
11. Color hex literals still in components despite tokens existing.
12. Animations don't respect `prefers-reduced-motion`.
13. `RecommendedProductsStrip` leaks into admin/login/404.
14. No automated tests on the calculator (pure function, easy win).
15. No analytics layer decided.

### 3) Quick wins (≤1 day each, no UI redesign)
1. **Fix `href="#"` legal links** — create stub `/polityka-prywatnosci` and `/polityka-cookies` pages (even placeholder content) and wire footer.
2. **Move `RecommendedProductsStrip`** out of `__root.tsx` into a marketing-layout component.
3. **Refactor remaining 15 `head()` calls to `buildMeta`** — pure mechanical pass.
4. **Add `BreadcrumbList` JSON-LD** to every non-home route via a single helper invoked from `buildMeta`.
5. **Add `Article` + `FAQPage` JSON-LD** to the three existing articles.
6. **Migrate color hex literals** to `bg-brand-yellow` / `text-brand-ink` / `bg-brand-cream`.
7. **Declare a font stack** in `styles.css` — even a font-display Inter Tight + Fraunces pair via `<link>` preconnect is a major perception upgrade.
8. **Add `prefers-reduced-motion` guard** around framer-motion variants + grain overlay.
9. **Add `tabular-nums`** to the counting stats.
10. **Delete `/premium` route** (or 301 to `/`) — `index.tsx` already re-uses the component.
11. **Add a real OG image** for `/`, `/oferta`, `/wiedza`, `/kontakt` (generate once, reference statically).
12. **Add `lang="pl"` audit** on `<html>` (already set ✓ — verify after edits).
13. **Add Vitest** with one test for `heat-pump-calc.ts` to lock the math.

### 4) High-impact improvements (1–3 sprints)
1. **Break up `premium.tsx`** into `components/home/*` section components. Side-effect: those sections become reusable on `/realizacje`, `/zespol`, `/wiedza`.
2. **Knowledge Hub content model** — `articles` table + `getArticleBySlug` + `<ArticleHero />` `<ArticleBody />` `<ArticleTOC />` `<ArticleMeta />` `<ArticleRelated />`. Migrate 3 hardcoded articles. Delete their route files.
3. **Case-study detail route** `/realizacje/$slug` with metrics dashboard, system schematic placeholder, before/after, owner quote, related service + article links.
4. **Service-page blueprint** `components/service/*` (Hero, Pillars, ProcessTimeline, FAQ, PricingBand, RelatedArticles, InlineCalculator, FinalCTA). Re-skin `/oferta/energia` as the reference implementation.
5. **Unify all forms through `submitLead()`**; activate HubSpot mirror.
6. **Cookie consent banner** + deferred third-party scripts.
7. **Define CTA hierarchy** in `components/ui/cta` — `PrimaryCTA`, `SecondaryCTA`, `UtilityCTA` — and ban ad-hoc CTAs in PR review.
8. **Calculator → lead bridge**: last calculator screen IS the contact form, not a link to it. Persist state in `sessionStorage` for abandonment recovery.

### 5) Premium UX opportunities
1. **Editorial typography pair** (e.g. Tiempos Headline + Inter Tight) — single biggest perception delta available.
2. **Custom cursor + cursor states on cinematic sections** (subtle, dot + label on case-study cards).
3. **Audio-on / muted hero video** showing a real installation, not stock.
4. **Owner-named warranty** ("12-year Soltimus Engineering Warranty" with a person's signature graphic).
5. **System schematic micro-illustrations** in articles and service pages — drawn line art, not stock icons.
6. **Quiet metrics dashboard** on case studies: kWh saved, % efficiency, payback time — animated once on scroll.
7. **Branded loading + page-transition** (subtle gold sweep), not the default flash.
8. **"Engineer's Note" sidebar** in articles — short, signed annotations by a named engineer.
9. **Limited-availability framing** on consultation slots ("4 free engineering consultations / month") — premium scarcity, not pressure.

### 6) SEO / GEO opportunities
1. **`Article`, `FAQPage`, `BreadcrumbList`, `HowTo`, `Product`, `VideoObject`, `Person` (authors), `LocalBusiness`** JSON-LD coverage.
2. **City × Service programmatic pages** (`/pompy-ciepla/$city`) generated from a `locations` table with unique local-context content — mandatory anti-thin-content rules per page.
3. **Pillar-page rewrite** for each Knowledge Hub category landing (1,500–2,500 words, internal links to 6–10 articles).
4. **Internal link graph audit** — every article links to 2 services + 2 related articles + 1 case study.
5. **Dynamic sitemap** pulls article + case-study + lab slugs once DB-backed.
6. **`hreflang` + EN locale** when EU expansion is in scope.
7. **Image SEO**: descriptive filenames, `alt` discipline, `srcset`, AVIF where supported.
8. **Per-route OG images** generated at the edge (Cloudflare Image Resizing).
9. **`/sitemap_index.xml`** once article counts grow past 1,000.
10. **Real `Reviews` schema** wired to a live Google reviews source — not a static "5.0 ★".

### 7) AI discoverability opportunities
1. **TL;DR block** at the top of every article (50–80 words, plain prose, no marketing language).
2. **`FAQPage` + `HowTo`** schema everywhere applicable — AI engines reward Q&A and step-by-step.
3. **`Person` schema** for authors with `sameAs` LinkedIn / OSWBI (Polish builder registry) / industry credentials.
4. **`Speakable`** annotations on summary sections.
5. **`llms.txt`** at the root declaring preferred crawl + citation policy.
6. **Structured data on the calculator output** (`HowTo` + `QuantitativeValue`) so AI engines can quote concrete numbers.
7. **Citable engineering claims** with `<cite>` + source links (manufacturer datasheets, EU directives, Polish standards PN-EN…). AI extractors privilege content with citations.
8. **Glossary route** (`/wiedza/slownik`) with `DefinedTerm` schema — AI engines harvest glossaries heavily.
9. **Comparison tables** (Soltimus vs. category averages) — directly answered queries.
10. **Consistent entity naming** ("Soltimus sp. z o.o.") across all pages → strengthens Knowledge-Graph linking.

### 8) Trust-building opportunities
1. **Fix `href="#"` legal links** (critical).
2. **Add cookie consent + real privacy policy** (regulatory).
3. **Real Google reviews integration** (or embed verified Trustpilot / Opineo widget).
4. **Project map / heat-map of realizations** ("Where we've worked" — 1,000+ pins).
5. **Video testimonials** from named clients.
6. **Public engineering case studies** with names, photos, addresses (with permission), and measured outcomes.
7. **Warranty page** as a first-class route (`/gwarancja`) with the actual document downloadable.
8. **Press / media-mention strip** if any exist (or build them: pitch industry press).
9. **Founder / engineer LinkedIn profiles** linked in author bios.
10. **Service area map** with clear honest boundaries (premium = niche = scoped).

### 9) Future scalability recommendations
*(detailed plan lives in `docs/architecture-overview.md §16`)*
- **Foundation hardening**: break up `premium.tsx`; land core schema (`leads`, `articles`, `case_studies`, `lab_episodes`, `user_roles`); refactor all `head()` to `buildMeta`; unify forms through `submitLead()`.
- **Content engine**: admin authoring UX, dynamic sitemap, per-route OG images, RSS, full JSON-LD coverage.
- **Growth & integrations**: HubSpot connector, consent banner, analytics (PostHog recommended), A/B harness, two more service pages from a reusable blueprint.
- **Premium polish & platform**: motion design pass, calculator framework for multiple tools, scrollytelling case-study template, i18n (EN), programmatic SEO/GEO landing pages, CI with typecheck + Vitest + Lighthouse budgets, Sentry-equivalent observability.

---

## Audit ledger (suggested ownership)

| Area | Owner | First action |
|---|---|---|
| Homepage decomposition | Frontend | Extract `<Hero/>`, `<Team/>`, `<CaseStudies/>`, `<KnowledgeHub/>` from `premium.tsx` into `components/home/*` |
| Content model | Backend + Frontend | `articles` migration + `getArticleBySlug` server fn + render shell |
| SEO coverage | Frontend | `buildMeta` mechanical refactor pass + breadcrumb helper |
| Trust / legal | Content | Privacy + cookies pages + consent banner |
| Brand polish | Design | Editorial font pair + spacing token |
| Tooling | Platform | Vitest + Lighthouse CI + Sentry-equivalent |

---

*End of audit. Next recommended step: triage Quick Wins §3 in a single sprint, then start Knowledge Hub content model in parallel with `premium.tsx` decomposition.*
