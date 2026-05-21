# Editorial CMS — QA & Hardening Report (Phase 5B)

Audit performed against the Phase 5 editorial CMS before opening it to real
Soltimus content entry. The review is **read-only** — no schema rewrites,
no admin redesign. Goal: identify what is safe to use today, what is
risky, and what must be fixed before the editorial team starts publishing.

Scope:

- `supabase/migrations/<ts>_phase5_editorial_cms.sql`
- `src/lib/cms.ts`
- `src/components/cms/*`
- `src/routes/_authenticated.admin.editorial.*`
- `src/routes/_authenticated.tsx` (auth gate)
- `src/routes/sitemap[.]xml.ts` (public rendering surface)

---

## 1. Executive summary

| Area | Status | Notes |
|---|---|---|
| Database schema | ✅ OK | 9 tables, enum status, JSONB blocks. Coherent. |
| RLS — read | ✅ OK | Published-only for public; full for authenticated. |
| RLS — write | ⚠️ Single tier | `USING (true)` for any authenticated user. Intentional (Phase 5 brief), but document the trust boundary. |
| Admin route protection | ⚠️ Soft gate | `useEffect`-based redirect, not `beforeLoad`. Brief flash of admin shell possible. |
| Media uploads | ✅ OK | UUID filenames, public-read bucket, auth write. |
| Draft / published workflow | ✅ OK | Status enum + `published_at` auto-set on publish. |
| Scheduled publishing | ❌ Not wired | `scheduled_for` is stored but no cron flips status. |
| Editor usability | ⚠️ JSON-only body | Acceptable for engineers; risky for non-technical editors. |
| Author / category / tag relations | ⚠️ Partial | Tags table + join tables exist but **no tag UI on the editor**. |
| SEO / GEO fields | ✅ OK | Title, description, canonical, OG, city, region all present. |
| JSON block validation | ❌ Weak | `JSON.parse` only — no schema validation against block types. |
| FAQ rendering | ⚠️ Schema OK, render path not wired | Public renderer for CMS-sourced articles/cases doesn't exist yet. |
| Sitemap integration | ❌ Not wired | `sitemap.xml` only enumerates the static registry. |
| Public rendering | ❌ Not wired | `/wiedza/...` and `/realizacje/...` read registries, not `cms_*` tables. |
| Security posture | ✅ Acceptable for Phase 5 | No PII tables exposed; admin pages auth-gated; storage write requires auth. |
| Data-loss risk | 🔴 Real | Hard delete only; no soft-delete, no revisions, no draft-vs-published version. |
| Mobile / tablet admin | ⚠️ Usable, not polished | Two-column editor stacks on mobile; JSON textarea is hard on touch. |

**Verdict:** Safe to use **internally** for drafting and classification.
**Not yet safe** for public publishing — the rendering layer + sitemap +
scheduled-publish cron are missing. Treat Phase 5B as a backstage tool
until Phase 6 wires the public path.

---

## 2. What works

### 2.1 Schema & RLS

- Status enum (`draft / scheduled / published / archived`) is correctly
  modeled — no booleans, no string columns to drift apart.
- Public-read policies correctly gate on `status = 'published'`, with an
  authenticated bypass so editors can preview drafts.
- Authenticated-write policies are uniform across all editorial tables —
  no accidental orphan tables.
- `media_assets` UUID-filename strategy prevents cache poisoning and
  filename collisions.
- Storage bucket policies (`Public read`, `Auth upload/update/delete`)
  match the table-level posture.

### 2.2 Data layer

- `src/lib/cms.ts` exposes a thin, **typed** helper for every entity.
  Call sites in admin routes stay declarative.
- `slugify()` handles Polish characters (`ł`, diacritics) correctly.
- `uploadEditorialMedia()` inserts into `media_assets` after upload —
  no orphan files in storage without a DB row.

### 2.3 Editor UX (within JSON-block constraint)

- Sticky publish actions in `EditorShell` header.
- Status badge + datetime-local picker for `scheduled_for`.
- Author / category dropdowns load from registries; `none` sentinel
  prevents the empty-string vs null trap.
- Slug auto-derives from title on blur (only when the slug looks
  unedited) — good default, doesn't surprise on rename.
