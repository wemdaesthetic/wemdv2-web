"use client";

import React from "react";
import { BOOKING_URL } from "@/config/nav";

export default function ServiceCTA({
  title = "예약하기",
  desc = "네이버 예약으로 빠르게 진행할 수 있어요.",
}: {
  title?: string;
  desc?: string;
}) {
  return (
    <>
      {/* PC 섹션 CTA */}
      <section className="hidden md:block bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-28">
          <div className="overflow-hidden rounded-[32px] bg-zinc-950 text-white shadow-[0_26px_90px_rgba(0,0,0,0.20)]">
            <div className="pointer-events-none absolute" />
            <div className="relative p-10 flex items-center justify-between gap-10">
              <div>
                <div className="text-[12px] tracking-[0.22em] text-white/55">BOOKING</div>
                <div className="mt-3 text-[28px] font-semibold tracking-tight">{title}</div>
                <div className="mt-3 text-[15px] text-white/70">{desc}</div>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex h-[52px] items-center justify-center
                  rounded-2xl bg-white px-8
                  text-[15px] font-semibold text-zinc-900
                  transition hover:bg-white/90 active:scale-[0.99]
                "
              >
                예약 페이지로 이동
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE 고정 CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-[60] px-4 pb-6">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex h-[54px] w-full items-center justify-center
            rounded-2xl bg-zinc-900 text-[15px] font-semibold text-white
            shadow-[0_18px_70px_rgba(0,0,0,0.25)]
            active:scale-[0.99]
          "
        >
          {title}
        </a>
      </div>

      {/* 모바일 fixed 버튼 때문에 페이지 하단 패딩 확보 */}
      <div className="md:hidden h-[92px]" aria-hidden />
    </>
  );
}