# Anything-to-Journal Website

Pure frontend product and documentation site for Anything-to-Journal.

The site contains no database, API routes, user accounts, analytics, or server-side application state. It is an original editorial design built with React and a Next.js static export.

## Routes

- `/` — product landing page;
- `/docs` — documentation overview;
- `/docs/getting-started` — fresh-folder workflow;
- `/docs/folder-contract` — accepted inputs and output anatomy;
- `/docs/templates` — generic draft versus target venue;
- `/docs/overleaf` — exact upload and editing guide;
- `/docs/troubleshooting` — common blockers and recovery.

The frontend includes responsive navigation, dark mode persisted in `localStorage`, an English / Traditional Chinese landing-page switch, a mobile docs browser, Cmd/Ctrl+K client-side search, copy buttons, interactive source and Manuscript Workspace demos, and accessible FAQ accordions.

The landing page now explains the complete post-generation workflow: the Agent produces LaTeX, PDF, references, audit, and submission files; then the user can open the local-only Manuscript Workspace, switch between PDF Preview and LaTeX, continue editing through Codex chat or by hand, and still use the existing Overleaf ZIP handoff. The language preference is stored locally under `atj-language`; documentation routes intentionally remain in English.

The landing page and Getting Started guide expose the npm CLI used to install and update the Agent Skill:

```bash
npx anything-to-journal@latest install
npx anything-to-journal@latest update
```

These commands require Node.js 18 or newer and become available after the matching `anything-to-journal` package release is published to npm.

## Local development

Node.js is pinned to `22.16.0` in `.node-version`. Use Node 22 locally so the result matches Cloudflare Workers Builds.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Verify before publishing

```bash
npm run lint
npm test
```

`npm run build` runs `next build` and then verifies that the complete static Workers asset bundle exists. `npm test` additionally checks every public route and the deployment contract. The publishing artifact is written to `out/`; it is intentionally ignored by Git because Cloudflare rebuilds it from source.

## Cloudflare Workers: connect this repository

This repository is configured for **Cloudflare Workers Static Assets**. Give Cloudflare the repository itself; do not upload `out/`, `.next/`, `node_modules/`, or a ZIP file.

1. Open **Workers & Pages** and select **Create application**.
2. Select **Import a repository** and connect this Git repository.
3. Make sure the project name is exactly `anything-to-journal-website`, matching `name` in `wrangler.jsonc`.
4. Use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | leave blank (repository root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

The committed `.node-version` pins the build to Node.js `22.16.0`. If the Cloudflare project overrides runtime versions in its build variables, set `NODE_VERSION=22.16.0` there as well.

Every push to `main` now runs the build and deploy commands above. The production site for this repository is:

```text
https://anything-to-journal-website.howardtuan.workers.dev/
```

For a fork or renamed Worker, copy the exact `workers.dev` URL from the completed deployment in Cloudflare.

### Why this repository needs no Worker source file

Next.js uses `output: "export"` to generate the complete frontend in `out/`. The committed `wrangler.jsonc` points `assets.directory` at that folder, so `wrangler deploy` publishes it as an asset-only Worker. There is intentionally no `main`, server entry point, API route, OpenNext adapter, or `.next/standalone` bundle.

The Wrangler version is pinned in `devDependencies`, so Cloudflare uses the same deployment behavior as local verification. `npx wrangler deploy` resolves that committed version after `npm install` instead of relying on an unpinned global installation.

### Domain metadata

`NEXT_PUBLIC_SITE_URL` is optional. Without it, metadata defaults to the production site at `https://anything-to-journal-website.howardtuan.workers.dev/`, including the Open Graph page URL and absolute social-image URLs.

To publish a fork, renamed Worker, or custom domain, set its full origin as a Cloudflare build variable and redeploy:

```bash
NEXT_PUBLIC_SITE_URL=https://journal.example.com
```

Use the full origin without a trailing path. This overrides the default metadata base, Open Graph URL, and absolute Open Graph and Twitter image URLs. Update `public/robots.txt` after choosing a different final domain if you want an explicit sitemap URL. `public/og.png` is the original 1200×630 social preview image.

## Project structure

```text
app/
├── components/          # shared landing components
├── docs/                # docs shell, content, and routes
├── globals.css          # complete visual system and responsive layout
├── layout.tsx           # metadata, fonts, and root shell
└── page.tsx             # landing page
public/
├── _headers            # Workers security and asset-cache rules
├── llms.txt
├── og.png
└── robots.txt
scripts/
└── verify-workers-output.mjs
tests/
├── cloudflare-workers.test.mjs
└── rendered-html.test.mjs
wrangler.jsonc          # deploys out/ through Workers Static Assets; no main entry
```

## License

Original website code and content are available under the [MIT License](LICENSE).
