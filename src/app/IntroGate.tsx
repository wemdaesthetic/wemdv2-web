
"use client";

import { useState } from "react";
import IntroOverlay from "@/components/_legacy/intro/IntroOverlay";

type Phase = "intro" | "revealing" | "done";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("intro");

  const showIntro = phase !== "done";
  const showChildren = phase !== "intro";

  return (
    <>
      {showChildren && (
        <div
          className="transition-opacity duration-[900ms] ease-out"
          style={{ opacity: 1 }}
        >
          <div className={phase === "revealing" ? "animate-[mainFadeIn_900ms_ease-out]" : ""}>
            {children}
          </div>
        </div>
      )}

      {showIntro && (
        <IntroOverlay
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