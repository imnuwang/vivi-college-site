/**
 * Style guide — 月光書房：資源庫像一座可直接使用的私人書房；
 * 每個入口都能立即開始，不以付款、下載或留下資料作為使用門檻。
 */
import { useMemo, useState } from "react";
import { ArrowRight, Check, SlidersHorizontal, Sparkles } from "lucide-react";
import { CtaBand } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { asset, freeResources } from "@/data/catalog";
import { Link } from "wouter";

export default function Shop() {
  const [category, setCategory] = useState("全部");
  const categories = useMemo(
    () => [
      "全部",
      ...Array.from(new Set(freeResources.map(resource => resource.category))),
    ],
    []
  );
  const resources = useMemo(
    () =>
      category === "全部"
        ? freeResources
        : freeResources.filter(resource => resource.category === category),
    [category]
  );

  return (
    <>
      <Seo
        title="免費資源庫：覺察、回穩、穿搭與內容承接"
        description="美心學苑的免費可操作資源：七日覺察、意圖穿搭、晚間回穩、療癒品牌內容承接與 12 張急救卡。"
        path="/shop"
        image={asset.style}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "美心學苑免費資源庫",
          inLanguage: "zh-TW",
          isAccessibleForFree: true,
        }}
      />
      <section className="inner-page-hero library-garden-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
        />
        <div className="site-shell inner-page-hero-grid library-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>THE FREE LIBRARY · OPEN PRACTICES</SectionEyebrow>
            <h1>
              先照顧一個地方，
              <br />
              <em>
                再把今天
                <br />
                慢慢拿回來。
              </em>
            </h1>
            <p>
              覺察、穿搭、晚間回穩與內容定位，都整理成能直接填寫的練習。打開就能使用，不需要付款或先留下資料。
            </p>
            <div className="inner-page-hero-actions">
              <a
                href="#free-practices"
                className="vivi-button vivi-button-light"
              >
                選一份練習 <ArrowRight className="size-4" />
              </a>
              <Link
                href="/creator-diagnostic"
                className="vivi-button inner-page-ghost-button"
              >
                我不知道該選哪一份 <Sparkles className="size-4" />
              </Link>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>
                {freeResources.length}{" "}
                份免費入口，完成後可以複製、列印或留給明天。
              </span>
            </div>
          </div>
          <figure className="resource-hero-visual library-hero-visual">
            <img src={asset.style} alt="Vivi 示範以穿搭與色彩整理當天的狀態" />
            <figcaption>
              <span>USE IT NOW</span>每一份資源都有可以操作、可以帶走的結果。
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        id="free-practices"
        className="section-space library-catalogue-section"
      >
        <div className="site-shell library-catalogue-heading">
          <div>
            <SectionEyebrow>CHOOSE YOUR ENTRY</SectionEyebrow>
            <h2 className="display-heading mt-4">
              今天，哪一個地方最需要被接住？
            </h2>
          </div>
          <p>
            依照當下卡點篩選。每張卡片都會先告訴你練習內容與完成後能帶走的結果。
          </p>
        </div>
        <div className="site-shell mt-8 flex flex-col gap-6 border-y border-[#d8ddd5] py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="filter-row">
            <SlidersHorizontal className="mr-2 size-4 text-[#718177]" />
            {categories.map(entry => (
              <button
                key={entry}
                onClick={() => setCategory(entry)}
                className={
                  category === entry
                    ? "filter-chip filter-chip-active"
                    : "filter-chip"
                }
              >
                {entry}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#66766c]">
            {resources.length} 份免費實作資源
          </p>
        </div>
        <div className="site-shell mt-10 shop-grid shop-grid-editorial">
          {resources.map(resource => (
            <article
              className={`product-card ${resource.kind === "energy-cards" ? "product-card-energy" : ""}`}
              key={resource.id}
            >
              <div
                className="product-image-wrap"
                style={{
                  backgroundImage: `url(${resource.image ?? asset.hero})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <img src={resource.image} alt={resource.name} />
                {resource.badge && (
                  <span className="product-card-badge">{resource.badge}</span>
                )}
              </div>
              <div className="product-card-copy">
                <p>{resource.category}</p>
                <h2>{resource.name}</h2>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[#2f6b52]">
                  <Sparkles className="size-4" />
                  免費立即使用
                </span>
                <p className="product-description">{resource.description}</p>
                <div className="product-detail">
                  <Check className="size-4" />
                  {resource.detail}
                </div>
                <p className="product-payment-note product-payment-note-explore">
                  不需付款；選一個最像你當下狀態的入口，直接開始練習。
                </p>
                <Link
                  href={resource.href}
                  className={
                    resource.kind === "energy-cards"
                      ? "vivi-button vivi-button-energy mt-6 w-full"
                      : "vivi-button vivi-button-dark mt-6 w-full"
                  }
                >
                  {resource.action} <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-space library-method-section">
        <div className="site-shell tool-process-grid">
          <div>
            <SectionEyebrow>HOW TO USE THE LIBRARY</SectionEyebrow>
            <h2 className="display-heading mt-4">
              先完成一份，
              <br />
              讓答案真正回到生活裡。
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-[#5c6d63]">
              你不用收藏所有資源。選一個需要被照顧的地方，留下答案，再替明天縮小成一個能做到的動作。
            </p>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <b>選一個現在的卡點</b>
                <p>從最接近今天狀態的資源開始。</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>把答案留下來</b>
                <p>寫下一句、複製提醒，或列印成自己的練習頁。</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>明天只做一小步</b>
                <p>把下一步縮小到你真的願意開始。</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <CtaBand
        eyebrow="WHEN YOU WANT A PERSON WITH YOU"
        title="工具先陪你整理；需要時，也可以有人陪你一起看。"
        description="當一個問題需要更貼近你的脈絡與支持，可以再看看美心學苑的一對一服務。"
        href="/services"
        label="探索深度服務"
      />
    </>
  );
}
