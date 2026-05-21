# Plan: przygotowanie projektu pod produkcję

**Zasada:** zero zmian wizualnych. Tylko struktura, typy, metadane, organizacja kodu. Każdy krok jest niezależny i można zatrzymać się po dowolnym.

## 1. Konwencje i struktura folderów

Wprowadzić docelową strukturę `src/`:

```text
src/
  components/
    ui/              (shadcn — już jest)
    site/            (Header, Footer — już jest)
    sections/        (sekcje stron wielokrotnego użytku: Hero, CTA, TrustStrip…)
    forms/           (formularze: ContactForm, LeadForm)
    knowledge/       (już jest)
    team/            (już jest)
  features/          (logika domenowa: heat-pump, energy, knowledge, lab)
  lib/               (utils, company, konfiguracja)
  config/            (NOWE: nav.ts, seo.ts, site.ts, brand.ts)
  content/           (NOWE: typowane dane treści — services, faq, team)
  integrations/      (supabase — już jest; przygotować hubspot/)
  routes/            (TanStack — bez zmian struktury)
  hooks/
  styles/            (NOWE: rozbicie styles.css na tokens.css + base.css + utilities.css importowane z głównego)
```

Konwencje nazewnictwa komponentów:
- `PascalCase.tsx` dla komponentów, `kebab-case.ts` dla utili/configów
- Sekcje stron: `<Domain><Purpose>Section.tsx` (np. `EnergiaPillarsSection.tsx`)
- Formularze: `<Domain>Form.tsx`
- Hooki: `use-<thing>.ts(x)`

## 2. Centralna konfiguracja treści (skalowalność)

Utworzyć:
- `src/config/site.ts` — `SITE_URL`, `SITE_NAME`, `DEFAULT_OG_IMAGE`, języki
- `src/config/nav.ts` — pojedyncze źródło prawdy dla nawigacji (header, footer, mobile) z typami `NavItem`
- `src/config/seo.ts` — helper `buildMeta({ title, description, path, image?, type? })` zwracający tablicę meta + canonical zgodnie z regułami TanStack (canonical TYLKO na liściach, nie w `__root.tsx`)
- `src/config/brand.ts` — kolory marki, ścieżki do logo (referencje, nie style)

Cel: dodanie nowej strony = jeden import + jedno wywołanie `buildMeta`.

## 3. SEO i metadane — ujednolicenie

- Audyt wszystkich `head()` w routes. Każdy liść dostaje: `title`, `description`, `og:title`, `og:description`, `og:url`, `canonical`, `og:type`
- `__root.tsx` ma TYLKO sitewide defaults (viewport, charSet, og:site_name, Organization JSON-LD) — bez canonical, bez og:image
- Przygotować helper `src/lib/jsonld.ts` z generatorami: `organizationSchema()`, `articleSchema()`, `breadcrumbSchema()`, `faqSchema()`, `productSchema()` — gotowe do użycia w przyszłych artykułach Knowledge Hub
- Dodać `public/robots.txt` (jeśli brak) i `public/sitemap.xml` jako szablon do regeneracji

## 4. Hierarchia nagłówków i semantyka

- Audyt: dokładnie jeden `<h1>` per route. Sekcje używają `<h2>`, podsekcje `<h3>`
- Wprowadzić landmarki: `<main>`, `<nav>`, `<header>`, `<footer>`, `<section aria-labelledby>`
- Linki dekoracyjne dostają `aria-label`, ikony bez tekstu `aria-hidden`
- Bez zmian wizualnych — tylko atrybuty i tagi

## 5. Knowledge Hub / blog — architektura pod treść

Obecnie artykuły są oddzielnymi plikami route (`wiedza.pompy-ciepla.*.tsx`). Skalowalny model:

- `src/content/knowledge/` — pliki MDX lub typowane obiekty TS (`Article` typ: `slug`, `category`, `title`, `excerpt`, `coverImage`, `publishedAt`, `updatedAt`, `author`, `body`, `relatedSlugs`, `seo`)
- Jedna dynamiczna trasa `wiedza.$category.$slug.tsx` (już istnieje) wczytuje artykuł z `content/`
- Listing `wiedza.$category.tsx` generuje się z `content/knowledge/index.ts`
- Komponenty rendera: `ArticleHero`, `ArticleBody`, `ArticleMeta`, `ArticleRelated` w `components/knowledge/`
- Decyzja do podjęcia: MDX (lepsze dla copywriterów) vs czysty TS (prościej, bez nowych zależności). **Rekomendacja: TS na start, MDX gdy wejdzie copywriter.**

