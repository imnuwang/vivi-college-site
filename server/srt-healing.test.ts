import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { navItems, services, socialLinks } from "../client/src/data/catalog";

const source = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("SRT core healing path", () => {
  it("publishes SRT as the core service without removing the tarot tools", () => {
    const app = source("client/src/App.tsx");
    const tools = source("client/src/pages/Tools.tsx");
    const tarot = source("client/src/pages/TarotDaily.tsx");

    expect(app).toContain("/srt-healing");
    expect(navItems).toContainEqual({
      label: "SRT 療癒",
      href: "/srt-healing",
    });
    expect(services[0].id).toBe("srt-healing");
    expect(tools).toContain("塔羅一日一牌");
    expect(tarot).toContain('type DrawMode = "single" | "spread"');
    expect(tarot).toContain("過去、現在、未來");
  });

  it("uses the verified live SRT form and the user-provided Notion page", () => {
    expect(socialLinks.srtApplication).toBe(
      "https://forms.gle/AviVXKW5PR5E9ywc7"
    );
    expect(socialLinks.srtNotion).toContain("1cee2eb9ffd5802bbe38e00630976d54");
  });

  it("explains data collection, pricing and healing boundaries before the form", () => {
    const page = source("client/src/pages/SrtHealing.tsx");
    const transition = source("client/src/pages/ExternalStep.tsx");

    expect(page).toContain("首次單堂");
    expect(page).toContain("約 2,000 字");
    expect(page).toContain("不診斷疾病");
    expect(page).toContain("不能保證健康、關係、收入或人生結果");
    expect(transition).toContain("Google SRT 個人預約表單");
    expect(transition).toContain("姓名、Email、生日、所在城市、LINE ID");
  });

  it("keeps Portaly as a planned website-first path rather than publishing it", () => {
    const plan = source("PORTALY_SRT_LISTING.md");

    expect(plan).toContain("https://vivicollege.com/srt-healing");
    expect(plan).toContain("本輪不會修改或發布 Portaly");
    expect(plan).toContain("不要把 Portaly 第一層直接連到 Google 表單");
  });
});
