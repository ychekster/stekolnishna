import { describe, expect, it } from "vitest";

import {
  checkUploadList,
  describeUploadLimits,
  extensionMatches,
  formatFileSize,
  sniffFileType,
  UPLOAD_LIMITS,
} from "./uploads";

const MB = 1024 * 1024;

describe("checkUploadList", () => {
  it("accepts no files and allowed files within limits", () => {
    expect(checkUploadList([])).toBeNull();
    expect(
      checkUploadList([
        { name: "zamer.JPG", size: 2 * MB },
        { name: "chertezh.pdf", size: 340 * 1024 },
      ]),
    ).toBeNull();
  });

  it("rejects too many files", () => {
    const files = Array.from({ length: UPLOAD_LIMITS.maxFiles + 1 }, (_, i) => ({
      name: `${i}.png`,
      size: 10,
    }));
    expect(checkUploadList(files)).toMatch(/не больше 5/);
  });

  it("rejects other formats, empty and oversized files", () => {
    expect(checkUploadList([{ name: "virus.exe", size: 10 }])).toMatch(/JPG/);
    expect(checkUploadList([{ name: "noext", size: 10 }])).toMatch(/JPG/);
    expect(checkUploadList([{ name: "a.png", size: 0 }])).toMatch(/пустой/);
    expect(checkUploadList([{ name: "a.png", size: 10 * MB + 1 }])).toMatch(/больше 10 МБ/);
  });
});

describe("sniffFileType", () => {
  it("recognizes JPEG, PNG and PDF by their first bytes", () => {
    expect(sniffFileType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe("jpeg");
    expect(sniffFileType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0]))).toBe(
      "png",
    );
    expect(sniffFileType(new TextEncoder().encode("%PDF-1.7"))).toBe("pdf");
  });

  it("rejects anything else, e.g. HTML renamed to .jpg", () => {
    expect(sniffFileType(new TextEncoder().encode("<html>"))).toBeNull();
    expect(sniffFileType(new Uint8Array([]))).toBeNull();
  });
});

describe("extensionMatches", () => {
  it("requires the extension to agree with the content", () => {
    expect(extensionMatches("a.jpeg", "jpeg")).toBe(true);
    expect(extensionMatches("a.JPG", "jpeg")).toBe(true);
    expect(extensionMatches("a.pdf", "png")).toBe(false);
  });
});

describe("formatting", () => {
  it("formats sizes the Russian way", () => {
    expect(formatFileSize(340 * 1024)).toBe("340 КБ");
    expect(formatFileSize(2.1 * MB)).toBe("2,1 МБ");
    expect(formatFileSize(10 * MB)).toBe("10 МБ");
    expect(formatFileSize(100)).toBe("1 КБ");
  });

  it("describes the limits for the drop zone", () => {
    expect(describeUploadLimits()).toBe("JPG, JPEG, PNG, PDF, до 10 МБ, не больше 5 файлов");
  });
});
