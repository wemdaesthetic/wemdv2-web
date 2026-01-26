"use client";

import { useEffect, useState } from "react";

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
        {/* ✅ BranchesSection(모바일)과 타이틀 스펙/좌측정렬/패딩 동일 */}
        <div className="relative px-4 pt-14 pb-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(185,14,10,0.08),transparent_45%)]" />

          <div className="relative z-10">
            <div className="mx-auto max-w-[520px]">
              {/* ✅ 모바일에서만 CONTACT 표시 (지점안내의 BRANCHES와 1:1 스펙) */}
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                CONTACT
              </div>
              <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-zinc-900">
                가맹 문의
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">
                WeMD ibs / WeMD Aesthetic 과 함께 성장할 기회를 만나보세요.
              </p>

              {/* 카드 */}
              <div className="mt-6 relative overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-950 text-white shadow-[0_26px_90px_rgba(0,0,0,0.25)]">
                <div className="pointer-events-none absolute -top-28 -left-28 h-[360px] w-[360px] rounded-full bg-[#B90E0A]/30 blur-[70px]" />
                <div className="pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-[90px]" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.22]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 48%), radial-gradient(circle at 80% 70%, rgba(185,14,10,0.18), transparent 55%)",
                  }}
                />

                <div className="relative p-6">
                  <div className="grid gap-3">
                    {/* 이메일: 탭하면 복사 */}
                    <button
                      type="button"
                      onClick={onCopyEmail}
                      className="
                        group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left
                        transition hover:bg-white/8 active:scale-[0.99]
                      "
                    >
                      <div className="text-[13px] text-white/65">이메일 문의</div>

                      <div className="mt-2 flex items-center justify-between gap-4">
                        <div className="text-[15px] font-semibold tracking-tight">
                          {email}
                        </div>
                        <div className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/80">
                          {copied ? "복사됨" : "복사"}
                        </div>
                      </div>
                    </button>

                    {/* 전화: 탭하면 전화 */}
                    <a
                      href={phoneHref}
                      className="
                        group block w-full rounded-2xl border border-white/10 bg-white/5 p-5
                        transition hover:bg-white/8 active:scale-[0.99]
                      "
                    >
                      <div className="text-[13px] text-white/65">전화 문의</div>

                      <div className="mt-2 flex items-center justify-between gap-4">
                        <div className="text-[15px] font-semibold tracking-tight">
                          {phoneDisplay}
                        </div>
                        <div className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/80">
                          전화걸기
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {/* /card */}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== PC ONLY (md 이상) ===================== */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-4 py-28">
          {/* ✅ PC는 CONTACT(영문 라벨) 없음 — 요청 반영 */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-[40px] font-semibold tracking-tight text-zinc-900 md:text-[52px]">
              가맹 문의
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
              WeMD ibs / WeMD Aesthetic 과 함께 성장할 기회를 만나보세요.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-950 text-white shadow-[0_26px_90px_rgba(0,0,0,0.25)]">
            <div className="pointer-events-none absolute -top-28 -left-28 h-[360px] w-[360px] rounded-full bg-[#B90E0A]/30 blur-[70px]" />
            <div className="pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-[90px]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.22]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 48%), radial-gradient(circle at 80% 70%, rgba(185,14,10,0.18), transparent 55%)",
              }}
            />

            <div className="relative p-10">
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="
                    group w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left
                    transition hover:bg-white/8 active:scale-[0.99]
                  "
                >
                  <div className="text-[13px] text-white/65">이메일 문의</div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div className="text-[16px] font-semibold tracking-tight">
                      {email}
                    </div>
                    <div className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/80">
                      {copied ? "복사됨" : "복사"}
                    </div>
                  </div>
                </button>

                <a
                  href={phoneHref}
                  className="
                    group block w-full rounded-2xl border border-white/10 bg-white/5 p-6
                    transition hover:bg-white/8 active:scale-[0.99]
                  "
                >
                  <div className="text-[13px] text-white/65">전화 문의</div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div className="text-[16px] font-semibold tracking-tight">
                      {phoneDisplay}
                    </div>
                    <div className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/80">
                      전화걸기
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/* /card */}
        </div>
      </div>
    </section>
  );
}