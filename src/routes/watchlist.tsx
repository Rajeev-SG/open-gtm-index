import { createFileRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { PageIntro } from "../components/PageIntro"
import { ScoreBreakdown } from "../components/ScoreBreakdown"
import { ToolMark } from "../components/ToolMark"
import { formatNumber, watchlistTools } from "../data"

export const Route = createFileRoute("/watchlist")({ head: () => ({ meta: [{ title: "Licence watchlist — Open GTM Index" }, { name: "description", content: "Reviewed projects that remain visible but unranked because their licence is restricted or unclear." }] }), component: WatchlistPage })

function WatchlistPage() {
  return <AppShell><main><PageIntro eyebrow="3 projects · not ranked" title="Visible, reviewed, but outside the ranking."><p>A project stays on this list when its code can be inspected but its licence adds restrictions or cannot be verified. The score is shown for audit purposes only.</p></PageIntro><section className="data-section watchlist-grid">{watchlistTools.map((tool) => <article className="watchlist-card" key={tool.slug}><div className="watchlist-title"><ToolMark name={tool.name} /><div><p className="card-kicker">{tool.recommendation}</p><h2>{tool.name}</h2><p>{tool.category}</p></div><strong>{tool.score.toFixed(1)}<small>unranked</small></strong></div><p>{tool.description}</p><dl className="facts-inline"><div><dt>Stars</dt><dd>{formatNumber(tool.stars)}</dd></div><div><dt>Licence found</dt><dd>{tool.licence}</dd></div><div><dt>Review result</dt><dd>{tool.licenceMeaning}</dd></div></dl><ScoreBreakdown components={tool.components} compact /><div className="card-actions"><a href={tool.github}>Repository</a><a href={`https://github.com/Rajeev-SG/open-gtm-index/issues/new?title=${encodeURIComponent(`Licence evidence for ${tool.name}`)}`}>Submit licence evidence</a></div></article>)}</section></main></AppShell>
}
