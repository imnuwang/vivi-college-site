import React from "react";
import { ArrowRight } from "lucide-react";
import { leadCapture } from "@/data/catalog";

type PortalyLeadLinkProps = {
  label?: string;
  className?: string;
};

/**
 * The single primary external lead-capture destination for the public site.
 * Keep this component small so every CTA shares the confirmed Portaly URL.
 */
export function PortalyLeadLink({
  label = leadCapture.primaryLabel,
  className = "vivi-button vivi-button-dark",
}: PortalyLeadLinkProps) {
  return (
    <a href={leadCapture.url} target="_blank" rel="noreferrer" className={className}>
      {label} <ArrowRight className="size-4" />
    </a>
  );
}
