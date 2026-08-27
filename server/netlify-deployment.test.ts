import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { freeResources, tools } from "../client/src/data/catalog";

const source = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("Netlify 上架準備", () => {
  it("uses bundled public assets instead of remote raw or Manus storage paths", () => {
    const catalog = source("client/src/data/catalog.ts");

    expect(catalog).toContain('const publicAssetBase = "/assets"');
    expect(catalog).not.toContain("raw.githubusercontent.com");
    expect(catalog).not.toContain('"/manus-storage/');
    expect(
      tools.every(tool => tool.downloadUrl.startsWith("/assets/downloads/"))
    ).toBe(true);
  });

  it("ships free resources without paid-download placeholders and keeps SPA Netlify settings", () => {
    const resource = freeResources.find(item => item.id === "energy-reset-kit");
    const config = source("netlify.toml");
    const guide = source("NETLIFY_DEPLOYMENT.md");
    const app = source("client/src/App.tsx");
    const packageJson = source("package.json");
    const generator = source("scripts/generate-static-routes.mjs");
    const notFound = source("client/public/404.html");

    expect(resource?.detail).toContain("三步驟晚間收尾");
    expect(freeResources.every(item => !("paymentUrl" in item))).toBe(true);
    expect(config).toContain('command = "pnpm build"');
    expect(config).toContain('publish = "dist/client"');
    expect(config).toContain('from = "/*"');
    expect(config).toContain('to = "/404.html"');
    expect(config).toContain("status = 404");
    expect(packageJson).toContain(
      '"postbuild": "node scripts/generate-static-routes.mjs"'
    );
    expect(generator).toContain('"/journal/from-top-sales-to-healing"');
    expect(generator).toContain('"/energy-cards"');
    expect(generator).toContain('"/policies"');
    expect(notFound).toContain('content="noindex,follow"');
    expect(guide).toContain("不是 AI 即時解讀");
    expect(app).not.toContain("DownloadPage");
    expect(app).not.toContain("/download/:productId");
  });
});
