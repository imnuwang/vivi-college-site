import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Bookmark, Check, Copy, CreditCard, Heart, Play, RotateCcw, Search, Sparkles, TimerReset, WandSparkles, X } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { asset, products } from "@/data/catalog";
import "./energy-cards.css";

type RescueCard = {
  id: number;
  title: string;
  sub: string;
  diagnosis: string;
  color: string;
  image: string;
  tags: string[];
  keywords: string[];
  anchor: string;
  anchorHint: string;
  command: string;
  action: string;
  protocol: { title: string; note: string }[];
};

type Scenario = { id: "job" | "relationship" | "social"; title: string; short: string; prompt: string; cardIds: number[]; intro: string };

const rescueCards: RescueCard[] = [
  { id: 1, title: "鏡頭前縮起來", sub: "手放到錄影鍵上，卻怎麼也按不下去", diagnosis: "不是你沒內容；是身體先把被看見判成需要防守的時刻。", color: "灰褐", image: asset.energyFirstAid01, tags: ["出場", "自我懷疑"], keywords: ["鏡頭", "拍片", "錄影", "出鏡", "不敢", "社群", "相機"], anchor: "有結構感的外套或領口", anchorHint: "先把上半身包住，讓肩背知道：我有邊界。", command: "我不必一次表現很好；我只要先把第一句留在鏡頭裡。", action: "打開前鏡頭，只錄第一句：嗨，我是＿＿＿。", protocol: [{ title: "踩地", note: "雙腳用力踩地 3 秒。" }, { title: "吐氣", note: "吐氣比吸氣長，連做 3 次。" }, { title: "按下去", note: "不調燈、不重寫，直接錄第一句。" }] },
  { id: 2, title: "介紹自己就心虛", sub: "一要說清楚自己是誰、重視什麼，聲音就變小", diagnosis: "你不是沒有價值；是把讓人認識自己，誤認成必須先證明自己夠好。", color: "深莓紅", image: asset.energyFirstAid02, tags: ["出場", "價值"], keywords: ["服務", "介紹", "面試", "價值", "心虛", "自我介紹", "邀請", "銷售"], anchor: "一個讓你站直的莓紅細節", anchorHint: "選讓你願意抬頭介紹自己的那一個。", command: "我不是在證明我夠不夠好；我是在讓人認識真實的我。", action: "寫下：我是＿＿＿，我重視＿＿＿，我現在想說的是＿＿＿。", protocol: [{ title: "放肩", note: "把肩往上聳一次，再放下。" }, { title: "想一人", note: "只想一位你希望被理解的人。" }, { title: "說一句", note: "先說你重視什麼。" }] },
  { id: 3, title: "重要對話前耗盡", sub: "要談一件在乎的事，卻已經在腦中預演到沒力", diagnosis: "你不是不重視；是預先承擔所有可能的反應，身體才想取消。", color: "深海軍藍", image: asset.energyFirstAid03, tags: ["出場", "耗竭", "關係"], keywords: ["重要對話", "談話", "溝通", "會議", "談判", "上台", "取消", "壓力", "工作", "累"], anchor: "一雙能讓腳底穩住的鞋", anchorHint: "選不必分心調整、可以穩穩走路的一雙。", command: "我不必控制對方的反應；我只要把真正想說的一件事帶進去。", action: "寫下：今天我最想讓對方知道的是＿＿＿。", protocol: [{ title: "定點", note: "看著固定物 30 秒，停止預演。" }, { title: "收回", note: "雙手壓在大腿上，感覺重量。" }, { title: "定句", note: "決定今天唯一不可省略的一句話。" }] },
  { id: 4, title: "談薪資就想退", sub: "還沒談條件，就先覺得自己要求太多", diagnosis: "不是你太貪心；是身體把為自己爭取，先判成可能失去關係的風險。", color: "暖棕", image: asset.energyFirstAid04, tags: ["界線", "價值"], keywords: ["薪資", "加薪", "待遇", "談薪", "條件", "價格", "報價", "降價", "錢"], anchor: "有份量感的手錶或飾品", anchorHint: "讓手說話時碰得到它，提醒自己不必急著填滿沉默。", command: "我不是在乞求被允許；我在清楚說出對等條件。", action: "練習：依照這份職責，我期待的範圍是＿＿＿。說完停兩秒。", protocol: [{ title: "踩地", note: "把雙腳完整踩進地面。" }, { title: "先說範圍", note: "先說數字或範圍。" }, { title: "停兩秒", note: "說完數 1、2，讓對方回應。" }] },
  { id: 5, title: "被質疑後想消失", sub: "被比較、否定或誤解後，只想把自己藏起來", diagnosis: "你不是太脆弱；保護系統正在要求你先撤走，避免再次被碰到。", color: "墨綠", image: asset.energyFirstAid05, tags: ["關係", "自我懷疑"], keywords: ["否定", "批評", "負評", "比較", "質疑", "受傷", "難過", "想消失"], anchor: "一層有包覆感的外套", anchorHint: "讓身體感到被包住，不必強迫自己立刻振作。", command: "我可以接住這個感受，但不必用消失來證明我在保護自己。", action: "先不回覆。寫下：我仍願意在＿＿＿時，說出＿＿＿。", protocol: [{ title: "離開螢幕", note: "把手機扣下 60 秒。" }, { title: "找支撐", note: "背靠椅背或牆。" }, { title: "留一句", note: "寫下仍願意說的話。" }] },
  { id: 6, title: "送出後又想收回", sub: "一傳出訊息，就反覆檢查、覺得自己很尷尬", diagnosis: "這是出場後的警報，不代表你剛剛說錯了。", color: "灰綠", image: asset.energyFirstAid06, tags: ["出場", "焦慮"], keywords: ["刪掉", "訊息", "尷尬", "檢查", "後悔", "收回", "已讀", "重發"], anchor: "一件不需要調整的灰綠襯衫", anchorHint: "用低刺激布料提醒自己，從螢幕評分回到身體。", command: "尷尬是我正在習慣被看見的訊號，不是撤退指令。", action: "設定 24 小時不收回；離開手機完成一件身體會感到好的小事。", protocol: [{ title: "放下手機", note: "把手機移到看不見的地方。" }, { title: "說完成", note: "對自己說：我做完了。" }, { title: "延後判斷", note: "24 小時後再決定要不要補充。" }] },
  { id: 7, title: "拒絕請求很內疚", sub: "心裡不想答應，卻怕對方失望或討厭你", diagnosis: "拒絕一個請求，不等於拒絕一個人。", color: "珊瑚橘", image: asset.energyFirstAid07, tags: ["界線", "關係"], keywords: ["拒絕", "請求", "幫忙", "答應", "內疚", "不好意思", "不想", "討好"], anchor: "一件有肩線的暖色外層", anchorHint: "讓肩背帶來一點向前的力量。", command: "我可以溫和，也可以清楚。我的拒絕不需要被包裝成道歉。", action: "傳出：謝謝你想到我，但這次我無法答應。停在句點。", protocol: [{ title: "站直", note: "雙腳平放，讓肩膀回到背上。" }, { title: "說短句", note: "只練習拒絕，不先寫長篇說明。" }, { title: "送出去", note: "按下發送後，把手離開手機。" }] },
  { id: 8, title: "想被看見，又怕太高調", sub: "渴望被認可，卻一出頭就覺得不自在", diagnosis: "你不是矛盾；你只是在練習把柔軟與存在感放在同一個身體裡。", color: "柔粉", image: asset.energyFirstAid08, tags: ["出場", "自我懷疑"], keywords: ["看見", "認可", "高調", "存在感", "害怕", "顯眼", "曝光"], anchor: "一個柔粉色的結構細節", anchorHint: "讓你感到自己有位置，不必偽裝成別人。", command: "我不必搶走誰的光；我只是在自己的位置上亮起來。", action: "在一段對話或會議裡，說出一個你真正的觀點。", protocol: [{ title: "看前方", note: "抬頭看遠處固定一點 10 秒。" }, { title: "碰錨點", note: "摸一摸你的粉色細節。" }, { title: "留一句", note: "準備一句願意被聽見的話。" }] },
  { id: 9, title: "被冒犯，卻吞回去", sub: "心裡很不舒服，嘴上還在說沒關係", diagnosis: "你不需要更兇；你需要停止把不舒服翻譯成別人的方便。", color: "鐵灰", image: asset.energyFirstAid09, tags: ["界線", "關係"], keywords: ["冒犯", "生氣", "委屈", "沒關係", "不舒服", "侵犯", "吞"], anchor: "有拉鍊或扣件的灰黑外套", anchorHint: "用可感知的結構提醒自己：我可以關上不該開著的門。", command: "我的不舒服，不需要先被證明合理，才值得被我自己聽見。", action: "把沒關係換成：這樣的方式我不太舒服，我需要＿＿＿。", protocol: [{ title: "握拳再放", note: "握緊拳頭 3 秒後放開。" }, { title: "命名", note: "說出：我現在感到不舒服。" }, { title: "換一句", note: "選一個不攻擊但清楚的回應。" }] },
  { id: 10, title: "空虛，找不到自己", sub: "一直滑手機、一直忙，卻不知道自己要什麼", diagnosis: "不需要立刻找到答案；先讓身體從一直向外找，回到可以停留的地方。", color: "米杏", image: asset.energyFirstAid10, tags: ["低落", "耗竭"], keywords: ["空虛", "迷失", "找不到", "不知道", "麻木", "滑手機", "沒有方向", "孤單"], anchor: "一件有觸感的米杏針織", anchorHint: "先摸得到自己，不需要先想通人生。", command: "今天我不急著定義自己；我只要回到一個讓身體舒服的選擇。", action: "離開螢幕 3 分鐘，寫下：此刻我最想少一點的是＿＿＿。", protocol: [{ title: "摸布料", note: "用手慢慢摸過衣物紋理。" }, { title: "看四周", note: "說出眼前四個米色或白色物件。" }, { title: "少一點", note: "決定今天先少做一件什麼。" }] },
  { id: 11, title: "社交耗竭，只想躲起來", sub: "要面對人群，但不想再假裝自己很有精神", diagnosis: "你不必假裝外向；你需要低耗能又能保留真實的出場方式。", color: "金色", image: asset.energyFirstAid11, tags: ["耗竭", "關係"], keywords: ["社交", "人群", "躲", "沒電", "累", "聚會", "應酬", "不想見人", "耗竭"], anchor: "一個讓你感到有位置的金色小細節", anchorHint: "以一點光感提醒自己：可以在場，不必把自己全部交出去。", command: "我可以在場，但不必把自己全部交出去。", action: "出門前設定離場時間，並只準備一個真實問題問對方。", protocol: [{ title: "降音量", note: "讓吐氣慢下來，肩膀落下。" }, { title: "設出口", note: "先決定何時離開。" }, { title: "留一問", note: "只準備一個真實問題。" }] },
  { id: 12, title: "焦慮睡不著，腦停不下來", sub: "身體已經累了，腦中還在排演明天所有事", diagnosis: "你不需要立刻睡著；先讓身體收到現在可以降速的訊號。", color: "淺藍", image: asset.energyFirstAid12, tags: ["焦慮", "低落"], keywords: ["焦慮", "睡不著", "失眠", "停不下來", "心慌", "晚上", "腦", "煩", "緊張"], anchor: "一件柔軟的淺藍外層或披肩", anchorHint: "把身體包進低刺激冷色調，不必再替明天預演。", command: "今天不需要把明天全部解決；現在只需要讓身體知道可以停下來。", action: "寫下明天最重要的一件事，然後把手機放到看不見的地方。", protocol: [{ title: "關光源", note: "先把最亮的螢幕或燈關掉。" }, { title: "長吐氣", note: "吐氣 6 秒，連做 4 次。" }, { title: "留明天", note: "只寫下一件明天再處理的事。" }] },
];

