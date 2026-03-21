'use client';

import { ArrowDown, Sparkles } from 'lucide-react';
import DanioJDLogo from './DanioJDLogo';

/* ── JD Card definitions ── */
interface CardDef {
  id: string;
  title: string;
  company: string;
  bullets: string[];
  tags: string[];
  headerFrom: string;
  headerTo: string;
  border: string;
  tagBg: string;
  tagText: string;
  flyAnim: string;
  delay: string;
  pos: React.CSSProperties;
  width: number;
}

const CARDS: CardDef[] = [
  {
    id: 'c1',
    title: 'Senior Frontend Engineer',
    company: '矽谷新創 · Remote',
    bullets: ['主導前端架構設計與重構', '優化核心 Web Vitals 指標'],
    tags: ['React', 'TypeScript'],
    headerFrom: '#6366f1', headerTo: '#818cf8',
    border: 'rgba(99,102,241,.22)',
    tagBg: 'rgba(99,102,241,.10)', tagText: '#6366f1',
    flyAnim: 'flyFromTopLeft', delay: '0.1s',
    pos: { top: '8%', left: '2%' }, width: 238,
  },
  {
    id: 'c2',
    title: 'KA 客戶成功經理',
    company: '電商零售 · 台北',
    bullets: ['運用數據分析優化客戶業績', '協調跨部門資源解決問題'],
    tags: ['CRM', '數據分析'],
    headerFrom: '#0d9488', headerTo: '#14b8a6',
    border: 'rgba(13,148,136,.22)',
    tagBg: 'rgba(13,148,136,.10)', tagText: '#0d9488',
    flyAnim: 'flyFromLeft', delay: '0.35s',
    pos: { top: '46%', left: '0%' }, width: 228,
  },
  {
    id: 'c3',
    title: '數位行銷 Retention 專員',
    company: 'ESG 永續 · 台北',
    bullets: ['規劃完整 Lifecycle 留存策略', '追蹤 LTV 並執行 A/B Test'],
    tags: ['CDP', 'LTV'],
    headerFrom: '#059669', headerTo: '#10b981',
    border: 'rgba(5,150,105,.22)',
    tagBg: 'rgba(5,150,105,.10)', tagText: '#059669',
    flyAnim: 'flyFromBottomLeft', delay: '0.55s',
    pos: { top: '76%', left: '3%' }, width: 212,
  },
  {
    id: 'c4',
    title: 'Product Manager',
    company: '教育科技 · 全遠端',
    bullets: ['定義產品路線圖與核心 OKR', '帶領跨功能團隊高效交付'],
    tags: ['Agile', 'B2C'],
    headerFrom: '#7c3aed', headerTo: '#a855f7',
    border: 'rgba(124,58,237,.22)',
    tagBg: 'rgba(124,58,237,.10)', tagText: '#7c3aed',
    flyAnim: 'flyFromTopRight', delay: '0.2s',
    pos: { top: '5%', right: '2%' }, width: 225,
  },
  {
    id: 'c5',
    title: 'Full Stack Engineer',
    company: 'AI-First · 美國新創',
    bullets: ['設計高擴展性前後端架構', '實作 AI 功能與 context engineering'],
    tags: ['Next.js', 'AI', 'Node'],
    headerFrom: '#2563eb', headerTo: '#3b82f6',
    border: 'rgba(37,99,235,.22)',
    tagBg: 'rgba(37,99,235,.10)', tagText: '#2563eb',
    flyAnim: 'flyFromRight', delay: '0.4s',
    pos: { top: '40%', right: '1%' }, width: 248,
  },
  {
    id: 'c6',
    title: 'UI/UX Designer',
    company: '創意廣告 · 台北',
    bullets: ['打造端到端使用者設計語言', '主導 Design System 落地'],
    tags: ['Figma', 'Design System'],
    headerFrom: '#db2777', headerTo: '#ec4899',
    border: 'rgba(219,39,119,.22)',
    tagBg: 'rgba(219,39,119,.10)', tagText: '#db2777',
    flyAnim: 'flyFromBottomRight', delay: '0.6s',
    pos: { top: '76%', right: '4%' }, width: 218,
  },
  {
    id: 'c7',
    title: '品牌行銷經理',
    company: '豪華精品 · 台北',
    bullets: ['制定全通路品牌策略'],
    tags: ['Brand', 'Marketing'],
    headerFrom: '#d97706', headerTo: '#f59e0b',
    border: 'rgba(217,119,6,.22)',
    tagBg: 'rgba(217,119,6,.10)', tagText: '#d97706',
    flyAnim: 'flyFromTop', delay: '0.25s',
    pos: { top: '2%', left: '27%' }, width: 192,
  },
];

