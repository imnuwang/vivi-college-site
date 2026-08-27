/**
 * Style guide — 月光書房：以暖米白、月桂墨綠與老金色建立知識型靈性內容空間；
 * 文案具體、溫柔、篤定，免費內容先建立信任，再導向服務或商品。
 */

export type ContentPillar = "塔羅占卜" | "能量療癒" | "穿搭玄學" | "品牌私教";
export type NewsletterSegment =
  | "site_newsletter"
  | "signal-notes"
  | "brand-clarity"
  | "style-intention";

export type FreeTool = {
  id: string;
  number: string;
  title: string;
  description: string;
  format: string;
  pages: string;
  downloadUrl: string;
  outcome: string;
  pill: string;
  action: string;
  accent: string;
  segment: NewsletterSegment;
};

export type Article = {
  slug: string;
  pillar: ContentPillar;
  title: string;
  excerpt: string;
  readingTime: string;
  date: string;
  image: string;
  accent: string;
  body: string[];
  takeaways: string[];
};

export type FreeResource = {
  id: string;
  kind: "clarity" | "style" | "evening" | "brand" | "energy-cards";
  name: string;
  category: "自我覺察" | "意圖穿搭" | "晚間回穩" | "療癒創作" | "情境急救";
  description: string;
  detail: string;
  image: string;
  badge?: string;
  href: string;
  action: string;
};

export const leadCapture = {
  provider: "Portaly",
  url: "https://portaly.cc/vivi168",
  title: "美心學苑｜月光來信＋免費工具",
  primaryLabel: "領取免費工具",
  shortLabel: "在 Portaly 留下 Email",
  description: "留下 Email，收到月光來信與後續免費工具更新；可隨時取消訂閱。",
} as const;

/** Netlify and Sites both publish the versioned files under client/public. */
const publicAssetBase = "/assets";

export const asset = {
  hero: `${publicAssetBase}/images/vivi-moonlit-library-hero.jpg`,
  innerGardenHero: `${publicAssetBase}/images/vivi-inner-garden-hero.webp`,
  homeHeroDesktop: `${publicAssetBase}/images/vivi-home-inner-garden-desktop.jpg`,
  homeHeroMobile: `${publicAssetBase}/images/vivi-home-inner-garden-mobile.jpg`,
  tarot: `${publicAssetBase}/images/vivi-tarot-journal.jpg`,
  energy: `${publicAssetBase}/images/vivi-energy-ritual.jpg`,
  style: `${publicAssetBase}/images/vivi-style-luck.jpg`,
  seal: `${publicAssetBase}/images/vivi-meixin-academy-moon-star-emblem.webp`,
  viviPortrait: `${publicAssetBase}/images/JZ6_7995.webp`,
  originalLogo: `${publicAssetBase}/images/vivi-original-logo.webp`,
  energyFirstAid01: `${publicAssetBase}/images/energy-cards/energy-card-01.webp`,
  energyFirstAid02: `${publicAssetBase}/images/energy-cards/energy-card-02.webp`,
  energyFirstAid03: `${publicAssetBase}/images/energy-cards/energy-card-03.webp`,
  energyFirstAid04: `${publicAssetBase}/images/energy-cards/energy-card-04.webp`,
  energyFirstAid05: `${publicAssetBase}/images/energy-cards/energy-card-05.webp`,
  energyFirstAid06: `${publicAssetBase}/images/energy-cards/energy-card-06.webp`,
  energyFirstAid07: `${publicAssetBase}/images/energy-cards/energy-card-07.webp`,
  energyFirstAid08: `${publicAssetBase}/images/energy-cards/energy-card-08.webp`,
  energyFirstAid09: `${publicAssetBase}/images/energy-cards/energy-card-09.webp`,
  energyFirstAid10: `${publicAssetBase}/images/energy-cards/energy-card-10.webp`,
  energyFirstAid11: `${publicAssetBase}/images/energy-cards/energy-card-11.webp`,
  energyFirstAid12: `${publicAssetBase}/images/energy-cards/energy-card-12.webp`,
} as const;

