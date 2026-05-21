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

## Phase 3B — Flagship engineering case studies

Two additional flagships were added to validate the engine across very
different storytelling axes:

- **Stacja paliw · Sigenergy 18 kWh** (`magazyny-energii/stacja-paliw-ciaglosc-zasilania`)
  — operational continuity for a B2B obiekt, NOT "battery installation".
  Axis: diagnosis → selective backup → voltage stabilization.
- **Dom 2003 · naprawa źle dobranej pompy** (`pompy-ciepla/dom-2000-naprawa-instalacji-daikin`)
  — engineering correction after a failed install. Axis: audit → OZC →
  electrical safety → properly designed Daikin Altherma 3. Calm,
  educational, never aggressive toward competitors.

### Storytelling patterns that worked

These are now the house rules for every future flagship:

1. **Lead with the engineering act, not the product.** The first sentence
   of `subtitle` should name the decision (e.g. "Magazyn energii jako
   warstwa stabilizująca napięcia"), never the brand.
2. **Diagnosis-first `challenges`.** Every challenge card describes the
   measurement or audit finding that revealed the problem — not a
   marketing pain point. Numbers in the body, not adjectives.
3. **`approach` as a 3–5 decision chain.** Each paragraph = one
   engineering decision and the reason it beat the alternative. This is
   what separates a case study from a project description.
4. **`metrics` strip as "the four numbers a skeptic would ask for".**
   Pick metrics where "before" is honestly bad and "after" is honestly
   measured. Never use a vanity metric (e.g. "satisfaction").
5. **`engineerCommentary` as a counter-marketing voice.** At least one
   pull-quote that names the trade-off, not the win. This is the single
   highest E-E-A-T signal in the format.
6. **`lessons` as transferable rules.** Written so another engineer
   could apply them tomorrow — not as case-specific anecdotes.
7. **`faq` as the AI-search surface.** Every Q is phrased as a search
   query a homeowner / facility manager would actually type. Every A
   starts with the answer, not a preamble.

### Reusable structures that proved their value

- **B2B continuity studies** reuse the same spine as residential studies
  — `building` is repurposed as `obiekt komercyjny` profile, `goals` as
  operational goals. No new components were needed.
- **Recovery / correction studies** benefit from a denser `challenges`
  block (4 items instead of 3) and a longer `approach` (4–5 paragraphs).
  The fixed spine still holds.
- **`beforeAfter` works as the central trust device** in correction
  studies — when "before" is genuinely dangerous (melted insulation,
  ≈19 500 kWh/yr), the table does more work than any prose paragraph.

### Rules for future case studies

- Never name a competitor or a previous installer. Describe the
  installation, not the people. ("Poprzednia jednostka", not "firma X".)
- Never use exclamation marks. Never use "rewelacyjny", "fantastyczny",
  "niesamowity", "najlepszy". Numbers carry the emotion.
- Always include at least one `engineerCommentary` pull-quote that
  reframes the project as an engineering decision.
- Always include `beforeAfter` for correction / recovery studies and
  for B2B continuity studies. For new-build studies, `beforeAfter`
  becomes "scenariusz referencyjny vs zrealizowany".
- For homeowner privacy: first name + initial maximum. For B2B obiekts
  without consent for full disclosure: "Właściciel obiektu" + region
  level location ("Mazowsze"), never city + street.

## Phase 3C — Infrastructure-scale & human-centered flagships

Two more flagships extended the engine into axes the first three did not
cover: community-scale infrastructure and human-centered modernization
with public funding.

- **Osiedle 252 mieszkań · pompy gruntowe + 12 km odwiertów**
  (`kompleksowa/osiedle-252-mieszkania-pompy-gruntowe`)
  — całkowita transformacja źródła ciepła dla wspólnoty po przymusowym
  odłączeniu od sieci zakładu przemysłowego. Axis: utrata dostawcy →
  audyt + bilans EED → 120 odwiertów × 100 m → kaskada N+1 → 6
  niezależnych węzłów → dokumentacja Grant OZE (50% netto).
- **Dom z lat 70. · głęboka termomodernizacja + Daikin + PV**
  (`termomodernizacja/dom-lat-70-gleboka-termomodernizacja`)
  — modernizacja dla 80-letniego właściciela. Axis: ocieplenie koperty
  → dobór pompy pod nowe (niższe) zapotrzebowanie → modernizacja
  grzejników pod 45–55 °C → PV → „Czyste Powietrze" 70%.

### New storytelling patterns introduced

1. **Infrastructure-scale spine.** Studies obejmujące wiele budynków lub
   całą społeczność dodają piąty wymiar do `approach` (redundancja,
   bilans 25-letni, rozdzielona dystrybucja). `building` jest używane
   jako profil zbioru obiektów, nie pojedynczego domu — pole `occupants`
   wówczas oznacza populację, nie domowników.
2. **Funding decyzja jako jeden z kroków `approach`.** Dokumentacja pod
   program dofinansowania (Grant OZE, Czyste Powietrze) prowadzona jest
   równolegle z projektem technicznym i opisywana jako osobna decyzja
   inżynierska — nie marketingowy dopisek. Bez tego traci się dostęp do
   programu lub wydłuża projekt o miesiące.
3. **Human-centered framing bez sentymentu.** Komfort właściciela
   wyrażony przez metryki operacyjne ("0 codziennych czynności obsługi",
   "brak otwartego ognia", "stabilność temperatury"), nie przez emocje.
   To samo źródło E-E-A-T co inżynierskie pull-quotes.
4. **Bezpieczeństwo jako oddzielny wiersz `beforeAfter`.** W projektach
   wymagających modernizacji elektryki, c.o. lub źródła ciepła starszej
   generacji bezpieczeństwo (brak czadu, RCD, brak ryzyka pożaru sadzy)
   staje się jednym z mierzalnych wierszy tabeli — nie tłem.

### Infrastructure-scale case study standards

- Pole odwiertów / dolne źródło opisuj jako **infrastrukturę**, nie
  urządzenie. Zawsze podaj długość łączną, liczbę odwiertów i horyzont
  bilansu cieplnego (typowo 25 lat).
- Architektura źródła musi nazwać **redundancję** (N+1) i **rozdzielenie
  dystrybucji** (węzły per budynek). To jest właściwa odpowiedź na
  pytanie "co się stanie, gdy coś się zepsuje" — i jednocześnie
  najsilniejszy signal infrastrukturalnego myślenia.
- `timeline` ma minimum 6 faz — wiercenie pola, dokumentacja programu,
  uruchomienie i pierwszy sezon walidacyjny są fazami osobnymi.
- W `metrics` przynajmniej jedna liczba musi opisywać skalę
  infrastruktury (np. "12 km dolnego źródła", "252 mieszkania"), nie
  tylko parametr techniczny.

### Human-centered modernization standards

- Otwieraj projektem dla **człowieka**, nie dla domu. "80-letni
  właściciel, dla którego codzienna obsługa kotła stała się fizycznie
  trudna" jest właściwą jednostką problemu.
- Zawsze osadź pompę ciepła **w kontekście termomodernizacji**. Wymiana
  źródła bez ocieplenia koperty jest błędem inwestycyjnym — i ta zasada
  ma być powtórzona w `approach`, `lessons` i `faq`.
- Privacy: pierwsza litera imienia, region (nie miasto + ulica). Nigdy
  zdjęcia rozpoznawalne bez zgody.
- Komfort wyrażaj **operacyjnie** ("0 codziennych czynności obsługi",
  "stabilna temperatura", "brak otwartego ognia"), nie sentymentalnie.

### Grant / dofinansowanie storytelling principles

- Dofinansowanie opisuj jako **decyzję projektową**, nie marketingowy
  dopisek. Trafia do `approach` jako jeden z kroków, do `metrics` jako
  jedna z czterech liczb, do `faq` jako oddzielne pytanie.
- Zawsze podaj **program po nazwie** ("Grant OZE", "Czyste Powietrze")
  i poziom wsparcia (np. 50% netto, do 70% kosztów kwalifikowanych) —
  nigdy "dofinansowanie unijne" bez referencji.
- Nigdy nie obiecuj kwoty — wsparcie jest indywidualne i zależy od
  kryteriów programu. Pisz "do X%" / "X% kosztów kwalifikowanych".
- Dokumentacja pod program prowadzona jest **równolegle** z projektem
  technicznym, nie po nim. Ta zasada powinna być w `lessons`.

### Future community / developer project recommendations

- Dla **wspólnot i deweloperów** powiel architekturę dolne źródło
  gruntowe + kaskada N+1 + rozdzielona dystrybucja per budynek +
  dokumentacja programu — sprawdziła się od kilkunastu mieszkań w górę.
- Dla **właścicieli prywatnych z niskim dochodem** standardem powinien
  być pakiet: audyt → termomodernizacja → pompa dobrana pod nowe
  zapotrzebowanie → modernizacja grzejników → PV → "Czyste Powietrze"
  w wariancie najwyższego wsparcia.
- Następne flagshipowe kategorie do uzupełnienia: **deweloper
  mieszkaniowy** (PV + BESS część wspólna), **obiekt użyteczności
  publicznej** (szkoła, ośrodek zdrowia), **kompleksowa modernizacja
  budynku biurowego** (HVAC + BMS + PV).

## Phase 3D — Premium lifestyle energy independence

Sixth flagship extending the engine into **lifestyle-driven engineering** —
where technology serves the homeowner's habits, rituals and emotional
connection to the home, rather than forcing adaptation to the technology.

- **Nowy dom · elastyczne ogrzewanie hybrydowe: kominek + pompa ciepła**
  (`kompleksowa/dom-nowy-hybryda-kominek-pompa-ciepla`)
  — dom nowej budowy dla właścicieli prywatnego lasu, którzy cenią rytuał
  ognia i często podróżują. Axis: kominek jako emocyjne centrum domu →
  bufor 500 l jako pamięć termiczna → priorytet źródeł (kominek → pompa) →
  tryb nieobecności jako rozszerzenie normalnej pracy → redukcja kosztów
  ≈ −40% dzięki darmowemu drewnu.

### Lifestyle-driven storytelling patterns

1. **Lead with the homeowner, not the product.** W pierwszym zdaniu `subtitle`
   powinien pojawić się człowiek i jego styl życia, nie urządzenie.
   "Kominek jako emocyjne centrum domu" jest lepsze niż "System Daikin
   Altherma 3 z buforem".
2. **Technology serves lifestyle, never replaces tradition.** Każda decyzja
   inżynierska musi być uzasadniona rytmem życia właściciela: rytuał palenia,
   częste nieobecności, darmowe drewno, pragnienie prostoty. Technologia jest
   niewidocznym wsparciem, nie bohaterem.
3. **Emotional layer is data, not sentiment.** Komfort emocjonalny wyrażaj
   przez metryki operacyjne: "0 interwencji podczas wyjazdu", "płynne
   przejście między źródłami", "jeden przycisk po powrocie". Nigdy nie
   opisuj uczuć właściciela — opisuj system, który je umożliwia.
4. **`approach` jako łańcuch decyzji zorientowanych na człowieka.** Każdy
   akapit odpowiada na pytanie: co właściciel potrzebuje, i dlaczego ta
   decyzja inżynierska mu to daje. Nie "wybraliśmy bufor 500 l", tylko
   "bufor 500 l pozwala magazynować ciepło z jednego palenia przez 24–36 h,
   więc właściciel nie musi palić codziennie".
5. **`beforeAfter` jako porównanie filozofii, nie tylko parametrów.** W
   studiach lifestyle kluczowe wiersze tabeli to: "Filozofia ogrzewania",
   "Komfort emocjonalny", "Ogrzewanie podczas nieobecności" — nie tylko
   zużycie energii. To porównanie sposobu życia, nie tylko liczb.

### Hybrid comfort system storytelling

- **Kominek i pompa to jeden system, nie dwa światy.** W narracji unikaj
  opozycji "tradycja vs nowoczesność". Opisuj je jako współpracujące
  źródła w jednym układzie hydraulicznym: kominek jako warstwa emocjonalna
  i awaryjna, pompa jako warstwa ciągła i automatyczna.
- **Bufor to pamięć termiczna domu.** Nie opisuj bufora jako "zbiornik".
  Opisuj go jako magazyn, który zapamiętuje ciepło z kominka i oddaje je
  stopniowo, gdy dom tego potrzebuje. To metafora techniczna i emocjonalna
  jednocześnie.
- **Priorytet źródeł jako hierarchia wartości.** Kominek ma pierwszeństwo,
  pompa ma pewność. Ta hierarchia jest intuicyjna i buduje zaufanie:
  właściciel wie, że technologia nie zastąpi ognia, tylko go wesprze.
- **Tryb nieobecności jako spokój, nie funkcja.** Nie opisuj go jako
  "funkcję sterowania". Opisuj jako brak niepokoju: "gdy wyjeżdżasz,
  dom sam się dogrzewa. Gdy wracasz, jest ciepło." Prostota jest
  luksusem.

### Emotional engineering communication principles

- **Nigdy "technologia zastępuje tradycję"**. Zawsze "technologia wspiera
  preferowany styl życia". Nawet w nagłówkach, nawet w FAQ.
- **Nigdy nie opisuj emocji właściciela bezpośrednio.** Nie pisz "był
  zachwycony". Pisz o systemie, który pozwolił mu zachować rytuał bez
  kompromisów. Emocja jest konsekwencją, nie treścią.
- **Liczby niosą emocję.** "0 interwencji podczas wyjazdu" jest bardziej
  emocjonalne niż "w pełni zautomatyzowany".
- **Prywatność bez chłodu.** Właściciela nazywaj "Pani M." lub
  "Właściciel". Nie dramatyzuj jego historii — szanuj jej intymność.
  Dom opisuj szczegółowo, człowieka oszczędnie.
- **Ciepło jako motyw przewodni.** Słowo "ciepło" powinno pojawiać się
  w trzech znaczeniach: temperatura, komfort, relacja z domem. To potrójna
  warstwa semantyczna, którą AI-asystenci i wyszukiwarki wyciągają jako
  sygnał tematyczny.

### Future premium-home case study recommendations

- Dla **właścicieli z własnym zasobem biomasy** (las, gospodarstwo)
  standardem powinien być hybrydowy system: kominek z płaszczem wodnym +
  pompa ciepła + bufor + priorytetowa automatyka. Bilans ekonomiczny
  zmienia się fundamentalnie przy darmowym paliwie.
- Dla **często nieobecnych właścicieli** (praca zdalna z wyjazdami,
  dom letniskowy) kluczową wartością nie jest SCOP, ale niezawodność
  trybu nieobecności i prostota powrotu. Każdy dodatkowy krok w obsłudze
  to punkt rezygnacji.
- Dla **domów nowej budowy z kominkiem** architektura powinna zakładać
  kominek z płaszczem wodnym już na etapie projektu, nie jako dopisku.
  Koszt integracji podczas budowy jest 3–4 razy niższy niż modernizacja.
- Następne flagshipowe kategorie do uzupełnienia: **dom letniskowy**
  (autonomia energetyczna + BESS + własne źródło biomasy), **dom
  pasywny z kominkiem** (jak zachować atmosferę ognia w budynku o
  znikomym zapotrzebowaniu), **smart home bez przekomplikowania**
  (automatyzacja, która nie wymaga aplikacji).

## What is intentionally postponed

- Video embeds (waiting on Lab episode unification).
- Facet/filter UI on `/realizacje`.
- Supabase migration of the registry (Phase 4 candidate).
- Admin authoring UI for case studies.
- Multi-language (PL/EN) — content model is locale-agnostic; add a
  `locale` field when the editorial team is ready.

