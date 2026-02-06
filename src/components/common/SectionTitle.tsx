// FILE: src/components/common/SectionTitle.tsx
"use client";

import React from "react";

const DEFAULT_ACCENT = "#AD161B";

type Props = {
  en: string;                 // 예: "Contact"
  ko: string;                 // 예: "가맹 문의"
  desc?: string;              // ✅ optional
  className?: string;         // ✅ optional
  align?: "auto" | "left" | "center"; // "auto"면 모바일 left / 데스크탑 center
  accent?: string;            // ✅ optional (BrandStorySection에서 쓰고 있음)
};

export default function SectionTitle({
  en,
  ko,
  desc,
  className = "",
  align = "auto",
  accent = DEFAULT_ACCENT,
}: Props) {
  const alignCls =
    align === "left"
      ? "text-left"
      : align === "center"
      ? "text-center"
      : "text-left md:text-center";

  return (
    <div className={`${alignCls} ${className}`}>
      {/* EN */}
      <div
        className="font-['Pretendard'] font-bold text-[30px] leading-[36px] md:text-[46px] md:leading-[55px]"
        style={{ color: accent }}
      >
        {en}
      </div>

      {/* KO */}
      <div
        className="mt-2 font-['Pretendard'] font-light text-[20px] leading-[24px] md:text-[30px] md:leading-[36px]"
        style={{ color: "#404040" }}
      >
        {ko}
      </div>

      {/* DESC */}
      {desc ? (
        <div
          className="mt-2 font-['Pretendard'] font-light text-[18px] leading-[18px] md:text-[20px] md:leading-[24px]"
          style={{ color: "#9A9A9A" }}
        >
          {desc}
        </div>
      ) : null}
    </div>
  );
}