export const navItems = [
  { label: "首頁", href: "/" },
  { label: "閱讀室", href: "/journal" },
  { label: "塔羅抽牌", href: "/tarot-daily" },
  { label: "免費工具", href: "/tools" },
  { label: "服務", href: "/services" },
  { label: "免費資源庫", href: "/shop" },
  { label: "關於 Vivi", href: "/about" },
];

export const pillars = [
  {
    title: "塔羅占卜",
    eyebrow: "READ THE PATTERN",
    description: "把反覆出現的訊號，整理成你今天能做的選擇。",
    image: asset.tarot,
    href: "/journal?pillar=tarot",
    tone: "tarot",
  },
  {
    title: "能量療癒",
    eyebrow: "RETURN TO YOURSELF",
    description: "讓身體、情緒與日常節奏重新回到可以呼吸的位置。",
    image: asset.energy,
    href: "/journal?pillar=energy",
    tone: "energy",
  },
  {
    title: "穿搭玄學",
    eyebrow: "DRESS WITH INTENTION",
    description: "從色彩、輪廓與配件，練習讓外在成為你想被看見的訊號。",
    image: asset.style,
    href: "/journal?pillar=style",
    tone: "style",
  },
];

export const articles: Article[] = [
  {
    slug: "from-top-sales-to-healing",
    pillar: "能量療癒",
    title: "我曾把業績做到第一，後來卻連人群都想躲開",
    excerpt:
      "從帶團隊、衝業績，到恐慌症與一段沒有收入的日子。這是我為什麼開始接觸療癒，也重新學習怎麼被人理解。",
    readingTime: "7 分鐘閱讀",
    date: "2026.08.27",
    image: asset.homeHeroDesktop,
    accent: "energy",
    body: [
      "很長一段時間，我都在做微商。帶團隊、帶代理、衝業績，我習慣要求自己做到最好，也很在意別人眼中的我。那時候，帶大家賺到錢，是我最開心的事。",
      "更早以前，我在家偷偷做網拍。第一筆收入只有六百元，後來慢慢有了三千元。金額不大，卻讓我第一次看見：原來一個放在心裡很久的想法，可以先從小地方做出來。",
      "後來，一段事業與人際上的衝擊讓我出現恐慌症。我開始討厭人群，不想開群，也不想再扛著所有人的動力。以前很熟悉的社群和帶人，突然變成我最想避開的地方。",
      "那段時間，我很久沒有收入。嘴上一直告訴自己，只是時間的問題，我一定可以；每天醒來，還是得處理對未來的害怕。療癒對我來說，先是讓自己有辦法把一天過完，再慢慢看見身邊一直有人支持我。",
      "有了療癒工具之後，我開始想幫助別人。新的問題也出現了：我知道自己能陪人整理狀態，陌生人卻不知道我能做什麼，更不知道該怎麼靠近我。",
      "所以我重新學內容、學自媒體，也重新理解商業。療癒師有能力是一件事，能不能把能力說成別人聽得懂的話，又是另一件事。當一個人看懂你在處理什麼問題，信任才有地方開始。",
      "美心學苑就是從這段路長出來的。我把曾經帶團隊與做業績的經驗，和後來走過恐慌、療癒自己的過程放在一起。現在我想做的，是陪一個已經有能力的人，把感受整理好，也把專業說清楚。",
    ],
    takeaways: [
      "寫下一個你最近最想撤退的時刻，記錄當時發生了什麼。",
      "分開看看：現在需要先照顧的是情緒，還是缺少一個能練習的方法。",
      "選一個不用等到完全有把握，也能在今天開始的小動作。",
    ],
  },
  {
    slug: "first-six-hundred-online-business",
    pillar: "品牌私教",
    title: "第一筆 600 元，讓我知道在家也能替自己開一條路",
    excerpt:
      "從不敢告訴家人，到 600 元、3,000 元的網拍收入。小小的結果，讓一個放了很久的創業念頭開始被相信。",
    readingTime: "5 分鐘閱讀",
    date: "2026.08.27",
    image: asset.style,
    accent: "brand",
    body: [
      "我最早的線上創業，是在家做網拍。剛開始時，我沒有告訴先生。那個想法還沒有任何證明，我只知道自己想試一次。",
      "第一筆收入是六百元，後來慢慢有了三千元。數字不大，對當時的我卻很重要。它讓我看見，放在心裡很久的念頭，可以用一次上架、一筆訂單，慢慢做出結果。",
      "先生看到我真的能靠這件事產生收入後，也開始相信我有這個能力。他沒有再吐槽，願意讓我放心繼續做。那份支持不是憑空出現，是在一個看得見的小結果之後慢慢長出來的。",
      "整個過程都發生在家裡。我沒有離開家庭，也沒有等到所有條件都準備好，先用當時有的手機、電腦和時間開始。那是我第一次知道，創業可以先小到不需要向誰證明。",
      "現在回頭看，六百元沒有立刻改變生活，卻改變了我看自己的方式。我不再只把那個想法當成夢，也開始相信自己能替它開出下一段路。",
      "如果你也有一件想了很多年的事，可以先替它找一個能被完成的小版本。先做出第一個能看見的結果，再決定要不要走得更遠。",
    ],
    takeaways: [
      "寫下一件你想了很久，卻一直沒有開始的事。",
      "把第一步縮小成七天內能完成、能被看見的一個結果。",
      "先用目前有的工具試一次，不急著要求家人立刻理解全部計畫。",
    ],
  },
  {
    slug: "healing-skills-need-clear-content",
    pillar: "品牌私教",
    title: "學會療癒之後，我才發現會做和被理解有一段距離",
    excerpt:
      "有了療癒工具，也想幫助別人，陌生人卻不知道你能處理什麼。這是 Vivi 為什麼重新學內容與自媒體。",
    readingTime: "6 分鐘閱讀",
    date: "2026.08.27",
    image: asset.hero,
    accent: "brand",
    body: [
      "我開始做內容，原因很直接：有了療癒工具，也想幫助別人，卻沒有辦法被看見。能力放在自己心裡，陌生人不會自動知道我能陪她處理什麼。",
      "以前帶團隊時，我需要一直看著群組、維持大家的動力。走過事業與人際上的衝擊後，我對這種追著人跑的方式感到很累。我希望別人能先從內容理解我，再決定要不要靠近。",
      "開始經營自媒體後，我也走過很用力的階段。我曾經花四、五個小時完成一篇 IG 內容，還是覺得表達不夠精準。花很多時間，不一定能讓需要的人看懂。",
      "所以我繼續學習，研究受眾怎麼理解內容，也整理自己真正想說的話。我想讓療癒師知道，學會一項助人工具只是起點，還需要把服務、問題與方法說清楚。",
      "內容的工作，是讓一個正在困擾的人認出自己的處境，也看見你會怎麼陪她往下走。當這段理解建立起來，服務才有機會被詢問。",
      "這也成為美心學苑很重要的一條主線：陪已經有能力的人，把生命經驗與專業整理成讀者聽得懂、自己也站得穩的內容。",
    ],
    takeaways: [
      "寫下一個你確實能協助的生活問題，不先介紹工具名稱。",
      "用一個具體場景說明，這個問題通常在什麼時候出現。",
      "檢查服務入口，確認讀者看完後知道可以怎麼繼續靠近。",
    ],
  },
  {
    slug: "love-tarot-question",
    pillar: "塔羅占卜",
    title: "感情卡住時，先別急著問「他還愛不愛我」",
    excerpt: "一個更能讓你回到自己、也更能推進關係判斷的抽牌提問方式。",
    readingTime: "6 分鐘閱讀",
    date: "2026.08.21",
    image: asset.tarot,
    accent: "tarot",
    body: [
      "當關係讓人不安時，我們很容易把問題丟向對方：他是不是不愛了？他到底會不會回來？這些問題沒有錯，只是它們經常把你放在一個只能等待答案的位置。",
      "更有力量的提問，是把焦點帶回你自己。例如：我在這段關係裡真正害怕失去的是什麼？我現在最需要看清的互動模式是什麼？如果我尊重自己的界線，下一步會長成什麼樣子？",
      "占卜不是替你決定，而是提供一面能被讀懂的鏡子。當你願意把牌面放回自己的生活脈絡，答案才會從『猜對方』變成『看見自己』。",
    ],
    takeaways: [
      "先寫下你真正想確認的情緒，而不是只問對方的行動。",
      "一題只問一個核心，讓牌面有清楚的回應空間。",
      "抽完牌後，為自己寫下一個 24 小時內能做到的小行動。",
    ],
  },
  {
    slug: "money-energy-reset",
    pillar: "能量療癒",
    title: "覺得財運卡住時，先檢查你是不是一直在耗能",
    excerpt:
      "不是每一次不順都是運氣問題；有時候，你只是長期把力氣花在不屬於自己的地方。",
    readingTime: "5 分鐘閱讀",
    date: "2026.08.18",
    image: asset.energy,
    accent: "energy",
    body: [
      "談財運時，很多人第一反應是想找一個能立刻轉運的方法。但在真正安排新計畫前，不妨先觀察：你是否正在用過度解釋、過度付出或不敢拒絕，把每天的能量花得太快？",
      "金錢感受常常和安全感連在一起。當你覺得自己不值得收費、不敢接住讚美，或把每個需求都當成必須答應的請求，收入的問題有時不只在策略，也在你如何保護自己的資源。",
      "能量整理不是把現實責任推給宇宙，而是讓你先恢復可選擇的狀態。從停止一件不必要的耗能行為開始，就是一種新的流動。",
    ],
    takeaways: [
      "列出本週三件讓你明顯耗能、卻沒有回報的事。",
      "為其中一件事設定清楚的時間或回覆邊界。",
      "將省下的 30 分鐘投入能讓你長期累積的工作。",
    ],
  },
  {
    slug: "wear-your-intention",
    pillar: "穿搭玄學",
    title: "你今天想被怎麼看見？從衣櫃裡選一個訊號",
    excerpt: "穿搭不是替你扮演另一個人，而是把你想站穩的狀態，先穿在身上。",
    readingTime: "4 分鐘閱讀",
    date: "2026.08.14",
    image: asset.style,
    accent: "style",
    body: [
      "當你需要被信任，不一定要把自己穿得更有距離；當你想被注意，也不需要把所有元素同時放大。好的穿搭先回答一件事：今天，我想把哪一種能量帶進這個場域？",
      "你可以從色彩開始。深綠有安定、專注與界線感；暖珊瑚能帶來親近與活力；金屬小配件則會在不說話時，替你留下精緻且有主見的訊號。",
      "穿搭玄學的核心不是迷信單一幸運色，而是讓外在選擇和內在意圖開始一致。當你知道自己想被怎麼看見，衣櫃會變得更好用。",
    ],
    takeaways: [
      "出門前先用一句話命名今天想帶出的狀態。",
      "只選一個主訊號：色彩、輪廓或配件，不要全部同時加重。",
      "晚上回看：這套穿著有沒有幫你更接近想成為的自己？",
    ],
  },
  {
    slug: "healer-brand-language",
    pillar: "品牌私教",
    title: "療癒師的內容不轉單，常常不是因為你不夠會寫",
    excerpt:
      "當專業、受眾與服務之間缺少翻譯，越努力發文，越容易把自己寫得更模糊。",
    readingTime: "7 分鐘閱讀",
    date: "2026.08.11",
    image: asset.hero,
    accent: "brand",
    body: [
      "很多助人工作者能很準確地接住一對一個案，卻在公開內容裡只剩下抽象詞。不是你沒有深度，而是你還沒有把專業翻成客戶正在經歷的生活場景。",
      "一篇能建立信任的內容，至少要讓讀者知道三件事：這篇在說誰、她正在面對什麼、你為什麼理解這個問題。當這三件事清楚，你才有機會從被稱讚，走到被詢問。",
      "品牌定位不是限制你，而是幫對的人更快找到你。真正的自由，往往從說清楚開始。",
    ],
    takeaways: [
      "把『我能量療癒很厲害』翻成一個讀者能認出的生活場景。",
      "每篇內容只承接一種卡點，不要一次放進所有專業。",
      "文章結尾保留一個低壓力下一步，讓讀者知道如何繼續靠近你。",
    ],
  },
];

