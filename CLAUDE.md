# DanioJD — 完整專案記憶文件

> 每次新開 Claude Code 對話時，請先讀這份文件，裡面記錄了所有重要決策、架構、已知問題與未來方向。

---

## 基本資訊

| 項目 | 內容 |
|------|------|
| 產品名稱 | **DanioJD** |
| 定位 | AI 雇主品牌 JD 優化工具 |
| 網站 | https://employer-brand-optimizer.vercel.app/ |
| GitHub | https://github.com/daniel88pp33-create/employer-brand-optimizer |
| 框架 | Next.js 15 App Router + TypeScript + Tailwind CSS |
| 部署 | Vercel（Hobby 免費方案） |
| AI 模型 | Anthropic Claude `claude-sonnet-4-6` |

---

## 核心架構（重要！）

### 頁面元件組合
```
app/page.tsx                    ← 主頁面（Server Component）
  ├── components/LandingHero.tsx  ← 全螢幕動畫首頁（Client Component）
  ├── components/OptimizerForm.tsx ← 表單主體（Client Component）← 實際使用這個
  │     ├── components/StyleSelector.tsx  ← 風格選擇器
  │     └── components/ResultDisplay.tsx  ← 結果顯示（分 tab）
  ├── components/FaqAccordion.tsx ← FAQ 手風琴（Client Component）
  └── components/DanioJDLogo.tsx  ← SVG Logo 元件
```

> ⚠️ 注意：`JDOptimizer.tsx` 和 `JDOutput.tsx` 是舊元件，**頁面沒有使用它們**。

### API 端點
- 路徑：`app/api/generate/route.ts`
- Runtime：**Edge**（必須，否則 Vercel Hobby 會 10 秒 timeout）
- 串流方式：原生 `fetch` + `TransformStream`（不用 Anthropic SDK，Edge runtime 不相容）

---

## 前端 → API 欄位名稱對應（必須一致！）

```typescript
// OptimizerForm.tsx 送出的欄位
{
  companyName: string,
  companyCulture: string,   // 選填
  mission: string,          // 選填
  jobTitle: string,
  originalJD: string,
  styleId: string,
  variationIndex: number,   // 0 = 第一次, 1+ = 重新生成
}
```

---

## API 串流重要細節（勿改動）

```typescript
// 必須共用同一個 decoder 實例，否則中文在 chunk 邊界會亂碼
const decoder = new TextDecoder('utf-8', { fatal: false });
let sseBuffer = '';

// TransformStream 裡：
sseBuffer += decoder.decode(chunk, { stream: true });
const lines = sseBuffer.split('\n');
sseBuffer = lines.pop() ?? '';  // 保留不完整的行
```

---

## 輸出格式

AI 回傳純文字，用分隔符區分中英文：
```
===中文版本===
[中文 JD 內容]

===English Version===
[英文 JD 內容]
```

`ResultDisplay.tsx` 用這兩個分隔符解析內容，分成兩個 tab 顯示。

---

## 品牌設定

| 項目 | 值 |
|------|----|
| 品牌名稱 | DanioJD（前身 BrandJD） |
| Logo | `components/DanioJDLogo.tsx`（inline SVG） |
| 主色 Navy | `#1A2A6C` |
| 主色 Teal | `#00B4A6` |
| Header 背景 | `bg-white shadow-sm`（白底，Logo 才清晰） |
| Footer 背景 | `bg-slate-900` |

---

## 環境變數

| 變數 | 說明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 金鑰（只填 key 本身，不加前綴！）|
| `NEXT_PUBLIC_SITE_URL` | 網站網址（影響 sitemap / canonical URL）|

**Vercel 設定：** Dashboard → Settings → Environment Variables
**重要：** 值只填 `sk-ant-api03-...`，不要填 `ANTHROPIC_API_KEY=sk-ant-...`

---

## 風格系統

- 檔案：`lib/companyStyles.ts`
- 目前：**20 種風格**（已刪除「開源社群」和「軍事國防」）
- 已移除所有名稱中的「風」字（例如：矽谷新創風 → 矽谷新創）

---

## 已完成的功能清單

- [x] AI 串流生成中英雙語 JD
- [x] 20 種企業風格選擇
- [x] 重新生成按鈕（帶 variationIndex，要求明顯不同版本）
- [x] 分 tab 顯示中英文，各自有複製按鈕
- [x] Landing Hero 動畫頁（JD 卡片從四方飛入）
- [x] FAQ 手風琴（點擊展開）
- [x] SEO：JSON-LD（SoftwareApplication + FAQPage + WebSite schema）
- [x] SEO：OpenGraph + Twitter Card meta tags
- [x] SEO：sitemap.xml 自動生成
- [x] AI 免責但書文字（在複製提示與重新生成按鈕之間）
- [x] 平台標籤：LinkedIn / 104 / Yourator 適用

