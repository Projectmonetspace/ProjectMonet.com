import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "About Project Monet", description: "The creator-led origin, methodology and proof standards behind Project Monet’s Instagram work.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <PageShell eyebrow="Creator-led by design" title="We learned distribution from inside the feed." intro="Project Monet Social was built around first-hand audience-building, format creation and the discipline to treat every post as part of an account system.">
      <section className="content-section direct-answer"><h2>What makes Project Monet different?</h2><p>We do not begin with “What should we post today?” We decide what the account needs to become, who it should attract and where that attention should go. Creative judgement is part of the service, not an afterthought.</p></section>
      <section className="content-section"><h2>Founder / creator track record</h2><div className="metric-grid"><article><strong>35M+</strong><span>Organic views</span></article><article><strong>102K+</strong><span>Combined followers</span></article><article><strong>5+</strong><span>Originated trend formats</span></article></div><p className="fine-print">These are founder/creator credentials, not Project Monet client outcomes. They establish experience, not a promise of future performance.</p></section>
      <section className="content-section"><h2>Presence over posting</h2><p>Hooks, formats and trends matter. So do the profile, proof, conversion path, audience signal and the content we deliberately refuse to publish. The Funnel-First Growth System connects all of them.</p></section>
    </PageShell>
  );
}
