---
name: use-conteman-ui
description: Install and compose Conteman UI React components from the @conteman shadcn registry, including the searchable DataTable and light/dark theme.
---

# Use Conteman UI

Read https://ui.conteman.com/llms.txt to discover the current docs. Chinese is the default; English pages live under `/en/`. Each page has a `.md` representation.

## Install

Use a React project with Tailwind CSS 4. If it has no `components.json`, run `npx shadcn@4.23.0 init` first. Preserve the project's existing configuration and add:

```json
{
  "registries": {
    "@conteman": "https://ui.conteman.com/r/{name}.json"
  }
}
```

Install the requested item:

```sh
npx shadcn add @conteman/button
npx shadcn add @conteman/data-table
```

DataTable resolves Button, Input, Table, class utilities and theme automatically. It uses TanStack Table 8. Inspect theme changes before applying them to an established design system.

## Compose

- Import installed UI primitives using the project's UI alias. The DataTable file is installed under the components alias.
- Supply all visible text, accessible names, placeholders, empty and loading states through props. DataTable requires a `labels` object and column definitions; see https://ui.conteman.com/en/data-display/data-table/index.md.
- This DataTable performs client-side search and pagination. Do not assume server pagination, row selection or sorting support.
- Toggle `.dark` on the consuming application's root for dark mode. Nimbus's `data-mode` belongs only to the documentation site.
- Button's dialog example tests Base UI portals and keyboard focus. It does not imply a separately distributed Dialog component.

Read the installed source before modifying it; the consuming project owns its copy.
