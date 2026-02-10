"use client";

import React from "react";

type Props = {
  accent: string;
  infoImageSrc: string;
  introTitle: string;
  introBody: string;
  recommendedTargets: string[];
};

export default function ProgramInfo({
  accent,
  infoImageSrc,
  introTitle,
  introBody,
  recommendedTargets,
}: Props) {
  return (
    <div>
      {/* 영문 라벨 */}
      <div
        className="text-[12px] font-semibold tracking-[0.30em]"
        style={{ color: accent }}
      >
        PROGRAM INFO
      </div>

      {/* ✅ 한글 섹션 타이틀 */}
      <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
        프로그램 안내
      </h2>

      {/* full-bleed image */}
      <div className="mt-8">
        <div className="-mx-5 md:-mx-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={infoImageSrc}
            alt="Program Info"
            className="h-[240px] w-full object-cover md:h-[420px]"
            draggable={false}
          />
        </div>
      </div>

      {/* Mobile: 텍스트 -> 추천 / Desktop: 나란히 */}
      <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-8">
          <h3 className="text-[34px] font-semibold tracking-tight text-zinc-900 md:text-[54px]">
            {introTitle}
          </h3>

          <div
            className="mt-5 h-[3px] w-14 rounded-full"
            style={{ backgroundColor: accent }}
          />

          <p className="mt-6 text-[16px] leading-relaxed text-zinc-700 md:text-[19px]">
            {introBody}
          </p>

          <div className="mt-8 flex items-center gap-3 text-[13px] text-zinc-500 md:text-[14px]">
            <span className="inline-block h-px w-10 bg-zinc-300" />
            <span>프로그램 디테일은 지점/컨디션에 따라 조정될 수 있어요.</span>
          </div>
        </div>

        {/* 추천 대상 */}
        <div className="md:col-span-4">
          <div className="rounded-[24px] bg-white p-6 ring-1 ring-black/10 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <div
              className="text-[12px] font-semibold tracking-[0.30em]"
              style={{ color: accent }}
            >
              RECOMMENDED
            </div>
            <div className="mt-2 text-[18px] font-semibold text-zinc-900">
              추천 대상
            </div>

            {/* ✅ 한 줄에 하나씩만 (두 개씩 배치되는 문제 해결) */}
            <div className="mt-5 flex flex-col gap-2">
              {recommendedTargets.map((t, idx) => (
                <span
                  key={`${idx}-${t}`}
                  className="inline-flex w-full items-center rounded-full px-3 py-2 text-[13px] font-semibold"
                  style={{
                    backgroundColor: "rgba(183,25,25,0.08)",
                    color: accent,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* ✅ 하단 설명 박스 제거 */}
          </div>
        </div>
      </div>
    </div>
  );
}