import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const routeFiles = new Map([
  ["/", "../out/index.html"],
  ["/404", "../out/404.html"],
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
  const switcher = await readFile(
    new URL("../app/components/InstallSwitcher.tsx", import.meta.url),
    "utf8",
  );

  for (const [surface, html] of [["home", home], ["getting started", gettingStarted]]) {
    assert.match(html, new RegExp(installCommand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), surface);
    assert.match(html, new RegExp(updateCommand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), surface);
  }
  assert.match(switcher, /role="tablist"/);
  assert.match(switcher, /"給你" : "For you"/);
  assert.match(switcher, /"給你的 Agent" : "For your agent"/);
  assert.match(switcher, /"複製 Prompt" : "Copy Prompt"/);
  assert.match(switcher, /navigator[.]clipboard[.]writeText/);
});

test("translates the complete site and keeps one language switch across routes", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const provider = await readFile(
    new URL("../app/components/LanguageProvider.tsx", import.meta.url),
    "utf8",
  );
  const header = await readFile(
    new URL("../app/components/SiteHeader.tsx", import.meta.url),
    "utf8",
  );
  const copyButton = await readFile(
    new URL("../app/components/CopyButton.tsx", import.meta.url),
    "utf8",
  );
  const docsShell = await readFile(new URL("../app/docs/DocsShell.tsx", import.meta.url), "utf8");
  const docsData = await readFile(new URL("../app/docs/docsData.ts", import.meta.url), "utf8");
  const zhArticles = await readFile(new URL("../app/docs/ZhDocArticle.tsx", import.meta.url), "utf8");
  const notFound = await readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8");

  assert.match(layout, /<LanguageProvider>\{children\}<\/LanguageProvider>/);
  assert.match(provider, /localStorage[.]getItem\("atj-language"\)/);
  assert.match(provider, /localStorage[.]setItem\("atj-language", nextLanguage\)/);
  assert.match(provider, /document[.]documentElement[.]lang = nextLanguage/);
  assert.equal(header.match(/className="language-button"/g)?.length, 2);
  assert.doesNotMatch(header, /!docs\s*&&\s*\(\s*<button\s+className="language-button"/);
  assert.match(copyButton, /zh \? "複製" : "Copy"/);
  assert.match(copyButton, /zh \? "已複製" : "Copied"/);
  assert.match(docsShell, /docsPagesFor\(language\)/);
  assert.match(docsShell, /搜尋文件/);
  assert.match(docsShell, /需要協助/);
  assert.match(docsShell, /快速連結/);
  for (const title of ["介紹", "開始使用", "資料夾規範", "草稿與模板", "上傳至 Overleaf", "疑難排解"]) {
    assert.match(docsData, new RegExp(`title: "${title}"`), title);
  }
  for (const translatedPassage of [
    "任何資料都能成為論文",
    "既有安裝不會被直接覆蓋",
    "證據來源基準",
    "把移轉視為新一次產生流程",
    "三步驟上傳",
    "格式無法解決證據問題",
  ]) {
    assert.match(zhArticles, new RegExp(translatedPassage), translatedPassage);
  }
  assert.match(notFound, /找不到頁面/);
  assert.match(notFound, /這一頁不在論文裡/);
  assert.match(notFound, /<SiteHeader minimal \/>/);
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
  assert.match(showcase, /function recompile\(\)/);
  assert.match(showcase, /onClick=\{recompile\}/);
  assert.match(showcase, /"正在編譯 PDF"/);
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

test("keeps every exported internal link target valid", async () => {
  for (const [route, relative] of routeFiles) {
    const html = await readFile(new URL(relative, import.meta.url), "utf8");
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith("/_next/") || href === "/favicon.ico") continue;
      if (href.startsWith("#")) {
        assert.match(html, new RegExp(`id="${href.slice(1)}"`), `${route} ${href}`);
        continue;
      }
      if (!href.startsWith("/")) continue;

      const [rawPath, hash] = href.split("#");
      if (/[.][a-z0-9]+(?:[?].*)?$/i.test(rawPath)) continue;
      const path = rawPath.length > 1 ? rawPath.replace(/\/$/, "") : rawPath;
      assert.ok(routeFiles.has(path), `${route} links to missing route ${href}`);

      if (hash) {
        const target = await readFile(new URL(routeFiles.get(path), import.meta.url), "utf8");
        assert.match(target, new RegExp(`id="${hash}"`), `${route} links to missing anchor ${href}`);
      }
    }
  }
});
