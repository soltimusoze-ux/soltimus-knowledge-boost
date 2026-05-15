import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          soltimus.pl
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Strefa wiedzy — CMS
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Wewnętrzny panel do dodawania artykułów, materiałów PDF oraz wideo
          publikowanych na soltimus.pl w sekcji Strefa wiedzy.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild size="lg">
            <Link to="/admin">Otwórz panel</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://soltimus.pl/category/strefa-wiedzy/" target="_blank" rel="noreferrer">
              Zobacz Strefę wiedzy →
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
