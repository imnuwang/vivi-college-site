import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { CtaBand } from "@/components/PagePrimitives";
import { PortalyLeadLink } from "@/components/PortalyLeadLink";
import { Seo } from "@/components/Seo";
import { MoonMark, SectionEyebrow } from "@/components/SiteFrame";
import {
  diagnosticQuestions,
  formatDiagnosticShareText,
  getDominantDiagnostic,
  type DiagnosticKey,
} from "@/data/creatorDiagnostic";
import { asset } from "@/data/catalog";
import { buildLineTransitionUrl } from "@/lib/lineOrder";
import { trackConversion } from "@/lib/analytics";

type CopyState = "idle" | "copied" | "error";

export default function CreatorDiagnostic() {
  const [answers, setAnswers] = useState<Record<string, DiagnosticKey>>({});
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const answered = Object.values(answers);
  const complete = answered.length === diagnosticQuestions.length;
  const result = useMemo(
    () => (complete ? getDominantDiagnostic(answered) : null),
    [answered, complete]
  );
  const progress = (answered.length / diagnosticQuestions.length) * 100;

  const choose = (questionId: string, key: DiagnosticKey) => {
    setAnswers(current => ({ ...current, [questionId]: key }));
    setCopyState("idle");
  };

  const restart = () => {
    setAnswers({});
    setCopyState("idle");
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      const text = formatDiagnosticShareText(result);
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (!copied) throw new Error("Clipboard unavailable");
      }
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <>
      <Seo
        title="療癒型創作者內容承接診斷"
        description="用 5 分鐘找出療癒型創作者目前最需要處理的定位、內容承接或服務邀請卡點，帶走一個可以立刻開始的下一步。"
        path="/creator-diagnostic"
        image={asset.hero}
        schema={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: "療癒型創作者內容承接診斷",
          inLanguage: "zh-TW",
          about: "療癒型創作者的定位、內容與服務承接",
        }}
      />
      <section className="inner-page-hero diagnostic-garden-hero">
        <img
          src={asset.innerGardenHero}
          alt=""
          className="inner-page-hero-bg"
          aria-hidden="true"
        />
        <div className="site-shell inner-page-hero-grid diagnostic-hero-grid">
          <div className="inner-page-hero-copy">
            <SectionEyebrow>
              THE FLAGSHIP TOOL · 5-MINUTE CHECK-IN
            </SectionEyebrow>
            <h1>
              你的專業很好，
              <br />
              <em>
                是哪一段
                <br />
                沒有被接住？
              </em>
            </h1>
            <p>
              四個問題會幫你看清，目前最需要整理的是定位、內容承接，還是服務邀請。結果不替你下結論，只提供一個今天能開始的方向。
            </p>
            <div className="inner-page-hero-actions">
              <a
                href="#diagnostic-workspace"
                className="vivi-button vivi-button-light"
              >
                開始回答四個問題 <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="inner-page-hero-note">
              <MoonMark size="sm" />
              <span>
                約 5 分鐘完成，可複製結果，也能帶到 LINE 和 Vivi 討論。
              </span>
            </div>
          </div>
          <figure className="resource-hero-visual diagnostic-hero-visual">
            <img src={asset.hero} alt="月光書房中的安靜整理空間" />
            <figcaption>
              <span>FOUR QUESTIONS</span>
              定位、內容、邀請。先找到現在最需要處理的一段。
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        id="diagnostic-workspace"
        className="section-space diagnostic-workspace-section"
      >
        <div className="site-shell diagnostic-workspace-grid">
          <aside className="diagnostic-guide lg:sticky lg:top-24 lg:self-start">
            <SectionEyebrow className="text-[#e6c886]">
              HOW IT WORKS
            </SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight">
              先找出現在最需要處理的那一段。
            </h2>
            <ol className="mt-7 space-y-5 text-sm leading-7 text-[#d4e1d5]">
              <li className="flex gap-3">
                <b className="font-serif text-xl text-[#e6c886]">01</b>
                <span>依照你現在最接近的狀態回答，不用選理想答案。</span>
              </li>
              <li className="flex gap-3">
                <b className="font-serif text-xl text-[#e6c886]">02</b>
                <span>完成四題後，取得你的主要卡點與一個小行動。</span>
              </li>
              <li className="flex gap-3">
                <b className="font-serif text-xl text-[#e6c886]">03</b>
                <span>再選擇要用免費工具繼續整理，或到 LINE 釐清下一步。</span>
              </li>
            </ol>
            <div className="mt-9 border-t border-white/15 pt-5 text-sm text-[#d4e1d5]">
              <ClipboardCheck className="mb-3 size-5 text-[#e6c886]" />
              已完成{" "}
              <strong className="text-[#f8f2e8]">
                {answered.length} / {diagnosticQuestions.length}
              </strong>{" "}
              題
              <div className="diagnostic-progress" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          </aside>
          <div className="diagnostic-question-sheet">
            {!result ? (
              <div className="space-y-8" aria-live="polite">
                {diagnosticQuestions.map((question, index) => (
                  <fieldset
                    key={question.id}
                    className={`diagnostic-question border-b border-[#e4e9e1] pb-8 last:border-0 last:pb-0 ${answers[question.id] ? "is-answered" : ""}`}
                    style={
                      { "--diagnostic-order": index } as React.CSSProperties
                    }
                  >
                    <legend className="font-serif text-2xl leading-snug text-[#183b31]">
                      <span className="mr-3 font-sans text-xs font-bold tracking-[.14em] text-[#745823]">
                        0{index + 1}
                      </span>
                      {question.prompt}
                    </legend>
                    <div className="mt-5 grid gap-3">
                      {question.options.map(option => {
                        const selected = answers[question.id] === option.key;
                        return (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() => choose(question.id, option.key)}
                            aria-pressed={selected}
                            className={`diagnostic-option rounded-2xl border px-5 py-4 text-left text-sm leading-6 ${selected ? "is-selected border-[#183b31] bg-[#edf0e8] text-[#183b31]" : "border-[#dbe3d9] bg-[#fbf8f0] text-[#526156] hover:border-[#8aa093] hover:bg-[#f1f3ed]"}`}
                          >
                            <span className="flex gap-3">
                              <i
                                className={`mt-1 size-3 shrink-0 rounded-full border ${selected ? "border-[#183b31] bg-[#183b31] ring-2 ring-[#cad9cf]" : "border-[#aebcaf]"}`}
                              />
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            ) : (
              <div className="diagnostic-result" aria-live="polite">
                <SectionEyebrow>YOUR CURRENT SIGNAL</SectionEyebrow>
                <p className="mt-5 text-sm font-bold tracking-[.12em] text-[#745823]">
                  {result.label}
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-[#183b31]">
                  {result.title}
                </h2>
                <p className="mt-5 max-w-2xl leading-8 text-[#526156]">
                  {result.summary}
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl bg-[#edf0e8] p-5">
                    <Sparkles className="size-5 text-[#745823]" />
                    <h3 className="mt-3 font-serif text-xl text-[#183b31]">
                      你現在最該看見的訊號
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#526156]">
                      {result.signal}
                    </p>
                  </article>
                  <article className="rounded-2xl bg-[#f8f2e8] p-5">
                    <CheckCircle2 className="size-5 text-[#547561]" />
                    <h3 className="mt-3 font-serif text-xl text-[#183b31]">
                      今天可做的一步
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#526156]">
                      {result.action}
                    </p>
                  </article>
                </div>
                <div className="mt-7 rounded-2xl border border-[#dbe3d9] p-5">
                  <p className="text-sm leading-7 text-[#526156]">
                    {result.resource}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/tools"
                      className="vivi-button vivi-button-dark"
                    >
                      前往對應工具 <ArrowRight className="size-4" />
                    </Link>
                    <a
                      href={buildLineTransitionUrl(
                        `我剛完成內容承接診斷，結果是「${result.label}」。我想知道適合我的下一步。`
                      )}
                      className="vivi-button vivi-button-line"
                      onClick={() =>
                        trackConversion("line_click", {
                          source: "creator_diagnostic_result",
                          result: result.key,
                        })
                      }
                    >
                      到 LINE 釐清下一步 <MessageCircle className="size-4" />
                    </a>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-[#f8f5ec] p-5">
                  <p className="text-sm leading-7 text-[#526156]">
                    想把這份結果交給 Vivi 看？先複製，再貼到 LINE 對話裡即可。
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={copyResult}
                      className="vivi-button vivi-button-outline"
                    >
                      <Clipboard className="size-4" />
                      {copyState === "copied" ? "已複製結果" : "一鍵複製結果"}
                    </button>
                    <span className="text-xs text-[#64736a]" role="status">
                      {copyState === "copied"
                        ? "現在可以回到 LINE 貼上內容。"
                        : copyState === "error"
                          ? "目前無法自動複製，請改為手動選取結果文字。"
                          : "複製後可直接貼到 LINE 給 Vivi。"}
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <PortalyLeadLink
                    label="在 Portaly 收下免費工具"
                    className="vivi-text-link"
                  />
                  <button
                    type="button"
                    onClick={restart}
                    className="vivi-text-link"
                  >
                    <RotateCcw className="size-4" />
                    重新診斷
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow="WHEN YOU WANT DEEPER SUPPORT"
        title="診斷只是起點。"
        description="如果你想把定位、內容與服務承接整理成真正能被使用的系統，可以先了解 1 對 1 私教的適配方式。"
        href="/services#private-coaching"
        label="了解 1 對 1 私教"
      />
    </>
  );
}
