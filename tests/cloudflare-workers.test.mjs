import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("pins the Cloudflare Workers build toolchain", async () => {
  const nodeVersion = await readFile(new URL("../.node-version", import.meta.url), "utf8");
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(nodeVersion.trim(), "22.16.0");
  assert.equal(packageJson.engines.node, ">=22.16.0 <23");
  assert.equal(packageJson.devDependencies.wrangler, "4.123.0");
});

test("declares an asset-only Workers deployment", async () => {
  const wranglerConfig = JSON.parse(
    await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
  );
  const nextConfig = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.deepEqual(wranglerConfig.assets, {
    directory: "./out",
    not_found_handling: "404-page",
    html_handling: "auto-trailing-slash",
  });
  assert.equal(wranglerConfig.name, packageJson.name);
  assert.equal(wranglerConfig.main, undefined);
  assert.equal(wranglerConfig.pages_build_output_dir, undefined);
  assert.equal(wranglerConfig.assets.binding, undefined);
  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.doesNotMatch(nextConfig, /output:\s*["']standalone["']/);
  assert.equal(packageJson.dependencies?.["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.devDependencies?.["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.scripts.build, "next build && node scripts/verify-workers-output.mjs");
  assert.equal(packageJson.scripts["check:pages"], undefined);
  assert.equal(packageJson.scripts["check:workers"], "node scripts/verify-workers-output.mjs");
  assert.equal(packageJson.scripts.deploy, "wrangler deploy");
});

test("defaults metadata to production Workers and allows an environment override", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /process[.]env[.]NEXT_PUBLIC_SITE_URL/);
  assert.match(
    layout,
    /https:\/\/anything-to-journal-website[.]howardtuan[.]workers[.]dev\//,
  );
  assert.match(layout, /metadataBase:\s*siteUrl/);
  assert.match(layout, /url:\s*siteUrl/);
  assert.doesNotMatch(layout, /CF_PAGES_URL/);
  assert.doesNotMatch(layout, /pages[.]dev/);
});

test("copies Workers Static Assets headers into the deployable artifact", async () => {
  const sourceHeaders = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
  const builtHeaders = await readFile(new URL("../out/_headers", import.meta.url), "utf8");

  assert.equal(builtHeaders, sourceHeaders);
  assert.match(builtHeaders, /X-Frame-Options: DENY/);
  assert.match(builtHeaders, /Cache-Control: public, max-age=31536000, immutable/);

  await assert.rejects(access(new URL("../out/_worker.js", import.meta.url)));
});
