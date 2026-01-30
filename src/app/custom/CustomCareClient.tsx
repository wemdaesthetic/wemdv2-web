// FILE: src/app/custom/CustomCareClient.tsx

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
  concern?: string[];
  solve?: string[];
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

export default function CustomCareClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const programs: Program[] = useMemo(
    () => [
      {
        slug: "wedding-standard",
        titleKo: "웨딩 관리 Standard",
        titleEn: "Wedding Preparation Treatment",
        durationMin: 90,
        priceOnce: 180000,
        priceTen: 1620000,
        steps: [
          "클렌징",
          "등 관리",
          "팔 관리",
          "어깨 목 관리(데콜테)",
          "두피 관리",
          "탄력 관리",
          "골선 관리",
          "팩",
          "마무리",
        ],
        introTitle: "예식 전, 상체 라인과 페이스 컨디션을 한 번에 정돈하는 웨딩 케어",
        introBody:
          "클렌징부터 등·팔 라인, 목·어깨(데콜테)와 두피 흐름까지 연결해 케어합니다. 탄력/골선 관리와 팩 마무리로 사진에서 또렷한 인상과 깔끔한 실루엣을 돕습니다.",
        concern: ["예식/촬영 전 컨디션을 빠르게 끌어올리고 싶음", "상체 라인(등/팔)이 신경 쓰임", "탄력과 윤곽이 아쉬움"],
        solve: ["정돈된 상체 라인", "또렷한 인상", "가벼운 컨디션"],
      },
      {
        slug: "wedding-special",
        titleKo: "웨딩 관리 Special",
        titleEn: "Wedding Preparation Treatment",
        durationMin: 100,
        priceOnce: 240000,
        priceTen: 2160000,
        steps: [
          "클렌징",
          "등 골선 관리",
          "등 크림 관리",
          "팔 골선 관리",
          "팔 크림 관리",
          "어깨 목 관리(데콜테)",
          "두피 관리",
          "얼굴 탄력 관리",
          "얼굴 골선 관리",
          "팩",
          "마무리",
        ],
        introTitle: "등·팔 라인 디테일 + 페이스 윤곽까지, 더 선명하게 완성하는 스페셜 웨딩 케어",
        introBody:
          "등/팔 라인을 골선+크림으로 디테일하게 케어하고, 목·어깨와 두피 흐름을 연결합니다. 얼굴 탄력/골선 관리까지 포함해 예식/촬영에서 선명한 라인 연출을 돕습니다.",
        concern: ["라인 디테일까지 확실히 정리하고 싶음", "상체+페이스를 동시에 선명하게 만들고 싶음", "중요 일정 전 집중 케어 필요"],
        solve: ["선명한 라인 디테일", "또렷한 윤곽", "완성도 높은 컨디션"],
      },
      {
        slug: "rounded-shoulder",
        titleKo: "라운드 숄더 관리",
        titleEn: "Rounded Shoulder Correction Treatment",
        durationMin: 60,
        priceOnce: 130000,
        priceTen: 1170000,
        steps: ["등 골선 관리", "등 크림 관리", "어깨 목 관리(데콜테)", "두피 관리"],
        introTitle: "말린 어깨·굽은 상체 흐름을 정돈하는 숄더 밸런스 케어",
        introBody:
          "등/어깨 라인을 중심으로 골선과 크림 관리를 진행하고, 목·어깨(데콜테)와 두피 흐름까지 함께 케어해 상체 라인이 편안하게 정돈되도록 돕습니다.",
        concern: ["어깨가 말려 보임", "목·어깨가 자주 뭉침", "상체 자세가 답답해 보임"],
        solve: ["편안한 상체 밸런스", "정돈된 어깨 라인", "가벼운 컨디션"],
      },
      {
        slug: "apple-hip",
        titleKo: "애플 힙 관리",
        titleEn: "Hip Lifting & Shaping Treatment",
        durationMin: 60,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["하체 밸런스 관리", "골반 집중 관리", "등 기립근 관리", "마무리(힙 크림 관리)"],
        introTitle: "하체 밸런스와 골반 흐름을 잡아 힙 라인을 탄탄하게",
        introBody:
          "하체 밸런스와 골반 중심 케어로 흐름을 정돈하고, 등 기립근까지 함께 관리해 라인이 무너져 보이지 않도록 돕습니다. 마무리 힙 크림 관리로 탄탄한 느낌을 더합니다.",
        concern: ["힙 라인이 처져 보임", "골반/하체 밸런스가 불편함", "하체 실루엣이 무거워 보임"],
        solve: ["탄탄한 힙 라인", "밸런스 있는 하체", "가벼운 움직임"],
      },
      {
        slug: "runner-recovery",
        titleKo: "러닝 후 관리",
        titleEn: "Runner Recovery Treatment",
        durationMin: 120,
        priceOnce: 200000,
        priceTen: 1800000,
        steps: ["클렌징", "등 크림 관리", "애플 힙(골반) 관리", "종아리 관리", "어깨 목 관리(데콜테)", "두피 관리", "탄력 관리", "마무리"],
        introTitle: "러닝 후 피로 누적 부위를 집중 케어하는 리커버리 프로그램",
        introBody:
          "러닝 후 뭉치기 쉬운 등·골반(힙)·종아리를 중심으로 케어하고, 목·어깨와 두피 흐름까지 연결해 전반적인 컨디션 회복을 돕습니다.",
        concern: ["러닝 후 근긴장/피로가 오래감", "종아리·골반이 뻐근함", "컨디션 회복이 필요함"],
        solve: ["빠른 컨디션 회복", "가벼운 하체", "편안한 바디 밸런스"],
      },
      {
        slug: "golf-recovery",
        titleKo: "골프 관리",
        titleEn: "Golf Recovery Treatment",
        durationMin: 60,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["복부 골선 관리", "복부 크림 관리", "복부 지방 분해 기기 관리"],
        introTitle: "복부 라인을 집중적으로 정돈하는 골프 리커버리 케어",
        introBody:
          "복부 골선/크림 관리를 통해 라인 흐름을 정리하고, 컨디션에 맞춰 복부 지방 분해 기기 관리를 병행해 보다 깔끔한 인상을 돕습니다.",
        concern: ["복부 라인이 신경 쓰임", "복부가 답답하고 무거움", "중요 라운딩/일정 전 정리가 필요함"],
        solve: ["정돈된 복부 라인", "가벼운 컨디션", "깔끔한 실루엣"],
      },
    ],
    []
  );

  // Drawer(모바일) 메뉴 데이터
  const faceItems = useMemo(
    () => [
      { title: "얼굴 리프팅 관리", href: "/face?p=facial-lifting" },
      { title: "얼굴 V라인 관리", href: "/face?p=facial-contouring" },
      { title: "작은 얼굴 관리", href: "/face?p=face-slimming" },
      { title: "얼굴 균형 관리", href: "/face?p=facial-balance" },
    ],
    []
  );

  const bodyItems = useMemo(
    () => [
      { title: "상체 관리", href: "/body?p=upper-body" },
      { title: "하체 관리", href: "/body?p=lower-body" },
      { title: "S라인 관리", href: "/body?p=s-line" },
    ],
    []
  );

  const customItems = useMemo(
      () => [
        { title: "웨딩 관리 Standard", href: "/custom?p=wedding-standard" },
        { title: "웨딩 관리 Special", href: "/custom?p=wedding-special" },
        { title: "라운드 숄더 관리", href: "/custom?p=rounded-shoulder" },
        { title: "애플 힙 관리", href: "/custom?p=apple-hip" },
        { title: "러닝 후 관리", href: "/custom?p=runner-recovery" },
        { title: "골프 관리", href: "/custom?p=golf-recovery" },
      ],
    [programs]
  );

  const BOOKING =
    "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

  const [active, setActive] = useState(0);

  useEffect(() => {
    const p = sp.get("p");
    if (!p) return;
    const idx = programs.findIndex((x) => x.slug === p);
    if (idx >= 0) setActive(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp, programs]);

  const current = programs[active];

  const goProgram = (slug: string) => {
    const idx = programs.findIndex((x) => x.slug === slug);
    if (idx >= 0) {
      setActive(idx);
      router.replace(`/custom?p=${slug}`);
    }
  };

  // ✅ 드롭다운: 닫혀있을 때 "현재 시술명만" 보이게
  const [selectValue, setSelectValue] = useState<string>("");
  useEffect(() => setSelectValue(""), [active]);

  /* -------------------- MOBILE: Drawer -------------------- */
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ 단일 오픈 아코디언 (하나 열면 나머지 닫힘)
  type DrawerSection = "face" | "body" | "custom" | null;
  const [openSection, setOpenSection] = useState<DrawerSection>("custom"); // 맞춤 페이지니까 기본 custom 열림
  const toggleSection = (k: Exclude<DrawerSection, null>) => {
    setOpenSection((prev) => (prev === k ? null : k));
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const hasEffect = (current.concern?.length || 0) > 0 || (current.solve?.length || 0) > 0;

  return (
    <>
      {/* ✅ Desktop Header는 원래대로 */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* ✅ MOBILE: 좌상단 홈 버튼 + 우상단 햄버거 */}
      <button
        type="button"
        onClick={() => router.push("/")}
        aria-label="홈으로"
        className="
          md:hidden
          fixed left-4 top-4 z-[3000]
          inline-flex h-12 w-12 items-center justify-center rounded-full
          bg-white/85 backdrop-blur
          ring-1 ring-black/5
          shadow-[0_12px_30px_rgba(15,23,42,0.10)]
          active:scale-[0.98]
        "
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 11.5l9-7 9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 10.5V20h13V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
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
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* ✅ MOBILE DRAWER */}
      {mobileOpen ? (
        <div className="md:hidden">
          <div className="fixed inset-0 z-[2999] bg-black/35" onClick={() => setMobileOpen(false)} aria-hidden />

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
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">MENU</div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-50"
                aria-label="메뉴 닫기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="px-5 pb-6 pt-4">
              <DrawerLink href="/#brand" onClick={() => setMobileOpen(false)}>
                WeMD 에스테틱
              </DrawerLink>

              <div className="mt-5 h-px w-full bg-zinc-100" />

              {/* ✅ 단일 오픈 아코디언 */}
              <div className="mt-4 space-y-2">
                <DrawerAccordion title="얼굴 관리" open={openSection === "face"} onToggle={() => toggleSection("face")} />
                {openSection === "face" ? (
                  <div className="ml-2 space-y-1">
                    {faceItems.map((it) => (
                      <DrawerSubLink key={it.href} href={it.href} onClick={() => setMobileOpen(false)}>
                        {it.title}
                      </DrawerSubLink>
                    ))}
                  </div>
                ) : null}

                <DrawerAccordion title="바디 관리" open={openSection === "body"} onToggle={() => toggleSection("body")} />
                {openSection === "body" ? (
                  <div className="ml-2 space-y-1">
                    {bodyItems.map((it) => (
                      <DrawerSubLink key={it.href} href={it.href} onClick={() => setMobileOpen(false)}>
                        {it.title}
                      </DrawerSubLink>
                    ))}
                  </div>
                ) : null}

                {/* 맞춤 케어 */}
                <DrawerAccordion title="맞춤 케어" open={openSection === "custom"} onToggle={() => toggleSection("custom")}/>
                {openSection === "custom" ? (
                  <div className="ml-2 mt-1 space-y-1">
                    {customItems.map((it) => (
                      <DrawerSubLink key={it.href} href={it.href} onClick={() => setMobileOpen(false)} >
                        {it.title}
                      </DrawerSubLink>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-5 h-px w-full bg-zinc-100" />

              <div className="mt-5 space-y-1">
                <DrawerLink href="/branches/dunchon" onClick={() => setMobileOpen(false)}>
                  지점 안내
                </DrawerLink>
                <DrawerLink href="/franchise" onClick={() => setMobileOpen(false)}>
                  가맹 문의
                </DrawerLink>
              </div>
            </div>

            <div className="mt-auto px-5 pb-6">
              <div className="grid grid-cols-1 gap-3">
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[50px] items-center justify-center rounded-2xl bg-zinc-900 text-[15px] font-semibold text-white active:scale-[0.99]"
                >
                  예약하기
                </a>
                <a
                  href={consultTelHref}
                  className="inline-flex h-[50px] items-center justify-center rounded-2xl border border-zinc-200 bg-white text-[15px] font-semibold text-zinc-900 active:scale-[0.99]"
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
            <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}

      <main className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden pt-0 md:pt-[78px]">
          <div className="relative">
            <img src="/programs/custom-hero.jpg" alt="Custom Care Hero" className="h-[240px] w-full object-cover md:h-[320px]" draggable={false} />
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute inset-0">
              <div className="mx-auto flex h-full max-w-6xl items-end px-4 pb-6 md:pb-9">
                <div className="w-full">
                  <div className="text-[12px] tracking-[0.30em] text-white/80">PROGRAM</div>
                  <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-white md:text-[44px]">{current.titleKo}</h1>
                  <div className="mt-2 text-[16px] text-white/80 md:text-[18px]">{current.titleEn}</div>
                </div>
              </div>
            </div>
          </div>

          {/* dropdown */}
          <div className="mx-auto max-w-6xl px-4">
            <div className="mt-5">
              <label className="sr-only" htmlFor="programSelect">
                프로그램 선택
              </label>

              <div className="relative">
                <select
                  id="programSelect"
                  value={selectValue}
                  onChange={(e) => {
                    const slug = e.target.value;
                    if (!slug) return;
                    goProgram(slug);
                    // ✅ 선택 후 다시 현재 시술명 표시
                    setSelectValue("");
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
                  {/* ✅ 닫혀있을 때 현재 시술명만 */}
                  <option value="" disabled>
                    {current.titleKo}
                  </option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.titleKo}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: `0 0 0 2px ${ACCENT} inset` }} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="divide-y divide-zinc-100/80">
            {/* PRICE */}
            <div className="pt-0 pb-8 md:pb-14">
              <div className="mt-2">
                <div className="text-[12px] tracking-[0.30em] text-zinc-400">PRICE</div>
                <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[26px] text-zinc-900">관리 가격 안내</div>

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
                  <PriceCardTicket title="1회 이용권" price={current.priceOnce} durationMin={current.durationMin} originalPrice={null} />
                  <PriceCardTicket title="10회 이용권" price={current.priceTen} durationMin={current.durationMin} originalPrice={current.priceOnce * 10} />
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
              <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-zinc-900 md:text-[26px]">{current.introTitle}</h3>

              <div className="md:hidden mt-4 rounded-3xl bg-white p-7 ring-1 ring-black/5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
                <p className="text-[14px] leading-relaxed text-zinc-600">{current.introBody}</p>
              </div>

              <div className="hidden md:block mt-4 max-w-3xl text-[16px] leading-relaxed text-zinc-600">{current.introBody}</div>
            </div>

            {/* EFFECT */}
            {hasEffect ? (
              <div className="py-8 md:py-14">
                <div className="text-[12px] tracking-[0.30em] text-zinc-400">EFFECT</div>
                <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-zinc-900 md:text-[26px]">관리 효과</h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
                  <EffectBox title="고민되시나요?" items={current.concern ?? []} tone="soft" />
                  <EffectBox title="해결해드려요!" items={current.solve ?? []} tone="accent" />
                </div>
              </div>
            ) : null}

            {/* COMPOSITION */}
            <div className="py-8 md:py-14">
              <div id="composition">
                <div className="text-[12px] tracking-[0.30em] text-zinc-400">COMPOSITION</div>
                <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[26px] text-zinc-900">프로그램 구성</div>

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
                      <div className="grid h-10 w-10 place-items-center rounded-xl text-[13px] font-semibold text-white" style={{ backgroundColor: ACCENT }}>
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
              <div className="rounded-3xl p-7 md:p-10 text-white relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.22]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.18), transparent 55%)",
                  }}
                />
                <div className="relative">
                  <div className="text-[12px] tracking-[0.30em] text-white/85">RESERVATION</div>
                  <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[20px]">지금, {current.titleKo} 예약하기</div>
                  <div className="mt-2 text-[13px] text-white/90">네이버 예약 페이지로 바로 이동합니다.</div>

                  <div className="mt-6">
                    <a
                      href={BOOKING}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white text-[15px] font-semibold text-zinc-900 active:scale-[0.99]"
                    >
                      예약하기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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

function DrawerAccordion({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        w-full
        flex items-center justify-between
        rounded-2xl px-4 py-3
        text-[16px] font-semibold text-zinc-900
        hover:bg-zinc-50 active:bg-zinc-100
      "
      aria-expanded={open}
    >
      <span>{title}</span>
      <span className="text-zinc-400" aria-hidden>
        {open ? "−" : "+"}
      </span>
    </button>
  );
}

function DrawerSubLink({
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
        flex items-center justify-between
        rounded-2xl px-4 py-2
        text-[14px] font-semibold text-zinc-700
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
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="snap-start shrink-0 w-[66%] min-w-[220px] md:w-[380px]">
      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
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