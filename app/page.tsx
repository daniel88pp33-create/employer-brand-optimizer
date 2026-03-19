// ============================================================
// app/page.tsx — 首頁 (Server Component)
// 職責：SSR 渲染語義化 HTML、SEO 內容、載入互動元件
// ============================================================

import type { Metadata } from "next";
import { Star, Globe, ArrowRight, Zap } from "lucide-react";
import OptimizerForm from "@/components/OptimizerForm";
import DanioJDLogo from "@/components/DanioJDLogo";

// 首頁專屬 SEO metadata（會覆蓋 layout.tsx 的預設值）
export const metadata: Metadata = {
  title: "DanioJD | AI 將 JD 轉化為頂尖人才磁鐵",
  description:
    "免費試用！輸入職稱與原始 JD，選擇 22 種企業風格之一，AI 立即生成高轉換率的雙語職缺文案。適用 LinkedIn、104、CakeResume 等平台。",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app",
    languages: {
      "zh-TW": "/",
      "en-US": "/en",
    },
  },
};

// ★ 數據統計：用於 Hero Section 的社會證明
const stats = [
  { label: "企業風格", value: "22+" },
  { label: "平均節省時間", value: "87%" },
  { label: "中英雙語輸出", value: "✓" },
  { label: "一鍵複製", value: "✓" },
];

// ★ 功能特色：用於說明區塊
const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "秒速生成",
    desc: "30 秒內將原始 JD 轉化為專業文案，省去反覆修改的時間成本。",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "22 種企業風格",
    desc: "從矽谷新創到傳統金融，從電競熱血到 ESG 永續，精準匹配您的品牌調性。",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "中英雙語輸出",
    desc: "自動生成繁體中文與英文版本，一份輸入，同步佈局全球人才市場。",
  },
];

export default function HomePage() {
  return (
    // ★ 語義化 HTML5：使用正確的結構標籤有助於 SEO
    <main className="min-h-screen bg-slate-50">

      {/* ===== HEADER / NAVBAR ===== */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <DanioJDLogo height={34} showText={true} />
            </div>
            {/* 導覽連結 */}
            <nav aria-label="主要導覽">
              <a
                href="#optimizer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                立即使用
                <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      {/* ★ SEO 重點：使用 <section> + <h1> 確保語義清晰 */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 text-center"
      >
        {/* 裝飾性背景光暈 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* 頂部標籤 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            AI 驅動 × 雇主品牌優化
          </div>

          {/* ★ H1 標籤：每頁只有一個，包含核心關鍵字 */}
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            讓每份 JD 都成為
            <br />
            <span className="text-gradient">頂尖人才的磁鐵</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300">
            輸入原始職缺說明，選擇您的企業風格，AI 立即生成{" "}
            <strong className="text-white">招募漏斗下層・轉換導向</strong>{" "}
            的高品質文案，並自動輸出中英對照版本。
          </p>

          {/* 數字亮點 */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 功能說明 ===== */}
      <section
        aria-labelledby="features-heading"
        className="bg-white py-14 border-b border-slate-100"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="features-heading"
            className="mb-10 text-center text-2xl font-bold text-slate-800"
          >
            為什麼選擇 DanioJD？
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <article
                key={f.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600 transition group-hover:bg-indigo-200">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-800">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 主工具區 (Client Component) ===== */}
      {/* ★ id="optimizer" 讓 Header 的錨點連結可以跳轉 */}
      <section id="optimizer" aria-label="JD 優化工具">
        <OptimizerForm />
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 bg-slate-900 py-10 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-4 flex items-center justify-center">
            <DanioJDLogo height={30} showText={true} />
          </div>
          <p className="text-sm text-slate-400">
            雇主品牌優化系統 — 用 AI 打造頂尖人才磁鐵
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Powered by Anthropic Claude · Built with Next.js + Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
