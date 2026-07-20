/// <reference types="vite/client" />

import "@fontsource-variable/instrument-sans"
import "@fontsource-variable/newsreader"

import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"

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
          "Open GTM Index ranks open-source sales and marketing tools using a public scoring model.",
      },
      { title: "Open GTM Index — Ranked open-source tools" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='3' fill='%23181b17'/%3E%3Cpath d='M8 9h16M10 14h12M8 19h9M14 24h8' stroke='%23fbfaf6' stroke-width='3'/%3E%3C/svg%3E",
      },
    ],
  }),
  component: RootComponent,
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
