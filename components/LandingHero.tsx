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
    headerFrom: '#3b82f6', headerTo: '#6366f1',
    border: 'rgba(99,102,241,.35)',
    tagBg: 'rgba(99,102,241,.15)', tagText: '#a5b4fc',
    flyAnim: 'flyFromTopLeft', delay: '0.1s',
    pos: { top: '8%', left: '2%' }, width: 238,
  },
  {
    id: 'c2',
    title: 'KA 客戶成功經理',
    company: '電商零售 · 台北',
    bullets: ['運用數據分析優化客戶業績', '協調跨部門資源解決問題'],
    tags: ['CRM', '數據分析'],
    headerFrom: '#14b8a6', headerTo: '#06b6d4',
    border: 'rgba(20,184,166,.35)',
    tagBg: 'rgba(20,184,166,.15)', tagText: '#5eead4',
    flyAnim: 'flyFromLeft', delay: '0.35s',
    pos: { top: '46%', left: '0%' }, width: 228,
  },
  {
    id: 'c3',
    title: '數位行銷 Retention 專員',
    company: 'ESG 永續 · 台北',
    bullets: ['規劃完整 Lifecycle 留存策略', '追蹤 LTV 並執行 A/B Test'],
    tags: ['CDP', 'LTV'],
    headerFrom: '#10b981', headerTo: '#34d399',
    border: 'rgba(16,185,129,.35)',
    tagBg: 'rgba(16,185,129,.15)', tagText: '#6ee7b7',
    flyAnim: 'flyFromBottomLeft', delay: '0.55s',
    pos: { top: '76%', left: '3%' }, width: 212,
  },
  {
    id: 'c4',
    title: 'Product Manager',
    company: '教育科技 · 全遠端',
    bullets: ['定義產品路線圖與核心 OKR', '帶領跨功能團隊高效交付'],
    tags: ['Agile', 'B2C'],
    headerFrom: '#8b5cf6', headerTo: '#a855f7',
    border: 'rgba(139,92,246,.35)',
    tagBg: 'rgba(139,92,246,.15)', tagText: '#c4b5fd',
    flyAnim: 'flyFromTopRight', delay: '0.2s',
    pos: { top: '5%', right: '2%' }, width: 225,
  },
  {
    id: 'c5',
    title: 'Full Stack Engineer',
    company: 'AI-First · 美國新創',
    bullets: ['設計高擴展性前後端架構', '實作 AI 功能與 context engineering'],
    tags: ['Next.js', 'AI', 'Node'],
    headerFrom: '#6366f1', headerTo: '#3b82f6',
    border: 'rgba(99,102,241,.35)',
    tagBg: 'rgba(59,130,246,.15)', tagText: '#93c5fd',
    flyAnim: 'flyFromRight', delay: '0.4s',
    pos: { top: '40%', right: '1%' }, width: 248,
  },
  {
    id: 'c6',
    title: 'UI/UX Designer',
    company: '創意廣告 · 台北',
    bullets: ['打造端到端使用者設計語言', '主導 Design System 落地'],
    tags: ['Figma', 'Design System'],
    headerFrom: '#ec4899', headerTo: '#f43f5e',
    border: 'rgba(236,72,153,.35)',
    tagBg: 'rgba(236,72,153,.15)', tagText: '#f9a8d4',
    flyAnim: 'flyFromBottomRight', delay: '0.6s',
    pos: { top: '76%', right: '4%' }, width: 218,
  },
  {
    id: 'c7',
    title: '品牌行銷經理',
    company: '豪華精品 · 台北',
    bullets: ['制定全通路品牌策略'],
    tags: ['Brand', 'Marketing'],
    headerFrom: '#f59e0b', headerTo: '#d97706',
    border: 'rgba(245,158,11,.35)',
    tagBg: 'rgba(245,158,11,.15)', tagText: '#fcd34d',
    flyAnim: 'flyFromTop', delay: '0.25s',
    pos: { top: '2%', left: '27%' }, width: 192,
  },
];

