import { describe, expect, it } from "vitest";

import { sampleNumber, sampleReference } from "./drawings";

describe("drawing samples", () => {
  it("numbers samples from 01 in their set", () => {
    expect(sampleNumber(0)).toBe("01");
    expect(sampleNumber(98)).toBe("99");
    expect(sampleReference("Цветы", 6)).toBe("Цветы, № 07");
  });
});
