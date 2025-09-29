"use client";

import type { CSSProperties } from "react";
import LabeledAdSlot from "./LabeledAdSlot";
import { AD_UNITS, isAdUnitConfigured } from "@/config/ads";

interface PageHeaderAdProps {
  className?: string;
  style?: CSSProperties;
  label?: string;
  slotOverride?: string | null;
}

export default function PageHeaderAd({
  className,
  style,
  label,
  slotOverride,
}: PageHeaderAdProps) {
  const slot = slotOverride ?? AD_UNITS.pageHeader ?? AD_UNITS.articleInline;
  if (!isAdUnitConfigured(slot)) {
    return null;
  }

  const wrapperClassName = ["my-6", className].filter(Boolean).join(" ");
  const resolvedStyle: CSSProperties = style ?? { display: "block", minHeight: 200 };

  return (
    <LabeledAdSlot
      slot={slot}
      wrapperClassName={wrapperClassName}
      style={resolvedStyle}
      label={label}
      format="auto"
      responsive
    />
  );
}
