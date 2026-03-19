import { NextRequest } from 'next/server';
import { companyStyles } from '@/lib/companyStyles';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const maxDuration = 30;

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

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: '🔑 ANTHROPIC_API_KEY 未設定，請至 Vercel Project Settings > Environment Variables 添加' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
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

    // 直接呼叫 Anthropic REST API（native fetch，Edge runtime 完全相容）
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

    // 在 stream 開始前先確認 API 是否成功，才能正確回傳錯誤碼
    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return new Response(
        JSON.stringify({ error: `Anthropic API 錯誤 (${apiRes.status})`, detail: errText }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 將 SSE 事件流轉換為純文字串流
    const encoder = new TextEncoder();
    const transform = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk, { stream: true });
        for (const line of text.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') return;
          try {
            const ev = JSON.parse(data);
            if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
              controller.enqueue(encoder.encode(ev.delta.text));
            }
          } catch {
            // 忽略無法解析的 SSE 行
          }
        }
      },
    });

    return new Response(apiRes.body!.pipeThrough(transform), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[API /generate]', message);
    return new Response(
      JSON.stringify({ error: '生成失敗', detail: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
