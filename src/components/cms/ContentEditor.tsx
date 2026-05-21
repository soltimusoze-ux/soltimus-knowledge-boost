import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { cms, slugify, STATUSES, STATUS_LABEL, type ContentStatus } from "@/lib/cms";
import { EditorShell, EditorSection } from "@/components/cms/EditorShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Generic content editor used by both Articles and Case Studies.
 *
 * Body, FAQ, and metrics are stored as JSON — we expose a clean monospace
 * textarea instead of building a custom block UI (Phase 5 brief: minimal,
 * scalable, no overengineering). Future phases can swap this for a richer
 * block editor without touching the data layer.
 */

export type EntityKind = "article" | "case_study";

interface Props {
  kind: EntityKind;
  id: string;
}

export function ContentEditor({ kind, id }: Props) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isArticle = kind === "article";
  const queryKey = ["cms", isArticle ? "article" : "case", id];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const r = isArticle ? await cms.articles.get(id) : await cms.cases.get(id);
      if (r.error) throw r.error;
      return r.data as any;
    },
  });

  const authors = useQuery({
    queryKey: ["cms", "authors"],
    queryFn: async () => (await cms.authors.list()).data ?? [],
  });
  const categories = useQuery({
    queryKey: ["cms", "categories"],
    queryFn: async () => (await cms.categories.list()).data ?? [],
  });

  const [form, setForm] = useState<any>(null);
  const [bodyText, setBodyText] = useState("[]");
  const [faqText, setFaqText] = useState("[]");
  const [metricsText, setMetricsText] = useState("[]");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!data) return;
    setForm(data);
    setBodyText(JSON.stringify(data.body ?? [], null, 2));
    setFaqText(JSON.stringify(data.faq ?? [], null, 2));
    if (!isArticle) setMetricsText(JSON.stringify(data.metrics ?? [], null, 2));
  }, [data, isArticle]);

  if (isLoading || !form) return <p className="text-sm text-muted-foreground">Ładowanie…</p>;
  if (error) return <p className="text-sm text-destructive">Błąd: {(error as Error).message}</p>;

  function patch(p: Partial<typeof form>) {
    setForm({ ...form, ...p });
  }

  function parseJSON(text: string, field: string) {
    try {
      return JSON.parse(text);
    } catch (e: any) {
      throw new Error(`Niepoprawny JSON w polu "${field}": ${e.message}`);
    }
  }

  async function save(nextStatus?: ContentStatus) {
    setSaving(true);
    try {
      const payload: any = {
        slug: form.slug,
        title: form.title,
        excerpt: isArticle ? form.excerpt : undefined,
        summary: !isArticle ? form.summary : undefined,
        body: parseJSON(bodyText, "Treść (body)"),
        faq: parseJSON(faqText, "FAQ"),
        author_id: form.author_id || null,
        category_id: form.category_id || null,
        cover_image_url: isArticle ? form.cover_image_url || null : undefined,
        hero_image_url: !isArticle ? form.hero_image_url || null : undefined,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        canonical_url: form.canonical_url || null,
        og_image_url: form.og_image_url || null,
        city: form.city || null,
        region: form.region || null,
        status: nextStatus ?? form.status,
        scheduled_for: form.scheduled_for || null,
      };
      if (!isArticle) {
        payload.building_type = form.building_type || null;
        payload.metrics = parseJSON(metricsText, "Metrics");
      }
      if (isArticle) payload.reading_minutes = form.reading_minutes || null;
      if ((nextStatus ?? form.status) === "published" && !form.published_at) {
        payload.published_at = new Date().toISOString();
      }
      const r = isArticle
        ? await cms.articles.update(id, payload)
        : await cms.cases.update(id, payload);
      if (r.error) throw r.error;
      toast.success("Zapisano");
      qc.invalidateQueries({ queryKey });
      qc.invalidateQueries({ queryKey: ["cms", isArticle ? "articles" : "cases"] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Usunąć ten wpis na stałe?")) return;
    const r = isArticle ? await cms.articles.remove(id) : await cms.cases.remove(id);
    if (r.error) {
      toast.error(r.error.message);
      return;
    }
    toast.success("Usunięto");
    qc.invalidateQueries({ queryKey: ["cms", isArticle ? "articles" : "cases"] });
    navigate({ to: isArticle ? "/admin/editorial/articles" : "/admin/editorial/case-studies" });
  }

  return (
    <EditorShell
      eyebrow={isArticle ? "Artykuł" : "Realizacja"}
      title={form.title || "Bez tytułu"}
      description={`/${form.slug}`}
      actions={
        <>
          <StatusBadge status={form.status} />
          <Button variant="outline" onClick={() => save("draft")} disabled={saving}>
            Zapisz szkic
          </Button>
          <Button onClick={() => save("published")} disabled={saving}>
            {form.status === "published" ? "Zapisz" : "Opublikuj"}
          </Button>
          <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={remove}>
            Usuń
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* MAIN COLUMN */}
        <div className="space-y-8">
          <EditorSection title="Podstawowe">
            <div className="grid gap-3">
              <Field label="Tytuł">
                <Input
                  value={form.title ?? ""}
                  onChange={(e) => patch({ title: e.target.value })}
                  onBlur={() => {
                    if (!form.slug || form.slug.startsWith("nowy-artykul-")) {
                      patch({ slug: slugify(form.title || "") });
                    }
                  }}
                />
              </Field>
              <Field label="Slug">
                <Input value={form.slug ?? ""} onChange={(e) => patch({ slug: e.target.value })} />
              </Field>
              <Field label={isArticle ? "Zajawka" : "Streszczenie"}>
                <Textarea
                  rows={3}
                  value={(isArticle ? form.excerpt : form.summary) ?? ""}
                  onChange={(e) =>
                    isArticle
                      ? patch({ excerpt: e.target.value })
                      : patch({ summary: e.target.value })
                  }
                />
              </Field>
            </div>
          </EditorSection>

          <EditorSection
            title="Treść (bloki JSON)"
            description="Lista bloków treści w formacie JSON. Schemat: src/content/articles/types.ts (lub case-studies/types.ts). W przyszłości zastąpione blokowym edytorem."
          >
            <Textarea
              rows={20}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="font-mono text-xs"
            />
          </EditorSection>

          <EditorSection title="FAQ (JSON)" description="Pary pytanie/odpowiedź — używane do JSON-LD i sekcji FAQ.">
            <Textarea
              rows={10}
              value={faqText}
              onChange={(e) => setFaqText(e.target.value)}
              className="font-mono text-xs"
            />
          </EditorSection>

          {!isArticle && (
            <EditorSection title="Metryki (JSON)" description="Wskaźniki techniczne realizacji.">
              <Textarea
                rows={8}
                value={metricsText}
                onChange={(e) => setMetricsText(e.target.value)}
                className="font-mono text-xs"
              />
            </EditorSection>
          )}

          <EditorSection title="SEO / GEO">
            <div className="grid gap-3">
              <Field label="SEO Title">
                <Input
                  value={form.seo_title ?? ""}
                  onChange={(e) => patch({ seo_title: e.target.value })}
                />
              </Field>
              <Field label="SEO Description">
                <Textarea
                  rows={2}
                  value={form.seo_description ?? ""}
                  onChange={(e) => patch({ seo_description: e.target.value })}
                />
              </Field>
              <Field label="Canonical URL">
                <Input
                  value={form.canonical_url ?? ""}
                  onChange={(e) => patch({ canonical_url: e.target.value })}
                />
              </Field>
              <Field label="OG Image URL">
                <Input
                  value={form.og_image_url ?? ""}
                  onChange={(e) => patch({ og_image_url: e.target.value })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Miasto">
                  <Input
                    value={form.city ?? ""}
                    onChange={(e) => patch({ city: e.target.value })}
                  />
                </Field>
                <Field label="Region">
                  <Input
                    value={form.region ?? ""}
                    onChange={(e) => patch({ region: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          </EditorSection>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          <EditorSection title="Publikacja">
            <div className="space-y-3 rounded-lg border bg-background p-4">
              <Field label="Status">
                <Select value={form.status} onValueChange={(v) => patch({ status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Zaplanowano na">
                <Input
                  type="datetime-local"
                  value={form.scheduled_for ? form.scheduled_for.slice(0, 16) : ""}
                  onChange={(e) =>
                    patch({ scheduled_for: e.target.value ? new Date(e.target.value).toISOString() : null })
                  }
                />
              </Field>
            </div>
          </EditorSection>

          <EditorSection title="Klasyfikacja">
            <div className="space-y-3 rounded-lg border bg-background p-4">
              <Field label="Autor">
                <Select
                  value={form.author_id ?? "none"}
                  onValueChange={(v) => patch({ author_id: v === "none" ? null : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— brak —</SelectItem>
                    {(authors.data ?? []).map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Kategoria">
                <Select
                  value={form.category_id ?? "none"}
                  onValueChange={(v) => patch({ category_id: v === "none" ? null : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— brak —</SelectItem>
                    {(categories.data ?? []).map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </EditorSection>

          <EditorSection title="Media">
            <div className="space-y-3 rounded-lg border bg-background p-4">
              <Field label={isArticle ? "Cover image URL" : "Hero image URL"}>
                <Input
                  value={(isArticle ? form.cover_image_url : form.hero_image_url) ?? ""}
                  onChange={(e) =>
                    isArticle
                      ? patch({ cover_image_url: e.target.value })
                      : patch({ hero_image_url: e.target.value })
                  }
                  placeholder="https://…  (Media → kopiuj URL)"
                />
              </Field>
              {!isArticle && (
                <Field label="Typ budynku">
                  <Input
                    value={form.building_type ?? ""}
                    onChange={(e) => patch({ building_type: e.target.value })}
                  />
                </Field>
              )}
              {isArticle && (
                <Field label="Czas czytania (min)">
                  <Input
                    type="number"
                    value={form.reading_minutes ?? ""}
                    onChange={(e) =>
                      patch({ reading_minutes: e.target.value ? Number(e.target.value) : null })
                    }
                  />
                </Field>
              )}
            </div>
          </EditorSection>
        </aside>
      </div>
    </EditorShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
