/**
 * Style guide — 月光書房：文章頁以安靜、長行距、低干擾版面呈現；
 * 每段內容都配有可行動的收束，並清楚連到免費工具與深度支持。
 */
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { articles, asset } from "@/data/catalog";
import NotFound from "@/pages/NotFound";

export default function ArticlePage() {
  const [, params] = useRoute("/journal/:slug");
  const article = articles.find((item) => item.slug === params?.slug);
  if (!article) return <NotFound />;
  const next = articles.find((item) => item.slug !== article.slug && item.pillar !== article.pillar) ?? articles[0];
  return (
    <>
      <Seo title={article.title} description={article.excerpt} path={`/journal/${article.slug}`} image={article.image} schema={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.excerpt, datePublished: article.date, image: article.image, inLanguage: "zh-TW", author: { "@type": "Person", name: "Vivi" }, publisher: { "@type": "Organization", name: "VIVI COLLEGE 美心學苑" } }} />
      <article>
        <header className="article-hero"><div className="site-shell"><Link href="/journal" className="back-link"><ArrowLeft className="size-4" /> 回到閱讀室</Link><div className="article-hero-grid"><div><SectionEyebrow>{article.pillar.toUpperCase()}</SectionEyebrow><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-meta"><span>{article.date}</span><span><Clock3 className="size-4" />{article.readingTime}</span></div></div><img src={article.image} alt="" /></div></div></header>
        <div className="site-shell article-layout"><div className="article-body">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="article-takeaway"><SectionEyebrow>TAKE THIS WITH YOU</SectionEyebrow><h2>讀完後，先做這三件小事。</h2><ol>{article.takeaways.map((takeaway) => <li key={takeaway}><Check className="size-4" />{takeaway}</li>)}</ol></div><p>你不需要一次把所有問題都解開。今天只要選擇一個你願意嘗試的方向，並把它放進生活裡，這篇內容就已經有了意義。</p></div><aside className="article-aside"><div><p>FREE TOOL</p><h3>想把這篇閱讀，變成一個自己的練習？</h3><span>工具室收錄可下載的整理表與日常練習卡。</span><Link href="/tools" className="vivi-text-link mt-4">打開免費工具室 <ArrowRight className="size-4" /></Link></div></aside></div>
      </article>
      <section className="next-article"><div className="site-shell"><SectionEyebrow>TURN THE PAGE</SectionEyebrow><Link href={`/journal/${next.slug}`}><img src={next.image} alt="" /><div><span>{next.pillar}</span><h2>下一篇：{next.title}</h2><p>{next.excerpt}</p><i>繼續閱讀 <ArrowRight className="size-4" /></i></div></Link></div></section>
      <CtaBand title="如果這個卡點已經反覆很久，也可以不再一個人猜。" description="從一對一塔羅、能量整理到更深的品牌陪跑，先看看哪一種支持最適合你現在的位置。" href="/services" label="探索服務方式" />
    </>
  );
}
