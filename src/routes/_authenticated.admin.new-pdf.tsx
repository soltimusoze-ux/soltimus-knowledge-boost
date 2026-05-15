import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitPdf } from "@/lib/wp.functions";
import { fileToBase64 } from "@/lib/file-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/new-pdf")({
  component: NewPdfPage,
});

function NewPdfPage() {
  const submitFn = useServerFn(submitPdf);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent, status: "publish" | "draft") {
    e.preventDefault();
    if (!title.trim() || !file) {
      toast.error("Tytuł i plik są wymagane");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast.error("Plik > 25 MB. WordPress może odrzucić upload.");
      return;
    }
    setBusy(true);
    try {
      const r = await submitFn({
        data: {
          title: title.trim(),
          description: description.trim(),
          status,
          file: {
            filename: file.name,
            contentType: file.type || "application/pdf",
            base64: await fileToBase64(file),
          },
        },
      });
      toast.success(status === "publish" ? "Opublikowane!" : "Zapisano jako szkic");
      console.log("WP post:", r);
      navigate({ to: "/admin" });
    } catch (e: any) {
      toast.error(e?.message || "Błąd publikacji");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nowy materiał PDF</CardTitle>
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
              placeholder="np. Karta katalogowa Daikin Altherma 3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis</Label>
            <Textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Krótki opis materiału, który zobaczy czytelnik nad linkiem do pobrania."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Plik PDF *</Label>
            <Input
              id="file"
              type="file"
              accept="application/pdf,.pdf"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file && (
              <p className="text-xs text-muted-foreground">
                {file.name} — {(file.size / 1024 / 1024).toFixed(2)} MB
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
