// FILE: src/app/page.tsx
"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import Header from "@/components/header/Header";
import MobileShell from "@/components/_legacy/MobileShell";

import ReviewsSection from "@/components/sections/ReviewsSection";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import Footer from "@/components/footer/Footer";

import { BOOKING_URL } from "@/config/nav";

const HEADER_H = 78;

/** CSS variable 타입 안전 처리 */
type HeroVars = CSSProperties & {
  "--prefixW": string;
};

export default function HomePage() {
  /* ===== HERO TEXT ===== */
  const prefixes = useMemo(
    () => ["작은얼굴은", "웨딩관리는", "체형개선은", "맞춤케어는"],
    []
  );

  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [prefixW, setPrefixW] = useState(0);

  /* prefix 최대 폭 측정 */
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
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [prefixes]);

  /* 단어 전환 */
  useEffect(() => {
    const HOLD = 2200;
    const OUT = 420;

    const id = window.setInterval(() => {
      setPhase("out");
      window.setTimeout(() => {
        setWordIdx((p) => (p + 1) % prefixes.length);
        setPhase("in");
      }, OUT);
    }, HOLD + OUT);

    return () => window.clearInterval(id);
  }, [prefixes.length]);

  const heroVars: HeroVars = {
    "--prefixW": prefixW ? `${prefixW}px` : "11ch",
  };

  return (
    <>
      {/* ===== MOBILE SHELL ===== */}
      <MobileShell
        variant="home"
        bookingUrl={BOOKING_URL}
        showReviewsLink
      />

      {/* ===== DESKTOP HEADER ===== */}
      <div className="hidden md:block">
        <Header />
      </div>

      <main className="bg-white">
        {/* ================= HERO ================= */}
        <section
          id="hero"
          className="relative w-full h-[100svh] md:h-[100vh] overflow-hidden bg-black"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover scale-[1.08] md:scale-[1.04]"
            src="/intro/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          <div className="relative z-10 flex items-center h-full max-w-6xl mx-auto px-4 pt-[88px] md:pt-[78px]">
            <div className="w-full text-center">
              <h1 className="hero-h1 text-white mt-10 md:mt-0">
                <span
                  ref={measureRef}
                  className="hero-measure absolute opacity-0 pointer-events-none"
                  aria-hidden
                />

                <span className="hero-grid" style={heroVars}>
                  <span className="hero-prefix-col">
                    <span
                      className={
                        phase === "out"
                          ? "hero-word hero-word-out"
                          : "hero-word hero-word-in"
                      }
                    >
                      {prefixes[wordIdx]}
                    </span>
                  </span>
                  <span className="hero-fixed">위엠디</span>
                </span>
              </h1>

              <p className="mt-6 md:mt-7 text-[16px] md:text-[22px] font-semibold text-white/90">
                손끝에서 피어나는 감동을 경험해보세요
              </p>

              {/* PC 버튼 */}
              <div className="hidden md:flex justify-center gap-3 mt-14">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="h-[46px] px-7 rounded-full bg-white text-zinc-900 text-[14px] font-medium"
                >
                  예약하기
                </a>
                <a
                  href="#brand"
                  className="h-[46px] px-7 rounded-full border border-white/70 text-white text-[14px] font-medium hover:bg-white hover:text-black transition"
                >
                  더 알아보기
                </a>
              </div>
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
            .hero-grid {
              display: inline-grid;
              grid-template-columns: var(--prefixW) auto;
              column-gap: 14px;
              align-items: baseline;
            }
            .hero-prefix-col {
              text-align: right;
              height: 1.25em;
            }
            .hero-word-out {
              animation: wordOut 420ms ease forwards;
            }
            .hero-word-in {
              animation: wordIn 520ms ease both;
            }
            @keyframes wordOut {
              to {
                opacity: 0;
                transform: translateY(14px);
              }
            }
            @keyframes wordIn {
              from {
                opacity: 0;
                transform: translateY(-14px);
              }
            }
          `}</style>
        </section>

        {/* ================= SECTIONS ================= */}
        <section id="reviews" style={{ scrollMarginTop: HEADER_H }}>
          <ReviewsSection />
        </section>

        <div className="h-px bg-zinc-100/80" />

        <section id="brand" style={{ scrollMarginTop: HEADER_H }}>
          <BrandStorySection />
        </section>

        <div className="h-px bg-zinc-100/80" />

        <section id="branches" style={{ scrollMarginTop: HEADER_H }}>
          <BranchesSection />
        </section>

        <div className="h-px bg-zinc-100/80" />

        <section id="franchise" style={{ scrollMarginTop: HEADER_H }}>
          <FranchiseSection />
        </section>

        <Footer />
      </main>
    </>
  );
}