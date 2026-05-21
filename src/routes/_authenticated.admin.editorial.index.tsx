import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { cms } from "@/lib/cms";
import { EditorShell } from "@/components/cms/EditorShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/editorial/")({
  component: DashboardPage,
});

function DashboardPage() {
  const articles = useQuery({
    queryKey: ["cms", "articles"],
    queryFn: async () => (await cms.articles.list()).data ?? [],
  });
  const cases = useQuery({
    queryKey: ["cms", "cases"],
    queryFn: async () => (await cms.cases.list()).data ?? [],
  });

  const counts = {
    articles: articles.data?.length ?? 0,
    drafts: articles.data?.filter((a) => a.status === "draft").length ?? 0,
    cases: cases.data?.length ?? 0,
    casesDraft: cases.data?.filter((c) => c.status === "draft").length ?? 0,
  };

  return (
    <EditorShell
      eyebrow="Soltimus Editorial"
      title="Pulpit redakcyjny"
      description="Spokojne miejsce do tworzenia i utrzymywania treści inżynierskich Soltimus — artykułów Strefy Wiedzy, realizacji i materiałów wspierających."
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Artykuły" value={counts.articles} hint={`${counts.drafts} szkiców`} />
        <StatCard label="Realizacje" value={counts.cases} hint={`${counts.casesDraft} szkiców`} />
        <StatCard label="Autorzy" value="—" hint="zarządzaj w sekcji" />
        <StatCard label="Kategorie" value="—" hint="zarządzaj w sekcji" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentList
          title="Ostatnie artykuły"
          to="/admin/editorial/articles"
          items={(articles.data ?? []).slice(0, 6).map((a) => ({
            id: a.id,
            href: `/admin/editorial/articles/${a.id}`,
            title: a.title,
            status: a.status,
            updated: a.updated_at,
          }))}
        />
        <RecentList
          title="Ostatnie realizacje"
          to="/admin/editorial/case-studies"
          items={(cases.data ?? []).slice(0, 6).map((c) => ({
            id: c.id,
            href: `/admin/editorial/case-studies/${c.id}`,
            title: c.title,
            status: c.status,
            updated: c.updated_at,
          }))}
        />
      </div>
    </EditorShell>
  );
}

function StatCard({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function RecentList({
  title,
  to,
  items,
}: {
  title: string;
  to: string;
  items: { id: string; href: string; title: string; status: any; updated: string }[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        <Link to={to} className="text-xs text-muted-foreground hover:text-foreground">
          Zobacz wszystkie →
        </Link>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Brak wpisów</p>
        ) : (
          <ul className="divide-y">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-2.5">
                <Link to={i.href} className="truncate text-sm font-medium hover:underline">
                  {i.title}
                </Link>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge status={i.status} />
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(i.updated).toLocaleDateString("pl-PL")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
