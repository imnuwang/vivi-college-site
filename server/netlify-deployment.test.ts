import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { freeResources, tools } from "../client/src/data/catalog";

const source = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("Netlify 上架準備", () => {
  it("uses GitHub-tracked static assets instead of Manus storage paths", () => {
    const catalog = source("client/src/data/catalog.ts");

    expect(catalog).toContain("raw.githubusercontent.com/imnuwang/vivi-college-site/master/netlify-assets");
    expect(catalog).not.toContain('"/manus-storage/');
    expect(tools.every((tool) => tool.downloadUrl.includes("netlify-assets/downloads/"))).toBe(true);
  });

  it("ships free resources without paid-download placeholders and keeps SPA Netlify settings", () => {
    const resource = freeResources.find((item) => item.id === "energy-reset-kit");
    const config = source("netlify.toml");
    const guide = source("NETLIFY_DEPLOYMENT.md");
    const app = source("client/src/App.tsx");

    expect(resource?.detail).toContain("三步驟晚間收尾");
    expect(freeResources.every((item) => !("paymentUrl" in item))).toBe(true);
    expect(config).toContain('command = "pnpm vite build"');
    expect(config).toContain('publish = "dist/public"');
    expect(config).toContain('from = "/*"');
    expect(guide).toContain("AI 塔羅的重要限制");
    expect(app).not.toContain("DownloadPage");
    expect(app).not.toContain('/download/:productId');
  });
});
