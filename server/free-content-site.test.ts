import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { freeResources } from "../client/src/data/catalog";

const source = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("免費內容網站", () => {
  it("provides four direct practices plus the full energy-card experience", () => {
    const page = source("client/src/pages/ResourceLibrary.tsx");
    expect(freeResources.filter((item) => item.href.startsWith("/resources/"))).toHaveLength(4);
    expect(freeResources.map((item) => item.name)).toEqual(expect.arrayContaining(["月光書房｜七日覺察筆記", "穿搭開運｜意圖風格卡", "能量回穩｜晚間小儀式", "療癒品牌｜內容承接地圖"]));
    expect(page).toContain("Day 1｜看見重複");
    expect(page).toContain("今天想被怎麼看見？");
    expect(page).toContain("今晚不必想通");
    expect(page).toContain("你的內容承接草圖");
    expect(page).toContain("複製我的結果");
    expect(page).toContain("列印練習頁");
  });

  it("does not retain payment or download placeholders in the public free-content flow", () => {
    const catalog = source("client/src/data/catalog.ts");
    const shop = source("client/src/pages/Shop.tsx");
    const energyCards = source("client/src/pages/EnergyCards.tsx");
    expect(catalog).not.toContain("api.payuni.com.tw");
    expect(catalog).not.toContain("paymentUrl");
    expect(shop).not.toContain("PAYUNi");
    expect(energyCards).not.toContain("PAYUNi");
  });
});
