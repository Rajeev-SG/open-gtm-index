import { createFileRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { PageIntro } from "../components/PageIntro"

export const Route = createFileRoute("/changelog")({ head: () => ({ meta: [{ title: "Changelog — Open GTM Index" }, { name: "description", content: "A public record of material data, scoring, and method changes." }] }), component: ChangelogPage })

function ChangelogPage() {
  return <AppShell><main><PageIntro eyebrow="Publication history" title="What changed, and when."><p>Material data, scoring, and method changes are recorded here so readers can understand how the index develops.</p></PageIntro><section className="data-section changelog"><article><time dateTime="2026-07-20">20 July 2026</time><div><span className="version-tag">Version 1.0</span><h2>First complete public edition</h2><p>Published the complete 53-project research set: 50 eligible projects, 3 watchlist projects, 13 categories, 27 replacement mappings, 59 sources, full scoring rules, per-project evidence pages, and downloadable JSON and CSV.</p><ul><li>Added an explicit open-source licence gate.</li><li>Separated calculated repository facts from editorial assessments.</li><li>Published known limitations and a reproducible Cal.com example.</li><li>Added public correction, project, and method proposal paths.</li></ul></div></article></section></main></AppShell>
}
