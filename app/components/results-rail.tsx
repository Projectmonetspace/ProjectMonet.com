export type ResultCategory = "Founder / Creator Result" | "Team / Collaborator Result" | "Project Monet Client Result";

export type ReelResult = {
  id: string;
  category: ResultCategory;
  videoSrc: string;
  posterSrc: string;
  title: string;
  verifiedMetric?: string;
  accessibleDescription: string;
};

// Intentionally empty until the owner supplies approved media, attribution and verified metrics.
export const reelResults: ReelResult[] = [];

const placeholderCategories: ResultCategory[] = [
  "Founder / Creator Result",
  "Team / Collaborator Result",
  "Project Monet Client Result",
  "Founder / Creator Result",
  "Team / Collaborator Result",
  "Project Monet Client Result",
];

export default function ResultsRail() {
  return (
    <section id="results" className="results-section dark-section" aria-labelledby="results-title">
      <div className="section-heading page-shell">
        <p className="eyebrow">Proof, labelled honestly</p>
        <h2 id="results-title">Results That Speak</h2>
        <p>We learned social by doing it. This production-ready rail is waiting for owner-approved reels and verified proof.</p>
      </div>
      <div className="results-viewport">
        <div className="results-track" aria-label="Result reel placeholders">
          {[...placeholderCategories, ...placeholderCategories].map((category, index) => (
            <article className="reel-card reel-placeholder" key={`${category}-${index}`} aria-label={`${category} placeholder`}>
              <div className="reel-grid" aria-hidden="true"><span /><span /><span /></div>
              <div className="reel-placeholder-mark" aria-hidden="true">＋</div>
              <div className="reel-caption">
                <span>{category}</span>
                <strong>Approved reel pending</strong>
                <small>No media or metric has been invented.</small>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="results-note page-shell">
        <span>Vertical page scroll always wins.</span>
        <span>CSS-only motion · no wheel interception · no pointer capture</span>
      </div>
    </section>
  );
}
