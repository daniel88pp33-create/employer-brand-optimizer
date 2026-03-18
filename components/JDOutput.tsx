"use client";

// ============================================================
// components/JDOutput.tsx — 生成結果展示元件
// 顯示中英文雙語的優化後 JD，並提供複製功能
// ============================================================

import { useState } from "react";
import { GeneratedJD } from "@/lib/prompts";
import { CompanyStyle } from "@/lib/companyStyles";
import CopyButton from "./CopyButton";
import {
  Briefcase,
  CheckCircle2,
  Gift,
  MessageSquareQuote,
  ListChecks,
  Globe,
} from "lucide-react";

interface JDOutputProps {
  result: GeneratedJD;
  style: CompanyStyle;
}

// 將 JD 物件轉換為可複製的純文字
function jdToPlainText(
  jd: GeneratedJD["zh"] | GeneratedJD["en"],
  lang: "zh" | "en"
): string {
  const labels =
    lang === "zh"
      ? { resp: "【核心職責】", req: "【應徵條件】", benefits: "【我們提供】" }
      : {
          resp: "【Key Responsibilities】",
          req: "【Requirements】",
          benefits: "【What We Offer】",
        };

  return `${jd.optimizedTitle}

${jd.hook}

${labels.resp}
${jd.responsibilities.map((r, i) => `${i + 1}. ${r}`).join("\n")}

${labels.req}
${jd.requirements.map((r, i) => `${i + 1}. ${r}`).join("\n")}

${labels.benefits}
${jd.benefits.map((b) => `• ${b}`).join("\n")}

${jd.cta}`;
}

// 單一語言版本的 JD 展示
function JDPanel({
  data,
  lang,
  style,
}: {
  data: GeneratedJD["zh"] | GeneratedJD["en"];
  lang: "zh" | "en";
  style: CompanyStyle;
}) {
  const plainText = jdToPlainText(data, lang);
  const langLabel = lang === "zh" ? "繁體中文版" : "English Version";
  const langIcon = lang === "zh" ? "🇹🇼" : "🇺🇸";

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{langIcon}</span>
          <span className="font-semibold text-slate-700">{langLabel}</span>
          <span
            className={`ml-2 rounded-full bg-gradient-to-r ${style.gradient} px-2.5 py-0.5 text-xs font-medium text-white shadow-sm`}
          >
            {style.emoji} {style.name}
          </span>
        </div>
        <CopyButton
          text={plainText}
          label={lang === "zh" ? "全文複製" : "Copy All"}
        />
      </div>

      {/* Panel Body */}
      <div className="flex flex-col gap-5 p-5">

        {/* 優化職稱 */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
            <Briefcase className="h-3.5 w-3.5" />
            {lang === "zh" ? "優化職稱" : "Optimized Title"}
          </div>
          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {data.optimizedTitle}
          </h3>
        </section>

        {/* 故事鉤句 */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            {lang === "zh" ? "品牌鉤句" : "Brand Hook"}
          </div>
          <blockquote className="rounded-xl border-l-4 border-indigo-400 bg-indigo-50/60 px-4 py-3 text-sm leading-relaxed text-slate-700 italic">
            {data.hook}
          </blockquote>
        </section>

        {/* 核心職責 */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
              <ListChecks className="h-3.5 w-3.5" />
              {lang === "zh" ? "核心職責" : "Key Responsibilities"}
            </div>
            <CopyButton
              text={data.responsibilities.map((r, i) => `${i + 1}. ${r}`).join("\n")}
              label={lang === "zh" ? "複製此段" : "Copy"}
            />
          </div>
          <ul className="space-y-2">
            {data.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 應徵條件 */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {lang === "zh" ? "應徵條件" : "Requirements"}
            </div>
            <CopyButton
              text={data.requirements.map((r, i) => `${i + 1}. ${r}`).join("\n")}
              label={lang === "zh" ? "複製此段" : "Copy"}
            />
          </div>
          <ul className="space-y-2">
            {data.requirements.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 福利待遇 */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
              <Gift className="h-3.5 w-3.5" />
              {lang === "zh" ? "我們提供" : "What We Offer"}
            </div>
            <CopyButton
              text={data.benefits.map((b) => `• ${b}`).join("\n")}
              label={lang === "zh" ? "複製此段" : "Copy"}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.benefits.map((item, i) => (
              <span
                key={i}
                className={`rounded-full bg-gradient-to-r ${style.gradient} px-3 py-1.5 text-xs font-medium text-white shadow-sm`}
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* 行動呼籲 */}
        <section className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 px-4 py-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
            <Globe className="h-3.5 w-3.5" />
            {lang === "zh" ? "行動呼籲 CTA" : "Call to Action"}
          </div>
          <p className="text-sm font-medium leading-relaxed text-slate-800">
            {data.cta}
          </p>
        </section>

      </div>
    </article>
  );
}

export default function JDOutput({ result, style }: JDOutputProps) {
  const [activeTab, setActiveTab] = useState<"both" | "zh" | "en">("both");

  const fullBilingualText = `
═══════════════════════════════
🇹🇼 繁體中文版
═══════════════════════════════
${jdToPlainText(result.zh, "zh")}

═══════════════════════════════
🇺🇸 English Version
═══════════════════════════════
${jdToPlainText(result.en, "en")}
`.trim();

  return (
    <div className="animate-slide-up space-y-4">
      {/* 頂部工具列 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800">
            ✨ 生成完成
          </h2>
          <span className={`rounded-full bg-gradient-to-r ${style.gradient} px-2.5 py-1 text-xs font-semibold text-white shadow-sm`}>
            {style.emoji} {style.name}
          </span>
        </div>
        {/* 雙語全文複製 */}
        <CopyButton
          text={fullBilingualText}
          label="複製雙語全文"
          className="!bg-indigo-600 !text-white hover:!bg-indigo-700 !ring-indigo-600"
        />
      </div>

      {/* 顯示模式切換 */}
      <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
        {(["both", "zh", "en"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all
              ${activeTab === tab
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
              }`}
          >
            {tab === "both" ? "🌐 雙語並排" : tab === "zh" ? "🇹🇼 中文" : "🇺🇸 English"}
          </button>
        ))}
      </div>

      {/* 輸出面板 */}
      <div
        className={`grid gap-4 ${
          activeTab === "both" ? "lg:grid-cols-2" : "grid-cols-1 max-w-3xl"
        }`}
      >
        {(activeTab === "both" || activeTab === "zh") && (
          <JDPanel data={result.zh} lang="zh" style={style} />
        )}
        {(activeTab === "both" || activeTab === "en") && (
          <JDPanel data={result.en} lang="en" style={style} />
        )}
      </div>
    </div>
  );
}
