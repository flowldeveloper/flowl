import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "www");
const files = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  "icon.svg"
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const file of files) {
  await copyFile(join(root, file), join(outDir, file));
}

console.log(`Prepared ${files.length} files in www/`);
