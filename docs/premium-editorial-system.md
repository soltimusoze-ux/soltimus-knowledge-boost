# Premium Editorial System — Soltimus Knowledge Hub

Phase 2B established the long-term editorial standard for every Knowledge Hub
article. This document is the source of truth for writers, designers, and
engineers extending the system.

## 1. Editorial principles

1. **Inżynierski ton, decyzyjne treści.** Każdy artykuł odpowiada na pytanie
   inwestora, a nie na zapytanie SEO. Liczby przed marketingiem.
2. **Skanowalność na równi z głębią.** TL;DR + metrics-strip + key-takeaways
   pozwalają oddać 80% wartości w 60 s. Pełne sekcje obsługują czytelnika,
   który dojechał do końca.
3. **Uczciwość jako trust signal.** Sekcje `when-fits` i `common-mistakes`
   występują obowiązkowo w długich materiałach. „Kiedy NIE warto” buduje
   autorytet skuteczniej niż dowolna lista zalet.
4. **Dane > opinie.** Każde mocne stwierdzenie poparte liczbą w widełkach,
   źródłem lub testem (TRT, B7/W35, SCOP). Wymuszone przez bloki
   `cost-breakdown`, `metrics-strip`, `table`.
5. **AI-citation friendly.** Bloki `definition`, `key-takeaways`, FAQ i
   tabele są krótkie, samodzielne i jednoznaczne — gotowe do cytowania
   przez Perplexity / ChatGPT / Gemini.

## 2. Reusable content blocks

Pełna definicja: `src/content/articles/types.ts`. Renderer:
`src/components/article/ArticleBody.tsx`.

| Block | Rola edytorska | Kiedy używać |
|---|---|---|
| `heading` (+`eyebrow`) | Sekcja narracji | Co 2–4 akapity; każda H2 z eyebrow `NN · Temat` |
| `paragraph` (+`dropcap`) | Treść | Dropcap tylko na pierwszym akapicie pod hero |
| `list` | Wyliczenia | Max 6 pozycji; więcej → `factor-list` lub tabela |
| `tldr` | Skrót dla zabieganych | 1× na artykuł, na górze |
| `metrics-strip` | 4 liczby-kotwice | Bezpośrednio pod hero (full-bleed) |
| `engineer-note` | Insight inżynierski | 2–4× na długi artykuł, nie nadużywać |
| `callout` | Krótka uwaga | Drobne notki, ostrzeżenia, podpowiedzi |
| `definition` | Termin techniczny | Pierwsze wystąpienie pojęcia (SCOP, TRT, R290) |
| `table` | Dane porównawcze | Liczby, jednostki, warianty |
| `cost-breakdown` | Kosztorys | Każdy artykuł cenowy / produktowy |
| `case-cards` | 2–3 worked examples | Po sekcji cenowej |
| `compare-cards` | Dwa rozwiązania | Każda decyzja A vs B |
| `factor-list` | „Z czego wynika X” | Lista czynników z liczbową konsekwencją |
| `when-fits` | Kwalifikacja pozytywna | Sekcja „kiedy warto” |
| `common-mistakes` | Kwalifikacja negatywna | Sekcja „kiedy nie warto / błędy” |
| `quote` | Cytat z zespołu | 0–1× na artykuł, podpisany działem |
| `image` | Schemat / realizacja | Z opisanym altem i caption |
| `key-takeaways` | Konkluzja | Obowiązkowy ostatni blok merytoryczny |
| `cta-calculator` | Konwersja narzędziowa | Po sekcji kosztowej / kwalifikacyjnej |
| `cta-engineer` | Konwersja konsultacyjna | Stopka konwersyjna każdego artykułu |

## 3. Standardowa struktura artykułu

```
HERO
metrics-strip
paragraph (dropcap)            ← teza
heading (01)
  paragraph / list
  table / engineer-note
heading (02)
  case-cards lub cost-breakdown
cta-calculator                 ← konwersja w środku
heading (03..N)
  compare-cards / factor-list
  engineer-note
heading „Kiedy ma sens"
  when-fits
  common-mistakes
quote (opcjonalnie)
key-takeaways
cta-engineer
FAQ (auto)
Author box + Related (auto)
```

