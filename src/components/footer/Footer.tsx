import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* TOP */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* LEFT */}
          <div className="flex items-start gap-10">
            {/* LOGO */}
            <Image
              src="/logo-footer.svg"
              alt="WeMD"
              width={120}
              height={120}
              className="object-contain"
            />

            {/* COMPANY INFO */}
            <div className="pt-1 text-[13px] leading-relaxed">
              <div className="mb-3 text-[18px] font-semibold text-white">
                위엠디아이비에스 주식회사
              </div>

              <div>
                본사 서울특별시 강동구 양재대로 1371, 둔촌빌딩 307호
              </div>
              <div className="mt-1">TEL: 02)6959-8989</div>
            </div>
          </div>

          {/* RIGHT : SNS */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Instagram"
              className="opacity-70 transition hover:opacity-100"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={52}
                height={52}
              />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="opacity-70 transition hover:opacity-100"
            >
              <Image
                src="/icons/youtube.svg"
                alt="YouTube"
                width={52}
                height={52}
              />
            </a>

            <a
              href="#"
              aria-label="Naver"
              className="opacity-70 transition hover:opacity-100"
            >
              <Image
                src="/icons/naver.svg"
                alt="Naver"
                width={52}
                height={52}
              />
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px w-full bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 text-[13px] md:flex-row md:items-center md:justify-between">
          <div>© 2025 WeMD Ibs. All rights reserved.</div>

          <div className="flex gap-6">
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