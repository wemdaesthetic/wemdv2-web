"use client";

import { BOOKING_URL } from "@/config/nav";

export default function CustomCareSection() {
  return (
    <section id="custom" className="scroll-mt-[96px] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[12px] tracking-[0.22em] text-zinc-500">CUSTOM CARE</div>
            <h2 className="mt-3 text-[38px] font-semibold tracking-tight text-zinc-900">맞춤케어</h2>
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[44px] items-center justify-center rounded-full bg-zinc-900 px-6 text-[14px] font-medium text-white transition hover:bg-zinc-800"
          >
            예약하기
          </a>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6">
          <div className="text-zinc-600">테이블 UI는 다음 단계에서 붙일게. (지금은 에러 제거용)</div>
        </div>
      </div>
    </section>
  );
}