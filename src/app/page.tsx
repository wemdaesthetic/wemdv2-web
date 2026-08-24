"use client";

import React from "react";

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
  return (
    <>
      {/* Mobile UI (상단바/햄버거/드로어/FAB/TOP) */}
      <MobileShell
        variant="home"
        bookingUrl={BOOKING_URL}
        showReviewsLink
      />

      {/* PC에서만 Header */}
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
            className="
              absolute inset-0 h-full w-full
              object-cover
              scale-[1.08]
              md:scale-[1.04]
              origin-center
            "
            src="/intro/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          <div className="absolute inset-0 bg-transparent" />

          {/* 타이틀/서브문구 제거: 레이아웃 유지용 컨테이너만 */}
          <div
            className="
              relative z-10 mx-auto flex h-full
              max-w-6xl items-center
              px-4 pt-[88px]
              md:pt-[78px]
            "
          />
        </section>

        {/* 섹션들 */}
        <div className="bg-white">
          <section
            id="reviews"
            style={{ scrollMarginTop: HEADER_H }}
            className="bg-white"
          >
            <ReviewsSection />
          </section>

          <div className="h-px w-full bg-zinc-100/80" />

          <section
            id="brand"
            style={{ scrollMarginTop: HEADER_H }}
            className="bg-white"
          >
            <BrandStorySection />
          </section>

          <div className="h-px w-full bg-zinc-100/80" />

          <section
            id="branches"
            style={{ scrollMarginTop: HEADER_H }}
            className="bg-white"
          >
            <BranchesSection />
          </section>

          <div className="h-px w-full bg-zinc-100/80" />

          <section
            id="franchise"
            style={{ scrollMarginTop: HEADER_H }}
            className="bg-white"
          >
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