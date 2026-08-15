import type { Metadata } from "next";
import { APP_NAME, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs tracking-[0.3em] text-[var(--accent-bright)]">
        กฎหมาย
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-3xl tracking-[0.08em]">
        นโยบายความเป็นส่วนตัว
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">อัปเดตล่าสุด: 15 ส.ค. 2026</p>

      <div className="mt-10 space-y-8 text-[var(--muted)] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">1. สิ่งที่เราไม่เก็บ</h2>
          <p>
            {APP_NAME} ({APP_URL}){" "}
            <strong className="text-[var(--fg)] font-medium">ไม่เก็บ log</strong>{" "}
            ของการเรียก API และไม่จัดเก็บเบอร์โทรศัพท์ เลขบัตรประชาชน
            หรือจำนวนเงินที่ส่งเข้ามาไว้ในฐานข้อมูล
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">2. การประมวลผลชั่วคราว</h2>
          <p>
            พารามิเตอร์ที่ส่งมาจะถูกใช้ในหน่วยความจำระหว่างการสร้าง QR เท่านั้น
            แล้วทิ้งหลังตอบกลับ และใช้ IP ชั่วคราวเพื่อบังคับจำกัดความถี่
            (ไม่เก็บประวัติถาวร)
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">3. คุกกี้ / การวิเคราะห์</h2>
          <p>
            เว็บไซต์นี้ไม่ได้ใช้คุกกี้ติดตามหรือระบบวิเคราะห์จากบุคคลที่สามในเวอร์ชันปัจจุบัน
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[var(--fg)] font-medium">4. ความรับผิดชอบของผู้ใช้</h2>
          <p>
            เนื่องจาก API เป็นสาธารณะ ผู้ที่นำไปฝังในเว็บของตนเองควรระวังไม่เปิดเผยข้อมูลส่วนบุคคลเกินจำเป็น
            บนหน้าสาธารณะ
          </p>
        </section>
      </div>
    </div>
  );
}
