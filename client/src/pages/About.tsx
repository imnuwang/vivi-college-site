/**
 * Style guide — 月光書房：關於頁保留人物的成熟感與真實故事；
 * 不英雄化創辦人，而是以可理解的經驗與專業邊界建立長期信任。
 */
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { asset } from "@/data/catalog";

export default function About() {
  return (
    <>
      <Seo
        title="關於 Vivi：把商業、療癒與真實生活放在一起"
        description="認識美心學苑創辦人 Vivi：從商業策略、療癒陪伴到內容承接，協助女性把內在感受整理成可被理解與行動的路徑。"
        path="/about"
        image={asset.viviPortrait}
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Vivi",
          jobTitle: "美心學苑創辦人",
          image: asset.viviPortrait,
          worksFor: { "@type": "Organization", name: "VIVI COLLEGE 美心學苑" },
          knowsAbout: ["內容策略", "療癒型個人品牌", "塔羅占卜", "能量整理"],
        }}
      />
      <section className="inner-page-hero about-garden-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
        />
        <div className="site-shell inner-page-hero-grid about-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>ABOUT VIVI · FOUNDER & GUIDE</SectionEyebrow>
            <h1>
              你不必變成另一個人。
              <br />
              <em>
                先把現在的自己，
                <br />
                說清楚。
              </em>
            </h1>
            <p>
              美心學苑把療癒、生活、內容與商業放在同一張地圖上。讓感受有位置，也讓真正想做的事有一條走得下去的路。
            </p>
            <div className="inner-page-hero-actions">
              <a href="#vivi-story" className="vivi-button vivi-button-light">
                認識 Vivi 與美心學苑 <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>溫柔不必換來含糊；清楚也不需要犧牲自己。</span>
            </div>
          </div>
          <figure className="resource-hero-visual about-hero-portrait">
            <img src={asset.viviPortrait} alt="美心學苑創辦人 Vivi" />
            <figcaption>
              <span>VIVI · FOUNDER</span>懂成交，也懂那些說不出口的撤退。
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="vivi-story" className="section-space about-story-section">
        <div className="site-shell about-story-editorial">
          <aside>
            <span>01</span>
            <MoonMark size="md" />
            <p>美心學苑的起點，是把商業的清楚與療癒的細膩放回同一條路上。</p>
          </aside>
          <div>
            <SectionEyebrow>THE STORY BEHIND MEIXIN</SectionEyebrow>
            <h2 className="display-heading mt-4">
              我曾經很懂成交，
              <br />
              後來才學會：
              <br />
              被看見之前，<em>人要先有安全感。</em>
            </h2>
            <p className="mt-6">
              我是
              Vivi。過去我帶過團隊，也理解一個服務要被說清楚，才會有人願意付費。但走進療癒領域之後，我也遇過那種矛盾：明明知道自己能幫助人，卻一談到錢與曝光，就開始懷疑自己是不是不夠純粹。
            </p>
            <p>
              後來我才發現，再好的療癒、再深的專業，如果無法被理解、被看見，也走不到真正需要它的人面前。於是，美心學苑開始把商業策略、內容表達與內在穩定放在一起談。
            </p>
            <blockquote>
              「你不需要犧牲自己的溫柔，才能擁有清楚的服務與合理的收入。」
            </blockquote>
          </div>
        </div>
      </section>
      <section className="section-space bg-[#edf0e8]">
        <div className="site-shell">
          <SectionEyebrow>WHAT MEIXIN HOLDS TOGETHER</SectionEyebrow>
          <h2 className="display-heading mt-4 max-w-3xl">
            這座美心學苑，想替你同時照顧三件容易被拆開的事。
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [
                "01",
                "感受",
                "讓你不必把直覺與脆弱藏起來；它們可以成為理解自己與他人的起點。",
                Sparkles,
              ],
              [
                "02",
                "表達",
                "把抽象感受翻成讀者、客戶與身邊的人聽得懂的語言。",
                Compass,
              ],
              [
                "03",
                "行動",
                "讓每一次覺察都能落回生活、內容、服務與真正可完成的下一步。",
                ArrowRight,
              ],
            ].map(([number, title, text, Icon]) => {
              const Symbol = Icon as typeof Sparkles;
              return (
                <article className="about-value-card" key={title as string}>
                  <span>{number as string}</span>
                  <Symbol className="size-6" />
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-shell about-cred-grid">
          <div>
            <SectionEyebrow>HOW I WORK</SectionEyebrow>
            <h2 className="display-heading mt-4">
              不用急著相信我。
              <br />
              先看我們怎麼一起工作。
            </h2>
          </div>
          <div>
            <p>
              在一對一支持裡，我會先確認你的問題究竟是內容、定位、服務設計，還是長期耗能與撤退感。因為不同卡點，需要的不是同一套答案。
            </p>
            <ul>
              <li>先看清楚你真正想服務的人與正在重複的困難。</li>
              <li>把專業與感受翻成可公開表達、也能被理解的語言。</li>
              <li>設定一條你做得到的下一步，而不是給你更大的待辦清單。</li>
            </ul>
            <Link
              href="/services"
              className="vivi-button vivi-button-dark mt-7"
            >
              看服務如何進行 <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand
        title="如果你還不知道從哪裡開始，從一篇內容開始就好。"
        description="閱讀室裡有免費文章；工具室裡有可以下載的練習。慢慢找到適合你的節奏，再決定下一步。"
        href="/journal"
        label="進入閱讀室"
      />
    </>
  );
}
