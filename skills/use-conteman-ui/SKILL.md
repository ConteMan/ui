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

DataTable resolves Button, Input, Table, class utilities and theme automatically. It uses TanStack Table 8. The theme writes its light/dark variables and nine Base UI custom variants (`data-open`, `data-closed`, `data-checked`, `data-unchecked`, `data-selected`, `data-disabled`, `data-active`, `data-horizontal`, `data-vertical`) plus the `no-scrollbar` utility into the entry stylesheet; component shorthands such as `data-horizontal:` rely on them, so keep the shorthands instead of rewriting them as `data-[orientation=…]`/`data-[state=…]`. Inspect theme changes before applying them to an established design system.

## Compose

- Import installed UI primitives using the project's UI alias. The DataTable file is installed under the components alias.
- Supply all visible text, accessible names, placeholders, empty and loading states through props. DataTable requires a `labels` object and column definitions; see https://ui.conteman.com/en/data-display/data-table/index.md.
- DataTable supports local processing and controlled server pagination, sorting and filtering through TanStack Table 8 state/callback pairs and manual flags. Supply the filtered rowCount. The consumer owns requests, URL state, persistence and cross-page bulk actions. Read the DataTable docs for facets, debounced IME search, column settings, selection, internal scrolling and refreshing.
- Toggle `.dark` on the consuming application's root for dark mode. Nimbus's `data-mode` belongs only to the documentation site.
- Install basics, forms, data display, overlays, navigation, list-page, settings-page, edit-sheet and admin-shell independently. Dialog is a separate registry item. AdminShell provides grouped navigation and mobile Sheet navigation; declare one AdminPageSticky within its content for status/actions beneath the heading. All navigation labels come from props.

Read the installed source before modifying it; the consuming project owns its copy.
