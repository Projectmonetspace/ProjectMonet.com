"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { CONSENT_STORAGE_KEY } from "@/app/lib/analytics";

type ConsentChoice = "granted" | "denied";
type ConsentSnapshot = ConsentChoice | "unset" | "loading";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function updateGoogleConsent(choice: ConsentChoice) {
  window.gtag?.("consent", "update", { analytics_storage: choice, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
}

function removeAnalyticsCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name === "_ga" || name?.startsWith("_ga_")) document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  });
}

function subscribe(callback: () => void) {
  window.addEventListener("pm-com-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener("pm-com-consent-change", callback); window.removeEventListener("storage", callback); };
}

function snapshot(): ConsentSnapshot {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unset";
  } catch { return "unset"; }
}

export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, snapshot, () => "loading");
  const [isEditing, setIsEditing] = useState(false);

  function save(next: ConsentChoice) {
    try { window.localStorage.setItem(CONSENT_STORAGE_KEY, next); } catch { /* current page consent still applies */ }
    updateGoogleConsent(next);
    if (next === "denied") removeAnalyticsCookies();
    window.dispatchEvent(new Event("pm-com-consent-change"));
    setIsEditing(false);
  }

  return (
    <>
      {choice === "granted" && measurementId ? <GoogleAnalytics gaId={measurementId} /> : null}
      {(choice === "unset" || isEditing) && (
        <section className="cookie-consent" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
          <div><p className="eyebrow">Your privacy</p><h2 id="cookie-title">Optional analytics stay off unless you accept.</h2><p>Rejecting does not affect the site. Advertising storage remains denied. Read our <Link href="/cookies">Cookie Policy</Link>.</p></div>
          <div className="cookie-actions"><button type="button" onClick={() => save("denied")}>Reject</button><button className="button-orange" type="button" onClick={() => save("granted")}>Accept analytics</button></div>
        </section>
      )}
      {(choice === "granted" || choice === "denied") && !isEditing && <button className="cookie-settings" type="button" onClick={() => setIsEditing(true)}>Cookie settings</button>}
    </>
  );
}
