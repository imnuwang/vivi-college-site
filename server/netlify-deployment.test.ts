import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { products, tools } from "../client/src/data/catalog";

const source = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("Netlify 上架準備", () => {
  it("uses GitHub-tracked static assets instead of Manus storage paths", () => {
    const catalog = source("client/src/data/catalog.ts");

    expect(catalog).toContain("raw.githubusercontent.com/imnuwang/vivi-college-site/master/netlify-assets");
    expect(catalog).not.toContain('"/manus-storage/');
    expect(tools.every((tool) => tool.downloadUrl.includes("netlify-assets/downloads/"))).toBe(true);
  });

  it("keeps the evening ritual package PDF-only and ships SPA Netlify settings", () => {
    const product = products.find((item) => item.id === "energy-reset-kit");
    const config = source("netlify.toml");
    const guide = source("NETLIFY_DEPLOYMENT.md");

    expect(product?.detail).toBe("引導卡與晚間紀錄頁 PDF。");
    expect(product?.detail).not.toContain("音檔");
    expect(config).toContain('command = "pnpm vite build"');
    expect(config).toContain('publish = "dist/public"');
    expect(config).toContain('from = "/*"');
    expect(guide).toContain("AI 塔羅的重要限制");
    expect(guide).toContain("#PASTE_GOOGLE_DRIVE_LINK_HERE");
  });
});
