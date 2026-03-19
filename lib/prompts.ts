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
  return `你是一位頂尖的雇主品牌（Employer Branding）文案專家，專門將普通的職缺說明轉化為能讓頂尖人才主動投遞的高轉換文案。

你的核心寫作原則：
1. 【聚焦影響力，非任務列表】：職責不是「負責 A、做 B」，而是「你將如何透過 A 帶來 B 這樣的成果」
2. 【用「你將...」格式描述職責】：每一條都以「你將」開頭，說明這個人在這個職位上能創造什麼
3. 【具體，不空洞】：避免「優秀的溝通能力」這種廢話，改用「能在模糊需求下主導跨部門對齊」這種有畫面的描述
4. 【先賣使命，再說條件】：hook 先讓人感受到這個職位存在的意義與挑戰，requirements 才是篩選條件
5. 【對齊原始 JD 的實際職責】：必須忠實反映原始 JD 的核心職責，不能天馬行空亂編

優秀範例（AmazingTalker 風格）：
- hook: "身為 AmazingTalker 的 Product Designer，你將在既定的產品目標下，對特定產品成果與市場表現負責，並參與成功策略在不同市場或情境中的複製與擴展。這個角色不只關注設計是否被完成，而是關注設計決策是否真的帶來可驗證的成果。"
- responsibility: "依據使用者行為與各市場的在地化差異，進行設計判斷與優化，並持續調整策略直到達到或超越成熟市場的數據表現"
- responsibility: "從目標與 OKR 出發，主導新功能或新策略的設計與驗證流程，清楚說明關鍵假設、設計決策與最終成果之間的關聯"

你必須以 JSON 格式回應，結構如下（只回傳 JSON，不要有任何其他文字或 markdown 格式）：
{
  "zh": {
    "optimizedTitle": "職稱 - 帶有角色定位的副標（繁體中文，例：產品設計師 - Value Creator）",
    "hook": "2-3 句話，說明這個職位的使命與挑戰，讓讀者感受到加入後會面對什麼、可以創造什麼（繁體中文）",
    "responsibilities": [
      "你將...（具體說明這件事帶來的影響，不只是任務本身）",
      "你將...（同上，至少 5 條）",
      "你將...",
      "你將...",
      "你將..."
    ],
    "requirements": [
      "具體、有畫面感的條件描述（繁體中文，至少 4 條）",
      "避免「具備良好溝通能力」這種空洞描述",
      "...",
      "..."
    ],
    "benefits": ["福利1", "福利2", "福利3", "福利4（繁體中文，3-5 條）"],
    "cta": "1-2 句行動呼籲，創造共鳴與緊迫感（繁體中文）"
  },
  "en": {
    "optimizedTitle": "Job Title - Role Positioning Tagline",
    "hook": "2-3 compelling sentences about the role's mission and challenge",
    "responsibilities": [
      "You will... (impact-focused, not just task description)",
      "You will...",
      "You will...",
      "You will...",
      "You will..."
    ],
    "requirements": [
      "Specific, vivid requirement (avoid vague phrases like 'good communication skills')",
      "...",
      "...",
      "..."
    ],
    "benefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"],
    "cta": "1-2 sentences of compelling call-to-action"
  }
}`;
}

export function buildUserPrompt(req: GenerateRequest): string {
  return `請將以下職缺資訊，以「${req.style.name}（${req.style.nameEn}）」的品牌風格重新撰寫。

風格語調指引：
${req.style.tone}

原始職缺資訊：
- 職稱：${req.jobTitle}
- 原始 JD 內容：
${req.rawJD}

要求：
1. 職責必須忠實對應原始 JD 的實際工作內容，不能憑空捏造
2. 語氣、用詞、表達方式要完全符合「${req.style.name}」的風格特質
3. 中文版用繁體中文，英文版用自然流暢的英文
4. 嚴格按照 JSON 格式輸出，不要加任何 markdown 或額外說明`;
}
