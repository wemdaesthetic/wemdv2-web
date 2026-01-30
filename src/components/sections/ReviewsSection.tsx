// FILE: src/components/sections/ReviewsSection.tsx
"use client";

import { useMemo } from "react";

export default function ReviewsSection() {
  const reviews = useMemo(
    () => [
      {
        title: "라인이 진짜 달라져요",
        body: "한 번 받고 나서 바로 얼굴선이 정리되는 느낌이 확 와서 놀랐어요. 설명도 꼼꼼하고 케어가 섬세해요.",
        meta: "얼굴관리 · 방문후기",
      },
      {
        title: "결혼 준비로 선택했는데 만족",
        body: "웨딩 케어로 받았는데 붓기/체형이 정리되면서 드레스 핏이 달라졌어요. 컨디션까지 좋아져요.",
        meta: "맞춤케어 · 웨딩",
      },
      {
        title: "바디 순환이 좋아져요",
        body: "뭉침이 풀리면서 가벼워지는 느낌! 관리 후 다음날이 더 편해서 꾸준히 받게 돼요.",
        meta: "바디관리 · 순환",
      },
    ],
    []
  );

  return (
    <section className="bg-white">
      {/* ✅ MOBILE */}
      <div className="md:hidden">
        <div className="relative px-4 pt-14 pb-16 overflow-hidden bg-white">
          <div className="relative z-10">
            <div className="mx-auto max-w-[520px]">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                REVIEWS
              </div>
              <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-zinc-900">
                고객 후기
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">
                WeMD에서 경험한 변화와 만족을 확인해보세요.
              </p>

              <div className="mt-6 grid gap-4">
                {reviews.map((r) => (
                  <div
                    key={r.title}
                    className="
                      rounded-3xl bg-white p-6
                      shadow-[0_20px_70px_rgba(15,23,42,0.12)]
                      ring-1 ring-black/5
                    "
                  >
                    <div className="text-[16px] font-semibold text-zinc-900">
                      {r.title}
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">
                      {r.body}
                    </p>
                    <div className="mt-6 text-[12px] font-semibold text-zinc-400">
                      {r.meta}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ PC */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
              REVIEWS
            </div>
            <h2 className="mt-2 text-[48px] font-semibold tracking-tight text-zinc-900">
              고객 후기
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
              WeMD에서 경험한 변화와 만족을 확인해보세요.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.title}
                className="
                  rounded-3xl bg-white p-7
                  shadow-[0_18px_70px_rgba(15,23,42,0.08)]
                  ring-1 ring-black/5
                "
              >
                <div className="text-[16px] font-semibold text-zinc-900">{r.title}</div>
                <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">{r.body}</p>
                <div className="mt-6 text-[12px] font-semibold text-zinc-400">{r.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}