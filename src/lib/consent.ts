/**
 * Cookie consent architecture.
 *
 * Minimal, GDPR-aligned consent layer. Stores user preferences in
 * localStorage and exposes a hook + helpers that downstream features
 * (HubSpot tracking, analytics, embedded video) consult before loading.
 *
 * This is the ARCHITECTURE, not the UI of any specific banner skin.
 * The banner component renders against this contract.
 */

import { useEffect, useState } from "react";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  /** ISO 8601 timestamp of the most recent decision. */
  decidedAt: string | null;
  /** Always true — necessary cookies cannot be opted out of. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "soltimus.consent.v1";

export const DEFAULT_CONSENT: ConsentState = {
  decidedAt: null,
  necessary: true,
  analytics: false,
  marketing: false,
};

function read(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      decidedAt: parsed.decidedAt ?? null,
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

function write(next: ConsentState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("soltimus:consent", { detail: next }));
  } catch {
    // localStorage may be disabled — silent fail is correct.
  }
}

export function getConsent(): ConsentState {
  return read();
}

export function hasDecided(state: ConsentState = read()): boolean {
  return state.decidedAt !== null;
}

export function hasConsented(
  category: ConsentCategory,
  state: ConsentState = read(),
): boolean {
  return state[category] === true;
}

export function setConsent(next: Partial<Omit<ConsentState, "necessary" | "decidedAt">>): ConsentState {
  const current = read();
  const merged: ConsentState = {
    ...current,
    ...next,
    necessary: true,
    decidedAt: new Date().toISOString(),
  };
  write(merged);
  return merged;
}

export function acceptAll(): ConsentState {
  return setConsent({ analytics: true, marketing: true });
}

export function rejectAll(): ConsentState {
  return setConsent({ analytics: false, marketing: false });
}

/**
 * React hook — subscribes to consent changes for live re-render.
 */
export function useConsent(): {
  consent: ConsentState;
  decided: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  setConsent: typeof setConsent;
} {
  const [state, setState] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    setState(read());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      if (detail) setState(detail);
    };
    window.addEventListener("soltimus:consent", handler as EventListener);
    return () => window.removeEventListener("soltimus:consent", handler as EventListener);
  }, []);

  return {
    consent: state,
    decided: hasDecided(state),
    acceptAll,
    rejectAll,
    setConsent,
  };
}
