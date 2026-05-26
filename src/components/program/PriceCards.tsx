"use client";

import React from "react";
import OneBadge from "@/components/price/OneBadge";
import TenBadge from "@/components/price/TenBadge";

type Card = {
  type: "once" | "ten";
  price: number;
  originalPrice: number | null;
  durationMin: number;
};

type Props = {
  accent: string;
  cards: Card[];
  formatPrice: (n: number) => string;
};

export default function PriceCards({ accent, cards, formatPrice }: Props) {
  return (
    <div
      className="
        -mx-5 flex gap-4 overflow-x-auto
        pl-5 pr-5 pb-6
        [scrollbar-width:none] [-ms-overflow-style:none]
        md:mx-0 md:justify-center md:overflow-visible md:px-0 md:pb-0
      "
      style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
    >
      {cards.map((c) => (
        <PriceCard
          key={c.type}
          accent={accent}
          badge={c.type === "once" ? <OneBadge className="h-[76px] w-auto md:h-[86px]" /> : <TenBadge className="h-[76px] w-auto md:h-[86px]" />}
          type={c.type}
          price={c.price}
          originalPrice={c.originalPrice}
          durationMin={c.durationMin}
          formatPrice={formatPrice}
        />
      ))}

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function PriceCard({
  accent,
  badge,
  type,
  price,
  originalPrice,
  durationMin,
  formatPrice,
}: {
  accent: string;
  badge: React.ReactNode;
  type: "once" | "ten";
  price: number;
  originalPrice: number | null;
  durationMin: number;
  formatPrice: (n: number) => string;
}) {
  const hasDiscount = type === "ten" && originalPrice != null && originalPrice > price;
  const rightLabel = type === "once" ? "정상가" : "회원가";

  return (
    <div className="snap-start shrink-0 w-[260px] md:w-[280px]">
      <div className="overflow-hidden rounded-[20px] ring-1 ring-black/10 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">
        {/* HEADER */}
        <div className="relative h-[128px]">
          <div
            className="absolute inset-0 bg-[length:200%_200%] animate-[gradmove_10s_ease_infinite]"
            style={{
              backgroundImage:
                "linear-gradient(110deg, #D81616 0%, #B40000 45%, #E51E1E 70%, #B40000 100%)",
            }}
          />

          <div className="absolute inset-0 opacity-70 mix-blend-screen">
            <div
              className="h-full w-[220%] animate-[shimmer_3.6s_ease_infinite]"
              style={{
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 65%)",
                transform: "translateX(-60%)",
              }}
            />
          </div>

          <div className="relative flex h-full items-end justify-between px-5 pb-5">
            <div className="flex items-end gap-3">
              <div className="translate-y-[2px]">{badge}</div>
              <div className="text-[18px] font-medium text-white">회 관리</div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="bg-white/55 backdrop-blur-xl px-5 py-6">
          <div className="flex items-start justify-between">
            <div className="min-h-[22px]">
              {type === "ten" && hasDiscount ? (
                <div className="text-[13px] font-medium text-zinc-400 line-through">{formatPrice(originalPrice!)}</div>
              ) : (
                <div className="text-[13px] text-transparent">.</div>
              )}
            </div>

            <div className="text-[13px] font-semibold text-zinc-600">{rightLabel}</div>
          </div>

          <div className="mt-3 flex justify-end text-right text-[28px] font-bold" style={{ color: accent }}>
            {formatPrice(price)}
          </div>

          {/* 구분선 제거 */}
          <div className="mt-7 space-y-2 text-right">
            <div className="text-[15px] font-medium text-zinc-600">관리 시간 {durationMin}분</div>
            <div className="text-[15px] font-bold text-zinc-600">VAT포함</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradmove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-60%); }
          100% { transform: translateX(10%); }
        }
      `}</style>
    </div>
  );
}