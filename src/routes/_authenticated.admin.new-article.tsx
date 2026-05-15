import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitArticle } from "@/lib/wp.functions";
import { fileToBase64 } from "@/lib/file-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/new-article")({
  component: NewArticlePage,
});

function NewArticlePage() {
  const submitFn = useServerFn(submitArticle);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent, status: "publish" | "draft") {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Tytuł i treść są wymagane");
      return;
    }
    setBusy(true);
    try {
      let featuredPayload = null;
      if (featured) {
        if (featured.size > 8 * 1024 * 1024) {
          throw new Error("Obrazek > 8 MB");
        }
        featuredPayload = {
          filename: featured.name,
          contentType: featured.type || "image/jpeg",
          base64: await fileToBase64(featured),
        };
      }
      const r = await submitFn({
        data: {
          title: title.trim(),
          content,
          excerpt: excerpt.trim(),
          status,
          featured: featuredPayload,
        },
      });
      toast.success(status === "publish" ? "Opublikowane!" : "Zapisano jako szkic");
      navigate({ to: "/admin" });
      console.log("WP post:", r);
    } catch (e: any) {
      toast.error(e?.message || "Błąd publikacji");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nowy artykuł</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={(e) => handleSubmit(e, "publish")}>
          <div className="space-y-2">
            <Label htmlFor="title">Tytuł *</Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="np. Jak działa pompa ciepła Daikin Altherma"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Krótki opis (zajawka)</Label>
            <Textarea
              id="excerpt"
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Pojawi się na liście wpisów"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Treść artykułu * (HTML jest dozwolony)</Label>
            <Textarea
              id="content"
              required
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"<p>Pierwszy akapit...</p>\n<h2>Nagłówek</h2>\n<p>Kolejny akapit...</p>"}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Możesz wklejać surowy HTML lub zwykły tekst. Akapity oddzielaj pustą linią.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured">Obrazek wyróżniający (opcjonalnie)</Label>
            <Input
              id="featured"
              type="file"
              accept="image/*"
              onChange={(e) => setFeatured(e.target.files?.[0] || null)}
            />
            {featured && (
              <p className="text-xs text-muted-foreground">
                {featured.name} — {(featured.size / 1024).toFixed(0)} KB
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={busy}>
              {busy ? "Publikuję..." : "Opublikuj"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={(e) => handleSubmit(e as any, "draft")}
            >
              Zapisz jako szkic
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