---

## 待做功能（優先順序）

### 🔥 高優先
- [ ] **分區複製按鈕**：按內容區塊（開場 / 職責 / 條件 / 福利）分別複製，方便貼到各平台不同欄位
- [ ] **OG Image**：製作 1200×630px 品牌圖，提升社群分享點擊率
- [ ] **Domain 購買**：建議 `daniojd.com`，買好後更新 `NEXT_PUBLIC_SITE_URL`

### 🚀 中優先
- [ ] **Email 訂閱**：收集 HR 用戶 Email（需符合個資法：主動勾選 + 取消訂閱機制）
- [ ] **Google Analytics 4**：追蹤用戶行為
- [ ] **Google Search Console**：提交 sitemap，監控搜尋排名

### 💡 長期方向
- [ ] **JD 健檢功能**：貼入現有 JD，AI 給分並提供改善建議（不用生成新的）
- [ ] **Chrome Extension**：偵測 104 / Yourator 表單，自動填入對應欄位
- [ ] **儲存歷史紀錄**：localStorage 保存生成過的 JD
- [ ] **LinkedIn 官方 API**：需達到一定用戶量才能申請合作

---

## 商業模式思考

### 目前的護城河（誠實評估）
- ❌ 技術護城河：無（任何工程師一天內可複製）
- 🔄 建立中：台灣招募市場的 Prompt 深度優化
- 🎯 目標：數據護城河（哪種風格效果最好） + 品牌口碑

### 真正的差異化方向
1. **垂直專精**：比通用 AI 更懂台灣 104 / Yourator 格式和候選人心理
2. **最短路徑**：生成 → 分區複製 → 貼到平台 → 發佈，5 分鐘完成
3. **數據回饋**：追蹤哪些 JD 投遞率高，反饋優化 Prompt

### 費用現況
| 服務 | 費用 |
|------|------|
| Anthropic API | ~$0.03 / 次生成（$5 點數約可生成 150-200 次）|
| Vercel | $0（Hobby 方案）|
| GitHub | $0 |
| Domain | 尚未購買，建議 Cloudflare Registrar ~$12/年 |

---

## 已知問題 / 踩過的坑

| 問題 | 原因 | 解法 |
|------|------|------|
| HTTP 500 | Vercel Hobby 10s timeout | 改用 `runtime = 'edge'` |
| HTTP 500 | Anthropic SDK `.stream()` 在 Edge 不相容 | 改用原生 `fetch` |
| 401 invalid key | Vercel env var 存了 `KEY=value` 格式 | 只存 value 本身 |
| 中文亂碼 | `new TextDecoder()` 每個 chunk 各自 new | 共用同一個 decoder 實例 |
| 「請填寫所有欄位」但已填完 | API 讀 `rawJD`，前端送 `originalJD` | 統一欄位名稱 |
| Logo 在深色 Header 看不見 | Logo 是深色 | Header 改為白色 |

---

## 開發流程

```bash
cd /c/Users/user/employer-brand-optimizer
npm run dev        # 本地開發 http://localhost:3000

git add [files]
git commit -m "..."
git push           # 自動觸發 Vercel 部署（約 1 分鐘）
```

---

## 重要的 Prompt 架構

**System Prompt 核心原則（`app/api/generate/route.ts`）：**
- 用具體、有畫面感的語言，避免空洞描述
- 先呈現職位使命與挑戰，再說條件要求
- 職責格式靈活：可用「你將...」開頭，也可用段落式或數字清單，根據職位類型調整
- 四個參考範例：AmazingTalker（產品設計）/ 電商 KA / 教育科技工程師 / MarTech Retention

**variationIndex 邏輯：**
- 0 = 正常生成
- 1+ = 加入指令要求「開場角度不同、職責換切入點、CTA 換語氣」

---

## Claude.ai Projects 設定建議

如果要在 **claude.ai 網頁版** 建立 Project：
1. 前往 claude.ai → 左側 Projects → New Project
2. 名稱：`DanioJD 開發專案`
3. 上傳這份 `CLAUDE.md`
4. Project Instructions 貼上：「你是我的全端開發夥伴，負責維護 DanioJD 這個 Next.js 專案。每次對話請先確認 CLAUDE.md 的內容。回應請用繁體中文。」
5. 之後在 Project 裡開新對話，上下文會自動帶入

---

*最後更新：2026-03-30*
