export function ToolMark({ name }: { name: string }) {
  const initials = name.split(/[ .&/-]+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase()
  const hue = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 5
  return <span className={`tool-mark hue-${hue}`} aria-hidden="true">{initials}</span>
}
