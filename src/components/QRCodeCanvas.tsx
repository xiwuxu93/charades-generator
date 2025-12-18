"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeCanvasProps {
  value: string;
  size?: number;
  className?: string;
}

export default function QRCodeCanvas({ value, size = 200, className = "" }: QRCodeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    QRCode.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      },
      (error) => {
        if (error) {
          console.error("QR Code generation error:", error);
        }
      }
    );
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label={`QR code for ${value}`}
    />
  );
}
