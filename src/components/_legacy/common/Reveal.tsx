"use client";

import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delayMs?: number;
}) {
  const {
    threshold = 0.25,
    rootMargin = "0px 0px -10% 0px",
    once = true,
    delayMs = 120,
  } = options ?? {};

  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {

          window.setTimeout(() => setShown(true), delayMs);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, delayMs]);

  const className = [
    "will-change-transform will-change-opacity will-change-filter",
    "transition-[opacity,transform,filter] duration-[900ms] ease-out",
    shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[3px]",
  ].join(" ");

  return { ref, className, shown };
}