import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "Free Audit Terms", description: "Scope, eligibility and boundaries of the Project Monet Free Social Presence Audit.", alternates: { canonical: "/audit-terms" } };

export default function AuditTermsPage() {
  return (
    <PageShell eyebrow="Effective 21 August 2026" title="Free Social Presence Audit Terms" intro="The audit is a concise diagnosis and qualification step, not a complete paid strategy or a performance promise.">
      <section className="content-section"><h2>Scope</h2><p>An audit may cover a profile and positioning snapshot, recent content patterns, obvious conversion or trust issues, one or two category observations, three high-impact opportunities, momentum direction and a recommended next step.</p></section>
      <section className="content-section"><h2>Eligibility and delivery</h2><p>Submitting a request does not guarantee a manually intensive audit, acceptance as a client or a response within a fixed time. Project Monet may decline low-intent, incomplete, abusive, misleading or unsuitable submissions.</p></section>
      <section className="content-section"><h2>Not included</h2><p>The free audit does not include a full content calendar, 30/60/90-day plan, script library, detailed competitor dossier, complete voice guide, production plan or extensive analytics report.</p></section>
      <section className="content-section"><h2>No performance promise</h2><p>The audit does not promise followers, reach, leads, revenue or virality. It may identify potential suitability for Standard Management or a deeper Viral Mandate eligibility review, but does not itself activate or define a guarantee.</p></section>
      <section className="content-section"><h2>Accuracy and access</h2><p>Recommendations depend on the public profile and information you provide. You confirm that the submitted details are accurate and that you are authorized to request a review of the account.</p></section>
    </PageShell>
  );
}
