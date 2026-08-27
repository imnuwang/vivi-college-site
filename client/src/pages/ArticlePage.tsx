/**
 * Style guide: 內在花園文章頁。
 * 以沉浸式封面進場，閱讀區回到安靜紙頁，保留清楚的練習與下一步。
 */
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { articles } from "@/data/catalog";
import NotFound from "@/pages/NotFound";

export default function ArticlePage() {
  const [, params] = useRoute("/journal/:slug");
  const article = articles.find(item => item.slug === params?.slug);
  if (!article) return <NotFound />;

  const next =
    articles.find(
      item => item.slug !== article.slug && item.pillar !== article.pillar
    ) ?? articles[0];

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/journal/${article.slug}`}
        image={article.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          image: article.image,
          inLanguage: "zh-TW",
          author: { "@type": "Person", name: "Vivi" },
          publisher: {
            "@type": "Organization",
            name: "VIVI COLLEGE 美心學苑",
          },
        }}
      />

      <article>
        <header className="article-garden-hero">
          <img
            src={article.image}
            alt=""
            className="article-garden-hero-bg"
            aria-hidden="true"
          />
          <div className="site-shell article-garden-hero-content">
            <Link href="/journal" className="back-link back-link-on-dark">
              <ArrowLeft className="size-4" /> 回到閱讀室
            </Link>
            <div className="article-garden-heading">
              <SectionEyebrow>{article.pillar.toUpperCase()}</SectionEyebrow>
              <h1>{article.title}</h1>
              <p>{article.excerpt}</p>
              <div className="article-meta article-meta-on-dark">
                <span>{article.date}</span>
                <span>
                  <Clock3 className="size-4" />
                  {article.readingTime}
                </span>
              </div>
            </div>
            <div className="article-hero-signature">
              <MoonMark size="sm" />
              <span>Vivi 的內在花園手記</span>
            </div>
          </div>
        </header>

        <div className="site-shell article-layout article-layout-garden">
          <div className="article-body article-body-garden">
            {article.body.map((paragraph, index) => (
              <p
                className={index === 0 ? "article-opening" : undefined}
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
            <div className="article-takeaway article-takeaway-garden">
              <SectionEyebrow>TAKE THIS WITH YOU</SectionEyebrow>
              <h2>讀完後，先做這三件小事。</h2>
              <ol>
                {article.takeaways.map(takeaway => (
                  <li key={takeaway}>
                    <Check className="size-4" />
                    {takeaway}
                  </li>
                ))}
              </ol>
            </div>
            <p>今天只要選一個願意嘗試的方向，把它放進生活裡，就已經足夠。</p>
          </div>
          <aside className="article-aside article-aside-garden">
            <div>
              <p>FREE TOOL</p>
              <h3>想把這篇閱讀，變成自己的練習？</h3>
              <span>工具室收錄可直接使用的整理表與日常練習卡。</span>
              <Link href="/tools" className="vivi-text-link mt-4">
                打開免費工具室 <ArrowRight className="size-4" />
              </Link>
            </div>
            <small>閱讀不必很快。看到想停下來的地方，就先停一下。</small>
          </aside>
        </div>
      </article>

      <section className="next-article next-article-garden">
        <div className="site-shell">
          <SectionEyebrow>TURN THE PAGE</SectionEyebrow>
          <Link href={`/journal/${next.slug}`}>
            <img src={next.image} alt="" />
            <div>
              <span>{next.pillar}</span>
              <h2>下一篇：{next.title}</h2>
              <p>{next.excerpt}</p>
              <i>
                繼續閱讀 <ArrowRight className="size-4" />
              </i>
            </div>
          </Link>
        </div>
      </section>

      <CtaBand
        title="如果這個卡點已經反覆很久，也可以找一個人一起整理。"
        description="從一對一塔羅、能量整理到品牌陪跑，先看看哪一種支持最接近你現在的位置。"
        href="/services"
        label="探索服務方式"
      />
    </>
  );
}
