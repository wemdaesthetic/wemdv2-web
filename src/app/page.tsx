"use client";

import Header from "@/components/header/Header";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import Footer from "@/components/footer/Footer";
import { BOOKING_URL } from "@/config/nav";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* ✅ Header가 fixed라서 전체 컨텐츠는 헤더 높이만큼 내려줘야 함 */}
      <main className="bg-white pt-[78px]">
        {/* HERO */}
        {/* ✅ hero는 헤더 밑으로 밀리면 안되니까 -mt로 다시 당겨서 “영상이 맨 위”로 붙게 함 */}
        <section
          id="hero"
          className="relative -mt-[78px] h-[92vh] min-h-[720px] w-full overflow-hidden"
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

          <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
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

        {/* ✅ 원페이저 섹션들 (절대 삭제 금지) */}
        <BrandStorySection />
        <BranchesSection />
        <FranchiseSection />
      </main>

      <Footer />
    </>
  );
}