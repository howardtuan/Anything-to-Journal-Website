"use client";

import { useState } from "react";

const demoSteps = [
  { id: "source", number: "01", label: "Source folder" },
  { id: "choice", number: "02", label: "Choose mode" },
  { id: "output", number: "03", label: "Journal output" },
] as const;

type DemoStep = (typeof demoSteps)[number]["id"];

const sourceTree = [
  ["folder", "my-research/"],
  ["file", "field-notes.md"],
  ["file", "results.xlsx"],
  ["file", "interviews.pdf"],
  ["folder", "figures/"],
  ["file", "references.bib"],
];

const outputTree = [
  ["zip", "overleaf-upload.zip"],
  ["file", "main.tex"],
  ["file", "journal-preamble.tex"],
  ["file", "references.bib"],
  ["file", "README_OVERLEAF.md"],
];

export function HomeDemo() {
  const [step, setStep] = useState<DemoStep>("source");

  return (
    <div className="product-demo" aria-label="Interactive Anything-to-Journal workflow">
      <div className="demo-toolbar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>anything-to-journal / workspace</span>
        <span className="status-chip">READY</span>
      </div>
      <div className="demo-tabs" role="tablist" aria-label="Workflow step">
        {demoSteps.map((item) => (
          <button
            key={item.id}
            className={step === item.id ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={step === item.id}
            onClick={() => setStep(item.id)}
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="demo-stage">
        {step === "source" && (
          <>
            <div className="demo-copy">
              <span className="micro-label">FRESH WORKSPACE</span>
              <h3>Put every useful source in one new folder.</h3>
              <p>
                Notes, PDFs, tables, figures, references, transcripts, drafts—keep
                the context together. Before opening the content, the agent asks
                which output mode you want.
              </p>
              <button type="button" onClick={() => setStep("choice")}>
                Folder ready <span>→</span>
              </button>
            </div>
            <FilePanel title="INPUT / 6 ITEMS" items={sourceTree} />
          </>
        )}

        {step === "choice" && (
          <>
            <div className="demo-copy">
              <span className="micro-label">ONE REQUIRED DECISION</span>
              <h3>Draft, or a specific journal template?</h3>
              <p>
                Before reading source content, the agent confirms the output mode. Use a clean
                journal draft or provide the exact target journal files.
              </p>
            </div>
            <div className="mode-panel">
              <button className="mode-option selected" type="button" onClick={() => setStep("output")}>
                <span className="mode-index">A</span>
                <span>
                  <strong>Draft mode</strong>
                  <small>Portable structure. Easy to review.</small>
                </span>
                <i>SELECTED</i>
              </button>
              <button className="mode-option" type="button" onClick={() => setStep("output")}>
                <span className="mode-index">B</span>
                <span>
                  <strong>Journal template</strong>
                  <small>Match a supplied class and guide.</small>
                </span>
                <i>CHOOSE</i>
              </button>
            </div>
          </>
        )}

        {step === "output" && (
          <>
            <div className="demo-copy">
              <span className="micro-label">EDITABLE DELIVERABLE</span>
              <h3>Your journal, packaged for the next edit.</h3>
              <p>
                The manuscript, bibliography, figures, and instructions arrive
                together. Upload the ZIP directly to Overleaf or edit locally.
              </p>
              <button type="button" onClick={() => setStep("source")}>
                Run it again <span>↻</span>
              </button>
            </div>
            <FilePanel title="OUTPUT / OVERLEAF READY" items={outputTree} output />
          </>
        )}
      </div>
      <div className="demo-footer">
        <span>AGENT INTAKE</span>
        <span>MODE CONFIRMED</span>
        <span>MANUSCRIPT PACKAGED</span>
      </div>
    </div>
  );
}

function FilePanel({
  title,
  items,
  output = false,
}: {
  title: string;
  items: string[][];
  output?: boolean;
}) {
  return (
    <div className={`file-panel${output ? " output" : ""}`}>
      <div className="file-panel-title">
        <span>{title}</span>
        <span>•••</span>
      </div>
      <div className="file-tree">
        {items.map(([type, name], index) => (
          <div className={index === 0 ? "root-file" : ""} key={name}>
            <span className={`file-icon ${type}`} aria-hidden="true">
              {type === "folder" ? "▰" : type === "zip" ? "▧" : "▤"}
            </span>
            <span>{name}</span>
            {index === 0 && output && <em>UPLOAD THIS</em>}
          </div>
        ))}
      </div>
      <div className="panel-note">
        <span className="red-dot" />
        {output ? "main.tex sits at ZIP root" : "agent reads everything in context"}
      </div>
    </div>
  );
}
