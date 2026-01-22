"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKING_URL, NAV_ITEMS, type NavItem, type NavMega } from "@/config/nav";
import { cn } from "@/lib/cn";

/* ---------- utils ---------- */
function isMega(item: NavItem): item is NavMega {
  return item.type === "mega";
}

function getItem(label: string) {
  return NAV_ITEMS.find((it) => it.label === label);
}

function displayLabel(label: string) {
  if (label === "얼굴 관리") return "얼굴관리";
  if (label === "바디 관리") return "바디관리";
  if (label === "맞춤 케어") return "맞춤케어";
  return label;
}

/* ---------- Header ---------- */
export default function Header() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [onHero, setOnHero] = useState(true); // 히어로 위인지 감지
  const headerRef = useRef<HTMLElement | null>(null);

  // nav items
  const face = getItem("얼굴 관리");
  const body = getItem("바디 관리");
  const custom = getItem("맞춤 케어");
  const branches = getItem("지점 소개");
  // ✅ 입점 문의 제거
  // const franchise = getItem("입점 문의");

  const activeItem = useMemo(() => {
    if (!activeMega) return null;
    const found = NAV_ITEMS.find((it) => isMega(it) && it.label === activeMega);
    return found && isMega(found) ? found : null;
  }, [activeMega]);

  /* ---------- HERO 감지 ---------- */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* ---------- 외부 클릭 닫기 ---------- */
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!activeMega) return;
      if (!headerRef.current?.contains(e.target as Node)) setActiveMega(null);
    }
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [activeMega]);

  /* ---------- ESC 닫기 ---------- */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveMega(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* ---------- 헤더 색 판정 ---------- */
  const headerIsWhite = !onHero || Boolean(activeMega);

  const topText = headerIsWhite ? "text-zinc-900" : "text-white";
  const topTextHover = headerIsWhite ? "hover:text-zinc-950" : "hover:text-white";
  const dividerColor = headerIsWhite ? "bg-zinc-300" : "bg-white/40";

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-colors duration-300",
        headerIsWhite ? "bg-white" : "bg-transparent",
        headerIsWhite ? "border-b border-zinc-200" : "border-b border-transparent"
      )}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-[78px] items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo-main.png" alt="WeMD" width={74} height={74} priority />
            </Link>

            {/* WeMD 에스테틱 (원페이지: #brand) */}
            <a
              href="#brand"
              className={cn(
                "ml-20 text-[16px] font-semibold transition-colors",
                topText,
                topTextHover
              )}
            >
              WeMD 에스테틱
            </a>

            <Divider className="mx-7" colorClass={dividerColor} />

            <nav className="hidden items-center gap-8 md:flex">
              <MegaTopButton
                item={face}
                open={activeMega === face?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
              />
              <MegaTopButton
                item={body}
                open={activeMega === body?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
              />
              <MegaTopButton
                item={custom}
                open={activeMega === custom?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
              />
            </nav>

            <Divider className="ml-7 hidden md:inline-block" colorClass={dividerColor} />

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "ml-7 hidden text-[16px] font-medium transition-colors md:inline-block",
                topText,
                topTextHover
              )}
            >
              예약하기
            </a>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-7">
            <div className="hidden items-center gap-7 md:flex">
              {/* ✅ 지점소개 → 지점안내 + ↗ + 외부로 */}
              {branches && (
  <Link
    href="/branches/dunchon"
    className={cn("text-[14px] font-medium transition-colors", topText, topTextHover)}
  >
    지점안내
    <span className="ml-1 align-middle text-[14px]" aria-hidden>
      ↗
    </span>
  </Link>
)}

              {/* ✅ 입점 문의 제거 */}
              {/*
              {franchise?.type === "link" && (
                <a
                  href={franchise.href}
                  className={cn("text-[14px] font-medium transition-colors", topText, topTextHover)}
                >
                  {franchise.label}
                </a>
              )}
              */}
            </div>

            <Link href="/" className="flex items-center">
              <Image src="/logo-sub.svg" alt="WeMD Aesthetic" width={92} height={92} priority />
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Toss-like Mega Menu (WHITE) */}
      <MegaMenuTossLike item={activeItem} />
    </header>
  );
}

