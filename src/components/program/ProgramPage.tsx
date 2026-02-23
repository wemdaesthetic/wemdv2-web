
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileShell from "@/components/_legacy/MobileShell";

import ProgramHero from "./ProgramHero";
import ProgramTabs, { type ProgramTab } from "./ProgramTabs";
import ProgramInfo from "./ProgramInfo";
import ProgramProcess from "./ProgramProcess";
import PriceCards from "./PriceCards";

const ACCENT = "#B71919";

export type ProgramBase = {
  slug: string;
  titleKo: string;
  titleEn: string;

  // 프로그램별 이미지
  heroImgSrc?: string;
  infoImgSrc?: string;

  durationMin: number;
  priceOnce: number;
  priceTen: number;
  steps: string[];
  introTitle: string;
  introBody: string;

  // 추천대상
  recommendedTargets?: string[];
};

export type ProgramPageConfig = {
  basePath: "/face" | "/body" | "/custom";

  // fallback 이미지
  heroImageSrc: string;
  infoImageSrc: string;

  bookingUrl: string;
  programs: ProgramBase[];
};

function formatKRWSimple(n: number) {
  const s = String(n);
  let out = "";
  let cnt = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    out = s[i] + out;
    cnt++;
    if (cnt % 3 === 0 && i !== 0) out = "," + out;
  }
  return `${out}원`;
}

export default function ProgramPage({ config }: { config: ProgramPageConfig }) {
  const router = useRouter();
  const sp = useSearchParams();
  const { basePath, programs, bookingUrl, heroImageSrc, infoImageSrc } = config;

  const tabs: ProgramTab[] = useMemo(
    () => [
      { id: "프로그램 안내", label: "프로그램 안내" },
      { id: "프로그램 구성", label: "프로그램 구성" },
      { id: "가격", label: "가격" },
      { id: "예약", label: "예약" },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const p = sp.get("p");
    if (!p) return;
    const idx = programs.findIndex((x) => x.slug === p);
    if (idx >= 0) setActive(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const current = programs[active];

  const goProgram = (slug: string) => {
    const idx = programs.findIndex((x) => x.slug === slug);
    if (idx >= 0) {
      setActive(idx);
      router.replace(`${basePath}?p=${slug}`);
    }
  };

  // 프로그램별 이미지 우선, 없으면 config fallback 사용
  const heroSrc = current?.heroImgSrc || heroImageSrc;
  const infoSrc = current?.infoImgSrc || infoImageSrc;

  // ✅ 섹션 refs (any 제거: HTMLDivElement로 통일)
  const infoRef = useRef<HTMLDivElement | null>(null);
  const processRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);
  const reservationRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useMemo(
    () => ({
      "프로그램 안내": infoRef,
      "프로그램 구성": processRef,
      가격: priceRef,
      예약: reservationRef,
    }),
    []
  );

  // 모바일 홈/햄버거: 탭이 sticky로 붙으면 숨기기
  const tabsSentinelRef = useRef<HTMLDivElement | null>(null);
  const [showMobileTopButtons, setShowMobileTopButtons] = useState(true);

  useEffect(() => {
    const el = tabsSentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setShowMobileTopButtons(entry.isIntersecting),
      { root: null, rootMargin: "-1px 0px 0px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 모바일 TOP 버튼
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 420);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {showMobileTopButtons ? <MobileShell variant="manage" bookingUrl={bookingUrl} /> : null}

      {showTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="맨 위로"
          className="
            md:hidden
            fixed bottom-5 right-5 z-[2500]
            inline-flex h-12 w-12 items-center justify-center rounded-full
            bg-zinc-900/85 text-white backdrop-blur
            shadow-[0_18px_50px_rgba(0,0,0,0.25)]
            active:scale-[0.98]
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}

      <div className="hidden md:block">
        <Header />
      </div>

      <main className="bg-white">
        <ProgramHero
          heroImgSrc={heroSrc}
          titleKo={current.titleKo}
          titleEn={current.titleEn}
          items={programs.map((p) => ({ slug: p.slug, titleKo: p.titleKo }))}
          currentSlug={current.slug}
          onSelect={goProgram}
        />

        <div ref={tabsSentinelRef} className="h-[1px]" aria-hidden />

        <ProgramTabs accent={ACCENT} tabs={tabs} sectionRefs={sectionRefs} />

        {/* ✅ ref가 필요한 곳은 section 대신 div wrapper로 ref를 달아서 any 제거 */}
        <section id="프로그램 안내" className="bg-white">
          <div ref={infoRef} className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
            <ProgramInfo
              accent={ACCENT}
              infoImageSrc={infoSrc}
              introTitle={current.introTitle}
              introBody={current.introBody}
              recommendedTargets={current.recommendedTargets ?? []}
            />
          </div>
        </section>

        <section id="프로그램 구성" className="bg-zinc-50">
          <div ref={processRef} className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
            <div className="text-[12px] font-semibold tracking-[0.30em]" style={{ color: ACCENT }}>
              PROCESS
            </div>
            <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
              프로그램 구성
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-zinc-600 md:text-[16px]">
              WeMD의 관리는 다음과 같은 흐름으로 진행됩니다. 컨디션에 따라 순서/구성이 일부 달라질 수 있어요.
            </p>

            <div className="mt-8 md:mt-10">
              <ProgramProcess accent={ACCENT} steps={current.steps} />
            </div>
          </div>
        </section>

        <section id="가격" className="bg-white">
          <div ref={priceRef} className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
            <div className="text-[12px] font-semibold tracking-[0.30em]" style={{ color: ACCENT }}>
              PRICE
            </div>
            <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
              관리 가격 안내
            </h2>

            <div className="mt-10">
              <PriceCards
                accent={ACCENT}
                cards={[
                  {
                    type: "once",
                    price: current.priceOnce,
                    originalPrice: current.priceOnce,
                    durationMin: current.durationMin,
                  },
                  {
                    type: "ten",
                    price: current.priceTen,
                    originalPrice: current.priceOnce * 10,
                    durationMin: current.durationMin,
                  },
                ]}
                formatPrice={formatKRWSimple}
              />
            </div>
          </div>
        </section>

        <section id="예약" className="bg-white">
          <div ref={reservationRef} className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
            <div
              className="relative overflow-hidden rounded-[28px] p-8 text-white md:p-12"
              style={{ backgroundColor: ACCENT }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.18), transparent 55%)",
                }}
              />
              <div className="relative">
                <div className="text-[12px] font-semibold tracking-[0.30em] text-white/85">RESERVATION</div>
                <div className="mt-3 text-[20px] font-semibold tracking-tight md:text-[28px]">
                  지금, {current.titleKo} 예약하기
                </div>
                <div className="mt-2 text-[13px] text-white/90 md:text-[15px]">네이버 예약 페이지로 바로 이동합니다.</div>

                <div className="mt-8">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white text-[15px] font-semibold text-zinc-900 active:scale-[0.99] md:h-14 md:text-[16px]"
                  >
                    예약하기
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A]">
            <Footer />
          </div>
        </section>
      </main>
    </>
  );
}