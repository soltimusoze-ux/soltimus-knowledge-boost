/**
 * Conversion CTA primitives.
 *
 * Three roles, one place:
 *   - <PrimaryCTA>   — single conversion goal per view (gold pill).
 *   - <SecondaryCTA> — supporting action (outlined pill).
 *   - <UtilityCTA>   — phone / map / quiet action (text + icon).
 *
 * Built on top of TanStack <Link> + native <a> so it works for both
 * internal and external targets without polluting the routing layer.
 *
 * Why a dedicated component (not just Button variants):
 *   - CTA hierarchy is a contract — designers + engineers reach for
 *     the SAME element on every page. New marketing surfaces inherit
 *     the rules automatically.
 *   - Funnels its target into a `data-cta` attribute that analytics
 *     can pick up without per-page wiring.
 */

import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type CtaRole = "primary" | "secondary" | "utility";

interface CtaBase {
  children: ReactNode;
  /** Analytics label, e.g. "home-hero-consultation". */
  trackingId?: string;
  className?: string;
  withArrow?: boolean;
}

type InternalProps = CtaBase & {
  to: LinkProps["to"];
  href?: never;
};

type ExternalProps = CtaBase &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string;
    to?: never;
  };

type CtaProps = InternalProps | ExternalProps;

const ROLE_STYLES: Record<CtaRole, string> = {
  primary:
    "inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink",
  secondary:
    "inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm font-medium text-brand-ink transition-colors hover:border-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink",
  utility:
    "inline-flex items-center gap-2 rounded-full border border-black/10 px-3.5 py-2 text-xs font-medium text-black/75 transition-colors hover:border-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink",
};

function makeCta(role: CtaRole) {
  return forwardRef<HTMLAnchorElement, CtaProps>(function Cta(
    { children, trackingId, className, withArrow = role === "primary", ...rest },
    ref,
  ) {
    const cls = `${ROLE_STYLES[role]} ${className ?? ""}`.trim();
    const arrow =
      withArrow && role !== "utility" ? (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      ) : null;
    const content = (
      <>
        {children}
        {arrow}
      </>
    );
    if ("to" in rest && rest.to) {
      const { to } = rest;
      return (
        <Link
          ref={ref as never}
          to={to}
          data-cta={trackingId ?? role}
          className={`group ${cls}`}
        >
          {content}
        </Link>
      );
    }
    const { href, ...anchorRest } = rest as ExternalProps;
    return (
      <a
        ref={ref}
        href={href}
        data-cta={trackingId ?? role}
        className={`group ${cls}`}
        {...anchorRest}
      >
        {content}
      </a>
    );
  });
}

export const PrimaryCTA = makeCta("primary");
export const SecondaryCTA = makeCta("secondary");
export const UtilityCTA = makeCta("utility");
