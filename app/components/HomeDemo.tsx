"use client";

import { useState } from "react";
import type { HomeLanguage } from "../homeCopy";

type DemoStep = "source" | "choice" | "output";

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

export function HomeDemo({ language }: { language: HomeLanguage }) {
  const [step, setStep] = useState<DemoStep>("source");
  const zh = language === "zh-TW";
  const demoSteps = [
    { id: "source" as const, number: "01", label: zh ? "來源資料夾" : "Source folder" },
    { id: "choice" as const, number: "02", label: zh ? "選擇模式" : "Choose mode" },
    { id: "output" as const, number: "03", label: zh ? "論文輸出" : "Journal output" },
  ];

  return (
    <div className="product-demo" aria-label={zh ? "Anything-to-Journal 互動工作流程" : "Interactive Anything-to-Journal workflow"}>
      <div className="demo-toolbar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>anything-to-journal / workspace</span>
        <span className="status-chip">{zh ? "就緒" : "READY"}</span>
      </div>
      <div className="demo-tabs" role="tablist" aria-label={zh ? "工作流程步驟" : "Workflow step"}>
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
              <span className="micro-label">{zh ? "全新工作區" : "FRESH WORKSPACE"}</span>
              <h3>{zh ? "把所有有用的來源放進一個新資料夾。" : "Put every useful source in one new folder."}</h3>
              <p>
                {zh
                  ? "筆記、PDF、表格、圖片、references、逐字稿與草稿都放在一起。開啟內容前，Agent 會先詢問你要使用哪一種輸出模式。"
                  : "Notes, PDFs, tables, figures, references, transcripts, drafts—keep the context together. Before opening the content, the agent asks which output mode you want."}
              </p>
              <button type="button" onClick={() => setStep("choice")}>
                {zh ? "資料夾已就緒" : "Folder ready"} <span>→</span>
              </button>
            </div>
            <FilePanel title={zh ? "輸入 / 6 個項目" : "INPUT / 6 ITEMS"} items={sourceTree} language={language} />
          </>
        )}

        {step === "choice" && (
          <>
            <div className="demo-copy">
              <span className="micro-label">{zh ? "一個必要決定" : "ONE REQUIRED DECISION"}</span>
              <h3>{zh ? "一般草稿，還是特定期刊模板？" : "Draft, or a specific journal template?"}</h3>
              <p>
                {zh
                  ? "讀取來源內容前，Agent 會先確認輸出模式。你可以使用乾淨的一般論文草稿，或提供目標期刊的完整檔案。"
                  : "Before reading source content, the agent confirms the output mode. Use a clean journal draft or provide the exact target journal files."}
              </p>
            </div>
            <div className="mode-panel">
              <button className="mode-option selected" type="button" onClick={() => setStep("output")}>
                <span className="mode-index">A</span>
                <span>
                  <strong>{zh ? "草稿模式" : "Draft mode"}</strong>
                  <small>{zh ? "可攜結構，容易審閱。" : "Portable structure. Easy to review."}</small>
                </span>
                <i>{zh ? "已選擇" : "SELECTED"}</i>
              </button>
              <button className="mode-option" type="button" onClick={() => setStep("output")}>
                <span className="mode-index">B</span>
                <span>
                  <strong>{zh ? "期刊模板" : "Journal template"}</strong>
                  <small>{zh ? "符合提供的 class 與規範。" : "Match a supplied class and guide."}</small>
                </span>
                <i>{zh ? "選擇" : "CHOOSE"}</i>
              </button>
            </div>
          </>
        )}

        {step === "output" && (
          <>
            <div className="demo-copy">
              <span className="micro-label">{zh ? "可編輯交付內容" : "EDITABLE DELIVERABLE"}</span>
              <h3>{zh ? "完整論文，準備進入下一次編修。" : "Your journal, packaged for the next edit."}</h3>
              <p>
                {zh
                  ? "論文、bibliography、圖表與說明會一起產生。你可以開啟本機 PDF／LaTeX 工作區，也能直接把 ZIP 上傳到 Overleaf。"
                  : "The manuscript, bibliography, figures, and instructions arrive together. Open the local PDF/LaTeX workspace or upload the ZIP directly to Overleaf."}
              </p>
              <button type="button" onClick={() => setStep("source")}>
                {zh ? "重新查看" : "Run it again"} <span>↻</span>
              </button>
            </div>
            <FilePanel title={zh ? "輸出 / OVERLEAF 就緒" : "OUTPUT / OVERLEAF READY"} items={outputTree} output language={language} />
          </>
        )}
      </div>
      <div className="demo-footer">
        <span>{zh ? "AGENT 接收" : "AGENT INTAKE"}</span>
        <span>{zh ? "模式已確認" : "MODE CONFIRMED"}</span>
        <span>{zh ? "論文已打包" : "MANUSCRIPT PACKAGED"}</span>
      </div>
    </div>
  );
}

function FilePanel({
  title,
  items,
  output = false,
  language,
}: {
  title: string;
  items: string[][];
  output?: boolean;
  language: HomeLanguage;
}) {
  const zh = language === "zh-TW";
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
            {index === 0 && output && <em>{zh ? "上傳此檔" : "UPLOAD THIS"}</em>}
          </div>
        ))}
      </div>
      <div className="panel-note">
        <span className="red-dot" />
        {output
          ? (zh ? "main.tex 位於 ZIP 根目錄" : "main.tex sits at ZIP root")
          : (zh ? "Agent 會在同一脈絡中讀取所有內容" : "agent reads everything in context")}
      </div>
    </div>
  );
}
