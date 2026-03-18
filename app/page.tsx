import { Metadata } from 'next';
import OptimizerForm from '@/components/OptimizerForm';
import { Sparkles, Zap, Globe, Copy } from 'lucide-react';

export const metadata: Metadata = {
  title: '雇主品牌優化系統 | AI 驅動 JD 文案生成，22 種企業風格',
  description:
    '免費使用 AI（Claude Opus）將原始招募 JD 轉化為高轉換率的雇主品牌文案。支援矽谷新創、ESG 永續、電競熱血等 22 種企業風格，中英文對照輸出，一鍵複製到 LinkedIn 或 104。',
};

const FEATURES = [
  { icon: Sparkles, label: '22 種企業風格', desc: '矽谷新創到日系精工' },
  { icon: Globe, label: '中英文對照', desc: '雙語同步生成' },
  { icon: Zap, label: '串流即時輸出', desc: '秒見文字生成過程' },
  { icon: Copy, label: '一鍵複製', desc: '直貼 LinkedIn / 104' },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* ── HEADER ── */}
      <header className="relative border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
        {/* Gradient glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Brand */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">⚡</span>
                <h1 className="text-xl md:text-2xl font-bold text-gradient">
                  雇主品牌優化系統
                </h1>
              </div>
              <p className="text-gray-500 text-sm">
                Employer Branding Optimizer — AI-Powered JD Transformation
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {FEATURES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/80 border border-gray-700/60 rounded-full text-xs text-gray-300"
                >
                  <Icon className="w-3 h-3 text-blue-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── SEO HERO (visually minimal, semantically rich) ── */}
      <section
        aria-label="功能說明"
        className="max-w-7xl mx-auto px-4 md:px-6 pt-5 pb-2"
      >
        <div className="bg-gradient-to-r from-blue-500/5 to-violet-500/5 border border-blue-500/10 rounded-2xl px-5 py-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            <strong className="text-gray-200 font-semibold">如何使用：</strong>
            輸入您的公司資訊與原始職位描述（JD），選擇符合企業個性的品牌風格，
            AI 將根據「招募漏斗下層（轉換導向）」策略，為您生成
            <strong className="text-blue-300">中英文對照</strong>的高品質雇主品牌文案，
            可直接複製貼到 LinkedIn、104、CakeResume 等平台。
          </p>
        </div>
      </section>

      {/* ── MAIN TOOL ── */}
      <div className="flex-1 max-w-7xl mx-auto w-full">
        <OptimizerForm />
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-6 mt-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 雇主品牌優化系統 · Powered by Claude Opus 4.6</p>
          <p>適用平台：LinkedIn · 104 · CakeResume · 1111 · Yourator · Glassdoor</p>
        </div>
      </footer>
    </main>
  );
}