const tags = ["全部", "出場", "焦慮", "界線", "關係", "低落", "耗竭", "自我懷疑", "價值"];
const scenarios: Scenario[] = [
  { id: "job", title: "求職與工作", short: "面試、談薪資、重要對話", prompt: "我有面試、談薪資或重要工作對話，現在很怕自己說不好。", cardIds: [2, 4, 3], intro: "先把介紹自己、談條件與重要對話拆成可完成的下一步。" },
  { id: "relationship", title: "關係與界線", short: "拒絕請求、被冒犯、說出需要", prompt: "我想拒絕一個請求或說出不舒服，但怕對方失望。", cardIds: [7, 9, 3], intro: "先把不舒服命名、把拒絕說短，並把重要的話留在對話裡。" },
  { id: "social", title: "社交與人群", short: "聚會、見人、被看見", prompt: "我等一下要見人或去聚會，但只想躲起來。", cardIds: [11, 8, 6], intro: "先讓身體降耗能，再選一個真實而不勉強的出場方式。" },
];
const storageKey = "vivi-energy-first-aid-v1";
const today = () => new Date().toISOString().slice(0, 10);
const energyFirstAidProduct = products.find((product) => product.id === "energy-first-aid");

function findBestCard(text: string) {
  const query = text.trim().toLowerCase();
  if (!query) return null;
  const ranked = rescueCards.map((card) => ({ card, score: card.keywords.reduce((score, word) => score + (query.includes(word.toLowerCase()) ? word.length + 2 : 0), 0) + card.tags.reduce((score, tag) => score + (query.includes(tag) ? 3 : 0), 0) })).sort((a, b) => b.score - a.score);
  return ranked[0]?.score ? ranked[0].card : rescueCards[0];
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; }
  const helper = document.createElement("textarea");
  helper.value = text; helper.style.position = "fixed"; helper.style.opacity = "0"; document.body.appendChild(helper); helper.select(); document.execCommand("copy"); helper.remove();
}

