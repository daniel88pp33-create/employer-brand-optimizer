// DanioJD 品牌 Logo SVG 組件
// 風格：深海軍藍 (#1A2A6C) + 青綠漸層 (#00B4A6 → #4FD1C7)
// 圖標：JD 字母組合 + 向上箭頭 + 折線圖，代表職缺品質成長

export default function DanioJDLogo({
  height = 36,
  showText = true,
}: {
  height?: number;
  showText?: boolean;
}) {
  const iconW = 62;
  const textW = showText ? 128 : 0;
  const totalW = iconW + textW;
  const vH = 62;

  return (
    <svg
      width={(totalW / vH) * height}
      height={height}
      viewBox={`0 0 ${totalW} ${vH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DanioJD"
      role="img"
    >
      <defs>
        <linearGradient id="dj-teal" x1="6" y1="56" x2="56" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B4A6" />
          <stop offset="100%" stopColor="#4FD1C7" />
        </linearGradient>
        <linearGradient id="dj-teal-arrow" x1="10" y1="52" x2="50" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C9B1" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
      </defs>

      {/* ── Icon Mark ── */}

      {/* J 的垂直柱 (深海軍藍) */}
      <rect x="24" y="6" width="9" height="33" rx="2.5" fill="#1A2A6C" />

      {/* J 的彎鉤 (深海軍藍) */}
      <path
        d="M33 36 Q34 55 20 55 Q11 55 8 49"
        stroke="#1A2A6C"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />

      {/* D 弧形 / 外圈 (青綠漸層) */}
      <path
        d="M29 4 A27 27 0 1 1 29 58"
        stroke="url(#dj-teal)"
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 折線圖 (象徵成長，青綠) */}
      <polyline
        points="11,45 17,37 23,41 33,27"
        stroke="url(#dj-teal)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* 對角箭頭線 (青綠漸層) */}
      <line
        x1="11"
        y1="52"
        x2="49"
        y2="10"
        stroke="url(#dj-teal-arrow)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 箭頭頭 */}
      <path d="M49 10 L41 15 L45 22 Z" fill="#4FD1C7" />

      {/* ── 文字 ── */}
      {showText && (
        /* 用單一 <text> + <tspan> 確保跨平台字距一致（避免手機間距偏大問題）
           stroke + paintOrder="stroke fill" 讓字體在各平台看起來更粗 */
        <text
          x="70"
          y="45"
          fontFamily="system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
          fontSize="29"
          fontWeight="900"
          letterSpacing="-0.5"
        >
          <tspan
            fill="#1A2A6C"
            stroke="#1A2A6C"
            strokeWidth="0.6"
            paintOrder="stroke fill"
          >
            Danio
          </tspan>
          <tspan
            fill="#00B4A6"
            stroke="#00B4A6"
            strokeWidth="0.6"
            paintOrder="stroke fill"
          >
            JD
          </tspan>
        </text>
      )}
    </svg>
  );
}
