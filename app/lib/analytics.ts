export const CONSENT_STORAGE_KEY = "pm_com_analytics_consent";

type AnalyticsParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== "granted") return;
  } catch {
    return;
  }
  window.gtag?.("event", eventName, parameters);
}
