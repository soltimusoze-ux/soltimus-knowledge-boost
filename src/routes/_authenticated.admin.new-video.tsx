import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitVideo } from "@/lib/wp.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/new-video")({
  component: NewVideoPage,
});

function NewVideoPage() {
  const submitFn = useServerFn(submitVideo);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent, status: "publish" | "draft") {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) {
      toast.error("Tytuł i link wideo są wymagane");
      return;
    }
    setBusy(true);
    try {
      const r = await submitFn({
        data: {
          title: title.trim(),
          description: description.trim(),
          videoUrl: videoUrl.trim(),
          status,
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
        <CardTitle>Nowy materiał wideo</CardTitle>
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
              placeholder="np. Instrukcja montażu pompy ciepła"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">Link YouTube lub Vimeo *</Label>
            <Input
              id="videoUrl"
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-muted-foreground">
              Obsługujemy linki: youtube.com/watch?v=..., youtu.be/..., vimeo.com/...
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis</Label>
            <Textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opis pojawi się pod odtwarzaczem wideo."
            />
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
