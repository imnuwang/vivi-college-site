import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "../client/src/data/catalog";

const source = (relativePath: string) =>
  readFileSync(resolve(import.meta.dirname, "..", relativePath), "utf8");

describe("Vivi 真實品牌故事", () => {
  it("publishes the source-grounded transition story and links it from About", () => {
    const article = articles.find(
      item => item.slug === "from-top-sales-to-healing"
    );
    const about = source("client/src/pages/About.tsx");

    expect(article).toBeDefined();
    expect(article?.title).toBe("我曾把業績做到第一，後來卻連人群都想躲開");
    expect(article?.body.join(" ")).toContain("第一筆收入只有六百元");
    expect(article?.body.join(" ")).toContain("恐慌症");
    expect(article?.body.join(" ")).toContain("很久沒有收入");
    expect(about).toContain("/journal/from-top-sales-to-healing");
    expect(about).toContain("我曾把業績做到第一");
    expect(about).not.toContain("明明");
  });

  it("turns the first-hand low point and business transcript into a series", () => {
    const firstIncome = articles.find(
      item => item.slug === "first-six-hundred-online-business"
    );
    const clearContent = articles.find(
      item => item.slug === "healing-skills-need-clear-content"
    );

    expect(firstIncome?.body.join(" ")).toContain("第一筆收入是六百元");
    expect(firstIncome?.body.join(" ")).toContain("先生看到我真的能靠這件事產生收入");
    expect(clearContent?.body.join(" ")).toContain("四、五個小時完成一篇 IG 內容");
    expect(clearContent?.body.join(" ")).toContain("療癒師");
  });
});
