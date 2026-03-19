import { NextRequest } from 'next/server';
import { companyStyles } from '@/lib/companyStyles';
import { buildSystemPrompt, buildUserPrompt, GeneratedJD } from '@/lib/prompts';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // 前端送來的欄位：jobTitle, rawJD, styleId
    const { jobTitle, rawJD, styleId } = body;

    if (!jobTitle || !rawJD || !styleId) {
      return Response.json(
        { error: '請填寫所有必填欄位（職稱、原始 JD、風格）' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: 'ANTHROPIC_API_KEY 未設定，請至 Vercel Project Settings > Environment Variables 添加' },
        { status: 500 }
      );
    }

    const style = companyStyles.find((s) => s.id === styleId);
    if (!style) {
      return Response.json({ error: '無效的風格選擇' }, { status: 400 });
    }

    // 呼叫 Anthropic API（非 streaming，前端用 response.json() 接）
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
        system: buildSystemPrompt(),
        messages: [
          {
            role: 'user',
            content: buildUserPrompt({ jobTitle, rawJD, style }),
          },
        ],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('[API /generate] Anthropic error:', apiRes.status, errText);
      return Response.json(
        { error: `Anthropic API 錯誤 (${apiRes.status})`, detail: errText },
        { status: 502 }
      );
    }

    const anthropicData = await apiRes.json() as {
      content: Array<{ type: string; text: string }>;
    };

    const rawText = anthropicData.content
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('');

    // 解析 AI 回傳的 JSON（移除可能的 markdown code block）
    const cleaned = rawText.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
    const result: GeneratedJD = JSON.parse(cleaned);

    return Response.json({ data: result });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[API /generate] Error:', message);
    return Response.json(
      { error: '生成失敗，請稍後再試', detail: message },
      { status: 500 }
    );
  }
}
