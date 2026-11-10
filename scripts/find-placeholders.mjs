/**
 * Lists what is still missing in the site content (src/content): visible [bracket]
 * placeholders, missing photos (`image: null` and similar), draft prices and demo files
 * (`demo-*.ts`: content written for the design review, never for the live site). This is the
 * measure of "content is ready": before the admin panel and the launch it should print
 * nothing, or only exceptions the customer agreed to.
 *
 *   node scripts/find-placeholders.mjs            # summary per file
 *   node scripts/find-placeholders.mjs --details  # every line
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIR = join(import.meta.dirname, "..", "src", "content");

// "[1 200]", "[Имя Фамилия]", "[N]", "[SEO-текст…]"; not TypeScript array literals like
// "[]", "[item]" or "[...rest]" (content code has no capitalised identifiers in brackets).
const BRACKET = /\[[0-9A-ZА-Яа-яЁё+][^\]\n]*\]/g;
const MISSING_MEDIA = /\b(image|cover|avatar|logo|ogImage|embedUrl): null\b/g;
// Product galleries may be empty (the card photo is enough), so only `photos` counts.
const EMPTY_GALLERY = /\bphotos: \[\]/g;
const DRAFT_PRICE = /draft: true/g;

const details = process.argv.includes("--details");
const rows = [];
const demoFiles = [];

for (const file of readdirSync(CONTENT_DIR)
  .filter((name) => name.endsWith(".ts"))
  .sort()) {
  if (file.startsWith("demo-")) demoFiles.push(file);
  const lines = readFileSync(join(CONTENT_DIR, file), "utf8").split("\n");
  const found = { brackets: 0, media: 0, drafts: 0, lines: [] };
  lines.forEach((line, index) => {
    if (line.trimStart().startsWith("*") || line.trimStart().startsWith("//")) return;
    const brackets = line.match(BRACKET)?.length ?? 0;
    const media =
      (line.match(MISSING_MEDIA)?.length ?? 0) + (line.match(EMPTY_GALLERY)?.length ?? 0);
    const drafts = line.match(DRAFT_PRICE)?.length ?? 0;
    if (brackets + media + drafts === 0) return;
    found.brackets += brackets;
    found.media += media;
    found.drafts += drafts;
    found.lines.push(`  ${index + 1}: ${line.trim().slice(0, 140)}`);
  });
  if (found.lines.length > 0) rows.push({ file, ...found });
}

if (demoFiles.length > 0) {
  console.log(`Demo content to replace before launch: ${demoFiles.join(", ")}\n`);
}

if (rows.length === 0) {
  console.log("No placeholders left in src/content.");
  process.exit(0);
}

const total = { brackets: 0, media: 0, drafts: 0 };
for (const row of rows) {
  total.brackets += row.brackets;
  total.media += row.media;
  total.drafts += row.drafts;
  console.log(
    `${row.file.padEnd(20)} [..] ${String(row.brackets).padStart(3)}   no photo ${String(row.media).padStart(3)}   draft price ${String(row.drafts).padStart(3)}`,
  );
  if (details) console.log(row.lines.join("\n"));
}
console.log(
  `${"total".padEnd(20)} [..] ${String(total.brackets).padStart(3)}   no photo ${String(total.media).padStart(3)}   draft price ${String(total.drafts).padStart(3)}`,
);
