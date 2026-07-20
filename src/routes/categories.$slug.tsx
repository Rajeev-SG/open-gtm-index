import { Link, createFileRoute, notFound } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { PageIntro } from "../components/PageIntro"
import { RankingsExplorer } from "../components/RankingsExplorer"
import { getCategory, getCategoryTools } from "../data"

export const Route = createFileRoute("/categories/$slug")({ loader: ({ params }) => { const category = getCategory(params.slug); if (!category) throw notFound(); return { category } }, head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.category.name} — Open GTM Index` }, { name: "description", content: loaderData?.category.description }] }), component: CategoryPage })

function CategoryPage() {
  const { category } = Route.useLoaderData()
  const tools = getCategoryTools(category.name)
  const eligible = tools.filter((tool) => tool.eligible)
  return <AppShell><main><PageIntro eyebrow={`Category · ${category.marketState}`} title={category.name}><p>{category.description}</p>{category.leaderScore !== null ? <p className="intro-note">Current leader: <strong>{category.leader}</strong> with {category.leaderScore.toFixed(1)} points · {eligible.length} eligible projects</p> : <p className="intro-note">No project currently passes the licence gate in this category.</p>}</PageIntro><section className="data-section">{eligible.length > 0 ? <RankingsExplorer initialTools={eligible} /> : <div className="empty-state"><h2>No ranked project yet</h2><p>The researched project is recorded on the <Link to="/watchlist">watchlist</Link> while its licence remains unclear.</p></div>}{tools.some((tool) => !tool.eligible) && <p className="category-watch-note">This category also has {tools.filter((tool) => !tool.eligible).length} reviewed project on the <Link to="/watchlist">watchlist</Link>.</p>}</section></main></AppShell>
}
