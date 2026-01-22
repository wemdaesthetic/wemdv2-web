"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function BrandStorySection() {
  const frames = useMemo(
    () => [
      { src: "/brand/bi-step.svg", alt: "WeMD BI Process" },
      { src: "/brand/logo-signature.svg", alt: "WeMD Signature" },
    ],
    []
  );

  const total = frames.length;
  const [idx, setIdx] = useState(0);
  const [imgOk, setImgOk] = useState<boolean[]>(() => frames.map(() => true));

  // ✅ autoplay (느리게 + 유지)
  const intervalRef = useRef<number | null>(null);
  const AUTOPLAY_MS = 6200;

  const goTo = (nextIdx: number) => {
    setIdx(() => {
      const n = ((nextIdx % total) + total) % total;
      return n;
    });
  };

  const restartAutoplay = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIdx((p) => (p + 1) % total);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    setImgOk(frames.map(() => true));
  }, [frames]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(
    2,
    "0"
  )}`;

  // ===================== SWIPE =====================
  const startXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lockRef = useRef(false);

  const SWIPE_THRESHOLD = 44;
  const LOCK_MS = 360;

  const lock = () => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, LOCK_MS);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    if (startXRef.current == null) return;

    const dx = e.clientX - startXRef.current;

    if (!lockRef.current && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) goTo(idx + 1);
      else goTo(idx - 1);

      restartAutoplay();
      lock();
      startXRef.current = e.clientX;
    }
  };

  const onPointerUp = () => {
    draggingRef.current = false;
    startXRef.current = null;
  };

  // ✅ /public/core/ 아래에 넣은 아이콘 파일명에 맞춰서만 수정
  const values = [
    {
      ko: "사람",
      desc: "사람을 중심에 둔 섬세한 케어",
      icon: "/core/human.svg",
      alt: "Human",
    },
    {
      ko: "기술",
      desc: "근거 기반의 정교한 테크닉",
      icon: "/core/technology.svg",
      alt: "Technology",
    },
    {
      ko: "문화",
      desc: "라이프스타일을 담은 경험",
      icon: "/core/culture.svg",
      alt: "Culture",
    },
    {
      ko: "조화",
      desc: "균형과 흐름을 설계하는 미학",
      icon: "/core/harmony.svg",
      alt: "Harmony",
    },
    {
      ko: "쉼",
      desc: "긴장을 풀고 회복에 집중하는 시간",
      icon: "/core/rest.svg",
      alt: "Rest",
    },
  ];

  return (
    <section id="brand" className="bg-white scroll-mt-[78px]">
      <div className="mx-auto max-w-6xl px-4 py-28">
        {/* ✅ 섹션 타이틀 (가운데 정렬) */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-[40px] font-semibold tracking-tight text-zinc-900 md:text-[52px]">
            브랜드 스토리
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
            손끝에서 피어나는 조화의 예술, K-Beauty의 새로운 기준을 제시합니다
          </p>
        </div>

        {/* ===== 2 CARDS ===== */}
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          {/* ===================== LEFT CARD ===================== */}
          <div className="h-full rounded-[28px] bg-white p-10 shadow-[0_18px_70px_rgba(15,23,42,0.10)]">
            <div className="flex h-full flex-col">
              <div className="text-[12px] tracking-[0.22em] text-zinc-500">
                WeMD Slogan
              </div>

              {/* ✅ We/M/D만 회색->빨강 반복 + a는 회색 */}
              <h3 className="mt-6 text-[62px] font-normal leading-[1.03] tracking-[-0.03em] md:text-[76px]">
                <span className="text-zinc-400">
                  <span className="pulseRed pulseDelay0">We</span>{" "}
                  <span className="pulseRed pulseDelay1">M</span>ake{" "}
                  <span className="text-zinc-400">a</span>{" "}
                  <span className="pulseRed pulseDelay2">D</span>ifference.
                </span>
              </h3>

              <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
                사람을 중심에 두고 기술과 문화로 확장하며
                <br />
                조화와 쉼으로 완성하는 토탈 에스테틱 경험을 제공합니다.
              </p>

              {/* ✅ 태그는 카드 하단에 붙임 */}
              <div className="mt-auto pt-10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-zinc-100 px-4 py-2 text-[13px] text-zinc-600 shadow-sm">
                    WeMD Aesthetic
                  </span>
                  <span className="rounded-full bg-zinc-100 px-4 py-2 text-[13px] text-zinc-600 shadow-sm">
                    Brand Identity
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================== RIGHT CARD ===================== */}
          <div className="h-full rounded-[28px] bg-white shadow-[0_18px_70px_rgba(15,23,42,0.10)]">
            <div className="relative h-full overflow-hidden rounded-[28px] p-10">
              {/* grid bg */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.20]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* top bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="text-[12px] tracking-[0.22em] text-zinc-500">
                  WeMD CI
                </div>
                <div className="text-[12px] tracking-[0.18em] text-zinc-500">
                  {counter}
                </div>
              </div>

              {/* ✅ 이미지 슬롯 */}
              <div className="relative z-10 mt-7 rounded-[22px] bg-white/70 p-6 backdrop-blur">
                <div
                  className="relative h-[220px] w-full overflow-hidden rounded-[18px] bg-zinc-50 md:h-[280px]"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  style={{ touchAction: "pan-y" }}
                >
                  {frames.map((f, i) => (
                    <div
                      key={f.src}
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{ opacity: i === idx ? 1 : 0 }}
                    >
                      {imgOk[i] ? (
                        <img
                          src={f.src}
                          alt={f.alt}
                          className="h-full w-full object-contain"
                          onError={() =>
                            setImgOk((prevState) => {
                              const nextState = [...prevState];
                              nextState[i] = false;
                              return nextState;
                            })
                          }
                          draggable={false}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-6 text-center text-[13px] leading-relaxed text-zinc-400">
                          이미지 경로를 찾지 못했어요.
                          <br />
                          <span className="font-medium text-zinc-500">{f.src}</span>
                          <br />
                          (public/brand 폴더 아래 실제 파일명/경로 확인)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ 인디케이터: 점 + 빨간 바 */}
              <div className="relative z-10 mt-6 flex items-center gap-2">
                {frames.map((_, i) => (
                  <span
                    key={i}
                    className={
                      i === idx
                        ? "h-2 w-10 rounded-full bg-[#B1121A] transition-all"
                        : "h-2 w-2 rounded-full bg-zinc-300 transition-all"
                    }
                  />
                ))}
              </div>

              {/* ✅ 설명 문장 */}
              <div className="relative z-10 mt-4 max-w-[46ch] text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
                위엠디(WeMD)의 디테일은 “보이지 않는 정교함”에서 시작합니다.
              </div>
            </div>
          </div>
        </div>

     {/* ===================== CORE VALUES (타일) ===================== */}
<div className="mt-16">
  {/* 타이틀 */}
  <div className="mx-auto max-w-3xl text-center">
    <div className="text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
      CORE VALUES
    </div>
  </div>

  {/* 타일 */}
  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
    {values.map((v) => (
      <div
        key={v.ko}
        className="coreTile group rounded-2xl bg-white px-6 py-8 text-center"
      >
        {/* 아이콘 */}
        <div className="mx-auto flex h-[150px] w-[150px] items-center justify-center lg:h-[170px] lg:w-[170px]">
          <img
            src={v.icon}
            alt={v.alt}
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>

        {/* 텍스트 */}
        <div className="mt-6">
          <div className="text-[16px] font-semibold tracking-tight text-zinc-900">
            {v.ko}
          </div>
          <div className="mt-1 text-[11px] tracking-[0.18em] text-zinc-400">
            {v.alt.toUpperCase()}
          </div>
          <div className="mt-3 text-[13px] leading-relaxed text-zinc-600">
            {v.desc}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>

      {/* ✅ We / M / D 애니메이션 + 타일 hover (커지는 것만) */}
      <style jsx>{`
        .pulseRed {
          color: rgba(161, 161, 170, 1);
          animation: wemdPulse 6.2s ease-in-out infinite;
          font-weight: 600;
        }
        .pulseDelay0 {
          animation-delay: 0s;
        }
        .pulseDelay1 {
          animation-delay: 0.28s;
        }
        .pulseDelay2 {
          animation-delay: 0.56s;
        }
        @keyframes wemdPulse {
          0% {
            color: rgba(161, 161, 170, 1);
          }
          22% {
            color: #b1121a;
          }
          72% {
            color: #b1121a;
          }
          92% {
            color: rgba(161, 161, 170, 1);
          }
          100% {
            color: rgba(161, 161, 170, 1);
          }
        }

        .coreTile {
          transform: translateY(0) scale(1);
          transition: transform 220ms ease, box-shadow 220ms ease;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        }
        .coreTile:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.1);
        }
      `}</style>
    </section>
  );
}