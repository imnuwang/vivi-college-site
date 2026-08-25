import { z } from "zod";
import { invokeLLM, listLLMModels } from "../_core/llm";
import { publicProcedure, router } from "../_core/trpc";
import { tarotCards, tarotFocuses, tarotSpreadPositions } from "../../shared/tarot";

export const tarotReadingInput = z.object({
  cardId: z.enum(tarotCards.map(card => card.id) as [string, ...string[]]),
  focus: z.enum(tarotFocuses),
});

export const tarotSpreadInput = z.object({
  cardIds: z.array(z.enum(tarotCards.map(card => card.id) as [string, ...string[]])).length(3).refine(ids => new Set(ids).size === 3, "Spread cards must be unique"),
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

const spreadReadingSchema = {
  name: "past_present_future_tarot_reading",
  strict: true,
  schema: {
    type: "object",
    properties: {
      opening: { type: "string" },
      past: { type: "string" },
      present: { type: "string" },
      future: { type: "string" },
      synthesis: { type: "string" },
      action: { type: "string" },
      journalPrompt: { type: "string" },
      boundary: { type: "string" },
    },
    required: ["opening", "past", "present", "future", "synthesis", "action", "journalPrompt", "boundary"],
    additionalProperties: false,
  },
};

const spreadReadingOutput = z.object({
  opening: z.string().min(1).max(180),
  past: z.string().min(1).max(220),
  present: z.string().min(1).max(220),
  future: z.string().min(1).max(220),
  synthesis: z.string().min(1).max(240),
  action: z.string().min(1).max(160),
  journalPrompt: z.string().min(1).max(160),
  boundary: z.string().min(1).max(180),
});

type TarotSpreadReading = z.infer<typeof spreadReadingOutput>;

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

export function parseTarotSpreadReading(raw: string, cards: readonly { name: string; keyword: string }[], focus: string): TarotSpreadReading {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  const candidates = [fenced, firstBrace >= 0 && lastBrace > firstBrace ? raw.slice(firstBrace, lastBrace + 1) : undefined].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      return spreadReadingOutput.parse(JSON.parse(candidate));
    } catch {
      // Continue to fallback so the three-card ritual remains usable if JSON is imperfect.
    }
  }

  const reflection = raw.replace(/\s+/g, " ").replace(/^好的[，,。]*/, "").trim().slice(0, 210);
  const [past, present, future] = cards;
  return {
    opening: `這組牌不是預言，而是替「${focus}」整理出一條可觀察的時間脈絡。`,
    past: `過去的「${past?.name ?? "這張牌"}」提醒你回看「${past?.keyword ?? "既有經驗"}」如何一路來到此刻。`,
    present: `現在的「${present?.name ?? "這張牌"}」邀請你留意「${present?.keyword ?? "當下感受"}」正在說什麼。`,
    future: `未來位的「${future?.name ?? "這張牌"}」不是結果保證，而是若你願意回應「${future?.keyword ?? "下一步"}」時，可能形成的方向。`,
    synthesis: reflection || "把三張牌放在一起看：先理解自己怎麼走到這裡，再把注意力放回今天可選擇的一步。",
    action: "用 10 分鐘各寫下一句：我想放下什麼、我正在感受什麼、我願意嘗試什麼。",
    journalPrompt: "如果我不急著知道答案，這三張牌邀請我先誠實面對哪一件事？",
    boundary: "這是自我覺察提示，不預言未來，也不取代醫療、法律、財務或其他重大決策所需的專業意見。",
  };
}

async function getTarotModel() {
  const { data: models } = await listLLMModels();
  const model = models.find(item => item.id === "claude-sonnet-4-6")?.id
    ?? models.find(item => item.id === "claude-haiku-4-5")?.id
    ?? models.find(item => item.id.startsWith("claude-"))?.id;
  if (!model) throw new Error("No Claude model is currently available");
  return model;
}

export const tarotRouter = router({
  readDailyCard: publicProcedure.input(tarotReadingInput).mutation(async ({ input }) => {
    const card = tarotCards.find(item => item.id === input.cardId);
    if (!card) throw new Error("Selected tarot card was not found");

    const model = await getTarotModel();

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
  readPastPresentFuture: publicProcedure.input(tarotSpreadInput).mutation(async ({ input }) => {
    const cards = input.cardIds.map(cardId => tarotCards.find(card => card.id === cardId)).filter((card): card is (typeof tarotCards)[number] => Boolean(card));
    if (cards.length !== 3) throw new Error("Selected spread cards were not found");

    const model = await getTarotModel();
    const positions = tarotSpreadPositions.map((position, index) => `${position.label}：${cards[index]!.name}（${cards[index]!.keyword}）`).join("；");
    const response = await invokeLLM({
      model,
      max_tokens: 1100,
      messages: [
        {
          role: "system",
          content: "你是美心學苑的溫柔塔羅反思引導者。三張牌陣僅作為自我覺察與書寫提示，不預言未來、不做醫療、法律、財務、投資或人生重大決策建議。未來位只能描述『若願意覺察與行動，正在形成的方向』，不可宣稱必然結果。請用繁體中文、具體而不玄虛的語言回應；不要使用『明明』；不恐嚇、不保證結果、不宣稱超自然事實。每個欄位限 100 字內。只輸出符合 Schema 的 JSON 物件，不要加入前言、解釋、Markdown 或程式碼區塊。",
        },
        {
          role: "user",
          content: `使用者在「${input.focus}」進行過去、現在、未來三張牌陣：${positions}。請給一份整合解讀：opening 承認這是自我覺察提示；past／present／future 各自解釋時間位置，未來絕不可視為預言；synthesis 串聯三張牌的模式；action 提供一個 10 分鐘小行動；journalPrompt 只問一個具體問題；boundary 提醒不以此取代專業意見或重大決策。`,
        },
      ],
      outputSchema: spreadReadingSchema,
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Tarot spread reading did not return text");

    return { cards, focus: input.focus, positions: tarotSpreadPositions, reading: parseTarotSpreadReading(content, cards, input.focus) };
  }),
});

export type TarotRouter = typeof tarotRouter;
