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

根目錄的 `netlify.toml` 已包含上述建置設定與 SPA redirect。這能讓 `/shop`、`/energy-cards`、`/download/energy-first-aid` 等 Wouter 前端路由在直接開啟時回到 React 應用程式處理。

## 已遷移的靜態資產

網站共用圖片、12 張急救卡圖片與 3 份免費 PDF 會由 GitHub 中的 `netlify-assets/` 追蹤，前端使用對應的 GitHub raw 靜態網址，因此不再依賴 Manus 的 `/manus-storage/` 路徑。

| 類型 | GitHub 路徑 |
|---|---|
| 品牌、首頁、案例與商品圖片 | `netlify-assets/images/` |
| 12 張急救卡圖片 | `netlify-assets/images/energy-cards/` |
| 免費 PDF 工具 | `netlify-assets/downloads/` |

## 上架前必填：付費商品下載檔

`client/src/pages/Download.tsx` 仍使用 `#PASTE_GOOGLE_DRIVE_LINK_HERE` 佔位字串。請將每一項付費商品實際交付的 PDF 上傳到 Google Drive，設定為「知道連結的使用者可檢視」，再逐一替換該檔案內的佔位網址。

> PAYUNi 簡易收款連結不會自動導回網站。正確流程仍是：買家在 PAYUNi 完成付款 → Vivi 收到付款通知 → Vivi 透過 LINE 人工傳送 `/download/:productId` 下載頁連結。

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
