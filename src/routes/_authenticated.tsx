import { createFileRoute, Outlet, useNavigate, Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.loading && !auth.isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [auth.loading, auth.isAuthenticated, navigate]);

  if (auth.loading || !auth.isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Ładowanie...</p>
      </div>
    );
  }

  const path = location.pathname;
  const navItems = [
    { to: "/admin", label: "Materiały (WP)", exact: true },
    { to: "/admin/editorial", label: "Editorial" },
    { to: "/admin/new-article", label: "+ Artykuł" },
    { to: "/admin/new-pdf", label: "+ PDF" },
    { to: "/admin/new-video", label: "+ Wideo" },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/admin" className="font-semibold tracking-tight">
            Strefa wiedzy <span className="text-muted-foreground">/ soltimus.pl</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {auth.user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={() => auth.signOut()}>
              Wyloguj
            </Button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
          {navItems.map((item) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
