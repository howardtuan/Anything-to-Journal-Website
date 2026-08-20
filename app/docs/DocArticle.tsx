import Link from "next/link";
import { ReactNode } from "react";
import { CopyButton } from "../components/CopyButton";
import { docsPages } from "./docsData";

const firstPrompt = `Use the Anything-to-Journal skill in this folder.
Before opening any source content, ask me whether I want:
1. a flexible journal draft, or
2. a specific journal template.
After I answer, read and classify every source material.`;

const installCommand = "npx anything-to-journal@latest install";
const updateCommand = "npx anything-to-journal@latest update";

const sourceTree = `my-research/
├── README.md
├── notes/
│   ├── research-question.md
│   └── methods-notes.docx
├── data/
│   ├── results.xlsx
│   └── analysis.csv
├── figures/
│   ├── figure-01.png
│   └── figure-02.pdf
├── sources/
│   ├── interviews.pdf
│   └── prior-draft.docx
├── references.bib
└── journal-template/          # optional`;

const outputTree = `journal-output/
├── manuscript/
│   ├── manuscript.tex
│   ├── references.bib
│   ├── traceability.csv
│   └── evidence-map.csv
├── reports/
│   ├── source-review.json
│   └── quality-report.md
└── submission/
    ├── overleaf-upload.zip     ← upload this
    ├── overleaf-upload/
    │   ├── main.tex            ← ZIP root
    │   ├── references.bib
    │   └── README_OVERLEAF.md
    ├── manuscript.pdf
    └── submission-package.zip`;

const templateTree = `journal-template/
├── sample-manuscript.tex
├── journal.cls
├── journal.sty                # if provided
├── bibliography-style.bst     # if provided
├── author-guidelines.pdf
└── template-notes.md           # optional`;

export function DocArticle({ slug }: { slug: string }) {
  switch (slug) {
    case "getting-started":
      return <GettingStarted />;
    case "folder-contract":
      return <FolderContract />;
    case "templates":
      return <Templates />;
    case "overleaf":
      return <Overleaf />;
    case "troubleshooting":
      return <Troubleshooting />;
    default:
      return <Introduction />;
  }
}

