"use client";

import React from "react";

export default function RecommendedTargets({
  accent = "#B71919",
  items,
}: {
  accent?: string;
  items: string[];
}) {
  return (
    <section
      className="
        rounded-3xl bg-white
        ring-1 ring-black/5
        shadow-[0_18px_70px_rgba(15,23,42,0.08)]
        p-6 md:p-7
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[12px] tracking-[0.30em]" style={{ color: accent }}>
            RECOMMENDED
          </div>
          <div className="mt-2 text-[18px] font-semibold tracking-tight text-zinc-900 md:text-[20px]">
            추천 대상
          </div>
          <div className="mt-2 text-[13px] leading-relaxed text-zinc-500">
            컨디션/목적에 따라 프로그램을 추천해드려요.
          </div>
        </div>

        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
          style={{ backgroundColor: `${accent}12` }}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7l-9 10-4-4"
              stroke={accent}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="
              inline-flex items-center gap-2
              rounded-full px-4 py-2
              text-[14px] font-semibold
              bg-zinc-50 text-zinc-800
              ring-1 ring-black/5
            "
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 text-[12px] text-zinc-400">
        ※ 내용은 나중에 실제 문구로 교체하면 돼요.
      </div>
    </section>
  );
}