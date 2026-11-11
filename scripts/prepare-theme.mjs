import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";

const registry = JSON.parse(await readFile(new URL("../registry.json", import.meta.url), "utf8"));
const theme = registry.items.find((item) => item.type === "registry:theme");
const declarations = (values) => Object.entries(values).map(([name, value]) => `  --${name}: ${value};`).join("\n");
const bridge = Object.keys(theme.cssVars.light).filter((name) => name !== "radius").map((name) => `  --nb-${name}: var(--${name});`).join("\n");
await mkdir(new URL("../registry/themes/", import.meta.url), { recursive: true });
await writeFile(new URL("../registry/themes/conteman.css", import.meta.url), `.conteman-preview {\n${declarations(theme.cssVars.light)}\n${bridge}\n}\n\n[data-mode="dark"] .conteman-preview, .dark .conteman-preview {\n${declarations(theme.cssVars.dark)}\n}\n`);
await mkdir(new URL("../public/r/", import.meta.url), { recursive: true });
await copyFile(new URL("../registry.json", import.meta.url), new URL("../public/r/registry.json", import.meta.url));
