"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeLanguage } from "../homeCopy";

type WorkspaceTab = "pdf" | "latex";

const codeLines = [
  ["\\documentclass", "{article}"],
  ["\\usepackage", "{graphicx}"],
  ["\\title", "{Evidence-Aware Manuscript Workflows}"],
  ["\\begin", "{document}"],
  ["\\maketitle", ""],
  ["\\section", "{Discussion}"],
  ["Our findings show that shared source files", ""],
  ["keep agent and manual edits synchronized.", ""],
  ["\\bibliography", "{references}"],
  ["\\end", "{document}"],
] as const;

export function WorkspaceShowcase({ language }: { language: HomeLanguage }) {
  const [tab, setTab] = useState<WorkspaceTab>("pdf");
  const [compiling, setCompiling] = useState(false);
  const compileTimer = useRef<number | null>(null);
  const zh = language === "zh-TW";

  useEffect(() => () => {
    if (compileTimer.current !== null) window.clearTimeout(compileTimer.current);
  }, []);

  function recompile() {
    setCompiling(true);
    if (compileTimer.current !== null) window.clearTimeout(compileTimer.current);
    compileTimer.current = window.setTimeout(() => setCompiling(false), 850);
  }

  return (
    <div className="workspace-showcase">
      <div className="workspace-browser-bar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="workspace-address">127.0.0.1:43127</span>
        <span className="workspace-lock">LOCAL</span>
      </div>

      <div className="workspace-app-bar">
        <div>
          <strong>manuscript.tex</strong>
          <span>journal-output / manuscript</span>
        </div>
        <span className="workspace-saved"><i />{compiling ? (zh ? "編譯中" : "COMPILING") : (zh ? "已儲存" : "SAVED")}</span>
        <button type="button" onClick={recompile} disabled={compiling}>↻ {compiling ? (zh ? "編譯中…" : "COMPILING…") : (zh ? "重新編譯" : "RECOMPILE")}</button>
      </div>

      <div className="workspace-tabs" role="tablist" aria-label={zh ? "論文工作區分頁" : "Manuscript workspace tabs"}>
        <button
          className={tab === "pdf" ? "active" : ""}
          type="button"
          role="tab"
          aria-selected={tab === "pdf"}
          onClick={() => setTab("pdf")}
        >
          <span>01</span>{zh ? "PDF 預覽" : "PDF Preview"}
        </button>
        <button
          className={tab === "latex" ? "active" : ""}
          type="button"
          role="tab"
          aria-selected={tab === "latex"}
          onClick={() => setTab("latex")}
        >
          <span>02</span>LaTeX
        </button>
      </div>

      <div className="workspace-stage">
        {tab === "pdf" ? (
          <div className="workspace-pdf-scroll" role="tabpanel" aria-label={zh ? "可捲動 PDF 預覽" : "Scrollable PDF preview"}>
            <FakePdfPage page="1" />
            <FakePdfPage page="2" compact />
          </div>
        ) : (
          <div className="workspace-code" role="tabpanel" aria-label={zh ? "LaTeX 原始碼編輯器" : "LaTeX source editor"}>
            {codeLines.map(([command, argument], index) => (
              <div className="workspace-code-line" key={`${command}-${index}`}>
                <span className="line-number">{index + 1}</span>
                <code>
                  <span className={command.startsWith("\\") ? "tex-command" : ""}>{command}</span>
                  {argument && <span className="tex-argument">{argument}</span>}
                </code>
              </div>
            ))}
            <span className="workspace-caret" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="workspace-status-bar">
        <span><i className="sync-dot" />{zh ? "監看外部變更" : "WATCHING EXTERNAL CHANGES"}</span>
        <span>{compiling ? (zh ? "正在編譯 PDF" : "COMPILING PDF") : (zh ? "PDF 已同步" : "PDF IN SYNC")}</span>
      </div>
    </div>
  );
}

function FakePdfPage({ page, compact = false }: { page: string; compact?: boolean }) {
  return (
    <article className={`fake-pdf-page${compact ? " compact" : ""}`}>
      {!compact && (
        <>
          <span className="fake-journal-label">RESEARCH ARTICLE</span>
          <h3>Evidence-Aware<br />Manuscript Workflows</h3>
          <p className="fake-authors">A. Researcher · B. Collaborator</p>
          <div className="fake-abstract">
            <strong>Abstract</strong>
            <p />
            <p />
            <p className="short" />
          </div>
        </>
      )}
      <div className="fake-columns">
        <div>{Array.from({ length: compact ? 12 : 7 }, (_, index) => <i key={index} />)}</div>
        <div>{Array.from({ length: compact ? 12 : 7 }, (_, index) => <i key={index} />)}</div>
      </div>
      <span className="fake-page-number">{page}</span>
    </article>
  );
}
