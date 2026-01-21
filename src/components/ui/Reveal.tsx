"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 뷰포트 몇 % 들어오면 발동할지 */
  threshold?: number;
  /** 한번만 실행할지 */
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  threshold = 0.18,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else {
          if (!once) setShown(false);
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={[
        "will-change-transform will-change-opacity",
        "transition-[opacity,transform] duration-700 ease-out",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}