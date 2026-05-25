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

---

## Phase 6H — Customer outcomes over technical features

Value/outcome sections on service pages communicate **how a well-designed
energy system changes everyday life**, not which product or spec we install.
The product page lists features; outcome cards translate engineering into
lived experience.

### Emotional engineering principles

1. **Outcomes, not features.** "Bezobsługowość" beats "monoblok R32".
   "Przewidywalne koszty" beats "SCOP 4.6". The technical proof lives
   elsewhere on the page (`technicalAdvantages`, `outcomes` strip).
2. **Five emotional anchors** that map to real homeowner priorities:
   peace of mind, control, comfort, predictability, independence.
   Every outcome card should land on one of them.
3. **No marketing intensifiers.** No "rewelacyjny", no "najlepszy",
   no exclamation marks. The image carries the emotion; the copy stays
   factual and short (one sentence, ≤ 20 words).
4. **Numbers belong on the metrics strip, not on outcome cards.**
   "23 dB", "−70% rachunków" are claims that need evidence; outcome
   cards are about lived experience, not benchmarks.

### Smart-energy UX communication

When showing the smart-energy layer (mySigen-class app, monitoring,
automation), the visual must read as **real software in a real home**:

- Real-looking dashboard with believable metrics (PV production curve,
  battery SOC, heat-pump status, grid import/export).
- Polish-language UI labels.
- Phone held in-hand inside a real Polish interior — never floating
  product render or sci-fi hologram.
- Subtle brand-aligned accent (Soltimus yellow) — never neon or rainbow.

The message is **control + visibility + automation**, not "futurism".

### Visual standards for value / outcome sections

- 4 cards, aspect 4:5, dark gradient overlay (`from-black/90 via-black/40`),
  white title + 75% white description.
- Imagery must be **authentic, architectural, restrained** — Polish
  reality, documentary tone, no stock-photo smiles, no luxury staging,
  no generic HVAC catalogue shots.
- Each card pairs one emotional anchor with one believable visual:
  effortless evening home, smart-energy app in hand, PV + heat pump on a
  real house, calm modern interior with discreet floor heating /
  rekuperator diffuser.
- Copy never names a product brand. The system's brand identity comes
  from the visual treatment, not from logos.

### What to avoid

- Unsplash interiors, smiling families, fake app mockups.
- "Money-saving advertisement" vibes (piggy banks, cash, big arrows down).
- Florida/California luxury references — see `case-study-visual-direction.md`
  for the full Polish-realism rule set.

### “Systems over products” communication principle

The headline and surrounding copy must make one thing unmistakable:
Soltimus designs and installs **integrated living systems**, not devices.

- **Never open with a product category.** “Pompy ciepła” is what the industry
  sells; “nowoczesny komfort” is what the homeowner receives.
- **Lead with the role, not the SKU.** “Projektujemy…” positions engineering
  authority before any hardware is named.
- **Bundle the stack in one sentence.** Ogrzewanie + chłodzenie + energia +
  woda + powietrze = one coherent system. The copy should feel like a single
  design discipline, not a shopping list of installations.

### Anti-sales positioning guidelines

Soltimus copy must feel like a trusted advisor, not a vendor:

1. **No product-first identity.** “Sprzedajemy efekt” is acceptable only when
   it explicitly rejects product-centrism. Prefer “projektujemy systemy”.
2. **No vendor verbs in headlines.** Avoid: sprzedajemy, dostarczamy,
   oferujemy, montujemy (as the lead verb). Use: projektujemy, doradzamy,
   zapewniamy, tworzymy.
3. **No competitor comparison in the hero.** The anti-positioning lives in
   `comparison` and `mistakesToAvoid`, not in the emotional opening.
4. **No urgency or scarcity anywhere.** No countdowns, no “ostatnie miejsca”,
   no seasonal pressure. The tone is calm permanence.
