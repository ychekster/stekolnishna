import { describe, expect, it } from "vitest";

import { formatPrice } from "./price";

// Intl uses a narrow no-break space as the thousands separator in ru-RU.
const normalize = (value: string) => value.replace(/[  ]/g, " ");

describe("formatPrice", () => {
  it("formats a price per piece", () => {
    expect(normalize(formatPrice({ kind: "from", amount: 25000, unit: "piece" }))).toBe(
      "от 25 000 ₸",
    );
  });

  it("adds the unit suffix", () => {
    expect(normalize(formatPrice({ kind: "from", amount: 9500, unit: "m2" }))).toBe(
      "от 9 500 ₸/м²",
    );
    expect(normalize(formatPrice({ kind: "from", amount: 12000, unit: "linear-m" }))).toBe(
      "от 12 000 ₸/м.п.",
    );
  });

  it("shows a visible placeholder when the amount is not set", () => {
    expect(normalize(formatPrice({ kind: "from", amount: null, unit: "m2" }))).toBe(
      "от [цена] ₸/м²",
    );
  });

  it("brackets an unconfirmed (draft) amount", () => {
    expect(normalize(formatPrice({ kind: "from", amount: 4500, unit: "m2", draft: true }))).toBe(
      "от [4 500] ₸/м²",
    );
  });

  it("handles individually priced items", () => {
    expect(formatPrice({ kind: "individual" })).toBe("Цена рассчитывается индивидуально");
  });
});
