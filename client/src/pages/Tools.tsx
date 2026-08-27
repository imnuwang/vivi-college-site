/**
 * Style guide — 月光書房：免費工具是內容與服務之間的溫柔門檻；
 * 視覺像可收藏的紙本練習，行動明確但不帶逼迫感。
 */
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  LockKeyhole,
} from "lucide-react";
import { CtaBand } from "@/components/PagePrimitives";
import { PortalyLeadLink } from "@/components/PortalyLeadLink";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { asset, tools } from "@/data/catalog";
import { Link } from "wouter";

export default function Tools() {
  return (
    <>
      <Seo
        title="免費工具室：覺察、品牌定位與意圖穿搭"
        description="下載美心學苑的免費練習表、療癒型創作者定位急救表與意圖穿搭卡，將感受整理成可以開始的行動。"
        path="/tools"
        image={asset.energy}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "美心學苑免費工具室",
          inLanguage: "zh-TW",
          hasPart: tools.map(tool => ({
            "@type": "CreativeWork",
            name: tool.title,
            description: tool.description,
            isAccessibleForFree: true,
          })),
        }}
      />
      <section className="inner-page-hero tools-garden-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
        />
        <div className="site-shell inner-page-hero-grid tools-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>THE TOOL ROOM · FREE TO USE</SectionEyebrow>
            <h1>
              把腦中的混亂，
              <br />
              <em>
                放到一張
                <br />
                看得懂的紙上。
              </em>
            </h1>
            <p>
              這些免費工具會帶你整理反覆卡住的感受、內容與選擇。先挑一份最接近今天狀態的練習，寫完再決定下一步。
            </p>
            <div className="inner-page-hero-actions">
              <Link
                href="/creator-diagnostic"
                className="vivi-button vivi-button-light"
              >
                先做 5 分鐘診斷 <ArrowRight className="size-4" />
              </Link>
              <a
                href="#download-tools"
                className="vivi-button inner-page-ghost-button"
              >
                直接看三份工具 <Download className="size-4" />
              </a>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>可直接下載 PDF，也能到免費資源庫線上填寫。</span>
            </div>
          </div>
          <figure className="resource-hero-visual tools-hero-visual">
            <img src={asset.energy} alt="暖光中的書寫、牌卡與自我整理空間" />
            <figcaption>
              <span>START WHERE YOU ARE</span>
              今天先處理一個最吵的問題，就已經在往前。
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-space tool-diagnostic-section">
        <div className="site-shell tool-diagnostic-editorial">
          <div className="tool-diagnostic-index">01</div>
          <div>
            <SectionEyebrow>FLAGSHIP DIAGNOSTIC · 5 MINUTES</SectionEyebrow>
            <h2>
              不知道從哪裡開始，
              <br />
              先找出卡住的那一段。
            </h2>
          </div>
          <div className="tool-diagnostic-action">
            <p>
              四個問題會幫你分辨，現在需要先整理的是定位、內容承接，還是服務邀請。完成後會得到一個今天能做的小行動。
            </p>
            <Link
              href="/creator-diagnostic"
              className="vivi-button vivi-button-dark"
            >
              開始內容承接診斷 <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <section
        id="download-tools"
        className="section-space tools-library-section"
      >
        <div className="site-shell">
          <div className="tools-library-heading">
            <div>
              <SectionEyebrow>THREE PRINTABLE PRACTICES</SectionEyebrow>
              <h2 className="display-heading mt-4">三份可以帶走的整理練習</h2>
            </div>
            <p>
              每一份都標出完成後會得到什麼。照著你現在的需要選，不必一次全部下載。
            </p>
          </div>
          <div className="tools-grid">
            {tools.map(tool => (
              <article
                key={tool.id}
                className={`tool-card tool-card-${tool.accent}`}
              >
                <div className="tool-card-top">
                  <span>{tool.number}</span>
                  <p>{tool.pill}</p>
                </div>
                <FileText className="mt-10 size-8" />
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
                <p className="mt-4 border-l-2 border-[#b18c4b] pl-3 text-sm leading-6 text-[#426258]">
                  完成後，你會：{tool.outcome}
                </p>
                <div className="tool-card-bottom">
                  <span>
                    {tool.format} · {tool.pages}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={tool.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="vivi-button vivi-button-dark"
                    >
                      {tool.action} <Download className="size-4" />
                    </a>
                    <PortalyLeadLink
                      label="寄到信箱"
                      className="vivi-text-link"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space tool-process-section">
        <div className="site-shell tool-process-grid">
          <div>
            <SectionEyebrow>HOW TO USE THEM</SectionEyebrow>
            <h2 className="display-heading mt-4">
              寫下來之後，
              <br />
              替明天留一個做得到的動作。
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-[#5c6d63]">
              十五分鐘就夠。答案不用漂亮，只要能讓你看見自己正在經歷什麼。
            </p>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <b>選一份最接近今天狀態的工具。</b>
                <p>先處理最想被照顧的一件事，其他的可以晚一點。</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>留一段不被打斷的 15 分鐘。</b>
                <p>把答案寫下來，讓腦中的感受有一個清楚位置。</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>圈出明天可以做到的一小步。</b>
                <p>不用要求自己立刻改變，先讓行動小到願意開始。</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="section-space">
        <div className="site-shell tarot-promo">
          <div>
            <SectionEyebrow>NEW · A SMALL DAILY RITUAL</SectionEyebrow>
            <h2 className="display-heading mt-4">
              不想下載任何東西時，
              <br />
              也可以先抽一張牌。
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-[#536158]">
              塔羅一日一牌會把抽到的訊號轉成一個書寫問題與 10
              分鐘行動。它只是一段自我覺察，不替你預言或決定未來。
            </p>
          </div>
          <Link href="/tarot-daily" className="vivi-button vivi-button-dark">
            前往塔羅一日一牌 <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <section className="section-space pt-0">
        <div className="site-shell tarot-promo border-[#d9bfc3] bg-[#fff7f6]">
          <div>
            <SectionEyebrow className="text-[#9b3e4e]">
              NEW · 12 CARDS · 3 MINUTES
            </SectionEyebrow>
            <h2 className="display-heading mt-4">
              要開口前，
              <br />
              先把自己穿回來。
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-[#536158]">
              把自己穿回來是一套 12
              張互動急救卡。輸入你現在最卡的畫面，從關鍵字找到對應處方，再用 3
              分鐘回到能說出下一句話的狀態。
            </p>
          </div>
          <Link href="/energy-cards" className="vivi-button vivi-button-dark">
            探索 12 張急救卡 <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <section className="section-space pt-0">
        <div className="site-shell tarot-promo border-[#d9e3d8] bg-[#f5f8f3]">
          <div>
            <SectionEyebrow>THE FREE LIBRARY · NEW PRACTICES</SectionEyebrow>
            <h2 className="display-heading mt-4">
              想更深入一點時，
              <br />
              這裡還有四份可直接填寫的練習。
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-[#536158]">
              從七日覺察、意圖穿搭、晚間回穩到內容承接地圖，每一份都不需付款、不需下載，也不需要先留下
              Email。
            </p>
          </div>
          <Link href="/shop" className="vivi-button vivi-button-dark">
            打開免費資源庫 <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <section className="section-space">
        <div className="site-shell tool-trust">
          <LockKeyhole className="size-7 text-[#b18c4b]" />
          <div>
            <h2>
              若你在 Portaly 留下
              Email，只會收到你選擇的工具與美心學苑後續消息。
            </h2>
            <p>
              月光來信每月約 1–2 封；資料會依 Portaly
              的表單與隱私設定處理。你可以直接下載 PDF，也可以選擇不訂閱。
            </p>
          </div>
          <CheckCircle2 className="size-7 text-[#537561]" />
        </div>
      </section>
      <CtaBand
        eyebrow="WHEN YOU WANT A PERSON WITH YOU"
        title="有些問題不需要再自己反覆拆解。"
        description="如果你想針對一段關係、狀態或品牌方向，得到更貼近你的整理與支持，可以先看看服務頁。"
        href="/services"
        label="探索深度服務"
      />
    </>
  );
}
