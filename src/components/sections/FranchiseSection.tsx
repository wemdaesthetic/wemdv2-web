"use client";

import { useEffect, useState } from "react";

const ACCENT = "#B71919";

export default function FranchiseSection() {
  const email = "admin@wemdibs.com";
  const phoneDisplay = "02-6959-8989";
  const phoneHref = "tel:0269598989";

  const [copied, setCopied] = useState(false);

  const onCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(t);
  }, [copied]);

  return (
    <section id="franchise" className="bg-white scroll-mt-[78px]">
      {/* ===================== MOBILE ONLY (md 미만) ===================== */}
      <div className="md:hidden">
        <div className="relative px-4 pt-14 pb-16 bg-white">
          <div className="mx-auto max-w-[520px]">
            {/* 새 섹션 타이틀 규격: 모바일 left */}
            <div className="text-left">
              <div
                className="font-['Pretendard'] font-bold text-[30px] leading-[36px]"
                style={{ color: ACCENT }}
              >
                Contact
              </div>

              <div
                className="mt-2 font-['Pretendard'] font-light text-[20px] leading-[24px]"
                style={{ color: "#404040" }}
              >
                가맹 문의
              </div>

              <div
                className="mt-2 font-['Pretendard'] font-light text-[18px] leading-[18px]"
                style={{ color: "#9A9A9A" }}
              >
                WeMD Aesthetic 과 함께 성장할 기회를 만나보세요.
              </div>
            </div>

            {/* 붉은 컨테이너 */}
            <div
              className="mt-6 overflow-hidden rounded-[32px] p-5 text-white relative"
              style={{ backgroundColor: ACCENT }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 85% 75%, rgba(0,0,0,0.18), transparent 55%)",
                }}
              />

              <div className="relative grid gap-3">
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="
                    w-full rounded-3xl bg-white/12 ring-1 ring-white/10
                    p-5 text-left
                    transition active:scale-[0.99]
                  "
                >
                  <div className="text-[13px] text-white/85">이메일 문의</div>

                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div className="text-[15px] font-semibold tracking-tight">{email}</div>

                    <div
                      className="
                        shrink-0 rounded-full bg-white px-3 py-1
                        text-[12px] font-semibold
                        text-zinc-900
                      "
                    >
                      {copied ? "복사됨" : "복사"}
                    </div>
                  </div>
                </button>

                <a
                  href={phoneHref}
                  className="
                    block w-full rounded-3xl bg-white/12 ring-1 ring-white/10
                    p-5
                    transition active:scale-[0.99]
                  "
                >
                  <div className="text-[13px] text-white/85">전화 문의</div>

                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div className="text-[15px] font-semibold tracking-tight">{phoneDisplay}</div>

                    <div
                      className="
                        shrink-0 rounded-full bg-white px-3 py-1
                        text-[12px] font-semibold
                        text-zinc-900
                      "
                    >
                      전화걸기
                    </div>
                  </div>
                </a>
              </div>
            </div>
            {/* /container */}
          </div>
        </div>
      </div>

      {/* ===================== PC ONLY (md 이상) ===================== */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-4 py-28">
          {/* 새 섹션 타이틀 규격: 데스크탑 center */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div
              className="font-['Pretendard'] font-bold text-[46px] leading-[55px]"
              style={{ color: ACCENT }}
            >
              Contact
            </div>

            <div
              className="mt-2 font-['Pretendard'] font-light text-[30px] leading-[36px]"
              style={{ color: "#404040" }}
            >
              가맹 문의
            </div>

            <div
              className="mt-2 font-['Pretendard'] font-light text-[20px] leading-[24px]"
              style={{ color: "#9A9A9A" }}
            >
              WeMD ibs / WeMD Aesthetic 과 함께 성장할 기회를 만나보세요.
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[32px] p-8 text-white relative"
            style={{ backgroundColor: ACCENT }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.22]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 85% 75%, rgba(0,0,0,0.18), transparent 55%)",
              }}
            />

            <div className="relative grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={onCopyEmail}
                className="
                  w-full rounded-3xl bg-white/12 ring-1 ring-white/10
                  p-6 text-left
                  transition active:scale-[0.99]
                "
              >
                <div className="text-[13px] text-white/85">이메일 문의</div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div className="text-[16px] font-semibold tracking-tight">{email}</div>
                  <div className="shrink-0 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-zinc-900">
                    {copied ? "복사됨" : "복사"}
                  </div>
                </div>
              </button>

              <a
                href={phoneHref}
                className="
                  block w-full rounded-3xl bg-white/12 ring-1 ring-white/10
                  p-6
                  transition active:scale-[0.99]
                "
              >
                <div className="text-[13px] text-white/85">전화 문의</div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div className="text-[16px] font-semibold tracking-tight">{phoneDisplay}</div>
                  <div className="shrink-0 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-zinc-900">
                    전화걸기
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}