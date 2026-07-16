'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import DanioJDLogo from './DanioJDLogo';

/* ── JD Card definitions ──
   Swiss Modernism 2.0: sharp corners, hairline border, one accent color only.
   Cards keep the original site's "floating around the headline" composition,
   just redrawn with flat hard-offset shadows instead of gradients/glass. */
interface CardDef {
  id: string;
  title: string;
  company: string;
  bullets: string[];
  tags: string[];
  pos: React.CSSProperties;
  rotate: number;
  delay: string;
}

const CARDS: CardDef[] = [
  {
    id: 'c1',
    title: 'Senior Frontend Engineer',
    company: '矽谷新創 · Remote',
    bullets: ['主導前端架構設計與重構', '優化核心 Web Vitals 指標'],
    tags: ['React', 'TypeScript'],
    pos: { top: 0, left: 0 },
    rotate: -4,
    delay: '0.05s',
  },
  {
    id: 'c2',
    title: 'Product Manager',
    company: '教育科技 · 全遠端',
    bullets: ['定義產品路線圖與核心 OKR', '帶領跨功能團隊高效交付'],
    tags: ['Agile', 'B2C'],
    pos: { top: '1%', right: 0 },
    rotate: 3,
    delay: '0.15s',
  },
  {
    id: 'c3',
    title: 'KA 客戶成功經理',
    company: '電商零售 · 台北',
    bullets: ['運用數據分析優化客戶業績', '協調跨部門資源解決問題'],
    tags: ['CRM', '數據分析'],
    pos: { top: '45%', left: '-1%' },
    rotate: 2,
    delay: '0.25s',
  },
  {
    id: 'c4',
    title: 'Full Stack Engineer',
    company: 'AI-First · 美國新創',
    bullets: ['設計高擴展性前後端架構', '實作 AI 功能與 context engineering'],
    tags: ['Next.js', 'AI'],
    pos: { top: '47%', right: '-1%' },
    rotate: -3,
    delay: '0.35s',
  },
  {
    id: 'c5',
    title: '數位行銷 Retention 專員',
    company: 'ESG 永續 · 台北',
    bullets: ['規劃完整 Lifecycle 留存策略', '追蹤 LTV 並執行 A/B Test'],
    tags: ['CDP', 'LTV'],
    pos: { bottom: 0, left: '8%' },
    rotate: -2,
    delay: '0.45s',
  },
  {
    id: 'c6',
    title: 'UI/UX Designer',
    company: '創意廣告 · 台北',
    bullets: ['打造端到端使用者設計語言', '主導 Design System 落地'],
    tags: ['Figma', 'Design System'],
    pos: { bottom: '1%', right: '10%' },
    rotate: 4,
    delay: '0.55s',
  },
];

function JDCard({ card, staticLayout }: { card: CardDef; staticLayout?: boolean }) {
  return (
    <div
      className={
        staticLayout
          ? 'w-full animate-fade-in-up'
          : 'absolute hidden w-[210px] animate-fade-in-up xl:block'
      }
      style={staticLayout ? undefined : { ...card.pos, animationDelay: card.delay }}
    >
      <div
        className="group border border-neutral-900 bg-white p-4 transition-transform duration-200 hover:-translate-y-1"
        style={{
          transform: staticLayout ? undefined : `rotate(${card.rotate}deg)`,
          boxShadow: '5px 5px 0 #E5E5E5',
        }}
      >
        <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-slate-500">
          {card.company}
        </div>
        <h3 className="mb-2 text-sm font-bold leading-tight text-neutral-900">
          {card.title}
        </h3>
        <ul className="mb-2.5 space-y-1">
          {card.bullets.map((b) => (
            <li key={b} className="flex gap-1.5 text-xs leading-snug text-neutral-700">
              <span className="text-accent-strong">—</span>
              {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1">
          {card.tags.map((t) => (
            <span
              key={t}
              className="border border-neutral-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingHero() {
  return (
    <section className="border-b border-neutral-200 bg-white px-4 py-16 sm:py-20 xl:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ── Stage: centered copy + floating cards ── */}
        <div className="relative flex flex-col gap-10 xl:min-h-[640px] xl:gap-0">
          <div className="relative z-10 mx-auto max-w-xl animate-fade-in-up text-center">
            <div className="mb-6 flex justify-center">
              <DanioJDLogo height={40} showText={true} />
            </div>

            <p className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-strong">
              <span className="h-px w-7 bg-accent" />
              AI 驅動 × 雇主品牌優化
            </p>

            <h1 className="mb-5 text-balance font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl">
              讓每份 JD 都獲得
              <br />
              <span className="text-accent-strong">頂尖人才</span>的高度關注
            </h1>

            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-neutral-600">
              輸入原始 JD，選擇企業風格，
              <strong className="font-semibold text-neutral-900">30 秒生成中英雙語、高轉換率</strong>
              的雇主品牌文案。適用 LinkedIn・104・Yourator 等平台。
            </p>

            <a
              href="#optimizer"
              className="inline-flex items-center gap-2 border border-neutral-900 bg-neutral-900 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-strong hover:border-accent-strong"
            >
              點擊馬上優化 JD
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <p className="mt-4 font-mono text-xs text-slate-500">
              完全免費 · 無需註冊 · 30 秒生成
            </p>
          </div>

          {/* Desktop: floating collage */}
          {CARDS.map((card) => (
            <JDCard key={card.id} card={card} />
          ))}

          {/* Mobile/tablet: static 2-col preview grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
            {CARDS.slice(0, 4).map((card) => (
              <JDCard key={card.id} card={card} staticLayout />
            ))}
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-1 border-t border-neutral-200 sm:grid-cols-3">
          {[
            ['30″', '生成時間，串流輸出'],
            ['20', '種企業品牌風格'],
            ['2', '語言同步輸出（中／英）'],
          ].map(([num, label], i) => (
            <div
              key={num}
              className={`py-6 sm:pl-6 sm:pr-2 ${i > 0 ? 'border-t border-neutral-200 sm:border-t-0 sm:border-l' : ''}`}
            >
              <span className="block font-serif text-3xl font-semibold text-accent-strong">
                {num}
              </span>
              <span className="text-sm text-slate-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="mt-10 hidden justify-center xl:flex">
          <a
            href="#optimizer"
            className="flex flex-col items-center gap-1.5 text-slate-400 transition-colors hover:text-neutral-900"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
