"use client";

import React, { useMemo, useState } from "react";
import ServiceSectionTitle from "./ServiceSectionTitle";

type ServiceItem = {
  title: string;
  desc: string;
  detail?: string[];
  recommendedFor?: string[];
  duration?: string;
  cycle?: string;
};

export default function ServiceTabs({
  sectionEyebrow = "PROGRAM",
  sectionTitle = "프로그램",
  sectionDesc = "WeMD의 관리 프로그램을 확인하세요.",
  services,
}: {
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionDesc?: string;
  services: ServiceItem[];
}) {
  const [openIdx, setOpenIdx] = useState<number>(0);

  const list = useMemo(() => services ?? [], [services]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-28">
        {/* 타이틀 */}
        <div className="mx-auto mb-8 max-w-3xl md:mb-16 md:text-center">
          <ServiceSectionTitle
            eyebrow={sectionEyebrow}
            title={sectionTitle}
            desc={sectionDesc}
            align="center"
          />
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {list.map((s, i) => {
            const open = openIdx === i;

            return (
              <div
                key={`${s.title}-${i}`}
                className="
                  overflow-hidden rounded-3xl bg-white/95
                  shadow-[0_20px_70px_rgba(15,23,42,0.10)]
                  ring-1 ring-black/5
                "
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="
                    w-full px-6 py-6 text-left
                    active:scale-[0.995]
                    transition
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[18px] font-semibold tracking-tight text-zinc-900">
                        {s.title}
                      </div>
                      <div className="mt-2 text-[14px] leading-relaxed text-zinc-600">
                        {s.desc}
                      </div>
                    </div>

                    <div
                      className={[
                        "mt-1 shrink-0 grid h-9 w-9 place-items-center rounded-full",
                        "bg-zinc-100 text-zinc-700 transition",
                        open ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                      aria-hidden
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* 미니 메타 */}
                  {(s.duration || s.cycle) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.duration ? (
                        <span className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600">
                          소요: {s.duration}
                        </span>
                      ) : null}
                      {s.cycle ? (
                        <span className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600">
                          주기: {s.cycle}
                        </span>
                      ) : null}
                    </div>
                  )}
                </button>

                {/* 펼침 */}
                <div
                  className={[
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <div className="px-6 pb-6">
                      <div className="h-px w-full bg-zinc-100" />

                      {s.detail?.length ? (
                        <div className="mt-5">
                          <div className="text-[12px] tracking-[0.22em] text-zinc-400">
                            포인트
                          </div>
                          <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-zinc-700">
                            {s.detail.map((t, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#B90E0A]" />
                                <span className="min-w-0">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {s.recommendedFor?.length ? (
                        <div className="mt-6">
                          <div className="text-[12px] tracking-[0.22em] text-zinc-400">
                            추천 대상
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {s.recommendedFor.map((t, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= PC ================= */}
        <div className="hidden md:grid gap-6 md:grid-cols-3">
          {list.map((s, i) => (
            <div
              key={`${s.title}-${i}`}
              className="
                rounded-3xl bg-white p-7
                shadow-[0_18px_70px_rgba(15,23,42,0.08)]
                ring-1 ring-black/5
                transition hover:-translate-y-[2px]
              "
            >
              <div className="text-[18px] font-semibold tracking-tight text-zinc-900">
                {s.title}
              </div>
              <div className="mt-3 text-[14px] leading-relaxed text-zinc-600">
                {s.desc}
              </div>

              {(s.duration || s.cycle) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.duration ? (
                    <span className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600">
                      소요: {s.duration}
                    </span>
                  ) : null}
                  {s.cycle ? (
                    <span className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600">
                      주기: {s.cycle}
                    </span>
                  ) : null}
                </div>
              )}

              {s.detail?.length ? (
                <ul className="mt-6 space-y-2 text-[13px] leading-relaxed text-zinc-700">
                  {s.detail.map((t, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#B90E0A]" />
                      <span className="min-w-0">{t}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}