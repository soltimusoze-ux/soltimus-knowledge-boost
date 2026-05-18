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

          // Wyślij powiadomienie e-mail przez Resend (best-effort — nie blokuje sukcesu)
          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (RESEND_API_KEY) {
            try {
              const esc = (s: string) =>
                s.replace(/[&<>"']/g, (c) =>
                  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
                );
              const html = `
                <h2>Nowe zapytanie ze strony Soltimus</h2>
                <p><strong>Imię i nazwisko:</strong> ${esc(data.name)}</p>
                <p><strong>Telefon:</strong> ${esc(data.phone)}</p>
                <p><strong>Email:</strong> ${esc(data.email)}</p>
                <p><strong>Temat:</strong> ${esc(data.topic)}</p>
                <p><strong>Wiadomość:</strong></p>
                <p style="white-space:pre-wrap">${esc(data.message)}</p>
                <hr/>
                <p style="color:#888;font-size:12px">Źródło: ${esc(data.sourceUrl ?? "—")}</p>
              `;
              const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${RESEND_API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: "Soltimus Formularz <onboarding@resend.dev>",
                  to: ["zapytania@soltimus.pl"],
                  reply_to: data.email,
                  subject: `Nowe zapytanie: ${data.topic} — ${data.name}`,
                  html,
                }),
              });
              if (!resendRes.ok) {
                console.error("resend send failed", resendRes.status, await resendRes.text());
              }
            } catch (mailErr) {
              console.error("resend send exception", mailErr);
            }
          } else {
            console.warn("RESEND_API_KEY not configured — email notification skipped");
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
