import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const target = path.resolve(process.argv[2] ?? "");
const origin = process.argv[3] ?? "https://ui.conteman.com";
if (!process.argv[2] || target === root || target.startsWith(root + path.sep))
  throw new Error("Provide a fresh directory outside the repository.");
await mkdir(target, { recursive: true });
if ((await readdir(target)).length)
  throw new Error("Consumer directory must be empty.");
const registry = JSON.parse(
  await readFile(new URL("../registry.json", import.meta.url), "utf8"),
);
const files = {
  "package.json": JSON.stringify(
    {
      name: "registry-consumer",
      private: true,
      type: "module",
      scripts: { build: "tsc --noEmit && vite build" },
      dependencies: { react: "19.3.1", "react-dom": "19.3.1" },
      devDependencies: {
        vite: "8.3.7",
        "@vitejs/plugin-react": "6.1.2",
        typescript: "7.0.2",
        "@types/react": "19.3.0",
        "@types/react-dom": "19.3.0",
        tailwindcss: "4.3.5",
        "@tailwindcss/vite": "4.3.5",
      },
    },
    null,
    2,
  ),
  "components.json": JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "base-lyra",
      rsc: false,
      tsx: true,
      tailwind: {
        config: "",
        css: "src/styles.css",
        baseColor: "neutral",
        cssVariables: true,
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
      registries: { "@conteman": `${origin}/r/{name}.json` },
    },
    null,
    2,
  ),
  "tsconfig.json": JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        types: ["vite/client"],
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        noEmit: true,
        paths: { "@/*": ["./src/*"] },
      },
      include: ["src"],
    },
    null,
    2,
  ),
  "vite.config.mjs":
    'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport tailwind from "@tailwindcss/vite";\nexport default defineConfig({plugins:[react(),tailwind()],resolve:{alias:{"@":new URL("./src",import.meta.url).pathname}}});\n',
  "index.html":
    '<html lang="en"><head><title>Registry consumer</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
  "src/main.tsx":
    'import { createRoot } from "react-dom/client";\nimport { Button } from "@/components/ui/button";\nimport "./styles.css";\ncreateRoot(document.getElementById("root")!).render(<Button>Consumer installation verified</Button>);\n',
  "src/styles.css":
    '@import "tailwindcss";\n@custom-variant dark (&:is(.dark *));\n',
};
for (const [file, content] of Object.entries(files)) {
  await mkdir(path.dirname(path.join(target, file)), { recursive: true });
  await writeFile(path.join(target, file), content + "\n");
}
await mkdir(path.join(target, "logs"));
const run = (command, args, logName) =>
  new Promise((resolve, reject) => {
    const stream = createWriteStream(path.join(target, "logs", logName));
    const child = spawn(command, args, {
      cwd: target,
      env: { ...process.env, CI: "true" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout.pipe(stream);
    child.stderr.pipe(stream);
    child.on("error", reject);
    child.on("close", (code) => {
      stream.end();
      code === 0
        ? resolve()
        : reject(new Error(`${command} failed (${code}); see ${logName}`));
    });
  });
await run("pnpm", ["install"], "install.log");
const results = [];
for (const [index, item] of registry.items.entries()) {
  console.log(`[${index + 1}/${registry.items.length}] @conteman/${item.name}`);
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await run(
        "npx",
        [
          "--yes",
          "shadcn@4.23.0",
          "add",
          `@conteman/${item.name}`,
          "--yes",
          "--overwrite",
        ],
        `add-${item.name}-${attempt}.log`,
      );
      break;
    } catch (error) {
      if (attempt === 3) throw error;
      console.log(`Retrying @conteman/${item.name} after attempt ${attempt}`);
    }
  }
  results.push({ name: item.name, installed: true });
  await writeFile(
    path.join(target, "logs/results.json"),
    JSON.stringify(results, null, 2),
  );
}
await run("pnpm", ["build"], "build.log");
console.log(`Consumer verified: ${results.length} items installed and built.`);
