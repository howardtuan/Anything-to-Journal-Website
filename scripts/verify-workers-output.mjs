import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

const wranglerConfig = JSON.parse(
  await readFile(new URL("wrangler.jsonc", projectRoot), "utf8"),
);

assert.deepEqual(wranglerConfig.assets, {
  directory: "./out",
  not_found_handling: "404-page",
  html_handling: "auto-trailing-slash",
});
assert.equal(wranglerConfig.main, undefined);
assert.equal(wranglerConfig.pages_build_output_dir, undefined);
assert.equal(wranglerConfig.assets.binding, undefined);

const requiredFiles = [
  "index.html",
  "404.html",
  "_headers",
  "docs/index.html",
  "docs/getting-started/index.html",
  "docs/folder-contract/index.html",
  "docs/templates/index.html",
  "docs/overleaf/index.html",
  "docs/troubleshooting/index.html",
];

for (const relativePath of requiredFiles) {
  const file = new URL(relativePath, outputRoot);
  await access(file);
  assert.equal((await stat(file)).isFile(), true, `${relativePath} must be a file`);
}

const headers = await readFile(new URL("_headers", outputRoot), "utf8");
for (const requiredHeader of [
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy:",
  "Cache-Control: public, max-age=31536000, immutable",
]) {
  assert.match(headers, new RegExp(requiredHeader.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}

for (const forbiddenPath of [
  "open-next.config.ts",
  ".open-next",
  "functions",
  "_worker.js",
]) {
  await assert.rejects(
    access(new URL(forbiddenPath, projectRoot)),
    `${forbiddenPath} would add a runtime entry point to this asset-only deployment`,
  );
}

console.log("Cloudflare Workers Static Assets verified: deployable files are ready in out/.");
