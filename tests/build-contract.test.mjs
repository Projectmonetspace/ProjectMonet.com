import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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
});

test("analytics is environment-configured and PII-free", () => {
  const consent = read("app/components/cookie-consent.tsx");
  const analytics = read("app/components/analytics-events.tsx");
  assert.match(consent, /NEXT_PUBLIC_GA_MEASUREMENT_ID/);
  assert.doesNotMatch(`${consent}\n${analytics}`, /G-[A-Z0-9]{6,}/);
  assert.doesNotMatch(analytics, /name:|email:|phone:|instagram:/i);
});

test("required public routes, discovery files and favicon declarations exist", () => {
  const sitemap = read("app/sitemap.ts");
  for (const route of ["/audit", "/viral-mandate", "/work", "/about", "/contact", "/privacy", "/cookies", "/terms", "/audit-terms"]) assert.match(sitemap, new RegExp(route.replace("/", "\\/")));
  assert.match(read("app/layout.tsx"), /favicon-48x48\.png/);
  assert.match(read("public/site.webmanifest"), /512x512/);
  assert.match(read("public/llms.txt"), /Funnel-First Growth System/);
});

test("methodology stays vertical at every viewport and audit mail uses the operations inbox", () => {
  const css = read("app/globals.css");
  const audit = read("app/lib/audit.ts");
  const form = read("app/components/audit-form.tsx");
  assert.match(css, /\.method-flow \{[^}]*grid-template-columns: 1fr/s);
  assert.doesNotMatch(css, /\.method-flow[^\n]*repeat\((?:3|9)/);
  assert.doesNotMatch(css, /\.method-flow strong[^\n]*(?:writing-mode|rotate)/);
  assert.match(audit, /AUDIT_DELIVERY_EMAIL = "projectmonet\.com@gmail\.com"/);
  assert.match(form, /https:\/\/api\.web3forms\.com\/submit/);
  assert.doesNotMatch(form, /fetch\("\/api\/audit"/);
});
