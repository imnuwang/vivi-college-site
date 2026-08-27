/**
 * SRT is presented as Vivi's core spiritual self-exploration service.
 * Claims stay inside the source material while medical and outcome guarantees are excluded.
 */
import {
  ArrowRight,
  Check,
  CircleHelp,
  ClipboardList,
  ExternalLink,
  FileText,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { asset, services } from "@/data/catalog";
import { trackConversion } from "@/lib/analytics";

const srtService = services.find(service => service.id === "srt-healing")!;

const themes = [
  [
    "關係裡反覆出現的拉扯",
    "總在相似互動裡委屈、退縮，想先看懂自己的反應模式。",
  ],
  [
    "金錢與工作方向",
    "面對收費、轉換跑道或下一步時容易猶豫，想整理內在的擔心。",
  ],
  ["自我價值與表達", "知道自己有能力，真正要說出需要或站出來時卻常常縮回去。"],
  [
    "長期繞不出去的情緒模式",
    "同一種不安、壓力或耗能感反覆出現，希望換一個角度理解。",
  ],
] as const;

const steps = [
  {
    number: "01",
    title: "先說明想整理的主題",
    description:
      "預約表會詢問基本聯絡資料、目前主題與可接受時段。一次先聚焦一個核心問題。",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Vivi 進行遠距 SRT 整理",
    description:
      "服務不需到場或視訊。Vivi 依 SRT 的靈性架構整理本次主題，過程不是醫療或心理診斷。",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "收到報告與後續回覆",
    description:
      "你會收到約 2,000 字的個人報告與日常行動建議，並有三天 LINE 回覆時間。",
    icon: FileText,
  },
] as const;

const faqs = [
  [
    "需要到現場或開視訊嗎？",
    "不用。這項服務採遠距方式進行。預約前仍會書面確認日期、流程與需要提供的資料。",
  ],
  [
    "做一次就一定會改變嗎？",
    "不保證。每個人的感受、理解與後續行動都不同。SRT 可以作為自我探索的一種方法，不能保證健康、關係、收入或人生結果。",
  ],
  [
    "表單會收集哪些資料？",
    "目前表單會詢問姓名或暱稱、Email、生日、所在城市、LINE ID、想整理的主題、時段與付款狀態。請只提供完成預約需要的資料。",
  ],
  [
    "有身心症狀也適合做嗎？",
    "身心不適需要先由合格醫療或心理專業評估。SRT 不提供診斷或治療，也不應取代正在進行的專業照護。",
  ],
] as const;

export default function SrtHealing() {
  return (
    <>
      <Seo
        title="SRT 靈性回應療法：流程、費用與預約"
        description="了解 Vivi 的核心 SRT 靈性回應療法，包含適合主題、遠距流程、費用、個人報告、後續回覆與預約資料說明。"
        path="/srt-healing"
        image={asset.energy}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "SRT 靈性回應療法",
          description: srtService.summary,
          provider: {
            "@type": "Organization",
            name: "VIVI COLLEGE 美心學苑",
          },
          areaServed: "TW",
          serviceType: "遠距靈性自我探索服務",
        }}
      />

      <section className="inner-page-hero srt-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
          width={1672}
          height={941}
          fetchPriority="high"
        />
        <div className="site-shell inner-page-hero-grid srt-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>VIVI'S CORE HEALING METHOD</SectionEyebrow>
            <h1>
              SRT 靈性回應療法
              <br />
              <em>先看懂反覆卡住的主題。</em>
            </h1>
            <p>
              當關係、金錢、工作方向或自我價值總在相似的位置打轉，SRT
              提供一種靈性自我探索方式，陪你整理本次最想理解的核心主題。
            </p>
            <div className="inner-page-hero-actions">
              <Link
                href="/continue/srt-application"
                className="vivi-button vivi-button-light"
                onClick={() =>
                  trackConversion("service_cta_click", {
                    service_id: "srt-healing",
                    source: "srt_hero",
                  })
                }
              >
                查看預約表單 <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/continue/srt-notion"
                className="vivi-button inner-page-ghost-button"
                onClick={() =>
                  trackConversion("srt_notion_open", { source: "srt_hero" })
                }
              >
                閱讀 Notion 完整說明 <ExternalLink className="size-4" />
              </Link>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>用於自我探索，不替代醫療或心理治療，也不保證結果。</span>
            </div>
          </div>
          <aside className="srt-hero-facts" aria-label="SRT 服務摘要">
            <span>CORE SERVICE</span>
            <h2>預約前先知道</h2>
            <dl>
              <div>
                <dt>方式</dt>
                <dd>遠距，不需到場或視訊</dd>
              </div>
              <div>
                <dt>時間</dt>
                <dd>單次約 60 分鐘</dd>
              </div>
              <div>
                <dt>交付</dt>
                <dd>個人報告與三天 LINE 回覆</dd>
              </div>
              <div>
                <dt>首次單堂</dt>
                <dd>NT$3,000</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="srt-trust-strip" aria-label="SRT 服務原則">
        <div className="site-shell">
          <span>
            <Check aria-hidden="true" /> 一次聚焦一個主題
          </span>
          <span>
            <Check aria-hidden="true" /> 先看資料用途再填表
          </span>
          <span>
            <Check aria-hidden="true" /> 付款前確認完整條件
          </span>
        </div>
      </section>

      <section className="section-space srt-intro-section">
        <div className="site-shell srt-intro-grid">
          <div>
            <SectionEyebrow>WHAT SRT MEANS HERE</SectionEyebrow>
            <h2 className="display-heading mt-4">在美心學苑，SRT 怎麼使用？</h2>
            <p>
              SRT 是 Spiritual Response Therapy 的縮寫。Vivi
              會透過這套靈性架構，協助你整理一個反覆出現的生活主題，並把本次內容轉成可閱讀的報告與日常建議。
            </p>
            <p>
              網站不會把靈性觀點寫成已被醫學證實的原因。你可以把報告當成自我覺察線索，保留自己的判斷，再決定哪些內容適合帶回生活。
            </p>
          </div>
          <div className="srt-boundary-card">
            <ShieldCheck aria-hidden="true" />
            <div>
              <h3>這項服務不做什麼</h3>
              <p>
                不診斷疾病、不取代醫療或心理治療、不要求停藥，也不保證關係、財務、健康或工作結果。
              </p>
              <Link href="/policies">閱讀服務與取消退款說明</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space srt-theme-section">
        <div className="site-shell">
          <div className="service-section-heading">
            <div>
              <SectionEyebrow>BRING ONE CLEAR THEME</SectionEyebrow>
              <h2 className="display-heading mt-4">你可以帶著什麼主題來？</h2>
            </div>
            <p>
              不用先替自己找到答案。先選一個近期最常出現、也最想整理的生活主題。
            </p>
          </div>
          <div className="srt-theme-grid">
            {themes.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space srt-process-section">
        <div className="site-shell">
          <div className="service-section-heading">
            <div>
              <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
              <h2 className="display-heading mt-4">從填表到收到回饋。</h2>
            </div>
            <p>每一步都先讓你知道會發生什麼，也保留停止或不繼續的選擇。</p>
          </div>
          <div className="srt-process-grid">
            {steps.map(step => {
              const Icon = step.icon;
              return (
                <article key={step.number}>
                  <div>
                    <span>{step.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space srt-service-facts-section">
        <div className="site-shell srt-service-facts-grid">
          <div>
            <SectionEyebrow>SERVICE DETAILS</SectionEyebrow>
            <h2 className="display-heading mt-4">費用、交付與資料使用。</h2>
            <p>
              目前 Google
              預約表列有首次單堂、一般單堂與三堂方案。表單內若出現活動價，資格與實付金額仍以付款前書面確認為準。
            </p>
          </div>
          <dl>
            <div>
              <dt>費用</dt>
              <dd>{srtService.price}</dd>
            </div>
            <div>
              <dt>時間與方式</dt>
              <dd>
                {srtService.duration} {srtService.format}
              </dd>
            </div>
            <div>
              <dt>你會收到</dt>
              <dd>{srtService.delivery}</dd>
            </div>
            <div>
              <dt>後續回覆</dt>
              <dd>{srtService.followUp}</dd>
            </div>
            <div>
              <dt>表單資料</dt>
              <dd>
                姓名或暱稱、Email、生日、所在城市、LINE
                ID、整理主題、可接受時段與付款狀態。資料由 Google 表單處理。
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-space service-faq-section">
        <div className="site-shell faq-service-grid">
          <div>
            <SectionEyebrow>BEFORE YOU BOOK</SectionEyebrow>
            <h2 className="display-heading mt-4">預約前常見問題。</h2>
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

      <section className="srt-final-cta">
        <div className="site-shell srt-final-cta-grid">
          <div>
            <SectionEyebrow>WHEN YOU ARE READY</SectionEyebrow>
            <h2>先看完整條件，再決定要不要填表。</h2>
            <p>
              表單會顯示目前方案與付款資訊。若尚未看見清楚的取消退款條件，請先透過
              LINE 詢問，不需要急著付款。
            </p>
          </div>
          <div>
            <Link
              href="/continue/srt-application"
              className="vivi-button vivi-button-light"
              onClick={() =>
                trackConversion("srt_application_open", {
                  source: "srt_final_cta",
                })
              }
            >
              前往 SRT 預約表單 <ArrowRight className="size-4" />
            </Link>
            <Link href="/continue/line" className="srt-line-link">
              <MessageCircleHeart className="size-4" /> 先用 LINE 詢問
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
