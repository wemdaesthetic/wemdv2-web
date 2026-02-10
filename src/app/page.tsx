// FILE: src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/header/Header";
import ReviewsSection from "@/components/sections/ReviewsSection";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import Footer from "@/components/footer/Footer";

import MobileShell from "@/components/_legacy/MobileShell";
import { BOOKING_URL } from "@/config/nav";

const HEADER_H = 78;

export default function HomePage() {
  // ✅ 팝업 상태
  const [openPopup, setOpenPopup] = useState(false);

  // ✅ 최초 1회 자동 오픈 (지금은 테스트/디버깅용으로 무조건 뜨게)
  useEffect(() => {
    setOpenPopup(true);
  }, []);

  // ✅ 팝업 이미지 (public/popup/main-popup.png)
  const POPUP_IMG_SRC = "/popup/main-popup.png";

  return (
    <>
      {/* ✅ 팝업 (메인에서만) */}
      {openPopup ? (
        <div className="fixed inset-0 z-[99999]">
          {/* overlay */}
          <button
            type="button"
            aria-label="팝업 닫기"
            className="absolute inset-0 bg-black/55"
            onClick={() => setOpenPopup(false)}
          />

          {/* popup */}
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              {/* 닫기 버튼 */}
              <button
                type="button"
                onClick={() => setOpenPopup(false)}
                aria-label="닫기"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/70"
              >
                ×
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={POPUP_IMG_SRC}
                alt="WeMD Popup"
                className="block h-auto w-full"
                draggable={false}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* ✅ Mobile UI (상단바/햄버거/드로어/FAB/TOP) 전부 여기서 통일 */}
      <MobileShell variant="home" bookingUrl={BOOKING_URL} showReviewsLink={true} />

      {/* ✅ PC에서만 Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      <main className="bg-white">
        {/* ===== HERO ===== */}
        <section
          id="hero"
          className="
            relative w-full overflow-hidden bg-black
            h-[100svh]
            md:h-[100vh]
          "
        >
          <video
            className="absolute inset-0 h-full w-full object-cover scale-[1.08] md:scale-[1.04] origin-center"
            src="/intro/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* 기존 그대로 유지 */}
          <div className="absolute inset-0 bg-transparent" />

          {/* ✅ 타이틀/서브문구 제거: 레이아웃 유지용 컨테이너만 남김 */}
          <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 md:pt-[78px] pt-[88px]">
            {/* 텍스트 블록 제거 */}
          </div>
        </section>

        {/* ✅ 섹션들 */}
        <div className="bg-white">
          <section id="reviews" style={{ scrollMarginTop: HEADER_H }} className="bg-white">
            <ReviewsSection />
          </section>

          <div className="h-px w-full bg-zinc-100/80" />

          <section id="brand" style={{ scrollMarginTop: HEADER_H }} className="bg-white">
            <BrandStorySection />
          </section>

          <div className="h-px w-full bg-zinc-100/80" />

          <section id="branches" style={{ scrollMarginTop: HEADER_H }} className="bg-white">
            <BranchesSection />
          </section>

          <div className="h-px w-full bg-zinc-100/80" />

          <section id="franchise" style={{ scrollMarginTop: HEADER_H }} className="bg-white">
            <FranchiseSection />
          </section>
        </div>

        <div className="bg-[#1A1A1A]">
          <Footer />
        </div>
      </main>
    </>
  );
}