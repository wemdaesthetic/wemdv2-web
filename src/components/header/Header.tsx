"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKING_URL, NAV_ITEMS, type NavItem, type NavMega } from "../../config/nav";
import { cn } from "../../lib/cn";

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

export default function Header() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);

  // nav items
  const face = getItem("얼굴 관리");
  const body = getItem("바디 관리");
  const custom = getItem("맞춤 케어");
  const branches = getItem("지점 소개");
  const franchise = getItem("입점 문의");

  const activeItem = useMemo(() => {
    if (!activeMega) return null;
    const found = NAV_ITEMS.find((it) => isMega(it) && it.label === activeMega);
    return found && isMega(found) ? found : null;
  }, [activeMega]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 바깥 클릭 닫기
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!activeMega) return;
      const el = headerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setActiveMega(null);
    }
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [activeMega]);

  // ESC 닫기
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveMega(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ 흰색 되는 조건: 스크롤 OR 메가메뉴 오픈
  const headerIsWhite = scrolled || Boolean(activeMega);

  // ✅ 최상단 투명일 때 메뉴는 흰색
  const topText = headerIsWhite ? "text-zinc-900" : "text-white";
  const topTextHover = headerIsWhite ? "hover:text-zinc-950" : "hover:text-white";
  const dividerColor = headerIsWhite ? "bg-zinc-300" : "bg-white/35";

  return (
    <header
      ref={headerRef}
      className={cn(
        // ✅ 핵심: sticky가 아니라 fixed로 “히어로 위에 겹치게”
        "fixed top-0 left-0 z-[999] w-full transition-colors",
        headerIsWhite ? "bg-white" : "bg-transparent",
        headerIsWhite ? "border-b border-zinc-200" : "border-b border-transparent"
      )}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-[78px] items-center justify-between">
          {/* LEFT GROUP */}
          <div className="flex items-center">
            {/* 메인 로고 */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-main.png"
                alt="WeMD"
                width={74}
                height={74}
                priority
                className="object-contain"
              />
            </Link>

            {/* WeMD 에스테틱 = 링크 */}
            <a
              href="#brand"
              className={cn(
                "ml-20 cursor-pointer text-[16px] font-semibold transition-colors",
                topText,
                topTextHover
              )}
            >
              WeMD 에스테틱
            </a>

            <Divider className="mx-7" colorClass={dividerColor} />

            {/* 얼굴/바디/맞춤 (메가메뉴) */}
            <nav className="hidden items-center gap-8 md:flex">
              <MegaTopButton
                item={face}
                activeMega={activeMega}
                setActiveMega={setActiveMega}
                headerIsWhite={headerIsWhite}
              />
              <MegaTopButton
                item={body}
                activeMega={activeMega}
                setActiveMega={setActiveMega}
                headerIsWhite={headerIsWhite}
              />
              <MegaTopButton
                item={custom}
                activeMega={activeMega}
                setActiveMega={setActiveMega}
                headerIsWhite={headerIsWhite}
              />
            </nav>

            <Divider className="ml-7 hidden md:inline-block" colorClass={dividerColor} />

            {/* 예약하기 */}
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

          {/* RIGHT GROUP */}
          <div className="flex items-center gap-7">
            <div className="hidden items-center gap-7 md:flex">
              {branches && branches.type === "link" ? (
                <a
                  href={branches.href}
                  className={cn("text-[14px] font-medium transition-colors", topText, topTextHover)}
                >
                  {branches.label}
                </a>
              ) : null}

              {franchise && franchise.type === "link" ? (
                <a
                  href={franchise.href}
                  className={cn("text-[14px] font-medium transition-colors", topText, topTextHover)}
                >
                  {franchise.label}
                </a>
              ) : null}
            </div>

            {/* 서브 로고 */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-sub.svg"
                alt="WeMD Aesthetic"
                width={92}
                height={92}
                priority
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* 메가메뉴 */}
      <MegaMenuAligned item={activeItem} scrolled={scrolled} />
    </header>
  );
}

function Divider({
  className,
  colorClass,
}: {
  className?: string;
  colorClass?: string;
}) {
  return (
    <span
      className={cn("inline-block h-5 w-px align-middle", colorClass ?? "bg-zinc-300", className)}
      aria-hidden="true"
    />
  );
}

function MegaTopButton({
  item,
  activeMega,
  setActiveMega,
  headerIsWhite,
}: {
  item: NavItem | undefined;
  activeMega: string | null;
  setActiveMega: (v: string | null) => void;
  headerIsWhite: boolean;
}) {
  if (!item || !isMega(item)) return null;
  const open = activeMega === item.label;

  const base =
    headerIsWhite
      ? open
        ? "text-red-700"
        : "text-red-600 hover:text-red-700"
      : open
      ? "text-white"
      : "text-white/90 hover:text-white";

  return (
    <button
      type="button"
      className={cn("relative h-[68px] text-[18px] font-semibold transition-colors", base)}
      onMouseEnter={() => setActiveMega(item.label)}
      aria-haspopup="menu"
      aria-expanded={open}
    >
      {displayLabel(item.label)}
    </button>
  );
}

function MegaMenuAligned({ item, scrolled }: { item: NavMega | null; scrolled: boolean }) {
  if (!item) return null;

  const groups =
    item.sections?.length && item.sections.some((s) => s.links?.length)
      ? item.sections
      : [{ title: "", links: item.sections.flatMap((s) => s.links) }];

  return (
    <div
      className={cn(
        "bg-white",
        "border-t border-zinc-200",
        scrolled ? "border-b border-zinc-200" : "border-b border-zinc-100"
      )}
      role="menu"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid min-h-[260px] grid-cols-12 gap-10 py-10">
          {/* LEFT */}
          <div className="col-span-8">
            <div className="flex items-center gap-4">
              <div className="text-[18px] font-semibold text-zinc-900">{displayLabel(item.label)}</div>
              <span className="h-5 w-px bg-red-600" aria-hidden="true" />
              <div className="text-[12px] tracking-[0.18em] text-zinc-500">PROGRAM</div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-x-12 gap-y-6">
              {groups.flatMap((g) => g.links).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-[14px] text-zinc-900 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: EVENT */}
          <div className="col-span-4">
            <div className="flex items-center gap-4">
              <div className="text-[18px] font-semibold text-zinc-900">이벤트</div>
              <span className="h-5 w-px bg-red-600" aria-hidden="true" />
              <div className="text-[12px] tracking-[0.18em] text-zinc-500">EVENT</div>
            </div>

            <Link href={item.promo?.href ?? "/event"} className="mt-6 block">
              <div className="h-40 w-full rounded-2xl bg-zinc-200" />
            </Link>

            <div className="mt-4 text-[13px] leading-relaxed text-zinc-600">
              새로운 프로모션과 시즌 프로그램을 확인해보세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}