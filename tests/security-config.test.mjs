import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../security-headers.mjs", import.meta.url), "utf8");

test("security headers include required hardening", () => {
  for (const value of ["object-src 'none'", "frame-ancestors 'none'", "X-Content-Type-Options", "X-Frame-Options", "strict-origin-when-cross-origin", "camera=(), microphone=(), geolocation=()"] ) assert.match(source, new RegExp(value.replace(/[()]/g, "\\$&")));
});

test("CSP limits media to local assets and forms to self", () => {
  assert.match(source, /media-src 'self'/);
  assert.match(source, /form-action 'self'/);
  assert.doesNotMatch(source, /cloudfront|api\.web3forms\.com/);
});
