import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--bg-elevated)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-[family-name:var(--font-brand)] tracking-wider text-[var(--accent)]">
            {APP_NAME}
          </span>{" "}
          · API สร้าง PromptPay Fix QR ฟรี
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-[var(--fg)] transition-colors">
            ข้อกำหนด
          </Link>
          <Link href="/privacy" className="hover:text-[var(--fg)] transition-colors">
            ความเป็นส่วนตัว
          </Link>
          <Link href="/docs" className="hover:text-[var(--fg)] transition-colors">
            เอกสาร
          </Link>
        </div>
      </div>
    </footer>
  );
}
