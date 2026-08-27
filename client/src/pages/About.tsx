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
            <p>「我每天還是在療癒自己害怕未來的心。」</p>
          </aside>
          <div>
            <SectionEyebrow>THE STORY BEHIND MEIXIN</SectionEyebrow>
            <h2 className="display-heading mt-4">
              我曾把業績做到第一，
              <br />
              後來卻連人群
              <br />
              <em>都想躲開。</em>
            </h2>
            <p className="mt-6">
              我是
              Vivi。很長一段時間，我都在做微商、帶團隊、帶代理，也習慣把業績做到前面。那時候，帶大家賺到錢，是我最開心的事。
            </p>
            <p>
              後來，一段事業與人際上的衝擊讓我出現恐慌症。我開始害怕人群，不想開群，也不想再扛著整個團隊的動力。那段日子很久沒有收入，我每天都要處理自己對未來的恐懼。
            </p>
            <p>
              療癒先幫我慢慢回到生活。當我想用這些工具幫助別人時，又遇到另一道關卡：有能力，不代表陌生人能立刻聽懂你會怎麼幫她。
            </p>
            <p>
              我重新學內容與自媒體，把曾經做商業、帶團隊的經驗，和後來療癒自己的路放在一起。美心學苑也因此開始同時談感受、表達與服務承接。
            </p>
            <blockquote>
              「療癒師也需要被看見。有人先聽懂你，專業才有機會走到需要它的人面前。」
            </blockquote>
            <Link
              href="/journal/from-top-sales-to-healing"
              className="vivi-text-link mt-6"
            >
              讀完整轉折故事 <ArrowRight className="size-4" />
            </Link>
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
