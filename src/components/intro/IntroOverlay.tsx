"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  onStartReveal: () => void; // ✅ 메인 페이지를 뒤에서 먼저 띄우기 시작
  onDone: () => void;        // ✅ 인트로 완전 종료
};

export default function IntroOverlay({ onStartReveal, onDone }: Props) {
  const lines = useMemo(() => ["WeMD Aesthetic", "We Make a Difference"], []);
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "fade">("typing");

  const revealCalled = useRef(false);
  const tRef = useRef<number | null>(null);

  // 타이핑을 조금 더 “사람처럼” (살짝 랜덤 + 공백에서 약간 멈춤)
  function nextDelay(ch: string) {
    const base = 70; // 기본 속도 (크면 느림)
    const jitter = Math.floor(Math.random() * 40); // 0~39ms
    if (ch === " ") return base + 140 + jitter;
    if (ch === "." || ch === ",") return base + 200 + jitter;
    return base + jitter;
  }

  // 타이핑 진행
  useEffect(() => {
    if (phase !== "typing") return;

    const full = lines[lineIndex];
    if (!full) return;

    if (typed.length < full.length) {
      const ch = full.charAt(typed.length);
      tRef.current = window.setTimeout(() => {
        setTyped((p) => p + ch);
      }, nextDelay(ch));
      return () => {
        if (tRef.current) window.clearTimeout(tRef.current);
      };
    }

    // 한 줄 끝
    tRef.current = window.setTimeout(() => {
      if (lineIndex < lines.length - 1) {
        setLineIndex((v) => v + 1);
        setTyped("");
      } else {
        setPhase("hold");
      }
    }, 450);

    return () => {
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, [typed, phase, lineIndex, lines]);

  // 마지막 줄 완성 후 잠깐 멈추고 fade 시작
  useEffect(() => {
    if (phase !== "hold") return;
    const id = window.setTimeout(() => setPhase("fade"), 550);
    return () => window.clearTimeout(id);
  }, [phase]);

  // fade 들어가는 순간: 메인 콘텐츠를 뒤에서 같이 등장시키기 시작
  useEffect(() => {
    if (phase !== "fade") return;
    if (!revealCalled.current) {
      revealCalled.current = true;
      onStartReveal();
    }
    const id = window.setTimeout(() => onDone(), 650);
    return () => window.clearTimeout(id);
  }, [phase, onStartReveal, onDone]);

  const firstLine = lineIndex === 0 ? typed : lines[0];
  const secondLine = lineIndex === 1 ? typed : lineIndex > 1 ? lines[1] : "";

  // ✅ 커서는 “현재 타이핑 중인 줄”에만 표시
  const showCursorOnFirst = phase === "typing" && lineIndex === 0;
  const showCursorOnSecond = phase === "typing" && lineIndex === 1;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div
        className={[
          "relative h-full w-full bg-white transition-opacity duration-[650ms] ease-out",
          phase === "fade" ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {/* 은은한 중앙 톤 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.10),transparent_60%)]" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-10">
            <div className="text-[14px] font-medium tracking-[0.12em] text-zinc-700">
              {firstLine}
              {showCursorOnFirst && (
                <span className="ml-2 inline-block h-4 w-[2px] bg-zinc-900 align-[-2px] animate-pulse" />
              )}
            </div>

            <div className="mt-5 flex items-end gap-3">
              <div className="text-[60px] font-semibold leading-[1.05] tracking-tight text-zinc-900">
                {secondLine}
              </div>

              {showCursorOnSecond && (
                <span className="mb-2 inline-block h-10 w-[2px] bg-zinc-900 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}