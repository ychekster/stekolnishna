import { describe, expect, it } from "vitest";

import { callbackFormSchema, readCallbackForm } from "./callback-schema";
import { orderFormSchema, readOrderFiles, readOrderForm } from "./order-schema";

const form = (entries: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
};

describe("order form validation", () => {
  it("accepts a full order and defaults the quantity to 1", () => {
    const result = orderFormSchema.safeParse(
      readOrderForm(
        form({
          phone: "+7 701 123 45 67",
          productType: "Зеркала и панно",
          size: "1200 × 2000",
          details: "Фацет 15 мм",
          consent: "on",
        }),
      ),
    );
    expect(result.success).toBe(true);
    expect(result.data).toMatchObject({ phone: "+77011234567", quantity: 1 });
  });

  it("rejects a bad quantity and a missing consent", () => {
    const result = orderFormSchema.safeParse(
      readOrderForm(form({ phone: "7011234567", quantity: "0" })),
    );
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(
      expect.arrayContaining(["quantity", "consent"]),
    );
  });

  it("ignores the empty file an untouched file input sends", () => {
    const data = new FormData();
    data.append("files", new File([], ""));
    data.append("files", new File(["%PDF-"], "a.pdf"));
    expect(readOrderFiles(data).map((file) => file.name)).toEqual(["a.pdf"]);
  });
});

describe("callback form validation", () => {
  it("accepts name, phone and time", () => {
    const result = callbackFormSchema.safeParse(
      readCallbackForm(
        form({ name: "Ерлан", phone: "87011234567", preferredTime: "Завтра", consent: "on" }),
      ),
    );
    expect(result.success).toBe(true);
  });

  it("requires a phone and consent", () => {
    const result = callbackFormSchema.safeParse(readCallbackForm(form({})));
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(
      expect.arrayContaining(["phone", "consent"]),
    );
  });
});
