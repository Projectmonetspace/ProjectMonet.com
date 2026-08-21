import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../security-headers.mjs", import.meta.url), "utf8");

test("security headers include required hardening", () => {
  for (const value of ["object-src 'none'", "frame-ancestors 'none'", "X-Content-Type-Options", "X-Frame-Options", "strict-origin-when-cross-origin", "camera=(), microphone=(), geolocation=()"] ) assert.match(source, new RegExp(value.replace(/[()]/g, "\\$&")));
});

test("CSP limits media and permits only the direct Web3Forms API connection", () => {
  assert.match(source, /media-src 'self'/);
  assert.match(source, /form-action 'self'/);
  assert.match(source, /connect-src[^\n]*https:\/\/api\.web3forms\.com/);
  assert.doesNotMatch(source, /cloudfront/);
});
