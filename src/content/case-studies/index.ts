/**
 * Case Study registry — central index.
 *
 * Today: typed in-memory list compiled at build time.
 * Tomorrow: replace `CASES` with a `useQuery` against `case_studies`
 * (Supabase) or a HubSpot CMS feed. The consumer API stays stable:
 *   listCases(), getCase(slug), getRelatedCases(case, n)
 */
import type { CaseStudy } from "./types";

import { caseStudy as konstancin } from "./pompy-ciepla/konstancin-rezydencja-350m2";
import { caseStudy as dom2000Daikin } from "./pompy-ciepla/dom-2000-naprawa-instalacji-daikin";
import { caseStudy as stacjaPaliwSigenergy } from "./magazyny-energii/stacja-paliw-ciaglosc-zasilania";
import { caseStudy as osiedle252 } from "./kompleksowa/osiedle-252-mieszkania-pompy-gruntowe";
import { caseStudy as domLat70 } from "./termomodernizacja/dom-lat-70-gleboka-termomodernizacja";
import { caseStudy as domHybrydaKominek } from "./kompleksowa/dom-nowy-hybryda-kominek-pompa-ciepla";

const CASES: CaseStudy[] = [
  konstancin,
  dom2000Daikin,
  stacjaPaliwSigenergy,
  osiedle252,
  domLat70,
  domHybrydaKominek,
];

export function listCases(opts: { includeDrafts?: boolean } = {}): CaseStudy[] {
  const list = opts.includeDrafts
    ? CASES
    : CASES.filter((c) => c.status === "published");
  return list
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug && c.status === "published");
}

export function getRelatedCases(c: CaseStudy, limit = 3): CaseStudy[] {
  const pool = new Map<string, CaseStudy>();
  const all = listCases();
  const add = (x?: CaseStudy) => {
    if (x && x.slug !== c.slug) pool.set(x.slug, x);
  };
  for (const x of all.filter((x) => x.category === c.category)) add(x);
  for (const x of all) add(x);
  return Array.from(pool.values()).slice(0, limit);
}

export type { CaseStudy } from "./types";
