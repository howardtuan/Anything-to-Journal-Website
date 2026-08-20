"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export function CopyButton({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const zh = language === "zh-TW";

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className="copy-button" type="button" onClick={copy}>
      {copied ? (copiedLabel ?? (zh ? "已複製" : "Copied")) : (label ?? (zh ? "複製" : "Copy"))}
    </button>
  );
}
