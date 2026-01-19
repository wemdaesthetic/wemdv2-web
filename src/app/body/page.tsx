"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function BodyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="mx-auto max-w-6xl px-4 py-28">
          <div className="text-[12px] tracking-[0.22em] text-zinc-500">BODY PROGRAM</div>
          <h1 className="mt-3 text-[40px] font-semibold text-zinc-900">바디관리</h1>
          <p className="mt-6 text-zinc-600">여기에 바디관리 UI를 구성합니다.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}