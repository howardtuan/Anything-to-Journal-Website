# Anything-to-Journal Website

Pure frontend product and documentation site for Anything-to-Journal.

The site contains no database, API routes, user accounts, analytics, or server-side application state. It is an original editorial design built with React and a Next.js static export, using an ivory paper palette, ink typography, proofing-grid details, and one oxblood accent.

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

Requires Node.js 22.13 or newer.

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

`npm test` builds the production bundle and verifies the exported HTML for every public route. The publishing artifact is written to `out/`; it is intentionally ignored by Git because it can always be rebuilt from source.

## Publish later

Run `npm run build`, then upload the contents of `out/` to any static host. No site has been deployed by this setup.

Before publishing, set the public origin so canonical and social metadata use the live domain:

```bash
NEXT_PUBLIC_SITE_URL=https://journal.example npm run build
```

Update `public/robots.txt` after choosing the final domain if you want an explicit sitemap URL. `public/og.png` is the original 1200×630 social preview image.

## Project structure

```text
app/
├── components/          # shared landing components
├── docs/                # docs shell, content, and routes
├── globals.css          # complete visual system and responsive layout
├── layout.tsx           # metadata, fonts, and root shell
└── page.tsx             # landing page
public/
├── llms.txt
├── og.png
└── robots.txt
tests/
└── rendered-html.test.mjs
```

## License

Original website code and content are available under the [MIT License](LICENSE).
