import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage keeps locked headline and no public pricing", () => {
  const hero = read("app/components/hero.tsx");
  const home = read("app/page.tsx");
  assert.match(hero, /Elevate your Instagram presence to new heights/);
  assert.doesNotMatch(`${hero}\n${home}`, /₹|\$299|Growth Starter|Personal Brand|Full Presence/);
});

test("results rail cannot intercept wheel or pointer scrolling", () => {
  const rail = read("app/components/results-rail.tsx");
  const css = read("app/globals.css");
  assert.doesNotMatch(rail, /preventDefault|onWheel|onPointerMove|setPointerCapture/);
  assert.match(css, /\.results-viewport \{[^}]*overflow: hidden/s);
  assert.match(rail, /reelResults: ReelResult\[\] = \[\]/);
  assert.doesNotMatch(rail, /＋|reel-placeholder-mark/);
});

test("analytics is environment-configured and PII-free", () => {
  const consent = read("app/components/cookie-consent.tsx");
  const analytics = read("app/components/analytics-events.tsx");
  assert.match(consent, /NEXT_PUBLIC_GA_MEASUREMENT_ID/);
  assert.doesNotMatch(`${consent}\n${analytics}`, /G-[A-Z0-9]{6,}/);
  assert.doesNotMatch(analytics, /name:|email:|phone:|instagram:/i);
});

test("sitemap exposes only the landing page and minimum legal routes", () => {
  const sitemap = read("app/sitemap.ts");
  for (const route of ["/privacy", "/cookies", "/terms", "/audit-terms"]) assert.match(sitemap, new RegExp(route.replace("/", "\\/")));
  for (const route of ["/audit", "/work", "/about", "/contact", "/viral-mandate"]) assert.doesNotMatch(sitemap, new RegExp(`"${route.replace("/", "\\/")}"`));
  assert.match(read("app/layout.tsx"), /favicon-48x48\.png/);
  assert.match(read("public/site.webmanifest"), /512x512/);
  assert.match(read("public/llms.txt"), /Funnel-First Growth System/);
});

test("all retired primary routes are noindex and absent from public navigation", () => {
  const header = read("app/components/site-header.tsx");
  const footer = read("app/components/site-footer.tsx");
  const pageShell = read("app/components/page-shell.tsx");
  for (const route of ["audit", "work", "about", "contact", "viral-mandate"]) {
    assert.match(read(`app/${route}/page.tsx`), /robots: \{ index: false, follow: false \}/);
  }
  assert.doesNotMatch(`${header}\n${footer}\n${pageShell}`, /href="\/(audit|work|about|contact|viral-mandate)"/);
  for (const anchor of ["#results", "#method", "#how-it-works", "#viral-mandate", "#about"]) assert.match(header, new RegExp(anchor));
});

test("homepage uses one accessible audit modal instead of an inline form", () => {
  const home = read("app/page.tsx");
  const modal = read("app/components/audit-modal.tsx");
  const form = read("app/components/audit-form.tsx");
  assert.doesNotMatch(home, /<AuditForm/);
  assert.match(home, /AuditModalTrigger/);
  assert.match(modal, /role="dialog"/);
  assert.match(modal, /aria-modal="true"/);
  assert.match(modal, /document\.body\.style\.overflow = "hidden"/);
  assert.match(modal, /event\.key === "Escape"/);
  assert.match(modal, /returnFocusRef\.current\.focus\(\)/);
  assert.match(modal, /focusableSelector/);
  assert.match(form, /Your audit request is in\./);
  assert.match(form, /clearest opportunities we see/);
  assert.match(form, /https:\/\/api\.web3forms\.com\/submit/);
});

test("hero plays the byte-identical original-quality video asset", () => {
  const hero = read("app/components/hero.tsx");
  const videoUrl = new URL("../public/media/hero-video-original.mp4", import.meta.url);
  const bytes = readFileSync(videoUrl);
  assert.match(hero, /\/media\/hero-video-original\.mp4/);
  assert.equal(statSync(videoUrl).size, 6363164);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), "380ceaeffe11d4f78a67fd718b694cd36c00bcf86f20848896774c9be60214c2");
});

test("methodology stays vertical at every viewport and audit delivery remains provider-controlled", () => {
  const css = read("app/globals.css");
  const audit = read("app/lib/audit.ts");
  const form = read("app/components/audit-form.tsx");
  assert.match(css, /\.method-flow \{[^}]*grid-template-columns: 1fr/s);
  assert.doesNotMatch(css, /\.method-flow[^\n]*repeat\((?:3|9)/);
  assert.doesNotMatch(css, /\.method-flow strong[^\n]*(?:writing-mode|rotate)/);
  assert.doesNotMatch(audit, /projectmonet\.com@gmail\.com/);
  assert.match(form, /https:\/\/api\.web3forms\.com\/submit/);
  assert.doesNotMatch(form, /fetch\("\/api\/audit"/);
});

test("public copy hides internal status, inbox and standalone work discovery", () => {
  const results = read("app/components/results-rail.tsx");
  const footer = read("app/components/site-footer.tsx");
  const work = read("app/work/page.tsx");
  const privacy = read("app/privacy/page.tsx");
  const contact = read("app/contact/page.tsx");
  const viral = read("app/viral-mandate/page.tsx");
  const llms = read("public/llms.txt");
  const publicCopy = [results, footer, work, privacy, contact, viral, llms].join("\n");

  assert.match(results, />Results That Speak</);
  assert.match(results, />We learned social by doing it\.</);
  for (const phrase of ["production-ready rail", "Approved reel pending", "No media or metric", "Vertical page scroll", "CSS-only motion", "owner-approved", "intentionally unpopulated"]) assert.doesNotMatch(publicCopy, new RegExp(phrase, "i"));
  assert.doesNotMatch(footer, /href="\/work"|>Proof</);
  assert.match(work, /robots: \{ index: false, follow: false \}/);
  assert.doesNotMatch(publicCopy, /projectmonet\.com@gmail\.com/);
  assert.doesNotMatch(contact, /No public phone number/);
  assert.match(contact, /Free Social Presence Audit/);
  assert.match(contact, /contact@projectmonet\.com/);
  assert.match(contact, /ProjectMonet\.space/);
  assert.match(viral, /No blanket guarantee/);
  assert.match(viral, /defined specifically for that engagement in the signed Statement of Work/);
  assert.doesNotMatch(llms, /pending|not yet locked|guarantee clock|baseline formula|\/work/i);
});
