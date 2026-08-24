import { useParams } from "wouter";
import { Check, Download as DownloadIcon, MessageCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { MoonMark } from "@/components/SiteFrame";
import { socialLinks } from "@/data/catalog";

const downloadItems: Record<string, { name: string; files: { label: string; url: string }[] }> = {
  "clarity-notebook": {
    name: "月光書房｜七日覺察筆記",
    files: [
      { label: "七日覺察筆記 PDF", url: "#PASTE_GOOGLE_DRIVE_LINK_HERE" },
    ],
  },
  "style-signal-cards": {
    name: "穿搭開運｜意圖風格卡",
    files: [
      { label: "24 張風格提示卡 PDF", url: "#PASTE_GOOGLE_DRIVE_LINK_HERE" },
    ],
  },
  "energy-reset-kit": {
    name: "能量回穩｜晚間小儀式包",
    files: [
      { label: "引導音檔 MP3", url: "#PASTE_GOOGLE_DRIVE_LINK_HERE" },
      { label: "晚間引導卡 + 紀錄頁 PDF", url: "#PASTE_GOOGLE_DRIVE_LINK_HERE" },
    ],
  },
  "brand-foundation": {
    name: "療癒品牌｜內容承接地圖",
    files: [
      { label: "內容承接地圖完整工具包 PDF", url: "#PASTE_GOOGLE_DRIVE_LINK_HERE" },
    ],
  },
};

export default function DownloadPage() {
  const { productId } = useParams<{ productId: string }>();
  const item = productId ? downloadItems[productId] : undefined;

  if (!item) {
    return (
      <div className="section-space">
        <div className="site-shell text-center">
          <h1 className="display-heading">找不到這個商品的下載頁面</h1>
          <p className="mt-4 text-[#536158]">如果你已完成付款但看到這個頁面，請透過 LINE 聯繫 Vivi。</p>
          <a href={socialLinks.line} target="_blank" rel="noreferrer" className="vivi-button vivi-button-dark mt-8 inline-flex">聯繫 LINE <MessageCircle className="size-4" /></a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title={`下載：${item.name}`} description="付款完成，感謝你的信任。請在此頁下載你的數位檔案。" path={`/download/${productId}`} />
      <section className="section-space">
        <div className="site-shell mx-auto max-w-2xl text-center">
          <MoonMark size="md" />
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e3efe5] px-4 py-2 text-sm font-medium text-[#2a6b4a]">
            <Check className="size-4" /> 付款完成
          </div>
          <h1 className="display-heading mt-6">{item.name}</h1>
          <p className="mt-4 text-lg leading-8 text-[#536158]">感謝你的信任。你的數位檔案已經準備好，點擊下方按鈕即可下載。</p>

          <div className="mt-10 space-y-4">
            {item.files.map((file) => (
              <a
                key={file.label}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="vivi-button vivi-button-dark mx-auto flex w-full max-w-sm items-center justify-center gap-2"
              >
                <DownloadIcon className="size-4" />
                {file.label}
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#dbe3d9] bg-[#f7f4eb] p-6 text-left text-sm leading-7 text-[#536158]">
            <p className="font-medium text-[#183b31]">下載注意事項</p>
            <ul className="mt-3 space-y-2">
              <li>· 檔案可反覆下載，建議先存到自己的裝置或雲端。</li>
              <li>· PDF 檔案可直接列印使用，也可在平板上填寫。</li>
              <li>· 數位商品一經交付不接受退款。</li>
              <li>· 如有任何問題，請透過 LINE 聯繫 Vivi。</li>
            </ul>
          </div>

          <a href={socialLinks.line} target="_blank" rel="noreferrer" className="vivi-text-link mt-8 inline-flex items-center gap-1">
            有問題？透過 LINE 聯繫 <MessageCircle className="size-4" />
          </a>
        </div>
      </section>
    </>
  );
}
