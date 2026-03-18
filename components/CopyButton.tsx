"use client";

// ============================================================
// components/CopyButton.tsx — 一鍵複製按鈕
// ============================================================

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({
  text,
  label = "複製",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 降級方案：使用舊版 execCommand
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium
        transition-all duration-200
        ${
          copied
            ? "bg-green-100 text-green-700 ring-1 ring-green-300"
            : "bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 ring-1 ring-slate-200"
        }
        ${className}
      `}
      aria-label={copied ? "已複製！" : `複製${label}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          已複製！
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  );
}
