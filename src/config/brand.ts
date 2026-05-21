/**
 * Brand tokens — references, not styles.
 *
 * For styling use the semantic Tailwind classes mapped in `src/styles.css`
 * (`bg-brand-yellow`, `text-brand-ink`, `bg-brand-cream`). The hex values
 * below are only for places where a CSS variable cannot be used
 * (e.g. inline SVG fill on a third-party component).
 */

export const BRAND = {
  colors: {
    yellow: "#F5B800", // primary accent — CTA, highlights
    ink: "#0E0E10", // near-black — body text, dark surfaces
    cream: "#FAFAF7", // off-white — subtle surfaces
  },
  fonts: {
    // Placeholder — wire actual font stack in styles.css when ready.
    heading: "ui-sans-serif, system-ui, sans-serif",
    body: "ui-sans-serif, system-ui, sans-serif",
  },
} as const;
