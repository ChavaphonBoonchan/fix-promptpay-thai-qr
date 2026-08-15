import type { Metadata } from "next";
import { PlaygroundForm } from "@/components/PlaygroundForm";

export const metadata: Metadata = {
  title: "ทดลองใช้",
  description: "ลองสร้าง PromptPay Fix QR ออนไลน์",
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs tracking-[0.3em] text-[var(--accent-bright)]">
        เดโม
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-3xl tracking-[0.08em] sm:text-4xl">
        ทดลองใช้
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        ลองสร้าง PromptPay Fix QR ก่อนนำไปใช้ในเว็บของคุณ —
        ใช้ endpoint เดียวกับ API จริง
      </p>
      <div className="mt-10">
        <PlaygroundForm />
      </div>
    </div>
  );
}
