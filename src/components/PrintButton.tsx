"use client";

interface PrintButtonProps {
  label: string;
  className?: string;
}

export default function PrintButton({ label, className }: PrintButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className ?? "inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"}
    >
      {label}
    </button>
  );
}
