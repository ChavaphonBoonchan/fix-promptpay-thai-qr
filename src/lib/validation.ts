import {
  AMOUNT_MAX,
  AMOUNT_MIN,
  MAX_AMOUNT_LEN,
  MAX_TARGET_LEN,
  MAX_TYPE_LEN,
  PROXY_TYPES,
  type ProxyTypeParam,
} from "./constants";

export type ValidationSuccess = {
  ok: true;
  type: ProxyTypeParam;
  target: string;
  amount: number;
};

export type ValidationError = {
  ok: false;
  error: string;
  status: number;
};

export type ValidationResult = ValidationSuccess | ValidationError;

const PHONE_RE = /^0\d{9}$/;
const NATIONAL_ID_RE = /^\d{13}$/;

/** Thai national ID checksum (mod 11). */
export function isValidThaiNationalId(id: string): boolean {
  if (!NATIONAL_ID_RE.test(id)) return false;

  let sum = 0;
  for (let i = 0; i < 12; i += 1) {
    sum += Number(id[i]) * (13 - i);
  }
  const check = (11 - (sum % 11)) % 10;
  return check === Number(id[12]);
}

function parseAmount(raw: string): number | null {
  if (raw.length > MAX_AMOUNT_LEN) return null;
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) return null;
  const amount = Number(raw);
  if (!Number.isFinite(amount)) return null;
  if (amount < AMOUNT_MIN || amount > AMOUNT_MAX) return null;
  return Number(amount.toFixed(2));
}

export function validateQrParams(
  typeRaw: string | null,
  targetRaw: string | null,
  amountRaw: string | null,
): ValidationResult {
  if (typeRaw !== null && typeRaw.length > MAX_TYPE_LEN) {
    return { ok: false, status: 400, error: 'ค่า "type" ไม่ถูกต้อง' };
  }
  if (targetRaw !== null && targetRaw.length > MAX_TARGET_LEN) {
    return { ok: false, status: 400, error: 'ค่า "target" ไม่ถูกต้อง' };
  }
  if (amountRaw !== null && amountRaw.length > MAX_AMOUNT_LEN) {
    return { ok: false, status: 400, error: 'ค่า "amount" ไม่ถูกต้อง' };
  }

  if (!typeRaw || !PROXY_TYPES.includes(typeRaw as ProxyTypeParam)) {
    return {
      ok: false,
      status: 400,
      error: 'ค่า "type" ต้องเป็น phone หรือ national_id',
    };
  }

  const type = typeRaw as ProxyTypeParam;
  const target = (targetRaw ?? "").trim();

  if (!target) {
    return { ok: false, status: 400, error: 'กรุณาระบุ "target"' };
  }

  if (target.length > MAX_TARGET_LEN) {
    return { ok: false, status: 400, error: 'ค่า "target" ไม่ถูกต้อง' };
  }

  if (type === "phone") {
    if (!PHONE_RE.test(target)) {
      return {
        ok: false,
        status: 400,
        error: "เบอร์โทรไม่ถูกต้อง ใช้รูปแบบ 0xxxxxxxxx (10 หลัก)",
      };
    }
  } else if (!isValidThaiNationalId(target)) {
    return {
      ok: false,
      status: 400,
      error: "เลขบัตรประชาชนไม่ถูกต้อง ต้องเป็น 13 หลักและ checksum ถูกต้อง",
    };
  }

  if (!amountRaw) {
    return { ok: false, status: 400, error: 'กรุณาระบุ "amount"' };
  }

  const amount = parseAmount(amountRaw.trim());
  if (amount === null) {
    return {
      ok: false,
      status: 400,
      error: `จำนวนเงินไม่ถูกต้อง ใช้ทศนิยม 2 ตำแหน่ง ระหว่าง ${AMOUNT_MIN}–${AMOUNT_MAX} บาท`,
    };
  }

  return { ok: true, type, target, amount };
}
