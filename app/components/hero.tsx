import Link from "next/link";
import SiteHeader from "./site-header";

const BAR_HEIGHTS = [
  23, 40, 53, 40, 33, 14, 7, 17, 75, 65, 88, 75, 65, 47, 33, 88,
  4, 7, 9, 14, 95, 65, 79, 37, 7, 40, 17, 20, 62, 47, 92, 72,
];

function TrackRecordCard() {
  const max = Math.max(...BAR_HEIGHTS);
  return (
    <div className="hero-proof animate-scale" style={{ animationDelay: "900ms" }}>
      <p className="hero-proof-label">Founder / Creator Track Record</p>
      <div className="proof-primary"><strong>35M+</strong><span>Organic views</span></div>
      <div className="proof-secondary">
        <span className="metric-badge">102K+</span>
        <span>Combined followers</span>
      </div>
      <p className="proof-note">5+ originated trend formats</p>
      <div className="proof-bars" aria-hidden="true">
        {BAR_HEIGHTS.map((height, index) => (
          <i key={`${height}-${index}`} style={{ height: `${(height / max) * 100}%`, animationDelay: `${1100 + index * 30}ms` }} />
        ))}
      </div>
      <p className="proof-disclaimer">Founder/creator credentials — not client outcomes.</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/media/hero-poster.webp" aria-hidden="true">
        <source src="/media/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <SiteHeader overlay />
        <div className="hero-row page-shell">
          <div className="hero-copy">
            <h1 id="hero-title" className="animate-up" style={{ animationDelay: "300ms" }}>Elevate your Instagram presence to new heights</h1>
            <p className="hero-subhead animate-up" style={{ animationDelay: "500ms" }}>Creator-led strategy, content and distribution built to turn attention into authority, growth and demand.</p>
            <div className="hero-actions animate-up" style={{ animationDelay: "700ms" }}>
              <Link className="button button-light" href="/audit" data-analytics-event="audit_request_click" data-analytics-location="hero">Get a Free Social Presence Audit</Link>
              <Link className="button button-outline" href="#results">See Results</Link>
            </div>
          </div>
          <TrackRecordCard />
        </div>
      </div>
    </section>
  );
}
