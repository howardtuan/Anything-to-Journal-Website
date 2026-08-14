import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const routeFiles = new Map([
  ["/", "../out/index.html"],
  ["/docs", "../out/docs/index.html"],
  ["/docs/getting-started", "../out/docs/getting-started/index.html"],
  ["/docs/folder-contract", "../out/docs/folder-contract/index.html"],
  ["/docs/templates", "../out/docs/templates/index.html"],
  ["/docs/overleaf", "../out/docs/overleaf/index.html"],
  ["/docs/troubleshooting", "../out/docs/troubleshooting/index.html"],
]);

test("exports complete HTML for every public route", async () => {
  for (const [route, relative] of routeFiles) {
    const html = await readFile(new URL(relative, import.meta.url), "utf8");
    assert.match(html, /Anything-to-Journal/i, route);
    assert.doesNotMatch(html, /vinext-starter|loading skeleton|Your site is taking shape/i, route);
    if (route === "/") assert.match(html, /Anything in[.]\s*Journal out[.]/i);
    if (route === "/docs/overleaf") {
      assert.match(html, /overleaf-upload[.]zip/i);
      assert.match(html, /main[.]tex/i);
      assert.match(html, /Upload Project/i);
    }
  }
});

test("keeps the deployable source frontend-only", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  assert.equal(packageJson.dependencies["drizzle-orm"], undefined);
  assert.equal(packageJson.devDependencies["drizzle-kit"], undefined);
  assert.equal(packageJson.devDependencies.vinext, undefined);
  assert.equal(packageJson.devDependencies.wrangler, undefined);
  assert.equal(packageJson.devDependencies["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.dependencies["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.scripts.deploy, undefined);
  assert.equal(packageJson.scripts["db:generate"], undefined);

  await assert.rejects(access(new URL("../app/chatgpt-auth.ts", import.meta.url)));
  await assert.rejects(access(new URL("../db", import.meta.url)));
  await assert.rejects(access(new URL("../examples/d1", import.meta.url)));
  await assert.rejects(access(new URL("../worker", import.meta.url)));
  await assert.rejects(access(new URL("../functions", import.meta.url)));
  await assert.rejects(access(new URL("../open-next.config.ts", import.meta.url)));
  await assert.rejects(access(new URL("../.open-next", import.meta.url)));
  await assert.rejects(access(new URL("../.openai", import.meta.url)));
});
