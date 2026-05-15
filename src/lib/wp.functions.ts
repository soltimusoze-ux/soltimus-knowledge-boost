import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  createArticle,
  createPdfPost,
  createVideoPost,
  deleteMaterial,
  listMaterials,
} from "./wp.server";

const fileSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.string().min(1).max(100),
  base64: z.string().min(1),
});

const statusSchema = z.enum(["publish", "draft"]);

export const fetchMaterials = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    return { materials: await listMaterials() };
  });

export const removeMaterial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.number().int().positive() }).parse(input))
  .handler(async ({ data }) => {
    await deleteMaterial(data.id);
    return { success: true };
  });

export const submitArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        title: z.string().min(1).max(300),
        content: z.string().min(1),
        excerpt: z.string().max(500).optional(),
        status: statusSchema,
        featured: fileSchema.nullable().optional(),
      })
      .parse(input)
  )
  .handler(async ({ data }) => {
    const post = await createArticle(data);
    return { id: post.id as number, link: post.link as string };
  });

export const submitPdf = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        title: z.string().min(1).max(300),
        description: z.string().max(2000).default(""),
        status: statusSchema,
        file: fileSchema,
      })
      .parse(input)
  )
  .handler(async ({ data }) => {
    const post = await createPdfPost(data);
    return { id: post.id as number, link: post.link as string };
  });

export const submitVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        title: z.string().min(1).max(300),
        description: z.string().max(2000).default(""),
        videoUrl: z.string().url().max(500),
        status: statusSchema,
      })
      .parse(input)
  )
  .handler(async ({ data }) => {
    const post = await createVideoPost(data);
    return { id: post.id as number, link: post.link as string };
  });
