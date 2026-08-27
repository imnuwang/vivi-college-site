import { useEffect } from "react";
import { flushQueuedConversions } from "@/lib/analytics";

const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

function getTrackerSource(value: string) {
  if (value.endsWith(".js") || value.endsWith("/umami")) return value;
  return `${value.replace(/\/$/, "")}/umami`;
}

export function Analytics() {
  useEffect(() => {
    if (!endpoint || !websiteId) return;
    if (document.querySelector("script[data-vivi-analytics]")) return;

    const script = document.createElement("script");
    script.defer = true;
    script.src = getTrackerSource(endpoint);
    script.dataset.websiteId = websiteId;
    script.dataset.viviAnalytics = "true";
    script.addEventListener("load", flushQueuedConversions);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", flushQueuedConversions);
      script.remove();
    };
  }, []);

  return null;
}
