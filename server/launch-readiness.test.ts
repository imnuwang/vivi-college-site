import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("commercial launch P0 safeguards", () => {
  it("adds canonical and absolute social metadata", () => {
    const seo = source("client/src/components/Seo.tsx");
    const shell = source("index.html");

    expect(seo).toContain('link[rel="canonical"]');
    expect(seo).toContain("new URL(image, baseUrl).href");
    expect(shell).toContain(
      '<link rel="canonical" href="https://vivicollege.com/"'
    );
    expect(shell).toContain(
      'content="https://vivicollege.com/assets/images/vivi-moonlit-library-hero.jpg"'
    );
  });

  it("lists every public content and resource route in the sitemap", () => {
    const sitemap = source("client/public/sitemap.xml");
    const requiredRoutes = [
      "/journal/from-top-sales-to-healing",
      "/energy-cards",
      "/srt-healing",
      "/resources/clarity-notebook",
      "/resources/style-signal-cards",
      "/resources/energy-reset-kit",
      "/resources/brand-foundation",
      "/policies",
    ];

    for (const route of requiredRoutes) {
      expect(sitemap).toContain(`https://vivicollege.com${route}`);
    }
  });

  it("ships a real static 404 and noindex metadata", () => {
    const config = source("netlify.toml");
    const notFound = source("client/public/404.html");

    expect(config).toContain('to = "/404.html"');
    expect(config).toContain("status = 404");
    expect(notFound).toContain('content="noindex,follow"');
  });

  it("removes hidden mobile navigation from the tab order and restores dialog focus", () => {
    const frame = source("client/src/components/SiteFrame.tsx");
    const energyCards = source("client/src/pages/EnergyCards.tsx");

    expect(frame).toContain("{menuOpen && (");
    expect(frame).toContain('event.key !== "Escape"');
    expect(frame).toContain("main?.focus({ preventScroll: true })");
    expect(energyCards).toContain("timerTriggerRef.current?.focus");
    expect(energyCards).toContain('event.key === "Escape"');
  });

  it("publishes privacy and service terms without calling the rules-based tarot AI", () => {
    const app = source("client/src/App.tsx");
    const policies = source("client/src/pages/Policies.tsx");
    const guide = source("NETLIFY_DEPLOYMENT.md");

    expect(app).toContain("/policies");
    expect(policies).toContain("隱私與資料使用");
    expect(policies).toContain("取消、改期與退款");
    expect(policies).toMatch(/不是 AI\s*即時解讀/);
    expect(guide).toContain("不是 AI 即時解讀");
  });
});
