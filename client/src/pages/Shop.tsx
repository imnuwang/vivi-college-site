/**
 * Style guide — 月光書房：資源庫像一座可直接使用的私人書房；
 * 每個入口都能立即開始，不以付款、下載或留下資料作為使用門檻。
 */
import { useMemo, useState } from "react";
import { ArrowRight, Check, SlidersHorizontal, Sparkles } from "lucide-react";
import { CtaBand, PageIntro } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { asset, freeResources } from "@/data/catalog";
import { Link } from "wouter";

export default function Shop() {
  const [category, setCategory] = useState("全部");
  const categories = useMemo(() => ["全部", ...Array.from(new Set(freeResources.map((resource) => resource.category)))], []);
  const resources = useMemo(() => category === "全部" ? freeResources : freeResources.filter((resource) => resource.category === category), [category]);

  return (
    <>
      <Seo title="免費資源庫：覺察、回穩、穿搭與內容承接" description="美心學苑的免費可操作資源：七日覺察、意圖穿搭、晚間回穩、療癒品牌內容承接與 12 張急救卡。" path="/shop" image={asset.style} schema={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "美心學苑免費資源庫", inLanguage: "zh-TW", isAccessibleForFree: true }} />
      <PageIntro kind="catalogue" chapter="04" eyebrow="THE FREE LIBRARY · USE WITH INTENTION" title={<>不是更多東西。<br /><em>是一個你可以立刻打開的練習。</em></>} description="把覺察、穿搭、晚間回穩與內容定位，變成可以填寫、可以複製、也可以帶回明天的具體下一步。" note="全部免費使用 · 不需付款 · 不需先留下 Email" />
      <section className="section-space pt-10">
        <div className="site-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="filter-row"><SlidersHorizontal className="mr-2 size-4 text-[#718177]" />{categories.map((entry) => <button key={entry} onClick={() => setCategory(entry)} className={category === entry ? "filter-chip filter-chip-active" : "filter-chip"}>{entry}</button>)}</div><p className="text-sm text-[#66766c]">{resources.length} 份免費實作資源</p></div>
        <div className="site-shell mt-10 shop-grid">
          {resources.map((resource) => <article className={`product-card ${resource.kind === "energy-cards" ? "product-card-energy" : ""}`} key={resource.id}><div className="product-image-wrap" style={{ backgroundImage: `url(${resource.image ?? asset.hero})`, backgroundPosition: "center", backgroundSize: "cover" }}><img src={resource.image} alt={resource.name} />{resource.badge && <span className="product-card-badge">{resource.badge}</span>}</div><div className="product-card-copy"><p>{resource.category}</p><h2>{resource.name}</h2><span className="inline-flex items-center gap-1 text-sm font-bold text-[#2f6b52]"><Sparkles className="size-4" />免費立即使用</span><p className="product-description">{resource.description}</p><div className="product-detail"><Check className="size-4" />{resource.detail}</div><p className="product-payment-note product-payment-note-explore">不需付款；選一個最像你當下狀態的入口，直接開始練習。</p><Link href={resource.href} className={resource.kind === "energy-cards" ? "vivi-button vivi-button-energy mt-6 w-full" : "vivi-button vivi-button-dark mt-6 w-full"}>{resource.action} <ArrowRight className="size-4" /></Link></div></article>)}
        </div>
      </section>
      <section className="section-space border-y border-[#dbe3d9] bg-[#f7f4eb]"><div className="site-shell"><SectionEyebrow>HOW TO USE THE LIBRARY</SectionEyebrow><h2 className="display-heading mt-4">不用收集完。<br />只要從一個需要被照顧的地方開始。</h2><div className="mt-8 grid gap-4 md:grid-cols-3"><article className="rounded-[1.35rem] border border-[#dbe3d9] bg-white p-6"><span className="font-serif text-3xl text-[#b18c4b]">01</span><h3 className="mt-4 font-serif text-2xl">選一個現在的卡點</h3><p className="mt-3 text-sm leading-7 text-[#59675f]">不必全做。選一份最接近你今天狀態的資源。</p></article><article className="rounded-[1.35rem] border border-[#dbe3d9] bg-white p-6"><span className="font-serif text-3xl text-[#b18c4b]">02</span><h3 className="mt-4 font-serif text-2xl">把答案留下來</h3><p className="mt-3 text-sm leading-7 text-[#59675f]">寫下一句答案、複製一段提醒，或直接列印成你的練習頁。</p></article><article className="rounded-[1.35rem] border border-[#dbe3d9] bg-white p-6"><span className="font-serif text-3xl text-[#b18c4b]">03</span><h3 className="mt-4 font-serif text-2xl">明天只做一小步</h3><p className="mt-3 text-sm leading-7 text-[#59675f]">工具不替你決定；它幫你把下一步縮小到可以開始。</p></article></div></div></section>
      <CtaBand eyebrow="WHEN YOU WANT A PERSON WITH YOU" title="工具先陪你整理；需要時，也可以有人陪你一起看。" description="當一個問題需要更貼近你的脈絡與支持，可以再看看美心學苑的一對一服務。" href="/services" label="探索深度服務" />
    </>
  );
}
