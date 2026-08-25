/**
 * Style guide — 月光書房：選物頁像一座有分類的私人書店；
 * 商品用途與交付方式先說清楚，PAYUNi 線上付款後由 Vivi 透過 LINE 交付數位檔案。
 */
import { useMemo, useState } from "react";
import { ArrowRight, Check, CreditCard, SlidersHorizontal } from "lucide-react";
import { CtaBand, PageIntro } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { asset, products as catalogueProducts } from "@/data/catalog";
import { Link } from "wouter";

export default function Shop() {
  const [category, setCategory] = useState("全部");
  const categories = useMemo(() => ["全部", ...Array.from(new Set(catalogueProducts.map((product) => product.category)))], []);
  const products = useMemo(() => category === "全部" ? catalogueProducts : catalogueProducts.filter((product) => product.category === category), [category]);

  return (
    <>
      <Seo title="美心學苑選物：數位工具與日常小儀式" description="美心學苑的精選工具：覺察筆記、意圖穿搭卡、能量回穩練習與療癒品牌內容承接工具。" path="/shop" image={asset.style} schema={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "美心學苑選物", inLanguage: "zh-TW" }} />
      <PageIntro kind="catalogue" chapter="04" eyebrow="THE SMALL SHOP · CHOOSE WITH INTENTION" title={<>不是更多東西。<br /><em>是一件能讓日常有方向的選物。</em></>} description="從可下載的練習工具，到能陪你慢慢回穩的晚間儀式，每一件選物都為了一個目的：讓你把想改變的感受，放進生活裡。" note="線上付款由 PAYUNi 統一金流處理；付款完成後，Vivi 會透過 LINE 交付數位檔案下載連結。" />
      <section className="section-space pt-10">
        <div className="site-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="filter-row"><SlidersHorizontal className="mr-2 size-4 text-[#718177]" />{categories.map((entry) => <button key={entry} onClick={() => setCategory(entry)} className={category === entry ? "filter-chip filter-chip-active" : "filter-chip"}>{entry}</button>)}</div><p className="text-sm text-[#66766c]">{products.length} 件美心學苑選物</p></div>
        <div className="site-shell mt-10 shop-grid">
          {products.map((product) => { const isExplorable = Boolean(product.exploreUrl); return <article className={`product-card ${isExplorable ? "product-card-energy" : ""}`} key={product.id}><div className="product-image-wrap" style={{ backgroundImage: `url(${product.image ?? asset.hero})`, backgroundPosition: "center", backgroundSize: "cover" }}><img src={product.image} alt={product.name} />{product.badge && <span className="product-card-badge">{isExplorable ? "先免費體驗" : product.badge}</span>}</div><div className="product-card-copy"><p>{product.category}</p><h2>{product.name}</h2><span className="product-price">{product.priceLabel}</span><p className="product-description">{product.description}</p><div className="product-detail"><Check className="size-4" />{product.detail}</div>{isExplorable ? <p className="product-payment-note product-payment-note-explore">先免費體驗 12 張急救卡，再決定是否帶走可下載版本。</p> : <p className="product-payment-note">想把它帶回日常時，再進入安全付款；完成後交付數位檔案。</p>}{isExplorable ? <Link href={product.exploreUrl!} className="vivi-button vivi-button-energy mt-6 w-full">{product.exploreLabel} <ArrowRight className="size-4" /></Link> : <a href={product.paymentUrl} target="_blank" rel="noreferrer" className="vivi-button vivi-button-dark mt-6 w-full">想把它帶走 <CreditCard className="size-4" /></a>}</div></article>})}
        </div>
      </section>
      <section className="section-space border-y border-[#dbe3d9] bg-[#f7f4eb]"><div className="site-shell"><SectionEyebrow>ORDER & DELIVERY</SectionEyebrow><h2 className="display-heading mt-4">下單與交付流程</h2><div className="mt-8 grid gap-4 md:grid-cols-3"><article className="rounded-[1.35rem] border border-[#dbe3d9] bg-white p-6"><span className="font-serif text-3xl text-[#b18c4b]">01</span><h3 className="mt-4 font-serif text-2xl">前往付款</h3><p className="mt-3 text-sm leading-7 text-[#59675f]">點選「前往付款」，進入 PAYUNi 付款頁面完成線上付款。</p></article><article className="rounded-[1.35rem] border border-[#dbe3d9] bg-white p-6"><span className="font-serif text-3xl text-[#b18c4b]">02</span><h3 className="mt-4 font-serif text-2xl">確認訂單</h3><p className="mt-3 text-sm leading-7 text-[#59675f]">付款完成後，Vivi 會收到通知並確認你的訂單。</p></article><article className="rounded-[1.35rem] border border-[#dbe3d9] bg-white p-6"><span className="font-serif text-3xl text-[#b18c4b]">03</span><h3 className="mt-4 font-serif text-2xl">LINE 交付下載連結</h3><p className="mt-3 text-sm leading-7 text-[#59675f]">確認後，Vivi 會透過 LINE 交付數位檔案的下載連結。</p></article></div></div></section>
      <section className="section-space bg-[#edf0e8]"><div className="site-shell shop-note-grid"><div><SectionEyebrow>BEFORE YOU ORDER</SectionEyebrow><h2 className="display-heading mt-4">選一件你真的會用的，<br />比收集很多更重要。</h2></div><div><p>這裡的商品設計成小而可持續的練習。它們不是快速解答，也不會替你做決定；但如果你願意每天留一點時間，它們可以讓你更容易聽見自己的方向。</p><p className="mt-4">線上付款由 PAYUNi 統一金流處理；付款完成後，Vivi 會透過 LINE 交付對應的數位檔案下載連結。</p></div></div></section>
      <CtaBand eyebrow="BEFORE YOU BUY, YOU CAN READ" title="還不確定現在需要哪一種支持？" description="先讀一篇文章，或到免費工具室拿一份工作紙。好的選擇，通常從看清楚自己開始。" href="/tools" label="前往免費工具室" />
    </>
  );
}
