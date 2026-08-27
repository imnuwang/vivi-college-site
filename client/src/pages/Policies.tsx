import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { SectionEyebrow } from "@/components/SiteFrame";

const updatedAt = "2026 年 8 月 27 日";

export default function Policies() {
  return (
    <>
      <Seo
        title="隱私、服務與取消退款說明"
        description="了解美心學苑網站如何使用資料、外部服務，以及預約、取消、改期與退款的處理方式。"
        path="/policies"
      />
      <section className="policy-hero">
        <div className="site-shell">
          <SectionEyebrow>PRIVACY &amp; SERVICE POLICIES</SectionEyebrow>
          <h1>隱私與服務條款</h1>
          <p>
            這一頁說明你使用美心學苑網站、免費工具與服務申請入口時，資料如何被處理，以及預約前需要知道的事項。
          </p>
          <small>最後更新：{updatedAt}</small>
        </div>
      </section>

      <article className="site-shell policy-content">
        <section aria-labelledby="privacy-heading">
          <h2 id="privacy-heading">隱私與資料使用</h2>
          <p>
            你可以直接閱讀文章、使用抽牌、診斷與急救卡，不需要在本站建立帳號。急救卡的收藏與簽到日期，以及網站顯示偏好，會保存在你目前使用的瀏覽器中；這些資料不會由本站主動傳送給美心學苑。你可以透過瀏覽器設定清除。
          </p>
          <p>
            當你點選月光來信、LINE、Instagram 或服務申請表，會離開本站並進入
            Portaly、LINE、Meta 或 Google
            的服務。你在那些頁面填寫的姓名、Email、社群帳號、聯絡方式與申請內容，由對應平台依其政策處理，美心學苑只會在回覆訂閱、諮詢或服務申請所需的範圍內使用你主動提供的資料。
          </p>
          <p>
            SRT 預約表目前會詢問姓名或暱稱、Email、生日、所在城市、LINE
            ID、想整理的主題、可接受時段與付款狀態。表單由 Google
            處理，請只提供完成預約需要的資料；若付款、取消或退款條件尚未確認清楚，請先不要付款。
          </p>
          <p>
            美心學苑不會出售你提供的個人資料。若你想查詢、更正、停止接收訊息或要求刪除美心學苑可控制的資料，請透過本頁下方的聯絡方式提出。
          </p>
          <p>
            本站會記錄頁面路徑，以及
            LINE、申請表、Portaly、免費下載與服務按鈕的點擊類型，用來判斷哪些入口真的有人使用。事件不包含你在
            LINE、Email
            或表單填寫的內容。分析工具尚未載入時，事件會暫存在目前的瀏覽器工作階段；只有在部署環境設定分析服務後，才會送往該服務。
          </p>
        </section>

        <section aria-labelledby="site-terms-heading">
          <h2 id="site-terms-heading">網站內容與工具使用</h2>
          <p>
            本站文章、塔羅提示、診斷、急救卡與練習資源用於自我覺察、書寫與日常整理。內容不構成醫療、心理治療、法律、財務或投資建議，也不應取代合格專業人士的評估與協助。
          </p>
          <p>
            塔羅結果由本站既有規則依牌面與選擇組合產生，不是 AI
            即時解讀，也不預言未來。使用者仍需自行判斷並承擔依內容採取行動的結果。
          </p>
          <p>
            SRT 靈性回應療法及相關 Notion
            內容屬於靈性自我探索服務。內容不構成疾病成因、診斷或治療，也不保證健康、情緒、關係、財務、工作或其他個別結果。若你有身心症狀、急性危機或正在接受專業照護，請優先尋求合格醫療或心理專業協助，並勿自行停藥或中止治療。
          </p>
          <p>
            未經書面同意，請勿大量重製、販售、重新包裝或冒用本站文字、圖片、PDF
            與互動工具。你可以為個人非商業用途保存與使用免費資源。
          </p>
        </section>

        <section aria-labelledby="service-heading">
          <h2 id="service-heading">服務申請與確認</h2>
          <p>
            網站上的服務介紹是理解與申請入口，不代表送出表單後即成立預約或交易。實際服務內容、費用、時間、進行方式、交付內容與後續支持，會在適配諮詢或付款前以書面確認；雙方確認後才成立服務約定。
          </p>
          <p>
            一對一服務會依當事人的現況提供整理與陪伴，但不保證特定流量、收入、關係結果、身心狀態或其他個別成果。若你的需求超出服務範圍，美心學苑可以婉拒申請，並在適合時建議其他求助方向。
          </p>
        </section>

        <section aria-labelledby="refund-heading">
          <h2 id="refund-heading">取消、改期與退款</h2>
          <p>
            尚未付款或尚未收到美心學苑書面確認前，你可以停止申請，不會產生本站費用。付款後的改期、取消、退款條件會依服務類型與已開始的工作內容不同，在付款前提供的書面說明中載明。
          </p>
          <p>
            若付款前沒有收到完整條件，請先不要付款。已成立的服務若需要改期或取消，請使用原本的聯絡管道提出，並以雙方的書面確認為準。法律另有強制規定時，依該規定處理。
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading">聯絡方式</h2>
          <p>
            隱私、資料、預約或服務條款問題，可透過
            <Link href="/continue/line">Vivi LINE 官方帳號</Link>
            聯絡。請不要在公開留言中留下身分證號、金融資料、病歷或其他敏感資訊。
          </p>
          <Link href="/" className="vivi-text-link">
            回到美心學苑首頁
          </Link>
        </section>
      </article>
    </>
  );
}
