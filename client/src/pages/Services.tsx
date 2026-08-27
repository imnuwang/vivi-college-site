/**
 * Style guide: 內在花園服務頁。
 * 深林與晨光負責承接情緒，服務內容則以清楚條件、過程與下一步建立信任。
 */
import {
  ArrowRight,
  Check,
  CircleHelp,
  HeartHandshake,
  MessageCircleHeart,
} from "lucide-react";
import { CtaBand } from "@/components/PagePrimitives";
import { PortalyLeadLink } from "@/components/PortalyLeadLink";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { asset, services, socialLinks, testimonials } from "@/data/catalog";

const specs = [
  ["陪跑期間", "12 週，從定位、內容到服務承接分階段推進。"],
  ["支持方式", "線上一對一會談搭配文字回饋；實際頻率於適配諮詢說明。"],
  ["主要成果", "定位句、內容主題地圖、核心服務說明、內容到諮詢的承接路徑。"],
  ["適合對象", "已有助人專業或深度生命經驗，正在創作或接案的女性創作者。"],
] as const;

const process = [
  [
    "01",
    "定位釐清",
    "整理你的經歷、服務、受眾與內容現況，找到真正站得住的位置。",
  ],
  ["02", "內容建構", "把抽象專業轉成可發布的主軸、痛點場景與信任型內容。"],
  [
    "03",
    "產品承接",
    "梳理核心服務、說明頁、資源入口與問卷，讓喜歡你的人有路可走。",
  ],
  ["04", "能量穩定", "處理曝光、報價與發售前的退縮慣性，陪你把下一步走完。"],
] as const;

