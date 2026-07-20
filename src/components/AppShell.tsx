import { Link } from "@tanstack/react-router"
import { useEffect, useState, type ReactNode } from "react"

import { Icon, IconSprite } from "./icons"

const navigation = [
  ["Rankings", "/rankings"],
  ["Replacements", "/replacements"],
  ["Methodology", "/methodology"],
  ["Data", "/data"],
] as const

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.toggleAttribute("data-menu-open", menuOpen)
    return () => document.body.removeAttribute("data-menu-open")
  }, [menuOpen])

  return (
    <>
      <IconSprite />
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Open GTM Index home" onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span>Open GTM Index</span>
        </Link>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <nav className="site-nav" id="site-nav" aria-label="Primary navigation" data-open={menuOpen || undefined}>
          {navigation.map(([label, to]) => <Link key={to} to={to} activeProps={{ "aria-current": "page" }} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          <a className="github-link" href="https://github.com/Rajeev-SG/open-gtm-index" rel="noreferrer">
            <Icon name="github" /> GitHub
          </a>
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <div>
          <Link className="footer-brand" to="/"><BrandMark /> <span>Open GTM Index</span></Link>
          <p>Public evidence for choosing software you can inspect, self-host, and improve.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/contribute">Contribute</Link>
          <Link to="/changelog">Changelog</Link>
          <a href="https://github.com/Rajeev-SG/open-gtm-index">Repository</a>
        </nav>
        <p className="footer-meta">Data: CC BY 4.0 · Code: MIT<br />Snapshot checked 20 July 2026</p>
      </footer>
    </>
  )
}

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
}
