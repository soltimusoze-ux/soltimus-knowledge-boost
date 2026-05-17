import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(255),
  topic: z.string().trim().min(2).max(80),
  message: z.string().trim().min(5).max(4000),
  sourceUrl: z.string().trim().max(500).optional(),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = ContactSchema.safeParse(json);
          if (!parsed.success) {
            return new Response(
              JSON.stringify({ ok: false, error: "validation" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }
          const data = parsed.data;

          const { error } = await supabaseAdmin.from("contact_submissions").insert({
            name: data.name,
            phone: data.phone,
            email: data.email,
            topic: data.topic,
            message: data.message,
            source_url: data.sourceUrl ?? null,
            user_agent: request.headers.get("user-agent") ?? null,
          });

          if (error) {
            console.error("contact_submissions insert failed", error);
            return new Response(
              JSON.stringify({ ok: false, error: "storage" }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("contact route error", err);
          return new Response(
            JSON.stringify({ ok: false, error: "server" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
