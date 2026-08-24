/**
 * Style guide — 月光書房：閱讀室像可翻閱的編輯檔案；用紙頁感與章節標籤降低資訊焦慮。
 */
import { ArrowRight, BookOpen } from "lucide-react";
import { Link, useLocation } from "wouter";
import { CtaBand, PageIntro } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { articles, asset } from "@/data/catalog";

const filters = ["全部", "塔羅占卜", "能量療癒", "穿搭玄學", "品牌私教"] as const;

export default function Journal() {
  const [location] = useLocation();
  const search = new URLSearchParams(window.location.search);
  const raw = search.get("pillar");
  const selected = raw === "tarot" ? "塔羅占卜" : raw === "energy" ? "能量療癒" : raw === "style" ? "穿搭玄學" : raw === "brand" ? "品牌私教" : "全部";
  const filtered = selected === "全部" ? articles : articles.filter((article) => article.pillar === selected);

  return (
    <>
      <Seo title="閱讀室：塔羅、能量、穿搭與品牌內容" description="美心學苑的免費閱讀室：關於感情、財運、能量整理、穿搭開運與療癒師品牌定位的實用文章。" path="/journal" image={asset.tarot} schema={{ "@context": "https://schema.org", "@type": "Blog", name: "美心學苑閱讀室", inLanguage: "zh-TW", blogPost: articles.map((article) => ({ "@type": "BlogPosting", headline: article.title, datePublished: article.date, image: article.image })) }} />
      <PageIntro kind="archive" chapter="01" eyebrow="THE JOURNAL · FREE TO READ" title={<>不是每個問題都要立刻有答案。<br /><em>先讀一篇，讓它有出口。</em></>} description="這裡收錄關於感情、財運、能量、穿搭與療癒品牌的免費內容。從一個看似微小的卡點開始，把感受翻成能實際採取的下一步。" note="每週持續更新 · 先閱讀，再決定要不要靠近更多支持" />
      <section className="section-space pt-10">
        <div className="site-shell"><div className="filter-row" aria-label="文章分類">{filters.map((filter) => { const href = filter === "全部" ? "/journal" : `/journal?pillar=${filter === "塔羅占卜" ? "tarot" : filter === "能量療癒" ? "energy" : filter === "穿搭玄學" ? "style" : "brand"}`; return <Link key={filter} href={href} className={selected === filter ? "filter-chip filter-chip-active" : "filter-chip"}>{filter}</Link>; })}</div></div>
        <div className="site-shell mt-10 journal-layout"><div className="space-y-5">{filtered.map((article, index) => <Link href={`/journal/${article.slug}`} key={article.slug} className={`journal-row ${index === 0 ? "journal-row-featured" : ""}`}><img src={article.image} alt="" /><div><span>{article.pillar} · {article.date} · {article.readingTime}</span><h2>{article.title}</h2><p>{article.excerpt}</p><i>展開這一章 <ArrowRight className="size-4" /></i></div></Link>)}</div><aside className="journal-aside"><SectionEyebrow>READING RITUAL</SectionEyebrow><BookOpen className="mt-5 size-8 text-[#b18c4b]" /><h2>不知道從哪裡讀起？</h2><p>先選一篇最像你今天狀態的標題。讀完後，只帶走一個願意試試看的小行動就好。</p><Link href="/tools" className="vivi-text-link">領取免費整理表 <ArrowRight className="size-4" /></Link></aside></div>
      </section>
      <CtaBand eyebrow="WHEN A NOTE BECOMES A PATTERN" title="想把反覆出現的卡點，整理得更清楚？" description="工具室裡有可以直接下載的覺察表、定位工作紙與意圖穿搭卡，免費且可立即使用。" href="/tools" label="前往免費工具室" />
    </>
  );
}
