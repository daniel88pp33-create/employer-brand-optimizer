'use client';

import { useState } from 'react';
import {
  Building2,
  Heart,
  Target,
  Briefcase,
  FileText,
  Sparkles,
  Loader2,
  AlertCircle,
  Palette,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { companyStyles } from '@/lib/companyStyles';
import StyleSelector from './StyleSelector';
import ResultDisplay from './ResultDisplay';

interface FormData {
  companyName: string;
  companyCulture: string;
  mission: string;
  jobTitle: string;
  originalJD: string;
  styleId: string;
}

const INITIAL_FORM: FormData = {
  companyName: '',
  companyCulture: '',
  mission: '',
  jobTitle: '',
  originalJD: '',
  styleId: '',
};

const PLACEHOLDER_JD = `例如：
• 負責前端產品開發與優化
• 與產品、設計團隊緊密協作
• 3 年以上 React 開發經驗
• 熟悉 TypeScript、REST API`;

const inputClass =
  'w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder-slate-400 transition-colors focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900';

export default function OptimizerForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [rawResult, setRawResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [styleOpen, setStyleOpen] = useState(true);
  const [variationIndex, setVariationIndex] = useState(0);

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async (variation = 0) => {
    if (!form.companyName.trim()) {
      setError('請填寫公司名稱');
      return;
    }
    if (!form.jobTitle.trim()) {
      setError('請填寫招募職稱');
      return;
    }
    if (!form.originalJD.trim()) {
      setError('請輸入原始 JD 內容');
      return;
    }
    if (!form.styleId) {
      setError('請選擇一種品牌風格');
      return;
    }

    setError('');
    setIsGenerating(true);
    setRawResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, variationIndex: variation }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('無法讀取回應串流');

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setRawResult((prev) => prev + chunk);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '生成失敗，請稍後再試';
      setError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:p-6 xl:grid-cols-2">
      {/* ── LEFT: Input panel ── */}
      <section
        aria-label="輸入表單"
        className="flex h-fit flex-col gap-6 border border-neutral-200 bg-white p-6 xl:sticky xl:top-24"
      >
        <h2 className="border-b border-neutral-200 pb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
          輸入資訊
        </h2>

        {/* Company Name */}
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-neutral-900">
            <Building2 className="h-3.5 w-3.5 text-slate-400" />
            公司名稱
            <span className="ml-0.5 text-accent-strong">*</span>
          </label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            placeholder="例如：台積電、Shopee、KKBOX"
            className={inputClass}
          />
        </div>

        {/* Culture + Mission row */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-neutral-900">
              <Heart className="h-3.5 w-3.5 text-slate-400" />
              企業文化
              <span className="ml-1 text-xs font-normal text-slate-400">（選填）</span>
            </label>
            <input
              type="text"
              value={form.companyCulture}
              onChange={(e) => update('companyCulture', e.target.value)}
              placeholder="例如：快速迭代、開放溝通、結果導向"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-neutral-900">
              <Target className="h-3.5 w-3.5 text-slate-400" />
              使命願景
              <span className="ml-1 text-xs font-normal text-slate-400">（選填）</span>
            </label>
            <input
              type="text"
              value={form.mission}
              onChange={(e) => update('mission', e.target.value)}
              placeholder="例如：讓每個人都能負擔得起創意工具"
              className={inputClass}
            />
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-neutral-900">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            招募職稱
            <span className="ml-0.5 text-accent-strong">*</span>
          </label>
          <input
            type="text"
            value={form.jobTitle}
            onChange={(e) => update('jobTitle', e.target.value)}
            placeholder="例如：Senior Frontend Engineer、產品設計師"
            className={inputClass}
          />
        </div>

        {/* Original JD */}
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-bold text-neutral-900">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              原始 JD
              <span className="ml-0.5 text-accent-strong">*</span>
            </span>
            <span className="font-mono text-xs font-normal text-slate-400">
              {form.originalJD.length} 字
            </span>
          </label>
          <textarea
            value={form.originalJD}
            onChange={(e) => update('originalJD', e.target.value)}
            placeholder={PLACEHOLDER_JD}
            rows={7}
            className={`${inputClass} resize-none leading-relaxed`}
          />
        </div>

        {/* Style Selector */}
        <div>
          <button
            type="button"
            onClick={() => setStyleOpen((o) => !o)}
            className="mb-3 flex w-full items-center justify-between text-sm font-bold text-neutral-900 transition-colors hover:text-accent-strong"
          >
            <span className="flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-slate-400" />
              品牌風格選擇
              <span className="ml-0.5 text-accent-strong">*</span>
              {form.styleId && (
                <span className="ml-2 border border-neutral-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neutral-900">
                  已選擇
                </span>
              )}
            </span>
            {styleOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
          {styleOpen && (
            <StyleSelector
              styles={companyStyles}
              selected={form.styleId}
              onSelect={(id) => update('styleId', id)}
            />
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 border border-red-300 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          type="button"
          onClick={() => { setVariationIndex(0); handleGenerate(0); }}
          disabled={isGenerating}
          className="flex w-full items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-strong hover:border-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              AI 生成中...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              開始生成雇主品牌 JD
            </>
          )}
        </button>
      </section>

      {/* ── RIGHT: Result panel ── */}
      <section
        aria-label="生成結果"
        className="flex flex-col border border-neutral-200 bg-white p-6"
      >
        <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
            AI 生成結果
          </h2>
          {isGenerating && (
            <span className="font-mono text-[10px] uppercase tracking-wide text-accent-strong">
              streaming
            </span>
          )}
        </div>
        <ResultDisplay
          rawResult={rawResult}
          isGenerating={isGenerating}
          onRegenerate={() => {
            const next = variationIndex + 1;
            setVariationIndex(next);
            handleGenerate(next);
          }}
        />
      </section>
    </div>
  );
}
