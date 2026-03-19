// ============================================================
// app/layout.tsx — 根佈局 (Root Layout)
// 職責：全站 SEO 基礎設定、字型載入、HTML 結構
// ============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 載入 Google Fonts — Inter 字型
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // 改善字型載入體驗
});

// ★ 核心 SEO 設定：next/metadata API
// 這些 metadata 會在 SSR 時直接寫入 HTML <head>，確保搜尋引擎可以爬取
export const metadata: Metadata = {
  // 標題設定：預設標題 + 子頁面模板
  title: {
    default: "DanioJD | AI 職缺文案轉換器",
    template: "%s | DanioJD",
  },
  // 網站描述（Google 搜尋結果顯示的摘要）
  description:
    "透過 AI 將普通 JD 轉化為吸引頂尖人才的高轉換率職缺文案。支援 22 種企業風格（矽谷新創、傳統金融、電競、ESG 等），自動產出中英文雙語版本，一鍵複製到 LinkedIn、104、CakeResume。",
  // 關鍵字（輔助 SEO）
  keywords: [
    "雇主品牌",
    "JD 優化",
    "職缺文案",
    "招募文案",
    "AI 招募",
    "employer branding",
    "job description optimizer",
    "人才招募",
    "雇主品牌優化",
    "職缺廣告",
  ],
  // 作者資訊
  authors: [{ name: "Employer Branding Optimizer" }],
  // 網站作者（方便 Google 識別）
  creator: "Employer Branding Optimizer",
  // Open Graph — 分享到 Facebook / LinkedIn 時的顯示設定
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app",
    siteName: "DanioJD",
    title: "雇主品牌優化系統 | 用 AI 打造頂尖人才磁鐵",
    description:
      "22 種企業風格 × AI 文案生成 × 中英雙語輸出。讓每一份職缺都成為吸引人才的品牌廣告。",
    images: [
      {
        url: "/og-image.png", // 請於 public/ 放置 1200x630 的 OG 圖片
        width: 1200,
        height: 630,
        alt: "雇主品牌優化系統",
      },
    ],
  },
  // Twitter Card 設定
  twitter: {
    card: "summary_large_image",
    title: "雇主品牌優化系統 | AI 職缺文案",
    description: "22 種企業風格 × AI 文案生成 × 中英雙語輸出",
    images: ["/og-image.png"],
  },
  // 爬蟲指示
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // 驗證碼（部署後填入，讓 Google Search Console 驗證網站所有權）
  // verification: {
  //   google: "your-google-site-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang 屬性對 SEO 與無障礙設計很重要
    <html lang="zh-TW" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
