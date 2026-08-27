# 美心學苑內容與功能完成紀錄

## 本次完成範圍

| 功能 | 已完成內容 | 驗證方式 |
|---|---|---|
| 三份免費工具 PDF | 已製作並上傳「反覆訊號整理表」（3 頁）、「療癒型創作者的定位急救表」（5 頁）與「今天穿什麼：意圖穿搭卡」（5 頁）；每份含具體判讀、書寫與行動練習 | Typst 嚴格編譯、PDF 文字與代表頁視覺審查、工具頁桌機／手機畫面 |
| 免費工具頁 | 三張工具卡已顯示頁數、實作成果、直接下載與導向 Portaly 的「寄到信箱」入口 | `/tools` 桌機／手機畫面 |
| 月光來信與 Portaly | Portaly 公開頁已建立並顯示「美心學苑｜月光來信＋免費工具」收單區塊；訂閱確認、感謝標題與查信提示已儲存；網站月光來信主 CTA 已導向該入口，原有資料庫訂閱程序保留為備援 | Portaly 後台儲存確認、公開頁、桌機／手機畫面、TypeScript、Vitest |
| 商品付款與交付 | 已移除 Shopify 購物袋、結帳與 commerce router；五項商品均改為指定 PAYUNi 付款連結。PAYUNi 簡易收款完成後不自動回站，由 Vivi 確認訂單後以 LINE 人工傳送對應 `/download/:productId` 下載頁連結 | PAYUNi 商品回歸測試、選物頁／下載頁桌機與手機畫面 |
| 首頁核心主張 | 首頁第一視覺已聚焦「已有助人專業、內容卻卡在定位與詢問承接的女性療癒型創作者」，主要行動改為內容承接診斷 | 首頁桌機／手機畫面、首頁 CTA 回歸測試 |
| 旗艦診斷工具 | 新增「療癒型創作者內容承接診斷」四題互動工具，輸出定位訊號、內容承接或服務邀請結果、今日行動與工具／Portaly／LINE 下一步；結果可一鍵複製並貼到 LINE，含 Clipboard API 與文字區域備援 | 實際完成四題、複製成功回饋、旗艦診斷 Vitest、桌機／手機畫面 |
| 答題過場與案例風險 | 答題選項、進度條與結果卡加入平順轉場並尊重減少動態偏好；因儲存庫內沒有可驗證的案例授權紀錄，首頁與服務頁已移除案例區塊及公開案例圖片 | 桌機／手機畫面、案例資產與引用檢查 |
| 塔羅一日一牌 | 新增獨立頁面、22 張大阿爾克那、主題選擇、翻牌動態、本機規則組合提示與安全邊界 | 單張與三張牌陣、Vitest、桌機／手機畫面 |
| 把自己穿回來急救卡 | 新增 `/energy-cards` 互動頁，含 12 張情境急救卡、關鍵字推薦、標籤篩選、三組場景卡組、3 分鐘計時器、本機收藏與每日記號；以主站共用頁首／頁尾承接，頁面內保留隔離的深莓紅與墨綠視覺。新增第五項 NT$399 PAYUNi 商品、工具入口與 `energy-first-aid` 人工交付下載頁 | 關鍵字推薦實測、急救卡整合 Vitest、桌機／手機畫面 |
| LINE@ 入口 | 首頁主視覺與服務頁新增清楚的 LINE@ 諮詢 CTA | 首頁／服務頁桌機與手機畫面 |
| SEO | 塔羅頁已加入 Meta、OG、WebApplication Schema 與 sitemap | 路由與 sitemap 檢查 |

## 已建立的 PDF 資產

| 工具 | 下載資產 |
|---|---|
| 反覆訊號整理表 | `/manus-storage/repeating-signals-workbook_c241c5e0.pdf` |
| 療癒型創作者的定位急救表 | `/manus-storage/healer-positioning-workbook_69307bed.pdf` |
| 今天穿什麼：意圖穿搭卡 | `/manus-storage/intentional-style-card_99cd139a.pdf` |

## 主要修改檔案

