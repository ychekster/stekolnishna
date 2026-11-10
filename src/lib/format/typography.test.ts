/** Tests for the Russian typography rules applied to all site copy. */
import { describe, expect, it } from "vitest";

import { typograph, typographDeep } from "./typography";

const NBSP = "\u00a0";

describe("typograph", () => {
  it("keeps short prepositions and conjunctions with the next word", () => {
    expect(typograph("Душевые и зеркала на заказ в Алматы по вашим размерам")).toBe(
      `Душевые и${NBSP}зеркала на${NBSP}заказ в${NBSP}Алматы по${NBSP}вашим${NBSP}размерам`,
    );
  });

  it("handles a chain of short words", () => {
    expect(typograph("стекло и в доме, и в офисе").includes(`и${NBSP}в${NBSP}доме`)).toBe(true);
  });

  it("glues longer prepositions and conjunctions", () => {
    expect(typograph("Стекло для душевой или кухни")).toContain(`для${NBSP}душевой`);
    expect(typograph("Стекло для душевой или кухни")).toContain(`или${NBSP}кухни`);
  });

  it("keeps a number with its unit", () => {
    expect(typograph("Гарантия 1 год на монтаж")).toContain(`1${NBSP}год`);
  });

  it("keeps an abbreviation with the name", () => {
    expect(typograph("Адрес: г. Алматы, ул. Абая")).toContain(`г.${NBSP}Алматы`);
  });

  it("glues particles to the previous word", () => {
    expect(typograph("Сделаем так же быстро")).toContain(`так${NBSP}же`);
  });

  it("does not break a hyphenated word with a short part", () => {
    expect(typograph("если что-то не так")).toContain("что‑то");
    expect(typograph("Стекло-триплекс и стеклопакет")).toContain("Стекло-триплекс");
  });

  it("keeps a short last word with the previous one", () => {
    expect(typograph("Резка стекла по размерам клиента")).toMatch(/размерам\u00a0клиента$/);
  });

  it("leaves short labels breakable", () => {
    expect(typograph("Стеклянные двери")).toBe("Стеклянные двери");
  });

  it("leaves a long last pair breakable", () => {
    expect(typograph("Изготовление стеклянных конструкций")).toBe(
      "Изготовление стеклянных конструкций",
    );
  });

  it("does not touch text without spaces", () => {
    expect(typograph("Бесплатно")).toBe("Бесплатно");
  });

  it("does not glue words inside other words", () => {
    expect(typograph("Пионер стекла")).toBe("Пионер стекла");
    expect(typograph("Окно стоит недорого сегодня")).not.toContain(`но${NBSP}`);
  });
});

describe("typographDeep", () => {
  it("processes nested strings but skips links and identifiers", () => {
    const input = {
      title: "Стекло в Алматы",
      link: { label: "Все работы и проекты", href: "/a b" },
      items: [{ slug: "a b", text: "и в доме" }],
      count: 3,
    };
    const result = typographDeep(input);
    expect(result.title).toBe(`Стекло в${NBSP}Алматы`);
    expect(result.link.href).toBe("/a b");
    expect(result.items[0]?.slug).toBe("a b");
    expect(result.count).toBe(3);
    expect(input.title).toBe("Стекло в Алматы");
  });
});
