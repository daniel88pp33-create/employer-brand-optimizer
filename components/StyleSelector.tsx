'use client';

import { COMPANY_STYLES } from '@/lib/styles';

interface StyleSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {COMPANY_STYLES.map((style) => {
          const isSelected = selected === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelect(style.id)}
              className={`
                relative flex flex-col items-start gap-1 p-3 rounded-xl border text-left
                transition-all duration-200 group
                ${
                  isSelected
                    ? 'border-blue-500/70 bg-blue-500/10 shadow-lg shadow-blue-500/10'
                    : 'border-gray-700/60 bg-gray-900/60 hover:border-gray-600 hover:bg-gray-800/60'
                }
              `}
            >
              {/* Selected indicator */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400" />
              )}

              {/* Gradient accent bar */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-gradient-to-r ${style.gradient} opacity-0 transition-opacity duration-200 ${
                  isSelected ? 'opacity-100' : 'group-hover:opacity-60'
                }`}
              />

              <span className="text-xl leading-none">{style.emoji}</span>
              <span
                className={`text-xs font-semibold leading-tight ${
                  isSelected ? 'text-blue-300' : 'text-gray-200'
                }`}
              >
                {style.name}
              </span>
              <span className="text-[10px] text-gray-500 leading-tight line-clamp-2">
                {style.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
