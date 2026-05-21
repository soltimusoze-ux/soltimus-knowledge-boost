/**
 * Author registry — credibility layer for the Knowledge Hub.
 *
 * Future: migrate to Supabase `authors` table (or HubSpot CRM contact
 * properties) without changing the consumer API: getAuthor(id).
 */
export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Optional avatar (import from src/assets when adding). */
  avatar?: string;
  /** Schema.org Person URL — LinkedIn, GitHub, etc. (used in JSON-LD sameAs). */
  sameAs?: string[];
  /** Short credibility line (e.g. "12 lat w HVAC · 600+ instalacji"). */
  credentials?: string;
}

const AUTHORS: Record<string, Author> = {
  redakcja: {
    id: "redakcja",
    name: "Redakcja Soltimus",
    role: "Zespół inżynierski",
    bio: "Inżynierowie HVAC i OZE Soltimus — projektanci, instalatorzy, serwisanci. Każdy artykuł przechodzi recenzję techniczną przed publikacją.",
    credentials: "Recenzja techniczna · 600+ realizacji",
  },
  "dzial-projektowy": {
    id: "dzial-projektowy",
    name: "Dział Projektowy Soltimus",
    role: "Projektowanie HVAC & OZE",
    bio: "Zespół projektantów Soltimus odpowiedzialny za dobór pomp ciepła, fotowoltaiki i magazynów energii. Specjalizacja: hydraulika niskotemperaturowa i integracje BESS.",
    credentials: "Audyty · Dobór mocy · Symulacje SCOP",
  },
};

export function getAuthor(id: string): Author {
  return AUTHORS[id] ?? AUTHORS.redakcja;
}

export function listAuthors(): Author[] {
  return Object.values(AUTHORS);
}
