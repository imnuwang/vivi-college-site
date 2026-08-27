import { afterEach, describe, expect, it, vi } from "vitest";
import {
  flushQueuedConversions,
  trackConversion,
} from "../client/src/lib/analytics";

describe("conversion analytics queue", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("keeps an event in the browser session until the tracker is ready", () => {
    const storage = new Map<string, string>();
    const browserWindow = {
      dataLayer: undefined as Array<Record<string, unknown>> | undefined,
      dispatchEvent: vi.fn(),
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
        removeItem: (key: string) => storage.delete(key),
      },
    };

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: browserWindow,
    });

    trackConversion("line_click", { source: "services" });

    expect(browserWindow.dataLayer).toEqual([
      { event: "line_click", source: "services" },
    ]);
    expect(storage.get("vivi:analytics-queue")).toContain("line_click");

    const track = vi.fn();
    Object.assign(browserWindow, { umami: { track } });
    flushQueuedConversions();

    expect(track).toHaveBeenCalledWith("line_click", { source: "services" });
    expect(storage.has("vivi:analytics-queue")).toBe(false);
  });
});
