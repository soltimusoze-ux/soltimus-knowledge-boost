
# Soltimus — Publication Readiness Plan

The current state: the real marketing site lives at `/premium` (2120 lines, full homepage). `/` is just a CMS admin landing. `/zespol`, `/lab`, `/wiedza` exist. There is no `/kontakt`, `/oferta`, `/realizacje` route yet.

I'll bring the site to a clean, publishable state in focused passes.

## 1. Centralize company data
Create `src/lib/company.ts` with single source of truth:
- name, address, phone, email, NIP, KRS, REGON, hours
- import everywhere instead of hardcoded strings.

Update all occurrences in `premium.tsx`, `zespol.tsx`, `__root.tsx`, lab/wiedza pages, footer, contact CTA blocks.

## 2. Promote `/premium` to the real homepage
- Move the CMS landing currently at `/` to `/admin-home` (or keep at `/admin` which already exists) — replace `src/routes/index.tsx` with the premium homepage content.
- Delete or repurpose `src/routes/premium.tsx` (redirect `/premium` → `/`).
- Update internal links accordingly.

## 3. Header & logo polish
Inside the homepage shell:
- Use brand PNG (`logoDark` on light, `logoLight` on dark) with fixed `h-9 md:h-10 w-auto`, never stretched, with proper left padding and `gap-10` from nav.
- Nav items: Start · Oferta · Realizacje · Zespół · Strefa Wiedzy · Kontakt.
- Primary CTA "Umów konsultację" + phone `+48 500 350 150` (icon button on desktop, sticky bottom CTA on mobile).
- Refine mobile menu: large tap targets, phone button, single CTA.

## 4. New routes
- `src/routes/kontakt.tsx` — full contact page: company block, phone, email, hours, address, embedded Google Maps iframe (Garwolin), simple form (name, phone, email, topic dropdown with the 7 options, message), CTA "Umów konsultację". Form posts via a `createServerFn` that stores into Supabase `contact_messages` table (create migration with RLS: insert public, select admin).
- `src/routes/oferta.tsx` — overview of services (heat pumps, PV, energy storage, ventilation, thermomodernization, premium energy systems). Reuse existing offer cards from premium.
- `src/routes/realizacje.tsx` — "coming soon / rozwijamy portfolio realizacji" intentional placeholder with 2-3 sample teaser cards.

## 5. Homepage refinements
- First screen headline updated to: *"Nowoczesne systemy energii, ogrzewania i komfortu dla wymagających domów."*
- Proof-points strip: Autoryzowany Partner Daikin · Zespół inżynierów · Kompleksowa realizacja · Pomoc w dofinansowaniach · Serwis po montażu.
- Trim overly busy effects, keep premium calm.
- Team section uses authentic photos with shared cinematic grading (already in `HomepageTeamSection`), updated intro copy.

## 6. `/zespol` page polish
- Replace bios with the official copy (Bartosz, Jarek, Konrad, Iza, Karolina).
- Tighten typography spacing, ensure portrait grading consistent, remove duplication with homepage section.

## 7. Footer redesign (shared component)
Create `src/components/site/SiteFooter.tsx`:
- Brand block + tagline
- Address, phone, email, hours
- NIP / KRS / REGON
- Quick links (Start, Oferta, Realizacje, Zespół, Strefa Wiedzy, Kontakt)
- Services list
- Polityka prywatności · Polityka cookies (stub routes if missing)
- Bottom bar with © Soltimus sp. z o.o.

Use on every public route.

## 8. Lab / Knowledge Hub intentional "coming soon"
- Keep existing content where present; for empty states show clean "Rozwijamy platformę ekspercką — pierwsze materiały już wkrótce" cards rather than blank space.

## 9. Audit pass
- Remove all placeholder/lorem text, ensure consistent buttons (`rounded-full bg-[#F5B800] text-black` primary, ghost border secondary), heading scale, spacing rhythm, mobile breakpoints, alt text on team photos, structured data (`Organization` JSON-LD with full company info in `__root.tsx` head).

## Technical notes
- New DB: `contact_messages(id, created_at, name, phone, email, topic, message, status)` with RLS: insert allowed to anon, select restricted to authenticated admin.
- Single `COMPANY` constant exported from `src/lib/company.ts`.
- Add `Organization` schema.org JSON-LD in `__root.tsx`.
- No HubSpot, no automations, no Lab/Knowledge expansion.

## Out of scope (per request)
HubSpot integration, advanced automations, Lab/Knowledge Hub content expansion.
