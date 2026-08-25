import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { navItems, products } from "../client/src/data/catalog";

const source = (relativePath: string) => readFileSync(resolve(import.meta.dirname, "..", relativePath), "utf8");

describe("PAYUNi 付款與數位交付流程", () => {
  it("uses the confirmed PAYUNi payment URL for every product card and explains LINE delivery", () => {
    const shop = source("client/src/pages/Shop.tsx");

    expect(products.map(({ name, paymentUrl }) => ({ name, paymentUrl }))).toEqual([
      { name: "月光書房｜七日覺察筆記", paymentUrl: "https://api.payuni.com.tw/api/uop/receive_info/2/1/NPPA221903464/CYs03hU9Bzugk6a6xt0eQ" },
      { name: "穿搭開運｜意圖風格卡", paymentUrl: "https://api.payuni.com.tw/api/uop/receive_info/2/1/NPPA221903464/vampwVLR59QiNTO6hMFL7" },
      { name: "能量回穩｜晚間小儀式包", paymentUrl: "https://api.payuni.com.tw/api/uop/receive_info/2/1/NPPA221903464/N2V4PL8JC7KEHsnit4zY9" },
      { name: "療癒品牌｜內容承接地圖", paymentUrl: "https://api.payuni.com.tw/api/uop/receive_info/2/1/NPPA221903464/x79qt87ygdwAhvK8b94t6" },
      { name: "把自己穿回來｜開口前3分鐘急救卡", paymentUrl: "https://api.payuni.com.tw/api/uop/receive_info/2/1/NPPA221903464/n5IusOs29LTrZGEZkRiUW" },
    ]);
    expect(shop).toContain("href={product.paymentUrl}");
    expect(shop).toContain("想把它帶走");
    expect(products.find((product) => product.id === "energy-first-aid")?.exploreLabel).toBe("先免費試用 12 張急救卡");
    expect(shop).toContain("product.exploreLabel");
    expect(shop).toContain("product.exploreUrl!");
    expect(shop).toContain("CreditCard");
    expect(shop).toContain("線上付款由 PAYUNi 統一金流處理；付款完成後，Vivi 會透過 LINE 交付數位檔案下載連結。");
    expect(shop).toContain("想把它帶回日常時，再進入安全付款；完成後交付數位檔案。");
    expect(shop).toContain("先免費體驗 12 張急救卡，再決定是否帶走可下載版本。");
    expect(shop).toContain("點選「前往付款」，進入 PAYUNi 付款頁面完成線上付款。");
    expect(shop).toContain("付款完成後，Vivi 會收到通知並確認你的訂單。");
    expect(shop).toContain("確認後，Vivi 會透過 LINE 交付數位檔案的下載連結。");
    expect(shop).toContain("下單與交付流程");
    expect(shop).toContain('target="_blank"');
    expect(shop).not.toContain("buildLineOrderUrl");
    expect(shop).not.toContain("MessageCircle");
    expect(shop).not.toContain("Shopify");
  });

  it("restores the tarot draw link between journal and free tools in shared navigation", () => {
    const frame = source("client/src/components/SiteFrame.tsx");

    expect(navItems.map((item) => item.label)).toEqual(["首頁", "閱讀室", "塔羅抽牌", "免費工具", "服務", "美心學苑選物", "關於 Vivi"]);
    expect(navItems.find((item) => item.label === "塔羅抽牌")).toEqual({ label: "塔羅抽牌", href: "/tarot-daily" });
    expect(frame).toContain("navItems.map");
  });

  it("uses a fixed equal-width product grid instead of editorial staggered card spans", () => {
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
