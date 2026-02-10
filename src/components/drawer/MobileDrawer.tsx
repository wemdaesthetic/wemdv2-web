// FILE: src/components/drawer/MobileDrawer.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DRAWER_INFO_LINKS, DRAWER_ROUTES } from "./drawerData";

const ACCENT = "#B71919";

type Variant = "home" | "manage";

type Props = {
  open: boolean;
  onClose: () => void;
  bookingUrl: string;
  consultTelHref: string;
  variant: Variant;
};

type SectionKey = "face" | "body" | "custom" | null;

export default function MobileDrawer({ open, onClose, bookingUrl, consultTelHref }: Props) {
  const pathname = usePathname();

  const defaultOpenSection: SectionKey = useMemo(() => {
    if (!pathname) return null;
    if (pathname.startsWith("/face")) return "face";
    if (pathname.startsWith("/body")) return "body";
    if (pathname.startsWith("/custom")) return "custom";
    return null;
  }, [pathname]);

  const [openSection, setOpenSection] = useState<SectionKey>(null);

  useEffect(() => {
    if (!open) return;
    setOpenSection(defaultOpenSection);
  }, [open, defaultOpenSection]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const toggleSection = (k: Exclude<SectionKey, null>) => {
    setOpenSection((prev) => (prev === k ? null : k));
  };

  if (!open) return null;

  return (
    <div className="md:hidden">
      {/* overlay */}
      <div className="fixed inset-0 z-[20000] bg-black/35" onClick={onClose} aria-hidden />

      {/* drawer */}
      <aside
        className="
          fixed right-0 top-0 z-[20001]
          h-dvh w-[86vw] max-w-[360px]
          bg-white
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
          flex flex-col
        "
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
      >
        {/* X */}
        <button
          type="button"
          onClick={onClose}
          aria-label="메뉴 닫기"
          className="absolute right-4 z-[10] text-[30px] leading-none hover:opacity-70 active:opacity-60"
          style={{
            top: "calc(env(safe-area-inset-top) + 10px)",
            color: ACCENT,
          }}
        >
          ×
        </button>

        {/* content */}
        <div
          className="px-6"
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 90px)",
          }}
        >
          <div className="text-[13px] font-medium tracking-[0.18em] text-zinc-500">WeMD Aesthetic</div>

          <div className="mt-3">
            <DrawerLink href={DRAWER_INFO_LINKS.reviews.href} onClick={onClose}>
              {DRAWER_INFO_LINKS.reviews.label}
            </DrawerLink>
          </div>

          <div className="mt-6 h-px w-full bg-zinc-100" />

          <div className="mt-6 text-[13px] font-semibold tracking-[0.22em] text-zinc-400">PROGRAM</div>

          <div className="mt-3 space-y-2">
            {/* FACE */}
            <DrawerAccordion title="얼굴 관리" open={openSection === "face"} onToggle={() => toggleSection("face")} />
            {openSection === "face" ? (
              <div className="ml-1 space-y-1">
                {DRAWER_ROUTES.face.items.map((it) => (
                  <DrawerSubLink key={it.href} href={it.href} onClick={onClose}>
                    {it.title}
                  </DrawerSubLink>
                ))}
              </div>
            ) : null}

            {/* BODY */}
            <DrawerAccordion title="바디 관리" open={openSection === "body"} onToggle={() => toggleSection("body")} />
            {openSection === "body" ? (
              <div className="ml-1 space-y-1">
                {DRAWER_ROUTES.body.items.map((it) => (
                  <DrawerSubLink key={it.href} href={it.href} onClick={onClose}>
                    {it.title}
                  </DrawerSubLink>
                ))}
              </div>
            ) : null}

            {/* CUSTOM */}
            <DrawerAccordion title="맞춤 케어" open={openSection === "custom"} onToggle={() => toggleSection("custom")} />
            {openSection === "custom" ? (
              <div className="ml-1 space-y-1">
                {DRAWER_ROUTES.custom.items.map((it) => (
                  <DrawerSubLink key={it.href} href={it.href} onClick={onClose}>
                    {it.title}
                  </DrawerSubLink>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-7 h-px w-full bg-zinc-100" />

          <div className="mt-7 text-[13px] font-semibold tracking-[0.22em] text-zinc-400">INFO</div>

          <div className="mt-3 space-y-2">
            <DrawerLink href={DRAWER_INFO_LINKS.branches.href} onClick={onClose}>
              {DRAWER_INFO_LINKS.branches.label}
            </DrawerLink>
            <DrawerLink href={DRAWER_INFO_LINKS.franchise.href} onClick={onClose}>
              {DRAWER_INFO_LINKS.franchise.label}
            </DrawerLink>
          </div>
        </div>

        {/* bottom CTA */}
        <div className="mt-auto px-6 pb-6" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 18px)" }}>
          <div className="grid grid-cols-1 gap-3">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[52px] items-center justify-center rounded-2xl text-[15px] font-semibold text-white active:scale-[0.99]"
              style={{ backgroundColor: ACCENT }}
            >
              예약하기
            </a>

            <a
              href={consultTelHref}
              className="inline-flex h-[52px] items-center justify-center rounded-2xl border border-zinc-200 bg-white text-[15px] font-semibold text-zinc-900 active:scale-[0.99]"
            >
              전화상담
            </a>
          </div>

          <div className="mt-5 text-center text-[12px] text-zinc-400">WeMD Aesthetic</div>
        </div>
      </aside>
    </div>
  );
}

/* UI */

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
        flex items-center justify-between rounded-2xl
        px-4 py-4
        text-[18px] font-semibold
        text-zinc-900
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
        w-full flex items-center justify-between rounded-2xl
        px-4 py-4
        text-[18px] font-semibold
        text-zinc-900
        hover:bg-zinc-50 active:bg-zinc-100
      "
      aria-expanded={open}
    >
      <span>{title}</span>
      <span className="text-[20px] text-zinc-400" aria-hidden>
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
        flex items-center justify-between rounded-xl
        px-4 py-3
        text-[16px] font-medium
        text-zinc-700
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