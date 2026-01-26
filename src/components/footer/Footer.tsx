"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* LEFT: LOGO + TEXT */}
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              <Image
                src="/logo-footer.svg"
                alt="WeMD"
                width={84}
                height={84}
                priority
                className="object-contain"
              />
            </div>

            <div className="text-zinc-200">
              <div className="text-[18px] font-semibold tracking-tight">
                위엠디아이비에스 주식회사
              </div>
              <div className="mt-3 text-[13px] leading-relaxed text-zinc-300">
                본사 서울특별시 강동구 양재대로 1371, 둔촌빌딩 307호
                <br />
                TEL: 02-6959-8989
              </div>
            </div>
          </div>

          {/* RIGHT: SNS */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Instagram */}
            <Link
              href="https://www.instagram.com/wemd_official/"
              target="_blank"
              rel="noreferrer"
              className="grid h-12 w-12 place-items-center rounded-full transition hover:bg-white/10 active:scale-[0.98]"
              aria-label="Instagram"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={44}
                height={44}
              />
            </Link>

            {/* YouTube (비활성) */}
            <div
              className="grid h-12 w-12 place-items-center rounded-full opacity-40 cursor-not-allowed"
              aria-label="YouTube (준비중)"
            >
              <Image
                src="/icons/youtube.svg"
                alt="YouTube"
                width={44}
                height={44}
              />
            </div>

            {/* Naver */}
            <Link
              href="https://naver.me/Gal4wfkv"
              target="_blank"
              rel="noreferrer"
              className="grid h-12 w-12 place-items-center rounded-full transition hover:bg-white/10 active:scale-[0.98]"
              aria-label="Naver"
            >
              <Image
                src="/icons/naver.svg"
                alt="Naver"
                width={44}
                height={44}
              />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[12px] text-zinc-400">
            © 2025 WeMD lbs. All rights reserved.
          </div>
          <div className="flex gap-6 text-[12px] text-zinc-400">
            <Link href="#" className="transition hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="#" className="transition hover:text-white">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}