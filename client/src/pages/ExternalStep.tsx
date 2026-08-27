import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Link, useParams } from "wouter";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";
import { leadCapture, socialLinks } from "@/data/catalog";
import { buildLineMessageUrl } from "@/lib/lineOrder";
import { trackConversion } from "@/lib/analytics";

type DestinationId = "line" | "application" | "portaly";

const destinations = {
  line: {
    name: "Vivi LINE 官方帳號",
    title: "準備到 LINE 說說你的現況",
    description:
      "LINE 適合先問服務方式、費用與時間。請只提供這次諮詢需要的資訊，不要傳送身分證、金融或病歷資料。",
    action: "開啟 LINE",
    backHref: "/services",
    eventName: "line_click" as const,
  },
  application: {
    name: "Google 適配諮詢表",
    title: "準備填寫 1 對 1 適配諮詢",
    description:
      "表單會詢問你的現況、內容與服務卡點。送出只代表提出申請，Vivi 回覆並完成書面確認後，才會成立服務約定。",
    action: "開啟申請表",
    backHref: "/services#private-coaching",
    eventName: "application_open" as const,
  },
  portaly: {
    name: "Portaly 月光來信",
    title: "準備到 Portaly 留下 Email",
    description:
      "Portaly 會依它的表單與隱私設定處理你填寫的 Email。你可以不訂閱，直接使用本站的免費工具。",
    action: "前往 Portaly",
    backHref: "/tools",
    eventName: "portaly_open" as const,
  },
} satisfies Record<
  DestinationId,
  {
    name: string;
    title: string;
    description: string;
    action: string;
    backHref: string;
    eventName: "line_click" | "application_open" | "portaly_open";
  }
>;

const completionDetails = {
  line: {
    message:
      "如果你已在 LINE 留下訊息，接下來請留意官方帳號的回覆。服務內容、費用與時間仍以雙方的書面確認為準。",
    nextHref: "/tools",
    nextLabel: "等待期間，使用免費工具",
  },
  application: {
    message:
      "如果你已送出適配表，Vivi 會依表單留下的聯絡方式回覆。送出申請不代表服務已成立，付款前仍會先確認完整條件。",
    nextHref: "/journal",
    nextLabel: "等待期間，回閱讀室",
  },
  portaly: {
    message:
      "如果你已留下 Email，請留意收件匣與垃圾郵件匣。你也可以不等待來信，直接使用站內的免費練習。",
    nextHref: "/shop",
    nextLabel: "打開免費資源庫",
  },
} satisfies Record<
  DestinationId,
  { message: string; nextHref: string; nextLabel: string }
>;

function getDestinationUrl(destinationId: DestinationId) {
  if (destinationId === "application") return socialLinks.application;
  if (destinationId === "portaly") return leadCapture.url;

  const message = new URLSearchParams(window.location.search).get("message");
  return message ? buildLineMessageUrl(message) : socialLinks.line;
}

function ExternalCompletion() {
  const source = new URLSearchParams(window.location.search).get(
    "from"
  ) as DestinationId | null;
  const details = source ? completionDetails[source] : undefined;

  return (
    <>
      <Seo
        title="完成外部步驟"
        description="從 LINE、Google 表單或 Portaly 回到美心學苑後，確認接下來的安排。"
        path="/continue/complete"
        robots="noindex,follow"
      />
      <section className="external-step-page">
        <div className="site-shell external-step-grid">
          <div>
            <SectionEyebrow>BACK TO VIVI COLLEGE</SectionEyebrow>
            <h1>外部步驟先告一段落。</h1>
            <p>
              {details?.message ??
                "你已經回到美心學苑。若剛才完成了外部步驟，請依對應平台的畫面確認是否成功。"}
            </p>
          </div>
          <div className="external-step-card external-completion-card">
            <p className="external-step-label">接下來</p>
            <h2>不用重複送出資料</h2>
            <p>
              本站不會自動讀取 LINE、Google 表單或 Portaly
              的提交結果。若剛才沒有看到成功提示，請回上一頁確認，不要連續送出多份相同資料。
            </p>
            <Link
              href={details?.nextHref ?? "/"}
              className="vivi-button vivi-button-dark w-full"
            >
              {details?.nextLabel ?? "回到首頁"}
            </Link>
            <Link href="/services" className="external-step-back">
              <ArrowLeft className="size-4" /> 回服務說明
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ExternalStep() {
  const { destination } = useParams<{ destination: string }>();
  const routeId = destination as DestinationId | "complete";

  if (routeId === "complete") return <ExternalCompletion />;

  const destinationId = routeId as DestinationId;
  const details = destinations[destinationId];

  if (!details) {
    return (
      <section className="section-space">
        <div className="site-shell max-w-2xl text-center">
          <h1 className="display-heading">找不到這個外部入口</h1>
          <Link href="/" className="vivi-button vivi-button-dark mt-7">
            回到首頁
          </Link>
        </div>
      </section>
    );
  }

  const destinationUrl = getDestinationUrl(destinationId);

  return (
    <>
      <Seo
        title={details.title}
        description={details.description}
        path={`/continue/${destinationId}`}
        robots="noindex,follow"
      />
      <section className="external-step-page">
        <div className="site-shell external-step-grid">
          <div>
            <SectionEyebrow>BEFORE YOU CONTINUE</SectionEyebrow>
            <h1>{details.title}</h1>
            <p>{details.description}</p>
          </div>
          <div className="external-step-card">
            <p className="external-step-label">下一站</p>
            <h2>{details.name}</h2>
            <ol>
              <li>
                <Check aria-hidden="true" />
                <span>先確認服務方式、費用與資料用途。</span>
              </li>
              <li>
                <Check aria-hidden="true" />
                <span>只填寫完成這次申請需要的資料。</span>
              </li>
              <li>
                <Check aria-hidden="true" />
                <span>完成後可回到本站繼續閱讀或使用工具。</span>
              </li>
            </ol>
            <a
              href={destinationUrl}
              target="_blank"
              rel="noreferrer"
              className="vivi-button vivi-button-dark w-full"
              onClick={() => {
                trackConversion(details.eventName, {
                  destination: destinationId,
                  source: "transition_page",
                });
                trackConversion("outbound_continue", {
                  destination: destinationId,
                });
              }}
            >
              {details.action} <ExternalLink className="size-4" />
            </a>
            <Link
              href={`/continue/complete?from=${destinationId}`}
              className="external-step-complete"
              onClick={() =>
                trackConversion("external_return", {
                  destination: destinationId,
                })
              }
            >
              我已完成外部步驟
            </Link>
            <Link href={details.backHref} className="external-step-back">
              <ArrowLeft className="size-4" /> 返回上一頁
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
