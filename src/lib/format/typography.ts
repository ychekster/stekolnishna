/**
 * Russian typography for site copy (user's rule): no preposition or conjunction left
 * hanging at the end of a line, no single short word alone on the last line.
 *
 * Done with non-breaking spaces, so it works in every browser and at every width. CSS
 * `text-wrap: balance / pretty` (globals.css) evens out the lines on top of that.
 * Applied to all content in the content layer (src/lib/content), so copy from the CMS
 * gets it too and editors do not have to type special spaces.
 */

const NBSP = " ";

/**
 * Words glued to the NEXT word: every 1–2 letter word (в, и, к, на, по, за, от, до, не…)
 * plus longer prepositions and conjunctions.
 */
const LONG_GLUE_WORDS = [
  "для",
  "или",
  "при",
  "без",
  "над",
  "под",
  "про",
  "что",
  "как",
  "чем",
  "всё",
  "все",
  "через",
  "перед",
  "между",
  "либо",
  "если",
  "чтобы",
  "когда",
  "после",
];

/** Particles glued to the PREVIOUS word. */
const PARTICLES = ["же", "ли", "бы", "ж", "б"];

const LETTER = "A-Za-zА-Яа-яЁё";

const GLUE_NEXT = new RegExp(
  // Lookbehind, not a captured prefix: in "и в доме" the space before "в" is consumed by
  // the match of "и", and a lookbehind still sees it.
  `(?<=^|[\\s(«"„])([${LETTER}]{1,2}|${LONG_GLUE_WORDS.join("|")})\\s+(?=[${LETTER}\\d«"„(\\[])`,
  "giu",
);
const GLUE_PARTICLE = new RegExp(`\\s+(${PARTICLES.join("|")})(?=$|[\\s.,!?:;)»])`, "giu");
/** Number and the word after it: "1 год", "10 минут", "5 файлов". */
const GLUE_NUMBER = new RegExp(`(\\d)\\s+(?=[${LETTER}₸%])`, "gu");
/** Abbreviations before a name: "г. Алматы", "ул. Абая", "пр. Суюнбая". */
const GLUE_ABBR = new RegExp(`(^|\\s)(г|ул|пр|д|см|мм|м|тел)\\.\\s+`, "giu");

/**
 * Hyphenated words with a short part ("что-то", "из-за", "кто-нибудь") must not break at
 * the hyphen and leave "что-" alone at the end of a line: non-breaking hyphen U+2011.
 */
const SHORT_HYPHENATED = new RegExp(
  `(?<![${LETTER}])([${LETTER}]+)-([${LETTER}]+)(?![${LETTER}])`,
  "gu",
);
const NB_HYPHEN = "‑";
const MAX_HYPHEN_PART = 3;

/** The last word moves to the previous line only while both stay short enough to fit. */
const MAX_WIDOW_WORD = 10;
const MAX_WIDOW_PAIR = 16;
const PARAGRAPH_LENGTH = 80;
const MAX_WIDOW_WORD_PARAGRAPH = 14;
const MAX_WIDOW_PAIR_PARAGRAPH = 26;

/**
 * Short labels (category names in narrow tiles: "Стеклянные двери") are left alone: glued,
 * they could not wrap at all and would overflow. CSS `text-wrap: balance` covers them.
 */
const MIN_WORDS_FOR_WIDOW_RULE = 4;

function glueLastWord(text: string): string {
  if (text.trim().split(/\s+/).length < MIN_WORDS_FOR_WIDOW_RULE) return text;
  const match = /(\S+)[ \t]+(\S+)$/u.exec(text);
  if (!match) return text;
  const [whole, before, last] = match;
  // Compare visible letters only: punctuation does not make a word wider much.
  const length = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, "").length;
  // Long copy is running text in the small body font, where a longer pair still fits a
  // phone line; short copy may be a big heading or a narrow tile.
  const isParagraph = text.length >= PARAGRAPH_LENGTH;
  const maxWord = isParagraph ? MAX_WIDOW_WORD_PARAGRAPH : MAX_WIDOW_WORD;
  const maxPair = isParagraph ? MAX_WIDOW_PAIR_PARAGRAPH : MAX_WIDOW_PAIR;
  if (length(last) > maxWord || length(before) + length(last) > maxPair) {
    return text;
  }
  return text.slice(0, text.length - whole.length) + before + NBSP + last;
}

/** Applies the rules to one piece of copy. Text without spaces comes back unchanged. */
export function typograph(text: string): string {
  if (!/\s/.test(text)) return text;
  const result = text
    .replace(GLUE_NEXT, `$1${NBSP}`)
    .replace(GLUE_PARTICLE, `${NBSP}$1`)
    .replace(GLUE_NUMBER, `$1${NBSP}`)
    .replace(GLUE_ABBR, `$1$2.${NBSP}`)
    .replace(SHORT_HYPHENATED, (whole, left: string, right: string) =>
      Math.min(left.length, right.length) <= MAX_HYPHEN_PART ? left + NB_HYPHEN + right : whole,
    );
  // Paragraphs separated by line breaks each get their own last-word rule.
  return result
    .split("\n")
    .map((line) => glueLastWord(line))
    .join("\n");
}

/** Keys whose values are addresses or identifiers, never shown as running text. */
const SKIP_KEYS = new Set(["href", "src", "url", "slug", "id", "email", "phoneE164"]);

/**
 * Applies `typograph` to every string in a content object (deep), skipping links, paths
 * and identifiers. Returns a new object; the input is not changed.
 */
export function typographDeep<T>(value: T): T {
  return walk(value, undefined) as T;
}

function walk(value: unknown, key: string | undefined): unknown {
  if (typeof value === "string") {
    return key !== undefined && SKIP_KEYS.has(key) ? value : typograph(value);
  }
  if (Array.isArray(value)) return value.map((item) => walk(item, key));
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entry]) => [entryKey, walk(entry, entryKey)]),
    );
  }
  return value;
}
