/// <reference types="vite/client" />

import "@fontsource-variable/instrument-sans"
import "@fontsource-variable/newsreader"

import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"

import { AppShell } from "../components/AppShell"
import appCss from "../../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        name: "description",
        content:
          "Compare 53 open-source sales and marketing projects across 13 categories using public data, evidence pages, and a documented scoring method.",
      },
      { property: "og:title", content: "Open GTM Index — Ranked open-source GTM tools" },
      { property: "og:description", content: "Public evidence, complete rankings, replacement mappings, and a scoring method you can inspect." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#fbfaf6" },
      { title: "Open GTM Index — Ranked open-source GTM tools" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='3' fill='%23181b17'/%3E%3Cpath d='M8 9h16M10 14h12M8 19h9M14 24h8' stroke='%23fbfaf6' stroke-width='3'/%3E%3C/svg%3E",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Dataset", name: "Open GTM Index", description: "A public ranking of open-source sales and marketing software.", url: "https://open-gtm-index.vercel.app/", license: "https://creativecommons.org/licenses/by/4.0/", dateModified: "2026-07-20", creator: { "@type": "Person", name: "Rajeev Gill" }, distribution: [{ "@type": "DataDownload", encodingFormat: "application/json", contentUrl: "https://open-gtm-index.vercel.app/open-gtm-index.json" }, { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: "https://open-gtm-index.vercel.app/open-gtm-index.csv" }] }) }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundPage() {
  return <AppShell><main><section className="page-intro"><p className="eyebrow">404 · Not found</p><h1>That evidence page does not exist.</h1><div className="page-intro-copy"><p>The address may be wrong, or the record may have moved. Use the complete ranking to find the current project page.</p><a className="button primary" href="/rankings">Open the rankings</a></div></section></main></AppShell>
}
