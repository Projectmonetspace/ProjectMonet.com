import type { Metadata } from "next";
import AuditForm from "@/app/components/audit-form";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "Free Social Presence Audit", description: "Request a concise, free diagnosis of your Instagram positioning, content patterns, conversion gaps and highest-impact opportunities.", alternates: { canonical: "/audit" } };

export default function AuditPage() {
  return (
    <PageShell eyebrow="Free · concise · qualification-based" title="Free Social Presence Audit" intro="A focused Instagram diagnosis that shows the clearest problems and opportunities before we recommend ongoing work.">
      <section className="content-section direct-answer"><h2>What is included?</h2><p>A profile and positioning snapshot, recent content-pattern review, obvious conversion or trust issues, one or two category observations, three high-impact opportunities and a clear next-step recommendation.</p></section>
      <section className="content-section"><h2>What is not included?</h2><p>The free audit is not a complete 30/60/90-day strategy, content calendar, script library, deep competitor dossier, voice guide or production plan. Those belong inside paid onboarding and execution.</p></section>
      <section className="content-section"><h2>Request your audit</h2><AuditForm /></section>
    </PageShell>
  );
}
