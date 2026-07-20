import { Link, createFileRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { PageIntro } from "../components/PageIntro"
import { ScoreBreakdown } from "../components/ScoreBreakdown"
import { getTool, method } from "../data"

export const Route = createFileRoute("/methodology")({ head: () => ({ meta: [{ title: "Scoring methodology — Open GTM Index" }, { name: "description", content: "Read every scoring formula, threshold, editorial input, licence rule, and known limitation." }] }), component: MethodologyPage })

const cal = getTool("cal-com")!
const factors = [
  { name: "Adoption", points: 25, kind: "Repository fact", text: "A logarithmic score based on GitHub stars. The curve rewards meaningful adoption without allowing the largest repository to dominate." },
  { name: "Community", points: 15, kind: "Repository fact", text: "A logarithmic score based on repository forks, relative to the largest fork count in this snapshot." },
  { name: "Recent activity", points: 20, kind: "Repository fact", text: "Points based on the number of days since the repository’s latest push, using the public thresholds below." },
  { name: "Deployment", points: 15, kind: "Editorial review", text: "An assessment of self-hosting documentation, setup path, operating burden, and production readiness." },
  { name: "GTM fit", points: 15, kind: "Editorial review", text: "How directly the project supports a sales, marketing, support, customer, or revenue workflow." },
  { name: "Licence", points: 10, kind: "Licence review", text: "Points reflect the licence model. A source-available or unclear licence also removes the project from the ranking." },
]

function MethodologyPage() {
  return <AppShell><main><PageIntro eyebrow={`Scoring method ${method.version}`} title="Every point has a published rule."><p>The index combines repository facts with explicitly labelled editorial assessments. The method is designed to help form a shortlist—not to replace a security, legal, operational, or feature review.</p></PageIntro>
    <section className="method-section"><div className="section-heading"><div><p className="eyebrow">Weights</p><h2>Six factors add to 100 points</h2></div></div><div className="factor-list">{factors.map((factor) => <article key={factor.name}><div><span>{factor.kind}</span><strong>{factor.points}</strong></div><h3>{factor.name}</h3><p>{factor.text}</p></article>)}</div></section>
    <section className="method-section two-column-method"><div><p className="eyebrow">Calculated inputs</p><h2>Repository formulas</h2><div className="formula-box"><span>Adoption</span><code>{method.formulas.adoption}</code></div><div className="formula-box"><span>Community</span><code>{method.formulas.community}</code></div><p className="method-note">Both formulas are recalculated against the largest project in each data snapshot, then rounded to one decimal place.</p></div><div><p className="eyebrow">Recent activity</p><h2>Activity thresholds</h2><table className="plain-table"><thead><tr><th>Days since latest push</th><th>Points</th></tr></thead><tbody>{method.activityThresholds.map((row, index) => <tr key={index}><td>{row.maximumDays === null ? "More than 365 days" : index === 0 ? `0–${row.maximumDays} days` : `${(method.activityThresholds[index - 1].maximumDays ?? 0) + 1}–${row.maximumDays} days`}</td><td>{row.points}/20</td></tr>)}</tbody></table></div></section>
    <section className="method-section"><p className="eyebrow">Eligibility</p><h2>Licence points and the ranking gate</h2><p className="measure-copy">Only projects with a verified open-source licence are ranked. Other reviewed projects remain visible on the <Link to="/watchlist">watchlist</Link>.</p><div className="licence-table-wrap"><table className="plain-table licence-method-table"><thead><tr><th>Model</th><th>Meaning</th><th>Points</th><th>Ranked?</th></tr></thead><tbody>{method.licenceModels.map((item) => <tr key={item.model}><td><strong>{item.model}</strong></td><td>{item.meaning}</td><td>{item.points}/10</td><td>{item.eligible ? "Yes" : "No"}</td></tr>)}</tbody></table></div></section>
    <section className="method-section worked-example"><div><p className="eyebrow">Worked example</p><h2>Reproduce Cal.com’s 93.8</h2><p>On 20 July 2026, Cal.com had 46,636 stars, 14,496 forks, and a repository push 11 days earlier. Those inputs and the published editorial assessments produce the component scores shown here.</p><ScoreBreakdown components={cal.components} /><p className="equation">22.6 + 14.2 + 18 + 14 + 15 + 10 = <strong>93.8</strong></p></div><div className="example-notes"><h3>Editorial evidence</h3><p><strong>Deployment:</strong> {cal.editorialEvidence.deployment}</p><p><strong>GTM fit:</strong> {cal.editorialEvidence.gtmFit}</p><p><strong>Licence:</strong> {cal.editorialEvidence.licence}</p><Link to="/tools/$slug" params={{ slug: cal.slug }}>Open the full Cal.com evidence page</Link></div></section>
    <section className="method-section limitations"><p className="eyebrow">Interpretation</p><h2>What the score does not prove</h2><ol>{method.limitations.map((item) => <li key={item}>{item}</li>)}</ol><div className="public-review"><h3>Review policy</h3><p>{method.reviewPolicy}</p><Link className="button secondary" to="/contribute">Challenge an input or rule</Link></div></section>
  </main></AppShell>
}
