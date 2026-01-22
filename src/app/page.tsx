"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/header/Header";
import BrandStorySection from "@/components/brand/BrandStorySection";
import BranchesSection from "@/components/sections/BranchesSection";
import FranchiseSection from "@/components/sections/FranchiseSection";
import Footer from "@/components/footer/Footer";
import { BOOKING_URL } from "@/config/nav";

const HEADER_H = 78;

export default function HomePage() {
  const prefixes = useMemo(
    () => ["작은얼굴은", "웨딩관리는", "체형개선은", "맞춤케어는"],
    []
  );

  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  // ✅ prefix 최대 폭(실제 H1 스타일로 측정해서 고정)
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [prefixW, setPrefixW] = useState<number>(0);

  // ✅ MOBILE DRAWER
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // ✅ 모바일 메뉴 열렸을 때 배경 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const currentPrefix = prefixes[wordIdx];

  return (
    <>
      {/* ✅ PC에서만 Header 렌더 (모바일 상단바 완전 제거) */}
      <div className="hidden md:block">
        <Header />
      </div>

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

          {/* ✅ MOBILE: 상단 '고정' 로고 + 햄버거 (1.5배) */}
          <div
            className="
              md:hidden
              fixed top-0 left-0 right-0 z-30
              h-[88px]
              px-5
              flex items-center justify-between
              pointer-events-none
            "
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            {/* 가운데 메인 로고 (1.5배: h-16) */}
            <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
              <img
                src="/logo-main.png"
                alt="WeMD Aesthetic"
                className="h-16 w-auto object-contain"
                draggable={false}
              />
            </div>

            {/* 햄버거 (1.5배: 버튼 16, 아이콘 28) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="
                pointer-events-auto
                ml-auto
                inline-flex h-16 w-16 items-center justify-center
                rounded-full bg-black/25 text-white backdrop-blur
                transition hover:bg-black/35 active:scale-[0.96]
              "
              aria-label="메뉴 열기"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* ✅ CONTENT */}
          <div
            className="
              relative z-10 mx-auto flex h-full max-w-6xl items-center px-4
              md:pt-[78px]
              pt-0
            "
          >
            <div className="mx-auto w-full max-w-5xl text-center">
              {/* ✅ H1 (PC는 기존 그대로, 모바일은 위로 조금 올림) */}
              <h1 className="hero-h1 mx-auto text-white md:mt-0 mt-10">
                {/* 측정용 */}
                <span
                  ref={measureRef}
                  className="hero-measure pointer-events-none absolute -z-10 opacity-0"
                  aria-hidden="true"
                />

                <span
                  className="hero-grid"
                  style={
                    {
                      ["--prefixW" as any]: prefixW ? `${prefixW}px` : "11ch",
                    } as React.CSSProperties
                  }
                >
                  <span className="hero-prefix-col">
                    <span
                      className={
                        phase === "out"
                          ? "hero-word hero-word-out"
                          : "hero-word hero-word-in"
                      }
                    >
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

            {/* ✅ MOBILE: 하단 고정 CTA */}
            <div className="md:hidden absolute inset-x-0 bottom-0 z-20 px-4 pb-6">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex h-[54px] w-full items-center justify-center
                  rounded-2xl bg-white
                  text-[15px] font-semibold text-zinc-900
                  transition active:scale-[0.99]
                "
              >
                예약하기
              </a>
            </div>

            {/* ✅ PC 버튼은 기존 그대로 유지 */}
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

          {/* ✅ HERO 스타일/애니메이션 */}
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

        {/* ===== BRAND ===== */}
        <section id="brand" style={{ scrollMarginTop: HEADER_H }}>
          <BrandStorySection />
        </section>

        {/* ===== BRANCHES ===== */}
        <section id="branches" style={{ scrollMarginTop: HEADER_H }}>
          <BranchesSection />
        </section>

        {/* ===== FRANCHISE ===== */}
        <section id="franchise" style={{ scrollMarginTop: HEADER_H }}>
          <FranchiseSection />
        </section>

        {/* ===== FOOTER ===== */}
        <div className="bg-[#1A1A1A]">
          <Footer />
        </div>

        {/* ===================== MOBILE DRAWER MENU ===================== */}
        {mobileMenuOpen ? (
          <div className="md:hidden fixed inset-0 z-[999]">
            {/* overlay */}
            <button
              type="button"
              className="absolute inset-0 bg-black/55"
              aria-label="메뉴 닫기"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* panel */}
            <div
              className="
                absolute right-0 top-0 h-full w-[86%] max-w-[360px]
                bg-white
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                flex flex-col
              "
              role="dialog"
              aria-modal="true"
            >
              {/* top */}
              <div className="flex items-center justify-between px-5 pt-5">
                <div className="text-[14px] font-semibold text-zinc-900">메뉴</div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100 active:scale-[0.98]"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="닫기"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* menu list */}
              <div className="mt-4 px-5 pb-5">
                <div className="text-[13px] font-semibold text-zinc-400">WeMD 에스테틱</div>

                <nav className="mt-4 flex flex-col">
                  <a
                    href="/face"
                    className="py-3 text-[16px] font-semibold text-zinc-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    얼굴 관리
                  </a>
                  <a
                    href="/body"
                    className="py-3 text-[16px] font-semibold text-zinc-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    바디 관리
                  </a>
                  <a
                    href="/custom"
                    className="py-3 text-[16px] font-semibold text-zinc-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    맞춤 케어
                  </a>

                  <div className="my-4 h-px w-full bg-zinc-200" />

                  <a
                    href="/branches/dunchon"
                    className="py-3 text-[16px] font-semibold text-zinc-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    지점 안내
                  </a>
                  <a
                    href="#franchise"
                    className="py-3 text-[16px] font-semibold text-zinc-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    가맹 문의
                  </a>
                </nav>
              </div>

              {/* bottom CTA */}
              <div className="mt-auto border-t border-zinc-200 p-5">
                <div className="grid gap-3">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex h-[52px] w-full items-center justify-center
                      rounded-2xl bg-zinc-900 text-[15px] font-semibold text-white
                      active:scale-[0.99]
                    "
                  >
                    예약하기
                  </a>
                  <a
                    href="tel:0269598989"
                    className="
                      inline-flex h-[52px] w-full items-center justify-center
                      rounded-2xl bg-zinc-100 text-[15px] font-semibold text-zinc-900
                      active:scale-[0.99]
                    "
                  >
                    전화상담
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}