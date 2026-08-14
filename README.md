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

The frontend includes responsive navigation, dark mode persisted in `localStorage`, a mobile docs browser, Cmd/Ctrl+K client-side search, copy buttons, an interactive workflow demo, and accessible FAQ accordions.

## Local development

Node.js is pinned to `22.16.0` in `.node-version`. Use Node 22 locally so the result matches Cloudflare Pages.

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

`npm run build` runs `next build` and then verifies that the complete static Pages artifact exists. `npm test` additionally checks every public route and the deployment contract. The publishing artifact is written to `out/`; it is intentionally ignored by Git because Cloudflare rebuilds it from source.

## Cloudflare Pages: connect this repository

This repository is configured for **Cloudflare Pages static hosting**, not a Cloudflare Worker. In the Cloudflare dashboard:

1. Open **Workers & Pages** and select **Create application**.
2. Select the **Pages** tab, then **Import an existing Git repository**.
3. Connect this repository and use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Next.js (Static HTML Export)` |
| Root directory | leave blank (repository root) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Deploy command | leave blank / not applicable |

The committed `.node-version` pins the build to Node.js `22.16.0`. If your Pages project overrides runtime versions in the dashboard, set `NODE_VERSION=22.16.0` there as well.

If the setup screen requires a **Deploy command**, or a build log says `Detected Project Settings: Worker Name`, you selected a Workers build instead of Pages. Return to **Create application → Pages → Import an existing Git repository**. Do not enter `npx wrangler deploy`.

### Why `npx wrangler deploy` is wrong here

`wrangler deploy` is a Workers command. Without an explicit Pages configuration, it auto-detects Next.js and tries to migrate the project to OpenNext. This site uses `output: "export"`, so it intentionally has no `.next/standalone` server bundle for OpenNext to consume.

`wrangler.jsonc` declares `pages_build_output_dir: "./out"`, which identifies this as a Pages project and makes an accidental `wrangler deploy` stop with a Pages-specific error instead of modifying the repository. Git-connected Pages deployments need no Wrangler deploy command: Cloudflare runs `npm run build` and publishes `out/` automatically after each push.

For an optional manual Pages upload, the command is `npx wrangler pages deploy out`—note the required `pages` subcommand. Do not use this command for the normal Git-connected workflow.

### Domain metadata

Cloudflare Pages automatically provides `CF_PAGES_URL` during its build, and the site uses it for absolute social metadata. To force a custom production domain instead, set:

```bash
NEXT_PUBLIC_SITE_URL=https://journal.example npm run build
```

Update `public/robots.txt` after choosing the final domain if you want an explicit sitemap URL. `public/og.png` is the original 1200×630 social preview image.

### Pages response headers

`public/_headers` is copied into `out/_headers` during the build. Cloudflare Pages applies the declared clickjacking, MIME-sniffing, referrer, browser-permission, opener-isolation, and immutable hashed-asset cache policies when it serves the static files.

## Project structure

```text
app/
├── components/          # shared landing components
├── docs/                # docs shell, content, and routes
├── globals.css          # complete visual system and responsive layout
├── layout.tsx           # metadata, fonts, and root shell
└── page.tsx             # landing page
public/
├── _headers            # Cloudflare Pages security and asset-cache policy
├── llms.txt
├── og.png
└── robots.txt
scripts/
└── verify-pages-output.mjs
tests/
├── cloudflare-pages.test.mjs
└── rendered-html.test.mjs
wrangler.jsonc          # identifies out/ as a Pages artifact; no Worker entry
```

## License

Original website code and content are available under the [MIT License](LICENSE).
