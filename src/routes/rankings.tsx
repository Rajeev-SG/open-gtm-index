import { createFileRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { PageIntro } from "../components/PageIntro"
import { RankingsExplorer } from "../components/RankingsExplorer"
import { formatDate } from "../data"

export const Route = createFileRoute("/rankings")({ head: () => ({ meta: [{ title: "Complete rankings — Open GTM Index" }, { name: "description", content: "Search and filter all 50 ranked open-source go-to-market projects." }] }), component: RankingsPage })

function RankingsPage() {
  return <AppShell><main><PageIntro eyebrow="Complete ranking · 50 eligible projects" title="Compare every ranked project."><p>Search, filter, and inspect the evidence behind each score. Projects are ranked only when their licence meets the Open Source Initiative definition.</p><p className="intro-note">Snapshot checked {formatDate("2026-07-20")} · Method 1.0 · Tied scores share a rank</p></PageIntro><section className="data-section"><RankingsExplorer /></section></main></AppShell>
}
