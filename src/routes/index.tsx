import { Link, createFileRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { Icon } from "../components/icons"
import { ToolMark } from "../components/ToolMark"
import { categories, formatDate, formatNumber, rankedTools } from "../data"

export const Route = createFileRoute("/")({ component: IndexPage })

const principles = [
  { icon: "code" as const, title: "Open data", copy: "Every published field is available as JSON and CSV." },
  { icon: "document" as const, title: "Evidence attached", copy: "Each project has repository facts and editorial review notes." },
  { icon: "unlock" as const, title: "Licence gate", copy: "Only verified open-source projects receive a rank." },
  { icon: "users" as const, title: "Public corrections", copy: "Changes happen through visible issues and pull requests." },
]

function IndexPage() {
  const topTools = rankedTools.slice(0, 8)
  const featured = categories.filter((category) => category.leaderScore !== null).sort((a, b) => (b.leaderScore ?? 0) - (a.leaderScore ?? 0)).slice(0, 6)

  return (
    <AppShell>
      <main id="main">
        <section className="hero">
          <div className="hero-inner">
            <p className="eyebrow">Independent public research · Method 1.0</p>
            <h1>Ranked tools you can<br className="desktop-only" /> inspect, self-host, and improve.</h1>
            <p className="research-summary">
              <span>53 projects reviewed</span><b>·</b><span>50 ranked</span><b>·</b><span>13 categories</span><b>·</b><span>checked {formatDate("2026-07-20")}</span>
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/rankings">Explore all rankings</Link>
              <Link className="button text" to="/methodology">Read the scoring method <Icon name="arrow" /></Link>
            </div>
            <p className="trust-note"><Icon name="shield" /><span>Every score input and source is public. Projects with restricted or unclear licences remain visible on the watchlist but are not ranked.</span></p>
          </div>
        </section>

        <section className="principles" aria-label="Publication principles">
          {principles.map((item) => <article className="principle" key={item.title}><Icon name={item.icon} /><div><h2>{item.title}</h2><p>{item.copy}</p></div></article>)}
        </section>

        <section className="section-block">
          <div className="section-heading"><div><p className="eyebrow">Category leaders</p><h2>Strong starting points, by job</h2></div><Link to="/rankings">Compare all 50 <Icon name="arrow" /></Link></div>
          <div className="leader-grid">
            {featured.map((category) => (
              <Link className="leader-card" to="/categories/$slug" params={{ slug: category.slug }} key={category.slug}>
                <span className="card-kicker">{category.marketState}</span>
                <h3>{category.name}</h3>
                <p><span>#1 {category.leader}</span><strong>{category.leaderScore?.toFixed(1)}</strong></p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-block ranking-preview">
          <div className="section-heading"><div><p className="eyebrow">Overall ranking</p><h2>The leading projects in this snapshot</h2></div><p>Score out of 100</p></div>
          <div className="preview-table" role="table" aria-label="Top ranked open source go-to-market tools">
            {topTools.map((tool) => (
              <Link className="preview-row" role="row" to="/tools/$slug" params={{ slug: tool.slug }} key={tool.slug}>
                <span className="rank-number" role="cell">{tool.rank}</span><ToolMark name={tool.name} />
                <span className="preview-name" role="cell"><strong>{tool.name}</strong><small>{tool.category}</small></span>
                <span className="preview-licence" role="cell">{tool.licence}</span>
                <span className="preview-stars" role="cell">{formatNumber(tool.stars)} stars</span>
                <strong className="preview-score" role="cell">{tool.score.toFixed(1)}</strong>
                <Icon name="arrow" />
              </Link>
            ))}
          </div>
          <div className="section-cta"><Link className="button secondary" to="/rankings">View the complete ranking</Link><Link className="button text" to="/watchlist">See projects that are not ranked <Icon name="arrow" /></Link></div>
        </section>

        <section className="method-callout">
          <div><p className="eyebrow">A score you can reproduce</p><h2>Six inputs. One public method.</h2><p>Repository signals contribute 60 points. Deployment readiness, practical fit, and licence clarity contribute 40. Every weight, threshold, and limitation is published.</p><Link className="button primary" to="/methodology">Examine the method</Link></div>
          <div className="weight-grid" aria-label="Scoring weights">
            {[['Adoption',25],['Community',15],['Recent activity',20],['Deployment',15],['GTM fit',15],['Licence',10]].map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </section>
      </main>
    </AppShell>
  )
}
