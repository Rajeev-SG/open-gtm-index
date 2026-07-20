import categoriesJson from "../research/generated/categories.json"
import methodJson from "../research/generated/method.json"
import replacementsJson from "../research/generated/replacements.json"
import sourcesJson from "../research/generated/sources.json"
import toolsJson from "../research/generated/tools.json"

export type ScoreComponents = {
  adoption: number
  community: number
  activity: number
  deployment: number
  gtmFit: number
  licence: number
}

export type ToolRecord = {
  slug: string
  rank: number | null
  categoryRank: number | null
  name: string
  category: string
  categorySlug: string
  replaces: string[]
  description: string
  repositoryDescription: string
  licence: string
  licenceModel: string
  licenceMeaning: string
  stars: number
  forks: number
  openIssues: number
  lastPush: string
  daysSincePush: number
  defaultBranch: string
  topics: string[]
  components: ScoreComponents
  score: number
  eligible: boolean
  maturity: string
  recommendation: string
  github: string
  website: string
  checked: string
  methodVersion: string
  editorialEvidence: {
    deployment: string
    gtmFit: string
    licence: string
    links: string[]
  }
}

export type CategoryRecord = {
  slug: string
  name: string
  eligibleTools: number
  leader: string
  leaderScore: number | null
  leaderStars: number | null
  averageScore: number | null
  marketState: string
  description: string
}

export type ReplacementRecord = {
  slug: string
  commercialProduct: string
  openSourceOptions: string[]
  bestStartingPoint: string
  limitation: string
  categories: string[]
  sourceBasis: string
}

export type SourceRecord = {
  type: string
  name: string
  url: string
  usedFor: string
  checked: string
}

export type MethodRecord = {
  version: string
  checked: string
  reviewPolicy: string
  weights: ScoreComponents
  formulas: Record<string, string>
  activityThresholds: Array<{ maximumDays: number | null; points: number }>
  licenceModels: Array<{ model: string; points: number; eligible: boolean; meaning: string }>
  limitations: string[]
}

export const tools = toolsJson as ToolRecord[]
export const categories = categoriesJson as CategoryRecord[]
export const replacements = replacementsJson as ReplacementRecord[]
export const sources = sourcesJson as SourceRecord[]
export const method = methodJson as MethodRecord

export const rankedTools = tools.filter((tool) => tool.eligible)
export const watchlistTools = tools.filter((tool) => !tool.eligible)

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug)
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function getCategoryTools(categoryName: string) {
  return tools.filter((tool) => tool.category === categoryName)
}

export function getSourceForTool(toolName: string) {
  return sources.find((source) => source.type === "Project repository" && source.name === toolName)
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`))
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-GB")
}

export function scoreTotal(components: ScoreComponents) {
  return Math.round(Object.values(components).reduce((total, value) => total + value, 0) * 10) / 10
}
