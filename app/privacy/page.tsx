import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Project Monet collects, uses, shares and retains information on ProjectMonet.com.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Effective 21 August 2026" title="Privacy Policy" intro="This policy describes the current ProjectMonet.com V1 technology and the information used to respond to Social enquiries and free audit requests.">
      <section className="content-section"><h2>Information you provide</h2><p>The Free Social Presence Audit form may collect your name, email, Phone / WhatsApp number, business or creator name, Instagram handle or profile URL, niche, goal, available content resources, decision-maker status, openness to ongoing management and optional context.</p></section>
      <section className="content-section"><h2>How we use it</h2><p>We use these details to validate and assess your request, review fit, prepare a concise diagnosis, contact you about the request and recommend an appropriate next step. We do not sell your personal information.</p></section>
      <section className="content-section"><h2>Form provider and retention</h2><p>ProjectMonet.com V1 sends audit submissions through Web3Forms. The current owner-configured Web3Forms retention period is three years. Web3Forms processes and stores the submission under that configuration so it can be delivered to projectmonet.com@gmail.com. If this provider or setting changes, this policy must be updated.</p></section>
      <section className="content-section"><h2>Optional analytics</h2><p>Analytics is denied by default and the analytics library loads only after affirmative consent. If an approved ProjectMonet.com GA4 Measurement ID is not configured, analytics remains inactive even after acceptance. Advertising storage, advertising user data and ad personalization remain denied. We do not send form values or other PII to analytics.</p></section>
      <section className="content-section"><h2>Storage, transfers and security</h2><p>Consent preference is stored locally in your browser. Form and analytics providers may process data in other countries under their own infrastructure and safeguards. We use reasonable technical measures, strict input limits and security headers, but no internet service can promise absolute security.</p></section>
      <section className="content-section"><h2>Your choices</h2><p>You may reject or withdraw optional analytics through Cookie settings. To request access, correction or deletion of information submitted to Project Monet, email <a href="mailto:contact@projectmonet.com">contact@projectmonet.com</a>. Some records may need to be retained for legitimate operational or legal reasons.</p></section>
    </PageShell>
  );
}
