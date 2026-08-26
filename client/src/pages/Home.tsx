/**
 * Style guide — 月光書房：首頁採非對稱雙欄首屏與編輯式章節索引；
 * 深墨綠承接信任，暖米白承接閱讀，免費內容優先、服務導流在後。
 */
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Link } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { Seo } from "@/components/Seo";
import { articles, asset, freeResources, pillars, services, testimonials, tools } from "@/data/catalog";

export default function Home() {
  return (
    <>
      <Seo
        title="療癒型創作者的內容承接與私教陪跑"
        description="美心學苑幫助已有助人專業、內容卻卡在定位與詢問承接的女性療癒型創作者，把天賦整理成被市場聽懂、能自然帶來信任的內容系統。"
        path="/"
        image={asset.hero}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: "VIVI COLLEGE 美心學苑", url: "https://vivicollege.com", logo: asset.seal, sameAs: ["https://www.instagram.com/vivi_college/"] },
            { "@type": "WebSite", name: "VIVI COLLEGE 美心學苑", url: "https://vivicollege.com", inLanguage: "zh-TW" },
          ],
        }}
      />
      <section className="hero-home">
        <img className="hero-home-atmosphere" src={asset.hero} alt="月光書房的閱讀與書寫情境" />
        <div className="site-shell hero-home-grid">
          <div className="hero-home-copy">
            <SectionEyebrow>VIVI COLLEGE · HEALING CREATOR MENTORSHIP</SectionEyebrow>
            <h1>你有療癒專業，<br /><em>卻還沒被市場好好聽懂。</em></h1>
            <p>給已有助人專業、內容正在做，卻仍卡在定位模糊、詢問太少與服務難承接的女性療癒型創作者。把你靠感覺的能力，整理成對的人看得懂、願意靠近的內容路徑。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/creator-diagnostic" className="vivi-button vivi-button-dark">先做內容承接診斷 <ClipboardCheck className="size-4" /></Link>
              <Link href="/services#private-coaching" className="vivi-button vivi-button-ghost">了解 12 週私教 <ArrowRight className="size-4" /></Link>
            </div>
            <div className="hero-home-stamp"><MoonMark size="md" /><span><b>5 分鐘旗艦診斷</b><br />先找出你現在最需要整理的內容卡點。</span></div>
          </div>
          <figure className="hero-portrait-wrap">
            <span className="portrait-caption">VIVI / FOUNDER · GUIDE</span>
            <img src={asset.viviPortrait} alt="VIVI COLLEGE 美心學苑創辦人 Vivi" className="hero-portrait" />
            <figcaption>懂商業，也懂怎麼把<br />說不出口的能力整理成價值。</figcaption>
          </figure>
        </div>
      </section>

      <section className="section-space bg-[#edf0e8]">
        <div className="site-shell grid gap-7 rounded-[1.6rem] border border-[#d9e3d8] bg-[#f8f5ec] p-6 md:grid-cols-[1.15fr_.85fr] md:items-center md:p-10"><div><SectionEyebrow>THE FLAGSHIP TOOL · 5 MINUTES</SectionEyebrow><h2 className="display-heading mt-4">先找出內容卡在哪裡，<br />才知道下一步不用更用力。</h2><p className="mt-5 max-w-2xl leading-8 text-[#536158]">用四個問題，分辨你現在最需要整理的是定位訊號、內容承接，還是服務邀請。完成後，帶走一個能在今天開始的小行動。</p><Link href="/creator-diagnostic" className="vivi-button vivi-button-dark mt-7">開始內容承接診斷 <ArrowRight className="size-4" /></Link></div><div className="rounded-[1.4rem] bg-[#183b31] p-6 text-[#f8f2e8]"><ClipboardCheck className="size-7 text-[#e6c886]" /><p className="mt-4 text-xs font-bold tracking-[.14em] text-[#e6c886]">YOU WILL GET</p><div className="mt-4 space-y-4 text-sm leading-7 text-[#d4e1d5]"><p><b className="text-[#f8f2e8]">01</b> 你的主要內容承接卡點</p><p><b className="text-[#f8f2e8]">02</b> 一個今天可執行的小行動</p><p><b className="text-[#f8f2e8]">03</b> 對應的免費工具或 LINE 下一步</p></div></div></div>
      </section>

      <section className="section-space pb-4">
        <div className="site-shell flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl"><SectionEyebrow>THREE ROOMS TO EXPLORE</SectionEyebrow><h2 className="display-heading mt-4">從你今天最在意的地方，先走進來。</h2></div>
          <Link href="/journal" className="vivi-text-link">查看所有閱讀室內容 <ArrowRight className="size-4" /></Link>
        </div>
        <div className="site-shell mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Link href={pillar.href} className={`pillar-card pillar-card-${pillar.tone}`} key={pillar.title}>
              <img src={pillar.image} alt="" />
              <div className="pillar-card-overlay" />
              <div className="pillar-card-content"><span>0{index + 1} · {pillar.eyebrow}</span><h3>{pillar.title}</h3><p>{pillar.description}</p><i><ArrowRight className="size-4" /></i></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space pt-16">
        <div className="site-shell home-editorial-grid">
          <div className="editorial-note"><SectionEyebrow>START WITH SOMETHING USEFUL</SectionEyebrow><h2 className="display-heading mt-4">不是更多內容。<br />是讓專業被聽懂的工具。</h2><p className="mt-5">從定位急救表到內容承接診斷，每一份工具都為了幫你把模糊的能力，整理成受眾能理解、也願意繼續靠近的下一步。</p><Link href="/tools" className="vivi-button vivi-button-dark mt-7">打開免費工具室 <ArrowRight className="size-4" /></Link></div>
          <div className="tool-preview-stack">
            {tools.map((tool) => <Link href="/tools" key={tool.id} className="tool-preview-card"><span>{tool.number}</span><div><b>{tool.title}</b><p>{tool.format}</p></div><ArrowRight className="size-4" /></Link>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#edf0e8]">
        <div className="site-shell flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><SectionEyebrow>RECENT NOTES</SectionEyebrow><h2 className="display-heading mt-4">本週，留給自己的幾篇閱讀。</h2></div><Link href="/journal" className="vivi-text-link">進入閱讀室 <ArrowRight className="size-4" /></Link></div>
        <div className="site-shell mt-10 article-grid">
          {articles.slice(0, 3).map((article) => <Link href={`/journal/${article.slug}`} key={article.slug} className="article-card"><img src={article.image} alt="" /><div><span>{article.pillar} · {article.readingTime}</span><h3>{article.title}</h3><p>{article.excerpt}</p><i>閱讀這一章 <ArrowRight className="size-4" /></i></div></Link>)}
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell home-services-top"><div><SectionEyebrow>WHEN YOU WANT DEEPER SUPPORT</SectionEyebrow><h2 className="display-heading mt-4">當你不想再一個人繞圈，<br />這裡有更深一層的陪伴。</h2></div><p>從一對一塔羅與能量整理，到給療癒師的品牌私教，每一項服務都先協助你確認：現在真正需要被處理的是什麼。</p></div>
        <div className="site-shell mt-10 grid gap-4 lg:grid-cols-3">{services.map((service) => <Link href={service.href} key={service.id} className={`service-preview ${service.featured ? "service-preview-featured" : ""}`}><span>{service.eyebrow}</span><h3>{service.title}</h3><p>{service.summary}</p><div><b>{service.outcome}</b><i><ArrowRight className="size-4" /></i></div></Link>)}</div>
      </section>

      <section className="section-space bg-[#183b31] text-[#f8f2e8]" aria-labelledby="student-evidence-heading">
        <div className="site-shell evidence-grid"><div><SectionEyebrow className="text-[#e6c886]">STUDENT EVIDENCE · REAL CASE MATERIALS</SectionEyebrow><h2 id="student-evidence-heading" className="display-heading mt-4 text-[#f8f2e8]">學員見證：<br />專業被聽懂後，內容開始往前走。</h2><p className="mt-5 max-w-lg text-[#d4e1d5]">以下採用 Vivi 已提供的實際案例截圖與成果摘要。我們不把單一數字說成保證，而是看見：受眾、內容與承接被重新整理後，能留下哪些可追溯的訊號。</p><Link href="/services" className="vivi-button vivi-button-light mt-7">了解深度服務 <ArrowRight className="size-4" /></Link></div><div className="evidence-stack">{testimonials.map((item) => <article className="evidence-card" key={item.metric}><img src={item.image} alt={`已提供案例截圖：${item.metric}`} /><div><strong>{item.metric}</strong><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></div>
      </section>

      <section className="section-space">
        <div className="site-shell flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><SectionEyebrow>THE FREE LIBRARY</SectionEyebrow><h2 className="display-heading mt-4">把一點意圖，<br />帶進今天真的用得上的練習。</h2></div><Link href="/shop" className="vivi-text-link">打開免費資源庫 <ArrowRight className="size-4" /></Link></div>
        <div className="site-shell mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{freeResources.slice(0, 4).map((resource) => <Link href={resource.href} key={resource.id} className="mini-product"><img src={resource.image} alt="" /><div><span>{resource.category} · 免費</span><h3>{resource.name}</h3><p>{resource.action}</p></div></Link>)}</div>
      </section>

      <CtaBand title="如果你想先被理解一次，從適配諮詢開始。" description="給已經有助人專業、正在經營內容，卻仍說不清楚自己與服務價值的療癒型創作者。" href="/services#private-coaching" label="查看 1 對 1 私教" />
    </>
  );
}
