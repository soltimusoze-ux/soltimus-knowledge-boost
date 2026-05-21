import { createFileRoute, Link, useNavigate, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cms, slugify } from "@/lib/cms";
import { EditorShell } from "@/components/cms/EditorShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/editorial/articles")({
  component: ArticlesLayout,
});

function ArticlesLayout() {
  const matchRoute = useMatchRoute();
  // Render child (new / edit) when present, otherwise the list.
  const isChild = matchRoute({ to: "/admin/editorial/articles", fuzzy: true, pending: false });
  const isList =
    isChild &&
    !matchRoute({ to: "/admin/editorial/articles/new" }) &&
    !matchRoute({ to: "/admin/editorial/articles/$id", fuzzy: true });

  return isList ? <ArticlesList /> : <Outlet />;
}

function ArticlesList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["cms", "articles"],
    queryFn: async () => (await cms.articles.list()).data ?? [],
  });

  async function createDraft() {
    const title = "Nowy artykuł";
    const r = await cms.articles.create({ title, slug: `${slugify(title)}-${Date.now()}`, body: [] });
    if (r.error) {
      toast.error(r.error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["cms", "articles"] });
    navigate({ to: "/admin/editorial/articles/$id", params: { id: r.data.id } });
  }

  return (
    <EditorShell
      eyebrow="Strefa Wiedzy"
      title="Artykuły"
      description="Premium engineering knowledge — artykuły inżynierskie, przewodniki i analizy techniczne."
      actions={<Button onClick={createDraft}>+ Nowy artykuł</Button>}
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Ładowanie…</p>
      ) : (data?.length ?? 0) === 0 ? (
        <EmptyState onCreate={createDraft} />
      ) : (
        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tytuł</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aktualizacja</th>
              </tr>
            </thead>
            <tbody>
              {data!.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <Link
                      to="/admin/editorial/articles/$id"
                      params={{ id: a.id }}
                      className="font-medium hover:underline"
                    >
                      {a.title}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(a.updated_at).toLocaleDateString("pl-PL")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </EditorShell>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="rounded-lg border border-dashed bg-background p-12 text-center">
      <p className="text-sm font-medium">Brak artykułów</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Zacznij od pierwszego szkicu — całą strukturę uzupełnisz w edytorze.
      </p>
      <Button onClick={onCreate} className="mt-4">
        + Utwórz pierwszy artykuł
      </Button>
    </div>
  );
}
