export default function BranchesSection() {
  return (
    <section id="branches" className="scroll-mt-[96px] bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <div className="text-[12px] tracking-[0.22em] text-zinc-500">BRANCHES</div>
        <h2 className="mt-3 text-[38px] font-semibold tracking-tight text-zinc-900">지점 소개</h2>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-10 text-zinc-600">
          {/* 여기부터는 다음에 지점 리스트/지도/카드로 확장 */}
          지점 정보를 여기에 구성합니다.
        </div>
      </div>
    </section>
  );
}