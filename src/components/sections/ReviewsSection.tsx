// FILE: src/components/sections/ReviewsSection.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const ACCENT = "#B71919";

// 카드 톤(은은한 웜 베이지)
const CARD_BG = "#F4EEE8";
const CARD_BORDER = "rgba(0,0,0,0.06)";
const FADE_BG = "#FFFFFF";

type Review = {
  id: string;
  program: string;
  date: string;
  stars: number;
  text: string;
  author: string;
  meta: string;
};

function Stars({ stars }: { stars: number }) {
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-[13px] leading-none"
          style={{ color: i < stars ? ACCENT : "rgba(0,0,0,0.14)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      {dir === "left" ? (
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function ReviewsSection() {
  const reviews: Review[] = useMemo(
    () => [
      {
        id: "1",
        program: "작은 얼굴 관리",
        date: "2026.01.26",
        stars: 5,
        text:
          "대표 원장님 손이 완전 금손..다른 유명 샵에서도 받아 봤지만,, 위엠디는 합리적인 가격으로 꼼꼼한 테크닉까지 완벽해요! 새로 생겨서 시설도 좋고 무엇보다 얼굴에 닿는 모든 스킨케어 제품들이 좋은 제품들오 케어해 주셔서 피부 관리샵 다닌거 처럼 얼굴이 맑아졌어요! 오늘도 눈물은 찔끔 흘렸지만,, 예뻐지기 위해 참을거예요!! 3회차 까지 받아보고 좋아서 내돈내산 후기 남깁니다!",
        author: "이소**** 고객님",
        meta: "둔촌본점",
      },
      {
        id: "2",
        program: "웨딩 관리",
        date: "2026.01.23",
        stars: 5,
        text:
          "곧 결혼 예정이라 친구 추천으로 다녀왔습니다! 관리 처음 받아봤는데, 너무 좋네요.. 일단 매장 자체가 매우 청결하고 깔끔해서 좋았습니다. 관리 후에 파우더 룸에서 머리 정리나 화장도 할 수 있어서 더더욱 좋았어요! 두피도 싹싹 다 풀어주시고 광대도 뿌셔뿌셔 해주셔서 대만족입니다! 뭉친 뒷목과 어깨까지 하나하나 다 풀어주셔서 그런가..팩할 때 꿀잠잤네요ㅎ 관리 후 파우더룸에서 머리 정리하며 거울을 봤는데 확실히 붓기며 혈색이 달라졌더라구요! 여러번 받으면 더 확실한 효과가 있을 것 같아 기대가 됩니다!",
        author: "suj**** 고객님",
        meta: "둔촌본점",
      },
      {
        id: "3",
        program: "얼굴 리프팅 관리",
        date: "2026.01.15",
        stars: 5,
        text:
          "받는 동안 압도 계속 체크해주셔서 아프기보다는 시원하게 받을 수 있었어요~ 관리 끝나고 거울 보니까 턱선이랑 얼굴 라인이 정리된 느낌이 바로 들었고, 붓기도 많이 빠져있었습니다! 확실히 받고나니 얼굴이 한결 가볍고 혈색도 좋아진 느낌이었어요ㅎㅎ 관리 후 스킨케어도 해주시고 헤어정돈 할 수 있는 공간도 따로 마련되어있어서 편하게 관리받고 왔습니다.",
        author: "lovem**** 고객님",
        meta: "둔촌본점",
      },
    ],
    []
  );

  const count = reviews.length;
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // 반응형 측정
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [vw, setVw] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.getBoundingClientRect().width ?? window.innerWidth;
      setVw(Math.round(w));
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 카드 크기
  const gap = isDesktop ? 28 : 18;
  const cardW = isDesktop ? 360 : Math.min(Math.round(vw * 0.8), 340);
  const cardH = isDesktop ? 430 : 360;

  // 중앙정렬 기준(데스크탑 정중앙)
  const centerX = Math.round((vw - cardW) / 2);
  const baseTranslateX = -(index * (cardW + gap)) + centerX;

  // 스와이프
  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const [dragX, setDragX] = useState(0);

  const goPrev = () => setIndex((p) => (p - 1 + count) % count);
  const goNext = () => setIndex((p) => (p + 1) % count);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    lastX.current = e.clientX;
    setDragX(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (Math.abs(dy) > Math.abs(dx) * 1.15) return;

    lastX.current = e.clientX;
    setDragX(dx);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;

    const dx = lastX.current - startX.current;
    const threshold = Math.max(40, Math.round(cardW * 0.18));

    if (dx <= -threshold) goNext();
    else if (dx >= threshold) goPrev();

    setDragX(0);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // 데스크탑 키보드
  useEffect(() => {
    if (!isDesktop) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowLeft") goPrev();
      if (ev.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, count]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
        {/* ✅ 새 섹션 타이틀 규격: 모바일 left / 데스크탑 center */}
        <div className="relative">
          <div className="text-left md:text-center">
            <div
              className="font-['Pretendard'] font-bold text-[30px] leading-[36px] md:text-[46px] md:leading-[55px]"
              style={{ color: ACCENT }}
            >
              Review
            </div>

            <div
              className="mt-2 font-['Pretendard'] font-light text-[20px] leading-[24px] md:text-[30px] md:leading-[36px]"
              style={{ color: "#404040" }}
            >
              고객님의 Real 리뷰
            </div>

            <div
              className="mt-2 font-['Pretendard'] font-light text-[18px] leading-[18px] md:text-[20px] md:leading-[24px]"
              style={{ color: "#9A9A9A" }}
            >
              WeMD에서 경험한 변화와 만족을 확인해보세요.
            </div>
          </div>

          {/* 데스크탑 화살표(정중앙 방해 X) */}
          <div className="hidden md:flex items-center gap-2 absolute right-0 top-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="이전 리뷰"
              className="
                inline-flex h-11 w-11 items-center justify-center rounded-full
                bg-white/70 backdrop-blur-md
                ring-1 ring-black/5
                text-zinc-800
                hover:bg-white
                active:scale-[0.98]
              "
              style={{ boxShadow: "0 10px 26px rgba(15,23,42,0.08)" }}
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="다음 리뷰"
              className="
                inline-flex h-11 w-11 items-center justify-center rounded-full
                bg-white/70 backdrop-blur-md
                ring-1 ring-black/5
                text-zinc-800
                hover:bg-white
                active:scale-[0.98]
              "
              style={{ boxShadow: "0 10px 26px rgba(15,23,42,0.08)" }}
            >
              <ArrowIcon dir="right" />
            </button>
          </div>
        </div>

        {/* 캐러셀: 모바일 edge-to-edge / 데스크탑 페이드 */}
        <div
          ref={wrapRef}
          className="relative mt-10 -mx-4 md:mx-0 overflow-hidden"
          style={{
            WebkitMaskImage: isDesktop
              ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
              : "none",
            maskImage: isDesktop
              ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
              : "none",
          }}
        >
          <div
            className="relative"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              touchAction: "pan-y",
              userSelect: "none",
              background: FADE_BG,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <div
              className="flex items-stretch"
              style={{
                gap,
                transform: `translate3d(${baseTranslateX + dragX}px, 0, 0)`,
                transition: dragging.current
                  ? "none"
                  : "transform 420ms cubic-bezier(0.2,0.8,0.2,1)",
                willChange: "transform",
              }}
            >
              {reviews.map((r) => {
                const isOpen = !!expanded[r.id];

                return (
                  <article
                    key={r.id}
                    className="shrink-0 rounded-[26px]"
                    style={{
                      width: cardW,
                      minHeight: cardH,
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                      boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
                      overflow: "hidden",
                    }}
                  >
                    <div className="flex h-full flex-col justify-between p-6">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[15px] font-semibold text-zinc-900">{r.program}</p>
                            <div className="mt-2">
                              <Stars stars={r.stars} />
                            </div>
                          </div>
                          <span className="text-[12px] text-zinc-500">{r.date}</span>
                        </div>

                        <p
                          className={`mt-5 text-[15.5px] leading-relaxed text-zinc-800 ${
                            isOpen ? "" : "line-clamp-6"
                          }`}
                        >
                          {r.text}
                        </p>

                        {!isOpen ? (
                          <button
                            type="button"
                            onClick={() => setExpanded((p) => ({ ...p, [r.id]: true }))}
                            className="mt-3 text-[13px] font-medium text-zinc-700"
                          >
                            …더보기
                          </button>
                        ) : null}
                      </div>

                      <div className="mt-8 flex items-center gap-3">
                        <div
                          className="h-11 w-11 rounded-full flex items-center justify-center font-bold text-white"
                          style={{ backgroundColor: ACCENT }}
                        >
                          W
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-zinc-900">{r.author}</div>
                          <div className="text-[12px] text-zinc-500">{r.meta}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* 인디케이터(모바일) */}
            <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
              {reviews.map((r, i) => {
                const active = i === index;
                return (
                  <span
                    key={r.id}
                    className="inline-block h-[8px] w-[8px] rounded-full"
                    style={{
                      background: active ? ACCENT : "rgba(0,0,0,0.14)",
                      transform: active ? "scale(1.05)" : "scale(1)",
                      transition: "transform 200ms ease",
                    }}
                    aria-hidden
                  />
                );
              })}
            </div>

            {isDesktop ? (
              <>
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-16"
                  style={{
                    background: `linear-gradient(to right, ${FADE_BG} 0%, rgba(255,255,255,0) 100%)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 w-16"
                  style={{
                    background: `linear-gradient(to left, ${FADE_BG} 0%, rgba(255,255,255,0) 100%)`,
                  }}
                />
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <a href="/#reviews" className="inline-flex items-center gap-2 text-[14px] font-semibold text-zinc-900">
            후기 더보기 <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}