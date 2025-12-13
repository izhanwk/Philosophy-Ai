"use client";

import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import React from "react";

type Variant = "success" | "error" | "warning" | "info";

const variantStyles: Record<
  Variant,
  { bg: string; border: string; text: string; icon: JSX }
> = {
  success: {
    bg: "bg-green-900/25",
    border: "border-green-700/40",
    text: "text-green-300",
    icon: <CheckCircle2 className="h-5 w-5 text-green-300" />,
  },
  error: {
    bg: "bg-red-900/25",
    border: "border-red-700/40",
    text: "text-red-300",
    icon: <AlertCircle className="h-5 w-5 text-red-300" />,
  },
  warning: {
    bg: "bg-amber-900/25",
    border: "border-amber-700/40",
    text: "text-amber-200",
    icon: <TriangleAlert className="h-5 w-5 text-amber-200" />,
  },
  info: {
    bg: "bg-blue-900/25",
    border: "border-blue-700/40",
    text: "text-blue-200",
    icon: <Info className="h-5 w-5 text-blue-200" />,
  },
};

type Props = {
  variant?: Variant;
  title?: string;
  message: string;
  className?: string;
};

export function Alert({ variant = "info", title, message, className }: Props) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`w-full rounded-xl border px-4 py-3 sm:px-5 sm:py-4 flex gap-3 items-start ${
        styles.bg
      } ${styles.border} ${className ?? ""}`}
      role="alert"
    >
      <div className="mt-0.5">{styles.icon}</div>
      <div className="space-y-1">
        {title && <p className="font-semibold text-white">{title}</p>}
        <p className={`text-sm sm:text-base ${styles.text}`}>{message}</p>
      </div>
    </div>
  );
}
