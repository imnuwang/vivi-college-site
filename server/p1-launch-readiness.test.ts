import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("commercial launch P1 safeguards", () => {
  it("publishes the service facts people need before applying", () => {
    const catalog = source("client/src/data/catalog.ts");
    const services = source("client/src/pages/Services.tsx");

    for (const field of [
      "price",
      "duration",
      "format",
      "delivery",
      "followUp",
      "suitableFor",
      "notSuitableFor",
    ]) {
      expect(catalog).toContain(`${field}:`);
    }
    expect(services).toContain("預約前，先把條件看清楚");
    expect(services).toContain("不替代醫療、心理治療、法律或財務專業");
  });

  it("guides external service and lead-capture clicks through a disclosure page", () => {
    const app = source("client/src/App.tsx");
    const externalStep = source("client/src/pages/ExternalStep.tsx");
    const portaly = source("client/src/components/PortalyLeadLink.tsx");

    expect(app).toContain("/continue/:destination");
    expect(externalStep).toContain('robots="noindex,follow"');
    expect(externalStep).toContain("只填寫完成這次申請需要的資料");
    expect(externalStep).toContain("我已完成外部步驟");
    expect(externalStep).toContain("本站不會自動讀取 LINE、Google 表單或 Portaly");
    expect(portaly).toContain('/continue/portaly');
  });

  it("tracks page views, service CTAs, external destinations and downloads", () => {
    const analytics = source("client/src/lib/analytics.ts");
    const tracker = source("client/src/components/Analytics.tsx");
    const tools = source("client/src/pages/Tools.tsx");

    expect(analytics).toContain('"page_view"');
    expect(analytics).toContain('"service_cta_click"');
    expect(analytics).toContain('"line_click"');
    expect(analytics).toContain('"application_open"');
    expect(analytics).toContain('"portaly_open"');
    expect(analytics).toContain('"resource_download"');
    expect(tracker).toContain("VITE_ANALYTICS_WEBSITE_ID");
    expect(analytics).toContain('"vivi:analytics-queue"');
    expect(tracker).toContain("flushQueuedConversions");
    expect(tools).toContain('trackConversion("resource_download"');
  });

  it("uses short mobile heroes and compressed tarot assets", () => {
    const css = source("client/src/index.css");
    const energyCss = source("client/src/pages/energy-cards.css");
    const tarotArt = source("client/src/data/tarotArt.ts");
    const tarotPage = source("client/src/pages/TarotDaily.tsx");

    expect(css).toContain("min-height: min(90svh, 820px)");
    expect(css).toContain("min-height: clamp(560px, 82svh, 720px)");
    expect(energyCss).toContain("min-height: clamp(560px, 82svh, 720px)");
    expect(tarotArt).toContain("/fool.webp");
    expect(tarotPage).toContain("width={600}");
    expect(tarotPage).toContain("height={1040}");
  });
});
