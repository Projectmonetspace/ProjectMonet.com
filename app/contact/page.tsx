import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "Contact", description: "Contact Project Monet about Instagram strategy, content, management or a free Social Presence Audit.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <PageShell eyebrow="Social enquiries" title="Contact Project Monet" intro="For Instagram strategy, content or management, start with the free audit or email us directly.">
      <section className="content-section direct-answer"><h2>Best way to start</h2><p>Use the <Link href="/audit">Free Social Presence Audit</Link> when you want an account diagnosis. For another Social enquiry, email <a href="mailto:contact@projectmonet.com" data-analytics-location="contact_page">contact@projectmonet.com</a>.</p></section>
      <section className="content-section"><h2>Website enquiries</h2><p>ProjectMonet.com is Social-first. For website design, visit <a href="https://www.projectmonet.space" target="_blank" rel="noreferrer" data-analytics-event="websites_link_click" data-analytics-location="contact_page">ProjectMonet.space ↗</a>.</p></section>
    </PageShell>
  );
}