5. **Engineer-first, salesman-second.** If a sentence sounds like it could be
   spoken by a showroom employee, rewrite it as if spoken by a project lead.

### Modern comfort positioning philosophy

The emotional layer of the page should communicate **what life feels like**
inside a Soltimus-designed home:

- **Predictability over savings.** Stable bills matter more than “−70%” claims.
- **Invisibility over spectacle.** The best system is the one nobody notices.
- **Autonomy over luxury.** Independence from fuel deliveries and grid anxiety
  is the premium signal, not marble bathrooms.
- **Timelessness over trends.** The copy should feel as valid in 10 years as
  today. No references to current programmes, deadlines, or political cycles.


---

## Phase 6I — Investor concerns over lifestyle aesthetics

The mid-page section that previously communicated lifestyle ("Komfort,
którego nie słychać") is repositioned as an **engineering-trust layer**.
Visitors enter this section after the inspirational opening; here they
need risk reduction, not more aesthetics.

### Fear → engineering solution → life outcome framework

Each trust card follows a fixed three-beat structure:

1. **Fear** — the real customer concern, written as a quoted sentence in
   the homeowner's own voice ("Co jeśli pompa przestanie działać zimą?").
   Never a marketing pain point. Never a feature gap.
2. **Engineering solution** — what Soltimus actually does about it.
   Concrete: certification, process, partner, infrastructure. Avoid
   adjectives; lead with the mechanism.
3. **Real-life effect** — the lived outcome, not a benchmark. "90% usterek
   usuwanych podczas pierwszej wizyty" beats a vague promise of speed.

Order matters: fear → solution → effect mirrors the reader's own
decision path (worry → evidence → relief). Reversing it sounds like a
sales pitch.

### Trust-building UX principles

- **Quote the fear.** Render the homeowner's concern in quotation marks
  and slightly larger type than the answer. This signals "we heard you"
  before "here is our pitch".
- **Visual hierarchy of evidence.** Solution is anchored by a gold
  vertical rule (engineering authority); effect sits under a hairline
  divider (calm conclusion). Eyebrows in 10px/0.3em uppercase keep the
  card scannable.
- **One brand colour, used sparingly.** A single Soltimus-yellow accent
  per card (dot in the pill, rule under the solution). No multicolour
  iconography, no decorative gradients.
- **Image as context, not decoration.** Each card uses one documentary
  visual that depicts the *moment of trust* (technician in the field,
  engineers reviewing plans, app in hand, finished home at dusk).

### Investor psychology layer

The section answers a single question the buyer is asking silently:
*"Why should I trust this system to actually work well for years?"*

Map the four cards to the four dominant fears of a Polish premium
investor:

| Card                 | Underlying fear        | Emotional payoff       |
| -------------------- | ---------------------- | ---------------------- |
| Serwis 24h           | Breakdown in winter    | Continuity of comfort  |
| Jedna odpowiedzialność | Coordination chaos   | Cognitive offload      |
| Smart energy         | Rising energy prices   | Financial autonomy     |
| Bezobsługowość       | Becoming the operator  | Freedom from the house |

If a future card cannot be assigned a fear in this register, it does not
belong in this section — it belongs in `outcomes`, `technicalAdvantages`,
or `engineeringApproach`.

### Risk-reduction communication strategy

- **Name the risk before the answer.** Naming the fear first disarms it;
  hiding it amplifies it.
- **Specificity over reassurance.** "Autoryzowany Serwis Fabryczny Daikin
  + własny magazyn części" reads as evidence. "Szybki i niezawodny
  serwis" reads as marketing.
- **No fear without a remedy.** Never describe a risk this section cannot
  resolve. The reader must leave each card feeling *handled*, not warned.
- **No competitor naming.** The contrast lives in `comparison`. Here the
  contrast is implicit: this is the standard, not a comparison.

### Engineering authority storytelling rules

- **Lead with the act, not the product.** "Projektujemy i integrujemy"
  beats any device-led headline. The hero of the section is the
  engineering team, not the SKU.
- **Numbers carry weight only when verifiable.** Use percentages and
  hard counts (90%, 24h) — never round adjectives ("najszybciej",
  "najlepszy", "rewelacyjny").
- **The visual must look like work, not like a campaign.** Field
  technicians in real workwear, plans on a folding table, app in a real
  hand at dusk, a home that could exist on a Polish suburban street.
  Anything that reads as a stock-photo set undermines the entire layer.

### What this section is NOT

- Not a lifestyle gallery. No "kawa pachnie świeżym powietrzem".
- Not a metrics strip. dB / kW / SCOP claims belong in `MetricsAndOutcomes`.
- Not a comparison. Industry vs Soltimus framing belongs in `comparison`.
- Not an FAQ. Questions in `<details>` form belong in `FAQSection`.

This section's only job is to convert *aesthetic interest* into
*engineering trust* — so that everything after it (process, FAQ, CTA)
is read by someone who already believes the system will hold for years.

---

## Phase 6K — Human Trust & Engineering Culture Layer

The final trust block before pipeline / CRM automation. It exists to
convert "premium engineering brand" into "real engineering company we
can trust for 15 years."

### Positioning

> "Za tymi realizacjami stoją konkretni ludzie, własny serwis, własny
> showroom i realne doświadczenie."

Soltimus is NOT: anonymous installers, salespeople, lead-gen company.
Soltimus IS: engineering partner, technical advisor, long-term service
company, premium HVAC/OZE engineering team.

### The "People · Infrastructure · Responsibility" section

Required composition (top to bottom):

1. **Eyebrow + headline + intro** — calm, engineering tone. Headline
   names the three pillars (ludzie / zaplecze / odpowiedzialność);
   sub-copy explicitly rejects "pośrednik" / "lead-gen" framing.
2. **HQ hero photo** — team in front of building with SOLTIMUS Energy
   Efficiency + Daikin Salon Partnerski signage. Full-bleed inside the
   container, 16:9, with overlaid caption tying photo to the message
   ("Realna firma. Realny zespół. Realna odpowiedzialność.").
3. **Micro-proof pills** — five short trust signals as pill chips,
   gold dot + text, no icons, no CTAs:
   - Autoryzowany Serwis Fabryczny Daikin
   - Własne ekipy montażowe
   - Ponad 260 opinii Google
   - Showroom i centrum projektowe
   - Jedna odpowiedzialność za cały system
4. **Three pillars grid** — Własne ekipy / Autoryzowany serwis Daikin /
   Jedna odpowiedzialność. Each: short eyebrow, one strong sentence,
   one explanatory sentence. No icons, no buttons.
5. **Restrained founder/team quote** — monochrome, left gold rule.
   Tone: documentary, not slogan. Example: "Najczęściej nie naprawiamy
   pomp ciepła. Naprawiamy błędy projektowe i montażowe innych firm."

### Visual rules

- Dark editorial canvas (#0E0E10), faint white grid overlay.
- Team photo is THE hero of the section — never crop the signage out,
  never overlay marketing badges on top of it.
- No smiling-team stock vibe, no "About Us" feel, no recruitment cards.
- No CTAs inside this section — it sells nothing. Trust only.
- Pills use border `white/12` + bg `white/[0.03]`; pillars use a
  1px-gap grid on `white/10` to read as a single engineering panel.

### What NOT to do

- Do not paste an "O nas" bio onto the homepage.
- Do not show individual portraits here (that's the Team section).
- Do not add awards/logos to the pills row — keep it textual.
- Do not animate the quote; documentary tone requires stillness.

### Asset rule

`src/assets/team/team-hq-soltimus.jpg` is the canonical path. Replacing
the file (same path, same name) swaps the photo across the whole site
without any code change. Photo must show real company signage —
generic team-on-white-background shots break the entire section's job.
