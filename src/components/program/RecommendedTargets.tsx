"use client";

import React from "react";

type Props = {
  accent: string;
  targets: string[];
};

export default function RecommendedTargets({ accent, targets }: Props) {
  if (!targets.length) return null;

  return (
    <section className="mt-10">
      <div
        className="text-[12px] font-semibold tracking-[0.30em]"
        style={{ color: accent }}
      >
        RECOMMENDED
      </div>

      <h3 className="mt-2 text-[22px] font-semibold text-zinc-900">
        추천 대상
      </h3>

      <ul className="mt-6 space-y-3">
        {targets.map((t, i) => (
          <li
            key={i}
            className="
              w-full
              rounded-full
              bg-red-50
              px-5 py-3
              text-[14px]
              text-[#B71919]
              font-medium
            "
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}