"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function BrandStorySection() {
  // ✅ PC(기존) 프레임
  const frames = useMemo(
    () => [
      { src: "/brand/bi-step.svg", alt: "WeMD CI Guide", label: "CI GUIDE" },
      { src: "/brand/logo-signature.svg", alt: "WeMD Signature", label: "SIGNATURE" },
    ],
    []
  );

  const total = frames.length;

  // --------- PC(기존)용 상태: 유지 ---------
  const [idx, setIdx] = useState(0);
  const [imgOk, setImgOk] = useState<boolean[]>(() => frames.map(() => true));

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

  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  // ===================== PC: SWIPE =====================
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

  // ✅ PC core values (desc 요청대로 교체)
  const values = [
    { ko: "사람", en: "Human", desc: "모든 중심에는 사람이 있습니다", icon: "/core/human.svg", alt: "Human" },
    {
      ko: "기술",
      en: "Technology",
      desc: "에스테틱 명인들의 노하우를 결합하여, K-Beauty에 새로운 기준을 제시합니다",
      icon: "/core/technology.svg",
      alt: "Technology",
    },
    { ko: "문화", en: "Culture", desc: "글로벌 뷰티・웰니스 문화를 개척하고 가치를 실현합니다", icon: "/core/culture.svg", alt: "Culture" },
    { ko: "조화", en: "Harmony", desc: "내면과 외면, 아름다움과 감성이 균형을 제공합니다", icon: "/core/harmony.svg", alt: "Harmony" },
    { ko: "쉼", en: "Rest", desc: "현대인의 일상 속 여유와 평온을 제공합니다", icon: "/core/rest.svg", alt: "Rest" },
  ];

  return (
    <section id="brand" className="bg-white scroll-mt-[78px]">
      {/* ✅✅ MOBILE: 세로 나열 + 앱스럽게 */}
      <MobileBrandStack />

      {/* ===================== PC (md 이상) — 기존 그대로 ===================== */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-4 py-28">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-[40px] font-semibold tracking-tight text-zinc-900 md:text-[52px]">
              브랜드 스토리
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
              사람·기술·문화가 조화와 쉼으로 이어지는 WeMD의 브랜드 아이덴티티를 소개합니다.
            </p>
          </div>

          <div className="grid items-stretch gap-8 md:grid-cols-2">
            {/* LEFT CARD */}
            <div className="h-full rounded-[28px] bg-white p-10 shadow-[0_18px_70px_rgba(15,23,42,0.10)]">
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
            <div className="h-full rounded-[28px] bg-white shadow-[0_18px_70px_rgba(15,23,42,0.10)]">
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

          {/* CORE VALUES (PC 기존 유지) */}
          <div className="mt-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
                CORE VALUES
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {values.map((v) => (
                <div
                  key={v.ko}
                  className="coreTile group flex items-center gap-5 rounded-2xl bg-white px-6 py-6"
                >
                  <div className="flex h-[110px] w-[110px] items-center justify-center">
                    <img src={v.icon} alt={v.alt} className="h-[120%] w-[120%] object-contain" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <div className="text-[15px] font-semibold tracking-tight text-zinc-900">
                        {v.ko}
                      </div>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-zinc-400">
                        {v.en.toUpperCase()}
                      </div>
                    </div>
                    <div className="mt-1 text-[12px] leading-relaxed text-zinc-600">
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
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
      </div>
    </section>
  );
}

function MobileBrandStack() {
  // ✅ 모바일 섹션 전체 배경(라디얼 통일) + sticky 축소 타이틀
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();

        // 섹션이 화면 상단을 조금 지나면 축소
        const shouldShrink = r.top < -18;
        setShrink(shouldShrink);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ====== CI 슬라이더(이미지 슬롯만) ======
  const ciImages = useMemo(() => ["/brand/bi-step.svg", "/brand/logo-signature.svg"], []);
  const ciRef = useRef<HTMLDivElement | null>(null);
  const [ciIdx, setCiIdx] = useState(0);

  useEffect(() => {
    const el = ciRef.current;
    if (!el || ciImages.length <= 1) return;

    const onScroll = () => {
      const w = el.clientWidth;
      if (!w) return;
      const idx = Math.round(el.scrollLeft / w);
      setCiIdx(Math.max(0, Math.min(ciImages.length - 1, idx)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [ciImages.length]);

  // ✅ CI “눌림/반발” (햅틱 느낌)
  const [ciPressed, setCiPressed] = useState(false);
  useEffect(() => {
    if (!ciPressed) return;
    const t = window.setTimeout(() => setCiPressed(false), 140);
    return () => window.clearTimeout(t);
  }, [ciPressed]);

  // ====== Core Values (5개, 클릭 시 중앙 확대, 모달X) ======
  const core = useMemo(
    () => [
      { key: "human", label: "사람", desc: "모든 중심에는 사람이 있습니다" },
      {
        key: "tech",
        label: "기술",
        desc: "에스테틱 명인들의 노하우를 결합하여, K-Beauty에 새로운 기준을 제시합니다",
      },
      { key: "culture", label: "문화", desc: "글로벌 뷰티・웰니스 문화를 개척하고 가치를 실현합니다" },
      { key: "harmony", label: "조화", desc: "내면과 외면, 아름다움과 감성이 균형을 제공합니다" },
      { key: "rest", label: "쉼", desc: "현대인의 일상 속 여유와 평온을 제공합니다" },
    ],
    []
  );

  const bubbles = useMemo(() => {
    // 첨부 스샷 느낌(5개, 여백 많게)
    const base = [
      { x: 22, y: 28, s: 1.04, d: 0.0, glow: "glowA" },
      { x: 74, y: 26, s: 0.98, d: 0.45, glow: "glowB" },
      { x: 50, y: 48, s: 1.18, d: 0.2, glow: "glowC" },
      { x: 20, y: 70, s: 1.02, d: 0.85, glow: "glowD" },
      { x: 78, y: 72, s: 1.06, d: 0.4, glow: "glowE" },
    ];
    return core.map((c, i) => ({ ...c, ...base[i] }));
  }, [core]);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = useMemo(() => core.find((c) => c.key === selectedKey) ?? null, [core, selectedKey]);

  return (
    <div
      ref={sectionRef}
      className="md:hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, rgba(185, 14, 10, 0.08), transparent 38%), radial-gradient(circle at 80% 30%, rgba(0, 0, 0, 0.06), transparent 45%), radial-gradient(circle at 50% 90%, rgba(185, 14, 10, 0.06), transparent 52%), #ffffff",
      }}
    >
      {/* ✅ sticky 페이지 타이틀 (축소) */}
      <div className="sticky top-0 z-30">
        <div
          className={[
            "backdrop-blur",
            "transition-all duration-250",
            shrink ? "bg-white/88 shadow-[0_10px_30px_rgba(15,23,42,0.06)]" : "bg-white/35",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div
              className={[
                "transition-all duration-250",
                shrink ? "py-3" : "py-5",
              ].join(" ")}
            >
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                BRAND
              </div>
              <div
                className={[
                  "font-semibold tracking-tight text-zinc-900 transition-all duration-250",
                  shrink ? "mt-1 text-[20px]" : "mt-2 text-[28px]",
                ].join(" ")}
              >
                브랜드 스토리
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16">
        {/* 1) SLOGAN */}
        <div className="rounded-3xl bg-white/92 p-7 shadow-[0_18px_70px_rgba(15,23,42,0.10)] ring-1 ring-black/5">
          <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
            WeMD SLOGAN
          </div>

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

        {/* 섹션 간격 */}
        <div className="h-6" />

        {/* 2) CI */}
        <div className="rounded-3xl bg-white/92 p-7 shadow-[0_18px_70px_rgba(15,23,42,0.10)] ring-1 ring-black/5">
          <div className="flex items-start justify-between">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
              WeMD CI
            </div>

            {/* ✅ 카운터: 우측 상단 pill 고정 */}
            <div className="rounded-full bg-zinc-900/80 px-3 py-1 text-[12px] font-semibold text-white">
              {ciIdx + 1}/{ciImages.length}
            </div>
          </div>

          {/* 도트 (불필요 문구 제거, 본능 유도는 인터랙션+도트로) */}
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

          <div
            className={[
              "mt-4 overflow-hidden rounded-2xl bg-zinc-50",
              "transition-transform duration-150 ease-out",
              ciPressed ? "scale-[0.985]" : "scale-100",
            ].join(" ")}
          >
            <div
              ref={ciRef}
              className="
                ciSlot flex w-full overflow-x-auto scroll-smooth
                snap-x snap-mandatory
                [scrollbar-width:none] [-ms-overflow-style:none]
              "
              style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
              aria-label="CI 이미지 슬롯"
              onPointerDown={() => setCiPressed(true)}
              onPointerUp={() => setCiPressed(false)}
              onPointerCancel={() => setCiPressed(false)}
              onPointerLeave={() => setCiPressed(false)}
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

        {/* 섹션 간격 */}
        <div className="h-6" />

        {/* 3) CORE VALUES */}
        <div className="rounded-3xl bg-white/92 p-7 shadow-[0_18px_70px_rgba(15,23,42,0.10)] ring-1 ring-black/5">
          <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
            WeMD 핵심 가치
          </div>

          <div className="relative mt-6 h-[390px] w-full overflow-hidden rounded-3xl bg-white/70">
            {/* ✅ 선택 시 뒤 버블 안 보이게: 불투명 오버레이 */}
            {selectedKey ? (
              <button
                type="button"
                className="absolute inset-0 z-10 bg-white/95"
                aria-label="선택 해제"
                onClick={() => setSelectedKey(null)}
              />
            ) : null}

            {bubbles.map((b) => {
              const isSelected = selectedKey === b.key;
              const isDimmed = selectedKey && !isSelected;

              return (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setSelectedKey((prev) => (prev === b.key ? null : b.key))}
                  className="absolute z-20"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    ["--s" as any]: b.s,
                    animationDelay: `${b.d}s`,
                  }}
                  aria-label={`${b.label} 선택`}
                >
                  <div
                    className={[
                      "bubble",
                      "grid place-items-center rounded-full bg-white text-zinc-900",
                      "transition-all duration-300 ease-out",
                      b.glow,
                      isDimmed ? "opacity-0 scale-[0.9] pointer-events-none" : "opacity-100",
                      isSelected ? "bubbleSelected" : "",
                    ].join(" ")}
                  >
                    {!isSelected ? (
                      <div className="w-[86px] px-3 text-center">
                        <div className="truncate text-[14px] font-semibold">{b.label}</div>
                      </div>
                    ) : (
                      <div className="relative flex h-full w-full flex-col items-center justify-center px-7 py-8 text-center">
                        <div className="text-[18px] font-semibold">{b.label}</div>
                        <div className="mt-4 text-[13px] leading-relaxed text-zinc-600">
                          {selected?.desc}
                        </div>

                        {/* ✅ X: 배경 없이, 버블 하단 중앙 */}
                        <button
                          type="button"
                          className="mt-7 inline-flex items-center justify-center text-zinc-500 active:scale-[0.98]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedKey(null);
                          }}
                          aria-label="닫기"
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M6 6l12 12M18 6L6 18"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 전역 스타일 */}
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

        /* ===== 버블 ===== */
        .bubble {
          height: 84px;
          width: 84px;
          transform: translate(-50%, -50%) scale(var(--s));
          animation: floaty 6.2s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes floaty {
          0% {
            transform: translate(-50%, -50%) scale(var(--s)) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) scale(var(--s)) translateY(-10px);
          }
          100% {
            transform: translate(-50%, -50%) scale(var(--s)) translateY(0px);
          }
        }

        /* 그림자/톤 다양화 */
        .glowA {
          box-shadow: 0 18px 55px rgba(15, 23, 42, 0.14);
        }
        .glowB {
          box-shadow: 0 18px 55px rgba(185, 14, 10, 0.14);
        }
        .glowC {
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.16);
        }
        .glowD {
          box-shadow: 0 18px 55px rgba(24, 24, 27, 0.12);
        }
        .glowE {
          box-shadow: 0 18px 55px rgba(63, 63, 70, 0.14);
        }

        /* 선택 확대 + 중앙 이동 */
        .bubbleSelected {
          position: relative;
          z-index: 50;
          height: 260px !important;
          width: 260px !important;
          transform: translate(-50%, -50%) scale(1) !important;
          animation: none !important;
          box-shadow: 0 34px 110px rgba(0, 0, 0, 0.18);
        }
        button:has(.bubbleSelected) {
          left: 50% !important;
          top: 50% !important;
        }
      `}</style>
    </div>
  );
}