import { NextRequest } from 'next/server';
import { companyStyles } from '@/lib/companyStyles';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // 前端送來的欄位（對應 OptimizerForm.tsx）
    const { companyName, companyCulture, mission, jobTitle, originalJD, styleId, variationIndex = 0 } = body;

    if (!companyName || !jobTitle || !originalJD || !styleId) {
      return Response.json(
        { error: '請填寫所有必填欄位（公司名稱、職稱、原始 JD、風格）' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: 'ANTHROPIC_API_KEY 未設定' },
        { status: 500 }
      );
    }

    const style = companyStyles.find((s) => s.id === styleId);
    if (!style) {
      return Response.json({ error: '無效的風格選擇' }, { status: 400 });
    }

    const systemPrompt = `你是一位頂尖的雇主品牌（Employer Branding）文案專家，專門將普通的職缺說明轉化為讓頂尖人才主動投遞的高轉換文案。

核心寫作原則：
1. 職責描述要傳達「影響力」，而非只是羅列任務清單
2. 用具體、有畫面感的語言，避免「優秀的溝通能力」這類空洞描述
3. 先讓讀者感受到職位的使命與挑戰，再說要求條件
4. 職責必須忠實對應原始 JD 的實際工作內容，不能憑空捏造
5. 條件描述要具體：「具數字敏銳度，邏輯思維清楚，簡報提案能力佳」優於「具備優秀的溝通技巧」
6. 根據職位類型與企業風格，靈活選擇最合適的寫作格式（見下方四種格式範例）

━━━ 四種可用的職責寫作格式 ━━━

【格式 A：你將... 影響力導向】— 適合：科技新創、產品、工程、AI 職位
• 你將設計並主導核心用戶流程，確保每一個互動決策都有可量化的成效
• 你將與跨功能團隊協作，把研究洞察轉化為可上線的產品決策

【格式 B：段落式敘述 + 標題】— 適合：顧問、研究、管理類職位，強調深度
前後端系統設計與開發
在這個角色中，你將參與平台核心架構建設，專注於優化前後端互動，確保使用者體驗流暢。你是數位生態圈中不可或缺的一環。

AI 教材生成與學生追蹤功能開發
你將負責開發創新 AI 功能，幫助教師快速生成具文化脈絡的教材，讓學校管理變得更直觀。

【格式 C：數字編號 + 子項目】— 適合：行銷、營運、CRM、數據類職位
1）規劃 Lifecycle / Retention 策略
• 使用 CDP 與行為資料設計用戶分眾活動
• 規劃關鍵留存腳本：新客 Onboarding、回購、減少流失

2）以成效為導向持續優化
• 追蹤 Repeat purchase rate、LTV、Retention rate
• 規劃 A/B Test，找出真正有效的做法並持續放大

【格式 D：直接動詞開頭，簡潔有力】— 適合：業務、客戶成功、電商 KA 等執行導向職位
• 維護客戶關係，運用業績數據分析營運成效，協助客戶達成目標
• 根據市場趨勢定期進行客戶訪談，每次拜訪都帶回可執行的行動方案
• 蒐集市場與客戶回饋，提供產品團隊具體改善建議

━━━ 條件描述好壞對比 ━━━
✗ 空洞版本：「具備優秀的溝通技巧，善於團隊合作，學習能力強」
✓ 具體版本：「數據分析報告能力：具數字敏銳度，邏輯思維清楚，簡報提案能力佳」
✓ 具體版本：「問題解決能力：能快速分析問題，提供創新解決方案，曾處理過 OO 等類型挑戰」

━━━ 輸出格式（結構固定，內容格式彈性選擇）━━━
===中文版本===
【職稱 - 角色定位副標 | 公司名稱】

（2-3 句開場：說明這個職位的使命與挑戰，讓讀者感受到加入後能創造什麼。可以用「真正讓OO成功的，是...」、「這個角色不只是...，而是...」等鉤句開場）

（職責區塊標題，例如：你將負責 / 你將參與以下工作 / 核心工作內容）
（依職位類型選擇格式 A / B / C / D，5-7 條或段落，內容豐富有深度）

（條件區塊標題，例如：我們在尋找的你 / 你擁有）
（具體、有畫面感的條件描述，4-5 條，避免空洞形容詞）

（福利區塊標題，例如：加入我們，你將獲得 / 我們提供）
（具體福利與成長機會，4-5 條）

（1-2 句行動呼籲）

===English Version===
【Job Title - Role Positioning | Company Name】

（2-3 sentence compelling opening）

（Responsibilities section with appropriate format — "You will:" / numbered / descriptive paragraphs）
（5-7 impact-focused items or paragraphs）

（Requirements section: "Who you are:" / "What you bring:"）
（4-5 specific, vivid requirements）

（Benefits section: "What you'll gain:" / "We offer:"）
（4-5 specific items）

（1-2 sentence call-to-action）`;

    const userPrompt = `請以「${style.name}（${style.nameEn}）」的品牌風格，將以下職缺資訊轉化為高品質的雇主品牌文案。

風格語調：${style.tone}

公司資訊：
- 公司名稱：${companyName}
- 企業文化：${companyCulture || '（未提供）'}
- 使命願景：${mission || '（未提供）'}

職缺資訊：
- 職稱：${jobTitle}
- 原始 JD：
${originalJD}

要求：
1. 職責必須忠實對應原始 JD 的實際內容
2. 語氣完全符合「${style.name}」風格
3. 中文版用繁體中文，英文版用流暢英文
4. 嚴格按照格式輸出，以 ===中文版本=== 和 ===English Version=== 分隔${variationIndex > 0 ? `
5. 【重要】這是第 ${variationIndex + 1} 次生成，請產出與之前明顯不同的版本：開場角度不同、職責描述換不同切入點、結尾 call-to-action 用不同語氣。保持同等品質但讓候選人感受到是全新的文案。` : ''}`;

    // 呼叫 Anthropic API（串流，前端用 ReadableStream 接）
    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return Response.json(
        { error: `Anthropic API 錯誤 (${apiRes.status})`, detail: errText },
        { status: 502 }
      );
    }

    // 將 SSE 轉為純文字串流
    // 注意：decoder 必須跨 chunk 複用，否則中文 3-byte UTF-8 在 chunk 邊界會變亂碼
    const encoder = new TextEncoder();
    const decoder = new TextDecoder('utf-8', { fatal: false });
    let sseBuffer = '';

    const transform = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        // 用同一個 decoder 實例解碼，保留跨 chunk 的多位元組字元狀態
        sseBuffer += decoder.decode(chunk, { stream: true });
        const lines = sseBuffer.split('\n');
        // 最後一行可能不完整，保留到下一個 chunk
        sseBuffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') return;
          try {
            const ev = JSON.parse(data);
            if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
              controller.enqueue(encoder.encode(ev.delta.text));
            }
          } catch {
            // 忽略無法解析的行
          }
        }
      },
      flush(controller) {
        // 處理最後殘留的 buffer
        const remaining = decoder.decode() + sseBuffer;
        for (const line of remaining.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') return;
          try {
            const ev = JSON.parse(data);
            if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
              controller.enqueue(encoder.encode(ev.delta.text));
            }
          } catch {}
        }
      },
    });

    return new Response(apiRes.body!.pipeThrough(transform), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[API /generate] Error:', message);
    return Response.json(
      { error: '生成失敗，請稍後再試', detail: message },
      { status: 500 }
    );
  }
}
