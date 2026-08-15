"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APP_URL,
  AMOUNT_MAX,
  AMOUNT_MIN,
  SAMPLE_NATIONAL_ID,
  SAMPLE_PHONE,
} from "@/lib/constants";

type ProxyType = "phone" | "national_id";

export function PlaygroundForm() {
  const [type, setType] = useState<ProxyType>("phone");
  const [target, setTarget] = useState(SAMPLE_PHONE);
  const [amount, setAmount] = useState("100.00");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const previewPath = useMemo(() => {
    const params = new URLSearchParams({
      type,
      target: target.trim(),
      amount: amount.trim(),
    });
    return `/api/v1/qr?${params.toString()}`;
  }, [type, target, amount]);

  const absoluteUrl = useMemo(() => {
    const params = new URLSearchParams({
      type,
      target: target.trim(),
      amount: amount.trim(),
    });
    return `${APP_URL}/api/v1/qr?${params.toString()}`;
  }, [type, target, amount]);

  useEffect(() => {
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  function selectType(next: ProxyType) {
    setType(next);
    setTarget(next === "phone" ? SAMPLE_PHONE : SAMPLE_NATIONAL_ID);
    setError(null);
    if (imageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl(null);
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(previewPath);
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        if (imageUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(null);
        setError(data?.error ?? `เกิดข้อผิดพลาด (${res.status})`);
        return;
      }

      const blob = await res.blob();
      const nextUrl = URL.createObjectURL(blob);
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
      setImageUrl(nextUrl);
    } catch {
      setError("เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่");
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
      setImageUrl(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={generate} className="space-y-5">
        <fieldset className="space-y-2">
          <legend className="text-xs tracking-widest text-[var(--muted)]">
            ประเภทพร้อมเพย์
          </legend>
          <div className="flex gap-2">
            {(
              [
                ["phone", "เบอร์โทร"],
                ["national_id", "เลขบัตรประชาชน"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => selectType(value)}
                className={`flex-1 border px-3 py-2 text-sm tracking-wider transition-colors ${
                  type === value
                    ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent-bright)]"
                    : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)]/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2">
          <span className="text-xs tracking-widest text-[var(--muted)]">
            {type === "phone" ? "เบอร์โทรศัพท์" : "เลขบัตรประชาชน"}
          </span>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value.replace(/\D/g, ""))}
            placeholder={
              type === "phone" ? SAMPLE_PHONE : SAMPLE_NATIONAL_ID
            }
            className="w-full border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 font-mono text-[var(--fg)] outline-none focus:border-[var(--accent)]"
            inputMode="numeric"
            autoComplete="off"
            maxLength={type === "phone" ? 10 : 13}
          />
          <span className="block text-xs text-[var(--muted)]">
            {type === "phone"
              ? "รูปแบบ 0xxxxxxxxx (10 หลัก)"
              : "เลขบัตร 13 หลัก (ตรวจสอบ checksum)"}
          </span>
        </label>

        <label className="block space-y-2">
          <span className="text-xs tracking-widest text-[var(--muted)]">
            จำนวนเงิน (บาท)
          </span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100.00"
            className="w-full border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 font-mono text-[var(--fg)] outline-none focus:border-[var(--accent)]"
            inputMode="decimal"
            autoComplete="off"
            maxLength={12}
          />
          <span className="block text-xs text-[var(--muted)]">
            {AMOUNT_MIN.toFixed(2)} – {AMOUNT_MAX.toLocaleString()}.00 บาท ·
            ทศนิยม 2 ตำแหน่ง
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-medium tracking-[0.15em] text-[var(--bg)] transition-colors hover:bg-[var(--accent-bright)] hover:border-[var(--accent-bright)] disabled:opacity-60"
        >
          {loading ? "กำลังสร้าง…" : "สร้าง QR"}
        </button>

        {error && (
          <p className="border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
      </form>

      <div className="space-y-4">
        <div className="flex aspect-square items-center justify-center border border-[var(--line)] bg-[var(--bg-elevated)] p-6">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="PromptPay Fix QR"
              className="max-h-full max-w-full"
            />
          ) : (
            <p className="text-center text-sm text-[var(--muted)]">
              ตัวอย่าง QR จะแสดงที่นี่
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs tracking-widest text-[var(--muted)]">
            URL ของ API
          </p>
          <code className="block break-all border border-[var(--line)] bg-[var(--bg-code)] p-3 text-xs text-[var(--code-fg)]">
            {absoluteUrl}
          </code>
        </div>
      </div>
    </div>
  );
}
