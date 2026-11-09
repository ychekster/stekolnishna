import { describe, expect, it } from "vitest";

import { isActiveRoute, routes } from "./routes";

describe("isActiveRoute", () => {
  it("matches the homepage only exactly", () => {
    expect(isActiveRoute(routes.home, "/")).toBe(true);
    expect(isActiveRoute(routes.home, "/katalog")).toBe(false);
  });

  it("matches a section and its subpages", () => {
    expect(isActiveRoute(routes.catalog, "/katalog")).toBe(true);
    expect(isActiveRoute(routes.catalog, "/katalog/zerkala")).toBe(true);
  });

  it("does not match a different section with a shared prefix", () => {
    expect(isActiveRoute(routes.catalog, "/katalog-old")).toBe(false);
    expect(isActiveRoute(routes.services, "/katalog")).toBe(false);
  });
});

describe("routes", () => {
  it("builds project URLs and links legal anchors to one page", () => {
    expect(routes.project("ofis")).toBe("/nashi-raboty/ofis");
    expect(routes.privacyPolicy.startsWith(`${routes.legal}#`)).toBe(true);
    expect(routes.cookiePolicy.startsWith(`${routes.legal}#`)).toBe(true);
  });
});
