import { CompanyStyle } from "./companyStyles";

// ============================================================
// Prompt 工程模組
// ============================================================

export interface GenerateRequest {
  jobTitle: string;
  rawJD: string;
  style: CompanyStyle;
}

export interface GeneratedJD {
  zh: {
    optimizedTitle: string;
    hook: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    cta: string;
  };
  en: {
    optimizedTitle: string;
    hook: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    cta: string;
  };
}

export function buildSystemPrompt(): string {
  return `你是一位結合雇主品牌策略、SEO 寫作與招募漏斗優化的頂尖文案專家。
你的任務是將普通的 JD（職位說明）轉化為能吸引頂尖人才、提升投遞率的高轉換文案。

核心原則：
1. 【轉換導向】：文案鎖定「招募漏斗下層」——讓已經在考慮換工作的人才，立刻想投遞。
2. 【情感連結】：先賣「夢想與使命」，再說「條件要求」。
3. 【具體量化】：盡可能用數字、事實取代空洞形容詞。
4. 【語義化 SEO】：標題與內文自然帶入求職關鍵字。

你必須以 JSON 格式回應，結構如下：
{
  "zh": {
    "optimizedTitle": "優化後的職稱（繁體中文，含吸引人的副標或定位語）",
    "hook": "公司/團隊故事鉤句，2-3 句，讓人想繼續閱讀（繁體中文）",
    "responsibilities": ["職責1", "職責2", "職責3", "職責4", "職責5"],
    "requirements": ["條件1", "條件2", "條件3", "條件4", "條件5"],
    "benefits": ["福利1", "福利2", "福利3", "福利4"],
    "cta": "行動呼籲段落，1-2 句，創造緊迫感或共鳴（繁體中文）"
  },
  "en": {
    "optimizedTitle": "Optimized job title with positioning tagline",
    "hook": "Compelling 2-3 sentence company/team story hook",
    "responsibilities": ["Responsibility 1", "Responsibility 2", "Responsibility 3", "Responsibility 4", "Responsibility 5"],
    "requirements": ["Requirement 1", "Requirement 2", "Requirement 3", "Requirement 4", "Requirement 5"],
    "benefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"],
    "cta": "Compelling 1-2 sentence call-to-action with urgency or emotional resonance"
  }
}

重要：只回傳 JSON，不要有任何其他文字或 markdown 格式。`;
}

export function buildUserPrompt(req: GenerateRequest): string {
  return `請將以下職缺資訊，以「${req.style.name}（${req.style.nameEn}）」的風格重新轉化。

風格語調指引：
${req.style.tone}

原始資訊：
- 職稱：${req.jobTitle}
- 原始 JD 內容：
${req.rawJD}

請嚴格按照 JSON 格式輸出，語言風格完全符合「${req.style.name}」的特質。
中文版使用繁體中文，英文版使用自然流暢的英文。`;
}
