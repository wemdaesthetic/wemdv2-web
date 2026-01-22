"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BRANCHES } from "@/config/branches";
import { BOOKING_URL } from "@/config/nav";
import { yeonwoo } from "@/app/fonts";
import Footer from "@/components/footer/Footer"; // ✅ 추가

type Props = { params: { slug: string } };

export default function BranchDetailPage({ params }: Props) {
  const router = useRouter();
  const branch = BRANCHES.find((b) => b.slug === params.slug);

  if (!branch) {
    return (
      <main className="bg-white">
        <div className="h-[78px]" aria-hidden />
        <section className="mx-auto max-w-6xl px-4 py-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[13px] font-semibold text-zinc-800 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:bg-zinc-50"
          >
            <span aria-hidden className="text-[16px] leading-none">←</span>
            뒤로
          </button>

          <div className="mt-8 text-[16px] text-zinc-700">
            존재하지 않는 지점입니다.
          </div>
        </section>
      </main>
    );
  }

  const isFlagship = branch.slug === "dunchon";

  // photos
  const photos: string[] = useMemo(() => {
    return Array.isArray(branch.photos) ? branch.photos : [];
  }, [branch.photos]);

  // director (선택)
  const director = useMemo(() => {
    return branch.director ?? null;
  }, [branch.director]);

  // 지도 embed URL (있으면 iframe로 직접 표시)
  const mapEmbedUrl: string | null = useMemo(() => {
    const anyBranch = branch as any;

    // 1) config에 mapEmbedUrl이 있으면 그걸 우선 사용
    if (
      typeof anyBranch.mapEmbedUrl === "string" &&
      anyBranch.mapEmbedUrl.length > 0
    ) {
      return anyBranch.mapEmbedUrl;
    }

    // 2) 없으면 주소로 구글맵 embed 자동 생성 (키 필요 없음)
    const addr = branch.address;
    if (!addr || addr === "준비중") return null;

    const q = encodeURIComponent(addr);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [branch]);

  // 상단 갤러리
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || photos.length <= 1) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      for (let i = 0; i < children.length; i++) {
        const c = children[i];
        const cCenter = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(center - cCenter);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActiveIdx(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [photos.length]);

  const scrollToIndex = (next: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    const safe = (next + children.length) % children.length;
    children[safe]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const telHref =
    branch.phone && branch.phone !== "준비중"
      ? `tel:${branch.phone.replaceAll("-", "").replaceAll(" ", "")}`
      : null;

  return (
    <main className="bg-white">
      {/* fixed header space */}
      <div className="h-[78px]" aria-hidden />

      {/* ✅ 상단 여백 줄임 */}
      <section className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        {/* ✅ 뒤로가기: 직관적인 pill */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[13px] font-semibold text-zinc-800 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:bg-zinc-50"
            aria-label="뒤로가기"
          >
            <span aria-hidden className="text-[16px] leading-none">
              ←
            </span>
            뒤로
          </button>
        </div>

        {/* TITLE */}
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
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
              <span className="rounded-full border border-[#B90E0A]/20 bg-[#B90E0A]/5 px-3 py-1 text-[12px] font-semibold text-[#B90E0A]">
                본점
              </span>
            ) : null}
          </div>

          <h1 className="text-[30px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
            {branch.name}
          </h1>

          {branch.short ? (
            <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
              {branch.short}
            </p>
          ) : null}
        </div>

        {/* ===================== PHOTO SLOT (Swipe) ===================== */}
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-100 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
            {/* counter */}
            <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-black/30 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
              {photos.length > 0 ? `${activeIdx + 1} / ${photos.length}` : "0 / 0"}
            </div>

            {/* ✅ PC 전용 화살표 (md 이상) */}
            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIdx - 1)}
                  className="
                    hidden md:flex
                    absolute left-4 top-1/2 z-10 -translate-y-1/2
                    h-10 w-10 items-center justify-center rounded-full
                    bg-black/20 text-white backdrop-blur
                    transition hover:bg-black/30
                  "
                  aria-label="이전 사진"
                >
                  <span className="text-[18px]" aria-hidden>
                    ‹
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIdx + 1)}
                  className="
                    hidden md:flex
                    absolute right-4 top-1/2 z-10 -translate-y-1/2
                    h-10 w-10 items-center justify-center rounded-full
                    bg-black/20 text-white backdrop-blur
                    transition hover:bg-black/30
                  "
                  aria-label="다음 사진"
                >
                  <span className="text-[18px]" aria-hidden>
                    ›
                  </span>
                </button>
              </>
            ) : null}

            {photos.length === 0 ? (
              <div className="flex h-[240px] w-full items-center justify-center text-[14px] text-zinc-500 md:h-[380px]">
                지점 사진 준비중
              </div>
            ) : (
              <div
                ref={scrollerRef}
                className="
                  branchGallery
                  flex w-full overflow-x-auto scroll-smooth
                  snap-x snap-mandatory
                  [scrollbar-width:none] [-ms-overflow-style:none]
                "
                style={{
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "contain",
                }}
                aria-label="지점 사진 갤러리"
              >
                {photos.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative w-full shrink-0 snap-center"
                    aria-label={`${i + 1}번째 사진`}
                  >
                    <img
                      src={src}
                      alt={`${branch.name} 사진 ${i + 1}`}
                      className="h-[240px] w-full object-cover md:h-[380px]"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {photos.length > 1 ? (
            <div className="mt-2 text-center text-[12px] text-zinc-400">
              좌우로 스와이프해서 사진을 확인하세요
            </div>
          ) : null}
        </div>

        {/* ===================== PROFILE + INFO + CTA ===================== */}
        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-12">
          {/* DIRECTOR */}
          <div className="md:col-span-5">
            <div className="h-full rounded-3xl bg-white p-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                DIRECTOR
              </div>

              <div className="mt-6 flex h-[calc(100%-24px)] flex-col">
                <div className="flex items-stretch gap-6">
                  {/* 사진 영역 */}
                  <div className="w-[170px] shrink-0">
                    {director?.photo ? (
                      <img
                        src={director.photo}
                        alt={`${director.name} 프로필`}
                        className="h-[220px] w-full rounded-3xl object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-[220px] w-full items-center justify-center rounded-3xl bg-zinc-100 text-[13px] font-semibold text-zinc-500">
                        PROFILE
                      </div>
                    )}
                  </div>

                  {/* 인용 + 이름 */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="pt-2">
                      <div className="text-[32px] leading-none text-zinc-900/90">
                        <span className="opacity-90">“</span>
                      </div>

                      <div className="mt-6">
                        <div
                          className={`${yeonwoo.className} text-[18px] leading-relaxed text-zinc-800`}
                        >
                          최고가 되고야 말겠어.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div />
                      <div className="text-[32px] leading-none text-zinc-900/90">
                        <span className="opacity-90">”</span>
                      </div>
                    </div>

                    <div className="pt-2 text-right">
                      <div className="text-[13px] text-zinc-500">
                        {director?.title ?? "대표원장"}
                      </div>
                      <div
                        className={`mt-1 text-[18px] font-normal tracking-[0.1em] text-zinc-800 ${yeonwoo.className}`}
                      >
                        {director?.name ?? "신 예 나"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="md:col-span-7">
            <div className="relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(185,14,10,0.06),transparent_44%)]" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                  INFORMATION
                </div>

                <div className="mt-6 space-y-4 text-[15px] leading-relaxed">
                  <InfoItem icon="pin" value={branch.address || "준비중"} />
                  <InfoItem icon="clock" value={branch.hours || "준비중"} />
                  <InfoItem icon="phone" value={branch.phone || "준비중"} />
                </div>

                <div className="mt-auto pt-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex h-[46px] items-center justify-center rounded-full
                        bg-[#B90E0A] px-6 text-[14px] font-semibold text-white
                        transition hover:bg-[#a40c09] active:scale-[0.99]
                      "
                    >
                      간편 예약
                    </a>

                    {telHref ? (
                      <a
                        href={telHref}
                        className="
                          inline-flex h-[46px] items-center justify-center rounded-full
                          bg-zinc-100 px-6 text-[14px] font-semibold text-zinc-900
                          transition hover:bg-zinc-200/70 active:scale-[0.99]
                        "
                      >
                        전화 예약
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex h-[46px] cursor-not-allowed items-center justify-center rounded-full bg-zinc-100 px-6 text-[14px] font-semibold text-zinc-400"
                      >
                        전화 준비중
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== MAP ===================== */}
        <div className="mt-10">
          <div className="mb-3 text-[14px] font-semibold text-zinc-900">
            오시는 길
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
            {mapEmbedUrl ? (
              <iframe
                title={`${branch.name} 지도`}
                src={mapEmbedUrl}
                className="h-[260px] w-full md:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-[260px] w-full items-center justify-center bg-zinc-50 text-[14px] text-zinc-500 md:h-[420px]">
                지도 준비중
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ✅ 맵 아래 여백 아주 조금 + Footer 추가 */}
      <div className="mt-6 bg-[#1A1A1A]">
        <Footer />
      </div>

      {/* ✅ webkit scrollbar hide (styled-jsx 중첩 방지: 여기 1번만) */}
      <style jsx global>{`
        .branchGallery::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}

/** 아이콘 + 텍스트 */
function InfoItem({
  icon,
  value,
}: {
  icon: "pin" | "clock" | "phone";
  value: string;
}) {
  const Icon = () => {
    if (icon === "pin") {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 22s7-4.5 7-12a7 7 0 10-14 0c0 7.5 7 12 7 12z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 13a3 3 0 100-6 3 3 0 000 6z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
    }
    if (icon === "clock") {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 22a10 10 0 110-20 10 10 0 010 20z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 7v6l4 2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M22 16.5v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.5 4.2 2 2 0 014.5 2h3a2 2 0 012 1.7c.2 1.2.5 2.4 1 3.5a2 2 0 01-.5 2.1L9 10.3a16 16 0 006 6l1-1a2 2 0 012.1-.5c1.1.5 2.3.8 3.5 1A2 2 0 0122 16.5z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="flex items-start gap-3">
      <div className="mt-[2px] text-zinc-400">
        <Icon />
      </div>
      <div className="text-zinc-900">{value}</div>
    </div>
  );
}