/* ---------- Components ---------- */

function Divider({
  className,
  colorClass,
}: {
  className?: string;
  colorClass?: string;
}) {
  return <span className={cn("inline-block h-5 w-px", colorClass, className)} aria-hidden />;
}

function MegaTopButton({
  item,
  open,
  headerIsWhite,
  onOpen,
}: {
  item?: NavItem;
  open: boolean;
  headerIsWhite: boolean;
  onOpen: (v: string | null) => void;
}) {
  if (!item || !isMega(item)) return null;

  const base = "h-[68px] text-[18px] font-semibold transition-colors";

  const color = headerIsWhite
    ? open
      ? "text-[#B90E0A]"
      : "text-zinc-900 hover:text-[#B90E0A]"
    : open
    ? "text-white"
    : "text-white/90 hover:text-white";

  return (
    <button
      type="button"
      className={cn(base, color)}
      onMouseEnter={() => onOpen(item.label)}
    >
      {displayLabel(item.label)}
    </button>
  );
}

/* ---------- Toss-like Mega Menu (WHITE) ---------- */
function MegaMenuTossLike({ item }: { item: NavMega | null }) {
  if (!item) return null;

  const meta = getMegaMeta(item.label);

  return (
    <div
      className="
        relative z-50
        border-t border-zinc-200 bg-white
        shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]
      "
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="col-span-12 md:col-span-3">
            <div className="text-[28px] font-semibold tracking-tight text-zinc-900">
              {meta.title}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">
              {meta.desc}
            </p>

            <div className="mt-6">
              <Link
                href={meta.allHref}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-zinc-800 hover:text-[#B90E0A]"
              >
                전체 보기 <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: columns */}
          <div className="col-span-12 md:col-span-9">
            <div
              className={cn(
                "grid gap-x-10 gap-y-10",
                item.sections.length <= 3
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : item.sections.length === 4
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-5"
              )}
            >
              {item.sections.map((section) => (
                <div key={section.title} className="min-w-0">
                  <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                    {section.title || "MENU"}
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    {section.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="
                          group inline-flex min-w-0 items-center justify-between
                          text-[15px] font-semibold text-zinc-900
                          hover:text-[#B90E0A]
                        "
                      >
                        <span className="truncate">{l.label}</span>
                        <span
                          className="
                            ml-3 shrink-0 text-zinc-300
                            transition group-hover:translate-x-[2px] group-hover:text-[#B90E0A]/50
                          "
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 h-px w-full bg-zinc-200" />

            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="text-[13px] text-zinc-600">
                프로그램 상세는 각 페이지에서 확인할 수 있어요.
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex h-[44px] items-center justify-center rounded-full
                  bg-[#B90E0A] px-6 text-[14px] font-semibold text-white
                  hover:bg-[#a40c09]
                "
              >
                예약하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMegaMeta(label: string): { title: string; desc: string; allHref: string } {
  if (label === "얼굴 관리") {
    return {
      title: "얼굴관리",
      desc: "라인과 밸런스를 정교하게 다듬는 페이스 프로그램을 한 번에 확인하세요.",
      allHref: "/face",
    };
  }
  if (label === "바디 관리") {
    return {
      title: "바디관리",
      desc: "컨디션과 순환을 기반으로, 바디 라인을 깔끔하게 설계합니다.",
      allHref: "/body",
    };
  }
  if (label === "맞춤 케어") {
    return {
      title: "맞춤케어",
      desc: "목적 기반 조합으로 개인에게 맞춘 집중 케어를 제공합니다.",
      allHref: "/custom",
    };
  }
  return {
    title: displayLabel(label),
    desc: "WeMD 프로그램을 확인하세요.",
    allHref: "/",
  };
}