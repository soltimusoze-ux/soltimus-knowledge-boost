/**
 * Lead capture abstraction.
 *
 * Every form on the site (contact, calculator, future newsletter) should call
 * `submitLead` instead of writing to Supabase or HubSpot directly. This keeps
 * one place to:
 *   - validate / sanitise payloads
 *   - persist to our own database
 *   - mirror to HubSpot once the connector is wired
 *   - send transactional confirmations
 *
 * TODAY: only the persistence path is implemented (delegated to whatever
 * server function the form already calls). HubSpot mirroring is a no-op
 * until the connector is enabled — see `src/integrations/hubspot/`.
 */

export type LeadSource =
  | "contact-form"
  | "heat-pump-calculator"
  | "energy-page"
  | "knowledge-cta"
  | "newsletter";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  topic?: string;
  /** Route path the lead originated from. */
  sourcePath: string;
  /** Which form/feature submitted this lead. */
  source: LeadSource;
  /** Optional structured extras (calculator inputs, page context…). */
  metadata?: Record<string, string | number | boolean | null>;
}

/**
 * Client-safe entry point. Delegates to a server function so secrets stay
 * server-side. The concrete server function is wired per-form for now;
 * once we centralise it we'll move the fetch here.
 */
export interface LeadResult {
  ok: boolean;
  id?: string;
  error?: string;
}
