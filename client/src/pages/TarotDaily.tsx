import { useMemo, useState } from "react";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { CtaBand, PageIntro } from "@/components/PagePrimitives";
import { SectionEyebrow } from "@/components/SiteFrame";
import { Seo } from "@/components/Seo";
import { trpc } from "@/lib/trpc";
import { tarotCards, tarotFocuses, tarotSpreadPositions, type TarotCardId, type TarotFocus } from "@shared/tarot";
import { tarotArt } from "@/data/tarotArt";

type DrawMode = "single" | "spread";
type TarotCard = (typeof tarotCards)[number];

function RitualCard({ card, isRevealed, isDrawing, compact = false }: { card: TarotCard | null; isRevealed: boolean; isDrawing: boolean; compact?: boolean }) {
  return <div className={`tarot-card-3d ${isRevealed ? "is-revealed" : ""} ${isDrawing ? "is-drawing" : ""} ${compact ? "tarot-card-compact" : ""}`}><div className="tarot-card-face tarot-card-back" aria-hidden={isRevealed}><span className="tarot-back-kicker">VIVI COLLEGE</span><span className="tarot-back-orbit tarot-back-orbit-one" /><span className="tarot-back-orbit tarot-back-orbit-two" /><span className="tarot-back-moon" /><span className="tarot-back-star">✦</span><span className="tarot-back-label">月光一日一牌</span></div><div className="tarot-card-face tarot-card-front">{card ? <><img src={tarotArt[card.id]} alt={`經典 Rider–Waite–Smith 塔羅牌：${card.name}`} /><div className="tarot-card-front-overlay"><span>MAJOR ARCANA</span><div><strong>{card.name}</strong><b>{card.keyword}</b></div></div></> : <div className="tarot-card-front-empty"><span>ONE CARD A DAY</span><i>☾</i><b>留一段空白給自己</b></div>}</div></div>;
}

