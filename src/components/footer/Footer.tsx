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
              {/* 로고: 요청 반영(너무 크지 않게, 기존 대비 1.5배 내린 상태로 가정) */}
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
                TEL: 02)6959-8989
              </div>
            </div>
          </div>

          {/* RIGHT: SNS */}
          <div className="flex items-center gap-3 md:gap-3">
            {/* 테두리 원 제거 + 아이콘 키움(요청 1.7배 정도) */}
            <Link
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 transition"
              aria-label="Instagram"
            >
              <Image src="/icons/instagram.svg" alt="" width={22} height={22} />
            </Link>
            <Link
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 transition"
              aria-label="YouTube"
            >
              <Image src="/icons/youtube.svg" alt="" width={24} height={24} />
            </Link>
            <Link
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 transition"
              aria-label="Naver"
            >
              <Image src="/icons/naver.svg" alt="" width={20} height={20} />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[12px] text-zinc-400">
            © 2025 WeMD lbs. All rights reseved.
          </div>
          <div className="flex gap-6 text-[12px] text-zinc-400">
            <Link href="#" className="hover:text-white transition">개인정보처리방침</Link>
            <Link href="#" className="hover:text-white transition">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}