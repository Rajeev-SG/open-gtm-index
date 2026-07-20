import { createFileRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { Icon } from "../components/icons"
import { PageIntro } from "../components/PageIntro"
import { formatDate, sources } from "../data"

export const Route = createFileRoute("/data")({ head: () => ({ meta: [{ title: "Open data and sources — Open GTM Index" }, { name: "description", content: "Download the complete research as JSON, CSV, or XLSX and inspect 59 public sources." }] }), component: DataPage })

const downloads = [
  { title: "Complete data · JSON", detail: "Structured project, category, replacement, source, and method records.", href: "/open-gtm-index.json", meta: "JSON · generated from the research files" },
  { title: "Ranked projects · CSV", detail: "A flat table for analysis, filtering, and import into other tools.", href: "/open-gtm-index.csv", meta: "CSV · 53 project rows" },
  { title: "Research workbook · XLSX", detail: "The original detailed workbook used to prepare this publication.", href: "https://github.com/Rajeev-SG/open-gtm-index/raw/main/research/open_gtm_rankings_research.xlsx", meta: "XLSX · source workbook" },
]

function DataPage() {
  return <AppShell><main><PageIntro eyebrow="Open data · snapshot 2026-07-20" title="Download the research and check our work."><p>The full publication is available without registration. Use it, adapt it, and publish your analysis with attribution to Open GTM Index.</p></PageIntro><section className="data-section"><div className="download-grid">{downloads.map((item) => <a className="download-card" href={item.href} key={item.title} download><Icon name="document" /><div><h2>{item.title}</h2><p>{item.detail}</p><span>{item.meta}</span></div><Icon name="arrow" /></a>)}</div><div className="data-policy"><article><p className="eyebrow">Data licence</p><h2>Creative Commons Attribution 4.0</h2><p>You may share and adapt the research for any purpose if you provide appropriate credit, link to the licence, and indicate changes. Project names and trademarks remain with their owners.</p><a href="https://creativecommons.org/licenses/by/4.0/">Read the licence</a></article><article><p className="eyebrow">Code licence</p><h2>MIT</h2><p>The website source and data-generation scripts can be used, copied, modified, and distributed under the MIT licence.</p><a href="https://github.com/Rajeev-SG/open-gtm-index/blob/main/LICENSE">Read the code licence</a></article></div></section><section className="method-section source-register"><div className="section-heading"><div><p className="eyebrow">Source register</p><h2>{sources.length} public sources</h2></div><p>Checked {formatDate("2026-07-20")}</p></div><div className="source-list">{sources.map((source) => <article key={`${source.type}-${source.name}`}><span>{source.type}</span><h3><a href={source.url}>{source.name}</a></h3><p>{source.usedFor}</p></article>)}</div></section></main></AppShell>
}
