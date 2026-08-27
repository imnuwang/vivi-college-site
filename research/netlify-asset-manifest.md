# Netlify 靜態資產對照

此文件記錄由 Manus 資產路徑改為 GitHub 追蹤靜態資產的對照，供 Netlify 部署與日後更換 CDN 時核對。

| 網站用途 | GitHub 靜態檔案 |
|---|---|
| 首頁／品牌圖片 | `netlify-assets/images/vivi-*.jpg`、`netlify-assets/images/vivi-*.png` |
| Vivi 人像 | `netlify-assets/images/JZ6_7995.jpg` |
| 急救卡互動頁 | `netlify-assets/images/energy-cards/energy-card-01.png` 至 `energy-card-12.png` |
| 免費工具下載 | `netlify-assets/downloads/*.pdf` |

急救卡檔名會依 `catalog.ts` 的既有卡片順序使用，並非原始上傳檔名的字母順序。這可確保場景、文案與圖片維持正確對應。

## 畫面驗證

2026-08-25 已以桌機檢視首頁、選物頁與 `/energy-cards`，並以手機檢視選物頁與 `/energy-cards`。所有首屏圖片、品牌標記與急救卡頁主要視覺均可由 GitHub raw 靜態網址載入；手機版的商品篩選、急救卡主標與開始互動區塊維持可讀。
