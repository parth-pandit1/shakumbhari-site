/**
 * Placeholder guard script (Amendment 14).
 *
 * Loads environment variables via @next/env (including .env.local).
 * Scans /content and /src for the string "[PLACEHOLDER]".
 *
 * If NEXT_PUBLIC_ALLOW_INDEXING === "true" and placeholders are found:
 *   Fails the build (exits with code 1).
 * If NEXT_PUBLIC_ALLOW_INDEXING !== "true":
 *   Prints a visible warning and exits with code 0.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { loadEnvConfig } = require("@next/env");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Load env configuration (picks up .env, .env.local, .env.production, etc.)
loadEnvConfig(ROOT_DIR);

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
const previewSections = process.env.NEXT_PUBLIC_PREVIEW_SECTIONS === "true";

if (allowIndexing && previewSections) {
  console.error(
    "FATAL: NEXT_PUBLIC_PREVIEW_SECTIONS cannot be 'true' when NEXT_PUBLIC_ALLOW_INDEXING is 'true'. Build failed."
  );
  process.exit(1);
}

const TARGET_DIRS = ["content", "src"];
const PLACEHOLDER_PATTERN = /\[PLACEHOLDER/i;

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const foundPlaceholders = [];

for (const dirName of TARGET_DIRS) {
  const fullDir = path.join(ROOT_DIR, dirName);
  const files = getFilesRecursively(fullDir);

  for (const file of files) {
    // Only scan text-based files
    if (/\.(json|ts|tsx|js|jsx|md|mdx|css)$/.test(file)) {
      try {
        const content = fs.readFileSync(file, "utf-8");
        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (PLACEHOLDER_PATTERN.test(lines[i])) {
            const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
            foundPlaceholders.push({
              file: relPath,
              line: i + 1,
              text: lines[i].trim(),
            });
          }
        }
      } catch {
        // Skip unreadable files
      }
    }
  }
}

console.log("=================================================");
console.log("  Placeholder Guard Check (Amendment 14)         ");
console.log(`  NEXT_PUBLIC_ALLOW_INDEXING: ${process.env.NEXT_PUBLIC_ALLOW_INDEXING || "false"}`);
console.log("=================================================\n");

if (foundPlaceholders.length === 0) {
  console.log("\x1b[32m✔ No placeholders found in /content or /src.\x1b[0m\n");
  process.exit(0);
}

console.log(`Found ${foundPlaceholders.length} placeholder occurrence(s):`);
for (const p of foundPlaceholders) {
  console.log(`  \x1b[33m${p.file}:${p.line}\x1b[0m - "${p.text}"`);
}
console.log("");

if (allowIndexing) {
  console.error(
    "\x1b[31m✖ BUILD FAILED: NEXT_PUBLIC_ALLOW_INDEXING is true but [PLACEHOLDER] entries exist.\x1b[0m"
  );
  console.error(
    "  All placeholders must be replaced with confirmed business content before public launch.\n"
  );
  process.exit(1);
} else {
  console.log(
    "\x1b[33m⚠ WARNING: Site contains placeholders. Search indexing is disabled (safe for pre-launch).\x1b[0m\n"
  );
  process.exit(0);
}