/* ── JD Card Component ── */
function JDCard({ card }: { card: CardDef }) {
  return (
    <div
      className="absolute hidden lg:block"
      style={{
        ...card.pos,
        width: card.width,
        animation: `${card.flyAnim} 0.85s cubic-bezier(0.22,0.68,0,1.15) ${card.delay} both,
                    floatCard ${4.5 + parseFloat(card.delay) * 2}s ease-in-out ${parseFloat(card.delay) + 0.85}s infinite`,
      }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: `1px solid ${card.border}`,
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: `0 4px 20px rgba(0,0,0,.07), 0 1px 3px rgba(0,0,0,.05), inset 0 1px 0 rgba(255,255,255,.9)`,
        }}
      >
        {/* Header bar */}
        <div
          className="px-3 py-2 flex items-center justify-between"
          style={{ background: `linear-gradient(90deg,${card.headerFrom},${card.headerTo})` }}
        >
          <span className="text-white text-[11px] font-semibold truncate leading-tight">
            {card.title}
          </span>
          <span className="text-white/70 text-[9px] ml-2 shrink-0">JD</span>
        </div>

        {/* Body */}
        <div className="px-3 py-2.5 space-y-1.5">
          {/* Company */}
          <p className="text-[10px] text-slate-400">{card.company}</p>

          {/* Scan line */}
          <div className="relative h-px overflow-hidden rounded" style={{ background: card.border }}>
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.headerFrom}80, transparent)`,
                animation: `scanLine 2.5s linear ${parseFloat(card.delay) + 1}s infinite`,
              }}
            />
          </div>

          {/* Bullets */}
          <ul className="space-y-1">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-[3px] w-1 h-1 rounded-full shrink-0" style={{ background: card.headerFrom }} />
                <span className="text-[10px] text-slate-600 leading-tight">{b}</span>
              </li>
            ))}
          </ul>

          {/* Placeholder lines */}
          <div className="space-y-1 pt-0.5">
            {[70, 45, 60].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{ width: `${w}%`, background: 'rgba(148,163,184,.2)' }}
              />
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            {card.tags.map((t) => (
              <span
                key={t}
                className="text-[9px] px-1.5 py-0.5 rounded-full font-medium border"
                style={{
                  background: card.tagBg,
                  color: card.tagText,
                  borderColor: card.border,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Hero ── */
export default function LandingHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', background: '#f8faff' }}
    >
      {/* Colorful gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left: soft purple */}
        <div className="absolute rounded-full blur-3xl" style={{
          width: 700, height: 700, top: '-20%', left: '-10%',
          background: 'radial-gradient(circle, rgba(199,210,254,.6) 0%, rgba(224,231,255,.3) 40%, transparent 70%)',
        }} />
        {/* Top-right: soft pink */}
        <div className="absolute rounded-full blur-3xl" style={{
          width: 550, height: 550, top: '-10%', right: '-8%',
          background: 'radial-gradient(circle, rgba(251,207,232,.55) 0%, rgba(253,230,244,.25) 40%, transparent 70%)',
        }} />
        {/* Center: soft teal */}
        <div className="absolute rounded-full blur-3xl" style={{
          width: 500, height: 500, top: '25%', left: '35%', transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(204,251,241,.5) 0%, rgba(167,243,208,.2) 40%, transparent 70%)',
        }} />
        {/* Bottom-right: soft blue */}
        <div className="absolute rounded-full blur-3xl" style={{
          width: 450, height: 450, bottom: '-15%', right: '10%',
          background: 'radial-gradient(circle, rgba(186,230,255,.5) 0%, rgba(224,242,254,.25) 40%, transparent 70%)',
        }} />
        {/* Bottom-left: soft yellow */}
        <div className="absolute rounded-full blur-3xl" style={{
          width: 380, height: 380, bottom: '-5%', left: '5%',
          background: 'radial-gradient(circle, rgba(254,240,138,.35) 0%, transparent 70%)',
        }} />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(100,116,139,.10) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          animation: 'gridFade 6s ease-in-out infinite',
        }}
      />

      {/* Floating JD cards */}
      {CARDS.map((card) => (
        <JDCard key={card.id} card={card} />
      ))}

      {/* ── CENTER CONTENT ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        style={{ minHeight: '100svh' }}
      >
        {/* Logo */}
        <div style={{ animation: 'heroTextAppear 0.7s ease-out 0.05s both' }}>
          <DanioJDLogo height={44} showText={true} />
        </div>

        {/* Badge */}
        <div
          className="mt-6 mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{
            borderColor: 'rgba(99,102,241,.3)',
            background: 'rgba(99,102,241,.06)',
            color: '#6366f1',
            animation: 'heroTextAppear 0.7s ease-out 0.15s both',
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#6366f1' }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#6366f1' }} />
          </span>
          AI 驅動 × 雇主品牌優化
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold tracking-tight text-slate-900"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            lineHeight: 1.15,
            animation: 'heroTextAppear 0.7s ease-out 0.25s both',
          }}
        >
          讓每份 JD 都獲得
          <br />
          <span style={{
            background: 'linear-gradient(135deg,#6366f1,#00B4A6,#a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            頂尖人才的高度關注
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mt-5 max-w-xl text-base leading-relaxed text-slate-500"
          style={{ animation: 'heroTextAppear 0.7s ease-out 0.38s both' }}
        >
          輸入原始 JD，選擇企業風格，30 秒生成
          <strong className="text-slate-800"> 中英雙語、高轉換率</strong> 的雇主品牌文案。
          <br className="hidden sm:block" />
          適用 LinkedIn・104・Yourator 等平台。
        </p>

        {/* CTA Button */}
        <a
          href="#optimizer"
          className="mt-9 inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 font-bold text-white text-base transition-transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg,#6366f1,#00B4A6)',
            animation: `heroTextAppear 0.7s ease-out 0.5s both, glowPulse 2.8s ease-in-out 1.5s infinite`,
            boxShadow: '0 4px 24px rgba(99,102,241,.35)',
          }}
        >
          <Sparkles className="w-5 h-5" />
          點擊馬上優化 JD
        </a>

        {/* Sub-CTA labels */}
        <p
          className="mt-4 text-xs text-slate-400"
          style={{ animation: 'heroTextAppear 0.7s ease-out 0.6s both' }}
        >
          完全免費 &nbsp;·&nbsp; 無需註冊 &nbsp;·&nbsp; 30 秒生成
        </p>

        {/* ── 手機版 JD 卡片（桌面隱藏，手機顯示 2 張）── */}
        <div
          className="lg:hidden flex gap-3 mt-8 w-full max-w-sm"
          style={{ animation: 'heroTextAppear 0.7s ease-out 0.75s both' }}
        >
          {[CARDS[0], CARDS[3]].map((card, i) => (
            <div
              key={card.id}
              className="flex-1 rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${card.border}`,
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 16px rgba(0,0,0,.07)',
                animation: `${i === 0 ? 'flyFromBottomLeft' : 'flyFromBottomRight'} 0.85s cubic-bezier(0.22,0.68,0,1.15) ${0.8 + i * 0.15}s both,
                            floatCard ${4.5 + i}s ease-in-out ${1.65 + i * 0.15}s infinite`,
              }}
            >
              {/* Header */}
              <div
                className="px-2.5 py-1.5 flex items-center justify-between"
                style={{ background: `linear-gradient(90deg,${card.headerFrom},${card.headerTo})` }}
              >
                <span className="text-white text-[10px] font-semibold truncate leading-tight">
                  {card.title}
                </span>
              </div>
              {/* Body */}
              <div className="px-2.5 py-2 space-y-1.5">
                <p className="text-[9px] text-slate-400">{card.company}</p>
                <ul className="space-y-1">
                  {card.bullets.slice(0, 1).map((b, bi) => (
                    <li key={bi} className="flex items-start gap-1">
                      <span className="mt-[3px] w-1 h-1 rounded-full shrink-0" style={{ background: card.headerFrom }} />
                      <span className="text-[9px] text-slate-600 leading-tight">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {card.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[8px] px-1.5 py-0.5 rounded-full font-medium border"
                      style={{ background: card.tagBg, color: card.tagText, borderColor: card.border }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator — pushed to bottom with mt-auto */}
        <div
          className="mt-auto pb-8 flex flex-col items-center gap-1.5 text-slate-300"
          style={{ animation: 'heroTextAppear 0.7s ease-out 1.2s both' }}
        >
          <span className="text-[11px] tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
