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

export const Route = createFileRoute("/_authenticated/admin/editorial/authors")({
  component: AuthorsPage,
});

function AuthorsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["cms", "authors"],
    queryFn: async () => (await cms.authors.list()).data ?? [],
  });

  const [editing, setEditing] = useState<any>(blank());

  function blank() {
    return {
      id: undefined,
      slug: "",
      name: "",
      role: "",
      bio: "",
      linkedin_url: "",
      avatar_url: "",
      credentials: "",
      expertise: [] as string[],
    };
  }

  async function save() {
    if (!editing.name) return toast.error("Imię i nazwisko wymagane");
    const slug = editing.slug || slugify(editing.name);
    const r = await cms.authors.upsert({ ...editing, slug });
    if (r.error) return toast.error(r.error.message);
    toast.success("Zapisano autora");
    setEditing(blank());
    qc.invalidateQueries({ queryKey: ["cms", "authors"] });
  }

  async function remove(id: string) {
    if (!confirm("Usunąć tego autora?")) return;
    const r = await cms.authors.remove(id);
    if (r.error) return toast.error(r.error.message);
    qc.invalidateQueries({ queryKey: ["cms", "authors"] });
  }

  return (
    <EditorShell
      eyebrow="Credibility layer"
      title="Autorzy"
      description="System autorów dla artykułów i realizacji — bio, ekspertyza, credentials."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <EditorSection title="Lista autorów">
          {(data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">Brak autorów.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border bg-background">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Imię i nazwisko</th>
                    <th className="px-4 py-3">Rola</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {data!.map((a) => (
                    <tr key={a.id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium">{a.name}</p>
                        <p className="text-[11px] text-muted-foreground">{a.credentials}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{a.role}</td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="ghost" onClick={() => setEditing(a)}>
                          Edytuj
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => remove(a.id)}
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

        <EditorSection title={editing.id ? "Edytuj autora" : "Nowy autor"}>
          <div className="space-y-3 rounded-lg border bg-background p-4">
            <Pair label="Imię i nazwisko">
              <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Pair>
            <Pair label="Slug">
              <Input
                value={editing.slug}
                placeholder="auto z imienia"
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              />
            </Pair>
            <Pair label="Rola">
              <Input value={editing.role ?? ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
            </Pair>
            <Pair label="Credentials">
              <Input
                value={editing.credentials ?? ""}
                placeholder="np. 12 lat HVAC · 600+ instalacji"
                onChange={(e) => setEditing({ ...editing, credentials: e.target.value })}
              />
            </Pair>
            <Pair label="Bio">
              <Textarea
                rows={4}
                value={editing.bio ?? ""}
                onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
              />
            </Pair>
            <Pair label="LinkedIn URL">
              <Input
                value={editing.linkedin_url ?? ""}
                onChange={(e) => setEditing({ ...editing, linkedin_url: e.target.value })}
              />
            </Pair>
            <Pair label="Avatar URL">
              <Input
                value={editing.avatar_url ?? ""}
                onChange={(e) => setEditing({ ...editing, avatar_url: e.target.value })}
              />
            </Pair>
            <Pair label="Ekspertyza (po przecinku)">
              <Input
                value={(editing.expertise ?? []).join(", ")}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    expertise: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
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