const faqs = [
  [
    "適配諮詢後一定要報名嗎？",
    "不用。適配諮詢是讓 Vivi 了解你的現況，也讓你判斷這段服務是否適合你。",
  ],
  [
    "我還沒有開始接案，可以申請私教嗎？",
    "可以，但需要已有想發展的核心能力或助人方向；這段陪跑不負責替你尋找人生方向。",
  ],
  [
    "服務會直接保證流量或收入嗎？",
    "不會。服務會協助你完成定位、內容與承接系統；流量、詢問與收入仍會受到執行、受眾與市場因素影響。",
  ],
] as const;

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
              provider: {
                "@type": "Organization",
                name: "VIVI COLLEGE 美心學苑",
              },
            },
          })),
        }}
      />

      <section className="inner-page-hero service-garden-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
        />
        <div className="site-shell inner-page-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>ONE-TO-ONE SUPPORT · CLEARLY HELD</SectionEyebrow>
            <h1>
              先看清你卡住的地方，
              <br />
              <em>再決定怎麼往前。</em>
            </h1>
            <p>
              從一對一塔羅、能量整理到療癒品牌私教，每一段服務都先整理你現在真正遇到的問題，再一起確認可行的下一步。
            </p>
            <div className="inner-page-hero-actions">
              <a
                href={socialLinks.application}
                target="_blank"
                rel="noreferrer"
                className="vivi-button vivi-button-light"
              >
                申請適配諮詢 <ArrowRight className="size-4" />
              </a>
              <a
                href={socialLinks.line}
                target="_blank"
                rel="noreferrer"
                className="vivi-button inner-page-ghost-button"
              >
                先用 LINE@ 說說現況 <MessageCircleHeart className="size-4" />
              </a>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>所有服務先確認適配度。你可以先理解，再決定。</span>
            </div>
          </div>
          <figure className="service-hero-portrait">
            <img src={asset.viviPortrait} alt="美心學苑創辦人 Vivi" />
            <figcaption>
              <span>Vivi｜美心學苑創辦人</span>
              先把感受與問題說清楚，選擇才不會只靠撐。
            </figcaption>
          </figure>
        </div>
      </section>

      <nav className="service-path-nav" aria-label="服務選擇">
        <div className="site-shell">
          {services.map((service, index) => (
            <a href={service.href} key={service.id}>
              <span>0{index + 1}</span>
              <b>{service.title}</b>
              <ArrowRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>

      <section id="private-coaching" className="section-space scroll-mt-20">
        <div className="site-shell coaching-feature coaching-feature-garden">
          <div className="coaching-feature-copy">
            <SectionEyebrow className="text-[#e6c886]">
              SIGNATURE SERVICE · 12 WEEKS
            </SectionEyebrow>
            <h2>
              療癒師自媒體
              <br />
              <em>1 對 1 私教陪跑</em>
            </h2>
            <p>
              給已經有助人專業、內容正在做，卻卡在定位模糊、內容不轉單或報價退縮的女性創作者。這段陪跑會把你原本很靠感覺的能力，整理成受眾能理解、服務能承接的路徑。
            </p>
            <a
              href={socialLinks.application}
              target="_blank"
              rel="noreferrer"
              className="vivi-button vivi-button-light mt-7"
            >
              申請 1 對 1 適配諮詢 <ArrowRight className="size-4" />
            </a>
            <small>若目前不適合合作，也會直接說明更合適的下一步。</small>
          </div>
          <div className="coaching-feature-visual">
            <img src={asset.viviPortrait} alt="Vivi" />
            <p>
              <HeartHandshake aria-hidden="true" />
              先確認你的問題，再談適合的服務。
            </p>
          </div>
        </div>
      </section>

      <section className="section-space service-build-section">
        <div className="site-shell service-spec-grid service-spec-editorial">
          <div>
            <SectionEyebrow>WHAT YOU WILL BUILD</SectionEyebrow>
            <h2 className="display-heading mt-4">
              這 12 週，
              <br />
              會留下能繼續使用的成果。
            </h2>
            <p className="service-section-intro">
              每一項內容都會回到你的真實經歷、受眾與服務，不套用一模一樣的現成答案。
            </p>
          </div>
          <dl>
            {specs.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-space service-process-section">
        <div className="site-shell">
          <div className="service-section-heading">
            <div>
              <SectionEyebrow>THE FOUR-PART PATH</SectionEyebrow>
              <h2 className="display-heading mt-4">
                從混亂的感覺，走到可以執行的下一步。
              </h2>
            </div>
            <p>四個階段不是制式進度表。會依你現在最卡的地方調整先後順序。</p>
          </div>
          <div className="mt-10 process-grid process-grid-garden">
            {process.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#183b31] text-[#f8f2e8]">
        <div className="site-shell evidence-grid">
          <div>
            <SectionEyebrow className="text-[#e6c886]">
              REAL CASE MATERIALS
            </SectionEyebrow>
            <h2 className="display-heading mt-4 text-[#f8f2e8]">
              把調整前後放在一起看，才知道方向有沒有更清楚。
            </h2>
            <p className="mt-5 max-w-lg text-[#d4e1d5]">
              這些案例不把流量直接說成成交，也不保證每個人都有同樣結果。它們記錄的是問題、調整方式與可追溯的變化。
            </p>
          </div>
          <div className="evidence-stack">
            {testimonials.map(item => (
              <article className="evidence-card" key={item.metric}>
                <img src={item.image} alt={`案例資料：${item.metric}`} />
                <div>
                  <strong>{item.metric}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space other-support-section">
        <div className="site-shell">
          <div className="service-section-heading">
            <div>
              <SectionEyebrow>OTHER WAYS TO BE SUPPORTED</SectionEyebrow>
              <h2 className="display-heading mt-4">
                如果你現在需要的，是先整理自己。
              </h2>
            </div>
            <PortalyLeadLink className="vivi-text-link" />
          </div>
          <div className="other-support-list">
            {services.slice(1).map((service, index) => (
              <article id={service.id} key={service.id}>
                <span>0{index + 2}</span>
                <div>
                  <small>{service.eyebrow}</small>
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                  <div className="service-detail-outcome">
                    <Check className="size-4" />
                    {service.outcome}
                  </div>
                </div>
                <a
                  href={socialLinks.line}
                  target="_blank"
                  rel="noreferrer"
                  className="vivi-button vivi-button-outline"
                >
                  {service.cta} <ArrowRight className="size-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space service-faq-section">
        <div className="site-shell faq-service-grid">
          <div>
            <SectionEyebrow>BEFORE YOU APPLY</SectionEyebrow>
            <h2 className="display-heading mt-4">
              申請前，先把常見問題說清楚。
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <CircleHelp className="size-4" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="你不需要現在就做決定，可以先讓 Vivi 了解你的現況。"
        description="填寫適配諮詢表，說明目前的定位、內容與卡點，再一起確認適合的下一步。"
        href="/services#private-coaching"
        label="回到私教服務"
      />
    </>
  );
}
