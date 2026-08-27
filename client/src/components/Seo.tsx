/**
 * Style guide — 月光書房：SEO 與結構化資訊應如章節標籤般清楚、可信、可閱讀。
 */
import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  robots?: "index,follow" | "noindex,follow";
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

const baseUrl = "https://vivicollege.com";
const brandName = "VIVI COLLEGE 美心學苑";

function upsertMeta(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

export function Seo({
  title,
  description,
  path,
  image = "/assets/images/vivi-moonlit-library-hero.jpg",
  robots = "index,follow",
  schema,
}: SeoProps) {
  useEffect(() => {
    const url = `${baseUrl}${path}`;
    const absoluteImage = new URL(image, baseUrl).href;
    document.title = `${title}｜${brandName}`;
    upsertCanonical(url);
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", robots);
    upsertMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      `${title}｜${brandName}`
    );
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description
    );
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image"
    );
    upsertMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      absoluteImage
    );
    upsertMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      `${title}｜${brandName}`
    );
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description
    );
    upsertMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      absoluteImage
    );

    let script = document.head.querySelector<HTMLScriptElement>(
      "script[data-vivi-schema]"
    );
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
      }
    );
  }, [title, description, path, image, robots, schema]);

  return null;
}
