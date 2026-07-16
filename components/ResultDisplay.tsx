'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, Globe, Languages, FileText, RefreshCw } from 'lucide-react';

interface ResultDisplayProps {
  rawResult: string;
  isGenerating: boolean;
  onRegenerate?: () => void;
}

interface ParsedContent {
  chinese: string;
  english: string;
}

function parseContent(raw: string): ParsedContent {
  const SEP_ZH = '===中文版本===';
  const SEP_EN = '===English Version===';

  const idxZh = raw.indexOf(SEP_ZH);
  const idxEn = raw.indexOf(SEP_EN);

  if (idxZh !== -1 && idxEn !== -1) {
    return {
      chinese: raw.slice(idxZh + SEP_ZH.length, idxEn).trim(),
      english: raw.slice(idxEn + SEP_EN.length).trim(),
    };
  }
  if (idxZh !== -1) {
    return { chinese: raw.slice(idxZh + SEP_ZH.length).trim(), english: '' };
  }
  if (idxEn !== -1) {
    return { chinese: '', english: raw.slice(idxEn + SEP_EN.length).trim() };
  }
  return { chinese: raw, english: '' };
}

function CopyButton({ text, label, copyKey }: { text: string; label: string; copyKey: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
        copied
          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
          : 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          已複製！
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          {label}
        </>
      )}
    </button>
  );
}

export default function ResultDisplay({ rawResult, isGenerating, onRegenerate }: ResultDisplayProps) {
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh');
  const hasContent = rawResult.length > 0;
  const isStreaming = isGenerating && hasContent;
  const isDone = !isGenerating && hasContent;

  const parsed = isDone ? parseContent(rawResult) : null;

  // Empty state
  if (!hasContent && !isGenerating) {
    return (
      <div className="flex h-full min-h-[500px] flex-col items-center justify-center px-8 py-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center border border-neutral-200">
          <Sparkles className="h-7 w-7 text-accent-strong" />
        </div>
        <h3 className="mb-3 text-lg font-semibold text-neutral-900">文案將在此顯示</h3>
        <p className="max-w-sm text-sm leading-relaxed text-slate-500">
          填寫左側的公司資訊與原始 JD，選擇一種品牌風格，
          <br />
          點擊「開始生成」即可獲得 AI 優化的雇主品牌文案
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['中英文對照', '20 種風格', '一鍵複製', '串流輸出'].map((tag) => (
            <span
              key={tag}
              className="border border-neutral-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Streaming state (showing raw text as it arrives)
  if (isStreaming && !isDone) {
    return (
      <div className="flex h-full min-h-[500px] flex-col">
        <div className="mb-4 flex items-center gap-2 px-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-strong"></span>
          </span>
          <span className="font-mono text-xs font-medium text-accent-strong">AI 正在生成文案...</span>
        </div>
        <div className="flex-1 overflow-auto border border-neutral-200 bg-neutral-50 p-5">
          <pre className="cursor-blink whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-700">
            {rawResult}
          </pre>
        </div>
      </div>
    );
  }

  // Done state with tabs
  const zhText = parsed?.chinese || '';
  const enText = parsed?.english || '';
  const allText = `【中文版本】\n\n${zhText}\n\n\n【English Version】\n\n${enText}`;

  return (
    <div className="flex h-full min-h-[500px] flex-col animate-fade-in">
      {/* Tab header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex border border-neutral-200">
          <button
            onClick={() => setActiveTab('zh')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-colors ${
              activeTab === 'zh'
                ? 'bg-neutral-900 text-white'
                : 'text-slate-500 hover:text-neutral-900'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            中文版本
          </button>
          <button
            onClick={() => setActiveTab('en')}
            className={`flex items-center gap-1.5 border-l border-neutral-200 px-4 py-2 text-sm font-bold transition-colors ${
              activeTab === 'en'
                ? 'bg-neutral-900 text-white'
                : 'text-slate-500 hover:text-neutral-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            English
          </button>
        </div>

        {/* Copy all button */}
        <CopyButton text={allText} label="複製全部" copyKey="all" />
      </div>

      {/* Content area */}
      <div className="relative flex-1">
        {activeTab === 'zh' ? (
          <div className="h-full animate-slide-up">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs text-slate-500">LinkedIn / 104 / Yourator 適用</span>
              {zhText && <CopyButton text={zhText} label="複製中文" copyKey="zh" />}
            </div>
            <div className="max-h-[calc(100vh-340px)] min-h-[380px] overflow-auto border border-neutral-200 bg-neutral-50 p-5">
              <article>
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-800">
                  {zhText || (
                    <span className="italic text-slate-400">（中文版本未生成，請重試）</span>
                  )}
                </pre>
              </article>
            </div>
          </div>
        ) : (
          <div className="h-full animate-slide-up">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs text-slate-500">LinkedIn / Glassdoor / Indeed ready</span>
              {enText && <CopyButton text={enText} label="Copy English" copyKey="en" />}
            </div>
            <div className="max-h-[calc(100vh-340px)] min-h-[380px] overflow-auto border border-neutral-200 bg-neutral-50 p-5">
              <article>
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-800">
                  {enText || (
                    <span className="italic text-slate-400">
                      (English version not generated, please try again)
                    </span>
                  )}
                </pre>
              </article>
            </div>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
        <FileText className="w-3 h-3" />
        <span>複製後可直接貼到 LinkedIn 職缺、104 職務說明等欄位</span>
      </div>

      {/* Disclaimer */}
      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        AI 產出的內容主要是用來作為優化職缺敘述的初步框架與參考版本。企業仍需依據自身實際營運需求，以及所在地的相關法規進行調整與補充，才能打造出最貼近團隊需求的人才招募內容。
      </p>

      {/* Regenerate button */}
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="mt-4 flex w-full items-center justify-center gap-2 border border-neutral-300 px-4 py-2.5 text-sm font-bold text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
        >
          <RefreshCw className="w-4 h-4" />
          重新生成（產出不同版本）
        </button>
      )}
    </div>
  );
}
