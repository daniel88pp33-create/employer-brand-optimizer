'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <dl className="border-t border-neutral-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b border-neutral-200">
            <dt>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold leading-snug text-neutral-900">
                  {item.question}
                </span>
                <span className="shrink-0 font-serif text-xl text-accent-strong">
                  {isOpen ? '–' : '+'}
                </span>
              </button>
            </dt>
            <dd
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? '300px' : '0px' }}
            >
              <p className="pb-4 text-sm leading-relaxed text-slate-500">
                {item.answer}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
