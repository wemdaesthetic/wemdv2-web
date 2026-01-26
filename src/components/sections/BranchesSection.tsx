"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BRANCHES } from "@/config/branches";

export default function BranchesSection() {
  // ✅ 모바일 옵션(요청대로)
  const mobileOptions = useMemo(
    () => [
      { slug: "dunchon", label: "서울 강동구 본점", enabled: true },
      { slug: "jamsil", label: "서울 송파구 잠실점(준비중)", enabled: false },
      { slug: "yongsan", label: "서울 용산구 한남점(준비중)", enabled: false },
    ],
    []
  );

  const [selectedSlug, setSelectedSlug] = useState<string>("dunchon");

  const selected = useMemo(() => {
    const opt = mobileOptions.find((o) => o.slug === selectedSlug) ?? mobileOptions[0];
    const branch = BRANCHES.find((b) => b.slug === opt.slug) ?? null;
    return { opt, branch };
  }, [selectedSlug, mobileOptions]);

  const isFlagship = selected.branch?.slug === "dunchon";
  const isReady =
    selected.opt.enabled && Boolean(selected.branch?.address && selected.branch.address !== "준비중");

  return (
    <section id="branches" className="bg-white scroll-mt-[78px]">
      {/* ===================== MOBILE ONLY (md 미만) ===================== */}
      <div className="md:hidden">
        <div className="relative px-4 pt-14 pb-16 overflow-hidden">
          {/* 은은한 radial gradient 배경 */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(185,14,10,0.08),transparent_45%)]" />

          <div className="relative z-10">
            {/* 타이틀 */}
            <div className="mx-auto max-w-[520px]">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                BRANCHES
              </div>
              <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-zinc-900">
                지점 안내
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">
                가까운 WeMD 지점을 선택해 자세한 안내를 확인하세요.
              </p>

              {/* 드롭다운 */}
              <div className="mt-6">
                <label className="sr-only" htmlFor="branchSelect">
                  지점 선택
                </label>

                <div className="relative">
                  <select
                    id="branchSelect"
                    value={selectedSlug}
                    onChange={(e) => setSelectedSlug(e.target.value)}
                    className="
                      w-full appearance-none
                      rounded-2xl bg-white/95
                      px-4 py-4 pr-12
                      text-[15px] font-semibold text-zinc-900
                      shadow-[0_18px_60px_rgba(15,23,42,0.10)]
                      outline-none ring-1 ring-black/5
                    "
                  >
                    {mobileOptions.map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {o.label}
                      </option>
                    ))}
                  </select>

                  {/* chevron */}
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
              </div>

              {/* 선택 카드 */}
              <div className="mt-6">
                <div
                  className="
                    rounded-3xl bg-white/95 p-6
                    shadow-[0_20px_70px_rgba(15,23,42,0.12)]
                    ring-1 ring-black/5
                  "
                >
                  {/* 상단 라벨 */}
                  <div className="flex items-center gap-2">
                    {isReady ? (
                      <>
                        <div
                          className={
                            isFlagship
                              ? "text-[12px] font-semibold tracking-[0.22em] text-[#B90E0A]"
                              : "text-[12px] font-semibold tracking-[0.22em] text-zinc-400"
                          }
                        >
                          {isFlagship ? "FLAGSHIP" : "BRANCH"}
                        </div>

                        {isFlagship ? (
                          <span className="rounded-full bg-[#B90E0A]/10 px-3 py-1 text-[12px] font-semibold text-[#B90E0A]">
                            본점
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-[12px] font-semibold text-zinc-500">
                        준비중
                      </span>
                    )}
                  </div>

                  {/* 지점명 */}
                  <div className="mt-3 text-[20px] font-semibold tracking-tight text-zinc-900">
                    {selected.branch?.name ?? "지점 준비중"}
                  </div>

                  {/* 주소/전화 */}
                  <div className="mt-5 space-y-3 text-[14px] leading-relaxed">
                    <InfoRowMobile
                      label="주소"
                      value={selected.branch?.address ?? "준비중"}
                      disabled={!isReady}
                    />
                    <InfoRowMobile
                      label="전화"
                      value={selected.branch?.phone ?? "준비중"}
                      disabled={!isReady}
                    />
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    {isReady ? (
                      <Link
                        href={`/branches/${selected.branch!.slug}`}
                        className="
                          inline-flex h-[52px] w-full items-center justify-center
                          rounded-2xl bg-[#B90E0A]
                          text-[15px] font-semibold text-white
                          transition active:scale-[0.99]
                        "
                      >
                        상세보기
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="
                          inline-flex h-[52px] w-full items-center justify-center
                          rounded-2xl bg-zinc-100
                          text-[15px] font-semibold text-zinc-400
                          cursor-not-allowed
                        "
                      >
                        준비중
                      </button>
                    )}
                  </div>
                </div>

                {/* 선택 힌트 */}
                <div className="mt-3 text-center text-[12px] text-zinc-400">
                  위 드롭다운에서 지점을 선택하세요
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== PC ONLY (md 이상) — 기존 코드 그대로 ===================== */}
      <div className="hidden md:block">
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
                        <span aria-hidden className="transition group-hover:translate-x-[2px]">
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
                  <div key={b.slug} className={`${cardBase} opacity-60 cursor-not-allowed`}>
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
      </div>
    </section>
  );
}

function InfoRowMobile({
  label,
  value,
  disabled,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-[52px_1fr] gap-3">
      <div className={disabled ? "text-zinc-300" : "text-zinc-400"}>{label}</div>
      <div className={disabled ? "text-zinc-400" : "text-zinc-900"}>{value}</div>
    </div>
  );
}