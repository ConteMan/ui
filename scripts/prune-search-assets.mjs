import { rm } from "node:fs/promises";

const unusedAssets = [
  "pagefind-ui.js",
  "pagefind-ui.css",
  "pagefind-component-ui.js",
  "pagefind-component-ui.css",
];

await Promise.all(
  unusedAssets.map((asset) =>
    rm(new URL(`../dist/pagefind/${asset}`, import.meta.url), { force: true }),
  ),
);
console.log("Removed unused default Pagefind UI assets.");
