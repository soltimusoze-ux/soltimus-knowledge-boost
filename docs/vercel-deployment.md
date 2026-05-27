# Deployment na Vercel

Projekt jest zbudowany na TanStack Start v1 (React 19 + Vite 7). Domyślnie Lovable publikuje go jako Cloudflare Worker, ale można go też zdeployować na Vercel za pomocą poniższej konfiguracji.

## Pliki konfiguracyjne (już w repo)

- `vercel.json` — build command, output directory, runtime, rewrites
- `api/index.mjs` — Vercel Node serverless function opakowujący SSR fetch handler z `dist/server/server.js`
- `vite.config.ts` — wykrywa `process.env.VERCEL` i wyłącza `@cloudflare/vite-plugin`, dzięki czemu `vite build` emituje czysty Node SSR bundle

## Ustawienia w panelu Vercel

W **Project Settings → General**:

| Pole | Wartość |
|---|---|
| Framework Preset | **Other** (nie wybieraj "Vite" ani "TanStack Start") |
| Build Command | `vite build` (lub zostaw puste — czyta z `vercel.json`) |
| Output Directory | `dist/client` (lub zostaw puste — czyta z `vercel.json`) |
| Install Command | `npm install` (domyślne) |
| Node.js Version | **20.x** |

`vercel.json` w repo nadpisuje większość tych pól, więc wystarczy ustawić **Framework Preset: Other** i Node 20.

## Wymagane zmienne środowiskowe (Environment Variables)

Dodaj w **Project Settings → Environment Variables** dla środowisk **Production** i **Preview**:

| Nazwa | Wartość |
|---|---|
| `VITE_SUPABASE_URL` | `https://lqbqsavndxipdvafqdzo.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | _(klucz publishable z Lovable Cloud / Supabase)_ |
| `VITE_SUPABASE_PROJECT_ID` | `lqbqsavndxipdvafqdzo` |
| `SUPABASE_URL` | `https://lqbqsavndxipdvafqdzo.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | _(jak wyżej)_ |
| `SUPABASE_SERVICE_ROLE_KEY` | _(klucz service role — TYLKO Production/Preview, nigdy do klienta)_ |

Vercel automatycznie ustawia `VERCEL=1`, więc nie trzeba dodawać tego ręcznie.

## Jak zrobić redeploy

1. **Z GitHuba**: każdy push do gałęzi produkcyjnej (np. `main`) wywołuje deploy automatycznie.
2. **Ręcznie z panelu**: Deployments → kliknij `…` przy ostatnim deployu → **Redeploy**. Odznacz "Use existing Build Cache" jeśli zmieniłeś config.
3. **CLI**: `npx vercel --prod`

## Weryfikacja po deployu

Po `Ready`:

- `https://<projekt>.vercel.app/` — powinno zwrócić HTML strony głównej (SSR)
- `https://<projekt>.vercel.app/oferta/pompy-ciepla` — powinno zwrócić wyrenderowaną podstronę
- `https://<projekt>.vercel.app/assets/<plik>.js` — statyczne assety z `dist/client`

Jeśli `/` nadal zwraca 404:

1. Sprawdź logi funkcji w **Vercel → Deployments → Functions → /api**
2. Upewnij się że Framework Preset = **Other** (nie "Vite")
3. Upewnij się że Node.js Version = **20.x**
4. Force redeploy bez cache

## Podpięcie domeny soltimus.pl

Po potwierdzeniu że `*.vercel.app` działa: **Project Settings → Domains → Add** → `soltimus.pl` i postępuj zgodnie z instrukcjami Vercel (DNS A/CNAME).
