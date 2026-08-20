import Link from "next/link";
import type { HomeLanguage } from "../homeCopy";

export function SiteFooter({ language }: { language: HomeLanguage }) {
  const zh = language === "zh-TW";

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="eyebrow">ANYTHING-TO-JOURNAL / 2026</span>
          <p>{zh ? "研究資料成為一份能持續編輯的完整論文。" : "Source material becomes a manuscript you can keep editing."}</p>
        </div>
        <div>
          <span className="footer-label">{zh ? "開始" : "START"}</span>
          <Link href="/docs/getting-started">{zh ? "快速開始" : "Quick start"}</Link>
          <Link href="/docs/folder-contract">{zh ? "資料夾規範" : "Folder contract"}</Link>
          <Link href="/docs/templates">{zh ? "模板" : "Templates"}</Link>
        </div>
        <div>
          <span className="footer-label">{zh ? "輸出" : "OUTPUT"}</span>
          <Link href="/docs/overleaf">{zh ? "Overleaf 上傳" : "Overleaf upload"}</Link>
          <Link href="/docs/troubleshooting">{zh ? "疑難排解" : "Troubleshooting"}</Link>
          <Link href="/docs">{zh ? "所有文件" : "All documentation"}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{zh ? "為 AGENT 工作流程而生" : "BUILT FOR AGENT WORKFLOWS"}</span>
        <a href="#top">{zh ? "回到頂端 ↑" : "BACK TO TOP ↑"}</a>
      </div>
    </footer>
  );
}
