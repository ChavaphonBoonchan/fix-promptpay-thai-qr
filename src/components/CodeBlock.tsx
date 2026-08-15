"use client";

import { useState } from "react";

type CodeBlockProps = {
  code: string;
  label?: string;
};

export function CodeBlock({ code, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="overflow-hidden border border-[var(--line)] bg-[var(--bg-code)]">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-1.5">
        <span className="text-xs tracking-widest text-[var(--muted)]">
          {label ?? "โค้ด"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="text-xs tracking-widest text-[var(--accent)] hover:text-[var(--accent-bright)]"
        >
          {copied ? "คัดลอกแล้ว" : "คัดลอก"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-sm leading-relaxed text-[var(--code-fg)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
