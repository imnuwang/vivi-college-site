import { describe, expect, it } from "vitest";
import { parseTarotReading, tarotReadingInput } from "./routers/tarot";

describe("tarot reading input", () => {
  it("accepts a known card and focus", () => {
    expect(tarotReadingInput.parse({ cardId: "star", focus: "今日狀態" })).toEqual({ cardId: "star", focus: "今日狀態" });
  });

  it("rejects unknown card ids and focuses", () => {
    expect(() => tarotReadingInput.parse({ cardId: "unknown", focus: "今日狀態" })).toThrow();
    expect(() => tarotReadingInput.parse({ cardId: "star", focus: "未定義主題" })).toThrow();
  });

  it("parses a structured Claude response and safely handles prose fallback", () => {
    const json = JSON.stringify({ opening: "開場", reflection: "反思", action: "行動", journalPrompt: "問題", boundary: "提醒" });
    expect(parseTarotReading(`\`\`\`json\n${json}\n\`\`\``, "星星", "希望與修復", "今日狀態").action).toBe("行動");
    expect(parseTarotReading("請慢慢整理今天的感受。", "星星", "希望與修復", "今日狀態").boundary).toContain("自我覺察提示");
  });
});
