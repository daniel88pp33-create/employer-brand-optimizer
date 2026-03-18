import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { companyStyles } from '@/lib/companyStyles';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// 版本標記 - v2 修正錯誤處理
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, companyCulture, mission, jobTitle, originalJD, styleId } = body;

    if (!companyName || !jobTitle || !originalJD || !styleId) {
      return new Response(JSON.stringify({ error: '請填寫所有必填欄位（公司名稱、職稱、原始 JD、風格）' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const style = companyStyles.find((s) => s.id === styleId);
    if (!style) {
      return new Response(JSON.stringify({ error: '無效的風格選擇' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `你是一位頂尖的雇主品牌（Employer Branding）文案專家，精通中英文雙語，擅長招募行銷（Recruitment Marketing）。

你的核心專長：
1. 將普通的職位描述轉化為令人心動的品牌故事
2. 使用「招募漏斗下層」（Bottom-of-Funnel）轉換導向策略，讓候選人願意立即採取行動
3. 根據不同企業風格，精準調整語氣、用詞和敘事框架
4. 產出符合 LinkedIn、104、CakeResume 等平台的專業格式

重要原則：
- 避免空洞的形容詞，使用具體、有力的語言
- 以候選人的視角撰寫，聚焦「對我有什麼好處」（WIIFM - What's In It For Me）
- 創造情感共鳴，讓候選人感覺這個職位就是為他們量身打造的
- 同時展現工作的挑戰性和成長性`;

    const userPrompt = `## 公司資訊
公司名稱：${companyName}
企業文化：${companyCulture || '（未提供，請根據所選風格發揮創意詮釋）'}
使命願景：${mission || '（未提供，請根據所選風格發揮創意詮釋）'}
招募職稱：${jobTitle}

## 原始職位描述（JD）
${originalJD}

## 目標品牌風格
風格：${style.name} ${style.emoji}
風格說明：${style.tone}

## 輸出格式（嚴格遵守）
必須輸出以下兩個版本，用分隔符區分，不要加任何其他說明文字：

===中文版本===
【${jobTitle}｜${companyName}】

（在此撰寫完整中文雇主品牌文案，約 500-700 字，段落之間空行分隔，結構如下：
- 引人入勝的開場段落：描繪加入後的願景或挑戰（不要只是介紹公司）
- 「為什麼這個職位值得你」：2 段，強調獨特價值主張，帶出 ${style.name} 的風格特質
- 「你將會做的事」：5-6 個要點，用「你將...」格式，聚焦影響力而非任務列表
- 「我們在尋找的你」：4-5 個特質描述，要有畫面感而不只是硬條件
- 「加入我們，你將獲得」：4-5 個具體福利與成長機會
- 強而有力的行動號召：1-2 句，帶有品牌風格）

===English Version===
【${jobTitle} | ${companyName}】

（Write complete English employer branding copy, ~500-700 words, with paragraph breaks, structured as:
- Compelling opening: paint a vivid vision of what joining means (not just company intro)
- "Why this role deserves your attention": 2 paragraphs, unique value propositions in ${style.name} style
- "What you'll do": 5-6 bullet points using "You will..." format, focusing on impact not just tasks
- "Who you are": 4-5 vivid characteristics, not just requirement checkboxes
- "What you'll gain": 4-5 specific benefits and growth opportunities
- Strong call to action: 1-2 sentences with brand voice）`;

    const streamResponse = anthropic.messages.stream({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResponse) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    // 詳細的錯誤處理與追蹤
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = err instanceof Error ? err.message : String(err);
    
    console.error('[API /generate] Error Status Time:', new Date().toISOString());
    console.error('[API /generate] Error Type:', err?.constructor.name);
    console.error('[API /generate] Error Message:', errorMessage);
    console.error('[API /generate] Full Error:', err);

    // 檢查 API Key 是否存在
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('[API /generate] Missing ANTHROPIC_API_KEY');
      return new Response(
        JSON.stringify({
          error: '🔑 環境變數配置錯誤',
          detail: 'ANTHROPIC_API_KEY 未正確設定。若在 Vercel 部署，請在 Project Settings > Environment Variables 中添加此變數。',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Anthropic API 錯誤
    if (err instanceof Anthropic.APIError) {
      console.error('[API /generate] Anthropic API Error:', {
        status: err.status,
        message: err.message,
      });

      if (err.status === 401) {
        return new Response(
          JSON.stringify({
            error: '❌ API Key 無效或已過期',
            detail: '請確認 ANTHROPIC_API_KEY 設定正確，或重新申請新的 API Key',
            ...(isDevelopment && { originalError: errorMessage }),
          }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (err.status === 429) {
        return new Response(
          JSON.stringify({
            error: 'API 請求過於頻繁',
            detail: '請稍後再試，您可能已達到 API 使用限額。',
          }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (err.status === 500) {
        return new Response(
          JSON.stringify({
            error: 'Anthropic API 伺服器錯誤',
            detail: 'Claude API 服務暫時不可用，請稍後重試。',
            ...(isDevelopment && { originalError: errorMessage }),
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 網路錯誤
    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('timeout') || errorMessage.includes('network')) {
      console.error('[API /generate] Network Error');
      return new Response(
        JSON.stringify({
          error: '🌐 網路連線錯誤',
          detail: '無法連接到 Claude API，請檢查網路連線或稍後重試。',
          ...(isDevelopment && { originalError: errorMessage }),
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 預設通用錯誤
    console.error('[API /generate] Unexpected Error - Please check server logs');
    return new Response(
      JSON.stringify({
        error: '生成失敗',
        detail: '系統遇到未預期的錯誤，請檢查伺服器日誌或聯繫管理員。',
        ...(isDevelopment && { 
          errorType: err?.constructor.name,
          message: errorMessage,
        }),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
