// ============================================================
// app/robots.ts — Robots.txt 設定
// Next.js 會自動轉換為 /robots.txt，告訴爬蟲哪些頁面可以爬
// ============================================================

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",       // 適用所有爬蟲
        allow: "/",           // 允許爬取所有頁面
        disallow: "/api/",    // 禁止爬取 API 路由（節省爬蟲資源）
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // 告訴搜尋引擎 Sitemap 位置
  };
}
