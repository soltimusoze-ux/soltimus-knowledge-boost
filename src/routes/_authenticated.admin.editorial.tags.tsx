import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cms, slugify } from "@/lib/cms";
import { EditorShell, EditorSection } from "@/components/cms/EditorShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/admin/editorial/tags")({
  component: TagsPage,
});

function TagsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["cms", "tags"],
    queryFn: async () => (await cms.tags.list()).data ?? [],
  });
  const [name, setName] = useState("");

  async function add() {
    if (!name.trim()) return;
    const r = await cms.tags.upsert({ name: name.trim(), slug: slugify(name) });
    if (r.error) return toast.error(r.error.message);
    setName("");
    qc.invalidateQueries({ queryKey: ["cms", "tags"] });
  }

  async function remove(id: string) {
    const r = await cms.tags.remove(id);
    if (r.error) return toast.error(r.error.message);
    qc.invalidateQueries({ queryKey: ["cms", "tags"] });
  }

  return (
    <EditorShell eyebrow="Taksonomia" title="Tagi" description="Lekkie etykiety dla treści.">
      <EditorSection>
        <div className="flex gap-2">
          <Input
            placeholder="Nowy tag"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <Button onClick={add}>Dodaj</Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {(data ?? []).map((t) => (
            <div
              key={t.id}
              className="group flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs"
            >
              <span>{t.name}</span>
              <button
                onClick={() => remove(t.id)}
                className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
          {(data?.length ?? 0) === 0 && <p className="text-sm text-muted-foreground">Brak tagów.</p>}
        </div>
      </EditorSection>
    </EditorShell>
  );
}
