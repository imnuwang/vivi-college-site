import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PortalyLeadLink } from "../client/src/components/PortalyLeadLink";
import { leadCapture, tools } from "../client/src/data/catalog";

describe("Portaly lead capture configuration", () => {
  it("uses the confirmed public Portaly page as the primary external lead destination", () => {
    expect(leadCapture.provider).toBe("Portaly");
    expect(leadCapture.url).toBe("https://portaly.cc/vivi168");
    expect(new URL(leadCapture.url).hostname).toBe("portaly.cc");
  });

  it("keeps the three free tools directly downloadable from Netlify-compatible static assets while using Portaly as the main lead provider", () => {
    expect(tools).toHaveLength(3);
    expect(
      tools.every(tool => tool.downloadUrl.startsWith("/assets/downloads/"))
    ).toBe(true);
    expect(leadCapture.provider).toBe("Portaly");
  });

  it("routes Portaly CTAs through the local data-use transition page", () => {
    const markup = renderToStaticMarkup(
      createElement(PortalyLeadLink, { label: "測試 CTA" })
    );

    expect(markup).toContain('href="/continue/portaly"');
    expect(markup).not.toContain('target="_blank"');
    expect(markup).toContain("測試 CTA");
  });

  it("wires Tools, Services, and SiteFrame to the shared CTA while Home leads to the flagship diagnostic", () => {
    const files = [
      "client/src/pages/Tools.tsx",
      "client/src/pages/Services.tsx",
      "client/src/components/SiteFrame.tsx",
    ];

    for (const relativePath of files) {
      const source = readFileSync(
        resolve(import.meta.dirname, "..", relativePath),
        "utf8"
      );
      expect(source).toContain("PortalyLeadLink");
    }

    const home = readFileSync(
      resolve(import.meta.dirname, "..", "client/src/pages/Home.tsx"),
      "utf8"
    );
    expect(home).toContain('href="/creator-diagnostic"');
    expect(home).toContain("我想讓專業被看見");
  });

  it("uses the shared Portaly transition link in the header, mobile navigation, and footer without a local newsletter form", () => {
    const source = readFileSync(
      resolve(import.meta.dirname, "..", "client/src/components/SiteFrame.tsx"),
      "utf8"
    );

    expect(source).toContain('label="月光來信"');
    expect(source).toContain('label="訂閱月光來信"');
    expect(source).not.toContain("NewsletterDialog");
    expect(source).not.toContain("newsletter.subscribe");
    expect(source).not.toContain("本站備援訂閱");
  });
});
