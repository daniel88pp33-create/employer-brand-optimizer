import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開啟嚴格模式，有助於發現潛在問題
  reactStrictMode: true,
  // 確保圖片可從外部來源載入（如需要時取消註解並填入來源）
  // images: {
  //   domains: ['your-image-domain.com'],
  // },
};

export default nextConfig;
