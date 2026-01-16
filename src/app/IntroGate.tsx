"use client";

import { useState } from "react";
import IntroOverlay from "../components/intro/IntroOverlay";

type Phase = "intro" | "revealing" | "done";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("intro");

  const showIntro = phase !== "done";
  const showChildren = phase !== "intro"; // reveal부터 뒤에서 미리 렌더

  return (
    <>
      {showChildren && (
        <div
          className="transition-opacity duration-[900ms] ease-out"
          style={{ opacity: phase === "revealing" ? 1 : 1 }}
        >
          {/* 메인 자체 페이드인(인트로 페이드아웃과 0.9초 겹치게) */}
          <div className={phase === "revealing" ? "animate-[mainFadeIn_900ms_ease-out]" : ""}>
            {children}
          </div>
        </div>
      )}

      {showIntro && (
        <IntroOverlay
          // ✅ 인트로가 'fade' 들어가기 직전에 메인을 먼저 띄우기 시작
          onStartReveal={() => setPhase("revealing")}
          onDone={() => setPhase("done")}
        />
      )}

      <style jsx global>{`
        @keyframes mainFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}