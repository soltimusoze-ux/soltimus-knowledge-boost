# Knowledge Hub — Content Model (Phase 2)

> Cel: zamienić Knowledge Hub z hardkodowanych route'ów w skalowalny content engine — z czystą ścieżką migracji do Supabase / HubSpot bez przepisywania warstwy renderującej.

## 1. Architektura

```
src/content/
├── authors.ts                            # rejestr autorów (kredytowość)
└── articles/
    ├── types.ts                          # typy: Article, ArticleBlock, FAQ, SEO, Related
    ├── index.ts                          # rejestr + helpers: list/get/related
    └── pompy-ciepla/
        ├── zbiorniki-cwu-do-pompy-ciepla.ts        # FULL — body w blokach
        ├── cennik-pomp-ciepla-2026.ts              # METADATA — customRoute
        └── gruntowa-pompa-ciepla-kompletny-przewodnik.ts  # METADATA — customRoute

src/components/article/
├── ArticleHero.tsx       # cinematic hero (kategoria, czas, autor, tagi)
├── ArticleMeta.tsx       # kompaktowy pasek meta (autor / data / czas)
├── ArticleBody.tsx       # renderer bloków + tocFromBlocks()
├── ArticleTOC.tsx        # spis treści z bloków heading[level=2]
├── ArticleFAQ.tsx        # FAQ accordion (mapuje 1:1 do FAQPage JSON-LD)
├── ArticleRelated.tsx    # powiązane artykuły (kuratorowane + same-cat fallback)
├── ArticleAuthorBox.tsx  # box autora (E-E-A-T)
├── ArticleCTA.tsx        # CTA: kalkulator / inżynier + InlineQuote
└── index.ts              # public surface
```

Dynamiczny route `src/routes/wiedza.$category.$slug.tsx`:

1. `getArticle(category, slug)` — jeśli rekord istnieje w content modelu → **ManagedArticlePage** (shared components).
2. W przeciwnym wypadku → **WordpressArticlePage** (fallback do `fetchArticleBySlug` — zachowane).

## 2. Typowanie treści

`ArticleBlock` (`src/content/articles/types.ts`):

| Type             | Use case                                |
|------------------|------------------------------------------|
| `heading`        | h2/h3 z `id` (zasila TOC)                |
| `paragraph`      | tekst akapitowy z `**bold**`             |
| `list`           | ul/ol                                    |
| `callout`        | inline notatka (blue/gold/neutral)       |
| `quote`          | cytat redakcyjny z `cite`                |
| `image`          | figure z `alt` + `caption`               |
| `table`          | head + rows + opcjonalny `note`          |
| `stats`          | strip 4 KPI (label/value/sub)            |
| `tldr`           | inline TL;DR                             |
| `cta-calculator` | CTA do kalkulatora                       |
| `cta-engineer`   | CTA konsultacji inżynierskiej            |

## 3. Pola Article (krytyczne dla SEO/GEO)

- `slug`, `category`, `status` (`draft`/`published`)
- `title`, `excerpt`, `publishedAt`, `updatedAt`, `readingTime`
- `heroImage`, `heroImageAlt` (OG + lead na kafelkach)
- `authorId` → `getAuthor()` (E-E-A-T)
- `seo` — `{ title, description, ogImage?, canonicalOverride? }`
- `related.services / caseStudies / articles`
- `tags`, `tldr`, `faq[]`
- `body?: ArticleBlock[]` lub `customRoute: true`

## 4. SEO / JSON-LD

W `head()` dynamiczny route emituje:

- `buildMeta()` — kanoniczny URL, OG/Twitter, robots, title z suffixem
- **Article** JSON-LD (`articleSchema`) — z `authorName` z rejestru
- **BreadcrumbList** (`breadcrumbSchema`) — 4 poziomy
- **FAQPage** (`faqSchema`) — tylko gdy `article.faq.length > 0`
- `og:type: article`

OG image: leaf-only (`__root.tsx` nie ustawia). Fallback do `heroImage`.

