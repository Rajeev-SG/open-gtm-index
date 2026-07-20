import { Link } from "@tanstack/react-router"
import { useMemo, useState } from "react"

import { categories, formatNumber, rankedTools, type ToolRecord } from "../data"
import { Icon } from "./icons"
import { ToolMark } from "./ToolMark"

type SortKey = "rank" | "name" | "category" | "score" | "stars" | "licence"

export function RankingsExplorer({ initialTools = rankedTools }: { initialTools?: ToolRecord[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [licence, setLicence] = useState("all")
  const [sort, setSort] = useState<SortKey>("rank")

  const licences = useMemo(() => [...new Set(initialTools.map((tool) => tool.licence))].sort(), [initialTools])
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return initialTools.filter((tool) => {
      const matchesText = !needle || [tool.name, tool.category, tool.description, tool.replaces.join(" ")].join(" ").toLowerCase().includes(needle)
      return matchesText && (category === "all" || tool.categorySlug === category) && (licence === "all" || tool.licence === licence)
    }).sort((a, b) => {
      if (sort === "rank") return (a.rank ?? 999) - (b.rank ?? 999)
      if (sort === "score") return b.score - a.score
      if (sort === "stars") return b.stars - a.stars
      return a[sort].localeCompare(b[sort])
    })
  }, [initialTools, query, category, licence, sort])

  return (
    <>
      <div className="filter-panel" aria-label="Ranking filters">
        <label className="search-field"><span>Search projects or replacements</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘Salesforce’ or ‘analytics’" /></label>
        <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label>
        <label><span>Licence</span><select value={licence} onChange={(event) => setLicence(event.target.value)}><option value="all">All licences</option>{licences.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <label><span>Order</span><select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="rank">Overall rank</option><option value="score">Score, high to low</option><option value="stars">Stars, high to low</option><option value="name">Project name</option><option value="category">Category</option><option value="licence">Licence</option></select></label>
      </div>
      <div className="results-summary" aria-live="polite"><strong>{visible.length}</strong> of {initialTools.length} ranked projects shown <button type="button" onClick={() => { setQuery(""); setCategory("all"); setLicence("all"); setSort("rank") }}>Clear filters</button></div>
      <div className="rankings-table-wrap">
        <table className="rankings-table">
          <thead><tr><th>Rank</th><th>Project</th><th>Category</th><th>Score</th><th>Stars</th><th>Licence</th><th>Replaces</th><th><span className="sr-only">Open</span></th></tr></thead>
          <tbody>{visible.map((tool) => <ToolRow tool={tool} key={tool.slug} />)}</tbody>
        </table>
      </div>
      <div className="ranking-cards">{visible.map((tool) => <ToolCard tool={tool} key={tool.slug} />)}</div>
      {visible.length === 0 && <div className="empty-state"><h2>No projects match those filters</h2><p>Try a broader category or clear the search.</p></div>}
    </>
  )
}

function ToolRow({ tool }: { tool: ToolRecord }) {
  return <tr><td>{tool.rank}</td><td><Link className="tool-cell" to="/tools/$slug" params={{ slug: tool.slug }}><ToolMark name={tool.name} /><span><strong>{tool.name}</strong><small>{tool.description}</small></span></Link></td><td><Link to="/categories/$slug" params={{ slug: tool.categorySlug }}>{tool.category}</Link></td><td className="score-cell">{tool.score.toFixed(1)}</td><td>{formatNumber(tool.stars)}</td><td><span className="licence-tag">{tool.licence}</span></td><td>{tool.replaces.join(", ") || "—"}</td><td><Link className="row-arrow" to="/tools/$slug" params={{ slug: tool.slug }} aria-label={`View ${tool.name}`}><Icon name="arrow" /></Link></td></tr>
}

function ToolCard({ tool }: { tool: ToolRecord }) {
  return <article className="ranking-card"><div className="ranking-card-head"><span className="rank-number">{tool.rank}</span><ToolMark name={tool.name} /><div><h2><Link to="/tools/$slug" params={{ slug: tool.slug }}>{tool.name}</Link></h2><p>{tool.category}</p></div><strong>{tool.score.toFixed(1)}</strong></div><p>{tool.description}</p><dl><div><dt>Stars</dt><dd>{formatNumber(tool.stars)}</dd></div><div><dt>Licence</dt><dd>{tool.licence}</dd></div><div><dt>Replaces</dt><dd>{tool.replaces.join(", ") || "—"}</dd></div></dl><Link className="card-link" to="/tools/$slug" params={{ slug: tool.slug }}>View evidence <Icon name="arrow" /></Link></article>
}
