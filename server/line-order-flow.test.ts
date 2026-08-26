import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { freeResources, navItems } from "../client/src/data/catalog";

const source = (relativePath: string) => readFileSync(resolve(import.meta.dirname, "..", relativePath), "utf8");

describe("免費內容資源庫流程", () => {
  it("makes every former product a free resource with a direct in-site practice route", () => {
    const shop = source("client/src/pages/Shop.tsx");

    expect(freeResources).toHaveLength(5);
    expect(freeResources.map((resource) => resource.id)).toEqual(["clarity-notebook", "style-signal-cards", "energy-reset-kit", "brand-foundation", "energy-first-aid"]);
    expect(freeResources.every((resource) => resource.href.startsWith("/"))).toBe(true);
    expect(freeResources.find((resource) => resource.id === "energy-first-aid")?.href).toBe("/energy-cards");
    expect(shop).toContain("免費立即使用");
    expect(shop).toContain("不需付款；選一個最像你當下狀態的入口，直接開始練習。");
    expect(shop).toContain("HOW TO USE THE LIBRARY");
    expect(shop).not.toContain("PAYUNi");
    expect(shop).not.toContain("paymentUrl");
    expect(shop).not.toContain("下載連結");
  });

  it("restores the tarot draw link between journal and free tools in shared navigation", () => {
    const frame = source("client/src/components/SiteFrame.tsx");

    expect(navItems.map((item) => item.label)).toEqual(["首頁", "閱讀室", "塔羅抽牌", "免費工具", "服務", "免費資源庫", "關於 Vivi"]);
    expect(navItems.find((item) => item.label === "塔羅抽牌")).toEqual({ label: "塔羅抽牌", href: "/tarot-daily" });
    expect(frame).toContain("navItems.map");
  });

  it("uses a fixed equal-width resource grid instead of editorial staggered card spans", () => {
    const styles = source("client/src/index.css");

    expect(styles).toContain(".shop-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr));");
    expect(styles).toContain(".shop-grid { grid-template-columns: 1fr; gap: 16px; }");
    expect(styles).toContain(".product-image-wrap { position: relative; width: 100%; flex: 0 0 auto; aspect-ratio: 4 / 3;");
    expect(styles).toContain(".product-card-copy > .vivi-button { margin-top: auto !important; }");
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
