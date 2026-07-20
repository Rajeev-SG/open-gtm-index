import { Link, createFileRoute, notFound } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { Icon } from "../components/icons"
import { ScoreBreakdown } from "../components/ScoreBreakdown"
import { ToolMark } from "../components/ToolMark"
import { formatDate, formatNumber, getCategoryTools, getSourceForTool, getTool } from "../data"

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => { const tool = getTool(params.slug); if (!tool) throw notFound(); return { tool } },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.tool.name} evidence and score — Open GTM Index` }, { name: "description", content: loaderData?.tool.description }] }),
  component: ToolPage,
})

function ToolPage() {
  const { tool } = Route.useLoaderData()
  const source = getSourceForTool(tool.name)
  const related = getCategoryTools(tool.category).filter((item) => item.slug !== tool.slug && item.eligible).sort((a, b) => b.score - a.score).slice(0, 3)
  return <AppShell><main className="tool-page">
    <section className="tool-hero">
      <div className="tool-identity"><ToolMark name={tool.name} /><div><p className="eyebrow">{tool.eligible ? `Overall rank #${tool.rank} · Category rank #${tool.categoryRank}` : "Watchlist · Not ranked"}</p><h1>{tool.name}</h1><p>{tool.description}</p><div className="tool-links"><a className="button primary" href={tool.website}>Visit project</a><a className="button secondary" href={tool.github}><Icon name="github" /> Repository</a></div></div></div>
      <div className="score-seal"><span>{tool.eligible ? "Index score" : "Audit score"}</span><strong>{tool.score.toFixed(1)}</strong><small>out of 100 · method {tool.methodVersion}</small></div>
    </section>
    {!tool.eligible && <div className="licence-warning"><Icon name="shield" /><div><strong>This project is not ranked.</strong><p>{tool.licenceMeaning} Its component score is retained so the review can be audited.</p></div></div>}
    <section className="tool-layout">
      <div className="tool-main">
        <section className="evidence-section"><div className="section-heading"><div><p className="eyebrow">Scoring evidence</p><h2>How {tool.score.toFixed(1)} points were assigned</h2></div><Link to="/methodology">Method details <Icon name="arrow" /></Link></div><ScoreBreakdown components={tool.components} /><div className="evidence-notes"><article><h3>Deployment readiness · {tool.components.deployment}/15</h3><p>{tool.editorialEvidence.deployment}</p></article><article><h3>Practical GTM fit · {tool.components.gtmFit}/15</h3><p>{tool.editorialEvidence.gtmFit}</p></article><article><h3>Licence · {tool.components.licence}/10</h3><p>{tool.editorialEvidence.licence}</p></article></div></section>
        <section className="evidence-section"><p className="eyebrow">Repository evidence</p><h2>Facts used in this snapshot</h2><dl className="fact-grid"><div><dt>GitHub stars</dt><dd>{formatNumber(tool.stars)}</dd></div><div><dt>Forks</dt><dd>{formatNumber(tool.forks)}</dd></div><div><dt>Open issues</dt><dd>{formatNumber(tool.openIssues)}</dd></div><div><dt>Last push</dt><dd>{formatDate(tool.lastPush)}</dd></div><div><dt>Default branch</dt><dd>{tool.defaultBranch}</dd></div><div><dt>Licence</dt><dd>{tool.licence}</dd></div></dl>{source && <p className="source-line">Source: <a href={source.url}>{source.name} repository</a> · checked {formatDate(source.checked)}</p>}</section>
        <section className="evidence-section"><p className="eyebrow">Editorial review</p><h2>What the classification means</h2><div className="review-grid"><article><h3>{tool.maturity}</h3><p>Maturity label based on the project’s public repository footprint, recent activity, and practical readiness.</p></article><article><h3>{tool.recommendation}</h3><p>Recommendation for where this project belongs in an initial evaluation, not a purchasing guarantee.</p></article><article><h3>{tool.licenceModel}</h3><p>{tool.licenceMeaning}</p></article></div>{tool.topics.length > 0 && <div className="topics" aria-label="Repository topics">{tool.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>}</section>
      </div>
      <aside className="tool-sidebar"><div className="sidebar-box"><p className="eyebrow">At a glance</p><dl><div><dt>Category</dt><dd><Link to="/categories/$slug" params={{ slug: tool.categorySlug }}>{tool.category}</Link></dd></div><div><dt>Replaces</dt><dd>{tool.replaces.join(", ") || "No direct mapping"}</dd></div><div><dt>Licence</dt><dd>{tool.licence}</dd></div><div><dt>Checked</dt><dd>{formatDate(tool.checked)}</dd></div></dl></div><div className="sidebar-box correction-box"><h2>Found an error?</h2><p>Submit a source, correction, or revised assessment in public.</p><a href={`https://github.com/Rajeev-SG/open-gtm-index/issues/new?title=${encodeURIComponent(`Correction: ${tool.name}`)}`}>Propose a correction <Icon name="arrow" /></a></div></aside>
    </section>
    {related.length > 0 && <section className="related-section"><div className="section-heading"><div><p className="eyebrow">Same category</p><h2>Other projects to compare</h2></div></div><div className="related-grid">{related.map((item) => <Link to="/tools/$slug" params={{ slug: item.slug }} key={item.slug}><ToolMark name={item.name} /><span><strong>{item.name}</strong><small>{item.score.toFixed(1)} points</small></span><Icon name="arrow" /></Link>)}</div></section>}
  </main></AppShell>
}