## 4. AI-search content principles

- Każda H2 to pełne pytanie lub jednoznaczna teza.
- `definition` block dla każdego pojęcia, które AI może chcieć zacytować.
- FAQ ≥ 4 pytań, formułowane jako naturalne zapytania użytkownika.
  Odpowiedzi 1–3 zdania, kompletne (gotowe do snippetu).
- `key-takeaways` to lista *samodzielnych* zdań — bez „jak wspomnieliśmy
  wyżej”. Każde stoi samodzielnie poza kontekstem artykułu.
- Liczby zawsze z jednostką, zakresami zamiast jednej wartości.

## 5. Standardy SEO semantycznego

- `buildMeta()` (`src/config/seo.ts`) wymusza `og:*`, canonical, twitter.
- Każdy artykuł emituje 3 schematy JSON-LD: `Article`, `BreadcrumbList`,
  `FAQPage` (gdy `faq.length > 0`). Wstrzykiwane w `src/routes/wiedza.$category.$slug.tsx`.
- Tytuł SEO ≤ 60 znaków; opis 140–155 znaków.
- Linkowanie wewnętrzne przez `related.articles` + `related.services`.

## 6. Typografia i rytm wizualny

- Globalna klasa `.editorial` w `src/styles.css` jest jedynym źródłem prawdy
  dla rytmu tekstu. Nigdy nie nadpisywać typografii lokalnie.
- 17/29 mobile, 18/33 desktop, `max-width: 72ch` na prozie.
- H2 z 36 px akcentowym podkreśleniem, scroll-margin 7rem dla TOC.
- Listy z błękitnym `::marker`. Mocne `**bold**` tylko dla liczb i pojęć.
- `prefers-reduced-motion` wyłącza wszystkie reveale globalnie.

## 7. Storytelling premium engineering

- **Hero** — tytuł + lead w stylu hipotezy projektowej, nie sloganu.
- **Engineer-note** — pierwsza po hero stanowi tezę inżynierską; ostatnia
  podsumowuje TCO/ROI. Ciemne tło, kontrast premium.
- **Quote** — pojedynczy głos zespołu, podpisany działem, nie osobą.
  Buduje wrażenie konsensusu inżynierskiego.
- **Case cards / cost-breakdown** — zawsze z widełkami, nigdy „od X zł”.
- **Common-mistakes** — wyraźnie czerwona ramka; pokazujemy gdzie odradzamy.

## 8. Future article checklist

Przed publikacją:

- [ ] H1 ≤ 65 znaków, tytuł SEO ≤ 60.
- [ ] `tldr` ≤ 240 znaków.
- [ ] `metrics-strip` z 4 liczbami pod hero.
- [ ] Min. 1 `engineer-note`, 1 `when-fits`, 1 `common-mistakes`.
- [ ] `key-takeaways` z 4–6 zdaniami, ostatni blok merytoryczny.
- [ ] `faq` ≥ 4 pytań, każde z odpowiedzią 1–3 zdania.
- [ ] `related.articles` + `related.services` wypełnione.
- [ ] `cta-calculator` lub `cta-engineer` w treści (nie tylko stopka).
- [ ] `heroImageAlt` opisuje treść zdjęcia, nie tytuł artykułu.
- [ ] `updatedAt` ustawiony przy każdej rewizji merytorycznej.

## 9. Migration log (Phase 2B)

- `cennik-pomp-ciepla-2026` — port pełny, route `wiedza.pompy-ciepla.cennik-pomp-ciepla-2026.tsx` usunięty.
- `gruntowa-pompa-ciepla-kompletny-przewodnik` — port pełny, route usunięty.
- `customRoute` flag pozostaje w typach na wypadek przyszłych legacy
  layoutów (np. mikronarzędzia kalkulacyjne wewnątrz artykułu).

## 10. Postponed / out of scope

- Migracja artykułów do Supabase (`knowledge_articles`) — Phase 3.
- Bidirectional sync z HubSpot Blog — po wdrożeniu CMS.
- Aktywne podświetlenie sekcji w TOC (scroll-spy) — w kolejnym sprincie UX.
- Reading-progress per-sekcja, zakładki, „save for later” — wymagają auth.
