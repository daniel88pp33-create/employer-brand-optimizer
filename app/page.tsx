// ============================================================
// app/page.tsx — 首頁 (Server Component)
// ============================================================

import type { Metadata } from "next";
import { Star, Globe, Zap } from "lucide-react";
import OptimizerForm from "@/components/OptimizerForm";
import DanioJDLogo from "@/components/DanioJDLogo";
import LandingHero from "@/components/LandingHero";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "DanioJD | AI 雇主品牌 JD 優化工具 — 30 秒生成高轉換職缺文案",
  description:
    "DanioJD 是免費的 AI 雇主品牌 JD 優化工具。輸入職稱與原始 JD，選擇 20 種企業風格，30 秒生成中英雙語高轉換職缺文案。適用 LinkedIn、104、Yourator。",
  keywords: [
    "雇主品牌", "JD 優化", "職缺文案", "AI 招募", "employer branding",
    "job description", "招募工具", "人資工具", "LinkedIn 職缺", "DanioJD",
  ],
  openGraph: {
    title: "DanioJD | AI 雇主品牌 JD 優化工具",
    description: "30 秒將普通 JD 轉化為吸引頂尖人才的高轉換文案，中英雙語輸出，20 種企業風格。",
    type: "website",
    locale: "zh_TW",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://employer-brand-optimizer.vercel.app",
    siteName: "DanioJD",
  },
  twitter: {
    card: "summary_large_image",
    title: "DanioJD | AI 雇主品牌 JD 優化工具",
    description: "30 秒將普通 JD 轉化為頂尖人才磁鐵。免費、無需註冊、中英雙語。",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://employer-brand-optimizer.vercel.app",
    languages: { "zh-TW": "/", "en-US": "/en" },
  },
};

/* ── Structured Data (SEO + GEO) ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://employer-brand-optimizer.vercel.app/#software",
      "name": "DanioJD",
      "description": "AI 驅動的雇主品牌 JD 優化工具，將普通職缺說明轉化為讓頂尖人才主動投遞的高轉換文案。支援 20 種企業風格，自動輸出中英雙語版本。",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "TWD" },
      "featureList": [
        "20 種企業品牌風格選擇",
        "AI 自動生成中英雙語職缺文案",
        "30 秒串流輸出",
        "一鍵複製貼到 LinkedIn / 104 / Yourator",
        "重新生成產出不同版本",
      ],
      "url": "https://employer-brand-optimizer.vercel.app",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "什麼是 DanioJD？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DanioJD 是一款 AI 驅動的雇主品牌 JD（職缺說明）優化工具。使用者只需輸入公司資訊與原始 JD，選擇品牌風格，AI 即可在 30 秒內生成中英雙語、高轉換率的職缺文案。",
          },
        },
        {
          "@type": "Question",
          "name": "DanioJD 適合使用在哪些招募平台？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DanioJD 生成的文案適用於 LinkedIn、104 人力銀行、Yourator、Glassdoor、Indeed 等主流招募平台。中文版適合 104、Yourator；英文版適合 LinkedIn、Indeed、Glassdoor。",
          },
        },
        {
          "@type": "Question",
          "name": "使用 DanioJD 需要付費嗎？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DanioJD 目前完全免費使用，無需註冊帳號，直接輸入資訊即可生成文案。",
          },
        },
        {
          "@type": "Question",
          "name": "DanioJD 如何讓 JD 吸引頂尖人才？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DanioJD 使用 Anthropic Claude AI 模型，依據雇主品牌寫作框架將普通職責列表改寫為影響力導向的文案。核心方法包括：用具體畫面取代空洞形容詞、先呈現職位使命再說明條件要求、讓候選人感受到加入後能創造什麼成果，從而提升優質人才的投遞意願。",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "name": "DanioJD",
      "url": "https://employer-brand-optimizer.vercel.app",
      "description": "免費 AI 雇主品牌 JD 優化工具",
      "inLanguage": ["zh-TW", "en"],
    },
  ],
};

/* ── Features section data ── */
const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "30 秒生成",
    desc: "串流輸出技術，即時看到 AI 寫作過程，省去反覆修改的時間成本。",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "20 種企業風格",
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
    <main className="min-h-screen bg-white">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            <DanioJDLogo height={32} showText={true} />
            <nav aria-label="主要導覽">
              <a
                href="#optimizer"
                className="inline-flex items-center gap-1.5 border border-neutral-900 px-4 py-2 text-sm font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                開始優化
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== LANDING HERO ===== */}
      <LandingHero />

      {/* ===== 功能說明 ===== */}
      <section
        aria-labelledby="features-heading"
        className="border-b border-neutral-200 bg-white py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-strong">
            為什麼選擇 DanioJD
          </p>
          <h2
            id="features-heading"
            className="mb-10 max-w-md text-balance font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl"
          >
            三個讓 JD 脫穎而出的原因
          </h2>
          <div className="grid divide-y divide-neutral-200 border-t border-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {features.map((f) => (
              <article key={f.title} className="py-8 sm:px-6 sm:first:pl-0">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-neutral-200 text-accent-strong">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 主工具區 ===== */}
      <section id="optimizer" aria-label="JD 優化工具">
        <OptimizerForm />
      </section>

      {/* ===== FAQ ===== */}
      <section aria-labelledby="faq-heading" className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-accent-strong">
            Q &amp; A
          </p>
          <h2 id="faq-heading" className="mb-8 text-center font-serif text-2xl font-semibold text-neutral-900">
            常見問題
          </h2>
          <FaqAccordion
            items={(jsonLd["@graph"][1] as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }).mainEntity.map((q) => ({
              question: q.name,
              answer: q.acceptedAnswer.text,
            }))}
          />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-neutral-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <DanioJDLogo height={28} showText={true} />
            <p className="mt-2 text-sm text-slate-500">雇主品牌優化系統 — 用 AI 打造頂尖人才磁鐵</p>
          </div>
          <p className="font-mono text-xs text-slate-400">
            Powered by Anthropic Claude · Built with Next.js + Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
