import type { Metadata } from "next";
import Link from "next/link";
import { AuditModalTrigger } from "./components/audit-modal";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <><header className="inner-header"><SiteHeader /></header><main className="not-found page-shell"><p className="eyebrow">404 · wrong turn</p><h1>This page didn’t make the feed.</h1><p>The URL may have changed or never existed. Return to the Social homepage or start with a free audit.</p><div className="hero-actions"><Link className="button button-orange" href="/">Back home</Link><AuditModalTrigger className="button button-ink" location="not_found">Free Social Presence Audit</AuditModalTrigger></div></main><SiteFooter /></>
  );
}
