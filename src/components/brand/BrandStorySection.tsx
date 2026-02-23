
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";

const ACCENT = "#AD161B";

type Frame = { src: string; alt: string; label: string };

export default function BrandStorySection() {
  const frames: Frame[] = useMemo(
    () => [
      { src: "/brand/bi-step.svg", alt: "WeMD CI Guide", label: "CI GUIDE" },
      { src: "/brand/logo-signature.svg", alt: "WeMD Signature", label: "SIGNATURE" },
    ],
    []
  );

  const total = frames.length;
  const [idx, setIdx] = useState(0);
  const [imgOk, setImgOk] = useState<boolean[]>(() => frames.map(() => true));

  // autoplay
  const intervalRef = useRef<number | null>(null);
  const AUTOPLAY_MS = 6200;

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

  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  // swipe (PC 카드 내부)
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

  const goTo = (nextIdx: number) => {
    setIdx(() => ((nextIdx % total) + total) % total);
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

  return (
    <section className="bg-white scroll-mt-[78px]">
      {/* ===================== MOBILE ===================== */}
      <MobileBrandStack />

      {/* ===================== DESKTOP (md+) ===================== */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-4 py-28">
          {/* 새 타이틀 규격 (모바일 left / 데스크탑 center) */}
          <div className="mb-16">
            <SectionTitle
              en="Brand Story"
              ko="위엠디(WeMD)의 미션"
              desc="WeMD의 슬로건, 브랜드 아이덴티티를 이야기합니다."
              align="center"
              accent={ACCENT}
            />
          </div>

          <div className="grid items-stretch gap-8 md:grid-cols-2">
            {/* LEFT CARD */}
            <div className="h-full rounded-[28px] bg-white p-10 ring-1 ring-black/5 shadow-[0_18px_70px_rgba(15,23,42,0.10)]">
              <div className="flex h-full flex-col">
                <div className="text-[12px] tracking-[0.22em] text-zinc-500">WeMD Slogan</div>

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

            {/* RIGHT CARD */}
            <div className="h-full rounded-[28px] bg-white ring-1 ring-black/5 shadow-[0_18px_70px_rgba(15,23,42,0.10)]">
              <div className="relative h-full overflow-hidden rounded-[28px] p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.20]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-[12px] tracking-[0.22em] text-zinc-500">WeMD CI</div>
                  <div className="text-[12px] tracking-[0.18em] text-zinc-500">{counter}</div>
                </div>

                <div className="relative z-10 mt-7 rounded-[22px] bg-white/70 p-6 backdrop-blur ring-1 ring-black/5">
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
                              setImgOk((prev) => {
                                const next = [...prev];
                                next[i] = false;
                                return next;
                              })
                            }
                            draggable={false}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center px-6 text-center text-[13px] leading-relaxed text-zinc-400">
                            이미지 경로를 찾지 못했어요.
                            <br />
                            <span className="font-medium text-zinc-500">{f.src}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

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

                <div className="relative z-10 mt-4 max-w-[46ch] text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
                  위엠디(WeMD)의 디테일은 “보이지 않는 정교함”에서 시작합니다.
                </div>
              </div>
            </div>
          </div>
        </div>

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
        `}</style>
      </div>
    </section>
  );
}

function MobileBrandStack() {
  const [showCi, setShowCi] = useState(false);

  const ciImages = useMemo(() => ["/brand/bi-step.svg", "/brand/logo-signature.svg"], []);
  const ciRef = useRef<HTMLDivElement | null>(null);
  const [ciIdx, setCiIdx] = useState(0);

  useEffect(() => {
    const el = ciRef.current;
    if (!el || ciImages.length <= 1) return;

    const onScroll = () => {
      const w = el.clientWidth;
      if (!w) return;
      const nextIdx = Math.round(el.scrollLeft / w);
      setCiIdx(Math.max(0, Math.min(ciImages.length - 1, nextIdx)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [ciImages.length]);

  return (
    <div className="md:hidden bg-white">
      <div className="relative px-4 pt-14 pb-16 overflow-hidden bg-white">
        <div className="relative z-10">
          <div className="mx-auto max-w-[520px]">
            {/* 새 타이틀 규격 */}
            <SectionTitle
              en="Brand Story"
              ko="위엠디(WeMD)의 미션"
              desc="WeMD의 슬로건, 브랜드 아이덴티티를 이야기합니다."
              align="left"
              accent={ACCENT}
            />

            {/* 1) SLOGAN */}
            <div className="mt-6 rounded-3xl bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.12)] ring-1 ring-black/5">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">WeMD SLOGAN</div>

              <div className="mt-5 text-[34px] leading-[1.06] tracking-tight text-zinc-900">
                <span className="text-zinc-400">
                  <span className="pulseRedM pulseDelayM0">We</span>{" "}
                  <span className="pulseRedM pulseDelayM1">M</span>ake{" "}
                  <span className="text-zinc-400">a</span>{" "}
                  <span className="pulseRedM pulseDelayM2">D</span>ifference.
                </span>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
                사람을 중심에 두고 기술과 문화로 확장하며
                <br />
                조화와 쉼으로 완성하는 토탈 에스테틱 경험을 제공합니다.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600">
                  WeMD Aesthetic
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600">
                  Brand Identity
                </span>
              </div>
            </div>

            {/* CI 더보기 */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowCi((p) => !p)}
                aria-expanded={showCi}
                className="
                  group relative
                  text-[13px] font-semibold tracking-[0.12em]
                  text-zinc-500
                  transition-all duration-300
                  hover:text-zinc-900
                  active:opacity-70
                "
              >
                <span className="relative z-10">{showCi ? "CLOSE" : "MORE"}</span>
                <span
                  aria-hidden
                  className="
                    absolute left-1/2 -bottom-1 h-[1px] w-0
                    -translate-x-1/2
                    bg-zinc-900
                    transition-all duration-300
                    group-hover:w-full
                  "
                />
              </button>
            </div>

            {/* 2) CI */}
            {showCi ? (
              <div className="mt-4 rounded-3xl bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.12)] ring-1 ring-black/5">
                <div className="flex items-start justify-between">
                  <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">WeMD CI</div>

                  <div className="rounded-full bg-zinc-900/80 px-3 py-1 text-[12px] font-semibold text-white">
                    {ciIdx + 1}/{ciImages.length}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  {ciImages.map((_, i) => (
                    <span
                      key={i}
                      className={[
                        "h-2 rounded-full transition-all",
                        i === ciIdx ? "w-6 bg-[#B1121A]" : "w-2 bg-zinc-300",
                      ].join(" ")}
                      aria-hidden
                    />
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-black/5">
                  <div
                    ref={ciRef}
                    className="
                      ciSlot flex w-full overflow-x-auto scroll-smooth
                      snap-x snap-mandatory
                      [scrollbar-width:none] [-ms-overflow-style:none]
                    "
                    style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
                    aria-label="CI 이미지 슬롯"
                  >
                    {ciImages.map((src, i) => (
                      <div key={src} className="w-full shrink-0 snap-center">
                        <div className="relative h-[250px] w-full">
                          <img
                            src={src}
                            alt={`CI 이미지 ${i + 1}`}
                            className="h-full w-full object-contain p-6"
                            draggable={false}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pulseRedM {
          color: rgba(161, 161, 170, 1);
          animation: wemdPulseM 2.4s ease-in-out infinite;
          font-weight: 600;
        }
        .pulseDelayM0 {
          animation-delay: 0s;
        }
        .pulseDelayM1 {
          animation-delay: 0.18s;
        }
        .pulseDelayM2 {
          animation-delay: 0.36s;
        }
        @keyframes wemdPulseM {
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

        .ciSlot::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}