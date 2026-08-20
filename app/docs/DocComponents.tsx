"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { CopyButton } from "../components/CopyButton";
import { useLanguage } from "../components/LanguageProvider";
import { docsPagesFor } from "./docsData";

export function ArticleFrame({ slug, children }: { slug: string; children: ReactNode }) {
  const { language } = useLanguage();
  const zh = language === "zh-TW";
  const docsPages = docsPagesFor(language);
  const page = docsPages.find((item) => item.href === (slug === "introduction" ? "/docs" : `/docs/${slug}`)) ?? docsPages[0];
  const pageIndex = docsPages.indexOf(page);
  const previous = docsPages[pageIndex - 1];
  const next = docsPages[pageIndex + 1];
  const outline = `# ${page.title}\n\n${page.description}\n\n${page.headings.map((heading) => `## ${heading.label}`).join("\n\n")}`;

  return (
    <article className="doc-article">
      <div className="doc-breadcrumb">
        <Link href="/docs">{zh ? "文件" : "DOCS"}</Link>
        <span>/</span>
        <span>{page.group.toUpperCase()}</span>
        <i>{page.index}</i>
      </div>
      <header className="doc-header">
        <div>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
        <CopyButton value={outline} label={zh ? "複製大綱" : "Copy outline"} copiedLabel={zh ? "已複製大綱" : "Outline copied"} />
      </header>
      <div className="doc-status-row">
        <span><i className="green-dot" /> {zh ? "已建立文件" : "DOCUMENTED"}</span>
        <span>{zh ? "更新於 2026 年 8 月" : "UPDATED AUG 2026"}</span>
      </div>

      <div className="doc-prose">{children}</div>

      <nav className="doc-pagination" aria-label={zh ? "文件頁面導覽" : "Documentation pagination"}>
        {previous ? (
          <Link href={previous.href}>
            <span>← {zh ? "上一篇" : "PREVIOUS"}</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : <span />}
        {next && (
          <Link href={next.href} className="next">
            <span>{zh ? "下一篇" : "NEXT"} →</span>
            <strong>{next.title}</strong>
          </Link>
        )}
      </nav>
    </article>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <section id={id} className="doc-section">
      <h2>{title}<a href={`#${id}`} aria-label={language === "zh-TW" ? `連結至「${title}」` : `Link to ${title}`}>#</a></h2>
      {children}
    </section>
  );
}

export function CodeBlock({ value, filename }: { value: string; filename?: string }) {
  const { language } = useLanguage();
  return (
    <div className="code-block">
      <div className="code-header">
        <span>{filename ?? (language === "zh-TW" ? "文字" : "TEXT")}</span>
        <CopyButton value={value} />
      </div>
      <pre><code>{value}</code></pre>
    </div>
  );
}

export function Callout({ type = "note", title, children }: { type?: "note" | "warning" | "success"; title: string; children: ReactNode }) {
  return (
    <aside className={`doc-callout ${type}`}>
      <span>{type === "warning" ? "!" : type === "success" ? "✓" : "i"}</span>
      <div><strong>{title}</strong><p>{children}</p></div>
    </aside>
  );
}
