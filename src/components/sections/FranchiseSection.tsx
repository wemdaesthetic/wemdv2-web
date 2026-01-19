import { BOOKING_URL } from "@/config/nav";

export default function FranchiseSection() {
  return (
    <section id="franchise" className="scroll-mt-[96px] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <div className="text-[12px] tracking-[0.22em] text-zinc-500">FRANCHISE</div>
        <h2 className="mt-3 text-[38px] font-semibold tracking-tight text-zinc-900">입점 문의</h2>

        <div className="mt-10 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-7 rounded-3xl border border-zinc-200 bg-zinc-50 p-10 text-zinc-700">
            입점/제휴 문의 내용을 여기에 구성합니다.
          </div>

          <div className="col-span-12 md:col-span-5 rounded-3xl border border-zinc-200 bg-white p-10">
            <div className="text-[14px] font-semibold text-zinc-900">빠른 문의</div>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">
              가장 빠른 연결은 예약 채널을 통해 진행합니다.
            </p>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-[44px] w-full items-center justify-center rounded-full bg-zinc-900 px-6 text-[14px] font-medium text-white hover:bg-zinc-800 transition"
            >
              예약/문의로 이동
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}