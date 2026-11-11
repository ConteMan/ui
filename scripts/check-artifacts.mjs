import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const text = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");
for (const route of ["basics/button", "data-display/data-table", "theme", "en/basics/button", "en/data-display/data-table", "en/theme"]) {
  const markdown = await text(`${route}/index.md`);
  assert.ok(markdown.includes("npx shadcn add @conteman/"), `${route}: install command missing`);
  assert.ok(!markdown.includes("import ButtonDemo") && !markdown.includes("import DataTableDemo"), `${route}: raw MDX imports leaked`);
  const html = await text(`${route}/index.html`);
  assert.ok(html.includes("astro-island"), `${route}: React island missing`);
  assert.ok(html.includes(`lang="${route.startsWith("en/") ? "en" : "zh-CN"}"`), `${route}: document language wrong`);
}
const registry = JSON.parse(await text("r/registry.json"));
assert.equal(registry.name, "conteman");
for (const name of ["button", "input", "table", "utils", "theme", "data-table"]) {
  const item = JSON.parse(await text(`r/${name}.json`));
  assert.equal(item.name, name);
  assert.ok(item.type.startsWith("registry:"));
}
const llms = await text("llms.txt");
assert.ok(llms.includes("ui.conteman.com") && llms.includes("basics/llms.txt"));
assert.ok((await text("basics/llms.txt")).includes("button/index.md"));
assert.ok((await text("data-display/llms.txt")).includes("data-table/index.md"));
const skills = JSON.parse(await text(".well-known/agent-skills/index.json"));
assert.ok(JSON.stringify(skills).includes("use-conteman-ui"));
console.log("Artifact checks passed: bilingual Markdown, React islands, registry, llms.txt and Agent Skill.");