/* ── JD Card Component ── */
function JDCard({ card }: { card: CardDef }) {
  const flyDuration = '0.85s';
  const flyEasing = 'cubic-bezier(0.22,0.68,0,1.15)';

  return (
    <div
      className="absolute hidden lg:block"
      style={{
        ...card.pos,
        width: card.width,
        animation: `${card.flyAnim} ${flyDuration} ${flyEasing} ${card.delay} both,
                    floatCard ${4.5 + Math.random()}s ease-in-out ${parseFloat(card.delay) + 0.85}s infinite`,
      }}
    >
      <div
        className="rounded-xl overflow-hidden backdrop-blur-sm"
        style={{
          border: `1px solid ${card.border}`,
          background: 'rgba(15,23,42,0.82)',
          boxShadow: `0 4px 24px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)`,
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

          {/* Scan line effect */}
          <div className="relative h-px overflow-hidden rounded" style={{ background: card.border }}>
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.headerFrom}, transparent)`,
                animation: `scanLine 2.5s linear ${parseFloat(card.delay) + 1}s infinite`,
              }}
            />
          </div>

          {/* Bullets */}
          <ul className="space-y-1">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-[3px] w-1 h-1 rounded-full shrink-0" style={{ background: card.headerFrom }} />
                <span className="text-[10px] text-slate-300 leading-tight">{b}</span>
              </li>
            ))}
          </ul>

          {/* Abstract placeholder lines */}
          <div className="space-y-1 pt-0.5">
            {[70, 45, 60].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{ width: `${w}%`, background: 'rgba(148,163,184,.12)' }}
              />
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            {card.tags.map((t) => (
              <span
                key={t}
                className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                style={{ background: card.tagBg, color: card.tagText }}
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
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100svh', background: '#030712' }}>

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(148,163,184,.18) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          animation: 'gridFade 6s ease-in-out infinite',
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 600, height: 600,
            top: '-15%', left: '30%',
            background: 'radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 400, height: 400,
            bottom: '-10%', right: '20%',
            background: 'radial-gradient(circle, rgba(0,180,166,.10) 0%, transparent 70%)',
          }}
        />
      </div>

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
        <div
          style={{
            animation: 'heroTextAppear 0.7s ease-out 0.05s both',
          }}
        >
          <DanioJDLogo height={44} showText={true} />
        </div>

        {/* Badge */}
        <div
          className="mt-6 mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs"
          style={{
            borderColor: 'rgba(0,180,166,.35)',
            background: 'rgba(0,180,166,.08)',
            color: '#5eead4',
            animation: 'heroTextAppear 0.7s ease-out 0.15s both',
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#00B4A6' }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#00B4A6' }} />
          </span>
          AI 驅動 × 雇主品牌優化
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold tracking-tight text-white"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            lineHeight: 1.15,
            animation: 'heroTextAppear 0.7s ease-out 0.25s both',
          }}
        >
          讓每份 JD 都獲得
          <br />
          <span style={{ background: 'linear-gradient(135deg,#00B4A6,#4FD1C7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            頂尖人才的高度關注
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mt-5 max-w-xl text-base leading-relaxed"
          style={{
            color: '#94a3b8',
            animation: 'heroTextAppear 0.7s ease-out 0.38s both',
          }}
        >
          輸入原始 JD，選擇企業風格，AI 30 秒生成
          <strong className="text-white"> 中英雙語、高轉換率</strong> 的雇主品牌文案。
          <br className="hidden sm:block" />
          適用 LinkedIn・104・Yourator 等平台。
        </p>

        {/* CTA Button */}
        <a
          href="#optimizer"
          className="mt-9 inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 font-bold text-white text-base transition-transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg,#00B4A6,#1A2A6C)',
            animation: `heroTextAppear 0.7s ease-out 0.5s both, glowPulse 2.8s ease-in-out 1.5s infinite`,
          }}
        >
          <Sparkles className="w-5 h-5" />
          點擊馬上優化 JD
        </a>

        {/* Sub-CTA labels */}
        <p
          className="mt-4 text-xs"
          style={{
            color: '#475569',
            animation: 'heroTextAppear 0.7s ease-out 0.6s both',
          }}
        >
          完全免費 &nbsp;·&nbsp; 無需註冊 &nbsp;·&nbsp; 30 秒生成
        </p>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{
            color: '#334155',
            animation: 'heroTextAppear 0.7s ease-out 1.2s both',
          }}
        >
          <span className="text-[11px] tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
