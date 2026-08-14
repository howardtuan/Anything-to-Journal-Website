"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { docsGroups, docsPages, pageForPath } from "./docsData";

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const current = pageForPath(pathname);
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

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return docsPages;
    return docsPages.filter((page) =>
      [page.title, page.description, page.group, ...page.keywords, ...page.headings.map((h) => h.label)]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <div className="docs-site">
      <SiteHeader docs onSearch={() => setSearchOpen(true)} />

      <div className="docs-frame">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <div className="sidebar-version">
            <span>DOCUMENTATION</span>
            <em>v1.0</em>
          </div>
          {docsGroups.map((group) => (
            <div className="sidebar-group" key={group}>
              <span>{group}</span>
              {docsPages
                .filter((page) => page.group === group)
                .map((page) => (
                  <Link
                    className={pathname === page.href ? "active" : ""}
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
            <p>One source folder.<br />One editable manuscript.</p>
          </div>
        </aside>

        <div className="docs-content-wrap">
          <details className="docs-mobile-menu">
            <summary>
              <span>{current.index} / {current.title}</span>
              <i>Browse docs</i>
            </summary>
            <nav>
              {docsPages.map((page) => (
                <Link href={page.href} key={page.href}>{page.title}</Link>
              ))}
            </nav>
          </details>
          {children}
        </div>

        <aside className="docs-toc" aria-label="On this page">
          <span>ON THIS PAGE</span>
          {current.headings.map((heading) => (
            <a href={`#${heading.id}`} key={heading.id}>{heading.label}</a>
          ))}
          <div className="toc-rule" />
          <Link href="/docs/troubleshooting">Need help? ↗</Link>
        </aside>
      </div>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search documentation">
          <button className="search-backdrop" type="button" onClick={closeSearch} aria-label="Close search" />
          <div className="search-modal">
            <div className="search-input-wrap">
              <span aria-hidden="true">⌕</span>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documentation…"
                aria-label="Search documentation"
              />
              <kbd>ESC</kbd>
            </div>
            <div className="search-results">
              <span className="search-label">{query ? `${results.length} RESULTS` : "QUICK LINKS"}</span>
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
                <div className="search-empty">No matching guide. Try “Overleaf”, “template”, or “folder”.</div>
              )}
            </div>
            <div className="search-footer">
              <span>↑↓ NAVIGATE</span>
              <span>↵ OPEN</span>
              <span>ESC CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
