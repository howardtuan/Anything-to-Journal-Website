"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HomeDemo } from "./components/HomeDemo";
import { InstallSwitcher } from "./components/InstallSwitcher";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { WorkspaceShowcase } from "./components/WorkspaceShowcase";
import { homeCopy, type HomeLanguage } from "./homeCopy";

export default function Home() {
  const [language, setLanguage] = useState<HomeLanguage>("en");
  const copy = homeCopy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("atj-language");
    const nextLanguage: HomeLanguage = saved === "zh-TW" ? "zh-TW" : "en";
    document.documentElement.lang = nextLanguage;
    const frame = window.requestAnimationFrame(() => setLanguage(nextLanguage));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleLanguage() {
    const nextLanguage: HomeLanguage = language === "en" ? "zh-TW" : "en";
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("atj-language", nextLanguage);
  }

  return (
    <main id="top">
      <SiteHeader language={language} onLanguageToggle={toggleLanguage} />

      <section className="hero shell-grid">
        <div className="rail-label rail-left" aria-hidden="true">{copy.hero.leftRail}</div>
        <div className="hero-inner">
          <div className="hero-kicker reveal-1"><span className="signal-dot" />{copy.hero.kicker}</div>
          <h1 className="hero-title reveal-2">
            {copy.hero.titleFirst}<br /><span>{copy.hero.titleJournal}</span> {copy.hero.titleEnd}
          </h1>
          <div className="hero-bottom reveal-3">
            <p>{copy.hero.body}</p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/docs/getting-started">{copy.hero.primary} <span>↗</span></Link>
              <Link className="text-link" href="/docs">{copy.hero.secondary} <span>→</span></Link>
            </div>
          </div>
          <div className="proof-marks" aria-hidden="true"><span>01</span><i /><span>{copy.hero.proof}</span></div>
        </div>
        <div className="rail-label rail-right" aria-hidden="true">{copy.hero.rightRail}</div>
      </section>

      <section className="install-section section-rule" id="install">
        <div className="section-heading">
          <span className="section-index">{copy.install.index}</span>
          <div><h2>{copy.install.title}</h2><p>{copy.install.intro}</p></div>
        </div>
        <InstallSwitcher language={language} />
        <p className="install-note">{copy.install.note} <code>~/.codex/skills/anything-to-journal</code>.</p>
      </section>

      <section className="demo-section section-rule">
        <div className="section-heading">
          <span className="section-index">{copy.demo.index}</span>
          <div><h2>{copy.demo.title}</h2><p>{copy.demo.intro}</p></div>
        </div>
        <HomeDemo language={language} />
      </section>

      <section className="workflow-section section-rule" id="workflow">
        <div className="section-heading">
          <span className="section-index">{copy.workflow.index}</span>
          <div><h2>{copy.workflow.title}</h2><p>{copy.workflow.intro}</p></div>
        </div>
        <div className="workflow-grid">
          {copy.workflow.steps.map((step) => (
            <article className="workflow-card" key={step.number}>
              <div className="workflow-meta"><span>{step.number}</span><span>{step.label}</span></div>
              <div className="workflow-mark" aria-hidden="true"><span /></div>
              <h3>{step.title}</h3><p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="decision-section section-rule" id="templates">
        <div className="decision-intro">
          <span className="section-index">{copy.decision.index}</span>
          <h2>{copy.decision.titleBefore}<br />{copy.decision.titleMiddle} <em>{copy.decision.titleAccent}</em></h2>
          <p>{copy.decision.intro}</p>
        </div>
        <div className="decision-cards">
          <article>
            <span className="card-letter">A</span><span className="chip">{copy.decision.draftChip}</span>
            <h3>{copy.decision.draftTitle}</h3><p>{copy.decision.draftBody}</p>
            <ul>{copy.decision.draftItems.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link href="/docs/templates">{copy.decision.draftLink}</Link>
          </article>
          <article className="accent-card">
            <span className="card-letter">B</span><span className="chip">{copy.decision.templateChip}</span>
            <h3>{copy.decision.templateTitle}</h3><p>{copy.decision.templateBody}</p>
            <ul>{copy.decision.templateItems.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link href="/docs/templates">{copy.decision.templateLink}</Link>
          </article>
        </div>
      </section>

      <section className="output-section section-rule" id="output">
        <div className="output-copy">
          <span className="section-index">{copy.output.index}</span><h2>{copy.output.title}</h2><p>{copy.output.intro}</p>
          <div className="output-facts">
            {copy.output.facts.map((fact, index) => <div key={fact}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{fact}</span></div>)}
          </div>
        </div>
        <div className="output-anatomy">
          <div className="anatomy-bar"><span>{copy.output.bar}</span><span className="status-chip">{copy.output.editable}</span></div>
          <div className="anatomy-tree" role="img" aria-label={copy.output.treeLabel}>
            <div className="tree-root"><span>▰</span> journal-output/</div>
            <div><i /> <span>▤</span> manuscript/manuscript.tex</div>
            <div><i /> <span>▤</span> reports/quality-report.md</div>
            <div><i /> <span>▰</span> submission/</div>
            <div className="nested"><i /> <span>▧</span> <strong>overleaf-upload.zip</strong><em>UPLOAD</em></div>
            <div className="nested"><i /> <span>▰</span> overleaf-upload/</div>
            <div className="nested"><i /> <span>▤</span> <strong>main.tex</strong><em>ROOT</em></div>
            <div className="nested"><i /> <span>▤</span> references.bib</div>
            <div className="nested"><i /> <span>▤</span> README_OVERLEAF.md</div>
            <div className="nested"><i /> <span>▤</span> manuscript.pdf</div>
          </div>
          <div className="anatomy-callout"><span>{copy.output.overleafRoute}</span><strong>{copy.output.overleafAction}</strong><p>{copy.output.overleafBody}</p></div>
        </div>
      </section>

      <section className="workspace-section section-rule" id="workspace">
        <div className="workspace-intro">
          <span className="section-index">{copy.workspace.index}</span>
          <h2>{copy.workspace.title}</h2><p>{copy.workspace.intro}</p>
          <ul className="workspace-points">{copy.workspace.points.map((point) => <li key={point}>{point}</li>)}</ul>
          <div className="workspace-routes"><span>{copy.workspace.chat}</span><span>{copy.workspace.browser}</span></div>
          <p className="workspace-local-note"><span className="green-dot" />{copy.workspace.localOnly}</p>
        </div>
        <WorkspaceShowcase language={language} />
      </section>

      <section className="overleaf-band">
        <div><span className="section-index">{copy.overleaf.index}</span><h2>{copy.overleaf.titleFirst}<br />{copy.overleaf.titleSecond}</h2></div>
        <div className="overleaf-steps">{copy.overleaf.steps.map((step, index) => <div key={step}><span>{index + 1}</span><p>{step}</p></div>)}</div>
        <Link className="button button-light" href="/docs/overleaf">{copy.overleaf.button} <span>↗</span></Link>
      </section>

      <section className="faq-section section-rule" id="faq">
        <div className="faq-heading"><span className="section-index">{copy.faq.index}</span><h2>{copy.faq.title}</h2></div>
        <div className="faq-list">
          {copy.faq.items.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{faq.question}</strong><i aria-hidden="true">+</i></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span className="section-index">{copy.cta.index}</span>
        <h2>{copy.cta.titleFirst}<br />{copy.cta.titleSecond} <em>{copy.cta.titleAccent}</em></h2>
        <div><p>{copy.cta.body}</p><Link className="button button-red" href="/docs/getting-started">{copy.cta.button} <span>↗</span></Link></div>
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
