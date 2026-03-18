import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '雇主品牌優化系統 | Employer Branding Optimizer — AI 驅動 JD 文案生成',
    template: '%s | 雇主品牌優化系統',
  },
  description:
    '使用 AI 技術（Claude Opus）將您的招募職位描述（JD）轉化為高轉換率的雇主品牌文案，支援 22 種企業風格，中英文對照輸出，一鍵複製到 LinkedIn、104、CakeResume 等招募平台。',
  keywords: [
    '雇主品牌',
    'Employer Branding',
    'JD 優化',
    '職位描述',
    'AI 招募',
    '人才招募文案',
    '招募行銷',
    'Recruitment Marketing',
    '人資工具',
  ],
  authors: [{ name: 'Employer Brand Optimizer' }],
  openGraph: {
    title: '雇主品牌優化系統 — AI 驅動 JD 文案生成',
    description:
      '使用 AI 將您的原始 JD 轉化為具備高轉換率的雇主品牌文案，22 種風格，中英對照',
    type: 'website',
    locale: 'zh_TW',
    siteName: '雇主品牌優化系統',
  },
  twitter: {
    card: 'summary_large_image',
    title: '雇主品牌優化系統 | AI JD 優化工具',
    description: '22 種企業風格 × AI 生成 × 中英對照 × 一鍵複製',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
