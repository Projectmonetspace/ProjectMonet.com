import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "Viral Mandate", description: "A high-level explanation of Project Monet’s qualified performance-led Instagram mode and why more performance risk requires more creative control.", alternates: { canonical: "/viral-mandate" } };

export default function ViralMandatePage() {
  return (
    <PageShell eyebrow="Performance-led mode" title="Viral Mandate" intro="A qualified operating mode built around a fair exchange: more performance risk requires more creative control.">
      <section className="content-section direct-answer"><h2>What is Viral Mandate?</h2><p>For eligible accounts, Project Monet may accept additional defined performance risk while receiving final creative discretion inside approved brand, factual, legal and safety guardrails.</p></section>
      <section className="content-section"><h2>What creative discretion means</h2><div className="content-grid"><p>After strategy and guardrails are approved, Project Monet may control the hook, concept, treatment, format, pacing, editing, packaging, caption approach, testing and iteration.</p><p>Clients may still correct factual inaccuracies, legal or regulatory issues, confidential information, safety concerns and genuine technical defects. Those are corrections, not subjective creative revisions.</p></div></section>
      <section className="content-section"><h2>Who qualifies?</h2><p>Not every account. The Free Social Presence Audit can identify whether account health, baseline, category dynamics, resources, cadence, brand restrictions and willingness to grant the required discretion make a deeper eligibility review worthwhile.</p></section>
      <section className="content-section notice"><h2>No unconditional public guarantee</h2><p>The exact performance threshold, baseline formula, contract length, guarantee clock, exclusions and remedy are not yet locked for public use. Any future commitment must be precisely defined in a signed statement of work after eligibility and legal review.</p></section>
    </PageShell>
  );
}
