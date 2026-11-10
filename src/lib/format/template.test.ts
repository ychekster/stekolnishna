import { describe, expect, it } from "vitest";

import { fillTemplate } from "./template";

describe("fillTemplate", () => {
  it("fills every slot, numbers included", () => {
    expect(fillTemplate("Показано {shown} из {total}", { shown: 6, total: 14 })).toBe(
      "Показано 6 из 14",
    );
  });

  it("fills a slot used twice", () => {
    expect(fillTemplate("{name}: {name}", { name: "Зеркала" })).toBe("Зеркала: Зеркала");
  });

  it("leaves unknown slots visible", () => {
    expect(fillTemplate("{name} в {city}", { name: "Зеркала" })).toBe("Зеркала в {city}");
  });
});
