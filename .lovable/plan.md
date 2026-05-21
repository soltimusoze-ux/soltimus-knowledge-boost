# Soltimus — status wdrożenia

## Zrobione (architektura, gotowość pod produkcję)

- **Konfiguracja sitewide** — `src/config/site.ts`, `src/config/brand.ts`, `src/config/nav.ts`
- **SEO helper** — `src/config/seo.ts` (`buildMeta`) generujący title/description/og:*/canonical/twitter:* + JSON-LD wg reguł TanStack (canonical tylko na liściach)
- **JSON-LD biblioteka** — `src/lib/jsonld.ts` z generatorami `organizationSchema`, `websiteSchema`, `articleSchema`, `faqSchema`, `breadcrumbSchema`, `productSchema`
- **`__root.tsx` posprzątany** — usunięty błędny `noindex, nofollow` na całej stronie (krytyczny błąd SEO) i admin-specyficzny tytuł; w zamian sitewide defaults + Organization & WebSite JSON-LD
- **Brand tokeny w Tailwind** — `bg-brand-yellow` / `text-brand-ink` / `bg-brand-cream` dostępne globalnie (dotychczasowe hardkody działają, można migrować stopniowo)
- **`public/robots.txt`** + **`/sitemap.xml`** jako server route (`src/routes/sitemap[.]xml.ts`)
- **HubSpot stub** — `src/integrations/hubspot/types.ts` + `client.server.ts` (no-op dopóki sekret nie jest ustawiony)
- **Lead capture abstrakcja** — `src/lib/lead-capture.ts` (typy gotowe; formularze migrujemy w osobnej iteracji)
- **README.md** — pełna dokumentacja struktury i konwencji
- **Refaktor `head()`** na `buildMeta` w `index.tsx` i `oferta.energia.tsx` jako wzorzec

## Do zrobienia w kolejnych iteracjach

### Krótkoterminowo
- Refaktor pozostałych `head()` na `buildMeta` (oferta, oferta.energia ✓, kontakt, zespol, realizacje, kalkulator, wiedza.index, 3 artykuły)
- Audyt hierarchii nagłówków (jeden `<h1>` per route, sekcje `<h2>/<h3>`, `aria-labelledby` na `<section>`)
- Migracja hardkodów kolorów (`#F5B800` → `bg-brand-yellow`) — czysto kosmetyczne, bez zmian wyglądu
- Premium route — decyzja: usunąć czy zostawić jako redirect do `/`

### Średnioterminowo
- **Knowledge Hub content model** — przeniesienie artykułów z osobnych route'ów do `src/content/knowledge/*.ts` + jeden dynamiczny renderer
- **Lead capture pełna implementacja** — wszystkie formularze przez `submitLead()` + mirror do HubSpot po włączeniu konnektora
- Dostępność — focus-visible, prefers-reduced-motion, audyt alt-textów
- Wydajność — lazy import kalkulatora i innych ciężkich sekcji

### Długoterminowo
- MDX dla artykułów (gdy wejdzie copywriter)
- Polityka prywatności + cookies (osobne routes)
- OG image generator (na razie pomijamy — placeholder jest gorszy niż brak)
