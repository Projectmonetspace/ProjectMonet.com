import assert from "node:assert/strict";
import test from "node:test";
import { buildWeb3FormsPayload, normalizeInstagram, parseAuditPayload, WEB3FORMS_ACCESS_KEY } from "../app/lib/audit.ts";

const valid = {
  name: "Mayank",
  email: "mayank@example.com",
  phone: "+91 9876543210",
  businessName: "Example Studio",
  instagram: "@example.studio",
  niche: "Interior design",
  primaryGoal: "Build authority and presence",
  resources: "Founder footage and an editor",
  decisionMaker: "yes",
  openToManagement: "yes",
  message: "",
  privacyConsent: true,
  source: "test",
  botcheck: "",
};

test("normalizes Instagram handles and profile URLs", () => {
  assert.equal(normalizeInstagram("projectmonet"), "@projectmonet");
  assert.equal(normalizeInstagram("https://instagram.com/projectmonet/"), "https://www.instagram.com/projectmonet/");
  assert.equal(normalizeInstagram("https://example.com/projectmonet"), "");
});

test("accepts a valid audit request", () => {
  const result = parseAuditPayload(valid);
  assert.equal(Object.keys(result.errors).length, 0);
  assert.equal(result.data?.email, "mayank@example.com");
});

test("rejects invalid contact, Instagram, consent and honeypot values", () => {
  const result = parseAuditPayload({ ...valid, email: "bad", phone: "12", instagram: "https://example.com/no", privacyConsent: false, botcheck: "spam" });
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.instagram);
  assert.ok(result.errors.privacyConsent);
  assert.ok(result.errors.form);
  assert.equal(result.data, undefined);
});

test("builds the public Web3Forms request without exposing its destination inbox", () => {
  const parsed = parseAuditPayload(valid);
  assert.ok(parsed.data);
  const provider = buildWeb3FormsPayload(parsed.data);
  assert.equal(provider.access_key, WEB3FORMS_ACCESS_KEY);
  assert.equal(provider.email, "mayank@example.com");
  assert.equal(provider["Business / Creator"], "Example Studio");
  assert.doesNotMatch(JSON.stringify(provider), /projectmonet\.com@gmail\.com/);
});
