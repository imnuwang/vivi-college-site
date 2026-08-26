import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { freeResources } from "../client/src/data/catalog";

const source = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("把自己穿回來整合", () => {
  it("keeps the 12-card system as a complete free resource", () => {
    const resource = freeResources.find((item) => item.id === "energy-first-aid");
    expect(freeResources).toHaveLength(5);
    expect(resource).toMatchObject({
      name: "把自己穿回來｜開口前3分鐘急救卡",
      category: "情境急救",
      href: "/energy-cards",
    });
    expect(resource).not.toHaveProperty("paymentUrl");
  });

  it("registers the interactive page and keeps it discoverable from free tools", () => {
    const app = source("client/src/App.tsx");
    const tools = source("client/src/pages/Tools.tsx");
    expect(app).toContain('path={"/energy-cards"} component={EnergyCards}');
    expect(tools).toContain('href="/energy-cards"');
    expect(tools).toContain("探索 12 張急救卡");
    expect(tools).toContain("打開免費資源庫");
  });

  it("removes paid download promotion while preserving the complete interactive system", () => {
    const page = source("client/src/pages/EnergyCards.tsx");
    const shop = source("client/src/pages/Shop.tsx");
    const resource = freeResources.find((item) => item.id === "energy-first-aid");

    expect(resource?.badge).toBe("完整免費體驗");
    expect(shop).toContain("免費立即使用");
    expect(page).toContain("已經完整開放給你使用");
    expect(page).toContain('href="/shop"');
    expect(page).not.toContain("PAYUNi");
    expect(page).not.toContain("可下載的 12 卡系統");
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
