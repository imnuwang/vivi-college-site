import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { freeResources, navItems } from "../client/src/data/catalog";

const source = (relativePath: string) =>
  readFileSync(resolve(import.meta.dirname, "..", relativePath), "utf8");

describe("免費內容資源庫流程", () => {
  it("makes every former product a free resource with a direct in-site practice route", () => {
    const shop = source("client/src/pages/Shop.tsx");

    expect(freeResources).toHaveLength(5);
    expect(freeResources.map(resource => resource.id)).toEqual([
      "clarity-notebook",
      "style-signal-cards",
      "energy-reset-kit",
      "brand-foundation",
      "energy-first-aid",
    ]);
    expect(freeResources.every(resource => resource.href.startsWith("/"))).toBe(
      true
    );
    expect(
      freeResources.find(resource => resource.id === "energy-first-aid")?.href
    ).toBe("/energy-cards");
    expect(shop).toContain("免費立即使用");
    expect(shop).toContain(
      "不需付款；選一個最像你當下狀態的入口，直接開始練習。"
    );
    expect(shop).toContain("HOW TO USE THE LIBRARY");
    expect(shop).not.toContain("PAYUNi");
    expect(shop).not.toContain("paymentUrl");
    expect(shop).not.toContain("下載連結");
  });

  it("puts the core SRT service in shared navigation while tarot remains available in tools", () => {
    const frame = source("client/src/components/SiteFrame.tsx");

    expect(navItems.map(item => item.label)).toEqual([
      "首頁",
      "閱讀室",
      "SRT 療癒",
      "免費工具",
      "服務",
      "免費資源庫",
      "關於 Vivi",
    ]);
    expect(navItems.find(item => item.label === "SRT 療癒")).toEqual({
      label: "SRT 療癒",
      href: "/srt-healing",
    });
    expect(frame).toContain("navItems.map");
  });

  it("uses a fixed equal-width resource grid instead of editorial staggered card spans", () => {
    const styles = source("client/src/index.css");

    expect(styles).toMatch(
      /\.shop-grid\s*{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\);/s
    );
    expect(styles).toMatch(
      /\.shop-grid\s*{[^}]*grid-template-columns:\s*1fr;[^}]*gap:\s*16px;/s
    );
    expect(styles).toMatch(
      /\.product-image-wrap\s*{[^}]*position:\s*relative;[^}]*width:\s*100%;[^}]*flex:\s*0 0 auto;[^}]*aspect-ratio:\s*4 \/ 3;/s
    );
    expect(styles).toMatch(
      /\.product-card-copy\s*>\s*\.vivi-button\s*{[^}]*margin-top:\s*auto !important;/s
    );
    expect(styles).not.toContain(".product-card:nth-child(1)");
    expect(styles).not.toContain(".product-card:nth-child(5)");
  });

  it("removes the public cart and commerce router from the application", () => {
    const app = source("client/src/App.tsx");
    const router = source("server/routers.ts");

    expect(app).not.toContain("CartProvider");
    expect(router).not.toContain("commerceRouter");
    expect(router).not.toContain("commerce:");
  });
});
