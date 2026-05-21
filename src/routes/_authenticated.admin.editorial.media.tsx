import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cms, uploadEditorialMedia } from "@/lib/cms";
import { EditorShell } from "@/components/cms/EditorShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/editorial/media")({
  component: MediaPage,
});

function MediaPage() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["cms", "media"],
    queryFn: async () => (await cms.media.list()).data ?? [],
  });
  const [busy, setBusy] = useState(false);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setBusy(true);
    try {
      for (const f of Array.from(files)) {
        await uploadEditorialMedia(f);
      }
      toast.success(`Załadowano ${files.length} plik(ów)`);
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  async function remove(id: string) {
    if (!confirm("Usunąć plik?")) return;
    const r = await cms.media.remove(id);
    if (r.error) return toast.error(r.error.message);
    qc.invalidateQueries({ queryKey: ["cms", "media"] });
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    toast.success("Skopiowano URL");
  }

  return (
    <EditorShell
      eyebrow="Asset library"
      title="Media"
      description="Centralny katalog obrazów i materiałów wspierających."
      actions={
        <label>
          <input type="file" multiple accept="image/*" onChange={onUpload} className="hidden" disabled={busy} />
          <Button asChild>
            <span>{busy ? "Wgrywam…" : "+ Wgraj pliki"}</span>
          </Button>
        </label>
      }
    >
      {(data?.length ?? 0) === 0 ? (
        <div className="rounded-lg border border-dashed bg-background p-12 text-center">
          <p className="text-sm font-medium">Brak plików</p>
          <p className="mt-1 text-sm text-muted-foreground">Wgraj obrazy, by używać ich w artykułach i realizacjach.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data!.map((m) => (
            <div key={m.id} className="group overflow-hidden rounded-lg border bg-background">
              <div className="aspect-square bg-muted/40">
                {m.mime_type?.startsWith("image/") && (
                  <img src={m.url} alt={m.alt ?? ""} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="space-y-2 p-3">
                <p className="truncate text-[11px] text-muted-foreground" title={m.url}>
                  {m.storage_path ?? m.url}
                </p>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-7 flex-1 text-[11px]" onClick={() => copy(m.url)}>
                    Kopiuj URL
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-[11px] text-destructive hover:text-destructive"
                    onClick={() => remove(m.id)}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </EditorShell>
  );
}
