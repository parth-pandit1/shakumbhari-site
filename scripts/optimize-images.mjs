/**
 * Image optimization script (Amendment 8).
 *
 * Two modes:
 * 1. Model images: reads from content/incoming-images/<slug>/, trims transparent margins
 *    (adds ~4% padding), resizes to max 1200px wide (no upscale), converts to WebP (quality 82),
 *    strips metadata, writes to public/images/models/<slug>/.
 * 2. General public/images: converts .jpg/.jpeg/.png to WebP (quality 85), strips EXIF.
 *
 * Run manually before deployment: npm run optimize-images
 * Originals in content/incoming-images/ are never modified.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const INCOMING_DIR = path.join(ROOT_DIR, "content", "incoming-images");
const MODELS_OUT_DIR = path.join(ROOT_DIR, "public", "images", "models");
const CUSTOMERS_IN_DIR = path.join(ROOT_DIR, "content", "incoming-images", "customers");
const CUSTOMERS_OUT_DIR = path.join(ROOT_DIR, "public", "images", "customers");
const GENERAL_DIR = path.join(ROOT_DIR, "public", "images");

const MAX_WIDTH = 1200;
const MODEL_QUALITY = 82;
const PADDING_PERCENT = 0.04; // ~4% padding around trimmed content

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function processModelImage(inputPath, outputPath) {
  const tmpPath = path.join(os.tmpdir(), `opt_trim_${Date.now()}_${path.basename(inputPath)}.png`);

  // Step 1: trim and save to a temp PNG (preserves transparency)
  await sharp(inputPath).trim({ threshold: 20 }).png().toFile(tmpPath);

  // Step 2: get trimmed dimensions
  const meta = await sharp(tmpPath).metadata();
  const tw = meta.width ?? 800;
  const th = meta.height ?? 600;

  // Calculate padding
  const pad = Math.round(Math.max(tw, th) * PADDING_PERCENT);
  const targetWidth = Math.min(tw + pad * 2, MAX_WIDTH);

  // Step 3: extend and convert to WebP
  await sharp(tmpPath)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: MODEL_QUALITY })
    .toFile(outputPath);

  // Clean up temp file
  fs.unlinkSync(tmpPath);

  const inKb = Math.round(fs.statSync(inputPath).size / 1024);
  const outKb = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(
    `    ✔ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${inKb}KB → ${outKb}KB, ${targetWidth}px wide)`
  );
}

async function processModelImages() {
  if (!fs.existsSync(INCOMING_DIR)) {
    console.log("No content/incoming-images directory found — skipping model images.");
    return 0;
  }

  const slugDirs = fs
    .readdirSync(INCOMING_DIR)
    .filter((d) => d !== "customers" && fs.statSync(path.join(INCOMING_DIR, d)).isDirectory());

  let count = 0;
  for (const slug of slugDirs) {
    const inDir = path.join(INCOMING_DIR, slug);
    const outDir = path.join(MODELS_OUT_DIR, slug);
    fs.mkdirSync(outDir, { recursive: true });

    const files = fs.readdirSync(inDir).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
    if (files.length === 0) continue;

    console.log(`\n  Model: ${slug}`);
    for (const file of files) {
      const inputPath = path.join(inDir, file);
      const baseName = path.basename(file, path.extname(file));
      const outputPath = path.join(outDir, `${baseName}.webp`);
      await processModelImage(inputPath, outputPath);
      count++;
    }
  }
  return count;
}

async function processCustomerImages() {
  if (!fs.existsSync(CUSTOMERS_IN_DIR)) {
    console.log("No content/incoming-images/customers directory found — skipping customer images.");
    return 0;
  }

  const files = fs.readdirSync(CUSTOMERS_IN_DIR).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
  if (files.length === 0) return 0;

  fs.mkdirSync(CUSTOMERS_OUT_DIR, { recursive: true });
  console.log(`\n  Processing incoming customer photos...`);
  let count = 0;
  for (const file of files) {
    const inputPath = path.join(CUSTOMERS_IN_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(CUSTOMERS_OUT_DIR, `${baseName}.webp`);

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const inKb = Math.round(fs.statSync(inputPath).size / 1024);
    const outKb = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(
      `    ✔ ${file} → ${baseName}.webp (${inKb}KB → ${outKb}KB, max ${MAX_WIDTH}px wide, EXIF stripped)`
    );
    count++;
  }
  return count;
}

async function processGeneralImages() {
  const files = getFilesRecursively(GENERAL_DIR).filter(
    (f) =>
      // Skip the models and customers sub-directories (handled separately) and already-webp files
      !f.includes(path.sep + "models" + path.sep) &&
      !f.includes(path.sep + "customers" + path.sep) &&
      /\.(png|jpe?g)$/i.test(f)
  );

  let count = 0;
  for (const file of files) {
    const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
    const outPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const outRel = path.relative(ROOT_DIR, outPath).replace(/\\/g, "/");
    console.log(`  Processing: ${relPath} → ${outRel}`);
    await sharp(file)
      .webp({ quality: 85 })
      .toFile(outPath + ".tmp");
    fs.renameSync(outPath + ".tmp", outPath);
    count++;
  }
  return count;
}

async function run() {
  console.log("=================================================");
  console.log("  Image Optimization (Models + Customers + Gen)  ");
  console.log("=================================================\n");

  console.log("→ Processing model images from content/incoming-images/...");
  const modelCount = await processModelImages();

  console.log("\n→ Processing customer images from content/incoming-images/customers/...");
  const customerCount = await processCustomerImages();

  console.log("\n→ Processing general images in public/images/ (non-model, non-customer)...");
  const generalCount = await processGeneralImages();

  console.log(
    `\n✔ Done. ${modelCount} model image(s), ${customerCount} customer image(s), and ${generalCount} general image(s) processed.\n`
  );
}

run().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});
