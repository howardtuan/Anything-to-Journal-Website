import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships the quiet orange, white, and black layout without decorative rails", async () => {
  const css = await readFile(new URL("../app/refined.css", import.meta.url), "utf8");
  const icon = await readFile(new URL("../app/icon.svg", import.meta.url), "utf8");
  const brand = await readFile(new URL("../public/brand-mark.svg", import.meta.url), "utf8");
  const socialPreview = await readFile(new URL("../public/og-source.svg", import.meta.url), "utf8");
  const header = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /import "[.]\/globals[.]css";\s*import "[.]\/refined[.]css";/);
  assert.match(css, /--accent:\s*#ff6a00/i);
  assert.match(css, /--blue:\s*#ff6a00/i);
  assert.match(css, /[.]rail-label\s*\{\s*display:\s*none/);
  assert.match(css, /[.]site-header::before,[\s\S]*?[.]final-cta::after\s*\{\s*display:\s*none/);
  assert.match(css, /[.]shell-grid,[\s\S]*?[.]site-footer\s*\{[\s\S]*?border-right:\s*0;[\s\S]*?border-left:\s*0;/);
  assert.match(css, /background-image:\s*radial-gradient/);
  assert.match(icon, /fill="#0a0a0a"/i);
  assert.match(icon, /fill="#fff"/i);
  assert.match(icon, /fill="#ff6a00"/i);
  assert.equal(brand.trim(), icon.trim());
  assert.match(socialPreview, /fill="#ff6a00"/i);
  assert.match(socialPreview, /fill="#0a0a0a"/i);
  assert.match(header, /import Image from "next\/image"/);
  assert.match(header, /src="\/brand-mark[.]svg"/);
  assert.doesNotMatch(`${css}\n${icon}\n${socialPreview}`, /#e5484d|#ef5559|#1768ff|#f5223f|#1257d6|#65dbb0|#5fcf9a|#75a7ff/i);
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
