"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type SiteHeaderProps = {
  docs?: boolean;
  minimal?: boolean;
  onSearch?: () => void;
};

const githubUrl = "https://github.com/howardtuan/Anything-to-Journal";
const githubLabel = "View Anything-to-Journal on GitHub (opens in a new tab)";

export function SiteHeader({ docs = false, minimal = false, onSearch }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const zh = language === "zh-TW";

  useEffect(() => {
    const saved = window.localStorage.getItem("atj-theme");
    const wantsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextDark = saved ? saved === "dark" : wantsDark;
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    const frame = window.requestAnimationFrame(() => setDark(nextDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    window.localStorage.setItem("atj-theme", nextDark ? "dark" : "light");
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label={zh ? "Anything-to-Journal 首頁" : "Anything-to-Journal home"}>
          <span className="brand-mark" aria-hidden="true">
            <Image src="/brand-mark.svg" alt="" width={28} height={28} priority />
          </span>
          <span className="brand-word">anything-to-journal</span>
        </Link>

        <nav className="desktop-nav" aria-label={zh ? "主要導覽" : "Primary navigation"}>
          {docs ? (
            <>
              <button className="search-trigger" type="button" onClick={onSearch}>
                <span>{zh ? "搜尋文件" : "Search docs"}</span>
                <kbd>⌘ K</kbd>
              </button>
              <Link href="/">{zh ? "首頁" : "Home"}</Link>
            </>
          ) : minimal ? (
            <>
              <Link href="/">{zh ? "首頁" : "Home"}</Link>
              <Link href="/docs">{zh ? "文件" : "Docs"}</Link>
            </>
          ) : (
            <>
              <a href="#workflow">{zh ? "流程" : "Workflow"}</a>
              <a href="#workspace">{zh ? "論文工作區" : "Workspace"}</a>
              <a href="#output">{zh ? "輸出" : "Output"}</a>
              <a href="#faq">{zh ? "問答" : "FAQ"}</a>
              <Link href="/docs">{zh ? "文件" : "Docs"}</Link>
            </>
          )}
          <a
            className="github-link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={zh ? "在 GitHub 查看 Anything-to-Journal（開啟新分頁）" : githubLabel}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <button
            className="language-button"
            type="button"
            onClick={toggleLanguage}
            aria-label={zh ? "Switch website to English" : "將網站切換為繁體中文"}
            title={zh ? "Switch to English" : "切換為繁體中文"}
          >
            {zh ? "EN" : "中文"}
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? (zh ? "使用淺色模式" : "Use light theme") : (zh ? "使用深色模式" : "Use dark theme")}
            title={dark ? (zh ? "使用淺色模式" : "Use light theme") : (zh ? "使用深色模式" : "Use dark theme")}
          >
            <span aria-hidden="true">{dark ? "☼" : "◐"}</span>
          </button>
          {!docs && !minimal && (
            <Link className="nav-cta" href="/docs/getting-started">
              {zh ? "開始使用" : "Get started"} <span aria-hidden="true">↗</span>
            </Link>
          )}
        </nav>

        <div className="mobile-actions">
          {docs && (
            <button
              className="icon-button"
              type="button"
              onClick={onSearch}
              aria-label={zh ? "搜尋文件" : "Search documentation"}
            >
              ⌕
            </button>
          )}
          <button
            className="language-button"
            type="button"
            onClick={toggleLanguage}
            aria-label={zh ? "Switch website to English" : "將網站切換為繁體中文"}
          >
            {zh ? "EN" : "中文"}
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? (zh ? "使用淺色模式" : "Use light theme") : (zh ? "使用深色模式" : "Use dark theme")}
          >
            {dark ? "☼" : "◐"}
          </button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-label={zh ? "切換導覽選單" : "Toggle navigation"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label={zh ? "行動版導覽" : "Mobile navigation"}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            {zh ? "首頁" : "Home"}
          </Link>
          <Link href="/docs" onClick={() => setMenuOpen(false)}>
            {zh ? "文件" : "Documentation"}
          </Link>
          <Link href="/docs/getting-started" onClick={() => setMenuOpen(false)}>
            {zh ? "開始使用" : "Getting started"}
          </Link>
          <Link href="/docs/overleaf" onClick={() => setMenuOpen(false)}>
            {zh ? "Overleaf 上傳" : "Overleaf upload"}
          </Link>
          {!docs && !minimal && (
            <a href="#workspace" onClick={() => setMenuOpen(false)}>
              {zh ? "論文工作區" : "Manuscript workspace"}
            </a>
          )}
          {!docs && !minimal && (
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              {zh ? "常見問題" : "FAQ"}
            </a>
          )}
          <a
            className="github-link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={zh ? "在 GitHub 查看 Anything-to-Journal（開啟新分頁）" : githubLabel}
            onClick={() => setMenuOpen(false)}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      )}
    </header>
  );
}
