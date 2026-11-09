import { describe, expect, it } from "vitest";

import { readCookieConsent, serializeCookieConsent } from "./cookie-consent";

describe("cookie consent", () => {
  it("reads the stored choice among other cookies", () => {
    expect(readCookieConsent("a=1; cookie-consent=necessary; b=2")).toBe("necessary");
    expect(readCookieConsent("cookie-consent=all")).toBe("all");
  });

  it("treats a missing or unknown value as not chosen", () => {
    expect(readCookieConsent("")).toBeNull();
    expect(readCookieConsent("cookie-consent=maybe")).toBeNull();
  });

  it("serializes a site-wide cookie that round-trips", () => {
    const cookie = serializeCookieConsent("all");
    expect(cookie).toContain("Path=/");
    expect(readCookieConsent(cookie.split(";")[0]!)).toBe("all");
  });
});
