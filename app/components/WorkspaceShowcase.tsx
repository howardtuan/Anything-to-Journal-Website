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
  const [sourceIndex, setSourceIndex] = useState<number | null>(null);
  const sourcePanel = useRef<HTMLElement>(null);
  const referenceButton = useRef<HTMLButtonElement>(null);
  const compileTimer = useRef<number | null>(null);
  const zh = language === "zh-TW";

  useEffect(() => () => {
    if (compileTimer.current !== null) window.clearTimeout(compileTimer.current);
  }, []);

  useEffect(() => {
    if (sourceIndex === null) return;
    sourcePanel.current?.focus({ preventScroll: true });
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setSourceIndex(null);
      referenceButton.current?.focus({ preventScroll: true });
    }
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [sourceIndex]);

  function closeSource() {
    setSourceIndex(null);
    referenceButton.current?.focus({ preventScroll: true });
  }

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

      <div className="workspace-demo-hint">
        {zh ? "互動示範 · 點擊 0.9 旁的參考節點" : "INTERACTIVE EXAMPLE · Click the reference beside 0.9"}
      </div>
      <div className="workspace-stage">
        {tab === "pdf" ? (
          <>
            <div className="workspace-pdf-scroll" role="tabpanel" aria-label={zh ? "可捲動 PDF 預覽" : "Scrollable PDF preview"}>
              <article className="fake-pdf-page fake-provenance-page">
                <span className="fake-journal-label">RESEARCH ARTICLE</span>
                <h3>Evidence-Aware<br />Manuscript Workflows</h3>
                <p className="fake-authors">A. Researcher · B. Collaborator</p>
                <div className="fake-finding">
                  <strong>{zh ? "3. 研究結果" : "3. Results"}</strong>
                  <p>
                    {zh ? "模型在保留的測試集上達到準確率 " : "The model achieved a held-out accuracy of "}
                    <b>0.9</b>.
                    <button
                      ref={referenceButton}
                      type="button"
                      className="reference-node"
                      aria-label={zh ? "查看準確率 0.9 的 2 個來源" : "View 2 sources for accuracy 0.9"}
                      aria-expanded={sourceIndex !== null}
                      aria-controls={sourceIndex !== null ? "demo-source-panel" : undefined}
                      onClick={() => setSourceIndex(0)}
                    >01 ↗</button>
                  </p>
                </div>
                <div className="fake-columns" aria-hidden="true">
                  <div>{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
                  <div>{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
                </div>
                <span className="fake-page-number">1</span>
              </article>
              <FakePdfPage page="2" compact />
            </div>
            {sourceIndex !== null && (
              <aside
                id="demo-source-panel"
                className="workspace-source-panel"
                role="dialog"
                aria-labelledby="demo-source-title"
                ref={sourcePanel}
                tabIndex={-1}
              >
                <div className="source-panel-heading">
                  <strong id="demo-source-title">{zh ? "參考資訊 · 準確率 0.9" : "SOURCE REFERENCES · Accuracy 0.9"}</strong>
                  <button type="button" onClick={closeSource} aria-label={zh ? "關閉參考資訊" : "Close source references"}>×</button>
                </div>
                <div className="source-selector" aria-label={zh ? "選擇來源檔案" : "Choose a source file"}>
                  <button type="button" aria-pressed={sourceIndex === 0} onClick={() => setSourceIndex(0)}>01 · evaluation.pdf</button>
                  <button type="button" aria-pressed={sourceIndex === 1} onClick={() => setSourceIndex(1)}>02 · metrics.csv</button>
                </div>
                <div className="source-excerpt" aria-live="polite">
                  <span className="source-locator">{sourceIndex === 0
                    ? (zh ? "sources/evaluation.pdf · 第 4 頁 · Results" : "sources/evaluation.pdf · Page 4 · Results")
                    : (zh ? "data/metrics.csv · 第 2 行" : "data/metrics.csv · Line 2")}</span>
                  {sourceIndex === 0 ? (
                    <p>Held-out evaluation<br /><mark>The model achieved an accuracy of 0.9 on the held-out test set.</mark></p>
                  ) : (
                    <pre><code>split,metric,value{"\n"}<mark>test,accuracy,0.9</mark>{"\n"}test,f1,0.88</code></pre>
                  )}
                </div>
                <p className="source-demo-note">{zh ? "示範資料 · 螢光標示記錄的原文，仍需確認是否支持論述。" : "Sample data · Highlights locate recorded evidence for your review."}</p>
              </aside>
            )}
          </>
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
