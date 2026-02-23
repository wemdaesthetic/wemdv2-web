
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

type ProgramItem = { slug: string; titleKo: string; titleEn?: string };

type Props = {
  titleKo: string;
  titleEn?: string;
  heroImgSrc: string;
  items: ProgramItem[];
  currentSlug: string;
  onSelect: (slug: string) => void;
};

export default function ProgramHero({
  titleKo,
  titleEn,
  heroImgSrc,
  items,
  currentSlug,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  const current = useMemo(() => items.find((x) => x.slug === currentSlug) ?? items[0], [items, currentSlug]);

  const wrapRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <section className="relative pt-0 md:pt-[78px]">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImgSrc}
          alt="Program Hero"
          className="h-[240px] w-full object-cover md:h-[320px]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-end px-4 pb-6 md:pb-9">
            <div className="w-full">
              <div className="text-[12px] tracking-[0.30em] text-white/80">PROGRAM</div>

              {/* 제목 자체가 버튼 */}
              <div ref={wrapRef} className="relative mt-2 inline-block">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="inline-flex items-center gap-2 text-left"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                >
                  <h1 className="text-[30px] font-semibold tracking-tight text-white md:text-[44px]">
                    {current?.titleKo ?? titleKo}
                  </h1>

                  {/* 흰색 가득찬 동그라미 + 빨간 아이콘 */}
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95"
                    aria-hidden
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="#B71919" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {/* 드롭다운 */}
                {open ? (
                  <div className="absolute left-0 top-full z-[9999] mt-3 w-[280px]">
                    <GlassCard className="overflow-hidden rounded-3xl">
                      <div className="max-h-[320px] overflow-auto p-2">
                        {items.map((it) => {
                          const active = it.slug === currentSlug;
                          return (
                            <button
                              key={it.slug}
                              type="button"
                              onClick={() => {
                                setOpen(false);
                                onSelect(it.slug);
                              }}
                              className={[
                                "w-full rounded-2xl px-4 py-3 text-left text-[14px] font-semibold transition",
                                active ? "bg-white/80 text-zinc-900" : "hover:bg-white/60 text-zinc-900",
                              ].join(" ")}
                              role="option"
                              aria-selected={active}
                            >
                              {it.titleKo}
                            </button>
                          );
                        })}
                      </div>
                    </GlassCard>
                  </div>
                ) : null}
              </div>

              {titleEn ? <div className="mt-2 text-[16px] text-white/80 md:text-[18px]">{titleEn}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}