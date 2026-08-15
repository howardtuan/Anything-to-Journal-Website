import Link from "next/link";
import { CopyButton } from "./components/CopyButton";
import { HomeDemo } from "./components/HomeDemo";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const installCommand = "npx anything-to-journal@latest install";
const updateCommand = "npx anything-to-journal@latest update";

const workflow = [
  {
    number: "01",
    label: "ASSEMBLE",
    title: "Start with a fresh folder.",
    copy: "Create one clean workspace and put every relevant source inside. Mixed formats are expected.",
  },
  {
    number: "02",
    label: "OPEN",
    title: "Bring your agent to it.",
    copy: "Open the agent from that folder and ask it to use Anything-to-Journal. The folder becomes the working context.",
  },
  {
    number: "03",
    label: "CONFIRM",
    title: "Choose draft or template.",
    copy: "The agent must confirm whether you want a flexible draft or a manuscript matched to a supplied journal template.",
  },
  {
    number: "04",
    label: "REVIEW",
    title: "Edit the journal anywhere.",
    copy: "Receive readable sources, a compiled preview, and one upload-ready ZIP. Keep revising in Overleaf or locally.",
  },
];

const faqs = [
  {
    question: "What can I put in the source folder?",
    answer:
      "Anything that helps explain the work: PDFs, notes, Word files, spreadsheets, CSV data, figures, transcripts, citations, code, earlier drafts, and journal instructions.",
  },
  {
    question: "Do I need to organize everything first?",
    answer:
      "No. Clear names help, but the skill is designed to inspect mixed material. Keep the folder dedicated to one manuscript and exclude secrets or unrelated files.",
  },
  {
    question: "How do I update the skill?",
    answer:
      "Run npx anything-to-journal@latest update. The updater verifies the existing skill, stages the newest published release, and replaces the old copy safely.",
  },
  {
    question: "What is the difference between draft and template mode?",
    answer:
      "Draft mode prioritizes a clean, portable article structure. Template mode follows the class files, sample manuscript, and author guide for a specific target journal.",
  },
  {
    question: "Can I edit the generated manuscript myself?",
    answer:
      "Yes. The output is deliberately plain LaTeX with separate sections, figures, and bibliography files. It is built for continued human editing.",
  },
  {
    question: "What exactly do I upload to Overleaf?",
    answer:
      "Upload journal-output/submission/overleaf-upload.zip using New Project → Upload Project. The bundle already places main.tex at the ZIP root, where Overleaf expects it.",
  },
];

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero shell-grid">
        <div className="rail-label rail-left" aria-hidden="true">
          INPUT / ANYTHING
        </div>
        <div className="hero-inner">
          <div className="hero-kicker reveal-1">
            <span className="signal-dot" />
            AGENT SKILL / MANUSCRIPT WORKFLOW
          </div>
          <h1 className="hero-title reveal-2">
            Anything in.
            <br />
            <span>Journal</span> out.
          </h1>
          <div className="hero-bottom reveal-3">
            <p>
              Drop every source into one folder. Your agent turns the context into
              an editable journal manuscript—structured, referenced, and ready for
              Overleaf.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/docs/getting-started">
                Start with a folder <span>↗</span>
              </Link>
              <Link className="text-link" href="/docs">
                Read the docs <span>→</span>
              </Link>
            </div>
          </div>
          <div className="proof-marks" aria-hidden="true">
            <span>01</span>
            <i />
            <span>MANUSCRIPT / EDITABLE</span>
          </div>
        </div>
        <div className="rail-label rail-right" aria-hidden="true">
          OUTPUT / JOURNAL
        </div>
      </section>

      <section className="install-section section-rule" id="install">
        <div className="section-heading">
          <span className="section-index">01 / INSTALL</span>
          <div>
            <h2>One command to begin.</h2>
            <p>Install once with npx. Run the update command whenever a new npm release is published.</p>
          </div>
        </div>
        <div className="install-grid">
          <article>
            <div className="install-card-meta"><span>FIRST INSTALL</span><i>01</i></div>
            <h3>Install the latest release.</h3>
            <p>Copies the skill into your Codex skills directory without touching an existing installation.</p>
            <div className="install-command">
              <code>{installCommand}</code>
              <CopyButton value={installCommand} label="Copy install" />
            </div>
          </article>
          <article>
            <div className="install-card-meta"><span>FUTURE UPDATES</span><i>02</i></div>
            <h3>Update through the same CLI.</h3>
            <p>Verifies the installed skill, stages the newest release, and replaces the old copy atomically.</p>
            <div className="install-command">
              <code>{updateCommand}</code>
              <CopyButton value={updateCommand} label="Copy update" />
            </div>
          </article>
        </div>
        <p className="install-note">Requires Node.js 18 or newer. The default target is <code>~/.codex/skills/anything-to-journal</code>.</p>
      </section>

      <section className="demo-section section-rule">
        <div className="section-heading">
          <span className="section-index">02 / WORKSPACE</span>
          <div>
            <h2>One folder is the interface.</h2>
            <p>No form builder. No import ritual. Keep the full research context together.</p>
          </div>
        </div>
        <HomeDemo />
      </section>

      <section className="workflow-section section-rule" id="workflow">
        <div className="section-heading">
          <span className="section-index">03 / WORKFLOW</span>
          <div>
            <h2>From source pile to journal.</h2>
            <p>Four explicit steps. One decision before the source content is read.</p>
          </div>
        </div>
        <div className="workflow-grid">
          {workflow.map((step) => (
            <article className="workflow-card" key={step.number}>
              <div className="workflow-meta">
                <span>{step.number}</span>
                <span>{step.label}</span>
              </div>
              <div className="workflow-mark" aria-hidden="true">
                <span />
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="decision-section section-rule" id="templates">
        <div className="decision-intro">
          <span className="section-index">04 / MODE GATE</span>
          <h2>
            The agent asks
            <br />
            before it <em>reads.</em>
          </h2>
          <p>
            Format is a deliberate choice, never a silent guess. The workflow pauses
            before source content is opened until draft mode or a specific journal
            target is confirmed.
          </p>
        </div>
        <div className="decision-cards">
          <article>
            <span className="card-letter">A</span>
            <span className="chip">DEFAULT</span>
            <h3>Journal draft</h3>
            <p>
              A clear, portable manuscript structure for review, iteration, and
              choosing a venue later.
            </p>
            <ul>
              <li>Standard article sections</li>
              <li>Readable LaTeX sources</li>
              <li>Conservative dependencies</li>
            </ul>
            <Link href="/docs/templates">Use draft mode →</Link>
          </article>
          <article className="accent-card">
            <span className="card-letter">B</span>
            <span className="chip">TARGETED</span>
            <h3>Specific template</h3>
            <p>
              A manuscript aligned to the supplied journal class, example article,
              and submission requirements.
            </p>
            <ul>
              <li>Uses journal-provided files</li>
              <li>Preserves required structure</li>
              <li>Records compiler instructions</li>
            </ul>
            <Link href="/docs/templates">Add a template →</Link>
          </article>
        </div>
      </section>

      <section className="output-section section-rule" id="output">
        <div className="output-copy">
          <span className="section-index">05 / OUTPUT</span>
          <h2>A manuscript you still own.</h2>
          <p>
            Every major section stays separate and legible. Figures remain replaceable.
            Citations stay in a bibliography file. Nothing is trapped in an opaque editor.
          </p>
          <div className="output-facts">
            <div>
              <strong>01</strong>
              <span>Editable source</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Compiled PDF</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Upload-ready ZIP</span>
            </div>
          </div>
        </div>

        <div className="output-anatomy">
          <div className="anatomy-bar">
            <span>DELIVERABLES / FINAL</span>
            <span className="status-chip">EDITABLE</span>
          </div>
          <div className="anatomy-tree" role="img" aria-label="Generated output folder tree">
            <div className="tree-root"><span>▰</span> journal-output/</div>
            <div><i /> <span>▤</span> manuscript/manuscript.tex</div>
            <div><i /> <span>▤</span> reports/quality-report.md</div>
            <div><i /> <span>▰</span> submission/</div>
            <div className="nested"><i /> <span>▧</span> <strong>overleaf-upload.zip</strong><em>UPLOAD</em></div>
            <div className="nested"><i /> <span>▰</span> overleaf-upload/</div>
            <div className="nested"><i /> <span>▤</span> <strong>main.tex</strong><em>ROOT</em></div>
            <div className="nested"><i /> <span>▤</span> references.bib</div>
            <div className="nested"><i /> <span>▤</span> README_OVERLEAF.md</div>
            <div className="nested"><i /> <span>▤</span> manuscript.pdf</div>
          </div>
          <div className="anatomy-callout">
            <span>OVERLEAF ROUTE</span>
            <strong>New Project → Upload Project</strong>
            <p>Choose <code>submission/overleaf-upload.zip</code>. <code>main.tex</code> is already at the ZIP root.</p>
          </div>
        </div>
      </section>

      <section className="overleaf-band">
        <div>
          <span className="section-index">06 / HANDOFF</span>
          <h2>
            One ZIP.
            <br />
            Straight to Overleaf.
          </h2>
        </div>
        <div className="overleaf-steps">
          <div><span>1</span><p>Open Overleaf and choose <strong>New Project</strong>.</p></div>
          <div><span>2</span><p>Select <strong>Upload Project</strong>.</p></div>
          <div><span>3</span><p>Upload <strong>submission/overleaf-upload.zip</strong>.</p></div>
        </div>
        <Link className="button button-light" href="/docs/overleaf">
          Open the Overleaf guide <span>↗</span>
        </Link>
      </section>

      <section className="faq-section section-rule" id="faq">
        <div className="faq-heading">
          <span className="section-index">07 / FAQ</span>
          <h2>Questions, resolved.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{faq.question}</strong>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span className="section-index">READY / WHEN YOU ARE</span>
        <h2>
          Make a folder.
          <br />
          Make it a <em>journal.</em>
        </h2>
        <div>
          <p>The documentation starts with the exact folder contract and first prompt.</p>
          <Link className="button button-red" href="/docs/getting-started">
            Get started <span>↗</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
