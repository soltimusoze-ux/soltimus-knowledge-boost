import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { fetchMaterials, removeMaterial } from "@/lib/wp.functions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const fetchFn = useServerFn(fetchMaterials);
  const removeFn = useServerFn(removeMaterial);
  const router = useRouter();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: () => fetchFn(),
  });

  async function handleDelete() {
    if (confirmId == null) return;
    setBusy(true);
    try {
      await removeFn({ data: { id: confirmId } });
      toast.success("Przeniesiono do kosza");
      setConfirmId(null);
      await refetch();
      router.invalidate();
    } catch (e: any) {
      toast.error(e?.message || "Błąd usuwania");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Materiały</h1>
          <p className="text-sm text-muted-foreground">
            Wszystkie wpisy z kategorii Strefa wiedzy
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/new-article">+ Artykuł</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/new-pdf">+ PDF</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/new-video">+ Wideo</Link>
          </Button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Ładowanie z soltimus.pl...</p>}
      {isError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Nie udało się pobrać materiałów: {(error as Error)?.message}
        </div>
      )}

      {data?.materials && (
        <div className="overflow-hidden rounded-lg border bg-background">
          {data.materials.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Brak materiałów. Dodaj pierwszy artykuł, PDF lub wideo używając przycisków powyżej.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Tytuł</th>
                  <th className="px-4 py-3">Typ</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {data.materials.map((m) => (
                  <tr key={m.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td
                      className="px-4 py-3 font-medium"
                      dangerouslySetInnerHTML={{ __html: m.title }}
                    />
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="capitalize">
                        {m.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={m.status === "publish" ? "default" : "outline"}>
                        {m.status === "publish" ? "Opublikowany" : m.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(m.date).toLocaleDateString("pl-PL")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="ghost" size="sm">
                          <a href={m.link} target="_blank" rel="noreferrer">
                            Zobacz ↗
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setConfirmId(m.id)}
                        >
                          Usuń
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <AlertDialog open={confirmId != null} onOpenChange={(o) => !o && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Przenieść do kosza?</AlertDialogTitle>
            <AlertDialogDescription>
              Wpis trafi do kosza w WordPressie. Możesz go przywrócić w panelu WP-Admin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={busy}>
              {busy ? "Usuwam..." : "Przenieś do kosza"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
