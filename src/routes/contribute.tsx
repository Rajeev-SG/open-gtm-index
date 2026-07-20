import { createFileRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import { PageIntro } from "../components/PageIntro"

export const Route = createFileRoute("/contribute")({ head: () => ({ meta: [{ title: "Contribute — Open GTM Index" }, { name: "description", content: "Suggest a project, correct a published record, or propose a scoring method change." }] }), component: ContributePage })

const contributions = [
  { title: "Suggest a project", copy: "Add a project that belongs in one of the 13 categories, with its repository and official website.", link: "https://github.com/Rajeev-SG/open-gtm-index/issues/new?template=project.yml", action: "Open project request" },
  { title: "Correct published data", copy: "Point to a current public source for a factual error, licence change, or missing replacement mapping.", link: "https://github.com/Rajeev-SG/open-gtm-index/issues/new?template=correction.yml", action: "Open correction" },
  { title: "Propose a method change", copy: "Explain the problem, the exact rule change, and how it would affect existing projects.", link: "https://github.com/Rajeev-SG/open-gtm-index/issues/new?template=method-change.yml", action: "Open method proposal" },
]

function ContributePage() {
  return <AppShell><main><PageIntro eyebrow="Public review" title="Improve the index with evidence."><p>Corrections and additions happen in the public repository. A useful contribution identifies the exact record, links to a public source, and explains the requested change in plain language.</p></PageIntro><section className="data-section"><div className="contribution-grid">{contributions.map((item) => <article key={item.title}><span>0{contributions.indexOf(item) + 1}</span><h2>{item.title}</h2><p>{item.copy}</p><a className="button secondary" href={item.link}>{item.action}</a></article>)}</div><section className="review-process"><p className="eyebrow">What happens next</p><h2>The public review process</h2><ol><li><strong>Evidence check.</strong><span>A contributor or maintainer checks that the link supports the requested change.</span></li><li><strong>Data update.</strong><span>The relevant research file is changed and the generated records are rebuilt.</span></li><li><strong>Validation.</strong><span>Automated checks confirm counts, score totals, types, and the production build.</span></li><li><strong>Published record.</strong><span>The change is merged, deployed, and recorded in the changelog.</span></li></ol></section><div className="conduct-note"><h2>Contribution standard</h2><p>Be specific, civil, and open to correction. Do not submit private information. Commercial relationships should be disclosed in the issue.</p><a href="https://github.com/Rajeev-SG/open-gtm-index/blob/main/CONTRIBUTING.md">Read the full contribution guide</a></div></section></main></AppShell>
}
