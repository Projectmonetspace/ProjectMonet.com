"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/app/lib/analytics";

export default function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a");
      if (!link) return;
      const eventName = link.dataset.analyticsEvent;
      if (eventName) trackAnalyticsEvent(eventName, { link_location: link.dataset.analyticsLocation ?? "site", page_path: window.location.pathname });
      else if ((link.getAttribute("href") ?? "").startsWith("mailto:")) trackAnalyticsEvent("click_to_email", { link_location: link.dataset.analyticsLocation ?? "site", page_path: window.location.pathname });
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return null;
}