export default function TarotDaily() {
  const [focus, setFocus] = useState<TarotFocus>("今日狀態");
  const [drawMode, setDrawMode] = useState<DrawMode>("single");
  const [cardId, setCardId] = useState<TarotCardId | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [spreadCardIds, setSpreadCardIds] = useState<TarotCardId[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const reading = trpc.tarot.readDailyCard.useMutation();
  const spreadReading = trpc.tarot.readPastPresentFuture.useMutation();
  const card = useMemo(() => tarotCards.find(item => item.id === cardId) ?? null, [cardId]);
  const spreadCards = useMemo(() => spreadCardIds.map(cardId => tarotCards.find(item => item.id === cardId)).filter((item): item is TarotCard => Boolean(item)), [spreadCardIds]);

  const resetReadings = () => { reading.reset(); spreadReading.reset(); };
  const switchMode = (mode: DrawMode) => { if (isDrawing) return; setDrawMode(mode); resetReadings(); };

  const drawCard = async () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setIsRevealing(false);
    resetReadings();
    const next = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    window.setTimeout(async () => {
      setCardId(next.id);
      window.requestAnimationFrame(() => setIsRevealing(true));
      try {
        await reading.mutateAsync({ cardId: next.id, focus });
      } finally {
        setIsDrawing(false);
      }
    }, 620);
  };

  const drawSpread = async () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setRevealedCount(0);
    setSpreadCardIds([]);
    resetReadings();
    const next = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, 3);
    setSpreadCardIds(next.map(card => card.id));
    for (let index = 0; index < 3; index += 1) {
      await new Promise(resolve => window.setTimeout(resolve, index === 0 ? 420 : 680));
      setRevealedCount(index + 1);
    }
    try {
      await spreadReading.mutateAsync({ cardIds: next.map(card => card.id), focus });
    } finally {
      setIsDrawing(false);
    }
  };

  const draw = drawMode === "single" ? drawCard : drawSpread;
  const primaryLabel = isDrawing ? (drawMode === "single" ? "正在翻開…" : "正在展開牌陣…") : drawMode === "single" ? (card ? "再抽一張" : "抽出今日一牌") : (spreadCards.length ? "再展開一次牌陣" : "展開過去、現在、未來");

  return <>
    <Seo title="AI 塔羅一日一牌：把今日訊號整理成一個小行動" description="抽一張今日塔羅牌，獲得以 Claude 生成的自我覺察、書寫問題與 10 分鐘行動提示。僅作為反思，不提供未來預言或重大決策建議。" path="/tarot-daily" schema={{ "@context": "https://schema.org", "@type": "WebApplication", name: "美心學苑 AI 塔羅一日一牌", applicationCategory: "LifestyleApplication", inLanguage: "zh-TW", isAccessibleForFree: true }} />
    <PageIntro kind="workbook" chapter="05" eyebrow="ONE CARD · ONE PAUSE" title={<>今天不需要知道全部。<br /><em>先聽一張牌提醒你的事。</em></>} description="抽牌不是找一個替你決定的答案，而是替當下留出一段停頓：看見感受、寫下一句話，然後選一個你今天做得到的小行動。" note="AI 生成的內容僅供自我覺察與書寫提示，不預言未來，也不取代專業意見。" />
    <section className="section-space pt-10"><div className="site-shell tarot-layout">
      <div className="tarot-control-panel"><SectionEyebrow>CHOOSE YOUR LENS</SectionEyebrow><h2 className="display-heading mt-4">今天，你想從哪個方向看自己？</h2><div className="tarot-mode-row" role="tablist" aria-label="抽牌模式"><button type="button" role="tab" aria-selected={drawMode === "single"} onClick={() => switchMode("single")} className={drawMode === "single" ? "active" : ""}><b>單張抽牌</b><span>留一個今日提示</span></button><button type="button" role="tab" aria-selected={drawMode === "spread"} onClick={() => switchMode("spread")} className={drawMode === "spread" ? "active" : ""}><b>過去、現在、未來</b><span>看一條時間脈絡</span></button></div><div className="tarot-focus-row">{tarotFocuses.map(item => <button key={item} onClick={() => setFocus(item)} className={focus === item ? "filter-chip filter-chip-active" : "filter-chip"}>{item}</button>)}</div><p className="mt-6 text-sm leading-7 text-[#627167]">{drawMode === "single" ? "請先讓問題停在一個範圍內。抽牌後，給自己 90 秒讀完訊息，再決定今天要留在哪一件小事上。" : "三張牌不預言結果；它會用過去、現在、未來的位置，整理你正在經歷的模式與可選擇的下一步。"}</p><button onClick={draw} disabled={isDrawing} className="vivi-button vivi-button-dark mt-8">{primaryLabel} <Sparkles className="size-4" /></button></div>
      {drawMode === "single" ? <div className="tarot-stage" aria-live="polite"><RitualCard card={card} isRevealed={isRevealing} isDrawing={isDrawing} />{card && <p className="tarot-card-caption">你抽到的是 <b>{card.name}</b> · {card.keyword}</p>}<p className="tarot-stage-note">經典 Rider–Waite–Smith 大阿爾克那牌面 · 每次抽牌前，先讓問題安靜一分鐘。</p></div> : <div className="tarot-spread-stage" aria-live="polite">{tarotSpreadPositions.map((position, index) => { const spreadCard = spreadCards[index] ?? null; const revealed = revealedCount > index; return <article className={`tarot-spread-card ${revealed ? "is-revealed" : ""}`} key={position.id}><span className="tarot-spread-position">{position.label}</span><RitualCard card={spreadCard} isRevealed={revealed} isDrawing={isDrawing && revealedCount === index} compact />{spreadCard ? <p><b>{spreadCard.name}</b><small>{spreadCard.keyword}</small></p> : <p className="tarot-spread-hint">{position.hint}</p>}</article>; })}<p className="tarot-stage-note tarot-spread-note">依序揭示過去、現在、未來。未來位不是預言，而是此刻正在形成的方向。</p></div>}
    </div></section>
    {(reading.isPending || spreadReading.isPending) && <section className="pb-16"><div className="site-shell"><div className="tarot-reading-card animate-pulse"><p className="section-eyebrow">AI IS HOLDING THE THREAD</p><div className="mt-5 h-9 w-2/3 rounded bg-[#e5e8df]" /><div className="mt-5 h-4 w-full rounded bg-[#e5e8df]" /><div className="mt-3 h-4 w-4/5 rounded bg-[#e5e8df]" /></div></div></section>}
    {reading.data && <section className="pb-20"><div className="site-shell tarot-reading-card"><SectionEyebrow>{reading.data.card.name} · {reading.data.focus}</SectionEyebrow><h2 className="display-heading mt-4">{reading.data.reading.opening}</h2><div className="tarot-reading-grid"><article><h3>今天可以留意</h3><p>{reading.data.reading.reflection}</p></article><article><h3>10 分鐘小行動</h3><p>{reading.data.reading.action}</p></article><article><h3>寫給自己的問題</h3><p>{reading.data.reading.journalPrompt}</p></article></div><p className="tarot-boundary"><Compass className="size-4" />{reading.data.reading.boundary}</p></div></section>}
    {spreadReading.data && <section className="pb-20"><div className="site-shell tarot-reading-card tarot-spread-reading"><SectionEyebrow>過去、現在、未來 · {spreadReading.data.focus}</SectionEyebrow><h2 className="display-heading mt-4">{spreadReading.data.reading.opening}</h2><div className="tarot-spread-reading-grid">{spreadReading.data.cards.map((spreadCard, index) => <article key={spreadCard.id}><span>{tarotSpreadPositions[index]!.label} · {spreadCard.name}</span><h3>{spreadCard.keyword}</h3><p>{index === 0 ? spreadReading.data.reading.past : index === 1 ? spreadReading.data.reading.present : spreadReading.data.reading.future}</p></article>)}<article className="tarot-spread-synthesis"><span>三張牌一起說的事</span><h3>從回看，走向選擇</h3><p>{spreadReading.data.reading.synthesis}</p></article><article className="tarot-spread-synthesis"><span>下一步與書寫</span><h3>{spreadReading.data.reading.action}</h3><p>{spreadReading.data.reading.journalPrompt}</p></article></div><p className="tarot-boundary"><Compass className="size-4" />{spreadReading.data.reading.boundary}</p></div></section>}
    {(reading.isError || spreadReading.isError) && <section className="pb-20"><div className="site-shell"><div className="tarot-reading-card"><h2 className="font-serif text-2xl text-[#183b31]">這一刻暫時無法生成解讀。</h2><p className="mt-3 text-sm leading-7 text-[#627167]">你仍可以把抽到的牌當作今天的書寫提示：它讓你想到哪一段經驗？這個感受今天最需要什麼？</p></div></div></section>}
    <section className="section-space bg-[#edf0e8]"><div className="site-shell grid gap-8 md:grid-cols-[1fr_1.15fr]"><div><SectionEyebrow>WHAT THIS IS NOT</SectionEyebrow><h2 className="display-heading mt-4">牌不是命令，<br />你始終保有選擇。</h2></div><div className="space-y-4 text-sm leading-8 text-[#506055]"><p>這個工具不預測未來，也不會替你做感情、財務、健康或其他重大決定。若你正經歷急迫困擾，請尋求合格的專業協助。</p><p>你可以把牌視為一種提問方式：它讓你在忙亂中多看見一個角度，再回到自己真正能做的那一步。</p><Link href="/tools" className="vivi-text-link inline-flex">回到免費工具室 <ArrowRight className="size-4" /></Link></div></div></section>
    <CtaBand eyebrow="WHEN YOU WANT DEEPER SUPPORT" title="有些問題，值得被更完整地陪著整理。" description="如果你希望有人陪你把感受、關係或品牌方向慢慢拆開，可以從服務頁看看適合自己的支持方式。" href="/services" label="探索深度服務" />
  </>;
}