- `published_at` is auto-stamped on first publish.

### 2.4 Media library

- Grid view, multi-file upload, copy-URL action, delete with confirm.
- Public URLs are immediately usable in hero/cover fields.

---

## 3. What is risky (fix before real content)

### 3.1 🔴 Hard delete only

`cms.articles.remove()` / `cms.cases.remove()` are `DELETE … WHERE id = ?`.
A misclick (the confirm prompt is the only safeguard) destroys all body
content, FAQ, metrics, and SEO metadata for that row.

**Fix before publishing:**
- Add an `archived` action that flips `status = 'archived'` (already
  supported by the enum) and **remove the destructive Delete button** from
  the editor header — keep delete only in a separate "Danger zone" section
  or as an admin-only `supabaseAdmin` operation.

### 3.2 🔴 No JSON schema validation

Body / FAQ / metrics are validated only by `JSON.parse`. An editor can
save `[{ "type": "wrong_type", "garbage": true }]` and the next public
render will throw at runtime.

**Fix before publishing:**
- Add a Zod schema mirroring `src/content/articles/types.ts` and
  `src/content/case-studies/types.ts` block discriminated unions; run it
  in `save()` before the Supabase update.
- Surface block-level errors inline (path + reason), not a single toast.

### 3.3 🔴 Public render path is missing

`/wiedza/$category/$slug` and `/realizacje/$slug` read from the **static
registries** (`src/content/articles/*`, `src/content/case-studies/*`),
not from `cms_articles` / `cms_case_studies`.

A published row in the CMS is **invisible on the public site**.

**Fix before publishing (Phase 6 prerequisite):**
- Create `listCmsArticles()` / `getCmsArticleBySlug()` server fns.
- Update the public routes to merge registry + CMS, with CMS taking
  precedence on slug collisions, OR namespace CMS slugs to make
  collisions impossible.

### 3.4 🔴 Sitemap doesn't include CMS rows

`src/routes/sitemap[.]xml.ts` enumerates the static registries only. A
published article that isn't in the sitemap won't be indexed.

**Fix in the same step as 3.3:** add the CMS rows (filtered to
`status = 'published'`) to the sitemap loader. Same query, just a
different output format.

### 3.5 🟠 Scheduled publishing is not enforced

`scheduled_for` is stored but nothing flips `status` to `published` at
that timestamp. Editors who use "Scheduled" expect it to go live
automatically; today it stays in draft state forever.

**Fix before relying on this feature:**
- Option A (recommended): a TanStack server route under
  `/api/public/cms/run-scheduler` invoked by Cloudflare Cron or
  `pg_cron`. Verify a shared secret header before flipping rows.
- Option B (simpler): a Supabase scheduled function (pg_cron + SQL)
  that runs `UPDATE cms_articles SET status='published',
  published_at=now() WHERE status='scheduled' AND scheduled_for <= now()`
  on a 5-minute tick.
- Until either is in place, **hide the "Scheduled" option from the
  status dropdown** to avoid editorial confusion.

### 3.6 🟠 Admin gate is `useEffect`-based, not `beforeLoad`

`src/routes/_authenticated.tsx` redirects in `useEffect`. The auth
shell renders briefly before the redirect fires — not a security hole
(RLS still protects data), but it shows the "Ładowanie…" state to
unauthenticated visitors and momentarily exposes admin chrome.

**Recommended:** migrate to `beforeLoad` + `throw redirect({ to: "/login" })`
per the `tanstack-auth-guards` pattern. Pair with a child `beforeLoad`
that awaits `supabase.auth.getUser()` for routes that call protected
server fns (none of the editorial routes do yet — they call the browser
client — but the pattern future-proofs).

### 3.7 🟠 Tag relations have no UI

The `tags` table + `article_tags` / `case_study_tags` join tables exist
and are RLS-correct, but `ContentEditor.tsx` doesn't render a tag
selector. Editors can manage tag definitions but cannot attach them to
content. Result: tag pages will look empty.

**Fix before publishing:** add a multi-select tag widget to the editor
sidebar. The data layer needs a `cms.articleTags.set(articleId, tagIds[])`
helper that diffs + applies inserts/deletes.

