/**
 * CMS data layer — thin wrappers around the Supabase editorial tables.
 *
 * Kept minimal on purpose (Phase 5 brief): no auth roles, no caching layer,
 * no optimistic mutations. Use directly from admin route components.
 */
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type ContentStatus = Database["public"]["Enums"]["content_status"];
export type CmsArticle = Database["public"]["Tables"]["cms_articles"]["Row"];
export type CmsArticleInsert = Database["public"]["Tables"]["cms_articles"]["Insert"];
export type CmsCaseStudy = Database["public"]["Tables"]["cms_case_studies"]["Row"];
export type CmsCaseStudyInsert = Database["public"]["Tables"]["cms_case_studies"]["Insert"];
export type CmsAuthor = Database["public"]["Tables"]["authors"]["Row"];
export type CmsCategory = Database["public"]["Tables"]["categories"]["Row"];
export type CmsTag = Database["public"]["Tables"]["tags"]["Row"];
export type CmsMedia = Database["public"]["Tables"]["media_assets"]["Row"];

export const STATUSES: ContentStatus[] = ["draft", "scheduled", "published", "archived"];

export const STATUS_LABEL: Record<ContentStatus, string> = {
  draft: "Szkic",
  scheduled: "Zaplanowany",
  published: "Opublikowany",
  archived: "Archiwum",
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Tiny query helpers — keep call sites declarative in admin pages. */
export const cms = {
  articles: {
    list: () =>
      supabase
        .from("cms_articles")
        .select("id, slug, title, status, published_at, updated_at, category_id, author_id")
        .order("updated_at", { ascending: false }),
    get: (id: string) => supabase.from("cms_articles").select("*").eq("id", id).single(),
    create: (row: CmsArticleInsert) =>
      supabase.from("cms_articles").insert(row).select("id").single(),
    update: (id: string, row: Partial<CmsArticleInsert>) =>
      supabase.from("cms_articles").update(row).eq("id", id),
    remove: (id: string) => supabase.from("cms_articles").delete().eq("id", id),
  },
  cases: {
    list: () =>
      supabase
        .from("cms_case_studies")
        .select("id, slug, title, status, published_at, updated_at, city, region")
        .order("updated_at", { ascending: false }),
    get: (id: string) => supabase.from("cms_case_studies").select("*").eq("id", id).single(),
    create: (row: CmsCaseStudyInsert) =>
      supabase.from("cms_case_studies").insert(row).select("id").single(),
    update: (id: string, row: Partial<CmsCaseStudyInsert>) =>
      supabase.from("cms_case_studies").update(row).eq("id", id),
    remove: (id: string) => supabase.from("cms_case_studies").delete().eq("id", id),
  },
  authors: {
    list: () => supabase.from("authors").select("*").order("name"),
    upsert: (row: Database["public"]["Tables"]["authors"]["Insert"]) =>
      supabase.from("authors").upsert(row).select("id").single(),
    remove: (id: string) => supabase.from("authors").delete().eq("id", id),
  },
  categories: {
    list: () => supabase.from("categories").select("*").order("sort_order").order("name"),
    upsert: (row: Database["public"]["Tables"]["categories"]["Insert"]) =>
      supabase.from("categories").upsert(row).select("id").single(),
    remove: (id: string) => supabase.from("categories").delete().eq("id", id),
  },
  tags: {
    list: () => supabase.from("tags").select("*").order("name"),
    upsert: (row: Database["public"]["Tables"]["tags"]["Insert"]) =>
      supabase.from("tags").upsert(row).select("id").single(),
    remove: (id: string) => supabase.from("tags").delete().eq("id", id),
  },
  media: {
    list: () => supabase.from("media_assets").select("*").order("created_at", { ascending: false }),
    insert: (row: Database["public"]["Tables"]["media_assets"]["Insert"]) =>
      supabase.from("media_assets").insert(row).select("*").single(),
    remove: (id: string) => supabase.from("media_assets").delete().eq("id", id),
  },
  relationships: {
    listForSource: (sourceType: string, sourceSlug: string) =>
      supabase
        .from("content_relationships")
        .select("*")
        .eq("source_type", sourceType)
        .eq("source_slug", sourceSlug)
        .order("sort_order"),
    add: (row: Database["public"]["Tables"]["content_relationships"]["Insert"]) =>
      supabase.from("content_relationships").insert(row).select("id").single(),
    remove: (id: string) => supabase.from("content_relationships").delete().eq("id", id),
  },
};

/** Upload a media file to the public `editorial-media` bucket. */
export async function uploadEditorialMedia(file: File, opts?: { alt?: string; caption?: string }) {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;
  const up = await supabase.storage
    .from("editorial-media")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (up.error) throw up.error;
  const {
    data: { publicUrl },
  } = supabase.storage.from("editorial-media").getPublicUrl(path);
  const insert = await cms.media.insert({
    url: publicUrl,
    storage_path: path,
    alt: opts?.alt ?? null,
    caption: opts?.caption ?? null,
    mime_type: file.type,
  });
  if (insert.error) throw insert.error;
  return insert.data;
}
