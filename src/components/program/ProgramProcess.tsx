"use client";

import React from "react";

export default function ProgramProcess({
  accent = "#B71919",
  steps,
}: {
  accent?: string;
  steps: string[];
}) {
  return (
    <section className="mt-6">
      {/* 모바일: 세로 타임라인 (카드 안에 넣어서 좌우가 안 비게) */}
      <div className="md:hidden">
        <div
          className="
            rounded-3xl bg-white
            ring-1 ring-black/5
            shadow-[0_18px_70px_rgba(15,23,42,0.08)]
            p-6
          "
        >
          <div className="text-[12px] tracking-[0.30em]" style={{ color: accent }}>
            PROCESS
          </div>
          <div className="mt-2 text-[20px] font-semibold tracking-tight text-zinc-900">프로그램 구성</div>
          <div className="mt-2 text-[13px] text-zinc-500">단계별로 흐름을 따라가며 진행돼요.</div>

          <div className="mt-6 space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="relative pl-12">
                {/* 세로 라인 */}
                {i !== steps.length - 1 ? (
                  <span
                    className="absolute left-[18px] top-10 h-[calc(100%-16px)] w-px"
                    style={{ backgroundColor: `${accent}30` }}
                    aria-hidden
                  />
                ) : null}

                {/* 번호 */}
                <div
                  className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full text-white text-[13px] font-bold shadow-[0_10px_26px_rgba(183,25,25,0.25)]"
                  style={{ backgroundColor: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* 단계 카드 */}
                <div className="rounded-2xl bg-zinc-50 ring-1 ring-black/5 px-4 py-3">
                  <div className="text-[15px] font-semibold text-zinc-900">{s}</div>
                  <div className="mt-1 text-[13px] text-zinc-500">
                    컨디션에 맞춰 강도/구성을 조절해요.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 데스크탑: 가로 스텝퍼 (카드 형태로 정보량/여백 확보) */}
      <div className="hidden md:block">
        <div
          className="
            rounded-[32px] bg-white
            ring-1 ring-black/5
            shadow-[0_22px_90px_rgba(15,23,42,0.10)]
            p-8
          "
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[12px] tracking-[0.30em]" style={{ color: accent }}>
                PROCESS
              </div>
              <div className="mt-2 text-[26px] font-semibold tracking-tight text-zinc-900">프로그램 구성</div>
              <div className="mt-2 text-[14px] text-zinc-500">
                전체 흐름을 한 번에 이해할 수 있도록 정리했어요.
              </div>
            </div>

            <div
              className="rounded-full px-4 py-2 text-[13px] font-semibold ring-1 ring-black/5"
              style={{ backgroundColor: `${accent}10`, color: accent }}
            >
              총 {steps.length} Step
            </div>
          </div>

          <div className="mt-8 grid grid-cols-12 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="col-span-3 min-w-0">
                <div className="relative">
                  {/* 연결선 */}
                  {i !== steps.length - 1 ? (
                    <span
                      className="absolute left-[44px] top-[18px] h-[2px] w-[calc(100%-44px)]"
                      style={{ backgroundColor: `${accent}25` }}
                      aria-hidden
                    />
                  ) : null}

                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-9 w-9 place-items-center rounded-full text-white text-[13px] font-bold shadow-[0_10px_26px_rgba(183,25,25,0.20)]"
                      style={{ backgroundColor: accent }}
                    >
                      {i + 1}
                    </div>
                    <div className="text-[14px] font-semibold text-zinc-900 truncate">Step {i + 1}</div>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-zinc-50 ring-1 ring-black/5 px-4 py-4">
                  <div className="text-[15px] font-semibold text-zinc-900 leading-snug">{s}</div>
                  <div className="mt-2 text-[13px] text-zinc-500 leading-relaxed">
                    집중 부위/목적에 따라 순서는 달라질 수 있어요.
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 h-px w-full bg-zinc-200" />

          <div className="mt-5 text-[13px] text-zinc-500">
            ※ 프로그램 구성은 상담 후 개인 컨디션에 맞춰 조정될 수 있어요.
          </div>
        </div>
      </div>
    </section>
  );
}