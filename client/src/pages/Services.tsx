/**
 * Style guide — 月光書房：服務頁以深墨綠與紙本欄位建立信任；
 * 不誇大結果，清楚寫出適合誰、如何進行、會得到什麼與下一步。
 */
import { ArrowRight, Check, CircleHelp, Compass, MessageCircleHeart } from "lucide-react";
import { CtaBand, PageIntro } from "@/components/PagePrimitives";
import { PortalyLeadLink } from "@/components/PortalyLeadLink";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { asset, services, socialLinks, testimonials } from "@/data/catalog";

const specs = [
  ["陪跑期間", "12 週，從定位、內容到服務承接分階段推進。"],
  ["支持方式", "線上一對一會談搭配文字回饋；實際頻率於適配諮詢說明。"],
  ["主要成果", "定位句、內容主題地圖、核心服務說明、內容到諮詢的承接路徑。"],
  ["適合對象", "已有助人專業或深度生命經驗，正在創作或接案的女性創作者。"],
];

export default function Services() {
  return (
    <>
      <Seo
        title="一對一服務：塔羅、能量整理與療癒品牌私教"
        description="美心學苑提供一對一塔羅占卜、能量整理與療癒師自媒體品牌私教，讓感受、專業與下一步都有清楚的承接。"
        path="/services"
        image={asset.viviPortrait}
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "美心學苑一對一服務",
          itemListElement: services.map((service, position) => ({
            "@type": "ListItem",
            position: position + 1,
            item: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
              provider: { "@type": "Organization", name: "VIVI COLLEGE 美心學苑" },
            },
          })),
        }}
      />
      <PageIntro kind="feature" chapter="03" eyebrow="ONE-TO-ONE SUPPORT · CLEARLY HELD" title={<>有些問題，需要的不只是方法。<br /><em>也需要一個能陪你看清的人。</em></>} description="從一對一塔羅占卜、能量整理到療癒師自媒體私教，每一段服務都先協助你找到問題的核心，再一起決定可行的下一步。" note="所有服務先確認適配度，不以壓力成交；你可以先理解，再決定。" />
      <section className="line-consult-bar"><div className="site-shell"><div><span>LINE@ QUICK CHECK-IN</span><b>還不確定哪一種支持適合你？先用 LINE@ 說說你現在卡住的地方。</b></div><a href={socialLinks.line} target="_blank" rel="noreferrer" className="vivi-button vivi-button-line">加入 LINE@ 諮詢 <MessageCircleHeart className="size-4" /></a></div></section>
      <section className="bg-[#edf0e8] py-7"><div className="site-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><SectionEyebrow>START WITH A SMALLER STEP</SectionEyebrow><p className="mt-2 max-w-2xl leading-7 text-[#526156]">還在整理想問什麼？可以先在 Portaly 收下一份免費工具與月光來信，再決定下一步要不要進入諮詢。</p></div><PortalyLeadLink className="vivi-button vivi-button-dark shrink-0" /></div></section>
      <section id="private-coaching" className="section-space scroll-mt-20"><div className="site-shell coaching-feature"><div className="coaching-feature-copy"><SectionEyebrow className="text-[#e6c886]">SIGNATURE SERVICE · 12 WEEKS</SectionEyebrow><h2>療癒師自媒體<br /><em>1 對 1 私教陪跑</em></h2><p>給已經有助人專業、內容正在做，卻仍卡在定位模糊、內容不轉單、報價容易退縮的女性創作者。這段陪跑不是讓你更用力，而是把你原本很抽象、很靠感覺的能力，整理成市場聽得懂的路徑。</p><a href={socialLinks.application} target="_blank" rel="noreferrer" className="vivi-button vivi-button-light mt-7">申請 1 對 1 適配諮詢 <ArrowRight className="size-4" /></a><small>若目前不適合合作，也會直接告訴你更適合的下一步。</small></div><img src={asset.viviPortrait} alt="Vivi" /></div></section>
      <section className="section-space bg-[#edf0e8]"><div className="site-shell service-spec-grid"><div><SectionEyebrow>WHAT YOU WILL BUILD</SectionEyebrow><h2 className="display-heading mt-4">你不是買一段聊天。<br />你會完成一套能被使用的系統。</h2></div><dl>{specs.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></div></section>
      <section className="section-space"><div className="site-shell"><div className="max-w-2xl"><SectionEyebrow>THE FOUR-PART PATH</SectionEyebrow><h2 className="display-heading mt-4">不是把你塞進模板，<br />而是把你身上的東西整理出來。</h2></div><div className="mt-10 process-grid">{[["01", "定位釐清", "整理你的經歷、服務、受眾與內容現況，找到真正站得住的位置。"], ["02", "內容建構", "把抽象專業轉成可發布的主軸、痛點場景與信任型內容。"], ["03", "產品承接", "梳理核心服務、說明頁、資源入口與問卷，讓喜歡你的人有路可走。"], ["04", "能量穩定", "處理曝光、報價與發售前的退縮慣性，陪你把下一步走完。"]].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section-space bg-[#183b31] text-[#f8f2e8]"><div className="site-shell evidence-grid"><div><SectionEyebrow className="text-[#e6c886]">EVIDENCE, NOT EMPTY PROMISES</SectionEyebrow><h2 className="display-heading mt-4 text-[#f8f2e8]">方向對焦後，內容才有機會慢慢累積。</h2><p className="mt-5 max-w-lg text-[#d4e1d5]">我們不把流量直接說成成交，也不承諾每個人都會有同一個數字。案例要說清楚的是：原本遇到什麼問題、做了哪些調整、在什麼時間內看見哪些可驗證的變化。</p></div><div className="evidence-stack">{testimonials.map((item) => <article className="evidence-card" key={item.metric}><img src={item.image} alt="" /><div><strong>{item.metric}</strong><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></div></section>
      <section className="section-space"><div className="site-shell"><SectionEyebrow>OTHER WAYS TO BE SUPPORTED</SectionEyebrow><div className="mt-6 grid gap-4 lg:grid-cols-2">{services.slice(1).map((service) => <article className="service-detail-card" id={service.id} key={service.id}><span>{service.eyebrow}</span><h2>{service.title}</h2><p>{service.summary}</p><div className="service-detail-outcome"><Check className="size-4" />{service.outcome}</div><a href={socialLinks.line} target="_blank" rel="noreferrer" className="vivi-button vivi-button-outline mt-7">{service.cta} <ArrowRight className="size-4" /></a></article>)}</div></div></section>
      <section className="section-space bg-[#edf0e8]"><div className="site-shell faq-service-grid"><div><SectionEyebrow>BEFORE YOU APPLY</SectionEyebrow><h2 className="display-heading mt-4">先替彼此省一點力。</h2></div><div className="space-y-3">{[["適配諮詢後一定要報名嗎？", "不用。適配諮詢的目的，是讓 Vivi 了解你的現況，也讓你判斷這段服務是否適合你。"], ["我還沒有開始接案，可以申請私教嗎？", "可以，但需要已有想發展的核心能力或助人方向；這段陪跑不是從零替你找人生方向。"], ["服務會直接保證流量或收入嗎？", "不會。服務會協助你完成定位、內容與承接系統；流量、詢問與收入仍會受到執行、受眾與市場因素影響。"]].map(([question, answer]) => <details key={question}><summary>{question}<CircleHelp className="size-4" /></summary><p>{answer}</p></details>)}</div></div></section>
      <CtaBand title="你不需要現在就做決定，但可以先被理解一次。" description="先填寫適配諮詢表，讓 Vivi 看見你目前的定位、內容與卡點，再一起確認最適合的下一步。" href="/services#private-coaching" label="回到私教服務" />
    </>
  );
}
