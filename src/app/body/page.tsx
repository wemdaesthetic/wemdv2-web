"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const ACCENT = "#B71919";

type Program = {
  slug: string;
  titleKo: string;
  titleEn: string;
  durationMin: number;
  priceOnce: number;
  priceTen: number;
  steps: string[];
  introTitle: string;
  introBody: string;
  concern: string[];
  solve: string[];
};

function formatKRWSimple(n: number) {
  const s = String(n);
  let out = "";
  let cnt = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    out = s[i] + out;
    cnt++;
    if (cnt % 3 === 0 && i !== 0) out = "," + out;
  }
  return `${out}원`;
}

export default function BodyCarePage() {
  const router = useRouter();
  const sp = useSearchParams();

  const programs: Program[] = useMemo(
    () => [
      {
        slug: "upper-body",
        titleKo: "상체 관리",
        titleEn: "Upper Body Contouring Treatment",
        durationMin: 50,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["등 크림 관리", "팔 크림 관리", "어깨 목 관리(데콜테)", "두피 관리", "마무리"],
        introTitle: "상체 라인을 더 가볍고 매끈하게 정돈하는 컨투어링 케어",
        introBody:
          "등·팔 라인을 중심으로 컨디션을 정돈하고, 목·어깨와 두피 흐름까지 함께 케어해 전체적인 상체 실루엣이 깔끔해 보이도록 설계합니다.",
        concern: ["상체가 답답해 보임", "등/팔 라인 정리가 필요", "목·어깨 뭉침이 잦음"],
        solve: ["정돈된 상체 실루엣", "가벼운 컨디션", "부드러운 라인 연출"],
      },
      {
        slug: "lower-body",
        titleKo: "하체 관리",
        titleEn: "Lower Body Contouring Treatment",
        durationMin: 50,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["하체 라인 관리", "하체 근막 관리", "지방 분해 관리", "마무리"],
        introTitle: "하체 라인과 컨디션을 동시에 잡는 하체 컨투어링",
        introBody:
          "하체 라인과 근막 흐름을 케어하고, 컨디션에 맞춰 지방 분해 관리를 더해 보다 가볍고 정돈된 인상을 만들어드립니다.",
        concern: ["하체 라인이 둔해 보임", "뭉침/긴장이 잦음", "전체적으로 무거운 느낌"],
        solve: ["정돈된 하체 라인", "가벼운 움직임", "밸런스 있는 실루엣"],
      },
      {
        slug: "s-line",
        titleKo: "S라인 관리",
        titleEn: "Body Contouring & Shaping Treatment",
        durationMin: 100,
        priceOnce: 180000,
        priceTen: 1620000,
        steps: [
          "등 크림 관리",
          "팔 크림 관리",
          "어깨 목 관리(데콜테)",
          "두피 관리",
          "하체 라인 관리 또는 하체 근막 관리",
          "지방 분해 관리(포함)",
          "마무리",
        ],
        introTitle: "상·하체 흐름을 한 번에, 전체 실루엣을 설계하는 쉐이핑 케어",
        introBody:
          "상체와 하체를 함께 케어해 전체적인 바디 라인을 균형 있게 정돈합니다. 지방 분해 관리를 포함해 보다 선명한 라인 연출을 돕습니다.",
        concern: ["전체 라인 정리가 필요", "상·하체 밸런스가 아쉬움", "중요한 일정 전 컨디션 관리"],
        solve: ["균형 잡힌 S라인", "선명한 실루엣", "가벼운 바디 컨디션"],
      },
    ],
    []
  );

  const BOOKING =
    "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

  const [active, setActive] = useState(0);

  // ✅ URL 쿼리로 선택: ?p=slug
  useEffect(() => {
    const p = sp.get("p");
    if (!p) return;
    const idx = programs.findIndex((x) => x.slug === p);
    if (idx >= 0) setActive(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const current = programs[active];

  const goProgram = (slug: string) => {
    const idx = programs.findIndex((x) => x.slug === slug);
    if (idx >= 0) {
      setActive(idx);
      router.replace(`/body?p=${slug}`);
    }
  };

  // ✅ 드롭다운 placeholder 상태
  const [selectValue, setSelectValue] = useState<string>("");
  useEffect(() => setSelectValue(""), [active]);

  /* -------------------- MOBILE: Drawer -------------------- */
  const [mobileOpen, setMobileOpen] = useState(false);
  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  // 드로어 열리면 스크롤 잠금
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // ESC로 닫기
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // 전화상담
  const CONSULT_TEL = "02-6959-8989";
  const consultTelHref = `tel:${CONSULT_TEL.replaceAll("-", "").replaceAll(" ", "")}`;

  /* -------------------- MOBILE: TOP button -------------------- */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 420);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ✅ Desktop Header는 "원래대로" */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* ✅ MOBILE: 상단바 없음. 햄버거만 (투명하게 떠있게) */}
      <button
        type="button"
        onClick={openMobile}
        aria-label="메뉴"
        className="
          md:hidden
          fixed right-4 top-4 z-[3000]
          inline-flex h-12 w-12 items-center justify-center rounded-full
          bg-white/85 backdrop-blur
          ring-1 ring-black/5
          shadow-[0_12px_30px_rgba(15,23,42,0.10)]
          active:scale-[0.98]
        "
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* ✅ MOBILE DRAWER (리스트 유지) */}
      {mobileOpen ? (
        <div className="md:hidden">
          {/* dim */}
          <div className="fixed inset-0 z-[2999] bg-black/35" onClick={closeMobile} aria-hidden />

          {/* panel */}
          <aside
            className="
              fixed right-0 top-0 z-[3000] h-dvh w-[86vw] max-w-[360px]
              bg-white shadow-[0_20px_80px_rgba(0,0,0,0.25)]
              flex flex-col
            "
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
          >
            {/* top */}
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">MENU</div>
              <button
                type="button"
                onClick={closeMobile}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-50"
                aria-label="메뉴 닫기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-zinc-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* links */}
            <div className="px-5 pb-6 pt-4">
              <DrawerLink href="/#brand" onClick={closeMobile}>
                WeMD 에스테틱
              </DrawerLink>

              <div className="mt-5 h-px w-full bg-zinc-100" />

              <div className="mt-5 space-y-1">
                <DrawerLink href="/face?p=facial-lifting" onClick={closeMobile}>
                  얼굴 관리
                </DrawerLink>
                <DrawerLink href="/body?p=upper-body" onClick={closeMobile}>
                  바디 관리
                </DrawerLink>
                <DrawerLink href="/custom?p=wedding-standard" onClick={closeMobile}>
                  맞춤 케어
                </DrawerLink>
              </div>

              <div className="mt-5 h-px w-full bg-zinc-100" />

              <div className="mt-5 space-y-1">
                <DrawerLink href="/branches/dunchon" onClick={closeMobile}>
                  지점 안내
                </DrawerLink>
                <DrawerLink href="/franchise" onClick={closeMobile}>
                  가맹 문의
                </DrawerLink>
              </div>
            </div>

            {/* bottom CTA */}
            <div className="mt-auto px-5 pb-6">
              <div className="grid grid-cols-1 gap-3">
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex h-[50px] items-center justify-center rounded-2xl
                    bg-zinc-900 text-[15px] font-semibold text-white
                    active:scale-[0.99]
                  "
                >
                  예약하기
                </a>
                <a
                  href={consultTelHref}
                  className="
                    inline-flex h-[50px] items-center justify-center rounded-2xl
                    border border-zinc-200 bg-white text-[15px] font-semibold text-zinc-900
                    active:scale-[0.99]
                  "
                >
                  전화상담
                </a>
              </div>

              <div className="mt-4 text-center text-[12px] text-zinc-400">WeMD Aesthetic</div>
            </div>
          </aside>
        </div>
      ) : null}

      {/* ✅ MOBILE TOP 버튼만 */}
      {showTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="맨 위로"
          className="
            md:hidden
            fixed bottom-5 right-5 z-[2500]
            inline-flex h-12 w-12 items-center justify-center rounded-full
            bg-zinc-900 text-white
            shadow-[0_18px_50px_rgba(0,0,0,0.25)]
            active:scale-[0.98]
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}

      <main className="bg-white">
        {/* ===================== HERO ===================== */}
        {/* ✅ 모바일: 상단바 없으니 pt-0 / 데스크탑: 헤더 공간 유지 */}
        <section className="relative overflow-hidden pt-0 md:pt-[78px]">
          <div className="relative">
            <img
              src="/programs/body-hero.jpg"
              alt="Body Care Hero"
              className="h-[240px] w-full object-cover md:h-[320px]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute inset-0">
              <div className="mx-auto flex h-full max-w-6xl items-end px-4 pb-6 md:pb-9">
                <div className="w-full">
                  <div className="text-[12px] tracking-[0.30em] text-white/80">PROGRAM</div>
                  <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-white md:text-[44px]">
                    {current.titleKo}
                  </h1>
                  <div className="mt-2 text-[16px] text-white/80 md:text-[18px]">{current.titleEn}</div>
                </div>
              </div>
            </div>
          </div>

          {/* dropdown */}
          <div className="mx-auto max-w-6xl px-4">
            <div className="mt-5">
              <label className="sr-only" htmlFor="programSelect">
                다른 시술 선택
              </label>

              <div className="relative">
                <select
                  id="programSelect"
                  value={selectValue}
                  onChange={(e) => {
                    const slug = e.target.value;
                    if (!slug) return;
                    goProgram(slug);
                  }}
                  className="
                    w-full appearance-none
                    rounded-2xl bg-white
                    px-5 py-4 pr-12
                    text-[15px] font-semibold text-zinc-900
                    ring-1 ring-black/10
                    shadow-[0_14px_40px_rgba(15,23,42,0.08)]
                    outline-none
                  "
                >
                  <option value="" disabled>
                    다른 시술 선택 (현재: {current.titleKo})
                  </option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.titleKo}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ boxShadow: `0 0 0 2px ${ACCENT} inset` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CONTENT ===================== */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="divide-y divide-zinc-100/80">
            {/* PRICE */}
            <div className="pt-0 pb-8 md:pb-14">
              <div className="mt-2">
                <div className="text-[12px] tracking-[0.30em] text-zinc-400">PRICE</div>
                <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[26px] text-zinc-900">
                  관리 가격 안내
                </div>

                <div
                  className="
                    mt-5 -mx-4 flex gap-4 overflow-x-auto
                    px-10 pb-14
                    snap-x snap-mandatory
                    [scrollbar-width:none] [-ms-overflow-style:none]
                    bg-transparent

                    md:mx-0 md:px-0 md:pb-0
                    md:overflow-visible
                    md:flex md:justify-center md:gap-10
                  "
                  style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
                >
                  <PriceCardTicket title="1회 이용" price={current.priceOnce} durationMin={current.durationMin} originalPrice={null} />
                  <PriceCardTicket
                    title="10회 이용"
                    price={current.priceTen}
                    durationMin={current.durationMin}
                    originalPrice={current.priceOnce * 10}
                  />
                </div>

                <style jsx global>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
              </div>
            </div>

            {/* INTRO */}
            <div className="py-8 md:py-14">
              <div className="text-[12px] tracking-[0.30em] text-zinc-400">INTRO</div>
              <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-zinc-900 md:text-[26px]">
                {current.introTitle}
              </h3>

              <div className="md:hidden mt-4 rounded-3xl bg-white p-7 ring-1 ring-black/5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
                <p className="text-[14px] leading-relaxed text-zinc-600">{current.introBody}</p>
              </div>

              <div className="hidden md:block mt-4 max-w-3xl text-[16px] leading-relaxed text-zinc-600">
                {current.introBody}
              </div>
            </div>

            {/* EFFECT */}
            <div className="py-8 md:py-14">
              <div className="text-[12px] tracking-[0.30em] text-zinc-400">EFFECT</div>
              <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-zinc-900 md:text-[26px]">
                관리 효과
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
                <EffectBox title="고민되시나요?" items={current.concern} tone="soft" />
                <EffectBox title="해결해드려요!" items={current.solve} tone="accent" />
              </div>
            </div>

            {/* COMPOSITION */}
            <div className="py-8 md:py-14">
              <div id="composition">
                <div className="text-[12px] tracking-[0.30em] text-zinc-400">COMPOSITION</div>
                <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[26px] text-zinc-900">
                  프로그램 구성
                </div>

                <div className="mt-5 grid gap-3">
                  {current.steps.map((s, i) => (
                    <div
                      key={`${current.slug}-${i}`}
                      className="
                        flex items-center gap-4 rounded-2xl bg-white px-5 py-4
                        ring-1 ring-black/5
                        shadow-[0_14px_50px_rgba(15,23,42,0.06)]
                      "
                    >
                      <div
                        className="grid h-10 w-10 place-items-center rounded-xl text-[13px] font-semibold text-white"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-[15px] font-semibold text-zinc-900">{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RESERVATION */}
            <div className="py-8 md:py-14">
              <div
                className="rounded-3xl p-7 md:p-10 text-white relative overflow-hidden"
                style={{ backgroundColor: ACCENT }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.22]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.18), transparent 55%)",
                  }}
                />
                <div className="relative">
                  <div className="text-[12px] tracking-[0.30em] text-white/85">RESERVATION</div>
                  <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[20px]">
                    지금, {current.titleKo} 예약하기
                  </div>
                  <div className="mt-2 text-[13px] text-white/90">네이버 예약 페이지로 바로 이동합니다.</div>

                  <div className="mt-6">
                    <a
                      href={BOOKING}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white
                        text-[15px] font-semibold text-zinc-900 active:scale-[0.99]
                      "
                    >
                      예약하기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="bg-[#1A1A1A]">
          <Footer />
        </div>
      </main>
    </>
  );
}

