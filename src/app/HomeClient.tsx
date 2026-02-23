
"use client";

import { useEffect, useState } from "react";


// - 모바일: src/components/_legacy/MobileHome.tsx
// - 데스크탑: src/components/_legacy/desktop/DesktopHome.tsx
import MobileHome from "@/components/_legacy/MobileHome";
import DesktopHome from "@/components/_legacy/desktop/DesktopHome";

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${breakpoint}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpoint]);

  return isDesktop;
}

export default function HomeClient() {
  const isDesktop = useIsDesktop(768);

  // 팝업 상태
  const [open, setOpen] = useState(false);

  // 처음 접속 시 1회 자동 오픈”
  useEffect(() => {
    setOpen(true);
  }, []);

  // 팝업 이미지 경로 (public 아래에 두면 됨)
  // public/popup/main-popup.png  =>  /popup/main-popup.png
  const POPUP_IMG = "/popup/main-popup.png";

  return (
    <>
      {/* 팝업 */}
      {open ? (
        <div className="fixed inset-0 z-[99999]">
          {/* overlay */}
          <button
            type="button"
            aria-label="팝업 닫기"
            className="absolute inset-0 bg-black/55"
            onClick={() => setOpen(false)}
          />

          {/* popup box */}
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              {/* 닫기 버튼 */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/70"
              >
                ×
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={POPUP_IMG}
                alt="WeMD Popup"
                className="block h-auto w-full"
                draggable={false}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* 기존 메인 화면 */}
      {isDesktop ? <DesktopHome /> : <MobileHome />}
    </>
  );
}