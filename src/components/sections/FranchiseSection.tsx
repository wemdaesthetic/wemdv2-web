"use client";

import { useEffect, useRef, useState } from "react";

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

function SectionHeader({ title, desc }: { title: string; desc: string }) {
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

export default function FranchiseSection() {
  return (
    <section id="franchise" className="bg-zinc-50 scroll-mt-[78px]">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <SectionHeader
          title="입점 문의"
          desc="입점 및 제휴 관련 문의를 남겨주세요. (폼/연락처/카카오 채널 링크 등을 연결하면 됩니다.)"
        />

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <div className="text-[14px] font-semibold text-zinc-900">Contact</div>
          <div className="mt-3 text-[13px] leading-relaxed text-zinc-600">
            - 이메일 / 전화 / 폼 영역을 여기에 넣어주세요.
          </div>
        </div>
      </div>
    </section>
  );
}