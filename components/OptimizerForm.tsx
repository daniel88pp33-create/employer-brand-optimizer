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

export default function OptimizerForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [rawResult, setRawResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [styleOpen, setStyleOpen] = useState(true);

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
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
        body: JSON.stringify(form),
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
    <div className="grid grid-cols-1 xl:grid-cols-[480px_1fr] gap-6 p-4 md:p-6 min-h-[calc(100vh-120px)]">
      {/* ── LEFT: Input panel ── */}
      <section
        aria-label="輸入表單"
        className="glass-card rounded-2xl p-5 flex flex-col gap-5 h-fit xl:sticky xl:top-6"
      >
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          輸入資訊
        </h2>

        {/* Company Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            公司名稱
            <span className="text-red-400 ml-0.5">*</span>
          </label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            placeholder="例如：台積電、Shopee、KKBOX"
            className="input-field"
          />
        </div>

        {/* Culture + Mission row */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              企業文化
              <span className="text-gray-600 ml-1 font-normal">（選填）</span>
            </label>
            <input
              type="text"
              value={form.companyCulture}
              onChange={(e) => update('companyCulture', e.target.value)}
              placeholder="例如：快速迭代、開放溝通、結果導向"
              className="input-field"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
              <Target className="w-3.5 h-3.5 text-green-400" />
              使命願景
              <span className="text-gray-600 ml-1 font-normal">（選填）</span>
            </label>
            <input
              type="text"
              value={form.mission}
              onChange={(e) => update('mission', e.target.value)}
              placeholder="例如：讓每個人都能負擔得起創意工具"
              className="input-field"
            />
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
            <Briefcase className="w-3.5 h-3.5 text-violet-400" />
            招募職稱
            <span className="text-red-400 ml-0.5">*</span>
          </label>
          <input
            type="text"
            value={form.jobTitle}
            onChange={(e) => update('jobTitle', e.target.value)}
            placeholder="例如：Senior Frontend Engineer、產品設計師"
            className="input-field"
          />
        </div>

        {/* Original JD */}
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              原始 JD
              <span className="text-red-400 ml-0.5">*</span>
            </span>
            <span className="text-gray-600 font-normal">
              {form.originalJD.length} 字
            </span>
          </label>
          <textarea
            value={form.originalJD}
            onChange={(e) => update('originalJD', e.target.value)}
            placeholder={PLACEHOLDER_JD}
            rows={7}
            className="input-field resize-none leading-relaxed"
          />
        </div>

        {/* Style Selector */}
        <div>
          <button
            type="button"
            onClick={() => setStyleOpen((o) => !o)}
            className="flex items-center justify-between w-full text-xs font-medium text-gray-400 mb-3 hover:text-gray-200 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-fuchsia-400" />
              品牌風格選擇
              <span className="text-red-400 ml-0.5">*</span>
              {form.styleId && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px]">
                  已選擇
                </span>
              )}
            </span>
            {styleOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          {styleOpen && (
            <StyleSelector
              selected={form.styleId}
              onSelect={(id) => update('styleId', id)}
            />
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs">
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn-gradient w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:animate-none hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              AI 生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              開始生成雇主品牌文案
            </>
          )}
        </button>
      </section>

      {/* ── RIGHT: Result panel ── */}
      <section
        aria-label="生成結果"
        className="glass-card rounded-2xl p-5 flex flex-col"
      >
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
          AI 生成結果
        </h2>
        <ResultDisplay rawResult={rawResult} isGenerating={isGenerating} />
      </section>
    </div>
  );
}
