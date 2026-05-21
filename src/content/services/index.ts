/**
 * Service page registry — central index.
 *
 * Today: typed in-memory list compiled at build time.
 * Tomorrow: replace with Supabase `services` table. Consumer API stays:
 *   listServices(), getService(slug)
 */
import type { ServicePage, ServiceSlug } from "./types";
import { service as pompyCiepla } from "./pompy-ciepla";

const SERVICES: Record<string, ServicePage> = {
  [pompyCiepla.slug]: pompyCiepla,
};

export function getService(slug: string): ServicePage | undefined {
  const s = SERVICES[slug];
  return s && s.status === "published" ? s : undefined;
}

export function listServices(): ServicePage[] {
  return Object.values(SERVICES).filter((s) => s.status === "published");
}

export function listServiceSlugs(): ServiceSlug[] {
  return listServices().map((s) => s.slug);
}

export type { ServicePage, ServiceSlug } from "./types";
