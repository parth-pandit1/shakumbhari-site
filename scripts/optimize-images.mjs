/**
 * Image optimization script (Amendment 8).
 *
 * Scans public/images for .png, .jpg, .jpeg images.
 * Converts them to WebP and strips EXIF metadata for privacy.
 * Run manually before deployment: npm run optimize-images
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT_DIR, "public", "images");

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

async function run() {
  console.log("=================================================");
  console.log("  Image Optimization & Privacy Metadata Stripping ");
  console.log("=================================================\n");

  const files = getFilesRecursively(IMAGES_DIR);
  let processedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
      const outPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
      const outRel = path.relative(ROOT_DIR, outPath).replace(/\\/g, "/");

      console.log(`Processing: ${relPath} -> ${outRel}`);
      // Sharp strips metadata/EXIF by default unless .withMetadata() is specified
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(outPath + ".tmp");

      fs.renameSync(outPath + ".tmp", outPath);
      processedCount++;
    }
  }

  console.log(`\n✔ Successfully processed and stripped EXIF from ${processedCount} image(s).\n`);
}

run().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});
