"use client";

import React from "react";

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
  type,
  price,
  originalPrice,
  durationMin,
  formatPrice,
}: {
  accent: string;
  type: "once" | "ten";
  price: number;
  originalPrice: number | null;
  durationMin: number;
  formatPrice: (n: number) => string;
}) {
  const isMember = type === "ten";
  const label = isMember ? "회원가" : "정상가";
  const subLabel = isMember ? "MEMBER PRICE" : "REGULAR PRICE";
  const badgeLabel = isMember ? "MEMBER" : "REGULAR";
  const hasOriginal = isMember && originalPrice != null && originalPrice > price;

  return (
    <div className="snap-start shrink-0 w-[260px] md:w-[280px]">
      <div
        className="
          overflow-hidden rounded-[22px]
          bg-white
          ring-1 ring-black/10
          shadow-[0_18px_60px_rgba(15,23,42,0.12)]
        "
      >
        <div
          className="
            relative h-[128px] overflow-hidden
            px-5 py-5
            text-white
          "
          style={{
            background: isMember
              ? "linear-gradient(135deg, #B71919 0%, #8F1010 48%, #D83A34 100%)"
              : "linear-gradient(135deg, #D7DBE1 0%, #A8AFB8 45%, #ECEFF3 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-55"
            style={{
              background: isMember
                ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.28), transparent 38%), radial-gradient(circle at 90% 85%, rgba(255,255,255,0.16), transparent 42%)"
                : "linear-gradient(120deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.15) 34%, rgba(255,255,255,0.85) 52%, rgba(255,255,255,0.08) 76%, rgba(255,255,255,0.5) 100%)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 12% 14%, rgba(255,255,255,0.8), transparent 18%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.12), transparent 42%)",
            }}
          />

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div
                className={isMember ? "text-[12px] font-semibold tracking-[0.28em] text-white/75" : "text-[12px] font-semibold tracking-[0.28em] text-zinc-700/70"}
              >
                {subLabel}
              </div>

              <span
                className={
                  isMember
                    ? "rounded-full bg-white/18 px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-white/20"
                    : "rounded-full bg-white/45 px-3 py-1 text-[12px] font-semibold text-zinc-700 ring-1 ring-white/45"
                }
              >
                {badgeLabel}
              </span>
            </div>

            <div className={isMember ? "text-[32px] font-bold tracking-tight text-white" : "text-[32px] font-bold tracking-tight text-zinc-800"}>
              {label}
            </div>
          </div>
        </div>

        <div className="bg-white px-5 py-6">
          <div className="min-h-[20px] text-right">
            {hasOriginal ? (
              <div className="text-[13px] font-medium text-zinc-400 line-through">
                {formatPrice(originalPrice)}
              </div>
            ) : (
              <div className="text-[13px] text-transparent">.</div>
            )}
          </div>

          <div className="mt-2 text-right text-[30px] font-bold tracking-tight" style={{ color: accent }}>
            {formatPrice(price)}
          </div>

          <div className="mt-6 h-px w-full bg-zinc-100" />

          <div className="mt-5 space-y-2 text-right">
            <div className="text-[15px] font-medium text-zinc-600">관리 시간 {durationMin}분</div>
            <div className="text-[15px] font-bold text-zinc-600">VAT 포함</div>
          </div>
        </div>
      </div>
    </div>
  );
}