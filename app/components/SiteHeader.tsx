"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SiteHeaderProps = {
  docs?: boolean;
  onSearch?: () => void;
};

export function SiteHeader({ docs = false, onSearch }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

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
        <Link className="brand" href="/" aria-label="Anything-to-Journal home">
          <span className="brand-mark" aria-hidden="true">
            <span>J</span>
          </span>
          <span className="brand-word">anything-to-journal</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {docs ? (
            <>
              <button className="search-trigger" type="button" onClick={onSearch}>
                <span>Search docs</span>
                <kbd>⌘ K</kbd>
              </button>
              <Link href="/">Home</Link>
            </>
          ) : (
            <>
              <a href="#workflow">Workflow</a>
              <a href="#output">Output</a>
              <a href="#faq">FAQ</a>
              <Link href="/docs">Docs</Link>
            </>
          )}
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
            title={dark ? "Use light theme" : "Use dark theme"}
          >
            <span aria-hidden="true">{dark ? "☼" : "◐"}</span>
          </button>
          {!docs && (
            <Link className="nav-cta" href="/docs/getting-started">
              Get started <span aria-hidden="true">↗</span>
            </Link>
          )}
        </nav>

        <div className="mobile-actions">
          {docs && (
            <button
              className="icon-button"
              type="button"
              onClick={onSearch}
              aria-label="Search documentation"
            >
              ⌕
            </button>
          )}
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? "☼" : "◐"}
          </button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/docs" onClick={() => setMenuOpen(false)}>
            Documentation
          </Link>
          <Link href="/docs/getting-started" onClick={() => setMenuOpen(false)}>
            Getting started
          </Link>
          <Link href="/docs/overleaf" onClick={() => setMenuOpen(false)}>
            Overleaf upload
          </Link>
          {!docs && (
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              FAQ
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
