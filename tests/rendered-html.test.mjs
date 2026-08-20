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
const githubUrl = "https://github.com/howardtuan/Anything-to-Journal";
const productionUrl = "https://anything-to-journal-website.howardtuan.workers.dev/";
const installCommand = "npx anything-to-journal@latest install";
const updateCommand = "npx anything-to-journal@latest update";

test("exports complete HTML for every public route", async () => {
  for (const [route, relative] of routeFiles) {
    const html = await readFile(new URL(relative, import.meta.url), "utf8");
    assert.match(html, /Anything-to-Journal/i, route);
    assert.doesNotMatch(html, /vinext-starter|loading skeleton|Your site is taking shape/i, route);
    assert.match(html, new RegExp(`href="${githubUrl}"`), route);
    assert.match(html, /target="_blank" rel="noopener noreferrer"/, route);
    if (route === "/") assert.match(html, /Anything in[.]\s*Journal out[.]/i);
    if (route === "/docs/overleaf") {
      assert.match(html, /overleaf-upload[.]zip/i);
      assert.match(html, /main[.]tex/i);
      assert.match(html, /Upload Project/i);
    }
  }
});

test("ships the GitHub link in desktop and mobile shared navigation", async () => {
  const header = await readFile(
    new URL("../app/components/SiteHeader.tsx", import.meta.url),
    "utf8",
  );
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(header, /https:\/\/github[.]com\/howardtuan\/Anything-to-Journal/);
  assert.equal(header.match(/href=\{githubUrl\}/g)?.length, 2);
  assert.equal(header.match(/target="_blank"/g)?.length, 2);
  assert.equal(header.match(/rel="noopener noreferrer"/g)?.length, 2);
  assert.equal(header.match(/: githubLabel\}/g)?.length, 2);
  assert.match(css, /[.]desktop-nav > [.]github-link/);
  assert.match(css, /[.]mobile-nav [.]github-link/);
});

test("publishes copyable npx install and update instructions", async () => {
  const home = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const gettingStarted = await readFile(
    new URL("../out/docs/getting-started/index.html", import.meta.url),
    "utf8",
  );
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  for (const [surface, html] of [["home", home], ["getting started", gettingStarted]]) {
    assert.match(html, new RegExp(installCommand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), surface);
    assert.match(html, new RegExp(updateCommand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), surface);
  }
  assert.match(source, /<CopyButton value=\{installCommand\} label=\{copy[.]install[.]copyInstall\}/);
  assert.match(source, /<CopyButton value=\{updateCommand\} label=\{copy[.]install[.]copyUpdate\}/);
});

test("introduces the local PDF and LaTeX workspace in both landing languages", async () => {
  const home = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const copy = await readFile(new URL("../app/homeCopy.ts", import.meta.url), "utf8");
  const showcase = await readFile(
    new URL("../app/components/WorkspaceShowcase.tsx", import.meta.url),
    "utf8",
  );
  const header = await readFile(
    new URL("../app/components/SiteHeader.tsx", import.meta.url),
    "utf8",
  );

  assert.match(home, /PDF Preview/i);
  assert.match(home, /manuscript[.]tex/i);
  assert.match(source, /id="workspace"/);
  assert.match(copy, /PDF 預覽/);
  assert.match(copy, /論文工作區/);
  assert.equal(copy.match(/titleFirst: "Anything in[.]"/g)?.length, 2);
  assert.equal(copy.match(/titleJournal: "Journal"/g)?.length, 2);
  assert.equal(copy.match(/titleEnd: "out[.]"/g)?.length, 2);
  assert.match(showcase, /useState<WorkspaceTab>\("pdf"\)/);
  assert.match(showcase, /127[.]0[.]0[.]1:43127/);
  assert.match(header, /className="language-button"/);
  assert.match(header, /將網站切換為繁體中文/);
});

test("uses the production Workers origin for default social metadata", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, new RegExp(`property="og:url" content="${productionUrl}"`));
  assert.match(
    html,
    new RegExp(`property="og:image" content="${productionUrl}og[.]png"`),
  );
  assert.match(
    html,
    new RegExp(`name="twitter:image" content="${productionUrl}og[.]png"`),
  );
});

test("keeps the deployable source frontend-only", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.equal(packageJson.dependencies["drizzle-orm"], undefined);
  assert.equal(packageJson.devDependencies["drizzle-kit"], undefined);
  assert.equal(packageJson.devDependencies.vinext, undefined);
  assert.equal(packageJson.devDependencies.wrangler, "4.123.0");
  assert.equal(packageJson.devDependencies["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.dependencies["@opennextjs/cloudflare"], undefined);
  assert.equal(packageJson.scripts.deploy, "wrangler deploy");
  assert.equal(packageJson.scripts["db:generate"], undefined);
  assert.match(layout, /process[.]env[.]NEXT_PUBLIC_SITE_URL/);
  assert.doesNotMatch(layout, /CF_PAGES_URL|[.]pages[.]dev/);

  await assert.rejects(access(new URL("../app/chatgpt-auth.ts", import.meta.url)));
  await assert.rejects(access(new URL("../db", import.meta.url)));
  await assert.rejects(access(new URL("../examples/d1", import.meta.url)));
  await assert.rejects(access(new URL("../worker", import.meta.url)));
  await assert.rejects(access(new URL("../functions", import.meta.url)));
  await assert.rejects(access(new URL("../open-next.config.ts", import.meta.url)));
  await assert.rejects(access(new URL("../.open-next", import.meta.url)));
  await assert.rejects(access(new URL("../.openai", import.meta.url)));
});
