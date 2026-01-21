"use client";

import { useEffect, useMemo, useRef } from "react";
import Header from "@/components/header/Header";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import Footer from "@/components/footer/Footer";
import { BOOKING_URL } from "@/config/nav";

const HEADER_H = 78;

/**
 * ✅ 고급 스무스 스냅
 * - 스크롤이 잠깐 멈추면(사용자 스크롤 끝나면) 가장 가까운 섹션 top으로 부드럽게 정렬
 * - “딱 붙는” mandatory snap 느낌 없음
 */
export default function HomePage() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const sectionIds = useMemo(() => ["hero", "brand", "branches", "franchise"], []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    let timer: any = null;
    let isAutoSnapping = false;

    const getSectionTops = () => {
      return sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;

          // scroller 기준으로 섹션 top 계산
          const top = el.offsetTop;
          return { id, top };
        })
        .filter(Boolean) as { id: string; top: number }[];
    };

    const smoothSnapToNearest = () => {
      if (isAutoSnapping) return;

      const tops = getSectionTops();
      if (!tops.length) return;

      const current = scroller.scrollTop;

      // 헤더 보정: 실제로 보여야 하는 "정렬" 위치 = 섹션 top
      // (우리는 main 안에서만 스크롤하므로 offsetTop이 정확함)
      let nearest = tops[0];
      let minDist = Math.abs(current - nearest.top);

      for (const t of tops) {
        const d = Math.abs(current - t.top);
        if (d < minDist) {
          minDist = d;
          nearest = t;
        }
      }

      // 너무 가까우면(사용자가 이미 거의 맞춘 상태) 자동 스냅 안 함 → 자연스러움
      if (minDist < 18) return;

      isAutoSnapping = true;

      scroller.scrollTo({
        top: nearest.top,
        behavior: "smooth",
      });

      // 스무스 스크롤 끝날 때까지 잠깐 락
      window.setTimeout(() => {
        isAutoSnapping = false;
      }, 520);
    };

    const onScroll = () => {
      // 사용자 스크롤 중에는 계속 대기하다가,
      // 스크롤이 "멈추면" 스냅 실행
      if (timer) clearTimeout(timer);

      // 자동 스냅 중이면 무시
      if (isAutoSnapping) return;

      timer = setTimeout(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(smoothSnapToNearest);
      }, 140);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    // 리사이즈 시에도 정확도 유지
    const onResize = () => {
      // 리사이즈 후 살짝 기다렸다가 nearest로 재정렬(튀지 않게)
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isAutoSnapping) smoothSnapToNearest();
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [sectionIds]);

  return (
    <>
      <Header />

      {/* ✅ 스크롤은 이 컨테이너에서만 */}
      <div
        ref={scrollerRef}
        className="snap-container h-screen overflow-y-auto bg-white"
      >
        {/* HERO */}
        <section id="hero" className="relative h-[92vh] min-h-[720px] w-full overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/intro/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/35" />

          {/* fixed header 보정 */}
          <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 pt-[78px]">
            <div className="max-w-2xl">
              <div className="text-[12px] tracking-[0.22em] text-white/85">WeMD Aesthetic</div>

              <h1 className="mt-3 text-[48px] font-semibold leading-[1.1] text-white md:text-[64px]">
                손 끝에서 피어나는 조화의 예술
              </h1>

              <p className="mt-6 text-[15px] leading-relaxed text-white/85 md:text-[16px]">
                섬세한 기술과 깊은 이해로
                <br />
                피부와 몸이 스스로 균형을 되찾도록 돕습니다.
                <br />
                WeMD Aesthetic은 하나의 완성된 경험을 만듭니다.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[44px] items-center justify-center rounded-full bg-white px-6 text-[14px] font-medium text-zinc-900 transition hover:bg-white/90"
                >
                  예약하기
                </a>

                <a
                  href="#brand"
                  className="inline-flex h-[44px] items-center justify-center rounded-full border border-white/70 px-6 text-[14px] font-medium text-white transition hover:bg-white hover:text-black"
                >
                  더 알아보기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ 섹션 래퍼: 컴포넌트는 그대로, wrapper에서만 높이/정렬 안정화 */}
        <section id="brand" className="min-h-[calc(100vh-78px)] bg-white pt-[78px]">
          <BrandStorySection />
        </section>

        <section id="branches" className="min-h-[calc(100vh-78px)] bg-white pt-[78px]">
          <BranchesSection />
        </section>

        <section id="franchise" className="min-h-[calc(100vh-78px)] bg-zinc-50 pt-[78px]">
          <FranchiseSection />
        </section>

        <div className="bg-[#1A1A1A]">
          <Footer />
        </div>
      </div>
    </>
  );
}