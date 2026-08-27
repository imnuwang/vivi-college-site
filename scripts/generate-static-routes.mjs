import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("dist/client");
const sourcePath = path.join(outputDir, "index.html");
const shell = await readFile(sourcePath, "utf8");
const baseUrl = "https://vivicollege.com";
const brandName = "VIVI COLLEGE 美心學苑";
const defaultImage = `${baseUrl}/assets/images/vivi-moonlit-library-hero.jpg`;

const routes = [
  [
    "/",
    "美心學苑",
    "從塔羅占卜、能量療癒、穿搭玄學到療癒師品牌定位，美心學苑把感受整理成可行動的選擇。",
  ],
  [
    "/journal",
    "閱讀室",
    "閱讀 Vivi 關於關係、自我覺察、穿搭意圖與療癒型創作者品牌的文章，並找到可立即使用的練習。",
  ],
  [
    "/journal/from-top-sales-to-healing",
    "我曾把業績做到第一，後來卻連人群都想躲開",
    "Vivi 從高壓工作、害怕人群到重新整理生活方向的親身故事。",
  ],
  [
    "/journal/first-six-hundred-online-business",
    "第一筆 600 元，讓我知道在家也能替自己開一條路",
    "從不敢告訴家人，到 600 元、3,000 元的網拍收入。小小的結果，讓一個放了很久的創業念頭開始被相信。",
  ],
  [
    "/journal/healing-skills-need-clear-content",
    "學會療癒之後，我才發現會做和被理解有一段距離",
    "有了療癒工具，也想幫助別人，陌生人卻不知道你能處理什麼。這是 Vivi 為什麼重新學內容與自媒體。",
  ],
  [
    "/journal/love-tarot-question",
    "感情卡住時，先別急著問他還愛不愛我",
    "用更具體的問題整理感情裡的期待、界線與下一步。",
  ],
  [
    "/journal/money-energy-reset",
    "覺得財運卡住時，先檢查你是不是一直在耗能",
    "從日常選擇與能量使用方式，整理金錢焦慮背後真正需要處理的事。",
  ],
  [
    "/journal/wear-your-intention",
    "你今天想被怎麼看見",
    "從衣櫃選一個能提醒自己的訊號，讓穿搭成為今天的具體意圖。",
  ],
  [
    "/journal/healer-brand-language",
    "療癒師的內容不轉單，常常不是因為你不夠會寫",
    "整理療癒型創作者的受眾、內容語言與服務承接，讓專業更容易被理解。",
  ],
  [
    "/tools",
    "免費工具室",
    "使用塔羅反思、創作者診斷與情境急救卡，把混亂整理成今天可完成的一步。",
  ],
  [
    "/tarot-daily",
    "塔羅一日一牌",
    "抽一張今日塔羅牌，得到自我覺察、書寫問題與 10 分鐘行動提示。結果由本站規則組合，不是 AI 即時解讀。",
  ],
  [
    "/creator-diagnostic",
    "療癒型創作者內容承接診斷",
    "完成四題診斷，找出目前卡在定位、內容或服務承接，並取得下一步建議。",
  ],
  [
    "/energy-cards",
    "開口前 3 分鐘急救卡",
    "用 12 張情境急救卡、關鍵字推薦與 3 分鐘計時器，在需要開口、設界線或被看見前先穩住自己。",
  ],
  [
    "/services",
    "Vivi 深度服務",
    "了解 12 週療癒型創作者陪跑、一對一塔羅與能量整理的方向、流程及申請方式。",
  ],
  [
    "/shop",
    "免費資源庫",
    "直接使用美心學苑的七日覺察、意圖穿搭、晚間回穩與療癒型創作者內容承接練習。",
  ],
  [
    "/resources/clarity-notebook",
    "清晰筆記本",
    "用七天的短練習記錄反覆訊號、感受與下一步，逐漸看懂自己真正需要什麼。",
  ],
  [
    "/resources/style-signal-cards",
    "風格訊號卡",
    "從三種生活場景選一個穿搭意圖，讓衣物成為今天的提醒。",
  ],
  [
    "/resources/energy-reset-kit",
    "晚間能量重整",
    "用約十分鐘完成晚間收尾，把今天放下，替明天保留空間。",
  ],
  [
    "/resources/brand-foundation",
    "療癒型創作者內容承接地圖",
    "整理品牌定位、內容主題與服務入口，畫出讀者從認識你到採取下一步的路徑。",
  ],
  [
    "/about",
    "關於 Vivi",
    "認識 Vivi 從高壓工作、低潮與療癒練習，走到內容創作與陪伴療癒型工作者的經歷。",
  ],
  [
    "/policies",
    "隱私與服務條款",
    "了解美心學苑網站如何使用資料、外部服務，以及預約、取消、改期與退款的處理方式。",
  ],
  [
    "/continue/line",
    "前往 Vivi LINE 官方帳號",
    "前往 LINE 前，先確認資料用途、服務條件與需要準備的資訊。",
    "noindex,follow",
  ],
  [
    "/continue/application",
    "前往 1 對 1 適配諮詢表",
    "前往 Google 表單前，先了解申請流程、資料用途與服務成立方式。",
    "noindex,follow",
  ],
  [
    "/continue/portaly",
    "前往 Portaly 月光來信",
    "前往 Portaly 前，先了解 Email 用途與免費工具的其他使用方式。",
    "noindex,follow",
  ],
  [
    "/continue/complete",
    "完成外部步驟",
    "從 LINE、Google 表單或 Portaly 回到美心學苑後，確認接下來的安排。",
    "noindex,follow",
  ],
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function upsertMeta(html, attribute, key, content) {
  const matcher = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`,
    "i"
  );
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  return matcher.test(html)
    ? html.replace(matcher, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderRoute(routePath, title, description, robots = "index,follow") {
  const url = `${baseUrl}${routePath}`;
  const fullTitle = `${title}｜${brandName}`;
  let html = shell.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(fullTitle)}</title>`
  );
  html = upsertMeta(html, "name", "description", description);
  html = upsertMeta(html, "name", "robots", robots);
  html = upsertMeta(html, "property", "og:title", fullTitle);
  html = upsertMeta(html, "property", "og:description", description);
  html = upsertMeta(html, "property", "og:url", url);
  html = upsertMeta(html, "property", "og:type", "website");
  html = upsertMeta(html, "property", "og:image", defaultImage);
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:title", fullTitle);
  html = upsertMeta(html, "name", "twitter:description", description);
  html = upsertMeta(html, "name", "twitter:image", defaultImage);
  const canonical = `<link rel="canonical" href="${url}" />`;
  const canonicalMatcher = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  html = canonicalMatcher.test(html)
    ? html.replace(canonicalMatcher, canonical)
    : html.replace("</head>", `    ${canonical}\n  </head>`);
  return html;
}

for (const [routePath, title, description, robots] of routes) {
  const target =
    routePath === "/"
      ? sourcePath
      : path.join(outputDir, routePath.slice(1), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(
    target,
    renderRoute(routePath, title, description, robots),
    "utf8"
  );
}

console.log(`Generated static metadata for ${routes.length} public routes.`);
