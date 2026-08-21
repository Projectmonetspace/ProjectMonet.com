import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "Cookie Policy", description: "ProjectMonet.com cookie and analytics consent choices.", alternates: { canonical: "/cookies" } };

export default function CookiesPage() {
  return (
    <PageShell eyebrow="Effective 21 August 2026" title="Cookie Policy" intro="ProjectMonet.com keeps optional analytics off unless you choose to accept it.">
      <section className="content-section direct-answer"><h2>What is stored?</h2><p>Your analytics choice is stored in local browser storage under a Project Monet consent key. This lets the site remember whether you accepted or rejected optional analytics.</p></section>
      <section className="content-section"><h2>Optional analytics</h2><p>If you accept and an approved ProjectMonet.com GA4 stream is configured, Google Analytics may set `_ga` and related cookies to measure visits and interactions. The site remains fully usable if you reject. No advertising cookies or advertising personalization are enabled.</p></section>
      <section className="content-section"><h2>Change or withdraw your choice</h2><p>Use the persistent Cookie settings control at the edge of the page. Rejecting updates consent and attempts to remove accessible Google Analytics cookies on this domain.</p></section>
    </PageShell>
  );
}
