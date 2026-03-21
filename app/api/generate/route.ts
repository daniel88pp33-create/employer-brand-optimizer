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
1. 每條職責都以「你將...」開頭，說明這件事帶來的影響，而非只是任務描述
2. 用具體、有畫面感的語言，避免「優秀的溝通能力」這類空洞描述
3. 先讓讀者感受到職位的使命與挑戰，再說要求條件
4. 職責必須忠實對應原始 JD 的實際工作內容，不能憑空捏造
5. 條件描述要具體而非空洞：「具數字敏銳度，邏輯思維清楚，簡報提案能力佳」優於「具備優秀的溝通技巧」
6. 適時加入角色定位說明，讓候選人理解為何這個職位很重要

參考範例一（AmazingTalker — 產品設計）：
開場鉤句：「身為 AmazingTalker 的 Product Designer，你將在既定的產品目標下，對特定產品成果與市場表現負責，並參與成功策略在不同市場或情境中的複製與擴展。這個角色不只關注設計是否被完成，而是關注設計決策是否真的帶來可驗證的成果。」
職責範例：「你將依據使用者行為與各市場的在地化差異，進行設計判斷與優化，並持續調整策略直到達到或超越成熟市場的數據表現」

參考範例二（電商 KA 客戶管理 — 數據與關係導向）：
職責範例：「你將維護客戶關係，運用業績數據及分析營運成效，協助客戶提升業績營收並達成目標，而非只是例行性的客服聯絡」
職責範例：「你將根據市場零售趨勢，定期進行客戶訪談與建議，提供有效的營運優化建議，讓每一次拜訪都能帶回可執行的行動方案」
條件描述範例：「數據分析報告能力：具數字敏銳度，邏輯思維清楚，簡報提案能力佳」、「問題解決能力：能快速分析問題，並提供創新的解決方案」

參考範例三（教育科技全端工程師 — 遠端、使命導向）：
開場方式：先說明加入後能參與什麼樣的任務，再詳述每項工作的深度與影響
職責範例：「你將參與平台核心架構建設，專注於優化前後端互動，確保使用者體驗流暢。無論是客戶端的精美介面，還是後台資料處理的邏輯設計，你都是數位教學資源生態圈中不可或缺的一環」
職責範例：「你將負責開發創新的 AI 功能，幫助教師快速生成具文化脈絡的教材，並有效追蹤學生進度，讓學校管理變得更直觀」

參考範例四（數位行銷 Retention — 品牌使命＋角色定位清晰）：
開場方式：先說明品牌使命與文化，讓候選人感受到加入後的工作環境
角色定位說明：「真正讓品牌穩定成長的，是讓用戶願意回來、願意再買、願意留下來。這不是只發 EDM 的角色，你會同時負責策略規劃 + 實際執行 + 成效優化，而且你做的每一個流程，都會直接影響回購率與留存率」
職責範例帶具體指標：「你將追蹤並分析 Repeat purchase rate、Retention rate、回購轉換、LTV，規劃並執行 A/B Test（內容、時機、優惠、流程），找出哪些 Lifecycle 做法真的有效，並持續放大」

輸出格式（嚴格遵守）：
===中文版本===
【職稱 - 角色定位副標 | 公司名稱】

（2-3 句開場鉤句：說明這個職位的使命與挑戰，讓讀者感受到加入後能創造什麼）

你將需要能夠：
• 你將...（具體說明影響，不只是任務，5-6 條）
• 你將...
• 你將...
• 你將...
• 你將...

我們在尋找的你：
• （具體、有畫面感的條件描述，4-5 條，避免空洞形容詞）
• ...

加入我們，你將獲得：
• （具體福利與成長機會，4-5 條）
• ...

（1-2 句行動呼籲，創造共鳴）

===English Version===
【Job Title - Role Positioning | Company Name】

（2-3 sentence compelling opening about the role's mission and challenge）

You will:
• You will... (impact-focused, 5-6 items)
• You will...
• You will...
• You will...
• You will...

Who you are:
• （specific, vivid requirements, 4-5 items）
• ...

What you'll gain:
• （specific benefits and growth opportunities, 4-5 items）
• ...

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
