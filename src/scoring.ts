import type { ScoreComponents, ToolRecord } from "./data"

export const SCORE_MAXIMUMS: ScoreComponents = {
  adoption: 25,
  community: 15,
  activity: 20,
  deployment: 15,
  gtmFit: 15,
  licence: 10,
}

export function roundOne(value: number) {
  return Math.round((value + Number.EPSILON) * 10) / 10
}

export function adoptionPoints(stars: number, maximumStars: number) {
  return roundOne(Math.min(25, 25 * Math.log(stars + 1) / Math.log(maximumStars + 1)))
}

export function communityPoints(forks: number, maximumForks: number) {
  return roundOne(Math.min(15, 15 * Math.log(forks + 1) / Math.log(maximumForks + 1)))
}

export function activityPoints(daysSincePush: number) {
  if (daysSincePush <= 7) return 20
  if (daysSincePush <= 30) return 18
  if (daysSincePush <= 90) return 14
  if (daysSincePush <= 180) return 10
  if (daysSincePush <= 365) return 5
  return 0
}

export function calculateTotal(components: ScoreComponents) {
  return roundOne(Object.values(components).reduce((total, value) => total + value, 0))
}

export function validatePublishedTools(tools: ToolRecord[]) {
  const errors: string[] = []
  if (tools.length !== 53) errors.push(`Expected 53 tools; found ${tools.length}`)
  if (tools.filter((tool) => tool.eligible).length !== 50) errors.push("Expected 50 ranked tools")
  if (tools.filter((tool) => !tool.eligible).length !== 3) errors.push("Expected 3 watchlist tools")

  const maximumStars = Math.max(...tools.map((tool) => tool.stars))
  const maximumForks = Math.max(...tools.map((tool) => tool.forks))
  for (const tool of tools) {
    if (adoptionPoints(tool.stars, maximumStars) !== tool.components.adoption) {
      errors.push(`${tool.name}: adoption score does not match the public formula`)
    }
    if (communityPoints(tool.forks, maximumForks) !== tool.components.community) {
      errors.push(`${tool.name}: community score does not match the public formula`)
    }
    if (activityPoints(tool.daysSincePush) !== tool.components.activity) {
      errors.push(`${tool.name}: activity score does not match the public thresholds`)
    }
    if (calculateTotal(tool.components) !== tool.score) {
      errors.push(`${tool.name}: component total does not match its score`)
    }
    if (!tool.github || !tool.website || !tool.checked || !tool.methodVersion) {
      errors.push(`${tool.name}: missing public evidence metadata`)
    }
  }
  return errors
}
