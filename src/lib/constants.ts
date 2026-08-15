export const APP_NAME = "nxeon fixqr";
export const APP_DOMAIN = "qr.9zahub.com";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  `https://${APP_DOMAIN}`;

export const AMOUNT_MIN = 1;
export const AMOUNT_MAX = 10_000;
export const RATE_LIMIT_PER_MINUTE = 20;

/** Max in-memory rate-limit buckets (DoS guard). */
export const RATE_LIMIT_MAX_BUCKETS = 10_000;

/** Max concurrent QR PNG generations. */
export const QR_MAX_CONCURRENT = 8;

export const MAX_TYPE_LEN = 20;
export const MAX_TARGET_LEN = 16;
export const MAX_AMOUNT_LEN = 12;

export const PROXY_TYPES = ["phone", "national_id"] as const;
export type ProxyTypeParam = (typeof PROXY_TYPES)[number];

export const SAMPLE_PHONE = "0812345678";
export const SAMPLE_NATIONAL_ID = "1234567890121";
