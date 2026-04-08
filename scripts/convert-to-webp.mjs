#!/usr/bin/env node
/**
 * Convert all PNG/JPG images in public/images/ to WebP format.
 * Keeps the originals so you can verify before deleting.
 *
 * Usage:  node scripts/convert-to-webp.mjs
 * Requires: npm install sharp (dev dependency)
 */

import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IMAGES_DIR = join(__dirname, "..", "public", "images");
const QUALITY = 80; // WebP quality (0-100)

const CONVERTIBLE_EXTS = new Set([".png", ".jpg", ".jpeg"]);

async function convertImages() {
  const files = await readdir(IMAGES_DIR);
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!CONVERTIBLE_EXTS.has(ext)) {
      skipped++;
      continue;
    }

    const inputPath = join(IMAGES_DIR, file);
    const outputName = basename(file, ext) + ".webp";
    const outputPath = join(IMAGES_DIR, outputName);

    // Skip if webp already exists
    try {
      await stat(outputPath);
      console.log(`⏭  Already exists: ${outputName}`);
      skipped++;
      continue;
    } catch {
      // File doesn't exist, proceed with conversion
    }

    const inputStat = await stat(inputPath);
    const inputSize = (inputStat.size / 1024).toFixed(1);

    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);

    const outputStat = await stat(outputPath);
    const outputSize = (outputStat.size / 1024).toFixed(1);
    const savings = (
      ((1 - outputStat.size / inputStat.size) * 100).toFixed(1)
    );

    console.log(
      `✅ ${file} (${inputSize}KB) → ${outputName} (${outputSize}KB) — ${savings}% smaller`
    );
    converted++;
  }

  console.log(`\nDone! Converted: ${converted}, Skipped: ${skipped}`);
  console.log(
    "Original PNG/JPG files kept. Delete them manually after verifying."
  );
}

convertImages().catch(console.error);
