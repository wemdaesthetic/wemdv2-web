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
      {/* 모바일 */}
      <div className="md:hidden">
        <div
          className="
            rounded-3xl bg-white
            ring-1 ring-black/5
            shadow-[0_18px_70px_rgba(15,23,42,0.08)]
            p-6
          "
        >


          <div className="text-[20px] font-semibold tracking-tight text-zinc-900">
            관리 순서
          </div>

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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 데스크탑 */}
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

              <div className="text-[26px] font-semibold tracking-tight text-zinc-900">
                관리 순서
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
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-zinc-50 ring-1 ring-black/5 px-4 py-4">
                  <div className="text-[15px] font-semibold text-zinc-900 leading-snug">
                    {s}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}