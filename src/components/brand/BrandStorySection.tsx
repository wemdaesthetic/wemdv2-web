"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, show };
}

function SectionHeader({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  const { ref, show } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[
        "mx-auto mb-16 max-w-3xl text-center",
        "transition-all duration-[900ms] ease-out",
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      ].join(" ")}
    >
      <h2 className="text-[40px] font-semibold tracking-tight text-zinc-900 md:text-[52px]">
        {title}
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
        {desc}
      </p>
    </div>
  );
}

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

  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

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

  const values = [
    { en: "Human", ko: "사람" },
    { en: "Technology", ko: "기술" },
    { en: "Culture", ko: "문화" },
    { en: "Harmony", ko: "조화" },
    { en: "Rest", ko: "쉼" },
  ];

  return (
    <section id="brand" className="bg-white scroll-mt-[78px]">
      <div className="mx-auto max-w-6xl px-4 py-28">
        {/* ✅ 섹션 타이틀: 통일 + 페이드/슬로우업 */}
        <SectionHeader
          title="위엠디 스토리"
          desc="사람·기술·문화가 조화와 쉼으로 이어지는 WeMD의 브랜드 아이덴티티를 소개합니다."
        />

        <div className="grid items-stretch gap-8 md:grid-cols-2">
          {/* ===================== LEFT CARD ===================== */}
          <div className="h-full rounded-[28px] bg-white p-10 shadow-[0_18px_70px_rgba(15,23,42,0.10)]">
            <div className="flex h-full flex-col">
              <div className="text-[12px] tracking-[0.22em] text-zinc-500">BRAND STORY</div>

              <h3 className="mt-6 text-[62px] font-semibold leading-[1.03] tracking-[-0.03em] md:text-[76px]">
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

          {/* ===================== RIGHT CARD ===================== */}
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
                <div className="text-[12px] tracking-[0.22em] text-zinc-500">
                  WE MAKE A DIFFERENCE
                </div>
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
                          <br />
                          (public/brand 폴더 아래 실제 파일명/경로 확인)
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

        {/* ===================== CORE VALUES ===================== */}
        <div className="mt-16">
          {/* ✅ CORE VALUES 텍스트: “설명문구(서브카피)” 톤으로 통일 */}
          <p className="text-center text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
            CORE VALUES
          </p>

          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-5">
            {values.map((v) => (
              <div
                key={v.en}
                className="coreCard group relative overflow-hidden rounded-2xl bg-white px-6 py-10 text-center shadow-[0_16px_52px_rgba(15,23,42,0.10)]"
              >
                <div className="relative z-10">
                  <div className="text-[12px] tracking-[0.22em] text-zinc-500">
                    {v.en.toUpperCase()}
                  </div>
                  <div className="mt-3 text-[18px] font-semibold tracking-tight text-zinc-900">
                    {v.ko}
                  </div>

                  {/* ✅ 여기(설명문구)는 너가 계속 수정한다고 했으니 유지 */}
                  <div className="mt-6 text-[13px] leading-relaxed text-zinc-600">
                    (설명문구 자리)
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

        .coreCard {
          transform: translateY(0);
          transition: transform 240ms ease, box-shadow 240ms ease;
        }
        .coreCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 64px rgba(15, 23, 42, 0.14);
        }
      `}</style>
    </section>
  );
}