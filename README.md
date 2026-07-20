# Open GTM Index

Open GTM Index is a public, evidence-based guide to open-source sales and marketing software. It pairs a transparent research workbook with a responsive TanStack Start interface.

Live site: [open-gtm-index.vercel.app](https://open-gtm-index.vercel.app/)

The GitHub repository is connected to Vercel. Pull requests receive preview deployments, and updates merged into `main` deploy to the public site.

The ranking shown in the interface uses real project data collected on 20 July 2026. The complete research workbook, repository facts, and category configuration are in [`research/`](./research/).

## Run locally

```sh
pnpm install
pnpm dev
```

Build the production files with:

```sh
pnpm build
```

The deployable Nitro server and public assets are written to `.output/`.

## What is implemented

- Desktop composition matched to the approved 1488 × 1058 editorial design.
- Fluid wide-desktop layout.
- Tablet navigation, two-by-two evidence grid, three-by-two category grid, scrollable ranking table, and full-width score explanation.
- Mobile navigation, stacked evidence rows, horizontal category carousel, labelled ranking cards, and three-column score explanation.
- Local Newsreader and Instrument Sans font files; production rendering does not depend on a third-party font server.
- Working mobile menu and sortable ranking columns.
- Keyboard focus styles and reduced-motion support.

## Deployment compatibility

The application is a TanStack Start build. It can be deployed to:

- Cloudflare Workers using `@cloudflare/vite-plugin`
- Vercel using Nitro
- Coolify using the generated Node server or a Dockerfile

## Recommended production framework

The production application uses TanStack Start so URL-based filters, comparisons, server-side data loading, and contribution workflows can be added without changing frameworks. It supports Cloudflare Workers, Vercel through Nitro, and a Node server or container for Coolify.

The page is already split into React components for the header, hero, evidence strip, category leaders, ranking table, and scoring method. The design rules used for the responsive implementation are in [`.stitch/DESIGN.md`](./.stitch/DESIGN.md).

Next.js remains a strong option when publishing, server-rendered editorial pages, and Vercel integration are more important than portable route and filter state. Astro is the leanest option if the index remains mostly prebuilt editorial content with a few interactive controls.

Official deployment references:

- [TanStack Start hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [TanStack Start on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
- [TanStack Start on Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel)
- [Next.js deployment options](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [Astro Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Coolify applications and build packs](https://coolify.io/docs/applications/index)

## Licence

The application code and included research files are available under the [MIT licence](./LICENSE).