export const tools: FreeTool[] = [
  {
    id: "signal-notes",
    number: "01",
    title: "反覆訊號整理表",
    description: "把最近重複出現的人、事、夢與情緒，整理成能回看的覺察筆記。",
    format: "PDF 練習表",
    pages: "3 頁可書寫練習",
    downloadUrl: `${publicAssetBase}/downloads/repeating-signals-workbook.pdf`,
    outcome: "辨認一個反覆迴圈，完成一句提醒與一個 10 分鐘行動。",
    segment: "signal-notes",
    pill: "免費下載",
    action: "下載整理表",
    accent: "tarot",
  },
  {
    id: "brand-clarity",
    number: "02",
    title: "療癒型創作者的定位急救表",
    description:
      "把助人經驗、受眾場景與服務承諾整理成一句定位，再產出三個內容入口。",
    format: "PDF 定位工作表",
    pages: "5 頁策略練習",
    downloadUrl: `${publicAssetBase}/downloads/healer-positioning-workbook.pdf`,
    outcome: "完成一句定位與 72 小時內可發布的第一篇內容題目。",
    segment: "brand-clarity",
    pill: "免費下載",
    action: "領取急救表",
    accent: "brand",
  },
  {
    id: "style-intention",
    number: "03",
    title: "今天穿什麼：意圖穿搭卡",
    description: "從場景、色彩、輪廓與衣櫥單品，做出能支持今天狀態的穿搭選擇。",
    format: "PDF 意圖穿搭卡",
    pages: "5 頁造型練習",
    downloadUrl: `${publicAssetBase}/downloads/intentional-style-card.pdf`,
    outcome: "完成一套當日造型與七天訊號實驗。",
    segment: "style-intention",
    pill: "免費下載",
    action: "收藏穿搭卡",
    accent: "style",
  },
];

