import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships the red and blue line system without the former palette", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const icon = await readFile(new URL("../app/icon.svg", import.meta.url), "utf8");

  assert.match(css, /--accent:\s*#df1736/i);
  assert.match(css, /--blue:\s*#1257d6/i);
  assert.match(css, /border-(?:top|right|bottom|left):\s*2px solid var\(--(?:accent|blue(?:-bright)?)\)/i);
  assert.doesNotMatch(css, /#f4f0e7|#c3312f|linear-gradient|radial-gradient/i);
  assert.match(icon, /stroke="#1768ff"/i);
  assert.match(icon, /stroke="#f5223f"/i);
});

test("keeps the social preview at the required Open Graph size", async () => {
  const png = await readFile(new URL("../public/og.png", import.meta.url));

  assert.equal(png.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

test("aligns the documentation frame with the shared header rails", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const headerWidth = css.match(/[.]header-inner\s*\{[\s\S]*?width:\s*([^;]+);/)?.[1];
  const docsWidth = css.match(/[.]docs-frame\s*\{[\s\S]*?width:\s*([^;]+);/)?.[1];

  assert.equal(headerWidth, "min(100%, 1460px)");
  assert.equal(docsWidth, headerWidth);
});
