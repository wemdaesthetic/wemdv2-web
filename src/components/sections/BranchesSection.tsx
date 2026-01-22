"use client";

import Link from "next/link";
import { BRANCHES } from "@/config/branches";

export default function BranchesSection() {
  return (
    <section id="branches" className="bg-white scroll-mt-[78px]">
      <div className="mx-auto max-w-6xl px-4 py-28">
        {/* Section Title */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-[40px] font-semibold tracking-tight text-zinc-900 md:text-[52px]">
            지점 안내
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
            가까운 WeMD 지점을 선택해 자세한 안내를 확인하세요.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((b) => {
            const isReady = b.address && b.address !== "준비중";
            const isFlagship = b.slug === "dunchon";

            const CardInner = (
              <>
                {/* TOP LABEL */}
                <div className="flex items-center justify-between">
                  <div
                    className={
                      isFlagship
                        ? "text-[12px] font-semibold tracking-[0.22em] text-[#B90E0A]"
                        : "text-[12px] font-semibold tracking-[0.22em] text-zinc-400"
                    }
                  >
                    {isFlagship ? "FLAGSHIP" : "BRANCH"}
                  </div>

                  {isFlagship && (
                    <span className="rounded-full border border-[#B90E0A]/20 px-3 py-1 text-[12px] font-semibold text-[#B90E0A]">
                      본점
                    </span>
                  )}
                </div>

                {/* NAME */}
                <div className="mt-3 text-[18px] font-semibold tracking-tight text-zinc-900">
                  {b.name}
                </div>

                {/* SHORT DESC */}
                {b.short && (
                  <div className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                    {b.short}
                  </div>
                )}

                {/* INFO */}
                <div className="mt-6 space-y-2 text-[13px] leading-relaxed text-zinc-600">
                  <div className="line-clamp-2">
                    <span className="text-zinc-400">주소</span>{" "}
                    <span className="text-zinc-700">{b.address || "준비중"}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">전화</span>{" "}
                    <span className="text-zinc-700">{b.phone || "준비중"}</span>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className={
                    isReady
                      ? "mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-zinc-900 transition group-hover:text-[#B90E0A]"
                      : "mt-7 text-[13px] font-semibold text-zinc-400"
                  }
                >
                  {isReady ? (
                    <>
                      상세 보기
                      <span
                        aria-hidden
                        className="transition group-hover:translate-x-[2px]"
                      >
                        →
                      </span>
                    </>
                  ) : (
                    "준비중"
                  )}
                </div>
              </>
            );

            const cardBase =
              "rounded-3xl bg-white p-7 shadow-[0_18px_70px_rgba(15,23,42,0.08)]";

            if (!isReady) {
              return (
                <div
                  key={b.slug}
                  className={`${cardBase} opacity-60 cursor-not-allowed`}
                >
                  {CardInner}
                </div>
              );
            }

            return (
              <Link
                key={b.slug}
                href={`/branches/${b.slug}`}
                className={`${cardBase} group transition-transform duration-200 hover:-translate-y-[2px]`}
              >
                {CardInner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}