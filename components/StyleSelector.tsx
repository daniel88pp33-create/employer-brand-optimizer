"use client";

// ============================================================
// components/StyleSelector.tsx — 風格選擇器
// 顯示 22 種企業風格的網格選擇介面
// ============================================================

import { CompanyStyle } from "@/lib/companyStyles";
import { Check } from "lucide-react";

interface StyleSelectorProps {
  styles: CompanyStyle[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function StyleSelector({
  styles,
  selected,
  onSelect,
}: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-3 lg:grid-cols-4">
      {styles.map((style) => {
        const isSelected = selected === style.id;
        return (
          <button
            key={style.id}
            type="button"
            onClick={() => onSelect(style.id)}
            className={`
              group relative flex flex-col items-center gap-1.5 px-3 py-3 text-center
              transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900
              ${
                isSelected
                  ? "bg-neutral-50 shadow-[inset_0_-2px_0_0_#A16207]"
                  : "bg-white hover:bg-neutral-50"
              }
            `}
            aria-pressed={isSelected}
            aria-label={`選擇風格：${style.name}`}
          >
            {/* 已選擇標記 */}
            {isSelected && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center bg-neutral-900">
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              </span>
            )}

            {/* Emoji 圖示 */}
            <span className="text-2xl leading-none" role="img" aria-hidden="true">
              {style.emoji}
            </span>

            {/* 中文名稱 */}
            <span
              className={`text-xs font-semibold leading-tight ${
                isSelected ? "text-accent-strong" : "text-neutral-900"
              }`}
            >
              {style.name}
            </span>

            {/* 說明文字 */}
            <span className="line-clamp-2 text-[10px] leading-tight text-slate-400">
              {style.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