### 3.8 🟠 RLS write policy is wide-open within authenticated tier

Any authenticated user can update or delete any row in any editorial
table. Acceptable today (one small trusted team, brief explicitly says
no roles yet) but **document this and lock down sign-up**:

- Confirm new-user signup is closed (or guarded) on the auth side so a
  random visitor can't create an account and get editorial access.
- When the team grows, introduce `user_roles` + `has_role()` per the
  `<user-roles>` knowledge contract (already documented in
  `editorial-cms-architecture.md` §6).

### 3.9 🟡 No revisions / no draft-vs-published split

Saving over a published row immediately overwrites the live content.
There is no "draft of a published article" model and no audit trail.

**Acceptable for Phase 5B** (small team, low velocity), but plan for:
- `cms_article_revisions` (append-only snapshot on save).
- A `published_body` vs `draft_body` JSONB pair, so editors can stage
  changes without going through `archived → republish`.

### 3.10 🟡 Editor lacks block-level UX

Body editing is a single JSON textarea. Risks:

- Easy to break (forget a comma → 3-min recovery).
- No copy-paste from Notion/Google Docs without a converter.
- No inline media picker — editors must visit Media, copy URL,
  paste back. Friction × every image.

Phase 6 should introduce a real block editor (Tiptap / Plate). Until
then, **prefer authoring in the static registry** for flagship
content and reserve the CMS for shorter, less structurally complex
posts.

### 3.11 🟡 Mobile / tablet admin

- Editor uses `lg:grid-cols-[1fr_320px]` — stacks correctly on tablet
  and mobile, no overflow.
- JSON textareas (`rows={20}` font-mono) are technically usable on
  iPad but painful on phones. Acceptable since editorial work is
  desktop-first.
- Top nav (`overflow-x-auto`) scrolls horizontally on narrow widths —
  works but feels cramped.

**Acceptable.** Don't optimize for mobile-first authoring; document
that the CMS is desktop-primary.

---

## 4. What can wait

- Inline rich-text / block editor (Phase 6).
- Inline media picker in the body editor.
- Revisions table + diff view.
- Roles + permissions matrix (`editor / reviewer / admin`).
- HubSpot mirror sync.
- Soltimus Lab episode entity.
- AI-assisted SEO title / FAQ extraction inside the editor.
- Responsive image variants on upload (480 / 960 / 1920).
- Content-relationships UI (the table is generic, the editor doesn't
  expose it yet).

None of these block real content entry — they block **scaling** the
editorial operation past one disciplined author.

---

## 5. Recommended first publishing workflow

Until the gaps in §3.3–§3.5 are closed, treat the CMS as a **backstage
drafting tool**. Concrete sequence for the first real article:

1. **Draft in CMS** to capture structure, classification, SEO/GEO,
   and FAQ. Save as `draft`.
2. **Review** the JSON body for valid block types against
   `src/content/articles/types.ts` before publishing.
3. **Mirror to static registry** for the flagship piece — copy the
   block array into a new file under `src/content/articles/<category>/`.
   This is what actually renders publicly today.
4. **Mark the CMS row** `published` so it shows up in the admin
   "Published" list and the upcoming merged listing works on day one.
5. **Skip Scheduled status** until §3.5 lands.
6. **Don't use Delete** on the editor — use the status dropdown →
   `archived` instead.

When §3.3 + §3.4 + §3.5 are merged, drop step 3 — the CMS row will
render directly and appear in the sitemap. At that point steps become:
draft → review → validate → publish.

---

## 6. Pre-flight checklist (must be green before turning the CMS public)

- [ ] Zod-validated body / FAQ / metrics blocks
- [ ] Public renderer reads `cms_*` tables (registry merge)
- [ ] Sitemap includes published `cms_*` rows
- [ ] Scheduled-publish cron live, or "Scheduled" status hidden
- [ ] Editor `Delete` replaced with `Archive`; hard delete behind admin-only path
- [ ] Tag selector wired in editor
- [ ] Auth signup confirmed closed / invite-only
- [ ] `_authenticated` migrated to `beforeLoad` redirect

After that list is green, the CMS is safe for real Soltimus content.
