import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="eyebrow">ANYTHING-TO-JOURNAL / 2026</span>
          <p>Source material becomes a manuscript you can keep editing.</p>
        </div>
        <div>
          <span className="footer-label">START</span>
          <Link href="/docs/getting-started">Quick start</Link>
          <Link href="/docs/folder-contract">Folder contract</Link>
          <Link href="/docs/templates">Templates</Link>
        </div>
        <div>
          <span className="footer-label">OUTPUT</span>
          <Link href="/docs/overleaf">Overleaf upload</Link>
          <Link href="/docs/troubleshooting">Troubleshooting</Link>
          <Link href="/docs">All documentation</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>BUILT FOR AGENT WORKFLOWS</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
