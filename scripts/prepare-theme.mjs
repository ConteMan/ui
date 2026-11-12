import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";

const registry = JSON.parse(await readFile(new URL("../registry.json", import.meta.url), "utf8"));
const theme = registry.items.find((item) => item.type === "registry:theme");
const declarations = (values) => Object.entries(values).map(([name, value]) => `  --${name}: ${value};`).join("\n");
const bridge = Object.keys(theme.cssVars.light).filter((name) => name !== "radius").map((name) => `  --nb-${name}: var(--${name});`).join("\n");
await mkdir(new URL("../registry/themes/", import.meta.url), { recursive: true });
await writeFile(new URL("../registry/themes/conteman.css", import.meta.url), `.conteman-preview {\n${declarations(theme.cssVars.light)}\n${bridge}\n}\n\n[data-mode="dark"] .conteman-preview, .dark .conteman-preview {\n${declarations(theme.cssVars.dark)}\n}\n`);

// The theme's `css` field is what the shadcn CLI writes into a consumer's
// Tailwind stylesheet. Render the same blocks into a file the docs site imports,
// so both the distributed theme and this site share one source of truth.
const indent = (depth) => "  ".repeat(depth);
const render = (entries, depth) =>
  entries.flatMap(([key, value]) => {
    if (typeof value === "string") return [`${indent(depth)}${key}: ${value};`];
    if (key.startsWith("@") && Object.keys(value).length === 0) return [`${indent(depth)}${key};`];
    const head = key.startsWith("@") ? `${key} {` : `${key} {`;
    return [`${indent(depth)}${head}`, ...render(Object.entries(value), depth + 1), `${indent(depth)}}`, ""];
  });
const extraEntries = Object.entries(theme.css).filter(([key]) => !key.startsWith("@import"));
const variantsCss = render(extraEntries, 0).join("\n").replace(/\n\s*\n(\s*})/g, "\n$1").trimEnd() + "\n";

// Keep the shipped variants identical to shadcn/tailwind.css, which Base UI
// projects import directly. A shadcn upgrade changes that file, so compare and
// fail loudly instead of letting the two definitions drift.
const upstream = await readFile(new URL("../node_modules/shadcn/dist/tailwind.css", import.meta.url), "utf8");
const blocks = (css) => {
  const found = new Map();
  const pattern = /@custom-variant\s+([\w-]+)\s*\{/g;
  let match;
  while ((match = pattern.exec(css))) {
    let depth = 1;
    let index = pattern.lastIndex;
    while (depth > 0 && index < css.length) {
      if (css[index] === "{") depth += 1;
      else if (css[index] === "}") depth -= 1;
      index += 1;
    }
    found.set(match[1], css.slice(pattern.lastIndex, index - 1));
  }
  return found;
};
const normalize = (value) => value.replace(/@slot\s*;?/g, "@slot").replace(/\s+/g, " ").trim();
const expected = blocks(upstream);
const actual = blocks(variantsCss);
for (const [name, body] of expected) {
  const mine = actual.get(name);
  if (!mine || normalize(mine) !== normalize(body)) {
    throw new Error(
      `Theme variant "${name}" is out of sync with shadcn/tailwind.css. Update registry.json theme.css to:\n${body.trim()}`,
    );
  }
}
for (const name of actual.keys()) {
  if (!expected.has(name)) throw new Error(`Theme variant "${name}" has no shadcn/tailwind.css counterpart.`);
}

await writeFile(new URL("../registry/themes/variants.css", import.meta.url), variantsCss);

await mkdir(new URL("../public/r/", import.meta.url), { recursive: true });
await copyFile(new URL("../registry.json", import.meta.url), new URL("../public/r/registry.json", import.meta.url));
