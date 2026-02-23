
"use client";

import React, { useEffect, useMemo, useState } from "react";
import MobileDrawer from "@/components/drawer/MobileDrawer";
import { BOOKING_URL as DEFAULT_BOOKING_URL } from "@/config/nav";

const ACCENT = "#B71919";

type Props = {
  variant: "home" | "manage";
  bookingUrl?: string;
  homeWhiteBarAfter?: number; // default 20
  topAfter?: number; // default 520

  // ✅ page.tsx에서 넘겨도 타입 에러 안나게 (지금은 UI에 안써도 됨)
  showReviewsLink?: boolean;
};

export default function MobileShell({
  variant,
  bookingUrl,
  homeWhiteBarAfter = 20,
  topAfter = 520,
  showReviewsLink,
}: Props) {
  // (현재 파일에서는 안 쓰지만, props로 받는 건 의미 있음)
  void showReviewsLink;

  const BOOKING = bookingUrl || DEFAULT_BOOKING_URL;

  const consultTelHref = useMemo(() => {
    const CONSULT_TEL = "02-6959-8989";
    return `tel:${CONSULT_TEL.replaceAll("-", "").replaceAll(" ", "")}`;
  }, []);

  const [open, setOpen] = useState(false);

  // scroll
  const [scY, setScY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScY(window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showHomeWhiteBar = variant === "home" ? scY > homeWhiteBarAfter : true;
  const showTop = scY > topAfter;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // glass preset
  const glassCircle =
    "bg-white/16 backdrop-blur-md ring-1 ring-white/35 shadow-[0_14px_40px_rgba(0,0,0,0.18)]";

  return (
    <>
      {/* ================= MOBILE TOP UI ================= */}
      {variant === "home" ? (
        // ✅ 홈: 드로어 열리면 topbar 자체를 숨겨서 "원형 X 겹침/가림" 제거
        !open ? (
          <div className="md:hidden fixed top-0 left-0 right-0 z-[10000]">
            <div
              className={[
                "relative px-4 flex items-center justify-end",
                "transition-colors duration-300",
                showHomeWhiteBar ? "bg-white/92 backdrop-blur ring-1 ring-black/5" : "bg-transparent",
              ].join(" ")}
              style={{
                height: "calc(env(safe-area-inset-top) + 72px)",
                paddingTop: "env(safe-area-inset-top)",
              }}
            >
              {/* logo center */}
              <a href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="홈으로">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-main.png"
                  alt="WeMD Aesthetic"
                  className="h-11 w-auto object-contain"
                  draggable={false}
                />
              </a>

              {/* hamburger */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="메뉴 열기"
                className={[
                  "inline-flex h-12 w-12 items-center justify-center rounded-full",
                  "transition active:scale-[0.96]",
                  glassCircle,
                ].join(" ")}
                style={{
                  boxShadow:
                    "0 14px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 0 0 1px rgba(255,255,255,0.18)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke={ACCENT}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : null
      ) : (
        // manage: 좌상단 홈 / 우상단 햄버거(글라스)
        <div className="md:hidden">
          <a
            href="/"
            aria-label="홈으로"
            className={[
              "fixed left-4 z-[10000] inline-flex h-12 w-12 items-center justify-center rounded-full text-zinc-900",
              glassCircle,
              "active:scale-[0.98]",
              open ? "hidden" : "",
            ].join(" ")}
            style={{ top: "calc(env(safe-area-inset-top) + 12px)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 11.5l9-7 9 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 10.5V20h13V10.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="메뉴"
            className={[
              "fixed right-4 z-[10000] inline-flex h-12 w-12 items-center justify-center rounded-full text-zinc-900",
              glassCircle,
              "active:scale-[0.98]",
              open ? "hidden" : "",
            ].join(" ")}
            style={{ top: "calc(env(safe-area-inset-top) + 12px)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* ================= HOME: 예약 FAB (드로어 열리면 숨김) ================= */}
      {variant === "home" && !open ? (
        <a
          href={BOOKING}
          target="_blank"
          rel="noreferrer"
          aria-label="예약하기"
          className="
            md:hidden fixed right-5 z-[9000]
            inline-flex h-14 w-14 items-center justify-center rounded-full
            text-white text-[13px] font-extrabold tracking-tight
            shadow-[0_18px_50px_rgba(183,25,25,0.35)]
            active:scale-[0.95]
          "
          style={{
            backgroundColor: ACCENT,
            bottom: showTop
              ? "calc(env(safe-area-inset-bottom) + 128px)"
              : "calc(env(safe-area-inset-bottom) + 68px)",
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

      {/* ================= TOP 버튼 (드로어 열리면 숨김) ================= */}
      {!open && showTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="맨 위로"
          className="
            md:hidden fixed right-5 z-[9000]
            inline-flex h-14 w-14 items-center justify-center rounded-full
            text-white
            shadow-[0_18px_50px_rgba(183,25,25,0.35)]
            active:scale-[0.95]
          "
          style={{
            backgroundColor: ACCENT,
            bottom:
              variant === "home"
                ? "calc(env(safe-area-inset-bottom) + 60px)"
                : "calc(env(safe-area-inset-bottom) + 20px)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}

      {/* ================= MOBILE DRAWER ================= */}
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        bookingUrl={BOOKING}
        consultTelHref={consultTelHref}
        variant={variant}
      />
    </>
  );
}