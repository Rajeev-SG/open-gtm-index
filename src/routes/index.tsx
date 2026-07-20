import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"

import { Icon, IconSprite } from "../components/icons"
import { categoryLeaders, rankingRows, scoreFactors, type RankingRow } from "../data"

export const Route = createFileRoute("/")({ component: IndexPage })

type SortKey = "rank" | "tool" | "category" | "score" | "stars" | "licence" | "replaces"

const evidenceItems = [
  { icon: "code" as const, title: "100% open data", text: "All inputs and sources are public." },
  { icon: "document" as const, title: "Evidence-backed", text: "Scores are based on an open scoring model." },
  { icon: "unlock" as const, title: "Verified open-source", text: "Only OSI-approved licences are ranked.", verified: true },
  { icon: "users" as const, title: "Community governed", text: "Pull requests and issues welcome." },
]

function IndexPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>({
    key: "rank",
    direction: "asc",
  })

  useEffect(() => {
    document.body.toggleAttribute("data-menu-open", menuOpen)
    return () => document.body.removeAttribute("data-menu-open")
  }, [menuOpen])

  const rows = useMemo(() => {
    return [...rankingRows].sort((left, right) => {
      const a = left[sort.key]
      const b = right[sort.key]
      const comparison =
        typeof a === "number" && typeof b === "number"
          ? a - b
          : String(a).localeCompare(String(b), undefined, { sensitivity: "base" })
      return sort.direction === "asc" ? comparison : -comparison
    })
  }, [sort])

  function changeSort(key: SortKey) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <IconSprite />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Open GTM Index home" onClick={closeMenu}>
          <BrandMark />
          <span>Open GTM Index</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          <Icon name="menu" className="menu-open" />
          <Icon name="close" className="menu-close" />
        </button>
        <nav className="site-nav" id="site-nav" aria-label="Primary navigation" data-open={menuOpen || undefined}>
          <a href="#rankings" onClick={closeMenu}>Rankings</a>
          <a href="#category-leaders" onClick={closeMenu}>Replacements</a>
          <a href="#method" onClick={closeMenu}>Scoring method</a>
          <a href="https://github.com/Rajeev-SG/open-gtm-index/issues" onClick={closeMenu}>Contribute</a>
          <a className="github-link" href="https://github.com/Rajeev-SG/open-gtm-index" rel="noreferrer">
            <Icon name="github" />
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-inner">
            <h1 id="page-title">Ranked tools you can<br />inspect, self-host, and improve.</h1>
            <p className="research-summary">
              <span>53 projects reviewed</span><b>·</b><span>50 ranked</span><b>·</b><span>13 categories</span><b>·</b><span>checked 20 July 2026</span>
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#rankings">Explore the rankings</a>
              <a className="button button-link" href="#method">Read the scoring method <Icon name="arrow" /></a>
            </div>
            <p className="trust-note">
              <Icon name="shield" />
              <span>Every score input and source is public. Projects with restricted or unclear<br className="desktop-only" /> licences are visible but not ranked.</span>
            </p>
          </div>
        </section>

        <section className="principles" aria-label="Open data principles">
          {evidenceItems.map((item) => (
            <article className={`principle${item.verified ? " principle-verified" : ""}`} key={item.title}>
              <Icon name={item.icon} />
              <div><h2>{item.title}</h2><p>{item.text}</p></div>
            </article>
          ))}
        </section>

        <section className="research-board" id="category-leaders" aria-labelledby="leaders-title">
          <h2 className="sr-only" id="leaders-title">Category leaders</h2>
          <div className="leader-grid">
            {categoryLeaders.map((item) => (
              <article className="leader-card" key={item.category}>
                <div className="leader-heading">
                  <span className="leader-icon"><Icon name={item.icon} /></span>
                  <h3>{item.category}</h3>
                </div>
                <p className="leader-name">#1&nbsp; {item.leader}</p>
                <p className="leader-score">{item.score.toFixed(1)}</p>
              </article>
            ))}
          </div>

          <div className="ranking-layout" id="rankings">
            <section className="rankings-panel" aria-labelledby="rankings-title">
              <h2 className="sr-only" id="rankings-title">Top-ranked projects</h2>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {(["rank", "tool", "category", "score", "stars", "licence", "replaces"] as SortKey[]).map((key) => (
                        <th scope="col" key={key} aria-sort={sort.key === key ? (sort.direction === "asc" ? "ascending" : "descending") : undefined}>
                          <button type="button" data-sort={key} onClick={() => changeSort(key)}>
                            {key[0].toUpperCase() + key.slice(1)} <Icon name="sort" />
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{rows.map((row) => <RankingTableRow row={row} key={row.tool} />)}</tbody>
                </table>
              </div>
            </section>

            <aside className="score-panel" id="method" aria-labelledby="method-title">
              <h2 id="method-title">How the score works</h2>
              <div className="score-factors">
                {scoreFactors.flatMap((factor, index) => [
                  ...(index > 0
                    ? [<i aria-hidden="true" key={`${factor.label}-separator`}>·</i>]
                    : []),
                  <span className="score-factor" key={factor.label}>
                    <Icon name={factor.icon} /><span>{factor.label}</span><strong>{factor.weight}</strong>
                  </span>,
                ])}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contribute">
        <p>Open data for clearer software decisions.</p>
        <a href="https://github.com/Rajeev-SG/open-gtm-index/issues/new">Suggest a project</a>
      </footer>
    </>
  )
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
}

function RankingTableRow({ row }: { row: RankingRow }) {
  return (
    <tr>
      <td data-label="Rank">{row.rank}</td>
      <td data-label="Tool">
        <a className="tool-link" href={`https://github.com/${row.tool === "Cal.com" ? "calcom/cal.com" : row.tool === "Chatwoot" ? "chatwoot/chatwoot" : "umami-software/umami"}`}>
          <ToolLogo type={row.logo} />{row.tool}
        </a>
      </td>
      <td data-label="Category">{row.category}</td>
      <td className="score-cell" data-label="Score">{row.score.toFixed(1)}</td>
      <td data-label="Stars">{row.stars.toLocaleString("en-GB")}</td>
      <td data-label="Licence"><span className="licence-tag">{row.licence}</span></td>
      <td data-label="Replaces">{row.replaces}</td>
    </tr>
  )
}

function ToolLogo({ type }: { type: RankingRow["logo"] }) {
  if (type === "cal") return <span className="tool-logo cal-logo">C</span>
  if (type === "chatwoot") return <span className="tool-logo chatwoot-logo" />
  return <span className="tool-logo umami-logo"><i /><i /><i /></span>
}
