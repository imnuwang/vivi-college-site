# VIVI COLLEGE｜Netlify 上架說明

## 部署設定

請在 Netlify 連結 GitHub 儲存庫 `imnuwang/vivi-college-site`，並使用以下設定：

| Netlify 欄位 | 值 |
|---|---|
| Branch | `master` |
| Base directory | 留空 |
| Build command | `pnpm build` |
| Publish directory | `dist/client` |
| Node version | `22` |

根目錄的 `netlify.toml` 已包含上述建置設定。建置完成後，`scripts/generate-static-routes.mjs` 會為每個公開路由產生含獨立標題、描述、canonical 與社群分享資訊的 HTML。其他網址由靜態 `404.html` 回傳 404，避免把不存在的頁面當成首頁索引。

## 已遷移的靜態資產

網站共用圖片、12 張急救卡圖片與 3 份免費 PDF 會由 GitHub 中的 `netlify-assets/` 追蹤，前端使用對應的 GitHub raw 靜態網址，因此不再依賴 Manus 的 `/manus-storage/` 路徑。

| 類型 | GitHub 路徑 |
|---|---|
| 品牌、首頁與免費資源圖片 | `netlify-assets/images/` |
| 12 張急救卡圖片 | `netlify-assets/images/energy-cards/` |
| 免費 PDF 工具 | `netlify-assets/downloads/` |

## 免費內容版本

目前網站採用免費內容策略。原先的五項商品已改為可直接使用的免費練習或互動工具，不需要 PAYUNi、Google Drive 交付連結或付款後下載頁。三份既有免費 PDF 持續由 `netlify-assets/downloads/` 提供；七日覺察、意圖穿搭、晚間回穩與內容承接地圖則以 `/resources/:resourceId` 的可填寫頁面直接提供。

## 塔羅工具的運作方式

`/tarot-daily` 目前由前端依牌面、焦點與牌陣位置組合固定規則文字，不會呼叫模型服務，也不是 AI 即時解讀。純靜態 Netlify 部署可以直接使用這項功能。若未來重新接入模型，必須先完成伺服器端 API、錯誤處理、成本與隱私檢查，並同步更新網站說明。

## 可選環境變數

若要延續網站分析，請在 Netlify 設定下列公開變數：

| 變數 | 用途 |
|---|---|
| `VITE_ANALYTICS_ENDPOINT` | Umami 分析端點 |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami 網站識別碼 |

其餘 Manus OAuth、資料庫與內建後端環境變數不適用於目前的純靜態 Netlify 前端。如需登入或資料庫，再另行完成 Netlify Functions 或外部後端遷移。
