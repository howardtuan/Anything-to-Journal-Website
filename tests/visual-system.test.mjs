import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships the quiet one-accent layout without decorative rails", async () => {
  const css = await readFile(new URL("../app/refined.css", import.meta.url), "utf8");
  const icon = await readFile(new URL("../app/icon.svg", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /import "[.]\/globals[.]css";\s*import "[.]\/refined[.]css";/);
  assert.match(css, /--accent:\s*#e5484d/i);
  assert.match(css, /--blue:\s*#e5484d/i);
  assert.match(css, /[.]rail-label\s*\{\s*display:\s*none/);
  assert.match(css, /[.]site-header::before,[\s\S]*?[.]final-cta::after\s*\{\s*display:\s*none/);
  assert.match(css, /[.]shell-grid,[\s\S]*?[.]site-footer\s*\{[\s\S]*?border-right:\s*0;[\s\S]*?border-left:\s*0;/);
  assert.match(css, /background-image:\s*radial-gradient/);
  assert.match(icon, /fill="#171717"/i);
  assert.match(icon, /fill="#e5484d"/i);
  assert.doesNotMatch(icon, /#1768ff|#f5223f|#1257d6/i);
});

test("keeps the social preview at the required Open Graph size", async () => {
  const png = await readFile(new URL("../public/og.png", import.meta.url));

  assert.equal(png.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

test("aligns documentation and marketing content on one shared rail", async () => {
  const css = await readFile(new URL("../app/refined.css", import.meta.url), "utf8");
  const headerWidth = css.match(/[.]header-inner\s*\{[\s\S]*?width:\s*([^;]+);/)?.[1];
  const docsWidth = css.match(/[.]docs-frame\s*\{[\s\S]*?width:\s*([^;]+);/)?.[1];

  assert.equal(headerWidth, "min(calc(100% - 40px), 1180px)");
  assert.equal(docsWidth, headerWidth);
});
