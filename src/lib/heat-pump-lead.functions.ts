import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  buildingStandard: z.enum(["old_pre", "old_post", "new_wt2021", "custom"]),
  customValue: z.number().min(0).max(10000).nullable().optional(),
  customUnit: z.enum(["w_m2", "kwh_m2_yr"]).nullable().optional(),
  areaM2: z.number().min(20).max(2000),
  heating: z.enum(["underfloor", "radiators", "mixed"]),
  tank: z.enum(["none", "ss_180", "ss_230", "hyg_300", "hyg_500"]),
  demandKw: z.number().min(0).max(200),
  recommendedPowerKw: z.number().min(0).max(200),
  recommendedSeries: z.string().max(80),
  recommendedModel: z.string().max(120),
  estimatedPriceMin: z.number().int().min(0).max(10_000_000),
  estimatedPriceMax: z.number().int().min(0).max(10_000_000),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(255),
  city: z.string().trim().max(120).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  rodoConsent: z.literal(true),
  sourceUrl: z.string().trim().max(500).optional().nullable(),
});

// Mapowanie buildingStandard → kolumna `insulation` (compat z istniejącym schematem DB)
const STANDARD_TO_INSULATION: Record<string, string> = {
  old_pre: "poor",
  old_post: "average",
  new_wt2021: "wt2021",
  custom: "custom",
};

export const submitHeatPumpLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    // Łączymy miasto i typ zasobnika w notatki, bo DB nie ma tych kolumn
    const enrichedNotes = [
      data.city ? `Miasto: ${data.city}` : null,
      `Zasobnik: ${data.tank}`,
      data.customValue
        ? `Wartość custom: ${data.customValue} ${data.customUnit ?? ""}`
        : null,
      data.notes ? `\n${data.notes}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    const { error } = await supabaseAdmin.from("heat_pump_leads").insert({
      building_type: data.buildingStandard,
      area_m2: data.areaM2,
      floors: 1,
      insulation: STANDARD_TO_INSULATION[data.buildingStandard] ?? "custom",
      heating_system: data.heating,
      occupants: 4,
      climate_zone: 3,
      heat_demand_kw: data.demandKw,
      recommended_power_kw: data.recommendedPowerKw,
      recommended_series: `${data.recommendedSeries} · ${data.recommendedModel}`,
      estimated_price_min: data.estimatedPriceMin,
      estimated_price_max: data.estimatedPriceMax,
      name: data.name,
      phone: data.phone,
      email: data.email,
      rodo_consent: data.rodoConsent,
      notes: enrichedNotes,
      source_url: data.sourceUrl ?? null,
    });

    if (error) {
      console.error("heat_pump_leads insert failed", error);
      return { ok: false as const, error: "storage" };
    }

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
          <strong>Email:</strong> ${esc(data.email)}<br/>
          <strong>Miasto:</strong> ${esc(data.city ?? "—")}</p>

          <h3>Parametry budynku</h3>
          <ul>
            <li>Standard: ${esc(data.buildingStandard)}</li>
            <li>Powierzchnia: ${data.areaM2} m²</li>
            <li>Instalacja: ${esc(data.heating)}</li>
            <li>CWU: ${esc(data.tank)}</li>
            ${data.customValue ? `<li>Custom: ${data.customValue} ${esc(data.customUnit ?? "")}</li>` : ""}
          </ul>

          <h3>Wynik doboru</h3>
          <ul>
            <li>Zapotrzebowanie: <strong>${data.demandKw} kW</strong></li>
            <li>Rekomendacja: <strong>${esc(data.recommendedModel)} (${data.recommendedPowerKw} kW)</strong></li>
            <li>Cena brutto: ${data.estimatedPriceMin.toLocaleString("pl-PL")} – ${data.estimatedPriceMax.toLocaleString("pl-PL")} zł</li>
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
