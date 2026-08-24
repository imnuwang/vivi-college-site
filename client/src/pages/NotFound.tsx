/** Style guide — 月光書房：錯誤頁仍保留清楚、溫柔、可返回內容主線的出口。 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return <><Seo title="找不到這一頁" description="這一頁可能已移動，請回到美心學苑首頁繼續探索。" path="/404" /><section className="not-found"><div><p>404 · LOST BETWEEN CHAPTERS</p><h1>這一頁暫時不在書架上。</h1><span>你可以回到首頁，或從閱讀室重新開始。</span><Link href="/" className="vivi-button vivi-button-dark mt-7"><ArrowLeft className="size-4" />回到首頁</Link></div></section></>;
}
