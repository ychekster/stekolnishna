import { describe, expect, it } from "vitest";

import { leadFormSchema, readLeadForm } from "./schema";

const form = (entries: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
};

describe("lead form validation", () => {
  it("accepts a valid submission and normalizes the phone", () => {
    const result = leadFormSchema.safeParse(
      readLeadForm(
        form({ name: " Айгерим ", phone: "8 701 123 45 67", task: "Душевая", consent: "on" }),
      ),
    );
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      name: "Айгерим",
      phone: "+77011234567",
      task: "Душевая",
      consent: true,
    });
  });

  it("requires a phone", () => {
    const result = leadFormSchema.safeParse(readLeadForm(form({ consent: "on" })));
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toContain("phone");
  });

  it("rejects an invalid phone", () => {
    const result = leadFormSchema.safeParse(readLeadForm(form({ phone: "123", consent: "on" })));
    expect(result.success).toBe(false);
  });

  it("requires personal data consent", () => {
    const result = leadFormSchema.safeParse(readLeadForm(form({ phone: "7011234567" })));
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toContain("consent");
  });
});
