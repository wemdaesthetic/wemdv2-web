"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  alt?: string;
};

export default function ImagePopup({ open, onClose, imgSrc, alt }: Props) {
  // ESC로 닫기
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // 스크롤 잠금
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[30000] flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />

      {/* popup */}
      <div
        className="
          relative z-10
          max-h-[90vh] w-full max-w-[90vw]
          md:max-w-[720px]
          rounded-2xl
          overflow-hidden
          bg-black
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        "
      >
        {/* close */}
        <button
          type="button"
          aria-label="팝업 닫기"
          onClick={onClose}
          className="
            absolute right-3 top-3 z-20
            h-9 w-9
            rounded-full
            bg-black/60
            text-white
            text-[20px]
            leading-none
            hover:bg-black/80
          "
        >
          ×
        </button>

        {/* image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={alt ?? "popup image"}
          className="block max-h-[90vh] w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}