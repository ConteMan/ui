import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";

const text = (path) =>
  readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");
const registry = JSON.parse(await text("r/registry.json"));
assert.deepEqual(
  registry,
  JSON.parse(
    await readFile(new URL("../registry.json", import.meta.url), "utf8"),
  ),
);
const names = new Set(registry.items.map((item) => item.name));
const graph = new Map();
const routes = [];
for (const source of registry.items) {
  const item = JSON.parse(await text(`r/${source.name}.json`));
  assert.equal(item.name, source.name);
  assert.equal(item.type, source.type);
  assert.ok(source.categories?.length, `${source.name}: categories missing`);
  assert.ok(
    Array.isArray(source.registryDependencies),
    `${source.name}: registryDependencies missing`,
  );
  assert.deepEqual(item.categories, source.categories);
  assert.deepEqual(
    item.registryDependencies ?? [],
    source.registryDependencies,
  );
  assert.deepEqual(item.dependencies ?? [], source.dependencies ?? []);
  const dependencies = source.registryDependencies
    .filter((dependency) => dependency.startsWith("@conteman/"))
    .map((dependency) => dependency.slice(10));
  graph.set(source.name, dependencies);
  for (const dependency of dependencies)
    assert.ok(names.has(dependency), `${source.name}: missing ${dependency}`);
  for (const file of source.files ?? []) {
    const code = await readFile(
      new URL(`../${file.path}`, import.meta.url),
      "utf8",
    );
    assert.equal(
      item.files.find((built) => built.path === file.path)?.content,
      code,
      `${source.name}: stale generated source`,
    );
    for (const match of code.matchAll(
      /from\s+["']@\/(?:components\/(?:ui\/)?|hooks\/|lib\/)([^"']+)["']/g,
    )) {
      const dependency = match[1].split("/").at(-1);
      assert.ok(
        dependency === source.name || dependencies.includes(dependency),
        `${source.name}: undeclared ${dependency}`,
      );
    }
  }
  if (!source.categories.includes("utilities")) {
    const route =
      source.name === "theme"
        ? "theme"
        : `${source.categories[0]}/${source.name}`;
    routes.push(route, `en/${route}`);
  }
}
const visit = (name, ancestors = []) => {
  assert.ok(
    !ancestors.includes(name),
    `Dependency cycle: ${[...ancestors, name].join(" -> ")}`,
  );
  for (const dependency of graph.get(name))
    visit(dependency, [...ancestors, name]);
};
for (const name of names) visit(name);
for (const route of routes) {
  const markdown = await text(`${route}/index.md`);
  assert.ok(
    markdown.includes(`npx shadcn add @conteman/${route.split("/").at(-1)}`),
    `${route}: install command missing`,
  );
  assert.ok(
    !/import\s+(?:\w+Demo|Demo)\s+from/.test(
      markdown.replace(/```[\s\S]*?```/g, ""),
    ),
    `${route}: raw MDX imports leaked`,
  );
  const html = await text(`${route}/index.html`);
  assert.ok(html.includes("astro-island"), `${route}: React island missing`);
  assert.ok(
    html.includes(`lang="${route.startsWith("en/") ? "en" : "zh-CN"}"`),
    `${route}: document language wrong`,
  );
  const counterpart = route.startsWith("en/") ? route.slice(3) : `en/${route}`;
  assert.ok(
    html.includes(`href="/${counterpart}/"`),
    `${route}: language counterpart missing`,
  );
  if (!route.endsWith("theme")) {
    const category = route.slice(0, route.lastIndexOf("/"));
    assert.ok(
      (await text(`${category}/llms.txt`)).includes(
        `${route.split("/").at(-1)}/index.md`,
      ),
      `${route}: llms entry missing`,
    );
  }
}
assert.equal(registry.name, "conteman");
assert.ok(names.has("admin-shell"));
const llms = await text("llms.txt");
assert.ok(llms.includes("ui.conteman.com") && llms.includes("basics/llms.txt"));
assert.ok((await text("basics/llms.txt")).includes("button/index.md"));
assert.ok(
  (await text("data-display/llms.txt")).includes("data-table/index.md"),
);
const skills = JSON.parse(await text(".well-known/agent-skills/index.json"));
assert.ok(JSON.stringify(skills).includes("use-conteman-ui"));
for (const asset of [
  "pagefind-ui.js",
  "pagefind-ui.css",
  "pagefind-component-ui.js",
  "pagefind-component-ui.css",
]) {
  assert.ok(
    !existsSync(new URL(`../dist/pagefind/${asset}`, import.meta.url)),
    `${asset}: unused default search UI must be omitted`,
  );
}
assert.ok((await text("pagefind/pagefind.js")).length > 0);
const scan = async (directory) => {
  for (const entry of await readdir(
    new URL(`../${directory}`, import.meta.url),
    { withFileTypes: true },
  )) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await scan(path);
    else if (/\.(?:tsx?|mdx?|json|css|astro|html|m?js|txt)$/.test(path)) {
      const content = await readFile(
        new URL(`../${path}`, import.meta.url),
        "utf8",
      );
      assert.ok(
        !/\/Users\/|[\w.+-]+@[\w-]+\.[a-z]{2,}|(?:ghp_|github_pat_|sk_live_)[A-Za-z0-9_]{12,}/i.test(
          content,
        ),
        `${path}: private content detected`,
      );
    }
  }
};
for (const directory of ["registry", "src", "public/r", "skills", "dist"])
  await scan(directory);
console.log(
  `Artifact checks passed: ${names.size} registry items, ${routes.length} bilingual pages, dependency graph, generated source, llms, Agent Skill and privacy.`,
);
