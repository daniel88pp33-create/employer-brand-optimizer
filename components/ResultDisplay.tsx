'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, Globe, Languages, FileText } from 'lucide-react';

interface ResultDisplayProps {
  rawResult: string;
  isGenerating: boolean;
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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
        copied
          ? 'bg-green-500/20 text-green-400 border border-green-500/40'
          : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-gray-200 hover:border-gray-600'
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

export default function ResultDisplay({ rawResult, isGenerating }: ResultDisplayProps) {
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh');
  const hasContent = rawResult.length > 0;
  const isStreaming = isGenerating && hasContent;
  const isDone = !isGenerating && hasContent;

  const parsed = isDone ? parseContent(rawResult) : null;

  // Empty state
  if (!hasContent && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center px-8 py-12">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-blue-500/20 flex items-center justify-center mb-6">
          <Sparkles className="w-9 h-9 text-blue-400/70" />
        </div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3">文案將在此顯示</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
          填寫左側的公司資訊與原始 JD，選擇一種品牌風格，
          <br />
          點擊「開始生成」即可獲得 AI 優化的雇主品牌文案
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['中英文對照', '22 種風格', '一鍵複製', '串流輸出'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-gray-800/80 border border-gray-700/60 text-gray-400 text-xs"
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
      <div className="flex flex-col h-full min-h-[500px]">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs text-blue-400 font-medium">AI 正在生成文案...</span>
        </div>
        <div className="flex-1 bg-gray-900/60 border border-gray-700/60 rounded-xl p-5 overflow-auto">
          <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans cursor-blink">
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
    <div className="flex flex-col h-full min-h-[500px] animate-fade-in">
      {/* Tab header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 bg-gray-900/80 border border-gray-700/60 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('zh')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'zh'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            中文版本
          </button>
          <button
            onClick={() => setActiveTab('en')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'en'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-400 hover:text-gray-200'
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
      <div className="flex-1 relative">
        {activeTab === 'zh' ? (
          <div className="h-full animate-slide-up">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs text-gray-500">LinkedIn / 104 / CakeResume 適用</span>
              {zhText && <CopyButton text={zhText} label="複製中文" copyKey="zh" />}
            </div>
            <div className="bg-gray-900/60 border border-gray-700/60 rounded-xl p-5 overflow-auto max-h-[calc(100vh-340px)] min-h-[380px]">
              <article>
                <pre className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {zhText || (
                    <span className="text-gray-500 italic">（中文版本未生成，請重試）</span>
                  )}
                </pre>
              </article>
            </div>
          </div>
        ) : (
          <div className="h-full animate-slide-up">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs text-gray-500">LinkedIn / Glassdoor / Indeed ready</span>
              {enText && <CopyButton text={enText} label="Copy English" copyKey="en" />}
            </div>
            <div className="bg-gray-900/60 border border-gray-700/60 rounded-xl p-5 overflow-auto max-h-[calc(100vh-340px)] min-h-[380px]">
              <article>
                <pre className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {enText || (
                    <span className="text-gray-500 italic">
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
      <div className="mt-3 flex items-center gap-1.5 text-gray-600 text-xs">
        <FileText className="w-3 h-3" />
        <span>複製後可直接貼到 LinkedIn 職缺、104 職務說明等欄位</span>
      </div>
    </div>
  );
}
