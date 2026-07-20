# Open GTM Index

Open GTM Index is a public guide to open-source sales, marketing, support, customer, and revenue software. It publishes the complete evidence and scoring method behind its rankings.

Live publication: [open-gtm-index.vercel.app](https://open-gtm-index.vercel.app/)

The 20 July 2026 snapshot contains:

- 53 reviewed projects: 50 ranked and 3 on the licence watchlist
- 13 categories
- 27 commercial-to-open-source replacement mappings
- 59 public sources
- six score components with documented formulas, thresholds, and limitations

## Public pages

- `/rankings` provides the complete searchable and filterable ranking.
- `/tools/:slug` provides a project evidence page with every score component.
- `/categories/:slug` compares projects that do the same job.
- `/replacements` maps familiar commercial products to open-source starting points.
- `/methodology` publishes weights, formulas, thresholds, licence rules, and a worked example.
- `/watchlist` keeps reviewed projects with restricted or unclear licences visible but unranked.
- `/data` provides JSON, CSV, the research workbook, and the source register.
- `/contribute` explains the public correction and review process.

## Run locally

```sh
pnpm install
pnpm dev
```

Build and validate everything with:

```sh
pnpm validate
```

TanStack Start generates the deployable Nitro server and static assets under `.output/`.

## Data generation

The editable research inputs live under `research/`. Run:

```sh
pnpm data:build
```

This validates the 53 project records, recalculates every score and rank, and writes:

- typed application inputs under `research/generated/`
- `public/open-gtm-index.json`
- `public/open-gtm-index.csv`
- `public/sitemap.xml` and `public/robots.txt`

Generated files are committed so each publication snapshot can be reviewed as a normal Git change.

## Design and deployment

The interface uses the approved editorial direction: Newsreader and Instrument Sans, warm paper, precise rules, cobalt links, amber scores, and responsive tables that become evidence cards on small screens. The supporting Stitch outputs are stored in `.stitch/designs/`.

The application runs on TanStack Start and Nitro. It is deployed to Vercel; the same application can target Cloudflare Workers with the Cloudflare Vite integration or run as a Node server/container on Coolify.

## Licences

- Website code: [MIT](./LICENSE)
- Research data and published records: [CC BY 4.0](./DATA-LICENSE.md)

Project names and trademarks belong to their respective owners.