export default function EnergyCards() {
  const [selected, setSelected] = useState<RescueCard>(rescueCards[0]);
  const [activeTag, setActiveTag] = useState("全部");
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState<RescueCard | null>(null);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [checkinDate, setCheckinDate] = useState("");
  const [timerOpen, setTimerOpen] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const [running, setRunning] = useState(false);
  const [protocolIndex, setProtocolIndex] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => { const raw = localStorage.getItem(storageKey); if (!raw) return; try { const data = JSON.parse(raw) as { saved?: number[]; checkinDate?: string }; setSaved(data.saved ?? []); setCheckinDate(data.checkinDate ?? ""); } catch { localStorage.removeItem(storageKey); } }, []);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify({ saved, checkinDate })); }, [saved, checkinDate]);
  useEffect(() => { if (!running) return; if (seconds <= 0) { setRunning(false); setToast("3 分鐘完成。現在只做卡片上的下一個行動。 "); return; } const id = window.setInterval(() => setSeconds((value) => value - 1), 1000); return () => window.clearInterval(id); }, [running, seconds]);
  useEffect(() => { if (!toast) return; const id = window.setTimeout(() => setToast(""), 2600); return () => window.clearTimeout(id); }, [toast]);

  const visibleCards = useMemo(() => activeScenario ? rescueCards.filter((card) => activeScenario.cardIds.includes(card.id)) : activeTag === "全部" ? rescueCards : rescueCards.filter((card) => card.tags.includes(activeTag)), [activeScenario, activeTag]);
  const savedCards = useMemo(() => rescueCards.filter((card) => saved.includes(card.id)), [saved]);
  const isSaved = saved.includes(selected.id);
  const isCheckedIn = checkinDate === today();
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const chooseCard = (card: RescueCard, scroll = true) => { setSelected(card); if (scroll) window.setTimeout(() => document.getElementById("energy-rescue")?.scrollIntoView({ behavior: "smooth", block: "center" }), 20); };
  const recommend = (event: FormEvent) => { event.preventDefault(); const card = findBestCard(mood); if (!card) { setToast("先寫下一個你現在最卡的畫面。 "); return; } setActiveScenario(null); setRecommendation(card); chooseCard(card); setToast(`已為你找到：${card.title}`); };
  const chooseScenario = (scenario: Scenario) => { const first = rescueCards.find((card) => card.id === scenario.cardIds[0]) ?? rescueCards[0]; setMood(scenario.prompt); setActiveScenario(scenario); setActiveTag("全部"); setRecommendation(first); setSelected(first); setToast(`已準備好「${scenario.title}」的 3 張急救卡`); window.setTimeout(() => document.getElementById("energy-scene-pack")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30); };
  const reset = () => { localStorage.removeItem(storageKey); setSaved([]); setCheckinDate(""); setRecommendation(null); setMood(""); setActiveScenario(null); setActiveTag("全部"); setSelected(rescueCards[0]); setToast("已重設這台裝置的急救包"); };

  return <div className="energy-cards-page">
    <Seo title="把自己穿回來｜開口前 3 分鐘急救卡" description="以 12 張情境急救卡、關鍵字推薦、3 分鐘計時與可收藏處方，陪你在需要開口、設下界線或被看見前回到自己。" path="/energy-cards" image={asset.energyFirstAid01} />
    <main className="ec-shell">
      <section className="ec-hero">
        <div className="ec-hero-intro"><SectionEyebrow className="text-[#a9874d]">12 CARDS · 3 MINUTES · ENERGY × EXPRESSION</SectionEyebrow><h1>你現在的狀態，<br /><em>值得一張具體的急救卡。</em></h1><p>當你要開口、面對人群、說出條件、設下界線，或只是想停止躲起來時，用 3 分鐘讀懂狀態、回到身體，完成下一步。</p></div>
        <div className="ec-hero-controls"><span>12 張急救卡 · 資料只保存在此裝置</span><button type="button" onClick={() => document.getElementById("energy-mine")?.scrollIntoView({ behavior: "smooth" })}><Bookmark size={15} />我的急救包</button><button type="button" onClick={reset}><RotateCcw size={15} />重設</button></div>
      </section>
      <section className="ec-promise"><b>寫下困擾 → 找到對應卡 → 跑完 3 分鐘 → 完成一個出場動作</b><span>能量覺察是方法，穿搭是看得見的錨點。</span></section>
      <section className="ec-mood-engine" aria-label="心情輸入推薦"><div className="ec-mood-copy"><span>01 · 先說現在的狀態</span><h2>不需要說得很完整。</h2><p>也可以直接選一個場景，先跑完最接近的一組急救卡。</p></div><form onSubmit={recommend} className="ec-mood-form"><label htmlFor="energy-mood">此刻我最卡的是……</label><div className="ec-mood-input"><Search size={18} /><input id="energy-mood" value={mood} onChange={(event) => setMood(event.target.value)} placeholder="輸入一個情緒、畫面或困擾" /><button type="submit"><WandSparkles size={15} />推薦急救卡</button></div><div className="ec-mood-examples"><button type="button" onClick={() => setMood("我想談薪資，但很怕自己要求太多")}>談薪資很怕</button><button type="button" onClick={() => setMood("我不想答應，但怕對方失望")}>拒絕請求內疚</button><button type="button" onClick={() => setMood("我要談一件重要的事，但已經累到想取消")}>重要對話前耗盡</button></div><div className="ec-scene-quick"><span>一鍵試用</span>{scenarios.map((scenario) => <button type="button" key={scenario.id} className={activeScenario?.id === scenario.id ? "active" : ""} onClick={() => chooseScenario(scenario)}><b>{scenario.title}</b><small>{scenario.short}</small><ArrowRight size={13} /></button>)}</div></form></section>
      {activeScenario && <section id="energy-scene-pack" className="ec-scene-pack"><div><span>你的場景卡組</span><h2>{activeScenario.title}｜先跑這 3 張</h2><p>{activeScenario.intro}</p></div><button type="button" onClick={() => { setActiveScenario(null); setRecommendation(null); setMood(""); }}>回到完整 12 卡</button><div className="ec-scene-card-list">{rescueCards.filter((card) => activeScenario.cardIds.includes(card.id)).map((card, index) => <button type="button" key={card.id} className={selected.id === card.id ? "active" : ""} onClick={() => chooseCard(card)}><span>0{index + 1}</span><div><b>{card.title}</b><p>{card.action}</p></div><ArrowRight size={15} /></button>)}</div></section>}
      {recommendation && <section className="ec-recommendation"><span>你的推薦急救卡</span><div><img src={recommendation.image} alt="" /><div><h2>CARD {String(recommendation.id).padStart(2, "0")}｜{recommendation.title}</h2><p>{recommendation.sub}</p><button type="button" onClick={() => chooseCard(recommendation)}>{recommendation.action}<ArrowRight size={15} /></button></div></div></section>}
      <section className="ec-filter"><div><span>02 · 先選症狀，再取處方</span><h2>{activeScenario ? `${activeScenario.title}急救卡組` : "12 張能量出場急救卡"}</h2><p>衣物不提供答案；它只在你開始縮回去時，幫身體記得要站在哪裡。</p></div><small>顯示 {visibleCards.length} / {activeScenario ? "3" : "12"} 張</small></section>
      {!activeScenario && <div className="ec-tag-row">{tags.map((tag) => <button type="button" key={tag} className={activeTag === tag ? "active" : ""} onClick={() => setActiveTag(tag)}>{tag}</button>)}</div>}
      <section className="ec-grid" aria-label="選擇現在最接近的症狀">{visibleCards.map((card) => <button type="button" className={`ec-symptom-card ${selected.id === card.id ? "active" : ""}`} key={card.id} onClick={() => chooseCard(card)}><span className="ec-card-image"><img src={card.image} alt={`${card.title}的穿搭錨點示意`} loading="lazy" /></span><span className="ec-card-copy"><span>CARD {String(card.id).padStart(2, "0")} · {card.color}</span><b>{card.title}</b><p>{card.sub}</p><small>{card.tags.map((tag) => `#${tag}`).join("  ")}</small></span>{saved.includes(card.id) && <i>已收藏</i>}</button>)}</section>
      <section id="energy-rescue" className="ec-rescue"><div className="ec-rescue-image"><img src={selected.image} alt={`${selected.title}的穿搭錨點示意`} /><span>急救卡 {String(selected.id).padStart(2, "0")} / {selected.color}</span><div><h2>{selected.title}</h2><p>{selected.diagnosis}</p><small><Sparkles size={13} />3 分鐘後的產出：{selected.action}</small></div></div><div className="ec-rescue-body"><div className="ec-rescue-heading"><b>60 秒身體復位</b><span>照著做</span></div><div className="ec-protocol">{selected.protocol.map((step, index) => <div key={step.title}><span>0{index + 1}</span><b>{step.title}</b><p>{step.note}</p></div>)}</div><div className="ec-prescriptions"><article><span>現有衣物錨點 · {selected.color}</span><b>{selected.anchor}</b><p>{selected.anchorHint}</p></article><article><span>下一個不可跳過行動</span><b>{selected.action}</b><p>今天只需要做到這一步。</p></article></div><blockquote>「{selected.command}」</blockquote><div className="ec-actions"><button type="button" className="ec-run" onClick={() => { setSeconds(180); setProtocolIndex(0); setTimerOpen(true); setRunning(true); }}><Play size={15} />開始 3 分鐘急救</button><div><button type="button" onClick={async () => { try { await copyText(`${selected.command}\n\n下一個行動：${selected.action}`); setToast("已複製出場指令與下一步"); } catch { setToast("複製未成功，請手動選取文字。 "); } }}><Copy size={14} />複製指令</button><button type="button" onClick={() => { setSaved((items) => isSaved ? items.filter((id) => id !== selected.id) : [...items, selected.id]); setToast(isSaved ? "已從急救包移除" : "已收進我的急救包"); }}><Heart size={14} fill={isSaved ? "currentColor" : "none"} />{isSaved ? "已收藏" : "收藏"}</button></div></div></div></section>
      <section id="energy-mine" className="ec-mine"><SectionEyebrow className="text-[#a9874d]">MY FIRST-AID KIT</SectionEyebrow><h2>我為自己留下的急救卡</h2><p>把最常用的卡留在這裡。資料只存於這台裝置。</p>{savedCards.length ? <div className="ec-saved-list">{savedCards.map((card) => <article key={card.id}><img src={card.image} alt="" /><div><span>CARD {String(card.id).padStart(2, "0")} · {card.color}</span><b>{card.title}</b></div><button type="button" onClick={() => chooseCard(card)}>立即使用 →</button></article>)}</div> : <div className="ec-empty">還沒有收藏。先選一張你下次最可能需要的卡，讓出場前不必再想很久。</div>}<div className="ec-checkin"><div><b>今天有做一個出場動作嗎？</b><span>不是連續打卡壓力；只是替自己留下一個「我有回來」的記號。</span></div><button type="button" className={isCheckedIn ? "done" : ""} onClick={() => { setCheckinDate(isCheckedIn ? "" : today()); setToast(isCheckedIn ? "已取消今日記號" : "今天的出場已記下"); }}>{isCheckedIn ? <><Check size={14} />今天已完成</> : "留下今天的記號"}</button></div></section>
      {energyFirstAidProduct && <section className="ec-take-home"><div><SectionEyebrow className="text-[#a9874d]">WHEN YOU WANT TO KEEP IT</SectionEyebrow><h2>想把這套急救系統，<br />留在每一次要開口之前？</h2><p>你剛剛試用的是完整互動體驗。若想把 12 張卡帶進日常，可取得可下載、可列印、可反覆使用的版本。</p></div><div className="ec-take-home-action"><span>NT$399 · 數位工具</span><a href={energyFirstAidProduct.paymentUrl} target="_blank" rel="noreferrer"><CreditCard size={16} />帶走可下載的 12 卡系統</a><small>將開啟 PAYUNi 安全付款頁；付款確認後，Vivi 會透過 LINE 交付下載連結。</small></div></section>}
      <p className="ec-disclaimer">本工具提供出場前的身體覺察與表達練習，不取代醫療或心理專業支持。</p>
    </main>
    {timerOpen && <div className="ec-timer-modal" role="dialog" aria-modal="true" aria-label="三分鐘急救計時器"><div><button type="button" className="ec-close" onClick={() => { setTimerOpen(false); setRunning(false); }} aria-label="結束計時"><X size={18} /></button><SectionEyebrow className="text-[#a9874d]">急救進行中</SectionEyebrow><h2>{selected.title}</h2><p>依序完成三個小步驟。不必做到完美。</p><strong>{time}</strong><div className="ec-timer-note"><b>現在做：</b>{selected.protocol[protocolIndex]?.note}</div><div className="ec-timer-actions"><button type="button" onClick={() => setProtocolIndex((index) => Math.max(0, index - 1))}>上一步</button><button type="button" className="go" onClick={() => setProtocolIndex((index) => Math.min(2, index + 1))}>下一步</button><button type="button" onClick={() => { setSeconds(180); setProtocolIndex(0); setRunning(false); }}><TimerReset size={14} />重設</button></div></div></div>}
    {toast && <div className="ec-toast" role="status">{toast}</div>}
  </div>;
}
