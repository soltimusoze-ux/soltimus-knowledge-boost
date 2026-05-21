# Route Rendering & User Flow QA

## What was broken (perceived)

Clicking cards on `/oferta` and `/realizacje` updated the URL, but pages
could appear unchanged because:

1. The dynamic route components (`oferta.$service.tsx`,
   `realizacje.$slug.tsx`) reused the same React subtree when only the
   route param changed. Heavy child components (hero, gallery, FAQ) kept
   internal state from the previous slug instead of remounting.
2. Scroll position from the previous page was sometimes preserved on
   param-only changes, so the user landed mid-page on the new route and
   thought "nothing happened".
3. There was no visible QA affordance to confirm which slug had
   actually been resolved during manual click-through.

## Fixes applied (surgical)

- `src/routes/oferta.$service.tsx`
  - Added `key={service}` on the outer `<main>` → full remount of all
    service subsections when the slug changes.
  - Added `useEffect(() => window.scrollTo(0,0), [service])` to guarantee
    top-of-page on every service switch (desktop + mobile).
  - Added a dev-only slug badge (`import.meta.env.DEV`) bottom-right for
    QA. Not rendered in production builds.
- `src/routes/realizacje.$slug.tsx`
  - Same three changes, keyed on `slug`.

No visual redesign. No new content systems. No router config changes
beyond what was already set (`scrollRestoration: true`,
`defaultPreloadStaleTime: 0` in `src/router.tsx`).

## Route architecture (audited, kept as-is)

Service routes split intentionally between:

- **Blueprint-driven dynamic route** — `src/routes/oferta.$service.tsx`
  reads from the typed `services` registry (`src/content/services`).
  Today only `pompy-ciepla` is published there, so the dynamic route
  resolves only that slug (others throw `notFound()` via `beforeLoad`).
- **Static placeholder routes** — `oferta.energia.tsx`,
  `oferta.rekuperacja.tsx`, `oferta.termomodernizacja.tsx`,
  `oferta.audyty-energetyczne.tsx`, `oferta.serwis.tsx`. These take
  precedence over the dynamic route (TanStack prefers static segments),
  so each renders its own distinct component with unique hero, lead,
  scope and process sections.

This split is the documented migration path: as each service gets a full
blueprint, its static placeholder file is deleted and the dynamic route
takes over. No duplicate-route conflicts exist today.

## Routes tested manually

| Route                              | Result |
| ---------------------------------- | ------ |
| `/oferta/pompy-ciepla`             | Unique full blueprint page (hero, OZC, kalkulator promo) |
| `/oferta/energia`                  | Unique static page (PV, magazyny, taryfa, EV) |
| `/oferta/rekuperacja`              | Unique placeholder (wentylacja + klimatyzacja Daikin) |
| `/oferta/termomodernizacja`        | Unique placeholder (audyt, ocieplenie, etapy) |
| `/oferta/audyty-energetyczne`      | Unique placeholder (OZC, termowizja, dofinansowania) |
| `/oferta/serwis`                   | Unique placeholder (przeglądy, 24h, magazyn części) |
| `/realizacje/konstancin-…`         | Unique case content |
| `/realizacje/dom-2000-…-daikin`    | Unique case content |
| `/realizacje/stacja-paliw-…`       | Unique case content |
| `/realizacje/osiedle-252-…`        | Unique case content |
| `/realizacje/dom-lat-70-…`         | Unique case content |
| `/realizacje/dom-nowy-hybryda-…`   | Unique case content |

All `/oferta` cards are full-card `<Link>` wrappers with
`focus-visible` rings and a visible "Zobacz usługę →" affordance.
All `/realizacje` teasers wrap their card in `<Link to="/realizacje/$slug" params={{ slug }} />`.

## Remaining risks

- Five of six services are still placeholder pages. They are visibly
  distinct but lack the depth of `pompy-ciepla` (no FAQ, no JSON-LD
  Service schema, no related case studies module). Tracked for the
  next blueprint pass — not a routing bug.
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
