import { socialLinks } from "@/data/catalog";

export function buildLineMessageUrl(message: string) {
  const lineId = encodeURIComponent(socialLinks.lineOfficialAccountId);
  return `https://line.me/R/oaMessage/${lineId}/?${encodeURIComponent(message)}`;
}

export function buildLineOrderUrl(productName: string) {
  return buildLineMessageUrl(`您好，我想訂購「${productName}」。\n請提供付款資訊與數位檔案交付方式，謝謝。`);
}

export function buildLineTransitionUrl(message?: string) {
  if (!message) return "/continue/line";
  return `/continue/line?message=${encodeURIComponent(message)}`;
}
