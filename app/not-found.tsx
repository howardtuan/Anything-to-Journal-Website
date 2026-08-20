"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "./components/LanguageProvider";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  const { language } = useLanguage();
  const zh = language === "zh-TW";

  useEffect(() => {
    document.title = `${zh ? "找不到頁面" : "Page not found"} — Anything-to-Journal`;
  }, [zh]);

  return (
    <main className="not-found-site">
      <SiteHeader minimal />
      <section className="not-found-content">
        <span>404 / {zh ? "找不到頁面" : "PAGE NOT FOUND"}</span>
        <h1>{zh ? "這一頁不在論文裡。" : "This page is not in the manuscript."}</h1>
        <p>
          {zh
            ? "網址可能已變更，或你開啟了不存在的路徑。請回到首頁，或繼續閱讀文件。"
            : "The address may have changed, or the path does not exist. Return home or continue with the documentation."}
        </p>
        <div>
          <Link className="button button-red" href="/">{zh ? "回到首頁" : "Back home"} <span>↗</span></Link>
          <Link className="text-link" href="/docs">{zh ? "閱讀文件" : "Read the docs"} <span>→</span></Link>
        </div>
      </section>
    </main>
  );
}
