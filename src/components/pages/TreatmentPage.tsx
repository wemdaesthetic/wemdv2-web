"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { BOOKING_URL } from "@/config/nav";

type Item = {
  title: string;
  desc: string;
  chips?: string[];
};

type Props = {
  eyebrow: string; // e.g. "FACE CARE"
  title: string; // e.g. "얼굴 관리"
  subtitle: string;
  heroImage?: string; // optional
  items: Item[];
  faqs: { q: string; a: string }[];
};

export default function TreatmentPage({
  eyebrow,
  title,
  subtitle,
  heroImage = "/treatment/hero-placeholder.jpg",
  items,
  faqs,
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 모바일 메뉴 열리면 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const menuGroups = useMemo(
    () => [
      {
        label: "BRAND",
        items: [{ href: "/", text: "WeMD 에스테틱" }],
      },
      {
        label: "TREATMENT",
        items: [
          { href: "/face", text: "얼굴 관리" },
          { href: "/body", text: "바디 관리" },
          { href: "/custom", text: "맞춤 케어" },
        ],
      },
      {
        label: "INFO",
        items: [
          { href: "/#branches", text: "지점 안내" },
          { href: "/#franchise", text: "가맹 문의" },
        ],
      },
    ],
    []
  );

  return (
    <>
      {/* PC 헤더 유지 */}
      <div className="hidden md:block">
        <Header />
      </div>

      <main className="bg-white">
        {/* ✅ MOBILE: 고정 로고 + 햄버거 (홈이랑 동일 UX) */}
        <div
          className="
            md:hidden
            fixed top-0 left-0 right-0 z-[200]
            h-[88px] px-5
            flex items-center justify-between
            pointer-events-none
          "
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
            <img
              src="/logo-main.png"
              alt="WeMD Aesthetic"
              className="h-16 w-auto object-contain"
              draggable={false}
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="
              pointer-events-auto ml-auto
              inline-flex h-16 w-16 items-center justify-center
              rounded-full bg-black/10 text-zinc-900 backdrop-blur
              transition active:scale-[0.96]
            "
            aria-label="메뉴 열기"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden bg-zinc-950">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt=""
              className="h-full w-full object-cover opacity-75"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-[110px] md:pt-[140px]">
            <div className="max-w-2xl">
              <div className="text-[12px] tracking-[0.22em] text-white/70">
                {eyebrow}
              </div>
              <h1 className="mt-3 text-[34px] font-semibold tracking-tight text-white md:text-[56px]">
                {title}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85 md:text-[16px]">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex h-[52px] items-center justify-center
                    rounded-2xl bg-white px-7
                    text-[15px] font-semibold text-zinc-900
                    transition active:scale-[0.99]
                  "
                >
                  예약하기
                </a>

                <a
                  href="/#branches"
                  className="
                    inline-flex h-[52px] items-center justify-center
                    rounded-2xl border border-white/40 px-7
                    text-[15px] font-semibold text-white
                    transition active:scale-[0.99]
                  "
                >
                  지점 안내
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT WRAP */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            {/* 프로그램 카드 */}
            <div className="mb-10">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                PROGRAMS
              </div>
              <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-zinc-900 md:text-[40px]">
                추천 프로그램
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-600 md:text-[16px]">
                컨디션과 목적에 맞춰 조합되는 케어를 제안합니다.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <div
                  key={it.title}
                  className="rounded-3xl bg-white p-7 shadow-[0_18px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/5"
                >
                  <div className="text-[18px] font-semibold text-zinc-900">
                    {it.title}
                  </div>
                  <div className="mt-3 text-[14px] leading-relaxed text-zinc-600">
                    {it.desc}
                  </div>

                  {it.chips?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {it.chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-zinc-100 px-3 py-2 text-[12px] text-zinc-600"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 h-px w-full bg-zinc-100" />

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#B90E0A]"
                  >
                    예약하기 <span aria-hidden>→</span>
                  </a>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-16 md:mt-20">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                FAQ
              </div>
              <h3 className="mt-2 text-[24px] font-semibold tracking-tight text-zinc-900 md:text-[32px]">
                자주 묻는 질문
              </h3>

              <div className="mt-6 space-y-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)] ring-1 ring-black/5"
                  >
                    <summary className="cursor-pointer list-none text-[15px] font-semibold text-zinc-900">
                      <div className="flex items-center justify-between gap-4">
                        <span>{f.q}</span>
                        <span className="text-zinc-400 transition group-open:rotate-45">+</span>
                      </div>
                    </summary>
                    <div className="mt-3 text-[14px] leading-relaxed text-zinc-600">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="bg-[#1A1A1A]">
          <Footer />
        </div>

        {/* ===================== MOBILE DRAWER MENU ===================== */}
        {mobileMenuOpen ? (
          <div className="md:hidden fixed inset-0 z-[9999]">
            <button
              type="button"
              className="absolute inset-0 bg-black/55"
              aria-label="메뉴 닫기"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div
              className="
                absolute right-0 top-0 h-full w-[86%] max-w-[360px]
                bg-white
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                flex flex-col
              "
              role="dialog"
              aria-modal="true"
            >
              {/* top */}
              <div className="flex items-center justify-between px-5 pt-5">
                <div className="text-[14px] font-semibold text-zinc-900">메뉴</div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="닫기"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* menu list */}
              <div className="mt-6 px-5 pb-5 overflow-y-auto">
                {menuGroups.map((g, gi) => (
                  <div key={g.label}>
                    <div className="mb-2 text-[12px] tracking-[0.18em] text-zinc-400">
                      {g.label}
                    </div>
                    <nav className="flex flex-col">
                      {g.items.map((it) => (
                        <a
                          key={it.href + it.text}
                          href={it.href}
                          className="py-3 text-[16px] font-semibold text-zinc-900"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {it.text}
                        </a>
                      ))}
                    </nav>

                    {gi !== menuGroups.length - 1 ? (
                      <div className="my-4 h-px w-full bg-zinc-200" />
                    ) : null}
                  </div>
                ))}
              </div>

              {/* bottom CTA */}
              <div className="mt-auto border-t border-zinc-200 p-5">
                <div className="grid gap-3">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex h-[52px] w-full items-center justify-center
                      rounded-2xl bg-zinc-900 text-[15px] font-semibold text-white
                    "
                  >
                    예약하기
                  </a>
                  <a
                    href="tel:0269598989"
                    className="
                      inline-flex h-[52px] w-full items-center justify-center
                      rounded-2xl bg-zinc-100 text-[15px] font-semibold text-zinc-900
                    "
                  >
                    전화상담
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}