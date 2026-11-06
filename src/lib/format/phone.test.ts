import { describe, expect, it } from "vitest";

import { normalizeKzPhone } from "./phone";

describe("normalizeKzPhone", () => {
  it.each([
    ["+7 (701) 123-45-67", "+77011234567"],
    ["8 701 123 45 67", "+77011234567"],
    ["77011234567", "+77011234567"],
    ["7011234567", "+77011234567"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizeKzPhone(input)).toBe(expected);
  });

  it.each(["", "12345", "+1 202 555 0143", "9 701 123 45 67", "+7 701 123 45 678"])(
    "rejects %s",
    (input) => {
      expect(normalizeKzPhone(input)).toBeNull();
    },
  );
});
