import type { ScoreComponents } from "../data"

const factors: Array<[keyof ScoreComponents, string, number]> = [
  ["adoption", "Adoption", 25],
  ["community", "Community", 15],
  ["activity", "Recent activity", 20],
  ["deployment", "Deployment", 15],
  ["gtmFit", "GTM fit", 15],
  ["licence", "Licence", 10],
]

export function ScoreBreakdown({ components, compact = false }: { components: ScoreComponents; compact?: boolean }) {
  return (
    <div className={compact ? "score-breakdown compact" : "score-breakdown"}>
      {factors.map(([key, label, maximum]) => (
        <div className="score-part" key={key}>
          <div><span>{label}</span><strong>{components[key].toFixed(1).replace(".0", "")}<small>/{maximum}</small></strong></div>
          <span className="score-track" aria-hidden="true"><i style={{ width: `${components[key] / maximum * 100}%` }} /></span>
        </div>
      ))}
    </div>
  )
}
