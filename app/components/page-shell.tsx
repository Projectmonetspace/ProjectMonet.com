import type { ReactNode } from "react";
import { AuditModalTrigger } from "./audit-modal";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

type PageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  ctaTitle?: string;
  ctaCopy?: string;
};

export default function PageShell({ eyebrow, title, intro, children, ctaTitle = "See what your Instagram presence is missing.", ctaCopy = "Request a concise diagnosis before deciding whether ongoing management makes sense." }: PageShellProps) {
  return (
    <>
      <header className="inner-header"><SiteHeader /></header>
      <main>
        <section className="inner-hero page-shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></section>
        <div className="page-content page-shell">{children}</div>
        <section className="final-cta warm-section"><div className="page-shell"><p className="eyebrow">Audit first. Recommend second.</p><h2>{ctaTitle}</h2><p>{ctaCopy}</p><AuditModalTrigger className="button button-ink" location="legal_page_cta">Get a Free Social Presence Audit</AuditModalTrigger></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
