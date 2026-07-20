import { describe, expect, it } from "vitest"

import { getTool, tools } from "./data"
import { activityPoints, calculateTotal, validatePublishedTools } from "./scoring"

describe("published ranking data", () => {
  it("passes every data and scoring check", () => {
    expect(validatePublishedTools(tools)).toEqual([])
  })

  it("reproduces the published Cal.com score", () => {
    const cal = getTool("cal-com")!
    expect(cal.components).toEqual({ adoption: 22.6, community: 14.2, activity: 18, deployment: 14, gtmFit: 15, licence: 10 })
    expect(calculateTotal(cal.components)).toBe(93.8)
    expect(cal.rank).toBe(1)
  })

  it("keeps projects without an eligible licence outside the ranking", () => {
    const watchlist = tools.filter((tool) => !tool.eligible)
    expect(watchlist.map((tool) => tool.name)).toEqual(["Dify", "Typebot", "GEO/AEO Tracker"])
    expect(watchlist.every((tool) => tool.rank === null)).toBe(true)
  })

  it("implements every activity boundary", () => {
    expect([7, 8, 30, 31, 90, 91, 180, 181, 365, 366].map(activityPoints)).toEqual([20, 18, 18, 14, 14, 10, 10, 5, 5, 0])
  })
})
