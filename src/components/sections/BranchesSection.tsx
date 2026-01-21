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

export default function BranchesSection() {
  return (
    <section id="branches" className="bg-white scroll-mt-[78px]">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <SectionHeader
          title="지점 소개"
          desc="WeMD Aesthetic의 지점 정보를 확인하세요. (리스트/지도/링크 등을 연결하면 됩니다.)"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-zinc-50 p-6">
            <div className="text-[14px] font-semibold text-zinc-900">준비중</div>
            <div className="mt-2 text-[13px] text-zinc-600">지점 카드/주소/연락처</div>
          </div>
          <div className="rounded-3xl bg-zinc-50 p-6">
            <div className="text-[14px] font-semibold text-zinc-900">준비중</div>
            <div className="mt-2 text-[13px] text-zinc-600">지점 카드/주소/연락처</div>
          </div>
          <div className="rounded-3xl bg-zinc-50 p-6">
            <div className="text-[14px] font-semibold text-zinc-900">준비중</div>
            <div className="mt-2 text-[13px] text-zinc-600">지점 카드/주소/연락처</div>
          </div>
        </div>
      </div>
    </section>
  );
}