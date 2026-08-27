/**
 * Style guide — 內在花園：以深林、晨光與暖紙頁建立沉浸感；
 * 首頁先讓讀者選擇「照顧自己」或「讓專業被看見」，再進入內容與服務。
 */
import { ArrowRight, ClipboardCheck, HeartHandshake } from "lucide-react";
import { Link } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { Seo } from "@/components/Seo";
import {
  articles,
  asset,
  freeResources,
  services,
  tools,
} from "@/data/catalog";

const entryPaths = [
  {
    eyebrow: "先讓自己慢下來",
    title: "我現在需要先穩住情緒",
    description: "當心裡很亂，先用一張急救卡把注意力帶回此刻。",
    image: asset.energy,
    width: 1664,
    height: 2080,
    href: "/energy-cards",
    action: "打開情緒急救卡",
  },
  {
    eyebrow: "看懂反覆出現的訊號",
    title: "我想從混亂裡找到一點方向",
    description: "用每日塔羅與書寫提問，整理今天真正需要面對的事。",
    image: asset.tarot,
    width: 1664,
    height: 2080,
    href: "/tarot-daily",
    action: "抽一張今日指引",
  },
  {
    eyebrow: "把專業說得更清楚",
    title: "我想讓自己的療癒專業被看見",
    description: "先找出定位、內容與服務承接之間，現在最需要整理的位置。",
    image: asset.innerGardenHero,
    width: 1672,
    height: 941,
    href: "/creator-diagnostic",
    action: "開始內容承接診斷",
  },
] as const;

