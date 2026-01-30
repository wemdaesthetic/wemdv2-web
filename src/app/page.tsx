// FILE: src/app/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import Header from "@/components/header/Header";
import ReviewsSection from "@/components/sections/ReviewsSection";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import Footer from "@/components/footer/Footer";

import MobileDrawer from "@/components/drawer/MobileDrawer";
import { BOOKING_URL } from "@/config/nav";

const HEADER_H = 78;
const ACCENT = "#B71919";

export default function HomePage() {
  const prefixes = useMemo(() => ["작은얼굴은", "웨딩관리는", "체형개선은", "맞춤케어는"], []);

  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  // prefix 최대 폭 측정
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [prefixW, setPrefixW] = useState<number>(0);

  // ✅ MOBILE DRAWER
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ CTA: 스크롤 내리면 우측하단 원형 버튼
  const [showFab, setShowFab] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 260);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // HERO prefix measure
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      let max = 0;
      for (const t of prefixes) {
        el.textContent = t;
        const w = Math.ceil(el.getBoundingClientRect().width);
        if (w > max) max = w;
      }
      setPrefixW(max);
    };

    measure();
    const t1 = window.setTimeout(measure, 100);
    const t2 = window.setTimeout(measure, 300);

    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, [prefixes]);

  // HERO word animation
  useEffect(() => {
    const HOLD_MS = 2200;
    const OUT_MS = 420;

    const interval = window.setInterval(() => {
      setPhase("out");
      window.setTimeout(() => {
        setWordIdx((p) => (p + 1) % prefixes.length);
        setPhase("in");
      }, OUT_MS);
    }, HOLD_MS + OUT_MS);

    return () => window.clearInterval(interval);
  }, [prefixes.length]);

  const currentPrefix = prefixes[wordIdx];

  return (
    <>
      {/* ✅ PC에서만 Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      <main className="bg-white">
        {/* ✅ MOBILE FIXED TOPBAR: 로고 가운데 + 햄버거 */}
        <div
  className={[
    "md:hidden fixed top-0 left-0 right-0 z-[10000] pointer-events-none",
    mobileMenuOpen ? "hidden" : "",
  ].join(" ")}
>
          <div
            className="relative h-[88px] px-4 flex items-center justify-end"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <a
              href="/"
              className="pointer-events-auto absolute left-1/2 -translate-x-1/2"
              aria-label="홈으로"
            >
              <img
                src="/logo-main.png"
                alt="WeMD Aesthetic"
                className="h-14 w-auto object-contain"
                draggable={false}
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="
                pointer-events-auto
                inline-flex h-14 w-14 items-center justify-center
                rounded-full bg-black/25 text-white backdrop-blur
                transition hover:bg-black/35 active:scale-[0.96]
              "
              aria-label="메뉴 열기"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* ===== HERO ===== */}
        <section
          id="hero"
          className="
            relative w-full overflow-hidden bg-black
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
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 md:pt-[78px] pt-[88px]">
            <div className="mx-auto w-full max-w-5xl text-center">
              <h1 className="hero-h1 mx-auto text-white md:mt-0 mt-10">
                <span ref={measureRef} className="hero-measure pointer-events-none absolute -z-10 opacity-0" aria-hidden="true" />

                <span
                  className="hero-grid"
                  style={
                    {
                      ["--prefixW" as any]: prefixW ? `${prefixW}px` : "11ch",
                    } as React.CSSProperties
                  }
                >
                  <span className="hero-prefix-col">
                    <span className={phase === "out" ? "hero-word hero-word-out" : "hero-word hero-word-in"}>
                      {currentPrefix}
                    </span>
                  </span>

                  <span className="hero-fixed">위엠디</span>
                </span>
              </h1>

              <div className="mt-6 text-[16px] font-semibold leading-relaxed text-white/90 md:mt-7 md:text-[22px]">
                손끝에서 피어나는 감동을 경험해보세요
              </div>
            </div>

            {/* ✅ 모바일 큰 CTA는 일단 유지 (너 요청대로 “통일”은 다음 단계에서 여기 제거하면 됨) */}
            <div className="md:hidden absolute inset-x-0 bottom-0 z-20 px-4 pb-6">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className={[
                  "inline-flex h-[54px] w-full items-center justify-center rounded-2xl bg-white text-[15px] font-semibold text-zinc-900 transition active:scale-[0.99]",
                  showFab ? "opacity-0 pointer-events-none translate-y-2" : "opacity-100",
                ].join(" ")}
              >
                예약하기
              </a>
            </div>

            {/* ✅ PC 버튼 유지 */}
            <div className="hidden md:flex absolute left-1/2 top-[calc(50%+140px)] -translate-x-1/2 items-center justify-center gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[46px] items-center justify-center rounded-full bg-white px-7 text-[14px] font-medium text-zinc-900 transition hover:bg-white/90"
              >
                예약하기
              </a>

              <a
                href="#brand"
                className="inline-flex h-[46px] items-center justify-center rounded-full border border-white/70 px-7 text-[14px] font-medium text-white transition hover:bg-white hover:text-black"
              >
                더 알아보기
              </a>
            </div>
          </div>

          <style jsx>{`
            .hero-h1 {
              font-weight: 400;
              letter-spacing: -0.03em;
              line-height: 1.05;
              font-size: 40px;
              display: flex;
              justify-content: center;
            }
            @media (min-width: 768px) {
              .hero-h1 {
                font-size: 78px;
              }
            }
            @media (min-width: 1024px) {
              .hero-h1 {
                font-size: 62px;
              }
            }
            .hero-measure {
              font-weight: inherit;
              font-size: inherit;
              letter-spacing: inherit;
              line-height: inherit;
              white-space: nowrap;
            }
            .hero-grid {
              display: inline-grid;
              grid-template-columns: var(--prefixW) auto;
              align-items: baseline;
              column-gap: 14px;
              white-space: nowrap;
            }
            .hero-prefix-col {
              text-align: right;
              position: relative;
              height: 1.25em;
              overflow: visible;
            }
            .hero-fixed {
              display: inline-block;
            }
            .hero-word {
              display: inline-block;
              will-change: transform, opacity;
              transform: translateZ(0);
            }
            .hero-word-out {
              animation: wordOut 420ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
            .hero-word-in {
              animation: wordIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
            }
            @keyframes wordOut {
              0% {
                opacity: 1;
                transform: translateY(0);
              }
              100% {
                opacity: 0;
                transform: translateY(14px);
              }
            }
            @keyframes wordIn {
              0% {
                opacity: 0;
                transform: translateY(-14px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>

        {/* ✅ MOBILE: 스크롤 후 우측하단 원형 CTA */}
        {showFab ? (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="예약하기"
            className="
              md:hidden
              fixed right-5 z-[9000]
              inline-flex h-14 w-14 items-center justify-center rounded-full
              text-white text-[13px] font-extrabold tracking-tight
              shadow-[0_18px_50px_rgba(183,25,25,0.35)]
              active:scale-[0.95]
            "
            style={{
              backgroundColor: ACCENT,
              bottom: "calc(env(safe-area-inset-bottom) + 60px)",
            }}
          >
            <span className="fab-pulse" aria-hidden />
            <span className="relative z-10">예약</span>

            <style jsx>{`
              .fab-pulse {
                position: absolute;
                inset: 0;
                border-radius: 9999px;
                box-shadow: 0 0 0 0 rgba(183, 25, 25, 0.55);
                animation: pulse 1.6s ease-out infinite;
              }
              @keyframes pulse {
                0% {
                  transform: scale(1);
                  opacity: 1;
                  box-shadow: 0 0 0 0 rgba(183, 25, 25, 0.55);
                }
                100% {
                  transform: scale(1.35);
                  opacity: 0;
                  box-shadow: 0 0 0 18px rgba(183, 25, 25, 0);
                }
              }
            `}</style>
          </a>
        ) : null}

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

        {/* ✅✅✅ 드로어: 페이지에선 이 한 줄로 끝 */}
        <MobileDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          bookingUrl={BOOKING_URL}
          variant="home"
          showReviewsLink={true} // "WeMD 에스테틱" 대신 "고객후기" 노출
        />
      </main>
    </>
  );
}