export const services = [
  {
    id: "private-coaching",
    eyebrow: "深度陪跑",
    title: "療癒師自媒體 1 對 1 私教",
    summary: "給已經有助人專業、卻仍卡在定位、內容與承接的女性創作者。",
    outcome:
      "12 週內，完成定位句、內容主題地圖、核心服務說明與從內容走到諮詢的路徑。",
    price: "依合作範圍提供書面報價，付款前可完整確認。",
    duration: "12 週；會談頻率與文字回覆時段於適配後書面確認。",
    format: "線上進行，一對一會談搭配約定範圍內的文字回饋。",
    delivery:
      "定位句、內容主題地圖、核心服務說明與內容到諮詢的承接路徑。",
    followUp: "12 週內依書面方案提供支持；不包含未約定的即時或無期限回覆。",
    suitableFor:
      "已有助人專業或深度生命經驗，正在創作、接案或準備整理核心服務的人。",
    notSuitableFor:
      "尚未有想發展的能力方向，或期待保證流量、收入與代為完成全部內容的人。",
    href: "/services#private-coaching",
    cta: "申請適配諮詢",
    featured: true,
  },
  {
    id: "tarot-session",
    eyebrow: "清楚看見",
    title: "一對一塔羅占卜諮詢",
    summary: "為感情、工作與人生選擇，整理當下真正需要被看見的訊息。",
    outcome: "從混亂的感受裡找回問題的核心，帶走你能在生活裡實際採取的下一步。",
    price: "目前採預約前書面報價；確認費用後再決定是否預約。",
    duration: "單次服務時間與可預約時段，會在付款前書面確認。",
    format: "進行方式與使用工具會依本次問題，在預約前說明。",
    delivery: "聚焦一個主要問題，完成牌面整理、書寫提示與可執行的下一步。",
    followUp: "是否包含會後文字整理或追問，會在付款前列入服務說明。",
    suitableFor: "想整理感情、工作或人生選擇，並願意把焦點帶回自己的人。",
    notSuitableFor:
      "期待預言確定結果、替他人做決定，或需要醫療、法律、財務與心理治療建議的人。",
    href: "/services#tarot-session",
    cta: "了解諮詢方式",
    featured: false,
  },
  {
    id: "energy-reset",
    eyebrow: "回到自己",
    title: "能量整理與狀態回穩",
    summary: "給長期耗能、反覆內耗，想重新找回節奏與邊界的人。",
    outcome:
      "透過對話與專屬練習，辨識讓你耗能的模式，建立可被日常接住的調整方式。",
    price: "目前採預約前書面報價；確認費用後再決定是否預約。",
    duration: "單次時間、服務次數與可預約時段，會在付款前書面確認。",
    format: "進行方式與練習內容會依現況，在預約前說明。",
    delivery: "整理目前最耗能的模式，帶走一份可回到日常使用的調整練習。",
    followUp: "是否包含後續回覆或複次支持，會在付款前列入服務說明。",
    suitableFor: "長期耗能、反覆內耗，想重新整理生活節奏與界線的人。",
    notSuitableFor:
      "處於急性危機、需要診斷或治療，或期待以能量服務取代醫療與心理專業的人。",
    href: "/services#energy-reset",
    cta: "探索適合的支持",
    featured: false,
  },
];

