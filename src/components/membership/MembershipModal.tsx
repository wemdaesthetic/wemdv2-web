"use client";

import React, { useEffect } from "react";

const ACCENT = "#B71919";

type Props = {
  open: boolean;
  onClose: () => void;
  bookingUrl: string;
};

const memberships = [
  {
    code: "C-50",
    name: "Classic 50 Membership",
    price: "500,000원",
    benefit: null,
    period: "3개월",
    tone: "standard",
  },
  {
    code: "P-110",
    name: "Premium 110 Membership",
    price: "1,000,000원",
    benefit: "10% 추가 적립 · 총 110만원 사용 가능",
    period: "6개월",
    tone: "premium",
  },
  {
    code: "R-220",
    name: "Royal 220 Membership",
    price: "2,000,000원",
    benefit: "10% 추가 적립 · 총 220만원 사용 가능 · 프리미엄 화장품 증정",
    period: "12개월",
    tone: "royal",
  },
];

export default function MembershipModal({ open, onClose, bookingUrl }: Props) {
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        aria-label="회원권 팝업 닫기"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-6xl -translate-y-1/2 px-4">
        <div className="relative max-h-[90dvh] overflow-y-auto rounded-[28px] bg-white shadow-[0_30px_140px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="
              absolute right-4 top-4 z-10
              inline-flex h-10 w-10 items-center justify-center rounded-full
              bg-black/70 text-[24px] leading-none text-white
              hover:bg-black active:scale-[0.98]
            "
          >
            ×
          </button>

          <div className="px-5 py-9 md:px-10 md:py-12">
            <div className="text-center">
              <div
                className="text-[13px] font-semibold tracking-[0.34em]"
                style={{ color: ACCENT }}
              >
                MEMBERSHIP
              </div>
              <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
                회원권 안내
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-500 md:text-[16px]">
                WeMD 회원권으로 더 합리적인 프리미엄 케어를 경험해보세요.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {memberships.map((m) => (
                <div
                  key={m.code}
                  className="
                    relative overflow-hidden rounded-[24px] bg-white
                    p-6 ring-1 ring-black/10
                    shadow-[0_18px_70px_rgba(15,23,42,0.10)]
                  "
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-2"
                    style={{
                      background:
                        m.tone === "royal"
                          ? "linear-gradient(90deg,#8A4B16,#E4B76A,#7A3512)"
                          : m.tone === "premium"
                          ? "linear-gradient(90deg,#B71919,#E43A3A,#8F1010)"
                          : "linear-gradient(90deg,#D8C1A8,#B08A67,#E8D3BD)",
                    }}
                  />

                  <div className="mt-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[32px] font-semibold tracking-tight text-zinc-900">
                        {m.code}
                      </div>

                      {m.tone === "premium" ? (
                        <span className="rounded-full bg-[#B71919]/10 px-3 py-1 text-[12px] font-semibold text-[#B71919]">
                          BEST
                        </span>
                      ) : m.tone === "royal" ? (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-[12px] font-semibold text-amber-800">
                          VIP
                        </span>
                      ) : (
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-[12px] font-semibold text-zinc-600">
                          BASIC
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-[15px] font-medium text-zinc-500">
                      {m.name}
                    </div>

                    <div className="mt-7 text-[28px] font-bold tracking-tight text-zinc-900">
                      {m.price}
                    </div>

                    <div className="mt-6 h-px w-full bg-zinc-100" />

                    <div className="mt-5 space-y-3 text-[14px] leading-relaxed text-zinc-700">
                      {m.benefit ? (
                        <div>
                          <div className="text-[12px] font-semibold tracking-[0.18em] text-zinc-400">
                            BENEFIT
                          </div>
                          <div className="mt-1 font-semibold text-zinc-900">{m.benefit}</div>
                        </div>
                      ) : null}

                      <div>
                        <div className="text-[12px] font-semibold tracking-[0.18em] text-zinc-400">
                          PERIOD
                        </div>
                        <div className="mt-1 font-semibold text-zinc-900">
                          사용 기한 {m.period}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-zinc-50 p-5 text-[13px] leading-relaxed text-zinc-500 ring-1 ring-black/5">
              회원권은 결제일 기준 사용 기한이 적용됩니다. 자세한 사용 조건은 방문 상담 시 안내드립니다.
            </div>

            <div className="mt-8">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex h-14 w-full items-center justify-center rounded-2xl
                  text-[16px] font-semibold text-white
                  transition active:scale-[0.99]
                  md:h-15
                "
                style={{ backgroundColor: ACCENT }}
              >
                회원권 상담 예약하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}