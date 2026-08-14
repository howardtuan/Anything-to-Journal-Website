import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("pins the Cloudflare Pages build to Node 22", async () => {
  const nodeVersion = await readFile(new URL("../.node-version", import.meta.url), "utf8");
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(nodeVersion.trim(), "22.16.0");
  assert.equal(packageJson.engines.node, ">=22.16.0 <23");
});

test("declares a Pages static output instead of a Worker entry point", async () => {
  const wranglerConfig = JSON.parse(
    await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
  );
  const nextConfig = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(wranglerConfig.pages_build_output_dir, "./out");
  assert.equal(wranglerConfig.main, undefined);
  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.doesNotMatch(nextConfig, /output:\s*["']standalone["']/);
  assert.equal(packageJson.dependencies?.["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.devDependencies?.["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.scripts.deploy, undefined);
});

test("uses the Pages deployment URL for absolute metadata", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /process[.]env[.]CF_PAGES_URL/);
  assert.match(layout, /process[.]env[.]NEXT_PUBLIC_SITE_URL/);
});

test("copies Pages security headers into the deployable artifact", async () => {
  const sourceHeaders = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
  const builtHeaders = await readFile(new URL("../out/_headers", import.meta.url), "utf8");

  assert.equal(builtHeaders, sourceHeaders);
  assert.match(builtHeaders, /X-Frame-Options: DENY/);
  assert.match(builtHeaders, /Cache-Control: public, max-age=31536000, immutable/);

  await assert.rejects(access(new URL("../out/_worker.js", import.meta.url)));
});
