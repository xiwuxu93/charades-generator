"use client";

import { useState } from "react";

interface CopyLinkButtonProps {
  url: string;
  label: string;
  confirmation: string;
  errorMessage: string;
  className?: string;
}

export default function CopyLinkButton({ url, label, confirmation, errorMessage, className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
      setCopied(false);
    }

    window.setTimeout(() => {
      setCopied(false);
      setError(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleCopy}
        className={
          className ??
          "inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        }
      >
        {label}
      </button>
      <span aria-live="polite" className="text-xs text-gray-500 min-h-[1rem]">
        {copied && confirmation}
        {error && !copied && errorMessage}
      </span>
    </div>
  );
}
