export type CategoryLeader = {
  category: string
  leader: string
  score: number
  icon: IconName
}

export type RankingRow = {
  rank: number
  tool: string
  category: string
  score: number
  stars: number
  licence: string
  replaces: string
  logo: "cal" | "chatwoot" | "umami"
}

export type IconName =
  | "menu"
  | "close"
  | "github"
  | "arrow"
  | "shield"
  | "code"
  | "document"
  | "unlock"
  | "users"
  | "crm"
  | "bars"
  | "workflow"
  | "chat"
  | "mail"
  | "wave"
  | "sort"
  | "heart"
  | "clock"
  | "server"
  | "target"
  | "scale"

export const categoryLeaders: CategoryLeader[] = [
  { category: "CRM & Revenue Operations", leader: "Twenty", score: 92.1, icon: "crm" },
  { category: "Analytics & Experimentation", leader: "Umami", score: 93.3, icon: "bars" },
  { category: "Workflow Automation", leader: "Activepieces", score: 89.4, icon: "workflow" },
  { category: "Customer Support & Success", leader: "Chatwoot", score: 93.3, icon: "chat" },
  { category: "Marketing Automation & Email", leader: "listmonk", score: 90.6, icon: "mail" },
  { category: "Conversation Intelligence", leader: "Meetily", score: 82.9, icon: "wave" },
]

export const rankingRows: RankingRow[] = [
  {
    rank: 1,
    tool: "Cal.com",
    category: "Forms, Surveys & Conversion",
    score: 93.8,
    stars: 46636,
    licence: "MIT",
    replaces: "Calendly; Chili Piper",
    logo: "cal",
  },
  {
    rank: 2,
    tool: "Chatwoot",
    category: "Customer Support & Success",
    score: 93.3,
    stars: 34579,
    licence: "MIT core",
    replaces: "Intercom; Zendesk",
    logo: "chatwoot",
  },
  {
    rank: 2,
    tool: "Umami",
    category: "Analytics & Experimentation",
    score: 93.3,
    stars: 37768,
    licence: "MIT",
    replaces: "Google Analytics",
    logo: "umami",
  },
]

export const scoreFactors: Array<{ label: string; weight: number; icon: IconName }> = [
  { label: "Adoption", weight: 25, icon: "users" },
  { label: "Community", weight: 15, icon: "heart" },
  { label: "Recent activity", weight: 20, icon: "clock" },
  { label: "Deployment", weight: 15, icon: "server" },
  { label: "GTM fit", weight: 15, icon: "target" },
  { label: "Licence", weight: 10, icon: "scale" },
]
