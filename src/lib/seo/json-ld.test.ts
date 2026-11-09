import { describe, expect, it } from "vitest";

import { faqPageJsonLd, serializeJsonLd } from "./json-ld";

describe("json-ld", () => {
  it("builds a FAQPage", () => {
    const data = faqPageJsonLd([{ question: "Сколько?", answer: "От 7 дней" }]);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity[0]).toMatchObject({
      name: "Сколько?",
      acceptedAnswer: { text: "От 7 дней" },
    });
  });

  it("escapes < so a value cannot close the script tag", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("</script>");
  });
});
