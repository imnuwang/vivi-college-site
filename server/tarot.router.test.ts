import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseTarotReading, parseTarotSpreadReading, tarotReadingInput, tarotSpreadInput } from "./routers/tarot";
import { tarotCards } from "../shared/tarot";
import { tarotArt } from "../client/src/data/tarotArt";

const source = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("tarot reading input", () => {
  it("accepts a known card and focus", () => {
    expect(tarotReadingInput.parse({ cardId: "star", focus: "今日狀態" })).toEqual({ cardId: "star", focus: "今日狀態" });
  });

  it("rejects unknown card ids and focuses", () => {
    expect(() => tarotReadingInput.parse({ cardId: "unknown", focus: "今日狀態" })).toThrow();
    expect(() => tarotReadingInput.parse({ cardId: "star", focus: "未定義主題" })).toThrow();
  });

  it("accepts three unique cards for a past-present-future spread and rejects duplicate cards", () => {
    expect(tarotSpreadInput.parse({ cardIds: ["star", "moon", "sun"], focus: "自我照顧" })).toEqual({ cardIds: ["star", "moon", "sun"], focus: "自我照顧" });
    expect(() => tarotSpreadInput.parse({ cardIds: ["star", "star", "sun"], focus: "自我照顧" })).toThrow();
  });

  it("parses a structured Claude response and safely handles prose fallback", () => {
    const json = JSON.stringify({ opening: "開場", reflection: "反思", action: "行動", journalPrompt: "問題", boundary: "提醒" });
    expect(parseTarotReading(`\`\`\`json\n${json}\n\`\`\``, "星星", "希望與修復", "今日狀態").action).toBe("行動");
    expect(parseTarotReading("請慢慢整理今天的感受。", "星星", "希望與修復", "今日狀態").boundary).toContain("自我覺察提示");
  });

  it("parses a structured three-card response and preserves a non-predictive fallback", () => {
    const json = JSON.stringify({ opening: "開場", past: "過去", present: "現在", future: "未來", synthesis: "整合", action: "行動", journalPrompt: "問題", boundary: "提醒" });
    const cards = tarotCards.slice(0, 3);
    expect(parseTarotSpreadReading(`\`\`\`json\n${json}\n\`\`\``, cards, "今日狀態").synthesis).toBe("整合");
    expect(parseTarotSpreadReading("請慢慢整理感受。", cards, "今日狀態").future).toContain("不是結果保證");
  });

  it("maps every selectable major arcana card to a classic visual and keeps the brand card back", () => {
    const page = source("client/src/pages/TarotDaily.tsx");
    const styles = source("client/src/index.css");

    expect(Object.keys(tarotArt)).toHaveLength(22);
    expect(tarotCards.every((card) => tarotArt[card.id].includes(`/tarot-rws/${card.id}.jpg`))).toBe(true);
    expect(page).toContain("tarotArt[card.id]");
    expect(page).toContain("tarot-card-back");
    expect(page).toContain("月光一日一牌");
    expect(styles).toContain("tarot-ritual-shuffle");
    expect(styles).toContain(".tarot-card-3d.is-revealed { transform: rotateY(180deg); }");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps a selectable past-present-future spread with sequential reveal and integrated reading", () => {
    const page = source("client/src/pages/TarotDaily.tsx");
    const router = source("server/routers/tarot.ts");

    expect(page).toContain("過去、現在、未來");
    expect(page).toContain("setRevealedCount(index + 1)");
    expect(page).toContain("readPastPresentFuture");
    expect(page).toContain("tarot-spread-stage");
    expect(page).toContain("未來位不是預言");
    expect(router).toContain("readPastPresentFuture");
    expect(router).toContain("Spread cards must be unique");
    expect(router).toContain("未來絕不可視為預言");
  });
});
