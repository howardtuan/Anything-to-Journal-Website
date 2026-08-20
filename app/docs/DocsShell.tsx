"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { SiteHeader } from "../components/SiteHeader";
import { docsGroupsFor, docsPagesFor, pageForPath } from "./docsData";

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const zh = language === "zh-TW";
  const docsPages = useMemo(() => docsPagesFor(language), [language]);
  const docsGroups = useMemo(() => docsGroupsFor(language), [language]);
  const current = pageForPath(pathname, language);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => searchRef.current?.focus(), 40);
  }, [searchOpen]);

  useEffect(() => {
    document.title = `${current.title} — Anything-to-Journal`;
  }, [current.title]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return docsPages;
    return docsPages.filter((page) =>
      [page.title, page.description, page.group, ...page.keywords, ...page.headings.map((h) => h.label)]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [docsPages, query]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <div className="docs-site">
      <SiteHeader docs onSearch={() => setSearchOpen(true)} />

      <div className="docs-frame">
        <aside className="docs-sidebar" aria-label={zh ? "文件導覽" : "Documentation navigation"}>
          <div className="sidebar-version">
            <span>{zh ? "文件" : "DOCUMENTATION"}</span>
            <em>v1.0</em>
          </div>
          {docsGroups.map((group) => (
            <div className="sidebar-group" key={group}>
              <span>{group}</span>
              {docsPages
                .filter((page) => page.group === group)
                .map((page) => (
                  <Link
                    className={current.href === page.href ? "active" : ""}
                    href={page.href}
                    key={page.href}
                  >
                    <i>{page.index}</i>
                    {page.title}
                  </Link>
                ))}
            </div>
          ))}
          <div className="sidebar-note">
            <span className="red-dot" />
            <p>{zh ? <>一個來源資料夾。<br />一份可編輯論文。</> : <>One source folder.<br />One editable manuscript.</>}</p>
          </div>
        </aside>

        <div className="docs-content-wrap">
          <details className="docs-mobile-menu">
            <summary>
              <span>{current.index} / {current.title}</span>
              <i>{zh ? "瀏覽文件" : "Browse docs"}</i>
            </summary>
            <nav>
              {docsPages.map((page) => (
                <Link href={page.href} key={page.href}>{page.title}</Link>
              ))}
            </nav>
          </details>
          {children}
        </div>

        <aside className="docs-toc" aria-label={zh ? "本頁內容" : "On this page"}>
          <span>{zh ? "本頁內容" : "ON THIS PAGE"}</span>
          {current.headings.map((heading) => (
            <a href={`#${heading.id}`} key={heading.id}>{heading.label}</a>
          ))}
          <div className="toc-rule" />
          <Link href="/docs/troubleshooting">{zh ? "需要協助？" : "Need help?"} ↗</Link>
        </aside>
      </div>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label={zh ? "搜尋文件" : "Search documentation"}>
          <button className="search-backdrop" type="button" onClick={closeSearch} aria-label={zh ? "關閉搜尋" : "Close search"} />
          <div className="search-modal">
            <div className="search-input-wrap">
              <span aria-hidden="true">⌕</span>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={zh ? "搜尋文件…" : "Search documentation…"}
                aria-label={zh ? "搜尋文件" : "Search documentation"}
              />
              <kbd>ESC</kbd>
            </div>
            <div className="search-results">
              <span className="search-label">{query ? (zh ? `${results.length} 筆結果` : `${results.length} RESULTS`) : (zh ? "快速連結" : "QUICK LINKS")}</span>
              {results.map((page) => (
                <Link href={page.href} key={page.href} onClick={closeSearch}>
                  <span className="result-index">{page.index}</span>
                  <span>
                    <strong>{page.title}</strong>
                    <small>{page.description}</small>
                  </span>
                  <i>↗</i>
                </Link>
              ))}
              {results.length === 0 && (
                <div className="search-empty">
                  {zh ? "找不到符合的指南。請嘗試「Overleaf」、「模板」或「資料夾」。" : "No matching guide. Try “Overleaf”, “template”, or “folder”."}
                </div>
              )}
            </div>
            <div className="search-footer">
              <span>↑↓ {zh ? "導覽" : "NAVIGATE"}</span>
              <span>↵ {zh ? "開啟" : "OPEN"}</span>
              <span>ESC {zh ? "關閉" : "CLOSE"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
