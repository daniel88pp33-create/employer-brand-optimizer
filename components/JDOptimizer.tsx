"use client";

// ============================================================
// components/JDOptimizer.tsx — 主互動元件 (Client Component)
// 管理表單狀態、呼叫 API、協調子元件
// ============================================================

import { useState } from "react";
import { Loader2, Wand2, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { companyStyles } from "@/lib/companyStyles";
import { GeneratedJD } from "@/lib/prompts";
import StyleSelector from "./StyleSelector";
import JDOutput from "./JDOutput";

// 範例 JD，方便使用者快速測試
const EXAMPLE_JD = `負責公司前端網站開發與維護
- 使用 React 開發使用者介面
- 與後端工程師協作串接 API
- 優化網站效能與 SEO
- 參與產品需求討論
要求：
- 熟悉 JavaScript/TypeScript
- 有 React 經驗者優先
- 能獨立作業
- 薪資面議`;

export default function JDOptimizer() {
  const [jobTitle, setJobTitle] = useState("");
  const [rawJD, setRawJD] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState("silicon-valley");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedJD | null>(null);
  const [resultStyleId, setResultStyleId] = useState<string>("");
  const [showStyleSelector, setShowStyleSelector] = useState(true);

  const selectedStyle = companyStyles.find((s) => s.id === selectedStyleId)!;
  const resultStyle = companyStyles.find((s) => s.id === resultStyleId);

  // 載入範例
  const handleLoadExample = () => {
    setJobTitle("前端工程師");
    setRawJD(EXAMPLE_JD);
    setError(null);
  };

  // 清除表單
  const handleReset = () => {
    setJobTitle("");
    setRawJD("");
    setSelectedStyleId("silicon-valley");
    setResult(null);
    setError(null);
  };

  // 提交生成
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle.trim() || !rawJD.trim()) {
      setError("請填寫職稱與原始 JD 內容");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: jobTitle.trim(),
          rawJD: rawJD.trim(),
          styleId: selectedStyleId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "生成失敗，請稍後再試");
      }

      setResult(data.data);
      setResultStyleId(selectedStyleId);

      // 生成成功後捲動到結果區
      setTimeout(() => {
        document.getElementById("jd-output")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

    } catch (err) {
      setError(err instanceof Error ? err.message : "發生未知錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* ===== 輸入區 ===== */}
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* 步驟一：基本資訊 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                輸入職缺基本資訊
              </h2>
              <p className="text-sm text-slate-400">填入職稱與原始 JD 內容</p>
            </div>
            {/* 快速填入範例 */}
            <button
              type="button"
              onClick={handleLoadExample}
              className="ml-auto rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs text-slate-500 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
            >
              載入範例
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {/* 職稱 */}
            <div className="lg:col-span-1">
              <label
                htmlFor="job-title"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                職稱 <span className="text-red-500">*</span>
              </label>
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="例：資深前端工程師"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                maxLength={60}
                required
              />
            </div>

            {/* 原始 JD */}
            <div className="lg:col-span-4">
              <label
                htmlFor="raw-jd"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                原始 JD 內容 <span className="text-red-500">*</span>
                <span className="ml-2 text-xs text-slate-400">
                  （直接貼上，不需要整理格式）
                </span>
              </label>
              <textarea
                id="raw-jd"
                value={rawJD}
                onChange={(e) => setRawJD(e.target.value)}
                placeholder="直接貼入您現有的職缺說明、職責條列、要求條件等，AI 會自動重新結構化與優化..."
                rows={6}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                required
              />
              <p className="mt-1 text-right text-xs text-slate-400">
                {rawJD.length} 字
              </p>
            </div>
          </div>
        </section>

        {/* 步驟二：選擇風格 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              2
            </span>
            <div className="flex-1">
              <h2 className="text-base font-bold text-slate-800">
                選擇企業風格
              </h2>
              <p className="text-sm text-slate-400">
                目前選擇：
                <span className={`ml-1 font-semibold ${selectedStyle.textColor}`}>
                  {selectedStyle.emoji} {selectedStyle.name}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowStyleSelector(!showStyleSelector)}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 transition"
            >
              {showStyleSelector ? (
                <>收起 <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>展開 <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>

          {showStyleSelector && (
            <StyleSelector
              styles={companyStyles}
              selected={selectedStyleId}
              onSelect={setSelectedStyleId}
            />
          )}
        </section>

        {/* 錯誤訊息 */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}

        {/* 步驟三：提交按鈕 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
            清除重填
          </button>

          <button
            type="submit"
            disabled={loading || !jobTitle.trim() || !rawJD.trim()}
            className="
              inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
              px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200
              transition hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-300
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
              disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none
            "
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                AI 生成中，請稍候...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                一鍵優化 JD
                <span className="ml-1 opacity-75">({selectedStyle.emoji})</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ===== 輸出區 ===== */}
      {result && resultStyle && (
        <div id="jd-output" className="mt-12 pt-4 border-t border-slate-100">
          <JDOutput result={result} style={resultStyle} />
        </div>
      )}
    </div>
  );
}
