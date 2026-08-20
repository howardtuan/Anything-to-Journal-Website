"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeLanguage } from "../homeCopy";

const installCommand = "npx anything-to-journal@latest install";
const updateCommand = "npx anything-to-journal@latest update";

type Audience = "you" | "agent";
type CopyTarget = "install" | "update" | "prompt";

export function InstallSwitcher({ language }: { language: HomeLanguage }) {
  const [audience, setAudience] = useState<Audience>("you");
  const [copied, setCopied] = useState<CopyTarget | null>(null);
  const resetTimer = useRef<number | null>(null);
  const zh = language === "zh-TW";
  const agentPrompt = zh
    ? `請幫我安裝或更新 Anything-to-Journal。先執行 ${installCommand}；如果已經安裝，請改用 ${updateCommand}。完成後告訴我 Skill 已可使用。`
    : `Install or update Anything-to-Journal for me. Run ${installCommand}; if it is already installed, use ${updateCommand} instead. Confirm when the skill is ready.`;

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  async function copy(target: CopyTarget, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(target);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(null), 1600);
  }

  function choose(nextAudience: Audience) {
    setAudience(nextAudience);
    setCopied(null);
  }

  return (
    <div className="install-switcher">
      <div className="install-audience-tabs" role="tablist" aria-label={zh ? "選擇安裝方式" : "Choose how to install Anything-to-Journal"}>
        <button
          className={audience === "you" ? "active" : ""}
          id="install-tab-you"
          type="button"
          role="tab"
          aria-selected={audience === "you"}
          aria-controls="install-panel"
          onClick={() => choose("you")}
        >
          For you
        </button>
        <button
          className={audience === "agent" ? "active" : ""}
          id="install-tab-agent"
          type="button"
          role="tab"
          aria-selected={audience === "agent"}
          aria-controls="install-panel"
          onClick={() => choose("agent")}
        >
          For your agent
        </button>
      </div>

      <div
        className="install-switcher-panel"
        id="install-panel"
        key={audience}
        role="tabpanel"
        aria-labelledby={`install-tab-${audience}`}
        aria-live="polite"
      >
        {audience === "you" ? (
          <>
            <button
              className="install-primary-action"
              type="button"
              onClick={() => copy("install", installCommand)}
              aria-label={zh ? "複製 Anything-to-Journal 安裝指令" : "Copy Anything-to-Journal install command"}
            >
              <span className="install-action-symbol" aria-hidden="true">$</span>
              <code>{installCommand}</code>
              <CopyMark copied={copied === "install"} />
            </button>
            <div className="install-switcher-meta">
              <span>{zh ? "已經安裝？使用更新指令" : "Already installed? Use the update command."}</span>
              <button type="button" onClick={() => copy("update", updateCommand)}>
                <code>{updateCommand}</code>
                <CopyMark copied={copied === "update"} />
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="install-primary-action"
              type="button"
              onClick={() => copy("prompt", agentPrompt)}
              aria-label={zh ? "複製給 Agent 的安裝提示" : "Copy agent install prompt"}
            >
              <span className="install-action-symbol agent" aria-hidden="true">✦</span>
              <span>{copied === "prompt" ? (zh ? "已複製 Prompt" : "Prompt copied") : "Copy Prompt"}</span>
              <CopyMark copied={copied === "prompt"} />
            </button>
            <div className="install-switcher-meta agent-note">
              <span>{zh ? "貼到 Codex 或其他可操作終端機的 Agent。" : "Paste into Codex or another agent that can run terminal commands."}</span>
              <span>{zh ? "Prompt 同時包含安裝與更新處理。" : "The prompt handles both first install and updates."}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CopyMark({ copied }: { copied: boolean }) {
  return (
    <span className={`copy-mark${copied ? " copied" : ""}`} aria-hidden="true">
      {copied ? "✓" : <><i /><i /></>}
    </span>
  );
}
