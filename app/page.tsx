import Link from "next/link";
import AuditForm from "./components/audit-form";
import Hero from "./components/hero";
import ResultsRail from "./components/results-rail";
import SiteFooter from "./components/site-footer";

const methodology = ["Positioning", "TOFU", "MOFU", "BOFU", "Publish", "Protect Signal", "Measure", "Iterate", "Report Against Baseline"];
const capabilities = [
  { number: "01", title: "Strategy", copy: "Positioning, audience, account audit, content pillars, tone, visual direction and a KPI framework built before production starts." },
  { number: "02", title: "Content", copy: "Hooks, reel concepts, scripts, carousels, captions, CTAs, planning, editing and creative production shaped around the account’s role." },
  { number: "03", title: "Page & funnel", copy: "Bio, profile image, highlights, pins, proof, CTA, links, lead magnets and DM paths that turn discovery into a next action." },
  { number: "04", title: "Management", copy: "Publishing, optimization, performance review, iteration and agreed community or DM work when included in the engagement." },
];

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ResultsRail />

        <section id="method" className="method-section warm-section">
          <div className="page-shell">
            <div className="split-heading"><div><p className="eyebrow">How Project Monet thinks</p><h2>Funnel-First Growth System</h2></div><p>Build the machine before pouring traffic into it. We decide what the account should become, who it should attract and what should happen after discovery.</p></div>
            <ol className="method-flow">{methodology.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>
            <blockquote>Growth isn’t just knowing what to post. It’s knowing what not to post.</blockquote>
            <p className="measure-chain">Reach <i>→</i> Profile Visits <i>→</i> Follows <i>→</i> Engagement <i>→</i> DMs / Leads / Business Actions</p>
          </div>
        </section>

        <section id="how-it-works" className="capabilities-section">
          <div className="page-shell">
            <div className="split-heading"><div><p className="eyebrow">What we do</p><h2>We don’t sell posting. We build presence.</h2></div><p>Instagram-only at launch. Every capability serves the same account system; none comes with promises of follower counts, revenue, reach or virality.</p></div>
            <div className="capability-grid">{capabilities.map((item) => <article key={item.title}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
          </div>
        </section>

        <section className="viral-teaser dark-section">
          <div className="page-shell viral-grid">
            <div><p className="eyebrow">Qualified accounts only</p><h2>Viral Mandate</h2><p className="viral-doctrine">More performance risk = more creative control.</p></div>
            <div><p>Where an account qualifies and brand, factual and legal guardrails are agreed, Project Monet may take greater creative discretion to pursue breakout performance. This is not an unconditional public guarantee.</p><Link className="text-link" href="/viral-mandate">Understand the mandate <span>↗</span></Link></div>
          </div>
        </section>

        <section className="why-section orange-section">
          <div className="page-shell why-grid">
            <div><p className="eyebrow">Why Project Monet</p><h2>Built by people who made things spread.</h2></div>
            <div><p>Project Monet did not learn Instagram as an abstract marketing channel. Its creator-led origin comes from building audiences, studying hooks, formats, distribution, trend timing and page identity through real publishing.</p><p>That experience establishes judgement — not a guarantee. Founder proof, collaborator proof and client proof stay visibly separate.</p><Link className="button button-ink" href="/about">Our story and proof rules</Link></div>
          </div>
        </section>

        <section id="audit" className="audit-section warm-section">
          <div className="page-shell audit-grid">
            <div><p className="eyebrow">Primary conversion path</p><h2>Get a Free Social Presence Audit</h2><p>We’ll show you what is helping, what is holding the account back and the three highest-impact opportunities we see — before you decide whether to work with us.</p><ul><li>Profile and positioning snapshot</li><li>Recent content patterns</li><li>Conversion and trust issues</li><li>1–2 category observations</li><li>Three priority opportunities</li><li>A recommended next step</li></ul></div>
            <AuditForm compact />
          </div>
        </section>

        <section className="final-cta dark-section"><div className="page-shell"><p className="eyebrow">Audit first. Recommend second.</p><h2>Turn attention into a presence worth following.</h2><p>Start with a concise diagnosis. Website enquiries remain at ProjectMonet.space.</p><div className="hero-actions"><Link className="button button-light" href="/audit">Get a Free Social Presence Audit</Link><a className="button button-outline" href="https://www.projectmonet.space" target="_blank" rel="noreferrer" data-analytics-event="websites_link_click" data-analytics-location="final_cta">Websites ↗</a></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
