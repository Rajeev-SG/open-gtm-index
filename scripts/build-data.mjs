import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

async function readJson(relativePath) {
  return JSON.parse(await fs.readFile(path.join(root, relativePath), "utf8"))
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function roundOne(value) {
  return Math.round((value + Number.EPSILON) * 10) / 10
}

function daysBetween(earlier, later) {
  const start = Date.parse(`${earlier.slice(0, 10)}T00:00:00Z`)
  const end = Date.parse(`${later.slice(0, 10)}T00:00:00Z`)
  return Math.max(0, Math.floor((end - start) / 86400000))
}

function activityPoints(days) {
  if (days <= 7) return 20
  if (days <= 30) return 18
  if (days <= 90) return 14
  if (days <= 180) return 10
  if (days <= 365) return 5
  return 0
}

const licenceRules = {
  "Permissive open source": { points: 10, eligible: true, meaning: "Broad rights to use, change and redistribute." },
  "Copyleft open source": { points: 9, eligible: true, meaning: "Open source with share-alike duties when distributing changes." },
  "Open core (permissive)": { points: 8, eligible: true, meaning: "Open-source core with separately licensed enterprise features." },
  "Open core (copyleft)": { points: 7, eligible: true, meaning: "Copyleft core with separately licensed enterprise features." },
  "Source available": { points: 2, eligible: false, meaning: "Code can be read, but added restrictions prevent strict open-source classification." },
  "Unlicensed / unclear": { points: 0, eligible: false, meaning: "No verified licence grant was found." },
}

function maturity(stars) {
  if (stars >= 20000) return "Established"
  if (stars >= 5000) return "Mature"
  if (stars >= 1000) return "Growing"
  return "Early"
}

function recommendation(eligible, score) {
  if (!eligible) return "Watchlist"
  if (score >= 80) return "Strong shortlist"
  if (score >= 68) return "Pilot"
  if (score >= 55) return "Evaluate"
  return "Monitor"
}

function deploymentRationale(points) {
  if (points >= 15) return "Maintained self-host path, clear setup documentation and a strong operating path."
  if (points >= 13) return "Clear self-host path and strong setup documentation; some operating work remains."
  if (points >= 10) return "A workable self-host path exists, but setup or ongoing operation needs more technical effort."
  return "Self-hosting is possible, but the operating path is early, incomplete or aimed primarily at developers."
}

function gtmRationale(points, replaces) {
  if (points >= 15) return `Directly supports a central sales, marketing or customer workflow and replaces ${replaces}.`
  if (points >= 12) return `Supports a substantial go-to-market workflow and replaces part of ${replaces}.`
  if (points >= 8) return `Useful enabling software for go-to-market teams, but requires assembly or technical integration.`
  return "Related to go-to-market work, but not a direct application replacement."
}

const [config, metadata, licenceReviews, categoryReviews, replacements, sources, snapshot] = await Promise.all([
  readJson("research/research_config.json"),
  readJson("research/repo_metadata.json"),
  readJson("research/licence_reviews.json"),
  readJson("research/category_reviews.json"),
  readJson("research/replacements.json"),
  readJson("research/sources.json"),
  readJson("research/snapshot.json"),
])

const metadataByName = new Map(metadata.map((item) => [item.name, item]))
const licenceByName = new Map(licenceReviews.map((item) => [item.name, item]))
const maxStars = Math.max(...metadata.map((item) => item.stars))
const maxForks = Math.max(...metadata.map((item) => item.forks))

const tools = config.map((review) => {
  const repo = metadataByName.get(review.name)
  const licenceReview = licenceByName.get(review.name)
  if (!repo || !licenceReview) throw new Error(`Missing research inputs for ${review.name}`)
  const rule = licenceRules[licenceReview.licenceModel]
  if (!rule) throw new Error(`Unknown licence model for ${review.name}: ${licenceReview.licenceModel}`)

  const daysSincePush = daysBetween(repo.pushedAt, snapshot.checked)
  const components = {
    adoption: roundOne(Math.min(25, 25 * Math.log(repo.stars + 1) / Math.log(maxStars + 1))),
    community: roundOne(Math.min(15, 15 * Math.log(repo.forks + 1) / Math.log(maxForks + 1))),
    activity: activityPoints(daysSincePush),
    deployment: review.deploy,
    gtmFit: review.gtmFit,
    licence: rule.points,
  }
  const score = roundOne(Object.values(components).reduce((total, value) => total + value, 0))
  const replaces = review.replaces.split(";").map((item) => item.trim())

  return {
    slug: slugify(review.name),
    rank: null,
    categoryRank: null,
    name: review.name,
    category: review.category,
    categorySlug: slugify(review.category),
    replaces,
    description: review.note,
    repositoryDescription: repo.description,
    licence: licenceReview.licence,
    licenceModel: licenceReview.licenceModel,
    licenceMeaning: rule.meaning,
    stars: repo.stars,
    forks: repo.forks,
    openIssues: repo.openIssues,
    lastPush: repo.pushedAt.slice(0, 10),
    daysSincePush,
    defaultBranch: repo.defaultBranch,
    topics: repo.topics,
    components,
    score,
    eligible: rule.eligible,
    maturity: maturity(repo.stars),
    recommendation: recommendation(rule.eligible, score),
    github: repo.githubUrl,
    website: repo.homepage,
    checked: snapshot.checked,
    methodVersion: snapshot.methodVersion,
    editorialEvidence: {
      deployment: deploymentRationale(review.deploy),
      gtmFit: gtmRationale(review.gtmFit, replaces.join(", ")),
      licence: `${licenceReview.licenceModel}: ${rule.meaning}`,
      links: [repo.githubUrl, repo.homepage].filter(Boolean),
    },
  }
})

const ranked = tools.filter((tool) => tool.eligible)
for (const tool of tools) {
  if (!tool.eligible) continue
  tool.rank = ranked.filter((candidate) => candidate.score > tool.score).length + 1
  tool.categoryRank = ranked.filter((candidate) => candidate.category === tool.category && candidate.score > tool.score).length + 1
}

tools.sort((left, right) => {
  if (left.eligible !== right.eligible) return left.eligible ? -1 : 1
  if (right.score !== left.score) return right.score - left.score
  return left.name.localeCompare(right.name)
})

const categories = categoryReviews.map((category) => {
  const categoryTools = tools.filter((tool) => tool.category === category.name && tool.eligible)
  const leader = categoryTools[0]
  return {
    ...category,
    eligibleTools: categoryTools.length,
    leader: leader?.name ?? "No ranked project",
    leaderScore: leader?.score ?? null,
    leaderStars: leader?.stars ?? null,
    averageScore: categoryTools.length
      ? roundOne(categoryTools.reduce((total, tool) => total + tool.score, 0) / categoryTools.length)
      : null,
  }
})

const method = {
  version: snapshot.methodVersion,
  checked: snapshot.checked,
  reviewPolicy: snapshot.reviewPolicy,
  weights: { adoption: 25, community: 15, activity: 20, deployment: 15, gtmFit: 15, licence: 10 },
  formulas: {
    adoption: "min(25, 25 × ln(stars + 1) ÷ ln(largest stars in dataset + 1))",
    community: "min(15, 15 × ln(forks + 1) ÷ ln(largest fork count in dataset + 1))",
    total: "adoption + community + activity + deployment + go-to-market fit + licence",
  },
  activityThresholds: [
    { maximumDays: 7, points: 20 },
    { maximumDays: 30, points: 18 },
    { maximumDays: 90, points: 14 },
    { maximumDays: 180, points: 10 },
    { maximumDays: 365, points: 5 },
    { maximumDays: null, points: 0 },
  ],
  licenceModels: Object.entries(licenceRules).map(([model, rule]) => ({ model, ...rule })),
  limitations: [
    "GitHub stars indicate attention, not installations, market share or revenue.",
    "Fork counts vary by project type and are an imperfect measure of community participation.",
    "Recent pushes can be automated and do not prove maintainer health.",
    "Deployment readiness and go-to-market fit are editorial inputs that involve judgement.",
    "Licence files can contain exceptions; classifications are corrected when better evidence appears.",
    "Adoption and community scores are relative to the largest project in this snapshot, so adding or removing projects can change scores.",
  ],
}

const errors = []
if (tools.length !== 53) errors.push(`Expected 53 tools, found ${tools.length}`)
if (tools.filter((tool) => tool.eligible).length !== 50) errors.push("Expected 50 ranked tools")
if (tools.filter((tool) => !tool.eligible).length !== 3) errors.push("Expected 3 watchlist tools")
if (categories.length !== 13) errors.push(`Expected 13 categories, found ${categories.length}`)
if (replacements.length !== 27) errors.push(`Expected 27 replacement mappings, found ${replacements.length}`)
for (const tool of tools) {
  const total = roundOne(Object.values(tool.components).reduce((sum, value) => sum + value, 0))
  if (total !== tool.score) errors.push(`${tool.name}: component total ${total} does not match ${tool.score}`)
  if (tool.eligible && !tool.rank) errors.push(`${tool.name}: eligible tool has no rank`)
  if (!tool.editorialEvidence.links.length) errors.push(`${tool.name}: missing evidence link`)
}
if (errors.length) throw new Error(`Data validation failed:\n${errors.join("\n")}`)

const generatedDir = path.join(root, "research/generated")
const publicDir = path.join(root, "public")
await fs.mkdir(generatedDir, { recursive: true })
await fs.mkdir(publicDir, { recursive: true })

const datasets = { tools, categories, replacements, sources, method }
for (const [name, value] of Object.entries(datasets)) {
  await fs.writeFile(path.join(generatedDir, `${name}.json`), `${JSON.stringify(value, null, 2)}\n`)
}

await fs.writeFile(
  path.join(publicDir, "open-gtm-index.json"),
  `${JSON.stringify({ meta: { ...snapshot, reviewed: tools.length, ranked: ranked.length, watchlist: tools.length - ranked.length }, tools, categories, replacements, sources }, null, 2)}\n`,
)

const csvHeaders = [
  "rank", "categoryRank", "name", "category", "score", "adoption", "community", "activity", "deployment", "gtmFit", "licencePoints", "licence", "licenceModel", "eligible", "maturity", "recommendation", "stars", "forks", "openIssues", "lastPush", "replaces", "github", "website", "checked", "methodVersion",
]
function csvValue(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "")
  return `"${text.replaceAll('"', '""')}"`
}
const csvRows = tools.map((tool) => [
  tool.rank, tool.categoryRank, tool.name, tool.category, tool.score, tool.components.adoption,
  tool.components.community, tool.components.activity, tool.components.deployment, tool.components.gtmFit,
  tool.components.licence, tool.licence, tool.licenceModel, tool.eligible, tool.maturity,
  tool.recommendation, tool.stars, tool.forks, tool.openIssues, tool.lastPush, tool.replaces,
  tool.github, tool.website, tool.checked, tool.methodVersion,
])
await fs.writeFile(
  path.join(publicDir, "open-gtm-index.csv"),
  `${[csvHeaders, ...csvRows].map((row) => row.map(csvValue).join(",")).join("\n")}\n`,
)

const siteUrl = "https://open-gtm-index.vercel.app"
const staticPaths = ["", "/rankings", "/replacements", "/methodology", "/watchlist", "/data", "/contribute", "/changelog"]
const routePaths = [
  ...staticPaths,
  ...tools.map((tool) => `/tools/${tool.slug}`),
  ...categories.map((category) => `/categories/${category.slug}`),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routePaths.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${snapshot.checked}</lastmod></url>`).join("\n")}\n</urlset>\n`
await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap)
await fs.writeFile(path.join(publicDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)

console.log(JSON.stringify({
  tools: tools.length,
  ranked: ranked.length,
  watchlist: tools.length - ranked.length,
  categories: categories.length,
  replacements: replacements.length,
  sources: sources.length,
  checked: snapshot.checked,
}, null, 2))
