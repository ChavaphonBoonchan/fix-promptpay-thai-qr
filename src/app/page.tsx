import Link from "next/link";
import { APP_NAME, APP_URL, AMOUNT_MAX, AMOUNT_MIN, RATE_LIMIT_PER_MINUTE } from "@/lib/constants";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <p className="mb-4 text-xs tracking-[0.3em] text-[var(--accent-bright)]">
            API PromptPay ฟรี
          </p>
          <h1 className="font-[family-name:var(--font-brand)] text-4xl leading-tight tracking-[0.08em] text-[var(--fg)] sm:text-6xl">
            <span className="text-[var(--accent)]">nxeon</span> fixqr
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
            สร้าง PromptPay QR ที่ล็อกจำนวนเงินผ่าน API ฟรี — ส่งเบอร์โทรหรือเลขบัตรประชาชน
            พร้อมยอดเงิน แล้วรับรูป PNG กลับมาทันที
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/playground"
              className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm tracking-[0.15em] text-[var(--bg)] hover:bg-[var(--accent-bright)]"
            >
              ทดลองใช้
            </Link>
            <Link
              href="/docs"
              className="border border-[var(--line)] px-5 py-3 text-sm tracking-[0.15em] text-[var(--fg)] hover:border-[var(--accent)]"
            >
              เอกสาร API
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
          วิธีทำงาน
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "ส่งพารามิเตอร์",
              body: "ส่ง type, target (เบอร์/บัตร), amount ผ่าน GET",
            },
            {
              step: "02",
              title: "สร้าง Fix QR",
              body: "ใช้ promptparse สร้าง PromptPay payload ที่ล็อกยอดเงิน",
            },
            {
              step: "03",
              title: "ได้รูป PNG",
              body: "API คืนรูป QR โดยตรง — นำไปแสดงในเว็บได้ทันที",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5"
            >
              <p className="font-[family-name:var(--font-brand)] text-xs tracking-widest text-[var(--accent)]">
                {item.step}
              </p>
              <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--bg-elevated)]/50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
            เริ่มต้นเร็ว
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            ไม่ต้องมี API key — ยิง GET แล้วได้รูป QR
          </p>
          <pre className="mt-6 overflow-x-auto border border-[var(--line)] bg-[var(--bg-code)] p-4 text-sm text-[var(--code-fg)]">
            <code>{`GET ${APP_URL}/api/v1/qr?type=phone&target=0812345678&amount=100.00`}</code>
          </pre>
          <p className="mt-4 text-sm text-[var(--muted)]">
            หรือใส่เป็น{" "}
            <code className="text-[var(--accent-bright)]">&lt;img src=&quot;…&quot; /&gt;</code>{" "}
            ในเว็บของคุณได้ทันที
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
          ข้อจำกัด
        </h2>
        <ul className="mt-6 space-y-3 text-[var(--muted)]">
          <li>
            · วงเงิน{" "}
            <span className="text-[var(--fg)]">
              {AMOUNT_MIN.toFixed(2)} – {AMOUNT_MAX.toLocaleString()}.00 บาท
            </span>
          </li>
          <li>
            · จำกัดความถี่{" "}
            <span className="text-[var(--fg)]">
              {RATE_LIMIT_PER_MINUTE} ครั้ง/นาที/IP
            </span>
          </li>
          <li>· ไม่เก็บ log · ไม่ต้องสมัคร · ใช้ฟรี</li>
        </ul>
        <p className="mt-10 text-sm text-[var(--muted)]">
          พัฒนาด้วย{" "}
          <a
            href="https://github.com/maythiwat/promptparse"
            className="text-[var(--accent-bright)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            promptparse
          </a>{" "}
          · {APP_NAME}
        </p>
      </section>
    </div>
  );
}
