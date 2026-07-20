# Contributing to Open GTM Index

Open GTM Index accepts project suggestions, factual corrections, replacement mappings, and scoring method proposals through public GitHub issues and pull requests.

## Before submitting

1. Identify the exact project, field, or rule you want to change.
2. Link to a current public source that supports the change.
3. Explain the requested change in plain language.
4. Disclose any employment, investment, or commercial relationship with the project.
5. Do not include private information.

## Research files

- `research/research_config.json` contains category, replacement, deployment, and practical-fit inputs.
- `research/repo_metadata.json` contains the repository snapshot.
- `research/licence_reviews.json` contains licence classifications.
- `research/category_reviews.json`, `research/replacements.json`, and `research/sources.json` contain the supporting publication records.
- `research/snapshot.json` sets the date and method version.

Do not hand-edit files under `research/generated/` or the JSON and CSV files under `public/`. Run `pnpm data:build` after changing a research input.

## Validate a change

```sh
pnpm install
pnpm validate
```

The validation command rebuilds the public data, checks TypeScript, runs scoring tests, and builds the production site.

## Review standard

Maintainers check whether the source supports the requested change, whether the scoring rule was applied consistently, and whether the result can be understood from the public evidence page. Material changes are recorded in the changelog.
