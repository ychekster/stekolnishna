import { describe, expect, it } from "vitest";

import { consumeRateLimit } from "./rate-limit";

describe("consumeRateLimit", () => {
  const options = { limit: 2, windowMs: 1000 };

  it("allows requests up to the limit, then blocks", () => {
    expect(consumeRateLimit("ip-a", options, 0)).toBe(true);
    expect(consumeRateLimit("ip-a", options, 10)).toBe(true);
    expect(consumeRateLimit("ip-a", options, 20)).toBe(false);
  });

  it("resets after the window", () => {
    expect(consumeRateLimit("ip-b", options, 0)).toBe(true);
    expect(consumeRateLimit("ip-b", options, 0)).toBe(true);
    expect(consumeRateLimit("ip-b", options, 1000)).toBe(true);
  });

  it("tracks keys independently", () => {
    expect(consumeRateLimit("ip-c", { limit: 1, windowMs: 1000 }, 0)).toBe(true);
    expect(consumeRateLimit("ip-d", { limit: 1, windowMs: 1000 }, 0)).toBe(true);
  });
});
