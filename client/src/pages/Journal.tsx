/**
 * Style guide: 內在花園閱讀室。
 * 首頁的深林與晨光延伸成一份可慢慢閱讀的編輯刊物。
 */
import { ArrowRight, BookOpen } from "lucide-react";
import { Link, useSearch } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { articles, asset } from "@/data/catalog";

const filters = [
  "全部",
  "塔羅占卜",
  "能量療癒",
  "穿搭玄學",
  "品牌私教",
] as const;

const filterParams = {
  塔羅占卜: "tarot",
  能量療癒: "energy",
  穿搭玄學: "style",
  品牌私教: "brand",
} as const;

export default function Journal() {
  const searchString = useSearch();
  const search = new URLSearchParams(searchString);
  const raw = search.get("pillar");
  const selected =
    raw === "tarot"
      ? "塔羅占卜"
      : raw === "energy"
        ? "能量療癒"
        : raw === "style"
          ? "穿搭玄學"
          : raw === "brand"
            ? "品牌私教"
            : "全部";
  const filtered =
    selected === "全部"
      ? articles
      : articles.filter(article => article.pillar === selected);
  const [featured, ...remaining] = filtered;

  return (
    <>
      <Seo
        title="閱讀室：塔羅、能量、穿搭與品牌內容"
        description="美心學苑的免費閱讀室：關於感情、財運、能量整理、穿搭開運與療癒師品牌定位的實用文章。"
        path="/journal"
        image={asset.tarot}
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "美心學苑閱讀室",
          inLanguage: "zh-TW",
          blogPost: articles.map(article => ({
            "@type": "BlogPosting",
            headline: article.title,
            datePublished: article.date,
            image: article.image,
          })),
        }}
      />

      <section className="inner-page-hero journal-garden-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
        />
        <div className="site-shell inner-page-hero-grid journal-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>THE JOURNAL · FREE TO READ</SectionEyebrow>
            <h1>
              不是每個問題，
              <br />
              都要立刻有答案。
              <br />
              <em>先讀一篇，讓它有出口。</em>
            </h1>
            <p>
              這裡收錄關於感情、財運、能量、穿搭與療癒品牌的免費內容。先從一個最像你今天狀態的題目開始。
            </p>
            {featured ? (
              <Link
                href={`/journal/${featured.slug}`}
                className="vivi-button vivi-button-light inner-page-feature-link"
              >
                讀本週選文 <ArrowRight className="size-4" />
              </Link>
            ) : null}
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>讀完只帶走一個願意試試看的小行動就好。</span>
            </div>
          </div>
          <figure className="journal-hero-visual">
            <img src={asset.tarot} alt="塔羅牌與書寫日誌" />
            <figcaption>
              <BookOpen aria-hidden="true" />
              <span>
                每一篇都從生活裡的卡點出發，最後留下一個能實際使用的整理方式。
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="journal-index-bar" aria-label="文章分類">
        <div className="site-shell">
          <span>依你現在需要的方向閱讀</span>
          <div className="filter-row">
            {filters.map(filter => {
              const href =
                filter === "全部"
                  ? "/journal"
                  : `/journal?pillar=${filterParams[filter]}`;
              return (
                <Link
                  key={filter}
                  href={href}
                  className={
                    selected === filter
                      ? "filter-chip filter-chip-active"
                      : "filter-chip"
                  }
                >
                  {filter}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space journal-reading-section">
        <div className="site-shell">
          <div className="journal-section-heading">
            <div>
              <SectionEyebrow>CURRENT READING</SectionEyebrow>
              <h2 className="display-heading mt-4">
                {selected === "全部" ? "從今天最靠近你的題目開始。" : selected}
              </h2>
            </div>
            <p>{filtered.length} 篇免費閱讀</p>
          </div>

          {featured ? (
            <Link
              href={`/journal/${featured.slug}`}
              className="journal-lead-story"
            >
              <div className="journal-lead-image">
                <img src={featured.image} alt="" />
                <span>本期選文</span>
              </div>
              <div>
                <small>
                  {featured.pillar} · {featured.date} · {featured.readingTime}
                </small>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <i>
                  展開這一章 <ArrowRight className="size-4" />
                </i>
              </div>
            </Link>
          ) : null}

          <div className="journal-library-layout">
            <div className="journal-story-list">
              {remaining.map((article, index) => (
                <Link
                  href={`/journal/${article.slug}`}
                  key={article.slug}
                  className="journal-story-row"
                >
                  <span>0{index + 2}</span>
                  <img src={article.image} alt="" loading="lazy" />
                  <div>
                    <small>
                      {article.pillar} · {article.readingTime}
                    </small>
                    <h2>{article.title}</h2>
                    <p>{article.excerpt}</p>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
            <aside className="journal-aside journal-aside-garden">
              <SectionEyebrow>READING RITUAL</SectionEyebrow>
              <BookOpen className="mt-5 size-8 text-[#e6c886]" />
              <h2>不知道從哪裡讀起？</h2>
              <p>
                看標題時，留意哪一句讓你停了一下。那篇通常最靠近你現在需要整理的事。
              </p>
              <Link href="/tools" className="vivi-text-link">
                領取免費整理表 <ArrowRight className="size-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="WHEN A NOTE BECOMES A PATTERN"
        title="想把反覆出現的卡點，整理得更清楚？"
        description="工具室裡有可以直接使用的覺察表、定位工作紙與意圖穿搭卡。"
        href="/tools"
        label="前往免費工具室"
      />
    </>
  );
}
