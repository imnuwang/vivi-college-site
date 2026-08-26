# VIVI COLLEGE｜Netlify 上架說明

## 部署設定

請在 Netlify 連結 GitHub 儲存庫 `imnuwang/vivi-college-site`，並使用以下設定：

| Netlify 欄位 | 值 |
|---|---|
| Branch | `master` |
| Base directory | 留空 |
| Build command | `pnpm vite build` |
| Publish directory | `dist/public` |
| Node version | `22` |

根目錄的 `netlify.toml` 已包含上述建置設定與 SPA redirect。這能讓 `/shop`、`/energy-cards`、`/resources/clarity-notebook` 等 Wouter 前端路由在直接開啟時回到 React 應用程式處理。

## 已遷移的靜態資產

網站共用圖片、12 張急救卡圖片與 3 份免費 PDF 會由 GitHub 中的 `netlify-assets/` 追蹤，前端使用對應的 GitHub raw 靜態網址，因此不再依賴 Manus 的 `/manus-storage/` 路徑。

| 類型 | GitHub 路徑 |
|---|---|
| 品牌、首頁、案例與免費資源圖片 | `netlify-assets/images/` |
| 12 張急救卡圖片 | `netlify-assets/images/energy-cards/` |
| 免費 PDF 工具 | `netlify-assets/downloads/` |

## 免費內容版本

目前網站採用免費內容策略。原先的五項商品已改為可直接使用的免費練習或互動工具，不需要 PAYUNi、Google Drive 交付連結或付款後下載頁。三份既有免費 PDF 持續由 `netlify-assets/downloads/` 提供；七日覺察、意圖穿搭、晚間回穩與內容承接地圖則以 `/resources/:resourceId` 的可填寫頁面直接提供。

## AI 塔羅的重要限制

`/tarot-daily` 目前呼叫既有後端的 tRPC `tarot.readDailyCard` 程序。純靜態 Netlify 部署不會執行目前的 Express／tRPC 伺服器，因此 **AI 生成解讀功能不能僅靠這份靜態設定運作**。

在正式 Netlify 上架前，請選擇其一：

1. 將塔羅生成程序改寫為 Netlify Function，並在 Netlify 的伺服器端環境變數中設定 LLM 金鑰；或
2. 保留可存取的獨立後端，讓 Netlify 前端安全呼叫該 API。

不要將任何 LLM 金鑰或 Manus 伺服器端金鑰放入前端的 `VITE_*` 變數或 GitHub 儲存庫。

## 可選環境變數

若要延續網站分析，請在 Netlify 設定下列公開變數：

| 變數 | 用途 |
|---|---|
| `VITE_ANALYTICS_ENDPOINT` | Umami 分析端點 |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami 網站識別碼 |

其餘 Manus OAuth、資料庫與內建後端環境變數不適用於純靜態 Netlify 前端。如需登入、資料庫或 AI 塔羅後端，請另行完成 Netlify Functions 或外部後端遷移。
