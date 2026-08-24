# LINE 訂購預填訊息實作依據

既有 LINE 短連結 `https://lin.ee/eX7HkiC` 解析後導向官方帳號 `@772broux`。

依 LINE Developers 的 URL scheme 文件，官方帳號預填訊息格式為：

```text
https://line.me/R/oaMessage/{Percent-encoded LINE ID}/?{Percent-encoded text_message}
```

網站商品卡使用此格式，以 UTF-8 編碼的商品名稱與訂購需求開啟官方帳號聊天視窗並將文字放入輸入欄。使用者仍須自行確認並送出該訊息。

來源：https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/
