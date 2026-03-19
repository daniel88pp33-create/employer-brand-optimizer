# DanioJD - AI 職缺文案轉換器

## 專案概述
網站：https://employer-brand-optimizer.vercel.app/
GitHub：https://github.com/[你的帳號]/employer-brand-optimizer
框架：Next.js 14 App Router + Tailwind CSS
部署：Vercel（推送到 main 分支即自動部署）

## 核心架構

### 重要：頁面使用的元件組合
- 主頁面：`app/page.tsx`
- **表單元件**：`components/OptimizerForm.tsx`（NOT JDOptimizer.tsx）
- **結果顯示**：`components/ResultDisplay.tsx`（NOT JDOutput.tsx）
- **API 端點**：`app/api/generate/route.ts`

### API 端點重要設定
```typescript
export const runtime = 'edge';   // 必須是 edge，否則會 timeout
export const maxDuration = 30;
```

### 前端傳給 API 的欄位名稱（必須一致！）
```json
{ "companyName", "companyCulture", "mission", "jobTitle", "originalJD", "styleId" }
```

### API 回傳格式
- 純文字 SSE 串流（不是 JSON）
- 中英文用分隔符分開：
  ```
  ===中文版本===
  [中文內容]
  ===English Version===
  [英文內容]
  ```

### UTF-8 串流處理（關鍵！勿改動）
```typescript
// 必須共用同一個 decoder 實例，否則中文會亂碼
const decoder = new TextDecoder('utf-8', { fatal: false });
let sseBuffer = '';
// 在 TransformStream.transform() 中：
sseBuffer += decoder.decode(chunk, { stream: true });
```

## 主要檔案說明

| 檔案 | 用途 |
|------|------|
| `app/page.tsx` | 主頁面，含 header/footer/功能介紹 |
| `app/layout.tsx` | 根 metadata（title, description） |
| `app/api/generate/route.ts` | Anthropic API 串流端點 |
| `components/OptimizerForm.tsx` | 表單（公司名、文化、職稱、原始JD、風格選擇） |
| `components/ResultDisplay.tsx` | 結果顯示，分中英文 tab |
| `components/DanioJDLogo.tsx` | SVG Logo 元件 |
| `lib/companyStyles.ts` | 22 種公司風格設定 |
| `lib/prompts.ts` | AI Prompt 工程，AmazingTalker 風格 |

## 品牌設定
- 品牌名稱：**DanioJD**（前身 BrandJD，已全面更新）
- Logo：`components/DanioJDLogo.tsx`（inline SVG）
- 主色：Navy `#1A2A6C`、Teal `#00B4A6`
- Header：`bg-white shadow-sm`（白底，讓 logo 清晰可見）

## 環境變數
- `.env.local`：本地開發用（已設定 ANTHROPIC_API_KEY）
- Vercel：需在 Dashboard > Settings > Environment Variables 設定
  - 變數名：`ANTHROPIC_API_KEY`
  - 值：只填 API key 本身（**不要**加 `ANTHROPIC_API_KEY=` 前綴！）

## 常見錯誤與解法

### HTTP 500
1. 確認 Vercel env var 只有 key 值，沒有前綴
2. 確認 `runtime = 'edge'` 有設定
3. 不要使用 `thinking` 參數（Anthropic API 不支援）
4. 不要用 Anthropic SDK 的 `.messages.stream()`（Edge runtime 不相容），改用 native `fetch`

### 「請填寫所有必填欄位」但已填完
- 檢查 API 讀取的欄位名稱是否和前端送出的一致
- 前端送 `originalJD`，API 就要讀 `originalJD`（不是 `rawJD`）

### 中文亂碼
- `TextDecoder` 必須是共用實例（不能每個 chunk 各自 new）
- 要用 `sseBuffer` 累積不完整的 SSE 行

## 開發流程
```bash
npm run dev          # 本地開發 http://localhost:3000
git add -A
git commit -m "..."
git push             # 自動觸發 Vercel 部署
```
