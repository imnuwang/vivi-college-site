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
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { PortalyLeadLink } from "@/components/PortalyLeadLink";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { asset, services } from "@/data/catalog";
import { trackConversion } from "@/lib/analytics";

const privateCoaching = services.find(
  service => service.id === "private-coaching"
)!;
const srtService = services.find(service => service.id === "srt-healing")!;
const otherServices = services.filter(service =>
  ["tarot-session", "energy-reset"].includes(service.id)
);

const specs = [
  ["陪跑期間", "12 週，從定位、內容到服務承接分階段推進。"],
  ["支持方式", "線上一對一會談搭配文字回饋；實際頻率於適配諮詢說明。"],
  ["主要成果", "定位句、內容主題地圖、核心服務說明、內容到諮詢的承接路徑。"],
  ["適合對象", "已有助人專業或深度生命經驗，正在創作或接案的女性創作者。"],
  ["費用說明", privateCoaching.price],
  ["回覆安排", privateCoaching.followUp],
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
        title="一對一服務：SRT 療癒、塔羅與療癒品牌私教"
        description="美心學苑以 SRT 靈性回應療法為核心，另有一對一塔羅、能量整理與療癒師自媒體品牌私教。"
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
          width={1672}
          height={941}
          fetchPriority="high"
        />
        <div className="site-shell inner-page-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>ONE-TO-ONE SUPPORT · CLEARLY HELD</SectionEyebrow>
            <h1>
              先看懂你想整理的主題，
              <br />
              <em>再選適合的服務。</em>
            </h1>
            <p>
              美心學苑以 SRT
              靈性回應療法為核心，也保留塔羅、能量整理與療癒品牌私教。先了解方法、條件與界線，再決定是否預約。
            </p>
            <div className="inner-page-hero-actions">
              <Link
                href="/srt-healing"
                className="vivi-button vivi-button-light"
                onClick={() =>
                  trackConversion("service_cta_click", {
                    service_id: "srt-healing",
                    source: "services_hero",
                  })
                }
              >
                了解核心 SRT 療癒 <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/continue/srt-application"
                className="vivi-button inner-page-ghost-button"
                onClick={() =>
                  trackConversion("srt_application_open", {
                    source: "services_hero",
                  })
                }
              >
                查看 SRT 預約表單 <MessageCircleHeart className="size-4" />
              </Link>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>所有服務先確認適配度。你可以先理解，再決定。</span>
            </div>
          </div>
          <figure className="service-hero-portrait">
            <img
              src={asset.viviPortrait}
              alt="美心學苑創辦人 Vivi"
              width={1000}
              height={1503}
            />
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

      <section
        id="srt-healing"
        className="section-space srt-service-core scroll-mt-20"
      >
        <div className="site-shell srt-service-core-grid">
          <div>
            <SectionEyebrow>CORE HEALING METHOD</SectionEyebrow>
            <h2 className="display-heading mt-4">SRT 靈性回應療法</h2>
            <p>{srtService.summary}</p>
            <div className="srt-service-core-actions">
              <Link
                href="/srt-healing"
                className="vivi-button vivi-button-dark"
              >
                看完整流程與費用 <ArrowRight className="size-4" />
              </Link>
              <Link href="/continue/srt-application" className="vivi-text-link">
                前往預約表單
              </Link>
            </div>
          </div>
          <div className="srt-service-core-details">
            <div>
              <b>怎麼進行</b>
              <p>
                {srtService.duration} {srtService.format}
              </p>
            </div>
            <div>
              <b>你會收到</b>
              <p>{srtService.delivery}</p>
            </div>
            <div>
              <b>費用</b>
              <p>{srtService.price}</p>
            </div>
            <div className="srt-service-core-boundary">
              <ShieldCheck aria-hidden="true" />
              <p>
                SRT 用於靈性自我探索，不提供醫療或心理診斷，也不保證特定結果。
              </p>
            </div>
          </div>
        </div>
      </section>

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
            <Link
              href="/continue/application"
              className="vivi-button vivi-button-light mt-7"
              onClick={() =>
                trackConversion("service_cta_click", {
                  service_id: "private-coaching",
                  source: "coaching_feature",
                })
              }
            >
              申請 1 對 1 適配諮詢 <ArrowRight className="size-4" />
            </Link>
            <small>若目前不適合合作，也會直接說明更合適的下一步。</small>
          </div>
          <div className="coaching-feature-visual">
            <img
              src={asset.viviPortrait}
              alt="Vivi"
              width={1000}
              height={1503}
              loading="lazy"
            />
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

      <section className="section-space service-terms-section">
        <div className="site-shell">
          <div className="service-section-heading">
            <div>
              <SectionEyebrow>BEFORE YOU BOOK</SectionEyebrow>
              <h2 className="display-heading mt-4">預約前，先把條件看清楚。</h2>
            </div>
            <p>
              目前服務依問題與合作範圍書面報價。你會在付款前看見費用、時間、方式、交付內容與回覆安排。
            </p>
          </div>
          <div className="service-terms-grid">
            {services.map(service => (
              <article key={service.id}>
                <p className="service-terms-eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <dl>
                  <div>
                    <dt>費用</dt>
                    <dd>{service.price}</dd>
                  </div>
                  <div>
                    <dt>時間</dt>
                    <dd>{service.duration}</dd>
                  </div>
                  <div>
                    <dt>方式</dt>
                    <dd>{service.format}</dd>
                  </div>
                  <div>
                    <dt>你會帶走</dt>
                    <dd>{service.delivery}</dd>
                  </div>
                  <div>
                    <dt>後續回覆</dt>
                    <dd>{service.followUp}</dd>
                  </div>
                </dl>
                <div className="service-fit-grid">
                  <div>
                    <b>適合</b>
                    <p>{service.suitableFor}</p>
                  </div>
                  <div>
                    <b>不適合</b>
                    <p>{service.notSuitableFor}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="service-boundary-note">
            <CircleHelp aria-hidden="true" />
            <p>
              塔羅與能量整理用於自我覺察與日常整理，不替代醫療、心理治療、法律或財務專業。付款前請先閱讀
              <Link href="/policies">取消、改期與退款說明</Link>。
            </p>
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
            {otherServices.map((service, index) => (
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
                <Link
                  href="/continue/line"
                  className="vivi-button vivi-button-outline"
                  onClick={() =>
                    trackConversion("service_cta_click", {
                      service_id: service.id,
                      source: "other_support",
                    })
                  }
                >
                  {service.cta} <ArrowRight className="size-4" />
                </Link>
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
        title="還不確定哪一項適合，可以先把問題問清楚。"
        description="先透過 LINE 說明你想整理的主題，再確認 SRT、塔羅、能量整理或品牌私教是否適合。"
        href="/continue/line"
        label="先用 LINE 詢問"
      />
    </>
  );
}
