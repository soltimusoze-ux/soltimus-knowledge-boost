import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  // inputs
  buildingType: z.enum(["new", "modernized", "old"]),
  areaM2: z.number().min(20).max(2000),
  floors: z.number().int().min(1).max(5),
  insulation: z.enum(["wt2021", "good", "average", "poor"]),
  heatingSystem: z.enum(["underfloor", "radiators", "mixed"]),
  occupants: z.number().int().min(1).max(20),
  climateZone: z.number().int().min(1).max(5),
  // result snapshot
  heatDemandKw: z.number().min(0).max(200),
  recommendedPowerKw: z.number().min(0).max(200),
  recommendedSeries: z.string().max(80).optional().nullable(),
  estimatedPriceMin: z.number().int().min(0).max(10_000_000).optional().nullable(),
  estimatedPriceMax: z.number().int().min(0).max(10_000_000).optional().nullable(),
  // contact
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(255),
  rodoConsent: z.literal(true),
  notes: z.string().trim().max(2000).optional().nullable(),
  // meta
  sourceUrl: z.string().trim().max(500).optional().nullable(),
});

export const submitHeatPumpLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("heat_pump_leads").insert({
      building_type: data.buildingType,
      area_m2: data.areaM2,
      floors: data.floors,
      insulation: data.insulation,
      heating_system: data.heatingSystem,
      occupants: data.occupants,
      climate_zone: data.climateZone,
      heat_demand_kw: data.heatDemandKw,
      recommended_power_kw: data.recommendedPowerKw,
      recommended_series: data.recommendedSeries ?? null,
      estimated_price_min: data.estimatedPriceMin ?? null,
      estimated_price_max: data.estimatedPriceMax ?? null,
      name: data.name,
      phone: data.phone,
      email: data.email,
      rodo_consent: data.rodoConsent,
      notes: data.notes ?? null,
      source_url: data.sourceUrl ?? null,
    });

    if (error) {
      console.error("heat_pump_leads insert failed", error);
      return { ok: false as const, error: "storage" };
    }

    // Email notification via Resend (best-effort)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      try {
        const esc = (s: string) =>
          s.replace(/[&<>"']/g, (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
          );
        const html = `
          <h2>Nowy lead z kalkulatora pompy ciepła</h2>
          <h3>Kontakt</h3>
          <p><strong>Imię:</strong> ${esc(data.name)}<br/>
          <strong>Telefon:</strong> ${esc(data.phone)}<br/>
          <strong>Email:</strong> ${esc(data.email)}</p>

          <h3>Parametry budynku</h3>
          <ul>
            <li>Typ: ${esc(data.buildingType)}</li>
            <li>Powierzchnia: ${data.areaM2} m² (${data.floors} kond.)</li>
            <li>Izolacja: ${esc(data.insulation)}</li>
            <li>Instalacja: ${esc(data.heatingSystem)}</li>
            <li>Domowników: ${data.occupants}</li>
            <li>Strefa klimatyczna: ${data.climateZone}</li>
          </ul>

          <h3>Wynik doboru</h3>
          <ul>
            <li>Zapotrzebowanie: <strong>${data.heatDemandKw} kW</strong></li>
            <li>Rekomendowana moc: <strong>${data.recommendedPowerKw} kW</strong></li>
            <li>Seria: ${esc(data.recommendedSeries ?? "—")}</li>
            <li>Szacunkowa cena: ${data.estimatedPriceMin ?? "—"} – ${data.estimatedPriceMax ?? "—"} zł</li>
          </ul>

          ${data.notes ? `<p><strong>Uwagi klienta:</strong> ${esc(data.notes)}</p>` : ""}
          <hr/>
          <p style="color:#888;font-size:12px">Źródło: ${esc(data.sourceUrl ?? "—")}</p>
        `;
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Soltimus Kalkulator <onboarding@resend.dev>",
            to: ["zapytania@soltimus.pl"],
            reply_to: data.email,
            subject: `Kalkulator: ${data.recommendedPowerKw} kW — ${data.name}`,
            html,
          }),
        });
        if (!res.ok) {
          console.error("resend send failed", res.status, await res.text());
        }
      } catch (mailErr) {
        console.error("resend exception", mailErr);
      }
    }

    return { ok: true as const };
  });
