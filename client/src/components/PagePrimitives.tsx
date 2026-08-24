/**
 * Style guide — 月光書房：以編輯式欄位、大留白與低飽和色塊呈現章節感；
 * 所有頁面都保有清楚的導讀與回到下一步的出口。
 */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { SectionEyebrow } from "@/components/SiteFrame";

export function PageIntro({ eyebrow, title, description, note, kind = "archive", chapter = "01" }: { eyebrow: string; title: React.ReactNode; description: string; note?: string; kind?: "archive" | "workbook" | "feature" | "catalogue" | "portrait"; chapter?: string }) {
  return (
    <section className={`page-intro page-intro-${kind}`}>
      <div className="site-shell page-intro-grid">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <div><h1>{title}</h1><p>{description}</p></div>
        {note && <p className="page-intro-note">{note}</p>}
        <span className="page-intro-chapter" aria-hidden="true">CH. {chapter}</span>
        <span className="page-intro-moonphase" aria-hidden="true"><i /><i /><i /><i /></span>
      </div>
    </section>
  );
}

export function CtaBand({ eyebrow = "THE NEXT CHAPTER", title, description, href, label }: { eyebrow?: string; title: string; description: string; href: string; label: string }) {
  return (
    <section className="cta-band">
      <div className="site-shell cta-band-inner">
        <div><SectionEyebrow className="text-[#e6c886]">{eyebrow}</SectionEyebrow><h2>{title}</h2></div>
        <div><p>{description}</p><Link href={href} className="vivi-button vivi-button-light mt-6">{label} <ArrowRight className="size-4" /></Link></div>
      </div>
    </section>
  );
}
