/**
 * Style guide — 月光書房：免費工具是內容與服務之間的溫柔門檻；
 * 視覺像可收藏的紙本練習，行動明確但不帶逼迫感。
 */
import { ArrowRight, CheckCircle2, Download, FileText, LockKeyhole } from "lucide-react";
import { CtaBand, PageIntro } from "@/components/PagePrimitives";
import { PortalyLeadLink } from "@/components/PortalyLeadLink";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { asset, tools } from "@/data/catalog";
import { Link } from "wouter";

export default function Tools() {
  return (
    <>
      <Seo title="免費工具室：覺察、品牌定位與意圖穿搭" description="下載美心學苑的免費練習表、療癒型創作者定位急救表與意圖穿搭卡，將感受整理成可以開始的行動。" path="/tools" image={asset.energy} schema={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "美心學苑免費工具室", inLanguage: "zh-TW", hasPart: tools.map((tool) => ({ "@type": "CreativeWork", name: tool.title, description: tool.description, isAccessibleForFree: true })) }} />
      <PageIntro kind="workbook" chapter="02" eyebrow="THE TOOL ROOM · FREE TO USE" title={<>不是更多資訊。<br /><em>是一個你今天就能用的起點。</em></>} description="這些工具是為了幫你把模糊感受、反覆卡點與零散想法，先整理成可以看見、可以回顧、也可以採取下一步的筆記。" note="免費下載 · 也可在 Portaly 留下 Email，收到後續工具更新" />
      <section className="section-space pb-0"><div className="site-shell rounded-[1.6rem] bg-[#183b31] p-7 text-[#f8f2e8] md:flex md:items-center md:justify-between md:gap-8 md:p-10"><div><SectionEyebrow className="text-[#e6c886]">FLAGSHIP DIAGNOSTIC · 5 MINUTES</SectionEyebrow><h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">不確定先用哪一份工具？<br />先做內容承接診斷。</h2><p className="mt-4 max-w-2xl leading-8 text-[#d4e1d5]">用四個問題找出你目前最需要整理的是定位、內容，還是服務邀請；再決定最適合的下一步。</p></div><Link href="/creator-diagnostic" className="vivi-button vivi-button-light mt-6 shrink-0 md:mt-0">開始旗艦診斷 <ArrowRight className="size-4" /></Link></div></section>
      <section className="section-space pt-10"><div className="site-shell tools-grid">{tools.map((tool) => <article key={tool.id} className={`tool-card tool-card-${tool.accent}`}><div className="tool-card-top"><span>{tool.number}</span><p>{tool.pill}</p></div><FileText className="mt-10 size-8" /><h2>{tool.title}</h2><p>{tool.description}</p><p className="mt-4 border-l-2 border-[#b18c4b] pl-3 text-sm leading-6 text-[#426258]">完成後，你會：{tool.outcome}</p><div className="tool-card-bottom"><span>{tool.format} · {tool.pages}</span><div className="flex flex-wrap items-center gap-3"><a href={tool.downloadUrl} target="_blank" rel="noreferrer" className="vivi-button vivi-button-dark">{tool.action} <Download className="size-4" /></a><PortalyLeadLink label="寄到信箱" className="vivi-text-link" /></div></div></article>)}</div></section>
      <section className="section-space bg-[#edf0e8]"><div className="site-shell tool-process-grid"><div><SectionEyebrow>HOW TO USE THEM</SectionEyebrow><h2 className="display-heading mt-4">下載不是終點。<br />你可以把它變成一段自己的練習。</h2></div><ol><li><span>01</span><div><b>選一份最像你當下狀態的工具。</b><p>不必一次全拿。先選能幫你處理今天問題的那一份。</p></div></li><li><span>02</span><div><b>留一段不被打斷的 15 分鐘。</b><p>把答案寫下來，不急著寫得漂亮，先讓它變得具體。</p></div></li><li><span>03</span><div><b>替自己留下一個很小的行動。</b><p>你不需要立刻轉變，只要知道明天可以試著做什麼。</p></div></li></ol></div></section>
      <section className="section-space"><div className="site-shell tarot-promo"><div><SectionEyebrow>NEW · A SMALL DAILY RITUAL</SectionEyebrow><h2 className="display-heading mt-4">不想下載任何東西時，<br />也可以先抽一張牌。</h2><p className="mt-5 max-w-xl leading-8 text-[#536158]">AI 塔羅一日一牌會把抽到的訊號轉成一個書寫問題與 10 分鐘行動。它只是一段自我覺察，不替你預言或決定未來。</p></div><Link href="/tarot-daily" className="vivi-button vivi-button-dark">前往 AI 塔羅一日一牌 <ArrowRight className="size-4" /></Link></div></section>
      <section className="section-space pt-0"><div className="site-shell tarot-promo border-[#d9bfc3] bg-[#fff7f6]"><div><SectionEyebrow className="text-[#9b3e4e]">NEW · 12 CARDS · 3 MINUTES</SectionEyebrow><h2 className="display-heading mt-4">要開口前，<br />先把自己穿回來。</h2><p className="mt-5 max-w-xl leading-8 text-[#536158]">把自己穿回來是一套 12 張互動急救卡。輸入你現在最卡的畫面，從關鍵字找到對應處方，再用 3 分鐘回到能說出下一句話的狀態。</p></div><Link href="/energy-cards" className="vivi-button vivi-button-dark">探索 12 張急救卡 <ArrowRight className="size-4" /></Link></div></section>
      <section className="section-space"><div className="site-shell tool-trust"><LockKeyhole className="size-7 text-[#b18c4b]" /><div><h2>若你在 Portaly 留下 Email，只會收到你選擇的工具與美心學苑後續消息。</h2><p>月光來信每月約 1–2 封；資料會依 Portaly 的表單與隱私設定處理。你可以直接下載 PDF，也可以選擇不訂閱。</p></div><CheckCircle2 className="size-7 text-[#537561]" /></div></section>
      <CtaBand eyebrow="WHEN YOU WANT A PERSON WITH YOU" title="有些問題不需要再自己反覆拆解。" description="如果你想針對一段關係、狀態或品牌方向，得到更貼近你的整理與支持，可以先看看服務頁。" href="/services" label="探索深度服務" />
    </>
  );
}
