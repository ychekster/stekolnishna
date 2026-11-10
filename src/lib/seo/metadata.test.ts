import { describe, expect, it } from "vitest";

import { recordSeo } from "./metadata";

const fallback = { title: "{name} | {company}", description: "{name}: {summary}" };
const values = { name: "Зеркала", summary: "по размеру", company: "Стекло&Центр" };

describe("recordSeo", () => {
  it("fills the fallback when the record has no seo", () => {
    expect(recordSeo(null, fallback, values)).toEqual({
      title: "Зеркала | Стекло&Центр",
      description: "Зеркала: по размеру",
    });
  });

  it("keeps the record's own title and description", () => {
    const own = { title: "Свой заголовок", description: "Своё описание" };
    expect(recordSeo(own, fallback, values)).toEqual(own);
  });

  it("falls back field by field when one of them is empty", () => {
    expect(recordSeo({ title: "Свой", description: "" }, fallback, values).description).toBe(
      "Зеркала: по размеру",
    );
  });
});
