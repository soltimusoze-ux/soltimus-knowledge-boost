import { createFileRoute, Link, useNavigate, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cms, slugify } from "@/lib/cms";
import { EditorShell } from "@/components/cms/EditorShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/editorial/case-studies")({
  component: CasesLayout,
});

function CasesLayout() {
  const matchRoute = useMatchRoute();
  const isList = !matchRoute({ to: "/admin/editorial/case-studies/$id", fuzzy: true });
  return isList ? <CasesList /> : <Outlet />;
}

function CasesList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["cms", "cases"],
    queryFn: async () => (await cms.cases.list()).data ?? [],
  });

  async function createDraft() {
    const title = "Nowa realizacja";
    const r = await cms.cases.create({
      title,
      slug: `${slugify(title)}-${Date.now()}`,
      body: [],
    });
    if (r.error) {
      toast.error(r.error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["cms", "cases"] });
    navigate({ to: "/admin/editorial/case-studies/$id", params: { id: r.data.id } });
  }

  return (
    <EditorShell
      eyebrow="Realizacje"
      title="Case studies"
      description="Premium engineering case studies — dokumentowanie projektów inżynierskich Soltimus."
      actions={<Button onClick={createDraft}>+ Nowa realizacja</Button>}
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Ładowanie…</p>
      ) : (data?.length ?? 0) === 0 ? (
        <div className="rounded-lg border border-dashed bg-background p-12 text-center">
          <p className="text-sm font-medium">Brak realizacji</p>
          <Button onClick={createDraft} className="mt-4">
            + Utwórz pierwszą realizację
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tytuł</th>
                <th className="px-4 py-3">Lokalizacja</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aktualizacja</th>
              </tr>
            </thead>
            <tbody>
              {data!.map((c) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <Link
                      to="/admin/editorial/case-studies/$id"
                      params={{ id: c.id }}
                      className="font-medium hover:underline"
                    >
                      {c.title}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">/{c.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {[c.city, c.region].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(c.updated_at).toLocaleDateString("pl-PL")}
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