export default function Home() {
  return (
    <>
      <Seo
        title="療癒、自我成長與療癒品牌內容"
        description="美心學苑提供低潮陪伴、自我探索、免費練習與療癒品牌內容診斷，陪你先照顧自己，也把有能力的自己說清楚。"
        path="/"
        image={asset.homeHeroDesktop}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "VIVI COLLEGE 美心學苑",
              url: "https://vivicollege.com",
              logo: asset.seal,
              sameAs: ["https://www.instagram.com/vivi_college/"],
            },
            {
              "@type": "WebSite",
              name: "VIVI COLLEGE 美心學苑",
              url: "https://vivicollege.com",
              inLanguage: "zh-TW",
            },
          ],
        }}
      />
      <section className="hero-home">
        <picture className="hero-home-picture">
          <source media="(max-width: 800px)" srcSet={asset.homeHeroMobile} />
          <img
            className="hero-home-atmosphere"
            src={asset.homeHeroDesktop}
            alt="美心學苑創辦人 Vivi 坐在暖光與深綠植物交織的室內花園裡"
            width={1538}
            height={1023}
            fetchPriority="high"
          />
        </picture>
        <div className="site-shell hero-home-grid">
          <div className="hero-home-copy">
            <SectionEyebrow>VIVI COLLEGE · HEALING & GROWTH</SectionEyebrow>
            <h1>
              陪你在低潮裡
              <br />
              找回自己，<em>也把有能力的自己說清楚。</em>
            </h1>
            <p>
              這裡有能在今天開始的閱讀、練習與工具。當你準備把療癒專業說得更清楚，也有內容診斷與陪跑服務。
            </p>
            <div className="hero-paths" aria-label="選擇你現在最需要的方向">
              <Link href="/energy-cards" className="hero-path hero-path-self">
                <HeartHandshake aria-hidden="true" />
                <span>
                  <b>我想先照顧自己</b>
                  <small>從此刻的情緒與需要出發</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                href="/creator-diagnostic"
                className="hero-path hero-path-work"
              >
                <ClipboardCheck aria-hidden="true" />
                <span>
                  <b>我想讓專業被看見</b>
                  <small>整理定位、內容與服務承接</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <Link href="/journal" className="hero-inline-link">
              先從一篇文章開始 <ArrowRight aria-hidden="true" />
            </Link>
            <div className="hero-home-stamp">
              <MoonMark size="md" />
              <span>
                <b>不用一次想清楚</b>
                <br />
                先選一個最接近你現在的入口。
              </span>
            </div>
          </div>
          <div className="hero-home-caption">
            <span>Vivi｜美心學苑創辦人</span>
            我走過低潮，也知道把感受整理成生活，需要時間。
          </div>
        </div>
      </section>

      <section className="section-space home-entry-section">
        <div className="site-shell home-entry-heading">
          <SectionEyebrow>START WHERE YOU ARE</SectionEyebrow>
          <h2 className="display-heading">你今天，比較需要哪一種陪伴？</h2>
          <p>
            不必先知道完整答案。選一個最像你現在的狀態，網站會帶你到可以立即使用的內容。
          </p>
        </div>
        <div className="site-shell home-entry-grid">
          {entryPaths.map(entry => (
            <Link
              href={entry.href}
              className="home-entry-card"
              key={entry.title}
            >
              <div className="home-entry-image">
                <img
                  src={entry.image}
                  alt=""
                  width={entry.width}
                  height={entry.height}
                  loading="lazy"
                />
              </div>
              <div className="home-entry-copy">
                <span>{entry.eyebrow}</span>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <i>
                  {entry.action} <ArrowRight aria-hidden="true" />
                </i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space pt-16">
        <div className="site-shell home-editorial-grid">
          <div className="editorial-note">
            <SectionEyebrow>START WITH SOMETHING USEFUL</SectionEyebrow>
            <h2 className="display-heading mt-4">
              先用一個小工具，
              <br />
              讓模糊的感受有位置。
            </h2>
            <p className="mt-5">
              從反覆訊號、穿搭意圖到療癒品牌定位，每份工具都能在今天開始。你可以先完成一個小步驟，再決定要不要往下走。
            </p>
            <Link href="/tools" className="vivi-button vivi-button-dark mt-7">
              打開免費工具室 <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="tool-preview-stack">
            {tools.map(tool => (
              <Link href="/tools" key={tool.id} className="tool-preview-card">
                <span>{tool.number}</span>
                <div>
                  <b>{tool.title}</b>
                  <p>{tool.format}</p>
                </div>
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#edf0e8]">
        <div className="site-shell flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>RECENT NOTES</SectionEyebrow>
            <h2 className="display-heading mt-4">本週，留給自己的幾篇閱讀。</h2>
          </div>
          <Link href="/journal" className="vivi-text-link">
            進入閱讀室 <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="site-shell mt-10 article-grid">
          {articles.slice(0, 3).map(article => (
            <Link
              href={`/journal/${article.slug}`}
              key={article.slug}
              className="article-card"
            >
              <img src={article.image} alt="" />
              <div>
                <span>
                  {article.pillar} · {article.readingTime}
                </span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <i>
                  閱讀這一章 <ArrowRight className="size-4" />
                </i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell home-services-top">
          <div>
            <SectionEyebrow>WHEN YOU WANT DEEPER SUPPORT</SectionEyebrow>
            <h2 className="display-heading mt-4">
              當你不想再一個人繞圈，
              <br />
              這裡有更深一層的陪伴。
            </h2>
          </div>
          <p>
            從一對一塔羅與能量整理，到給療癒師的品牌私教，每一項服務都先協助你確認：現在真正需要被處理的是什麼。
          </p>
        </div>
        <div className="site-shell mt-10 grid gap-4 lg:grid-cols-3">
          {services.map(service => (
            <Link
              href={service.href}
              key={service.id}
              className={`service-preview ${service.featured ? "service-preview-featured" : ""}`}
            >
              <span>{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <div>
                <b>{service.outcome}</b>
                <i>
                  <ArrowRight className="size-4" />
                </i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>THE FREE LIBRARY</SectionEyebrow>
            <h2 className="display-heading mt-4">
              把一點意圖，
              <br />
              帶進今天真的用得上的練習。
            </h2>
          </div>
          <Link href="/shop" className="vivi-text-link">
            打開免費資源庫 <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="site-shell mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {freeResources.slice(0, 4).map(resource => (
            <Link
              href={resource.href}
              key={resource.id}
              className="mini-product"
            >
              <img src={resource.image} alt="" />
              <div>
                <span>{resource.category} · 免費</span>
                <h3>{resource.name}</h3>
                <p>{resource.action}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="還不知道從哪裡開始，就先做一個今天用得上的練習。"
        description="免費工具不需要先做重大決定。選一個最接近現在的狀態，完成後再看下一步。"
        href="/tools"
        label="查看免費工具"
      />
    </>
  );
}