/* -------------------- Drawer UI -------------------- */
function DrawerLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        flex items-center justify-between rounded-2xl px-4 py-3
        text-[16px] font-semibold text-zinc-900
        hover:bg-zinc-50 active:bg-zinc-100
      "
    >
      <span>{children}</span>
      <span className="text-zinc-300" aria-hidden>
        →
      </span>
    </Link>
  );
}

/* -------------------- UI Pieces -------------------- */
function ClockMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 22a10 10 0 110-20 10 10 0 010 20z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v6l4 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PriceCardTicket({
  title,
  price,
  durationMin,
  originalPrice,
}: {
  title: string;
  price: number;
  durationMin: number;
  originalPrice: number | null;
}) {
  const hasDiscount = originalPrice != null && originalPrice > price;

  return (
    <div
      className="
        snap-start shrink-0
        w-[66%] min-w-[220px]
        md:w-[380px]
      "
    >
      <div
        className="
          overflow-hidden rounded-3xl bg-white
          ring-1 ring-black/5
          shadow-[0_14px_28px_rgba(15,23,42,0.14)]
        "
      >
        <div className="px-6 py-5 text-center text-[18px] font-semibold text-white" style={{ backgroundColor: ACCENT }}>
          {title}
        </div>

        <div className="px-6 py-8 text-center">
          {hasDiscount ? (
            <div className="text-[14px] text-zinc-400 line-through">{formatKRWSimple(originalPrice!)}</div>
          ) : (
            <div className="text-[14px] text-transparent">.</div>
          )}

          <div className="mt-2 text-[26px] font-semibold tracking-tight" style={{ color: ACCENT }}>
            {formatKRWSimple(price)}
          </div>

          <div className="mt-7 h-px w-full bg-zinc-200" />

          <div className="mt-6 text-[16px] font-semibold text-zinc-700">
            <span className="inline-flex items-center gap-2">
              <span className="text-zinc-600">
                <ClockMini />
              </span>
              관리시간 <span className="text-zinc-900">{durationMin}분</span>
            </span>
          </div>

          <div className="mt-2 text-[14px] font-semibold text-zinc-600">VAT포함</div>
        </div>
      </div>
    </div>
  );
}

function EffectBox({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "soft" | "accent";
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className={[
        "rounded-3xl p-6 ring-1 ring-black/5",
        isAccent ? "text-white" : "bg-white",
        isAccent ? "" : "shadow-[0_18px_70px_rgba(15,23,42,0.08)]",
      ].join(" ")}
      style={
        isAccent
          ? {
              backgroundColor: ACCENT,
              boxShadow: "0 18px 70px rgba(183,25,25,0.18)",
            }
          : undefined
      }
    >
      <div className="text-[14px] font-semibold">{title}</div>

      <ul className="mt-4 space-y-2">
        {items.map((t, i) => (
          <li
            key={i}
            className={[
              "flex items-start gap-2 text-[13px] leading-relaxed",
              isAccent ? "text-white/90" : "text-zinc-600",
            ].join(" ")}
          >
            <span
              className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: isAccent ? "rgba(255,255,255,0.85)" : "rgb(161 161 170)" }}
              aria-hidden
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}