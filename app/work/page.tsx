import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";
import ResultsRail from "@/app/components/results-rail";

export const metadata: Metadata = {
  title: "Social Proof & Results",
  description: "Project Monet’s truthful proof architecture for founder, collaborator and client Instagram results.",
  alternates: { canonical: "/work" },
  robots: { index: false, follow: false },
};

export default function WorkPage() {
  return (
    <PageShell eyebrow="Proof with provenance" title="Results That Speak" intro="Creator proof can explain why Project Monet understands Instagram. It is never relabelled as an agency-client outcome.">
      <section className="content-section direct-answer"><h2>How proof is classified</h2><div className="content-grid three"><article><h3>Founder / Creator</h3><p>Personal creator experience, organic audience growth, trends and verified distribution results.</p></article><article><h3>Team / Collaborator</h3><p>Attributed creator results used only with substantiation and permission.</p></article><article><h3>Project Monet Client</h3><p>Only real Social client outcomes produced under Project Monet and supported by evidence.</p></article></div></section>
      <div className="embedded-results"><ResultsRail /></div>
    </PageShell>
  );
}
