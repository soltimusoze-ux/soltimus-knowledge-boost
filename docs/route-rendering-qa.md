# Route Rendering & User Flow QA

## What was broken

The launch-blocking issue was structural, not visual:

1. `src/routes/oferta.tsx` matched `/oferta` and also became the parent
   route for `/oferta/*` child routes.
2. Because that parent component rendered the full service listing page
   instead of `<Outlet />`, every child URL such as `/oferta/pompy-ciepla`
   and `/oferta/rekuperacja` inherited the `/oferta` listing UI.
3. The URL changed correctly, and the active service card could appear
   highlighted, but the detail route content was not visible as the primary
   page. This made the app feel like navigation was broken.

The earlier scroll/remount fix was useful for dynamic param changes, but it
did not address the actual parent-route rendering problem.

## Exact fix

- `src/routes/oferta.tsx`
  - Converted from a listing page into a pure parent layout route.
  - It now renders only `<Outlet />`, so matched child routes control their
    own visible content.
- `src/routes/oferta.index.tsx`
  - Created as the dedicated `/oferta` overview/listing page.
  - All service cards remain only on this index page.
- `src/routes/oferta.$service.tsx`
  - Kept as the dedicated dynamic service route for the published heat pump
    blueprint (`/oferta/pompy-ciepla`).
  - Updated the heat pump hero copy to the launch-approved above-the-fold
    direction:
    - H1: `Pompy ciepła projektowane na podstawie OZC, nie katalogu.`
    - Lead: `Dobieramy system grzewczy do budynku, instalacji i realnego zapotrzebowania cieplnego.`
    - Primary CTA: `Sprawdź orientacyjny dobór pompy`
    - Secondary CTA: `Umów konsultację inżynierską`
- Static service routes remain distinct child pages:
  - `src/routes/oferta.energia.tsx`
  - `src/routes/oferta.rekuperacja.tsx`
  - `src/routes/oferta.termomodernizacja.tsx`
  - `src/routes/oferta.audyty-energetyczne.tsx`
  - `src/routes/oferta.serwis.tsx`

No visual redesign. No new content systems. No hosting/router fallback hacks.
The fix is the correct TanStack route architecture: parent route = outlet,
index child = listing, child routes = detail pages.

## Route architecture after fix

Service routes now split clearly between:

- **Parent layout route** — `src/routes/oferta.tsx`
  renders `<Outlet />` only and no longer renders the cards listing.
- **Overview/index route** — `src/routes/oferta.index.tsx`
  renders `/oferta`: listing hero + service cards + overview CTA.
- **Blueprint-driven dynamic route** — `src/routes/oferta.$service.tsx`
  renders `/oferta/pompy-ciepla` from the typed service registry.
- **Static detail routes** — `oferta.energia.tsx`,
  `oferta.rekuperacja.tsx`, `oferta.termomodernizacja.tsx`,
  `oferta.audyty-energetyczne.tsx`, `oferta.serwis.tsx`.

Static segments continue to take precedence over the dynamic `$service`
route, so `/oferta/rekuperacja` cannot be accidentally handled by the
heat-pump blueprint route.
This remains the migration path: as each service gets a full blueprint, its
static detail file can be deleted and the dynamic route can take over.

## Routes tested manually after the fix

| Route                              | Result |
| ---------------------------------- | ------ |
| `/oferta`                          | Overview page: H1 `Kompletne systemy energii...`; service cards visible above the fold. |
| `/oferta/pompy-ciepla`             | Dedicated dark image hero; H1 `Pompy ciepła projektowane na podstawie OZC, nie katalogu.`; CTAs to calculator and engineering consultation; no `/oferta` listing cards above the fold. |
| `/oferta/energia`                  | Dedicated energy hero; H1 `Wytwarzanie i magazynowanie energii elektrycznej.`; PV/storage/tariff/EV sections visible, not the `/oferta` card listing. |
| `/oferta/rekuperacja`              | Dedicated detail hero; eyebrow `Powietrze · Komfort termiczny`; H1 `Rekuperacja i klimatyzacja dla wymagających domów.`; scope section follows instead of overview cards. |
| `/oferta/termomodernizacja`        | Dedicated detail hero; eyebrow `Powłoka budynku · Efektywność`; H1 `Termomodernizacja zaplanowana etapowo.`; scope section follows instead of overview cards. |
| `/oferta/audyty-energetyczne`      | Dedicated detail hero; H1 `Audyty energetyczne przed każdą poważną decyzją.`; no `/oferta` cards above the fold. |
| `/oferta/serwis`                   | Dedicated detail hero; eyebrow `Opieka po uruchomieniu · 25+ lat`; H1 `Serwis i opieka nad systemem przez całe jego życie.`; no `/oferta` cards above the fold. |
| `/realizacje/konstancin-…`         | Unique case content |
| `/realizacje/dom-2000-…-daikin`    | Unique case content |
| `/realizacje/stacja-paliw-…`       | Unique case content |
| `/realizacje/osiedle-252-…`        | Unique case content |
| `/realizacje/dom-lat-70-…`         | Unique case content |
| `/realizacje/dom-nowy-hybryda-…`   | Unique case content |

All `/oferta` cards are full-card `<Link>` wrappers with `focus-visible`
rings and a visible "Zobacz usługę →" affordance. Service detail pages no
longer render those cards as their primary page content.
All `/realizacje` teasers wrap their card in `<Link to="/realizacje/$slug" params={{ slug }} />`.

## Remaining risks

- Five of six services are still placeholder pages. They are visibly
  distinct but lack the depth of `pompy-ciepla` (no FAQ, no JSON-LD
  Service schema, no related case studies module). Tracked for the
  next blueprint pass — not a routing bug.
- Browser text extraction may label detail-page scope cards as "cards";
  visually and structurally these are service-detail content sections, not
  the `/oferta` service listing grid.
- `scrollRestoration: true` will still restore scroll on **back/forward**
  navigation, which is correct. Our `useEffect` only forces top on
  param-driven forward navigation inside the same route file.

## Final checklist before publication

- [ ] Remove dev-only slug badge if shipping a public preview where
  `import.meta.env.DEV` could be true (production builds already strip
  it).
- [ ] Click every `/oferta` card → verify unique hero appears at top.
- [ ] Click every `/realizacje` card → verify unique case hero appears.
- [ ] Use browser back/forward → verify scroll position is restored.
- [ ] Test on mobile viewport (≤390px) → confirm scroll-to-top fires.
- [ ] Confirm `sitemap.xml` lists all six service URLs and all
  published case slugs.
