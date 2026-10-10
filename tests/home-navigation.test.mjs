import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('home navigation advances through sections in reading order with sequential labels', async () => {
  const html = await readFile(new URL('out/index.html', root), 'utf8');
  const sections = [...html.matchAll(/<section\b[^>]*\bid="(workflow|workspace|output|faq)"/g)].map(match => match[1]);
  const navigation = html.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(navigation);
  const anchors = [...navigation.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(sections, ['workflow', 'workspace', 'output', 'faq']);
  assert.deepEqual(anchors, sections, 'following the navbar must not reverse the page order');
  const labels = [...html.matchAll(/<span class="section-index">(0[1-8]) \/ /g)].map(match => match[1]);
  assert.deepEqual(labels, ['01', '02', '03', '04', '05', '06', '07', '08']);
});

test('published release explains local rendering and locator limits with executable commands', async () => {
  const home = await readFile(new URL('out/index.html', root), 'utf8');
  const source = await readFile(new URL('out/docs/source-references/index.html', root), 'utf8');
  const gettingStarted = await readFile(new URL('out/docs/getting-started/index.html', root), 'utf8');
  for (const html of [home, source]) {
    assert.match(html, /v1[.]2[.]0/);
    assert.match(html, /PDF[.]js/);
    assert.match(html, /automatic OCR/);
  }
  assert.match(gettingStarted, /npx --yes anything-to-journal@latest install/);
  assert.match(gettingStarted, /npx --yes anything-to-journal@latest update/);
  assert.match(gettingStarted, /python3 ~\/[.]codex\/skills\/anything-to-journal\/scripts\/workspace_editor[.]py \/path\/to\/journal-output/);
  assert.match(gettingStarted, /Tectonic or TeX Live/);
});
