/**
 * Style guide — 月光書房：SEO 與結構化資訊應如章節標籤般清楚、可信、可閱讀。
 */
import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

const baseUrl = "https://vivicollege.com";
const brandName = "VIVI COLLEGE 美心學苑";

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function Seo({ title, description, path, image, schema }: SeoProps) {
  useEffect(() => {
    const url = `${baseUrl}${path}`;
    document.title = `${title}｜${brandName}`;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", `${title}｜${brandName}`);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    if (image) {
      upsertMeta('meta[property="og:image"]', "property", "og:image", image);
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
    }

    let script = document.head.querySelector<HTMLScriptElement>("script[data-vivi-schema]");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.viviSchema = "true";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(
      schema ?? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url,
        inLanguage: "zh-TW",
      },
    );
  }, [title, description, path, image, schema]);

  return null;
}