function ArticleFrame({ slug, children }: { slug: string; children: ReactNode }) {
  const page = docsPages.find((item) => item.href === (slug === "introduction" ? "/docs" : `/docs/${slug}`)) ?? docsPages[0];
  const pageIndex = docsPages.indexOf(page);
  const previous = docsPages[pageIndex - 1];
  const next = docsPages[pageIndex + 1];
  const outline = `# ${page.title}\n\n${page.description}\n\n${page.headings.map((heading) => `## ${heading.label}`).join("\n\n")}`;

  return (
    <article className="doc-article">
      <div className="doc-breadcrumb">
        <Link href="/docs">DOCS</Link>
        <span>/</span>
        <span>{page.group.toUpperCase()}</span>
        <i>{page.index}</i>
      </div>
      <header className="doc-header">
        <div>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
        <CopyButton value={outline} label="Copy outline" />
      </header>
      <div className="doc-status-row">
        <span><i className="green-dot" /> DOCUMENTED</span>
        <span>UPDATED AUG 2026</span>
      </div>

      <div className="doc-prose">{children}</div>

      <nav className="doc-pagination" aria-label="Documentation pagination">
        {previous ? (
          <Link href={previous.href}>
            <span>← PREVIOUS</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : <span />}
        {next && (
          <Link href={next.href} className="next">
            <span>NEXT →</span>
            <strong>{next.title}</strong>
          </Link>
        )}
      </nav>
    </article>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="doc-section">
      <h2>{title}<a href={`#${id}`} aria-label={`Link to ${title}`}>#</a></h2>
      {children}
    </section>
  );
}

function CodeBlock({ value, filename }: { value: string; filename?: string }) {
  return (
    <div className="code-block">
      <div className="code-header">
        <span>{filename ?? "TEXT"}</span>
        <CopyButton value={value} />
      </div>
      <pre><code>{value}</code></pre>
    </div>
  );
}

function Callout({ type = "note", title, children }: { type?: "note" | "warning" | "success"; title: string; children: ReactNode }) {
  return (
    <aside className={`doc-callout ${type}`}>
      <span>{type === "warning" ? "!" : type === "success" ? "✓" : "i"}</span>
      <div><strong>{title}</strong><p>{children}</p></div>
    </aside>
  );
}

function Introduction() {
  return (
    <ArticleFrame slug="introduction">
      <p className="doc-lead">
        Anything-to-Journal is a folder-first agent skill. Give it the complete context
        of a research project and it produces a journal manuscript that remains easy to
        inspect, compile, and edit.
      </p>
      <Callout type="success" title="The shortest possible explanation">
        Anything can become a journal. Put the source material in a fresh folder, open
        your agent there, and use the skill.
      </Callout>

      <Section id="core-loop" title="The core loop">
        <div className="doc-steps compact">
          <div><span>01</span><strong>Collect</strong><p>Create a dedicated folder and add every useful source.</p></div>
          <div><span>02</span><strong>Confirm</strong><p>You choose draft mode or a specific journal template.</p></div>
          <div><span>03</span><strong>Inspect</strong><p>Only then does the agent read and classify every material.</p></div>
          <div><span>04</span><strong>Generate</strong><p>The agent writes, compiles, checks, and packages the journal.</p></div>
        </div>
        <p>
          The confirmation step is part of the contract and happens before source-content
          access. The agent may locate the folder by filename, but it must not infer a
          target journal from scattered hints or inspect evidence before your answer.
        </p>
      </Section>

      <Section id="what-goes-in" title="What goes in">
        <p>
          The workspace can contain notes, drafts, PDFs, spreadsheets, structured data,
          figures, code outputs, transcripts, citations, and submission instructions.
          Formats can be mixed; usefulness matters more than tidiness.
        </p>
        <div className="material-grid">
          <div><span>TEXT</span><strong>Notes & drafts</strong><p>Markdown, plain text, Word, and prior manuscripts.</p></div>
          <div><span>DATA</span><strong>Tables & results</strong><p>CSV, TSV, spreadsheets, and exported summaries.</p></div>
          <div><span>MEDIA</span><strong>Figures & diagrams</strong><p>Publication-ready images and working graphics.</p></div>
          <div><span>CITE</span><strong>References</strong><p>BibTeX libraries, source PDFs, and citation notes.</p></div>
        </div>
      </Section>

      <Section id="what-comes-out" title="What comes out">
        <p>
          The primary handoff is a plain, editable LaTeX project plus a compiled preview
          and a short generation report. When supported, the agent also starts the local
          Manuscript Workspace: one localhost page with a scrollable PDF Preview and a
          LaTeX editor connected to the actual generated source. The Overleaf copy remains
          bundled separately so the entire project can be uploaded in one step.
        </p>
        <CodeBlock value={outputTree} filename="OUTPUT TREE" />
        <Callout type="success" title="Codex and manual edits stay on one source">
          Both routes update <code>journal-output/manuscript/manuscript.tex</code>. Saved edits
          recompile the preview, external changes are detected, and a failed compile keeps
          the last successful PDF visible.
        </Callout>
        <Callout title="main.tex is already where Overleaf needs it">
          Inside <code>submission/overleaf-upload.zip</code>, <code>main.tex</code> sits at the ZIP
          root—not inside another wrapper folder.
        </Callout>
      </Section>

      <Section id="design-principles" title="Design principles">
        <ul className="check-list">
          <li><strong>Evidence before prose.</strong> Claims should trace back to the source folder.</li>
          <li><strong>Explicit uncertainty.</strong> Missing evidence becomes a visible gap, not invented content.</li>
          <li><strong>Human-editable output.</strong> Sections, figures, and references stay in ordinary files.</li>
          <li><strong>Synchronized local editing.</strong> Codex and the browser workspace share the same LaTeX source.</li>
          <li><strong>Portable handoff.</strong> The output works in the local workspace and can still be uploaded to Overleaf.</li>
          <li><strong>Template fidelity.</strong> Journal-specific formatting is used only when supplied and confirmed.</li>
        </ul>
        <Link className="doc-next-card" href="/docs/getting-started">
          <span>NEXT GUIDE / 01</span>
          <strong>Run your first journal workflow</strong>
          <i>↗</i>
        </Link>
      </Section>
    </ArticleFrame>
  );
}

function GettingStarted() {
  return (
    <ArticleFrame slug="getting-started">
      <p className="doc-lead">
        Start from an empty workspace dedicated to one manuscript. The skill asks one
        format question, then reads the complete workspace and prepares the deliverables.
      </p>

      <Section id="before-you-start" title="Before you start">
        <p>You need Node.js 18 or newer and an agent that can access local files. You do not need LaTeX or Overleaf to begin.</p>
        <Callout type="warning" title="Use a new folder">
          Do not point the skill at your Desktop, Downloads, home directory, or a broad
          multi-project archive. A dedicated folder keeps the evidence boundary clear.
        </Callout>
      </Section>

      <Section id="install-skill" title="1. Install the skill">
        <p>Run the npx installer once. It places the latest published release in <code>$CODEX_HOME/skills</code>, or <code>~/.codex/skills</code> when <code>CODEX_HOME</code> is unset.</p>
        <CodeBlock value={installCommand} filename="TERMINAL / FIRST INSTALL" />
        <Callout type="success" title="Existing installations are protected">
          The install command refuses to overwrite an existing destination. If the skill
          is already installed, use the update command instead.
        </Callout>
        <h3>Update later</h3>
        <p>Use <code>@latest</code> to fetch the newest npm release. The updater verifies the installed skill, stages the replacement, and swaps it into place atomically.</p>
        <CodeBlock value={updateCommand} filename="TERMINAL / UPDATE" />
        <p>For a repository-local installation, append <code>--repo /absolute/path/to/repository</code>. Run <code>npx anything-to-journal@latest --help</code> for explicit destination and dry-run options.</p>
      </Section>

      <Section id="create-workspace" title="2. Create the workspace">
        <p>Create a fresh folder with a specific, stable project name. This folder is both the input boundary and the place where the agent will work.</p>
        <CodeBlock value={`mkdir coastal-risk-manuscript\ncd coastal-risk-manuscript`} filename="TERMINAL" />
      </Section>

      <Section id="add-material" title="3. Add source material">
        <p>Copy in everything that can support the paper. Keep original filenames when they carry meaning, and add a short README if the dataset or notation needs explanation.</p>
        <CodeBlock value={sourceTree} filename="EXAMPLE WORKSPACE" />
        <p>Incomplete material is allowed. The workflow should report evidence gaps rather than filling them with unsupported claims.</p>
      </Section>

      <Section id="open-agent" title="4. Open your agent">
        <p>Open your coding agent from inside the new folder. Then give it a direct instruction to invoke the skill and ask the required mode question before inspection.</p>
        <CodeBlock value={firstPrompt} filename="FIRST PROMPT" />
      </Section>

      <Section id="confirm-mode" title="5. Confirm the mode">
        <p>The agent must pause before opening source content and ask which of these two modes you want:</p>
        <div className="mode-doc-grid">
          <div><span>A / DRAFT</span><h3>Flexible journal draft</h3><p>Use when you want a strong manuscript structure before choosing a venue.</p></div>
          <div><span>B / TEMPLATE</span><h3>Specific journal template</h3><p>Use when you already have the official class files, sample article, and author guide.</p></div>
        </div>
        <p>If you choose template mode, identify the target journal and place its official files inside <code>journal-template/</code>.</p>
      </Section>

      <Section id="review-output" title="6. Review the output">
        <p>When generation finishes, review the report first, then use the local Manuscript Workspace or open the compiled PDF directly. Check unresolved evidence notes before spending time on typography.</p>
        <CodeBlock value={outputTree} filename="EXPECTED OUTPUT" />
        <ul className="check-list">
          <li>Open <code>reports/quality-report.md</code> and read every warning.</li>
          <li>Use PDF Preview to scroll through the complete paper and check layout problems.</li>
          <li>Edit the actual <code>manuscript/manuscript.tex</code> file in the LaTeX tab or continue asking Codex for changes.</li>
          <li>Save to recompile and refresh the preview; run the existing final build and audit after the last edit.</li>
          <li>Confirm citations resolve and reference entries are complete.</li>
          <li>Upload <code>submission/overleaf-upload.zip</code> when you are ready to edit online.</li>
        </ul>
      </Section>
    </ArticleFrame>
  );
}

function FolderContract() {
  return (
    <ArticleFrame slug="folder-contract">
      <p className="doc-lead">
        The folder contract defines what the agent may treat as evidence, what it should
        ignore, and where generated files belong. A clear boundary makes the manuscript
        easier to audit.
      </p>

      <Section id="one-project" title="One project, one folder">
        <p>Use one dedicated top-level folder per manuscript. The agent reads recursively, so nested folders are useful for grouping but do not hide content.</p>
        <div className="do-dont-grid">
          <div className="do"><span>DO</span><p><code>coastal-risk-manuscript/</code><br />One research question, one evidence set.</p></div>
          <div className="dont"><span>DON’T</span><p><code>Desktop/</code><br />Unrelated files, secrets, and ambiguous scope.</p></div>
        </div>
      </Section>

      <Section id="recommended-structure" title="Recommended structure">
        <p>The skill does not require a rigid schema, but predictable names make intent clear and reduce follow-up questions.</p>
        <CodeBlock value={sourceTree} filename="SOURCE FOLDER" />
        <p>A root <code>README.md</code> is the best place to state the research question, describe terminology, flag the newest dataset, and explain any files that must take priority.</p>
      </Section>

      <Section id="supported-material" title="Supported material">
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Material</th><th>Typical files</th><th>How it is used</th></tr></thead>
            <tbody>
              <tr><td>Research notes</td><td><code>.md .txt .docx .pdf</code></td><td>Questions, rationale, methods, interpretation</td></tr>
              <tr><td>Data & results</td><td><code>.csv .tsv .xlsx</code></td><td>Reported values, tables, and traceable summaries</td></tr>
              <tr><td>Figures</td><td><code>.png .jpg .pdf</code></td><td>Article figures and visual evidence</td></tr>
              <tr><td>References</td><td><code>.bib .ris .pdf</code></td><td>Citations and bibliography records</td></tr>
              <tr><td>Code outputs</td><td><code>.json .html .log</code></td><td>Reproducibility context and computed results</td></tr>
              <tr><td>Journal files</td><td><code>.cls .sty .bst .tex</code></td><td>Template rules in specific-template mode</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="keep-out" title="What to keep out">
        <ul className="cross-list">
          <li>Passwords, access tokens, private keys, and credentials.</li>
          <li>Personally identifying raw data that is not cleared for manuscript use.</li>
          <li>Unrelated projects or duplicate archives with unclear authority.</li>
          <li>Generated output from an earlier run unless it is intentionally being revised.</li>
          <li>Paywalled or licensed material you are not permitted to process.</li>
        </ul>
      </Section>

      <Section id="source-of-truth" title="Evidence source of truth">
        <p>Files in the workspace are evidence candidates, not automatic truth. The agent should distinguish raw observations, analysis outputs, interpretations, and author instructions.</p>
        <Callout type="warning" title="No source, no invented result">
          If a required value, citation, method detail, or conclusion is absent or
          contradictory, the manuscript must mark the gap for review. It must not guess.
        </Callout>
      </Section>
    </ArticleFrame>
  );
}

function Templates() {
  return (
    <ArticleFrame slug="templates">
      <p className="doc-lead">
        Output mode is chosen before source content is read. Draft mode optimizes for portability;
        specific-template mode optimizes for fidelity to a supplied journal package.
      </p>

      <Section id="required-confirmation" title="Required confirmation">
        <p>Before reading the workspace content, the agent asks one direct question and waits for the answer:</p>
        <CodeBlock value={`Should I generate:\nA. a flexible journal draft, or\nB. a manuscript for a specific journal template?\n\nIf B, which journal should I follow and where are its official template files?`} filename="AGENT CHECKPOINT" />
        <p>The skill may list filenames to locate the workspace, but it does not open, summarize, or interpret source content before this checkpoint.</p>
      </Section>

      <Section id="draft-mode" title="Draft mode">
        <p>Choose draft mode when the argument and evidence need to stabilize before formatting for a venue. The result uses familiar article sections and conservative LaTeX dependencies.</p>
        <ul className="check-list">
          <li>Portable article structure with abstract, introduction, methods, results, discussion, and references as applicable.</li>
          <li>Ordinary, readable LaTeX files for easy editing and review.</li>
          <li>Neutral formatting that can be migrated to a journal later.</li>
          <li>An Overleaf-ready package even without a target journal.</li>
        </ul>
      </Section>

      <Section id="specific-template" title="Specific template mode">
        <p>Choose this mode when the target venue is known and you have official template material. The agent uses those files as constraints instead of recreating the journal style from memory.</p>
        <Callout title="Use official files">
          Download the current template and author instructions from the journal or
          publisher. A screenshot or old submitted PDF is not a sufficient template.
        </Callout>
      </Section>

      <Section id="template-package" title="Prepare the template package">
        <p>Place the full template package in a clearly named folder inside the source workspace. Include the sample article because it often documents required commands better than the class file alone.</p>
        <CodeBlock value={templateTree} filename="JOURNAL TEMPLATE" />
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>File</th><th>Why it matters</th></tr></thead>
            <tbody>
              <tr><td><code>sample-manuscript.tex</code></td><td>Shows the expected document structure and commands.</td></tr>
              <tr><td><code>journal.cls</code> / <code>.sty</code></td><td>Defines the journal layout and package behavior.</td></tr>
              <tr><td><code>.bst</code></td><td>Controls bibliography formatting when BibTeX is used.</td></tr>
              <tr><td>Author guide</td><td>Defines length, section, figure, and submission requirements.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="changing-mode" title="Changing mode later">
        <p>You can move from draft mode to a specific template after the manuscript stabilizes. Keep the original draft output, copy the original source materials and current official template into a new fresh folder, and start a target-mode pass.</p>
        <Callout type="warning" title="Treat migration as a new generation pass">
          Journal templates can change section order, bibliography tooling, floats, and
          metadata. Recompile and review the entire manuscript after migration.
        </Callout>
      </Section>
    </ArticleFrame>
  );
}

function Overleaf() {
  return (
    <ArticleFrame slug="overleaf">
      <p className="doc-lead">
        Anything-to-Journal creates one ZIP specifically for Overleaf. Upload that bundle
        as a new project; do not manually rebuild the file tree.
      </p>

      <Section id="upload-bundle" title="The upload bundle">
        <CodeBlock value={outputTree} filename="GENERATED DELIVERABLE" />
        <Callout type="success" title="Upload submission/overleaf-upload.zip">
          This is the only file you need to transfer. The archive contains
          <code>main.tex</code> at its root, plus the bibliography, supporting LaTeX,
          figures, and journal files required by the manuscript.
        </Callout>
      </Section>

      <Section id="upload-steps" title="Upload in three steps">
        <ol className="numbered-steps">
          <li><span>1</span><div><strong>Open Overleaf</strong><p>From the project dashboard, select <b>New Project</b>.</p></div></li>
          <li><span>2</span><div><strong>Choose Upload Project</strong><p>Select <b>Upload Project</b> from the menu.</p></div></li>
          <li><span>3</span><div><strong>Select the generated ZIP</strong><p>Choose <code>journal-output/submission/overleaf-upload.zip</code> and wait for the project to open.</p></div></li>
        </ol>
        <p>Overleaf unpacks the archive automatically. You should immediately see <code>main.tex</code>, <code>README_OVERLEAF.md</code>, <code>references.bib</code>, and any required support files in a flat project root.</p>
      </Section>

      <Section id="first-compile" title="First compile">
        <p>Read <code>README_OVERLEAF.md</code> before changing settings. It records the expected compiler, bibliography tool, and any template-specific setup.</p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Check</th><th>Expected state</th></tr></thead>
            <tbody>
              <tr><td>Main document</td><td><code>main.tex</code></td></tr>
              <tr><td>Compiler</td><td>As stated in <code>README_OVERLEAF.md</code></td></tr>
              <tr><td>Bibliography</td><td>BibTeX or Biber as documented</td></tr>
              <tr><td>Assets</td><td>Flat filenames that match the references in <code>main.tex</code></td></tr>
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="Do not change compilers at random">
          Journal classes may require pdfLaTeX, XeLaTeX, or LuaLaTeX. Follow the generated
          README and the journal instructions before changing the compiler.
        </Callout>
      </Section>

      <Section id="edit-safely" title="Edit safely">
        <p>Edit <code>main.tex</code> for the title, abstract, sections, declarations, captions, and wording. If the bundle contains supporting <code>.tex</code> files, edit the matching file while keeping its <code>\input</code> name stable.</p>
        <ul className="check-list">
          <li>Edit prose in <code>main.tex</code> or the relevant supporting <code>.tex</code> file.</li>
          <li>Use existing labels when moving tables or figures.</li>
          <li>Recompile after small groups of changes.</li>
          <li>Download a backup before restructuring the template.</li>
        </ul>
      </Section>

      <Section id="replace-assets" title="Replace figures and references">
        <p>To replace a figure, upload the new file at the project root and keep the filename unchanged, or update the matching <code>\includegraphics</code> reference. For citations, edit <code>references.bib</code> and keep citation keys stable when possible.</p>
        <CodeBlock value={`figure-02.png               # replace or add\nreferences.bib              # edit verified entries\nmain.tex                    # update prose, captions, and references`} filename="COMMON EDIT TARGETS" />
      </Section>
    </ArticleFrame>
  );
}

function Troubleshooting() {
  return (
    <ArticleFrame slug="troubleshooting">
      <p className="doc-lead">
        Start with the first error in the compile log. Later errors are often side effects.
        Preserve a copy of the generated output before making structural fixes.
      </p>

      <Section id="upload-problems" title="Upload problems">
        <h3>Overleaf cannot find <code>main.tex</code></h3>
        <p>You may have zipped the outer <code>journal-output/</code> folder instead of using the generated archive. Upload <code>submission/overleaf-upload.zip</code> exactly as produced.</p>
        <CodeBlock value={`✓ submission/overleaf-upload.zip → main.tex at ZIP root\n✕ journal-output.zip → submission/overleaf-upload/main.tex`} filename="ZIP ROOT" />
        <h3>The ZIP is rejected or too large</h3>
        <p>Remove unused raw media and intermediate analysis files from the upload copy. Keep them in the source workspace; the Overleaf bundle should contain only manuscript dependencies.</p>
      </Section>

      <Section id="compile-problems" title="Compile problems">
        <div className="issue-list">
          <div><span>01</span><div><strong>Missing <code>.cls</code> or <code>.sty</code></strong><p>Copy the official class or style file into the project root, then recompile. Do not substitute an unrelated package.</p></div></div>
          <div><span>02</span><div><strong>Undefined control sequence</strong><p>Check that the journal package providing the command is present and loaded. Compare against the official sample manuscript.</p></div></div>
          <div><span>03</span><div><strong>Wrong compiler</strong><p>Open <code>README_OVERLEAF.md</code> and match the project compiler to the documented setting.</p></div></div>
          <div><span>04</span><div><strong>Build works locally, not online</strong><p>Check filename case, relative paths, and packages unavailable in Overleaf’s current TeX distribution.</p></div></div>
        </div>
      </Section>

      <Section id="citation-problems" title="Citation problems">
        <h3>Citations show as <code>[?]</code></h3>
        <p>Confirm that the citation key exists in <code>references.bib</code>, the bibliography filename matches <code>main.tex</code>, and the configured backend matches the document.</p>
        <Callout title="Recompile enough times">
          LaTeX references may need multiple passes. Overleaf normally handles this, but
          a fresh recompile from scratch can clear stale auxiliary files.
        </Callout>
        <h3>A reference is present but incomplete</h3>
        <p>Repair the BibTeX entry using a reliable bibliographic source. Do not invent missing DOI, page, volume, or author data.</p>
      </Section>

      <Section id="figure-problems" title="Figure problems">
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Symptom</th><th>Check</th></tr></thead>
            <tbody>
              <tr><td>Figure not found</td><td>Path, filename spelling, and capitalization</td></tr>
              <tr><td>Blank or broken PDF</td><td>Export compatibility and embedded fonts</td></tr>
              <tr><td>Figure floats too far</td><td>Placement specifier and surrounding text; avoid forcing every float</td></tr>
              <tr><td>Image looks soft</td><td>Replace with vector PDF or higher-resolution raster</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="content-problems" title="Content and evidence">
        <h3>The manuscript contains an unsupported statement</h3>
        <p>Trace it to the source folder. If the evidence is absent, delete the statement or mark it as an unresolved author query. Add the missing source before asking the agent to revise.</p>
        <h3>Two source files disagree</h3>
        <p>Do not silently choose one. Record the conflict in the workspace README, identify the authoritative source, and rerun only the affected section.</p>
        <Callout type="warning" title="Formatting cannot resolve evidence">
          A clean compile is not a correctness check. Review claims, values, citations,
          author details, ethics statements, and submission requirements before use.
        </Callout>
      </Section>
    </ArticleFrame>
  );
}
