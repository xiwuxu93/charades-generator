"use client";

import AdSlot, { type AdSlotProps } from "./AdSlot";
import { isAdUnitConfigured } from "@/config/ads";

interface LabeledAdSlotProps extends AdSlotProps {
  wrapperClassName?: string;
  label?: string;
}

export default function LabeledAdSlot({
  wrapperClassName,
  label = "Advertisement",
  slot,
  ...rest
}: LabeledAdSlotProps) {
  if (!isAdUnitConfigured(slot)) {
    return null;
  }

  const wrapperClasses = `rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 ${wrapperClassName ?? ""}`.trim();

  return (
    <div className={wrapperClasses}>
      <p className="mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-gray-400">{label}</p>
      <AdSlot slot={slot} {...rest} />
    </div>
  );
}
