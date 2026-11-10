/**
 * Rules for photos and drawings attached to an order (spec §4.5: JPG, JPEG, PNG, PDF,
 * size limits, upload safety check).
 *
 * Shared by the browser (instant feedback while picking files) and the server (the real
 * check). The server does not trust the extension or the browser-reported MIME type: it
 * reads the first bytes of each file and accepts only real JPEG, PNG and PDF signatures,
 * so a renamed executable or HTML file is rejected.
 *
 * Limits are our draft (max upload size is an open question, docs/open-questions.md).
 * `serverActions.bodySizeLimit` in next.config.ts must stay above maxFiles × maxFileBytes plus
 * room for the text fields.
 */

export const UPLOAD_LIMITS = {
  maxFiles: 5,
  maxFileBytes: 10 * 1024 * 1024,
  extensions: ["jpg", "jpeg", "png", "pdf"],
} as const;

/** `accept` attribute of the file input. */
export const UPLOAD_ACCEPT = UPLOAD_LIMITS.extensions.map((ext) => `.${ext}`).join(",");

/** Human-readable limits for the drop zone hint: "JPG, JPEG, PNG, PDF, до 10 МБ…". */
export function describeUploadLimits(): string {
  const formats = UPLOAD_LIMITS.extensions.map((ext) => ext.toUpperCase()).join(", ");
  return `${formats}, до ${formatFileSize(UPLOAD_LIMITS.maxFileBytes)}, не больше ${UPLOAD_LIMITS.maxFiles} файлов`;
}

/** "2,1 МБ", "340 КБ" — sizes in the file chips and the hint. */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} КБ`;
  const megabytes = bytes / (1024 * 1024);
  const rounded = Number.isInteger(megabytes) ? String(megabytes) : megabytes.toFixed(1);
  return `${rounded.replace(".", ",")} МБ`;
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

/** What the browser and the server both know about a file before reading its content. */
interface UploadMeta {
  name: string;
  size: number;
}

/**
 * Checks the file list by name and size. Returns a Russian error for the visitor, or null.
 * Empty list is fine: attachments are optional.
 */
export function checkUploadList(files: UploadMeta[]): string | null {
  if (files.length > UPLOAD_LIMITS.maxFiles) {
    return `Можно приложить не больше ${UPLOAD_LIMITS.maxFiles} файлов`;
  }
  for (const file of files) {
    if (!(UPLOAD_LIMITS.extensions as readonly string[]).includes(extensionOf(file.name))) {
      return `Файл «${file.name}»: подходят только JPG, JPEG, PNG и PDF`;
    }
    if (file.size === 0) {
      return `Файл «${file.name}» пустой`;
    }
    if (file.size > UPLOAD_LIMITS.maxFileBytes) {
      return `Файл «${file.name}» больше ${formatFileSize(UPLOAD_LIMITS.maxFileBytes)}`;
    }
  }
  return null;
}

export type SniffedType = "jpeg" | "png" | "pdf";

const SIGNATURES: { type: SniffedType; bytes: number[] }[] = [
  { type: "jpeg", bytes: [0xff, 0xd8, 0xff] },
  { type: "png", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { type: "pdf", bytes: [0x25, 0x50, 0x44, 0x46, 0x2d] }, // "%PDF-"
];

/** Real type of a file by its first bytes ("magic numbers"), or null if not allowed. */
export function sniffFileType(head: Uint8Array): SniffedType | null {
  const match = SIGNATURES.find(({ bytes }) => bytes.every((byte, index) => head[index] === byte));
  return match?.type ?? null;
}

/** Whether the extension agrees with the sniffed content (a PNG named .pdf is suspicious). */
export function extensionMatches(name: string, type: SniffedType): boolean {
  const ext = extensionOf(name);
  return type === "jpeg" ? ext === "jpg" || ext === "jpeg" : ext === type;
}
