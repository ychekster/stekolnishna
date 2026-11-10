/**
 * Integrity of the content the getters return: every local image path points to an existing
 * file in public/. Catches typos and photos renamed or converted (e.g. to WebP) without
 * updating src/content. Goes away with the local content once Payload serves the media.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import * as content from "./index";

const PUBLIC_DIR = join(process.cwd(), "public");

/** Every `src: "/…"` value anywhere inside the value. */
function localImagePaths(value: unknown, found = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) localImagePaths(item, found);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "src" && typeof item === "string" && item.startsWith("/")) found.add(item);
      else localImagePaths(item, found);
    }
  }
  return found;
}

describe("content images", () => {
  it("exist in public/", async () => {
    // Getters without arguments return whole pages or collections.
    const getters = (Object.values(content) as unknown[]).filter(
      (getter): getter is () => Promise<unknown> =>
        typeof getter === "function" && getter.length === 0,
    );
    const paths = new Set<string>();
    for (const getter of getters) localImagePaths(await getter(), paths);

    expect(paths.size).toBeGreaterThan(0);
    const missing = [...paths].filter((path) => !existsSync(join(PUBLIC_DIR, path)));
    expect(missing).toEqual([]);
  });
});
