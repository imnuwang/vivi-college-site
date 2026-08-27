export type ConversionEventName =
  | "page_view"
  | "service_cta_click"
  | "line_click"
  | "application_open"
  | "portaly_open"
  | "resource_download"
  | "resource_start"
  | "outbound_continue"
  | "external_return";

export type ConversionEventProperties = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    umami?: {
      track: (
        eventName?: string,
        eventData?: ConversionEventProperties
      ) => void;
    };
  }
}

const analyticsQueueKey = "vivi:analytics-queue";

type QueuedConversion = {
  eventName: ConversionEventName;
  eventProperties: ConversionEventProperties;
};

function cleanProperties(properties: ConversionEventProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  );
}

function readQueue(): QueuedConversion[] {
  try {
    const value = window.sessionStorage.getItem(analyticsQueueKey);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function enqueueConversion(conversion: QueuedConversion) {
  try {
    const queue = [...readQueue(), conversion].slice(-50);
    window.sessionStorage.setItem(analyticsQueueKey, JSON.stringify(queue));
  } catch {
    // Analytics must never block navigation when browser storage is unavailable.
  }
}

export function flushQueuedConversions() {
  if (typeof window === "undefined" || !window.umami) return;

  const queue = readQueue();
  if (!queue.length) return;

  queue.forEach(({ eventName, eventProperties }) => {
    window.umami?.track(eventName, eventProperties);
  });

  try {
    window.sessionStorage.removeItem(analyticsQueueKey);
  } catch {
    // The queue can expire naturally with the browser session.
  }
}

export function trackConversion(
  eventName: ConversionEventName,
  properties: ConversionEventProperties = {}
) {
  if (typeof window === "undefined") return;

  const eventProperties = cleanProperties(properties);
  const payload = { event: eventName, ...eventProperties };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  if (window.umami) {
    window.umami.track(eventName, eventProperties);
  } else {
    enqueueConversion({ eventName, eventProperties });
  }
  window.dispatchEvent(
    new CustomEvent("vivi:conversion", { detail: payload })
  );
}

export function trackPageView(path: string, title: string) {
  trackConversion("page_view", {
    path,
    page_title: title,
  });
}
