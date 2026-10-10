"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cancelHomeAnchorRestoration, HomeAnchor, restoreHomeAnchorFromHistory } from "./HomeAnchor";
import { useLanguage } from "./LanguageProvider";

type SiteHeaderProps = {
  docs?: boolean;
  minimal?: boolean;
  onSearch?: () => void;
};

const homeSections = [
  { id: "workflow", en: "Workflow", zh: "流程" },
  { id: "workspace", en: "Workspace", zh: "論文工作區" },
  { id: "output", en: "Output", zh: "輸出" },
  { id: "faq", en: "FAQ", zh: "問答" },
] as const;

const githubUrl = "https://github.com/howardtuan/Anything-to-Journal";
const githubLabel = "View Anything-to-Journal on GitHub (opens in a new tab)";

export function SiteHeader({ docs = false, minimal = false, onSearch }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = !docs && !minimal;
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

  // Scrollspy never writes history. Link keeps anchor entries in the router history.
  useEffect(() => {
    if (!home) return;
    let frame = 0;
    function updateSection() {
      frame = 0;
      const readingLine = (headerRef.current?.offsetHeight ?? 68) + 28;
      let current: string | null = null;
      for (const section of homeSections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= readingLine) {
          current = section.id;
        }
      }
      setActiveSection(current);
    }
    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    }
    function restoreHistoryAnchor() {
      scheduleUpdate();
      restoreHomeAnchorFromHistory();
    }
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("popstate", restoreHistoryAnchor);
    const observer = new ResizeObserver(scheduleUpdate);
    const main = document.getElementById("top");
    if (main) observer.observe(main);
    scheduleUpdate();
    return () => {
      window.cancelAnimationFrame(frame);
      cancelHomeAnchorRestoration();
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("popstate", restoreHistoryAnchor);
    };
  }, [home]);

  useEffect(() => {
    if (!menuOpen) return;
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus({ preventScroll: true });
    }
    function onOutsideClick(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 861px)");
    function onDesktop() {
      if (desktop.matches) setMenuOpen(false);
    }
    window.addEventListener("keydown", onEscape);
    window.addEventListener("pointerdown", onOutsideClick);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("pointerdown", onOutsideClick);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    window.localStorage.setItem("atj-theme", nextDark ? "dark" : "light");
  }

  return (
    <header className="site-header" ref={headerRef}>
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
              {homeSections.map((section) => (
                <HomeAnchor key={section.id} section={section.id} aria-current={activeSection === section.id ? "location" : undefined}>
                  {zh ? section.zh : section.en}
                </HomeAnchor>
              ))}
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
            ref={menuButton}
            type="button"
            aria-controls={menuOpen ? "mobile-navigation" : undefined}
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
        <nav id="mobile-navigation" className="mobile-nav" aria-label={zh ? "行動版導覽" : "Mobile navigation"}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            {zh ? "首頁" : "Home"}
          </Link>
          {home && homeSections.map((section) => (
            <HomeAnchor key={section.id} section={section.id} aria-current={activeSection === section.id ? "location" : undefined} onClick={() => setMenuOpen(false)}>
              {zh ? section.zh : section.en}
            </HomeAnchor>
          ))}
          <Link href="/docs" onClick={() => setMenuOpen(false)}>
            {zh ? "文件" : "Documentation"}
          </Link>
          <Link href="/docs/getting-started" onClick={() => setMenuOpen(false)}>
            {zh ? "開始使用" : "Getting started"}
          </Link>
          <Link href="/docs/overleaf" onClick={() => setMenuOpen(false)}>
            {zh ? "Overleaf 上傳" : "Overleaf upload"}
          </Link>
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
