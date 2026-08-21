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

export const reelResults: ReelResult[] = [];

const placeholderCards = Array.from({ length: 6 }, (_, index) => index);

export default function ResultsRail() {
  return (
    <section id="results" className="results-section dark-section" aria-labelledby="results-title">
      <div className="section-heading page-shell">
        <p className="eyebrow">Proof, labelled honestly</p>
        <h2 id="results-title">Results That Speak</h2>
        <p>We learned social by doing it.</p>
      </div>
      <div className="results-viewport">
        <div className="results-track" aria-hidden="true">
          {[...placeholderCards, ...placeholderCards].map((card, index) => (
            <article className="reel-card reel-placeholder" key={`${card}-${index}`}>
              <div className="reel-grid" aria-hidden="true"><span /><span /><span /></div>
              <div className="reel-placeholder-mark" aria-hidden="true">＋</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
