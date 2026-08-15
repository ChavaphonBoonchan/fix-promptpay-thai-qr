"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/playground", label: "ทดลองใช้" },
  { href: "/docs", label: "เอกสาร API" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--line)] bg-[var(--bg-elevated)]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-brand)] text-xl tracking-[0.12em] text-[var(--accent)] group-hover:text-[var(--accent-bright)] transition-colors">
            nxeon
          </span>
          <span className="font-[family-name:var(--font-brand)] text-xl tracking-[0.08em] text-[var(--fg)]">
            fixqr
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm tracking-widest transition-colors ${
                  active
                    ? "text-[var(--accent-bright)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {active ? `[${link.label}]` : link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="sm:hidden border border-[var(--line)] px-2 py-1 text-xs tracking-widest text-[var(--muted)]"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="เปิดเมนู"
        >
          เมนู
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--line)] px-4 py-2 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm tracking-widest text-[var(--muted)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
