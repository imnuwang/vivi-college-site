import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  diagnosticQuestions,
  diagnosticResults,
  formatDiagnosticShareText,
  getDominantDiagnostic,
} from "../client/src/data/creatorDiagnostic";

const pageSource = readFileSync(
  resolve(import.meta.dirname, "..", "client/src/pages/CreatorDiagnostic.tsx"),
  "utf8"
);
const homeSource = readFileSync(
  resolve(import.meta.dirname, "..", "client/src/pages/Home.tsx"),
  "utf8"
);

describe("療癒型創作者內容承接診斷", () => {
  it("provides four actionable questions across positioning, content, and conversion", () => {
    expect(diagnosticQuestions).toHaveLength(4);
    expect(
      diagnosticQuestions.every(question => question.options.length === 3)
    ).toBe(true);
    expect(Object.keys(diagnosticResults)).toEqual([
      "positioning",
      "content",
      "conversion",
    ]);
  });

  it("returns the dominant diagnosis and supplies both tool and LINE next steps", () => {
    expect(
      getDominantDiagnostic(["content", "content", "positioning", "conversion"])
        .key
    ).toBe("content");
    expect(pageSource).toContain("PortalyLeadLink");
    expect(pageSource).toContain("buildLineTransitionUrl");
    expect(pageSource).toContain("重新診斷");
  });

  it("formats a paste-ready result and provides clipboard feedback", () => {
    const text = formatDiagnosticShareText(diagnosticResults.positioning);

    expect(text).toContain("我的結果：定位訊號模糊型");
    expect(text).toContain(diagnosticResults.positioning.action);
    expect(pageSource).toContain("navigator.clipboard");
    expect(pageSource).toContain('document.execCommand("copy")');
    expect(pageSource).toContain("一鍵複製結果");
    expect(pageSource).toContain("diagnostic-result");
  });

  it("does not publish unverified student case material", () => {
    expect(homeSource).not.toContain("STUDENT EVIDENCE · REAL CASE MATERIALS");
    expect(homeSource).not.toContain("testimonials.map");
    expect(homeSource).not.toContain("case-");
  });
});
