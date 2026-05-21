/**
 * Single source of truth for navigation across header, footer, and mobile.
 *
 * NavItem.to is typed as string for ergonomics; TanStack `<Link to>` still
 * validates against the generated route tree at the call site.
 */

export interface NavItem {
  label: string;
  to: string;
  /** If true, hide from primary header but keep available for footer/sitemap. */
  secondary?: boolean;
}

export const PRIMARY_NAV: ReadonlyArray<NavItem> = [
  { label: "Start", to: "/" },
  { label: "Oferta", to: "/oferta" },
  { label: "Realizacje", to: "/realizacje" },
  { label: "Zespół", to: "/zespol" },
  { label: "Strefa Wiedzy", to: "/wiedza" },
  { label: "Kontakt", to: "/kontakt" },
];

export const FOOTER_LEGAL: ReadonlyArray<NavItem> = [
  // Add when routes exist:
  // { label: "Polityka prywatności", to: "/polityka-prywatnosci" },
  // { label: "Polityka cookies", to: "/polityka-cookies" },
];
