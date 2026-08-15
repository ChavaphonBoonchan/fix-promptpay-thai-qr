import type { Metadata } from "next";
import { APP_NAME, APP_URL, AMOUNT_MAX, AMOUNT_MIN, RATE_LIMIT_PER_MINUTE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้บริการ",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs tracking-[0.3em] text-[var(--accent-bright)]">
        กฎหมาย
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-3xl tracking-[0.08em]">
        ข้อกำหนดการใช้บริการ
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">อัปเดตล่าสุด: 15 ส.ค. 2026</p>

      <div className="mt-10 space-y-8 text-[var(--muted)] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">1. บริการ</h2>
          <p>
            {APP_NAME} ({APP_URL}) ให้บริการ API และเว็บสำหรับสร้าง PromptPay QR
            ที่กำหนดจำนวนเงินไว้ล่วงหน้า โดยไม่มีค่าใช้จ่ายและไม่ต้องมี API key
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">2. ข้อจำกัด</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              วงเงินต่อ QR: {AMOUNT_MIN.toFixed(2)} –{" "}
              {AMOUNT_MAX.toLocaleString()}.00 บาท
            </li>
            <li>จำกัดความถี่: {RATE_LIMIT_PER_MINUTE} ครั้ง / นาที / IP</li>
            <li>รองรับเฉพาะเบอร์ PromptPay รูปแบบ 0xxxxxxxxx และเลขบัตร 13 หลัก</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">3. การใช้งานที่เหมาะสม</h2>
          <p>
            ผู้ใช้มีหน้าที่ตรวจสอบความถูกต้องของเบอร์โทร / เลขบัตรประชาชน และจำนวนเงิน
            ก่อนนำไปรับชำระจริง ห้ามใช้บริการเพื่อกิจกรรมที่ผิดกฎหมายหรือหลอกลวง
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">4. การรับประกัน</h2>
          <p>
            บริการให้ในสภาพ &quot;ตามสภาพ&quot; เราไม่รับประกันความต่อเนื่องของบริการ
            ความเข้ากันได้กับทุกแอปธนาคาร หรือความเสียหายที่เกิดจากการใช้งาน QR ที่สร้างขึ้น
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">5. การเปลี่ยนแปลง</h2>
          <p>
            เราอาจปรับเงื่อนไข ขีดจำกัด หรือยุติบริการได้โดยแจ้งผ่านเว็บไซต์
          </p>
        </section>
      </div>
    </div>
  );
}
