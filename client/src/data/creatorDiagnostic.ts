export type DiagnosticKey = "positioning" | "content" | "conversion";

export type DiagnosticOption = {
  label: string;
  key: DiagnosticKey;
};

export type DiagnosticQuestion = {
  id: string;
  prompt: string;
  options: DiagnosticOption[];
};

export type DiagnosticResult = {
  key: DiagnosticKey;
  label: string;
  title: string;
  summary: string;
  signal: string;
  action: string;
  resource: string;
};

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "introduction",
    prompt: "當有人問「你在做什麼？」時，你最常卡在哪裡？",
    options: [
      { label: "我講了很多經歷，對方還是不太懂我的核心價值。", key: "positioning" },
      { label: "我會提到服務，但不知道怎麼接到內容與問題。", key: "content" },
      { label: "我怕講得太直接，最後常常沒有邀請對方下一步。", key: "conversion" },
    ],
  },
  {
    id: "creation",
    prompt: "你最近發內容時，最常出現的狀況是？",
    options: [
      { label: "題目很多，但每一篇都像在說不同的人。", key: "positioning" },
      { label: "有人按讚或認同，卻很少接著私訊或詢問。", key: "content" },
      { label: "我會分享，卻很少清楚說明如何和我合作。", key: "conversion" },
    ],
  },
  {
    id: "service",
    prompt: "談到服務或收費時，哪一句最像你？",
    options: [
      { label: "我還在確認自己真正適合幫誰、解什麼問題。", key: "positioning" },
      { label: "我有服務，但讀者看不出它和我的內容有什麼關係。", key: "content" },
      { label: "我知道服務有價值，但邀請與報價時容易退縮。", key: "conversion" },
    ],
  },
  {
    id: "nextStep",
    prompt: "如果接下來只能先調整一件事，你最想看見什麼改變？",
    options: [
      { label: "一句讓對的人馬上知道「這裡在幫誰」的定位。", key: "positioning" },
      { label: "一條從內容走到信任、再走到詢問的路徑。", key: "content" },
      { label: "一個不必硬推、仍能自然邀請合作的方式。", key: "conversion" },
    ],
  },
];

export const diagnosticResults: Record<DiagnosticKey, DiagnosticResult> = {
  positioning: {
    key: "positioning",
    label: "定位訊號模糊型",
    title: "你的專業還沒有被翻成市場聽得懂的話。",
    summary: "你不是沒有能力，而是經歷、方法和服務目前還沒有收斂成一個對的人能立刻認出的入口。",
    signal: "先把「我會什麼」改寫成「我幫哪一種人，從哪一種卡點走到哪一種改變」。",
    action: "今天先寫下三位你最想服務的人：她們共同正在經歷的生活場景是什麼？",
    resource: "先用「療癒型創作者定位急救表」把受眾與服務承諾整理成一句話。",
  },
  content: {
    key: "content",
    label: "內容缺少承接型",
    title: "你的內容正在被看見，但還沒有帶人走到下一步。",
    summary: "讀者可能已經感受到你的真誠與專業，只是每篇內容之間、內容與服務之間，還少了一條能被跟上的路。",
    signal: "每篇內容只需要補上一個明確出口：一份工具、一個問題，或一次低壓力的邀請。",
    action: "從最近一篇貼文中挑一句最有共鳴的話，為它補上「如果你也卡在這裡，下一步可以……」。",
    resource: "先用免費工具頁的定位急救表，替一篇內容寫出一個能承接讀者的下一步。",
  },
  conversion: {
    key: "conversion",
    label: "服務邀請卡住型",
    title: "你不是不會服務，而是還沒把邀請說得足夠安心。",
    summary: "當你擔心太像推銷時，讀者也就很難知道：自己其實可以怎麼向你靠近。",
    signal: "邀請不是催促對方購買，而是清楚說明：什麼狀態適合一起談、談完能得到什麼。",
    action: "為一項服務補上一句篩選式邀請：『如果你正在……，而且想在……完成……，可以先……。』",
    resource: "先看 1 對 1 私教的適配條件，再決定哪一種支持最適合你現在的節奏。",
  },
};

export function getDominantDiagnostic(answers: DiagnosticKey[]): DiagnosticResult {
  const scores: Record<DiagnosticKey, number> = { positioning: 0, content: 0, conversion: 0 };
  answers.forEach((answer) => { scores[answer] += 1; });
  const order: DiagnosticKey[] = ["positioning", "content", "conversion"];
  const winner = order.reduce((leading, key) => scores[key] > scores[leading] ? key : leading, order[0]);
  return diagnosticResults[winner];
}

export function formatDiagnosticShareText(result: DiagnosticResult): string {
  return [
    "我剛完成 VIVI COLLEGE 美心學苑的內容承接診斷。",
    `我的結果：${result.label}`,
    `目前訊號：${result.signal}`,
    `我想先做的一步：${result.action}`,
    "想請 Vivi 協助我釐清接下來最適合的方向。",
  ].join("\n");
}
