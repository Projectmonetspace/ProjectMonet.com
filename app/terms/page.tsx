import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "Website Terms", description: "Terms for using ProjectMonet.com and its public Social information.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <PageShell eyebrow="Effective 21 August 2026" title="Website Terms" intro="These terms govern use of this public website. A separate signed agreement and statement of work govern paid services.">
      <section className="content-section"><h2>Information, not a service contract</h2><p>Website descriptions are general information and may change. No package, scope, timeline, performance threshold, guarantee or price becomes binding unless it is defined in a signed agreement or statement of work.</p></section>
      <section className="content-section"><h2>No outcome guarantee</h2><p>Project Monet does not promise follower counts, reach, revenue, leads, virality, rankings or platform approval through this website. Creator credentials are not forecasts of client performance.</p></section>
      <section className="content-section"><h2>Viral Mandate</h2><p>The public Viral Mandate page is a high-level explanation only. Not every account qualifies. Any performance commitment must define eligibility, measurement, client dependencies, exclusions, term and remedy in writing after review.</p></section>
      <section className="content-section"><h2>Intellectual property and acceptable use</h2><p>Project Monet branding, copy, layouts and original materials are protected. You may browse and share links for ordinary informational use, but may not copy, scrape, republish or commercially exploit the site or its materials without permission.</p></section>
      <section className="content-section"><h2>Contact</h2><p>Questions about these terms may be sent to <a href="mailto:contact@projectmonet.com">contact@projectmonet.com</a>.</p></section>
    </PageShell>
  );
}
