import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cms, slugify } from "@/lib/cms";
import { EditorShell, EditorSection } from "@/components/cms/EditorShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin/editorial/categories")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["cms", "categories"],
    queryFn: async () => (await cms.categories.list()).data ?? [],
  });
  const [editing, setEditing] = useState<any>(blank());

  function blank() {
    return { id: undefined, slug: "", name: "", description: "", color: "", sort_order: 0 };
  }

  async function save() {
    if (!editing.name) return toast.error("Nazwa wymagana");
    const r = await cms.categories.upsert({
      ...editing,
      slug: editing.slug || slugify(editing.name),
    });
    if (r.error) return toast.error(r.error.message);
    toast.success("Zapisano");
    setEditing(blank());
    qc.invalidateQueries({ queryKey: ["cms", "categories"] });
  }

  async function remove(id: string) {
    if (!confirm("Usunąć kategorię?")) return;
    const r = await cms.categories.remove(id);
    if (r.error) return toast.error(r.error.message);
    qc.invalidateQueries({ queryKey: ["cms", "categories"] });
  }

  return (
    <EditorShell eyebrow="Taksonomia" title="Kategorie" description="Kategorie dla artykułów i realizacji.">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <EditorSection title="Lista">
          {(data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">Brak kategorii.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border bg-background">
              <table className="w-full text-sm">
                <tbody>
                  {data!.map((c) => (
                    <tr key={c.id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">/{c.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="ghost" onClick={() => setEditing(c)}>
                          Edytuj
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => remove(c.id)}
                        >
                          Usuń
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </EditorSection>

        <EditorSection title={editing.id ? "Edytuj" : "Nowa kategoria"}>
          <div className="space-y-3 rounded-lg border bg-background p-4">
            <Pair label="Nazwa">
              <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Pair>
            <Pair label="Slug">
              <Input
                value={editing.slug}
                placeholder="auto z nazwy"
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              />
            </Pair>
            <Pair label="Opis">
              <Textarea
                rows={3}
                value={editing.description ?? ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              />
            </Pair>
            <Pair label="Kolejność">
              <Input
                type="number"
                value={editing.sort_order ?? 0}
                onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
              />
            </Pair>
            <div className="flex gap-2 pt-2">
              <Button onClick={save}>{editing.id ? "Zapisz" : "Dodaj"}</Button>
              {editing.id && (
                <Button variant="outline" onClick={() => setEditing(blank())}>
                  Anuluj
                </Button>
              )}
            </div>
          </div>
        </EditorSection>
      </div>
    </EditorShell>
  );
}

function Pair({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
