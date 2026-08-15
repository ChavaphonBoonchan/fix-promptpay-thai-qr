import { isIP } from "node:net";
import {
  RATE_LIMIT_MAX_BUCKETS,
  RATE_LIMIT_PER_MINUTE,
} from "./constants";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;

function pruneExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function sanitizeIp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const value = raw.trim();
  if (value.length > 45) return null;
  if (value.includes("/") || value.includes("%")) return null;
  if (isIP(value) === 0) return null;
  return value;
}

/**
 * Resolve client IP for rate limiting.
 *
 * On Vercel (and similar proxies) platform headers overwrite client-supplied
 * `X-Real-IP` / `X-Forwarded-For`. Set TRUST_PROXY=false only for local dev
 * without a proxy (all clients share a single bucket).
 */
export function clientIp(request: Request): string {
  const trustProxy = process.env.TRUST_PROXY !== "false";

  if (!trustProxy) {
    return "direct";
  }

  const realIp = sanitizeIp(request.headers.get("x-real-ip"));
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Proxy must replace spoofed values; we take the first (client) hop.
    const first = forwarded.split(",")[0];
    const ip = sanitizeIp(first);
    if (ip) return ip;
  }

  return "unknown";
}

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  reason?: "rate" | "capacity";
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  pruneExpired(now);

  const key = ip.slice(0, 45);
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= RATE_LIMIT_MAX_BUCKETS) {
      return {
        allowed: false,
        limit: RATE_LIMIT_PER_MINUTE,
        remaining: 0,
        resetAt: now + WINDOW_MS,
        reason: "capacity",
      };
    }

    const resetAt = now + WINDOW_MS;
    buckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: RATE_LIMIT_PER_MINUTE,
      remaining: RATE_LIMIT_PER_MINUTE - 1,
      resetAt,
    };
  }

  if (existing.count >= RATE_LIMIT_PER_MINUTE) {
    return {
      allowed: false,
      limit: RATE_LIMIT_PER_MINUTE,
      remaining: 0,
      resetAt: existing.resetAt,
      reason: "rate",
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    limit: RATE_LIMIT_PER_MINUTE,
    remaining: RATE_LIMIT_PER_MINUTE - existing.count,
    resetAt: existing.resetAt,
  };
}
