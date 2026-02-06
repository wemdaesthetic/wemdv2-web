// FILE: src/components/mobile/MobileHome.tsx
"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/header/Header";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import { BOOKING_URL } from "@/config/nav";

const HEADER_H = 78;

type HeroVars = CSSProperties & Record<"--prefixW", string>;

export default function HomePage() {
  const prefixes = useMemo(() => ["작은얼굴은", "웨딩관리는", "체형개선은", "맞춤케어는"], []);

  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [prefixW, setPrefixW] = useState<number>(0);

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

  const heroVars: HeroVars = {
    "--prefixW": prefixW ? `${prefixW}px` : "11ch",
  };

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* ===== HERO ===== */}
        <section
          id="hero"
          className="
            relative w-full overflow-hidden bg-black
            h-[100svh] min-h-[100svh]
            md:h-[92vh] md:min-h-[720px]
          "
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/intro/hero-mobile.jpg"
            alt="WeMD Hero"
            className="absolute inset-0 h-full w-full object-cover md:hidden"
            draggable={false}
          />

          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            src="/intro/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div
            className="
              relative z-10 mx-auto flex h-full max-w-6xl px-4
              pt-[78px]
              items-start
              md:items-center
            "
          >
            <div className="mx-auto w-full max-w-5xl text-center">
              <h1 className="hero-h1 mx-auto text-white">
                <span
                  ref={measureRef}
                  className="hero-measure pointer-events-none absolute -z-10 opacity-0"
                  aria-hidden="true"
                />

                <span className="hero-grid" style={heroVars}>
                  <span className="hero-prefix-col">
                    <span className={phase === "out" ? "hero-word hero-word-out" : "hero-word hero-word-in"}>
                      {currentPrefix}
                    </span>
                  </span>

                  <span className="hero-fixed">위엠디</span>
                </span>
              </h1>

              <div
                className="
                  mt-6 text-white/90 font-semibold leading-relaxed
                  text-[17px]
                  md:mt-7 md:text-[22px]
                "
              >
                손끝에서 피어나는 감동을 경험해보세요
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 md:mt-10 md:flex-row md:gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex items-center justify-center rounded-full
                    bg-white text-zinc-900 transition hover:bg-white/90
                    h-[52px] px-8 text-[15px] font-semibold
                    w-full max-w-[320px]
                    md:h-[46px] md:w-auto md:px-7 md:text-[14px] md:font-medium
                  "
                >
                  예약하기
                </a>

                <a
                  href="#brand"
                  className="
                    hidden md:inline-flex
                    h-[46px] items-center justify-center rounded-full
                    border border-white/70 px-7 text-[14px] font-medium text-white
                    transition hover:bg-white hover:text-black
                  "
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
              margin-top: 22px;
            }
            @media (min-width: 768px) {
              .hero-h1 {
                margin-top: 0;
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

        <section id="brand" style={{ scrollMarginTop: HEADER_H }}>
          <BrandStorySection />
        </section>

        <section id="branches" style={{ scrollMarginTop: HEADER_H }}>
          <BranchesSection />
        </section>

        <section id="franchise" style={{ scrollMarginTop: HEADER_H }}>
          <FranchiseSection />
        </section>
      </main>
    </>
  );
}