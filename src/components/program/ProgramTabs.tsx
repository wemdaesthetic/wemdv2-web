"use client";

import React, { useEffect, useState } from "react";

export type ProgramTab = {
  id: "프로그램 안내" | "프로그램 구성" | "가격" | "예약";
  label: string;
};

type Props = {
  accent: string;
  tabs: ProgramTab[];
  sectionRefs: Record<string, React.RefObject<HTMLElement | null>>;
};

export default function ProgramTabs({ accent, tabs, sectionRefs }: Props) {
  const [active, setActive] = useState<ProgramTab["id"]>("프로그램 안내");

  const go = (id: ProgramTab["id"]) => {
    const ref = sectionRefs[id]?.current;
    if (!ref) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const offset = isDesktop ? 78 + 16 : 12; 
    const y = ref.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      const entries = tabs
        .map((t) => {
          const el = sectionRefs[t.id]?.current;
          if (!el) return null;
          const top = el.getBoundingClientRect().top;
          return { id: t.id, dist: Math.abs(top - 140) };
        })
        .filter(Boolean) as Array<{ id: ProgramTab["id"]; dist: number }>;

      entries.sort((a, b) => a.dist - b.dist);
      if (entries[0]) setActive(entries[0].id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [tabs, sectionRefs]);

  return (
    <div
      className="
        sticky top-0 md:top-[78px]
        z-[1200]
        bg-white/60 backdrop-blur
        ring-1 ring-black/5
        shadow-[0_12px_30px_rgba(15,23,42,0.10)]
      "
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-3 md:py-4">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
          {tabs.map((t) => {
            const isActive = t.id === active;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                className={[
                  "shrink-0 rounded-full px-4 py-[10px]",
                  "text-[14px] font-semibold transition",
                  "backdrop-blur",
                  "ring-1 ring-black/5",
                  "active:scale-[0.98]",
                  isActive ? "text-white" : "text-zinc-900",
                ].join(" ")}
                style={{
                  backgroundColor: isActive ? accent : "rgba(255,255,255,0.55)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <style jsx global>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}