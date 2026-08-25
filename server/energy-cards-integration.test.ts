import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { products } from "../client/src/data/catalog";

const source = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("把自己穿回來整合", () => {
  it("adds the fifth PAYUNi product without changing the existing payment catalog", () => {
    const product = products.find((item) => item.id === "energy-first-aid");
    expect(products).toHaveLength(5);
    expect(product).toMatchObject({
      name: "把自己穿回來｜開口前3分鐘急救卡",
      category: "數位工具",
      price: 399,
      priceLabel: "NT$399",
      paymentUrl: "https://api.payuni.com.tw/api/uop/receive_info/2/1/NPPA221903464/n5IusOs29LTrZGEZkRiUW",
    });
    expect(products.filter((item) => item.id !== "energy-first-aid")).toHaveLength(4);
  });

  it("registers the interactive page, its tool entry, and its manual delivery item", () => {
    const app = source("client/src/App.tsx");
    const tools = source("client/src/pages/Tools.tsx");
    const download = source("client/src/pages/Download.tsx");
    expect(app).toContain('path={"/energy-cards"} component={EnergyCards}');
    expect(tools).toContain('href="/energy-cards"');
    expect(tools).toContain("探索 12 張急救卡");
    expect(download).toContain('"energy-first-aid"');
    expect(download).toContain("完整 12 卡急救系統 PDF");
  });

  it("lets visitors explore the complete interactive system before choosing the downloadable version", () => {
    const page = source("client/src/pages/EnergyCards.tsx");
    const shop = source("client/src/pages/Shop.tsx");
    const product = products.find((item) => item.id === "energy-first-aid");

    expect(product).toMatchObject({ exploreUrl: "/energy-cards", exploreLabel: "先免費試用 12 張急救卡" });
    expect(shop).toContain("product.exploreLabel");
    expect(shop).toContain("product.exploreUrl!");
    expect(page).toContain("帶走可下載的 12 卡系統");
    expect(page).toContain("PAYUNi 安全付款頁");
    expect(page).toContain("Vivi 會透過 LINE 交付下載連結");
  });

  it("preserves all requested interactive behaviours within an isolated page scope", () => {
    const page = source("client/src/pages/EnergyCards.tsx");
    const styles = source("client/src/pages/energy-cards.css");
    expect((page.match(/id: \d+/g) ?? [])).toHaveLength(12);
    expect(page).toContain("findBestCard");
    expect(page).toContain("activeTag");
    expect(page).toContain("scenarios");
    expect(page).toContain("seconds");
    expect(page).toContain("saved");
    expect(page).toContain("checkinDate");
    expect(page).toContain("energy-cards-page");
    expect(styles).toContain(".energy-cards-page .ec-scene-quick");
    expect(styles).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
