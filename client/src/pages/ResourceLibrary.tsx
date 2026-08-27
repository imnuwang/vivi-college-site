import { useMemo, useState } from "react";
import { useParams, Link } from "wouter";
import {
  ArrowRight,
  Check,
  Clipboard,
  Copy,
  Printer,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import { asset, freeResources } from "@/data/catalog";

const sevenDays = [
  [
    "Day 1｜看見重複",
    "今天反覆出現的是哪個人、情境或念頭？",
    "它通常在什麼時候變得特別大聲？",
  ],
  [
    "Day 2｜回到身體",
    "這個訊號出現時，你的身體先發生了什麼？",
    "你最想立刻逃開、抓住或解釋的是什麼？",
  ],
  [
    "Day 3｜找出需要",
    "這件事底下真正想被照顧的是什麼？",
    "安全、被理解、界線，還是休息？",
  ],
  [
    "Day 4｜分開事實與故事",
    "有哪些是已經發生的事實？",
    "有哪些是你腦中替它補上的故事？",
  ],
  [
    "Day 5｜選回自己",
    "如果先不處理別人的反應，你想守住什麼？",
    "什麼選擇會讓你今晚更安穩？",
  ],
  [
    "Day 6｜做一個小實驗",
    "你願意用什麼很小的行動驗證新的選擇？",
    "把它縮小到 10 分鐘內能完成。",
  ],
  [
    "Day 7｜寫下提醒",
    "這一週你最常看見的模式是什麼？",
    "請替下週的自己留下一句提醒。",
  ],
] as const;

const styleScenes = [
  {
    label: "需要被信任",
    color: "深墨綠／米白",
    shape: "有肩線、結構清楚的外層",
    anchor: "一只帶重量感的戒指或手錶",
    line: "我不必提高音量，也能清楚站在自己的位置。",
  },
  {
    label: "需要自在靠近",
    color: "暖珊瑚／柔粉",
    shape: "有流動感、能自在活動的輪廓",
    anchor: "一個讓你想微笑的耳環或髮飾",
    line: "我可以自然靠近，不必先演成誰。",
  },
  {
    label: "需要安靜回穩",
    color: "灰綠／霧藍",
    shape: "觸感舒服、無須反覆調整的衣物",
    anchor: "一層有包覆感的針織或外套",
    line: "我今天先照顧節奏，不急著證明什麼。",
  },
] as const;

async function copyText(value: string) {
  if (navigator.clipboard?.writeText)
    return navigator.clipboard.writeText(value);
  const area = document.createElement("textarea");
  area.value = value;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

function ActionBar({ text, onReset }: { text: string; onReset?: () => void }) {
  const [notice, setNotice] = useState("");
  const copy = async () => {
    try {
      await copyText(text);
      setNotice("已複製，可貼到你的筆記或 LINE。 ");
    } catch {
      setNotice("複製未成功，請手動選取文字。 ");
    }
  };
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="vivi-button vivi-button-dark"
        onClick={copy}
      >
        <Copy className="size-4" />
        複製我的結果
      </button>
      <button
        type="button"
        className="vivi-button vivi-button-ghost"
        onClick={() => window.print()}
      >
        <Printer className="size-4" />
        列印練習頁
      </button>
      {onReset && (
        <button type="button" className="vivi-text-link" onClick={onReset}>
          <RotateCcw className="size-4" />
          重新開始
        </button>
      )}
      {notice && (
        <span role="status" className="text-sm text-[#2e7152]">
          {notice}
        </span>
      )}
    </div>
  );
}

function ClarityPractice() {
  const [day, setDay] = useState(0);
  const [signal, setSignal] = useState("");
  const [need, setNeed] = useState("");
  const [action, setAction] = useState("");
  const prompt = sevenDays[day];
  const result = `${prompt[0]}\n我看見的訊號：${signal || "＿＿＿＿"}\n我想照顧的需要：${need || "＿＿＿＿"}\n我的 10 分鐘行動：${action || "＿＿＿＿"}`;
  return (
    <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
      <aside className="rounded-[1.5rem] bg-[#183b31] p-6 text-[#f8f2e8]">
        <p className="text-xs font-bold tracking-[.14em] text-[#e6c886]">
          7 DAYS · ONE PATTERN
        </p>
        <h2 className="mt-3 font-serif text-3xl">
          先不用急著解決。
          <br />
          先把它看清楚。
        </h2>
        <div className="mt-6 grid gap-2">
          {sevenDays.map(([label], index) => (
            <button
              type="button"
              key={label}
              onClick={() => setDay(index)}
              className={`rounded-xl px-4 py-3 text-left text-sm transition ${day === index ? "bg-[#f8f2e8] text-[#183b31]" : "bg-white/10 text-[#d4e1d5]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </aside>
      <div className="rounded-[1.5rem] border border-[#dbe3d9] bg-white p-6 md:p-8">
        <SectionEyebrow>{prompt[0]}</SectionEyebrow>
        <h2 className="display-heading mt-4">{prompt[1]}</h2>
        <p className="mt-3 text-[#5b6a60]">{prompt[2]}</p>
        <label className="mt-7 block text-sm font-bold">
          我看見的訊號
          <textarea
            value={signal}
            onChange={event => setSignal(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-xl border border-[#dbe3d9] bg-[#fbf8f0] p-3 font-normal text-[#183b31]"
            placeholder="例如：只要對方沒有回覆，我就一直想重看訊息。"
          />
        </label>
        <label className="mt-4 block text-sm font-bold">
          我真正想照顧的需要
          <textarea
            value={need}
            onChange={event => setNeed(event.target.value)}
            className="mt-2 min-h-20 w-full rounded-xl border border-[#dbe3d9] bg-[#fbf8f0] p-3 font-normal text-[#183b31]"
            placeholder="例如：我想被確定、被理解，也想先讓自己安靜。"
          />
        </label>
        <label className="mt-4 block text-sm font-bold">
          我今天願意做的 10 分鐘行動
          <textarea
            value={action}
            onChange={event => setAction(event.target.value)}
            className="mt-2 min-h-20 w-full rounded-xl border border-[#dbe3d9] bg-[#fbf8f0] p-3 font-normal text-[#183b31]"
            placeholder="例如：離開手機十分鐘，寫下我想問自己的問題。"
          />
        </label>
        <ActionBar
          text={result}
          onReset={() => {
            setSignal("");
            setNeed("");
            setAction("");
          }}
        />
      </div>
    </div>
  );
}

function StylePractice() {
  const [choice, setChoice] = useState(0);
  const scene = styleScenes[choice];
  const result = `今天我的穿搭意圖：${scene.label}\n色彩：${scene.color}\n輪廓：${scene.shape}\n衣物錨點：${scene.anchor}\n提醒：${scene.line}`;
  return (
    <div className="rounded-[1.6rem] border border-[#eadad2] bg-[#fff9f7] p-6 md:p-9">
      <SectionEyebrow className="text-[#9b3e4e]">
        CHOOSE A SIGNAL
      </SectionEyebrow>
      <h2 className="display-heading mt-4">今天想被怎麼看見？</h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#5b6a60]">
        選一個你今天最需要的狀態；不是扮演別人，而是讓衣服幫你記得想站在哪裡。
      </p>
      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {styleScenes.map((item, index) => (
          <button
            type="button"
            key={item.label}
            onClick={() => setChoice(index)}
            className={`rounded-2xl border p-5 text-left transition ${choice === index ? "border-[#9b3e4e] bg-[#9b3e4e] text-white" : "border-[#eadad2] bg-white text-[#183b31]"}`}
          >
            <b>{item.label}</b>
            <p className="mt-2 text-sm leading-6 opacity-80">{item.line}</p>
          </button>
        ))}
      </div>
      <div className="mt-7 grid gap-4 rounded-[1.3rem] border border-[#eadad2] bg-white p-6 md:grid-cols-3">
        <div>
          <span className="text-xs font-bold tracking-[.12em] text-[#9b3e4e]">
            COLOR
          </span>
          <p className="mt-2 font-serif text-xl">{scene.color}</p>
        </div>
        <div>
          <span className="text-xs font-bold tracking-[.12em] text-[#9b3e4e]">
            SILHOUETTE
          </span>
          <p className="mt-2 font-serif text-xl">{scene.shape}</p>
        </div>
        <div>
          <span className="text-xs font-bold tracking-[.12em] text-[#9b3e4e]">
            ANCHOR
          </span>
          <p className="mt-2 font-serif text-xl">{scene.anchor}</p>
        </div>
      </div>
      <blockquote className="mt-6 border-l-2 border-[#9b3e4e] pl-4 font-serif text-xl text-[#64303b]">
        「{scene.line}」
      </blockquote>
      <ActionBar text={result} />
    </div>
  );
}

function EveningPractice() {
  const steps = [
    "關掉一個不必要的亮光，讓眼睛知道今天要慢下來。",
    "把今天仍掛在心上的一件事寫下來，不在腦中繼續排演。",
    "替明天的自己留下一個最小、最可完成的開始。",
  ];
  const [done, setDone] = useState([false, false, false]);
  const [note, setNote] = useState("");
  const result = `今晚我完成了：${
    steps
      .filter((_, index) => done[index])
      .map(step => `\n- ${step}`)
      .join("") || "\n- 我先允許自己停下來"
  }\n\n留給明天的一句話：${note || "＿＿＿＿"}`;
  return (
    <div className="grid gap-6 rounded-[1.6rem] bg-[#183b31] p-6 text-[#f8f2e8] md:grid-cols-[.9fr_1.1fr] md:p-9">
      <div>
        <SectionEyebrow className="text-[#e6c886]">
          10 MINUTES · NIGHTLY RESET
        </SectionEyebrow>
        <h2 className="mt-4 font-serif text-4xl leading-tight">
          今晚不必想通。
          <br />
          只要好好收尾。
        </h2>
        <p className="mt-5 leading-8 text-[#d4e1d5]">
          沒有音檔，也不需要額外工具。用三個能完成的小步驟，讓身體收到今天可以慢慢結束的訊號。
        </p>
        <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5">
          <Sparkles className="size-5 text-[#e6c886]" />
          <p className="mt-3 text-sm leading-7 text-[#d4e1d5]">
            如果你正處於長期失眠、強烈焦慮或危機中，這份日常練習不能替代醫療或心理專業支持。
          </p>
        </div>
      </div>
      <div className="rounded-[1.3rem] bg-[#f8f5ec] p-6 text-[#183b31]">
        <p className="text-xs font-bold tracking-[.13em] text-[#8d7443]">
          TONIGHT'S THREE STEPS
        </p>
        <div className="mt-4 grid gap-3">
          {steps.map((step, index) => (
            <label
              key={step}
              className="flex cursor-pointer gap-3 rounded-xl border border-[#dbe3d9] bg-white p-4"
            >
              <input
                type="checkbox"
                checked={done[index]}
                onChange={() =>
                  setDone(items =>
                    items.map((item, itemIndex) =>
                      itemIndex === index ? !item : item
                    )
                  )
                }
                className="mt-1 size-4 accent-[#2f6b52]"
              />
              <span>
                <b>0{index + 1}</b>
                <span className="ml-2 text-sm leading-6 text-[#536158]">
                  {step}
                </span>
              </span>
            </label>
          ))}
        </div>
        <label className="mt-5 block text-sm font-bold">
          留給明天的一句交代
          <textarea
            value={note}
            onChange={event => setNote(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-xl border border-[#dbe3d9] bg-white p-3 font-normal"
            placeholder="例如：明天早上先喝水，再回覆那一封信。"
          />
        </label>
        <ActionBar
          text={result}
          onReset={() => {
            setDone([false, false, false]);
            setNote("");
          }}
        />
      </div>
    </div>
  );
}

function BrandPractice() {
  const [skill, setSkill] = useState("");
  const [audience, setAudience] = useState("");
  const [scene, setScene] = useState("");
  const output = useMemo(() => {
    const x = skill || "你正在整理的專業";
    const y = audience || "正在經營內容的療癒型創作者";
    const z = scene || "說不清楚自己能幫什麼、也不知道怎麼開始發文";
    return {
      positioning: `我協助${y}，在${z}時，透過${x}，整理出一個能在日常採取的下一步。`,
      prompts: [
        `一篇讓${y}說「這就是我」的場景文：從「${z}」開始。`,
        `一篇方法文：我怎麼用「${x}」把抽象卡點拆成一小步。`,
        `一篇邀請文：如果你也正在「${z}」，先從這個免費練習開始。`,
      ],
    };
  }, [skill, audience, scene]);
  const result = `我的定位句：${output.positioning}\n\n三個內容入口：\n${output.prompts.map((item, index) => `${index + 1}. ${item}`).join("\n")}`;
  return (
    <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <div className="rounded-[1.5rem] bg-[#edf0e8] p-6">
        <SectionEyebrow>THREE FIELDS · ONE CLEARER PATH</SectionEyebrow>
        <h2 className="display-heading mt-4">
          先不寫完美定位。
          <br />
          先說清楚你正在幫誰。
        </h2>
        <p className="mt-4 leading-7 text-[#536158]">
          填入你已經知道的部分。空白處會以溫和的預設語句補上，你可以再慢慢修改。
        </p>
        <label className="mt-6 block text-sm font-bold">
          你的專業或工作方式
          <input
            value={skill}
            onChange={event => setSkill(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#dbe3d9] bg-white p-3 font-normal"
            placeholder="例如：牌卡對話、身體覺察、內容陪跑"
          />
        </label>
        <label className="mt-4 block text-sm font-bold">
          你想陪伴誰
          <input
            value={audience}
            onChange={event => setAudience(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#dbe3d9] bg-white p-3 font-normal"
            placeholder="例如：剛開始接案的療癒師"
          />
        </label>
        <label className="mt-4 block text-sm font-bold">
          她正在經歷的場景
          <textarea
            value={scene}
            onChange={event => setScene(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-xl border border-[#dbe3d9] bg-white p-3 font-normal"
            placeholder="例如：發文很多，但讀者不知道我能幫什麼。"
          />
        </label>
      </div>
      <div className="rounded-[1.5rem] border border-[#dbe3d9] bg-white p-6 md:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#e3efe5] px-3 py-1 text-xs font-bold text-[#2f6b52]">
          <Clipboard className="size-3.5" />
          你的內容承接草圖
        </span>
        <h2 className="mt-5 font-serif text-3xl leading-tight">
          {output.positioning}
        </h2>
        <div className="mt-7 border-t border-[#e4e9e2] pt-6">
          <p className="text-xs font-bold tracking-[.13em] text-[#8d7443]">
            NEXT THREE POSTS
          </p>
          <ol className="mt-4 grid gap-3">
            {output.prompts.map((prompt, index) => (
              <li
                key={prompt}
                className="flex gap-3 rounded-xl bg-[#f8f5ec] p-4"
              >
                <span className="font-serif text-xl text-[#745823]">
                  0{index + 1}
                </span>
                <p className="text-sm leading-6 text-[#536158]">{prompt}</p>
              </li>
            ))}
          </ol>
        </div>
        <ActionBar
          text={result}
          onReset={() => {
            setSkill("");
            setAudience("");
            setScene("");
          }}
        />
      </div>
    </div>
  );
}

export default function ResourceLibrary() {
  const { resourceId } = useParams<{ resourceId: string }>();
  const resource = freeResources.find(item => item.id === resourceId);
  if (!resource || resource.kind === "energy-cards")
    return (
      <section className="section-space">
        <div className="site-shell max-w-2xl text-center">
          <h1 className="display-heading">找不到這份練習。</h1>
          <p className="mt-4 text-[#536158]">
            回到免費資源庫，從另一個現在更需要的入口開始。
          </p>
          <Link href="/shop" className="vivi-button vivi-button-dark mt-7">
            回到免費資源庫 <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    );
  const practice =
    resource.kind === "clarity" ? (
      <ClarityPractice />
    ) : resource.kind === "style" ? (
      <StylePractice />
    ) : resource.kind === "evening" ? (
      <EveningPractice />
    ) : (
      <BrandPractice />
    );
  return (
    <>
      <Seo
        title={`${resource.name}｜免費練習`}
        description={resource.description}
        path={`/resources/${resource.id}`}
        image={resource.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: resource.name,
          description: resource.description,
          isAccessibleForFree: true,
          inLanguage: "zh-TW",
        }}
      />
      <section className="inner-page-hero practice-garden-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
        />
        <div className="site-shell inner-page-hero-grid practice-hero-grid">
          <div className="inner-page-hero-copy">
            <Link href="/shop" className="practice-back-link">
              ← 回到免費資源庫
            </Link>
            <SectionEyebrow>FREE PRACTICE · NO SIGN-UP REQUIRED</SectionEyebrow>
            <h1>{resource.name}</h1>
            <p>{resource.description}</p>
            <div className="inner-page-hero-actions">
              <a
                href="#start-practice"
                className="vivi-button vivi-button-light"
              >
                開始這份練習 <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>
                {resource.detail} 完成後可以複製、列印，或留一句話給明天。
              </span>
            </div>
          </div>
          <figure className="resource-hero-visual practice-hero-visual">
            <img src={resource.image ?? asset.hero} alt={resource.name} />
            <figcaption>
              <span>YOUR PRIVATE PRACTICE</span>不用登入，也不用先留下
              Email。照自己的速度完成就好。
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        id="start-practice"
        className="section-space practice-workspace-section"
      >
        <div className="site-shell">
          <div className="practice-workspace-heading">
            <SectionEyebrow>START HERE</SectionEyebrow>
            <p>
              找一段不被打斷的時間，答案不用完整。先留下今天最真實的一句話。
            </p>
          </div>
          <div className="mt-9">{practice}</div>
        </div>
      </section>
    </>
  );
}
