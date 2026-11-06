import { describe, expect, it } from "vitest";

import { mailtoHref, telHref, whatsappHref } from "./contact-links";

describe("contact links", () => {
  it("builds tel links", () => {
    expect(telHref("+77011234567")).toBe("tel:+77011234567");
  });

  it("builds WhatsApp links without a message", () => {
    expect(whatsappHref("+7 701 123 45 67")).toBe("https://wa.me/77011234567");
  });

  it("encodes a prefilled WhatsApp message", () => {
    expect(whatsappHref("77011234567", "Зеркало 600×800")).toBe(
      "https://wa.me/77011234567?text=%D0%97%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D0%BE%20600%C3%97800",
    );
  });

  it("builds mailto links", () => {
    expect(mailtoHref("info@example.kz")).toBe("mailto:info@example.kz");
  });
});
