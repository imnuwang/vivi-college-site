import { describe, expect, it } from "vitest";
import {
  newsletterSubscriptionInput,
  newsletterStatusInput,
  newsletterUnsubscribeInput,
} from "./routers/newsletter";

describe("newsletter input validation", () => {
  it("normalizes a valid subscriber email and retains a permitted segment", () => {
    const input = newsletterSubscriptionInput.parse({
      email: " VIVI.Reader@Example.com ",
      segment: "signal-notes",
    });

    expect(input).toEqual({ email: "vivi.reader@example.com", segment: "signal-notes" });
  });

  it("uses the site newsletter segment by default", () => {
    expect(newsletterSubscriptionInput.parse({ email: "reader@example.com" }).segment).toBe("site_newsletter");
  });

  it("rejects malformed emails and unknown segments", () => {
    expect(() => newsletterUnsubscribeInput.parse({ email: "not-an-email" })).toThrow();
    expect(() => newsletterSubscriptionInput.parse({ email: "reader@example.com", segment: "other" })).toThrow();
  });

  it("normalizes the subscription status lookup email", () => {
    expect(newsletterStatusInput.parse({ email: " Reader@Example.com " }).email).toBe("reader@example.com");
  });
});
