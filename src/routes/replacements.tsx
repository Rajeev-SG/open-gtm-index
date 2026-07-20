import { createFileRoute, Link } from "@tanstack/react-router"
import { useMemo, useState } from "react"

import { AppShell } from "../components/AppShell"
import { Icon } from "../components/icons"
import { PageIntro } from "../components/PageIntro"
import { getTool, replacements } from "../data"

export const Route = createFileRoute("/replacements")({ head: () => ({ meta: [{ title: "Open-source replacements — Open GTM Index" }, { name: "description", content: "Explore 27 researched mappings from commercial software to open-source starting points." }] }), component: ReplacementsPage })

function ReplacementsPage() {
  const [query, setQuery] = useState("")
  const visible = useMemo(() => {
    const needle = query.toLowerCase().trim()
    return replacements.filter((item) => !needle || [item.commercialProduct, ...item.openSourceOptions, ...item.categories].join(" ").toLowerCase().includes(needle))
  }, [query])
  return <AppShell><main><PageIntro eyebrow="27 researched mappings" title="Find an open-source starting point."><p>These mappings connect familiar commercial products to projects in the index. They are comparison starting points, not claims of exact feature parity.</p></PageIntro><section className="data-section"><label className="replacement-search"><span>Search a commercial product or category</span><input type="search" placeholder="Try ‘HubSpot’, ‘Intercom’, or ‘email’" value={query} onChange={(event) => setQuery(event.target.value)} /></label><p className="results-summary"><strong>{visible.length}</strong> replacement mappings shown</p><div className="replacement-list">{visible.map((item) => <article className="replacement-row" key={item.slug}><div><span className="card-kicker">Replace</span><h2>{item.commercialProduct}</h2><p>{item.categories.join(" · ")}</p></div><div className="replacement-arrow"><Icon name="arrow" /></div><div><span className="card-kicker">Consider</span><div className="option-links">{item.openSourceOptions.map((name) => { const tool = getTool(name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")); return tool ? <Link key={name} to="/tools/$slug" params={{ slug: tool.slug }}>{name}</Link> : <span key={name}>{name}</span> })}</div><p><strong>Start with:</strong> {item.bestStartingPoint}</p><p className="limitation"><strong>Check first:</strong> {item.limitation}</p></div></article>)}</div>{visible.length === 0 && <div className="empty-state"><h2>No mapping found</h2><p>Try another product name or <Link to="/contribute">suggest a mapping</Link>.</p></div>}</section></main></AppShell>
}