## 5. Migracja istniejących artykułów

| Artykuł                                   | Stan                  |
|-------------------------------------------|------------------------|
| `zbiorniki-cwu-do-pompy-ciepla`           | ✅ Pełna migracja (body w blokach). Stary route file usunięty — obsługa przez dynamiczny route. |
| `cennik-pomp-ciepla-2026`                 | 🟡 `customRoute: true`. Metadata (SEO, FAQ, autor, related) w rejestrze. Bespoke route file zachowany. |
| `gruntowa-pompa-ciepla-kompletny-przewodnik` | 🟡 `customRoute: true`. Metadata w rejestrze. Bespoke route file zachowany. |

Dwa duże artykuły zachowują bogate, ręcznie kodowane layouty (Reveal, InsightBlock, CompareCards) i będą portowane do bloków etapowo. **Rejestr jest źródłem prawdy dla metadata** — JSON-LD, sitemap, hub listings i przyszłe mirrorowanie do HubSpot ciągną stamtąd.

## 6. Autorzy (E-E-A-T)

`src/content/authors.ts`:

- `getAuthor(id)` — bezpieczny dostęp z fallbackiem do `redakcja`
- pola: `name`, `role`, `bio`, `avatar`, `sameAs`, `credentials`
- użyte w `ArticleHero`, `ArticleAuthorBox`, `articleSchema` (author Person)

Aktualnie 2 wpisy: `redakcja`, `dzial-projektowy`. Migracja do Supabase `authors` lub HubSpot CRM bez zmiany konsumenckiego API.

## 7. Ścieżka migracji do Supabase

Schemat docelowy (kontrakt 1:1 z `Article`):

```sql
create table public.knowledge_articles (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null,
  category    text not null,
  status      text not null default 'draft',  -- draft | published
  title       text not null,
  excerpt     text not null,
  hero_image  text,
  hero_alt    text,
  author_id   text not null,
  reading_time int not null,
  tldr        text,
  tags        text[],
  body_json   jsonb,                          -- ArticleBlock[]
  seo_json    jsonb not null,                 -- ArticleSeo
  faq_json    jsonb,                          -- ArticleFaqItem[]
  related_json jsonb,                         -- ArticleRelated
  hubspot_id  text,                           -- mirror id (Phase 3)
  published_at timestamptz,
  updated_at  timestamptz default now(),
  unique (category, slug)
);
```

Krok przełączenia: `listArticles()` → `useQuery(['articles'], fetchPublicArticles)` (server fn). Komponenty (`ArticleBody`, `ArticleHero`, etc.) pozostają bez zmian.

## 8. HubSpot readiness

- `seo.canonicalOverride` — kanoniczny URL gdy artykuł jest mirrorowany do HubSpot Blog.
- `hubspot_id` w schemacie — link do HubSpot CMS object.
- Autorzy mapowani na HubSpot User / Contact via `Author.sameAs[]`.
- FAQ + Article JSON-LD generowane po stronie Lovable (HubSpot nie nadpisuje structured data).

## 9. Co świadomie odłożone

- Pełna migracja `cennik` i `gruntowa` do bloków (wymaga rozszerzenia `ArticleBlock` o `compare`, `insight`, `reveal`).
- Admin/CMS dla artykułów (na razie pliki TS w repo → review w PR).
- Case Studies cross-link (`related.caseStudies` zdefiniowane w typie, brak konsumenta).
- Edytor MDX / runtime sanitizer (gdy ruszy Knowledge Hub user-generated content).
- Real-time `updatedAt` przy zmianie w Supabase (Phase 3).

## 10. Quick reference — dodanie nowego artykułu

1. Utwórz `src/content/articles/<category>/<slug>.ts` eksportujący `article: Article`.
2. Zaimportuj i dodaj do `ARTICLES` w `src/content/articles/index.ts`.
3. Done — dynamiczny route `/wiedza/$category/$slug` automatycznie odbiera SEO, JSON-LD, related, FAQ, breadcrumb, sitemap.