| 類別 | 檔案 |
|---|---|
| PDF 原始檔 | `/home/ubuntu/vivi-free-tools/repeating-signals/main.typ`、`/home/ubuntu/vivi-free-tools/healer-positioning/main.typ`、`/home/ubuntu/vivi-free-tools/intentional-style/main.typ` |
| 工具內容、下載、Portaly 與旗艦診斷 | `client/src/data/catalog.ts`、`client/src/data/creatorDiagnostic.ts`、`client/src/pages/Tools.tsx`、`client/src/pages/CreatorDiagnostic.tsx`、`server/creator-diagnostic.test.ts`、`server/portaly-lead-capture.test.ts`、`research/diagnostic-copy-testimonial-qa.md` |
| 訂閱資料與 API | `drizzle/schema.ts`、`drizzle/0001_sturdy_slapstick.sql`、`server/db.ts`、`server/routers/newsletter.ts`、`server/routers.ts`、`server/newsletter.router.test.ts` |
| LINE 訂購 | `client/src/lib/lineOrder.ts`、`client/src/pages/Shop.tsx`、`server/line-order-flow.test.ts`、`research/line-order-deeplink-reference.md` |
| 塔羅工具 | `shared/tarot.ts`、`client/src/pages/TarotDaily.tsx`、`client/src/App.tsx` |
| 把自己穿回來 | `client/src/pages/EnergyCards.tsx`、`client/src/pages/energy-cards.css`、`client/src/data/catalog.ts`、`client/src/pages/Tools.tsx`、`client/src/pages/Download.tsx`、`server/energy-cards-integration.test.ts`、`research/energy-card-asset-qa.md` |
| 共用介面與轉換 | `client/src/components/SiteFrame.tsx`、`client/src/pages/Home.tsx`、`client/src/pages/Services.tsx`、`client/src/index.css` |
| SEO | `client/public/sitemap.xml` |

## 已執行驗證

| 指令或檢查 | 結果 |
|---|---|
| `pnpm check` | 通過 |
| `pnpm test` | 7 個測試檔、23 個通過 |
| `pnpm build` | 通過 |
| Shopify 探測與購物袋測試 | 為歷史整合驗證；目前公開商品流程已移除 Shopify，改採 LINE 訂購與人工付款確認。 |
| 塔羅本機規則 | 單張與三張牌陣會依牌面、焦點與位置組合反思、10 分鐘行動、書寫問題與安全提醒 |
| Newsletter 資料庫 | 已核對 `newsletterSubscribers` 與 `newsletterSubscriberSegments` 的 12 個預期欄位；未訂閱測試 Email 的狀態查詢正確回傳 `not_found`，未產生測試名單 |
| Umami 分析 | 正式建置產物已注入 Manus Umami 端點與網站 ID；發布後可於分析面板檢視流量 |
| 跨裝置畫面 | 已檢視首頁、旗艦診斷、工具、服務、選物與塔羅工具的桌機／手機版；旗艦診斷在手機可完成四題並顯示結果。 |
| Portaly 收單入口 | `https://portaly.cc/vivi168` 已公開顯示「美心學苑｜月光來信＋免費工具」與領取工具按鈕；首頁、工具頁、服務頁、頁首／手機選單／頁尾的主要月光來信 CTA 已統一導向該網址。訂閱確認載明每月 1–2 次資訊與可取消訂閱；感謝設定提醒查收 Email、垃圾郵件與促銷分頁；帳號擁有者已以真實 Email 確認公開表單提交與收件流程。 |

## 尚需帳號擁有者完成的營運設定

| 項目 | 原因與下一步 |
|---|---|
| Portaly 自訂回饋按鈕 | Portaly 收單區塊已可接收名單且會寄送感謝內容；目前的自訂回饋按鈕仍連至舊的 `https://igtool.vivicollege.com`。若要依工具寄送不同 PDF，請在 Portaly 後台改為對應的下載連結或設定可選分流；現有網站仍提供三份 PDF 的直接下載。 |
| LINE 人工交付節奏 | 商品頁已預填商品名稱與訂購需求。帳號擁有者需在收款確認後，以 LINE 提供相應數位檔案下載連結；如日後需自動交付，再另行評估金流與交付整合。 |

> 塔羅工具僅作為自我覺察與書寫提示。它不預言未來，也不取代醫療、法律、財務、投資、心理或其他重大決策所需的專業意見。
