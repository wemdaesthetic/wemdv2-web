"use client";

import { useEffect, useMemo, useRef } from "react";
import Header from "@/components/header/Header";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import Footer from "@/components/footer/Footer";
import { BOOKING_URL } from "@/config/nav";

const HEADER_H = 78;

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
          return { id, top: el.offsetTop };
        })
        .filter(Boolean) as { id: string; top: number }[];
    };

    const smoothSnapToNearest = () => {
      if (isAutoSnapping) return;

      const tops = getSectionTops();
      if (!tops.length) return;

      const current = scroller.scrollTop;

      let nearest = tops[0];
      let minDist = Math.abs(current - nearest.top);

      for (const t of tops) {
        const d = Math.abs(current - t.top);
        if (d < minDist) {
          minDist = d;
          nearest = t;
        }
      }

      if (minDist < 18) return;

      isAutoSnapping = true;
      scroller.scrollTo({ top: nearest.top, behavior: "smooth" });

      window.setTimeout(() => {
        isAutoSnapping = false;
      }, 520);
    };

    const onScroll = () => {
      if (timer) clearTimeout(timer);
      if (isAutoSnapping) return;

      timer = setTimeout(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(smoothSnapToNearest);
      }, 140);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
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
      <div ref={scrollerRef} className="snap-container h-screen overflow-y-auto bg-white">
        {/* HERO */}
        <section
          id="hero"
          className="
            relative w-full overflow-hidden
            h-[100svh] min-h-[100svh]
            md:h-[92vh] md:min-h-[720px]
          "
        >
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

          {/* ✅ MOBILE: 위쪽 배치 + 'WeMD Aesthetic' 제거 + 버튼 크게 + '더 알아보기' 제거 */}
          <div className="relative z-10 mx-auto h-full max-w-6xl px-4 pt-[72px] md:hidden">
            <div className="max-w-[320px]">
              <h1 className="mt-2 text-[34px] font-semibold leading-[1.15] tracking-tight text-white">
                웨딩관리는 위엠디
              </h1>

              <p className="mt-4 text-[14px] leading-relaxed text-white/85">
                손끝에서 피어나는 감동을 경험해보세요
              </p>

              <div className="mt-7">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex h-[52px] w-full items-center justify-center
                    rounded-full bg-white px-6 text-[15px] font-semibold text-zinc-900
                    transition hover:bg-white/90
                  "
                >
                  예약하기
                </a>
              </div>
            </div>
          </div>

          {/* ✅ DESKTOP: 기존 느낌 유지(PC 절대 건드리지 않기) */}
          <div className="relative z-10 mx-auto hidden h-full max-w-6xl items-center px-4 pt-[78px] md:flex">
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

        {/* ✅ 섹션 래퍼 */}
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