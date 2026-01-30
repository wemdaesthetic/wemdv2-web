// FILE: src/components/ui/MobileFloatingButtons.tsx
"use client";

import React, { useEffect, useState } from "react";

type Props = {
  bookingUrl: string;
  accent?: string; // default #B71919
  showTopAfter?: number; // default 260
  bottomOffsetPx?: number; // default 18
};

export default function MobileFloatingButtons({
  bookingUrl,
  accent = "#B71919",
  showTopAfter = 260,
  bottomOffsetPx = 18,
}: Props) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > showTopAfter);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showTopAfter]);

  return (
    <div
      className="md:hidden fixed right-5 z-[9000]"
      style={{ bottom: `calc(env(safe-area-inset-bottom) + ${bottomOffsetPx}px)` }}
    >
      <div className="flex flex-col items-end gap-3">
        {showTop ? (
          <button
            type="button"
            aria-label="맨 위로"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              inline-flex h-14 w-14 items-center justify-center rounded-full
              text-white text-[13px] font-extrabold tracking-tight
              shadow-[0_18px_50px_rgba(183,25,25,0.35)]
              active:scale-[0.95]
            "
            style={{ backgroundColor: accent }}
          >
            ↑
          </button>
        ) : null}

        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="예약하기"
          className="
            inline-flex h-14 w-14 items-center justify-center rounded-full
            text-white text-[13px] font-extrabold tracking-tight
            shadow-[0_18px_50px_rgba(183,25,25,0.35)]
            active:scale-[0.95]
          "
          style={{ backgroundColor: accent }}
        >
          예약
        </a>
      </div>
    </div>
  );
}