/**
 * HubSpot client (server-only).
 *
 * STATUS: stub. The HubSpot connector is not yet enabled. When it is,
 * `HUBSPOT_API_KEY` will be injected at runtime and the calls below will
 * activate. Until then, every public function logs and no-ops so the rest
 * of the app can already depend on this module.
 *
 * Routed through the Lovable connector gateway, NOT directly to api.hubapi.com.
 * Docs: see `hubspot` knowledge file.
 */

import type { HubspotLeadPayload } from "./types";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/hubspot";

function isEnabled(): boolean {
  return Boolean(
    process.env.LOVABLE_API_KEY && process.env.HUBSPOT_API_KEY,
  );
}

function authHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.LOVABLE_API_KEY!}`,
    "X-Connection-Api-Key": process.env.HUBSPOT_API_KEY!,
    "Content-Type": "application/json",
  };
}

/**
 * Upsert a contact in HubSpot and (optionally) append a note.
 * No-ops until the connector is wired.
 */
export async function upsertContact(
  payload: HubspotLeadPayload,
): Promise<{ skipped: true } | { id: string }> {
  if (!isEnabled()) {
    console.info("[hubspot] connector not configured — skipping upsert");
    return { skipped: true };
  }

  const properties: Record<string, unknown> = {
    email: payload.email,
    firstname: payload.firstname,
    lastname: payload.lastname,
    phone: payload.phone,
    company: payload.company,
    lifecyclestage: payload.lifecyclestage ?? "lead",
    ...payload.properties,
  };

  const res = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ properties }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HubSpot upsertContact failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { id: string };
  return { id: data.id };
}
