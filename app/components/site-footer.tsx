import Link from "next/link";
import BrandMark from "./brand-mark";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid page-shell">
        <div><BrandMark inverse /><p>Creator-led Instagram strategy, content and distribution. Websites live separately at ProjectMonet.space.</p></div>
        <div><strong>Explore</strong><Link href="/#method">Method</Link><Link href="/viral-mandate">Viral Mandate</Link><Link href="/about">About</Link></div>
        <div><strong>Start</strong><Link href="/audit">Free Audit</Link><Link href="/contact">Contact</Link><a href="mailto:contact@projectmonet.com" data-analytics-location="footer">contact@projectmonet.com</a></div>
        <div><strong>Policies</strong><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/terms">Terms</Link><Link href="/audit-terms">Audit Terms</Link></div>
      </div>
      <div className="footer-bottom page-shell"><span>© {new Date().getFullYear()} Project Monet</span><a href="https://www.projectmonet.space" target="_blank" rel="noreferrer" data-analytics-event="websites_link_click" data-analytics-location="footer">Websites ↗</a></div>
    </footer>
  );
}
