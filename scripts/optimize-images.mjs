/**
 * `npm run images`: converts site photos in public/images to WebP and drops the originals.
 *
 * Why: photos arrive as JPG/PNG (stock, generated, customer exports) and are several times
 * larger than WebP of the same visual quality. next/image re-encodes on request anyway, but a
 * small source keeps the repository, the deploy and the image optimizer fast. Run it after
 * adding photos, then update the paths in src/content (`.jpg` → `.webp`).
 *
 * Kept as is: `og.jpg` (some messengers do not show WebP link previews). Photos larger than
 * MAX_SIDE are scaled down: no layout shows an image wider than ~1400 CSS px, so 2000 px
 * covers 1.5× displays.
 *
 *   node scripts/optimize-images.mjs          # convert and delete originals
 *   node scripts/optimize-images.mjs --dry    # only list what would change
 */
import { readdirSync, readFileSync, statSync, unlinkSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..", "public", "images");
const MAX_SIDE = 2000;
const QUALITY = 80;
const KEEP = new Set(["og.jpg"]);
const SOURCE = /\.(jpe?g|png)$/i;

const dry = process.argv.includes("--dry");

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (SOURCE.test(entry.name) && !KEEP.has(entry.name)) yield path;
  }
}

let count = 0;
let before = 0;
let after = 0;
for (const source of walk(ROOT)) {
  const target = source.replace(SOURCE, ".webp");
  count += 1;
  before += statSync(source).size;
  if (dry) {
    console.log(relative(ROOT, source));
    continue;
  }
  // Read into memory first: on Windows sharp keeps the source file open, and it can't be deleted.
  await sharp(readFileSync(source))
    .rotate() // apply EXIF orientation before the metadata is stripped
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(target);
  after += statSync(target).size;
  unlinkSync(source);
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(
  dry
    ? `${count} file(s) would be converted (${mb(before)} MB).`
    : `${count} file(s) converted: ${mb(before)} MB → ${mb(after)} MB.`,
);
