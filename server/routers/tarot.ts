import { z } from "zod";
import { invokeLLM, listLLMModels } from "../_core/llm";
import { publicProcedure, router } from "../_core/trpc";
import { tarotCards, tarotFocuses } from "../../shared/tarot";

export const tarotReadingInput = z.object({
  cardId: z.enum(tarotCards.map(card => card.id) as [string, ...string[]]),
  focus: z.enum(tarotFocuses),
});

const readingSchema = {
  name: "daily_tarot_reading",
  strict: true,
  schema: {
    type: "object",
    properties: {
      opening: { type: "string" },
      reflection: { type: "string" },
      action: { type: "string" },
      journalPrompt: { type: "string" },
      boundary: { type: "string" },
    },
    required: ["opening", "reflection", "action", "journalPrompt", "boundary"],
    additionalProperties: false,
  },
};

const readingOutput = z.object({
  opening: z.string().min(1).max(160),
  reflection: z.string().min(1).max(220),
  action: z.string().min(1).max(160),
  journalPrompt: z.string().min(1).max(160),
  boundary: z.string().min(1).max(180),
});

type TarotReading = z.infer<typeof readingOutput>;

export function parseTarotReading(raw: string, cardName: string, cardKeyword: string, focus: string): TarotReading {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  const candidates = [fenced, firstBrace >= 0 && lastBrace > firstBrace ? raw.slice(firstBrace, lastBrace + 1) : undefined].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      return readingOutput.parse(JSON.parse(candidate));
    } catch {
      // Try the next candidate; the final fallback keeps the ritual usable.
    }
  }

  const reflection = raw.replace(/\s+/g, " ").replace(/^好的[，,。]*/, "").trim().slice(0, 190);
  return {
    opening: `「${cardName}」不是答案，而是給「${focus}」留出一個新的觀看角度。`,
    reflection: reflection || `今天先留意「${cardKeyword}」在你身上出現的細節：哪一個感受最需要被好好聽見？`,
    action: "用 10 分鐘寫下此刻最真實的一句感受，再替它安排一個小小的照顧行動。",
    journalPrompt: `如果我願意多相信一次「${cardKeyword}」，今天會怎麼回應自己？`,
    boundary: "這是自我覺察提示，不取代醫療、法律、財務或其他重大決策所需的專業意見。",
  };
}

export const tarotRouter = router({
  readDailyCard: publicProcedure.input(tarotReadingInput).mutation(async ({ input }) => {
    const card = tarotCards.find(item => item.id === input.cardId);
    if (!card) throw new Error("Selected tarot card was not found");

    const { data: models } = await listLLMModels();
    const model = models.find(item => item.id === "claude-sonnet-4-6")?.id
      ?? models.find(item => item.id === "claude-haiku-4-5")?.id
      ?? models.find(item => item.id.startsWith("claude-"))?.id;
    if (!model) throw new Error("No Claude model is currently available");

    const response = await invokeLLM({
      model,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: "你是美心學苑的溫柔塔羅反思引導者。塔羅僅作為自我覺察與書寫提示，不預言未來、不做醫療、法律、財務、投資或人生重大決策建議。請用繁體中文、具體而不玄虛的語言回應；不要使用『明明』；不恐嚇、不保證結果、不宣稱超自然事實。每個欄位限 80 字內。只輸出符合 Schema 的 JSON 物件，不要加入前言、解釋、Markdown 或程式碼區塊。",
        },
        {
          role: "user",
          content: `使用者在「${input.focus}」主題抽到「${card.name}」（核心訊號：${card.keyword}）。請給一份今日反思：開場要承認這是自我覺察提示；reflection 連結當下可觀察的感受；action 提供一個 10 分鐘可完成的小行動；journalPrompt 只問一個具體問題；boundary 提醒不以此取代專業意見或重大決策。`,
        },
      ],
      outputSchema: readingSchema,
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Tarot reading did not return text");

    return { card, focus: input.focus, reading: parseTarotReading(content, card.name, card.keyword, input.focus) };
  }),
});

export type TarotRouter = typeof tarotRouter;
