/**
 * HubSpot domain types.
 *
 * Kept independent of any HubSpot SDK so the rest of the app can import
 * these without forcing a runtime dependency before the connector is wired.
 */

export interface HubspotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  /** HubSpot lifecycle stage (subscriber, lead, customer, ...). */
  lifecyclestage?: string;
  /** Free-form notes appended to the contact timeline. */
  notes?: string;
}

export interface HubspotLeadPayload extends HubspotContact {
  /** Source page (route path) — useful as a HubSpot property. */
  source?: string;
  /** Free-form topic/category (e.g. "kalkulator-pomp-ciepla"). */
  topic?: string;
  /** Arbitrary structured payload merged into HubSpot properties. */
  properties?: Record<string, string | number | boolean | null>;
}

/** Standard mapping from internal form field names → HubSpot property IDs. */
export const HUBSPOT_FIELD_MAP = {
  name: "firstname",
  email: "email",
  phone: "phone",
  message: "notes",
  topic: "topic",
  source: "lead_source_page",
} as const;
