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
