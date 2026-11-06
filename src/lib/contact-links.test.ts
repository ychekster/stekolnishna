import { describe, expect, it } from "vitest";

import { mailtoHref, telegramHref, telHref } from "./contact-links";

describe("contact links", () => {
  it("builds tel links", () => {
    expect(telHref("+77011234567")).toBe("tel:+77011234567");
  });

  it("builds Telegram bot links, with or without a leading @", () => {
    expect(telegramHref("steklo_center_bot")).toBe("https://t.me/steklo_center_bot");
    expect(telegramHref("@steklo_center_bot")).toBe("https://t.me/steklo_center_bot");
  });

  it("adds a deep-link start parameter", () => {
    expect(telegramHref("steklo_center_bot", "zerkala-600x800")).toBe(
      "https://t.me/steklo_center_bot?start=zerkala-600x800",
    );
  });

  it("rejects start parameters Telegram does not accept", () => {
    expect(() => telegramHref("bot", "Зеркало")).toThrow();
    expect(() => telegramHref("bot", "a b")).toThrow();
    expect(() => telegramHref("bot", "x".repeat(65))).toThrow();
  });

  it("builds mailto links", () => {
    expect(mailtoHref("info@example.kz")).toBe("mailto:info@example.kz");
  });
});