export const freeResources: FreeResource[] = [
  {
    id: "clarity-notebook",
    kind: "clarity",
    name: "月光書房｜七日覺察筆記",
    category: "自我覺察",
    description: "七天練習，從混亂訊號裡整理出你真正想靠近的方向。",
    detail: "每日提問、訊號辨認與一個可在 10 分鐘內開始的小行動。",
    image: asset.tarot,
    badge: "7 天練習",
    href: "/resources/clarity-notebook",
    action: "開始七日覺察",
  },
  {
    id: "style-signal-cards",
    kind: "style",
    name: "穿搭開運｜意圖風格卡",
    category: "意圖穿搭",
    description: "為約會、提案、休息與重啟日，挑選能替你說話的穿搭訊號。",
    detail: "依場景選出色彩、輪廓與一個配件錨點，完成今日穿搭句。",
    image: asset.style,
    badge: "3 種場景",
    href: "/resources/style-signal-cards",
    action: "選一張意圖卡",
  },
  {
    id: "energy-reset-kit",
    kind: "evening",
    name: "能量回穩｜晚間小儀式",
    category: "晚間回穩",
    description: "為忙碌與耗能的晚上，保留一段能慢慢回到自己的時間。",
    detail: "三步驟晚間收尾、可勾選回穩清單與一段明日交代。",
    image: asset.energy,
    badge: "10 分鐘",
    href: "/resources/energy-reset-kit",
    action: "開始晚間回穩",
  },
  {
    id: "brand-foundation",
    kind: "brand",
    name: "療癒品牌｜內容承接地圖",
    category: "療癒創作",
    description:
      "給已開始接案的療癒型創作者，把內容、免費資源與諮詢入口串成一條路。",
    detail: "用三個欄位完成你的服務定位句與三個可發布的內容入口。",
    image: asset.hero,
    badge: "3 欄完成",
    href: "/resources/brand-foundation",
    action: "畫出內容承接地圖",
  },
  {
    id: "energy-first-aid",
    kind: "energy-cards",
    name: "把自己穿回來｜開口前3分鐘急救卡",
    category: "情境急救",
    description:
      "當你要開口、面對人群、說出條件或設下界線時，用 3 分鐘讀懂狀態、回到身體，完成下一步。",
    detail:
      "完整 12 張情境急救卡；含身體復位、衣物錨點、可複製出場句、場景卡組與可收藏處方。",
    image: asset.energyFirstAid01,
    badge: "完整免費體驗",
    href: "/energy-cards",
    action: "探索 12 張急救卡",
  },
];

export const socialLinks = {
  instagram: "https://www.instagram.com/vivi_college/",
  line: "https://lin.ee/eX7HkiC",
  lineOfficialAccountId: "@772broux",
  application: "https://forms.gle/i5fUrxmJ4rw55cfKA",
};
