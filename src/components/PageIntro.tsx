import type { ReactNode } from "react"

export function PageIntro({ eyebrow, title, children, actions }: { eyebrow: string; title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="page-intro-copy">{children}</div>
      {actions && <div className="page-actions">{actions}</div>}
    </section>
  )
}