## 6. HubSpot — przygotowanie integracji

Bez wdrażania połączenia. Tylko fundamenty:

- `src/integrations/hubspot/client.ts` — typowany klient przez Lovable connector gateway (stub z TODO, gotowy do uruchomienia po włączeniu konnektora)
- `src/integrations/hubspot/types.ts` — typy `HubspotContact`, `HubspotLead`, mapowanie pól formularzy
- `src/lib/lead-capture.ts` — abstrakcja: `submitLead(payload)` → dziś zapisuje do Supabase `contact_messages`, w przyszłości równolegle wysyła do HubSpot. Wszystkie formularze przechodzą przez nią
- Refaktor `kontakt.tsx` i `kalkulator-pompy-ciepla.tsx` żeby używały `submitLead` zamiast bezpośrednich wywołań

## 7. Wydajność

- Sprawdzić code splitting: czy żaden route nie eksportuje komponentu (TanStack wymóg)
- Lazy imports dla ciężkich sekcji (kalkulator, mapy)
- `loading="lazy"` i `decoding="async"` na obrazach poza fold
- Sprawdzić `defaultPreloadStaleTime` w routerze
- Audyt importów ikon `lucide-react` — już są tree-shakable, ale upewnić się że nie ma `import * as`

## 8. Tailwind — czystość

- Wszystkie kolory marki → tokeny w `styles.css` (`--brand-yellow: #F5B800`, `--brand-ink: #0E0E10`, `--brand-cream: #FAFAF7`)
- Zamiana hardkodów `#F5B800`, `#0E0E10`, `#FAFAF7` w komponentach na `bg-brand-yellow` / `text-brand-ink` / `bg-brand-cream` (wymaga dopisania do theme)
- Bez zmian wyglądu — tylko semantyka klas

## 9. Dostępność (podstawy)

- Focus states: globalna reguła `:focus-visible` w `styles.css` (już shadcn ma)
- `prefers-reduced-motion` respektowane przez animacje
- Kontrast: spot-check tokenów (żółty na czarnym — OK, żółty na białym — sprawdzić)
- Wszystkie `<img>` mają `alt` (puste `alt=""` dla dekoracyjnych)
- Formularze: `<label htmlFor>` + `aria-describedby` dla błędów

## 10. Czystość repozytorium

- Usunąć `src/routes/premium.tsx` jeśli już nieaktualne (lub redirect → `/`)
- `.lovable/plan.md` — zaktualizować status (co zrobione, co nie)
- Dodać `README.md` z opisem struktury, konwencji i instrukcją lokalnego uruchomienia
- `.editorconfig` jeśli brak

## Co PROPONUJĘ zrobić w pierwszym podejściu (1 wiadomość)

Punkty **1, 2, 3, 8, 10** — najwięcej wartości, najmniej ryzyka, zero zmian UI:
- struktura folderów + przeniesienia z aktualizacją importów
- `config/site.ts`, `config/nav.ts`, `config/seo.ts`, `config/brand.ts`
- helper `buildMeta` + refaktor wszystkich `head()` w routes
- `lib/jsonld.ts` z generatorami schematów
- tokeny marki w Tailwind + zamiana hardkodów na klasy semantyczne
- README + porządek w repo

Punkty **4, 5, 6, 7, 9** w kolejnych wiadomościach — każdy to osobna nietrywialna robota (Knowledge Hub content model i HubSpot integration to największe).

## Decyzje do potwierdzenia

1. **Knowledge Hub model:** TS-only na start czy od razu MDX?
2. **HubSpot:** czy mogę dodać `src/integrations/hubspot/` stub teraz, czy czekamy aż będzie konnektor?
3. **Premium route:** usunąć `/premium` czy zostawić jako redirect do `/`?
4. **Zakres pierwszego podejścia:** robimy punkty 1+2+3+8+10 jak proponuję, czy chcesz inną kombinację?
