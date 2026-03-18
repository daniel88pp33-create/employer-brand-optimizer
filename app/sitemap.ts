// ============================================================
// app/sitemap.ts — 自動生成 Sitemap
// Next.js 會將此檔案轉換為 /sitemap.xml，讓搜尋引擎更好地爬取
// ============================================================

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1, // 首頁優先級最高
    },
    // 如果未來新增更多頁面，在此繼續新增
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.5,
    // },
  ];
}
