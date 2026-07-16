// DanioJD 品牌 Logo SVG 組件
// 風格：墨黑 (#171717) + 金色單一強調色 (#A16207)
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
      {/* ── Icon Mark ── */}

      {/* J 的垂直柱 (墨黑) */}
      <rect x="24" y="6" width="9" height="33" rx="0" fill="#171717" />

      {/* J 的彎鉤 (墨黑) */}
      <path
        d="M33 36 Q34 55 20 55 Q11 55 8 49"
        stroke="#171717"
        strokeWidth="9"
        fill="none"
        strokeLinecap="butt"
      />

      {/* D 弧形 / 外圈 (金色強調) */}
      <path
        d="M29 4 A27 27 0 1 1 29 58"
        stroke="#A16207"
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 折線圖 (象徵成長，金色) */}
      <polyline
        points="11,45 17,37 23,41 33,27"
        stroke="#A16207"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* 對角箭頭線 (金色) */}
      <line
        x1="11"
        y1="52"
        x2="49"
        y2="10"
        stroke="#A16207"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 箭頭頭 */}
      <path d="M49 10 L41 15 L45 22 Z" fill="#A16207" />

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
            fill="#171717"
            stroke="#171717"
            strokeWidth="0.6"
            paintOrder="stroke fill"
          >
            Danio
          </tspan>
          <tspan
            fill="#A16207"
            stroke="#A16207"
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
